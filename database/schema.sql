-- ==========================================
-- HOJIILINK ETHIOPIA: DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL (with RLS)
-- Bilingual Support: English (en) & Afaan Oromo (om)
-- Optimized for speed, security, and transactions.
-- ==========================================

-- Enable essential extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- TYPE DEFINITIONS
-- ------------------------------------------
CREATE TYPE user_role AS ENUM ('client', 'freelancer');
CREATE TYPE job_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE proposal_status AS ENUM ('pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE contract_status AS ENUM ('active', 'completed', 'disputed', 'terminated');
CREATE TYPE payment_status AS ENUM ('pending', 'escrowed', 'released', 'refunded');
CREATE TYPE transaction_status AS ENUM ('initiated', 'pending', 'success', 'failed', 'refunded');

-- ------------------------------------------
-- TABLES
-- ------------------------------------------

-- 1. PROFILES (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'freelancer',
    
    -- Bilingual Professional Bio & Titles
    title_en TEXT,
    title_om TEXT,
    bio_en TEXT,
    bio_om TEXT,
    
    -- Freelancer specific details
    skills TEXT[] DEFAULT '{}',
    hourly_rate NUMERIC(10, 2) DEFAULT 0.00,
    
    -- General Info
    location TEXT DEFAULT 'Ethiopia',
    phone_number TEXT,
    
    -- Socials & Portfolio links
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    
    -- Ratings & Stats (Cached for reading performance)
    rating NUMERIC(3, 2) DEFAULT 5.00,
    completed_jobs INTEGER DEFAULT 0,
    total_earned NUMERIC(12, 2) DEFAULT 0.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. JOBS (Posted by clients)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Bilingual Job Title & Descriptions
    title_en TEXT NOT NULL,
    title_om TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_om TEXT NOT NULL,
    
    category TEXT NOT NULL, -- e.g., 'software-development', 'graphics-design', 'translation-writing'
    skills_required TEXT[] DEFAULT '{}',
    
    -- Budgeting & Duration
    budget_type TEXT CHECK (budget_type IN ('fixed', 'hourly')) NOT NULL DEFAULT 'fixed',
    budget NUMERIC(12, 2) NOT NULL,
    estimated_duration TEXT NOT NULL, -- e.g. '1-3 months', 'Less than 1 month'
    experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'expert')) NOT NULL DEFAULT 'intermediate',
    
    status job_status NOT NULL DEFAULT 'open',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROPOSALS (Submitted by freelancers)
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Bilingual Cover Letters (Freelancers can submit depending on language)
    cover_letter_en TEXT NOT NULL,
    cover_letter_om TEXT,
    
    bid_amount NUMERIC(12, 2) NOT NULL,
    estimated_days INTEGER NOT NULL,
    status proposal_status NOT NULL DEFAULT 'pending',
    
    -- Ensure a freelancer can submit only one proposal per job
    CONSTRAINT unique_freelancer_proposal_per_job UNIQUE (job_id, freelancer_id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CONTRACTS (Agreed engagement)
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE SET NULL,
    
    title TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status contract_status NOT NULL DEFAULT 'active',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTRACT MILESTONES (For Escrow payments)
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
    
    title_en TEXT NOT NULL,
    title_om TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TRANSACTIONS (Financial logging, synced with Chapa webhook payouts/deposits)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
    milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
    
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ETB',
    
    -- Gateway specifics
    payment_gateway TEXT NOT NULL DEFAULT 'Chapa', -- 'Chapa', 'CBE', 'Telebirr', 'Amole'
    gateway_reference TEXT NOT NULL UNIQUE,       -- Chapa TX reference or Bank Trans ID
    status transaction_status NOT NULL DEFAULT 'initiated',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_skills ON public.profiles USING gin(skills);
CREATE INDEX IF NOT EXISTS idx_jobs_client_status ON public.jobs(client_id, status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_proposals_job_id ON public.proposals(job_id);
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer_id ON public.proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_job_freelancer ON public.contracts(job_id, freelancer_id);
CREATE INDEX IF NOT EXISTS idx_milestones_contract ON public.milestones(contract_id);
CREATE INDEX IF NOT EXISTS idx_transactions_trans_ref ON public.transactions(gateway_reference);

-- ------------------------------------------
-- TIMESTAMPS AUTOMATION TRIGGERS
-- ------------------------------------------
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply modified column triggers
CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_jobs_timestamp BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_proposals_timestamp BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_contracts_timestamp BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_milestones_timestamp BEFORE UPDATE ON public.milestones FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- ------------------------------------------
-- AUTH REGISTRATION PROFILE SYNC TRIGGER
-- ------------------------------------------
-- Automatically creates a client or freelancer profile when a user registers on Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    u_role user_role;
    u_full_name TEXT;
BEGIN
    -- Extract metadata role & name from Auth metadata inside the user creation payload
    u_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'freelancer'::user_role);
    u_full_name := COALESCE(new.raw_user_meta_data->>'full_name', 'HojiiLink Member');

    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (new.id, new.email, u_full_name, u_role);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger attaching user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------
-- Secure tables so only authorized users can view or mutates tables.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Public Profiles are viewable by everyone" ON public.profiles
    FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Can edit own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. JOBS POLICIES
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
    FOR SELECT TO authenticated, anon USING (status = 'open' OR auth.uid() = client_id);

CREATE POLICY "Clients can create jobs" ON public.jobs
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'client'
        )
    );

CREATE POLICY "Clients can update own jobs" ON public.jobs
    FOR UPDATE TO authenticated USING (auth.uid() = client_id);

CREATE POLICY "Clients can delete own jobs" ON public.jobs
    FOR DELETE TO authenticated USING (auth.uid() = client_id);

-- 3. PROPOSALS POLICIES
CREATE POLICY "Freelancers can view own proposals" ON public.proposals
    FOR SELECT TO authenticated USING (auth.uid() = freelancer_id);

CREATE POLICY "Clients can view proposals for their jobs" ON public.proposals
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.jobs 
            WHERE jobs.id = proposals.job_id AND jobs.client_id = auth.uid()
        )
    );

CREATE POLICY "Freelancers can submit proposals" ON public.proposals
    FOR INSERT TO authenticated WITH CHECK (
        auth.uid() = freelancer_id AND
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'freelancer'
        )
    );

CREATE POLICY "Freelancers can update/withdraw own proposals" ON public.proposals
    FOR UPDATE TO authenticated USING (auth.uid() = freelancer_id);

CREATE POLICY "Freelancers can delete own proposals" ON public.proposals
    FOR DELETE TO authenticated USING (auth.uid() = freelancer_id);

-- 4. CONTRACTS POLICIES
CREATE POLICY "Parties of the contract can view contract" ON public.contracts
    FOR SELECT TO authenticated USING (auth.uid() = client_id OR auth.uid() = freelancer_id);

CREATE POLICY "Clients can create contracts" ON public.contracts
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update contracts" ON public.contracts
    FOR UPDATE TO authenticated USING (auth.uid() = client_id);

-- 5. MILESTONES POLICIES
CREATE POLICY "Contract parties can view milestones" ON public.milestones
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.contracts 
            WHERE contracts.id = milestones.contract_id 
              AND (contracts.client_id = auth.uid() OR contracts.freelancer_id = auth.uid())
        )
    );

CREATE POLICY "Clients can insert milestones" ON public.milestones
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.contracts 
            WHERE contracts.id = milestones.contract_id AND contracts.client_id = auth.uid()
        )
    );

CREATE POLICY "Clients can update milestones" ON public.milestones
    FOR UPDATE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.contracts 
            WHERE contracts.id = milestones.contract_id AND contracts.client_id = auth.uid()
        )
    );

-- 6. TRANSACTIONS POLICIES
CREATE POLICY "Parties can view their transactions" ON public.transactions
    FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "System/Webhooks can record transactions" ON public.transactions
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
