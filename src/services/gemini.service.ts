import { GoogleGenAI, Type } from '@google/genai';

/**
 * Shared Type definitions for Gemini Services
 */
export interface MatchResult {
  score: number; // 0 to 100 percentage representation
  matchedSkills: string[];
  missingSkills: string[];
  suitabilityExplanationEn: string;
  suitabilityExplanationOm: string;
}

export interface TranslationResult {
  translatedTitle: string;
  translatedDescription: string;
}

let aiInstance: GoogleGenAI | null = null;

/**
 * Lazy initializer for Google GenAI SDK Client
 */
export function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined inside current secrets configuration.');
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

/**
 * Translates job details between English and Afaan Oromo.
 * Automatically detects or processes input fields, providing clean, high-grade bilingual profiles.
 *
 * @param title Source Job Title
 * @param description Source Job Description
 * @param sourceLanguage Direction ('en' to translate to Afaan Oromo, 'om' to translate to English)
 */
export async function translateJobContent(
  title: string,
  description: string,
  sourceLanguage: 'en' | 'om'
): Promise<TranslationResult> {
  const targetLangName = sourceLanguage === 'en' ? 'Afaan Oromo' : 'English';
  const sourceLangName = sourceLanguage === 'en' ? 'English' : 'Afaan Oromo';

  try {
    const ai = getGeminiClient();

    const prompt = `
      You are an expert bilingual professional translator specializing in Ethiopian freelance marketplaces (English and Afaan Oromo).
      Translate the following job listing structures precisely from ${sourceLangName} to ${targetLangName}.
      Maintain the original context, professional tone, technical specifications, and formatting of the listing. Do not add metadata or notes.

      Job Title to Translate: "${title}"
      Job Description to Translate:
      "${description}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are a professional Ethiopian freelance ecosystem machine translator. Always return a valid JSON payload matching the requested schema. Ensure the outputs are natural, grammatically correct, and utilize the correct vocabulary of ${targetLangName} inside the software, creative, or specialized fields.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['translatedTitle', 'translatedDescription'],
          properties: {
            translatedTitle: {
              type: Type.STRING,
              description: `The finalized translation of the title in ${targetLangName}.`,
            },
            translatedDescription: {
              type: Type.STRING,
              description: `The complete, formatted translation of the description in ${targetLangName}.`,
            },
          },
        },
      },
    });

    const bodyText = response.text;
    if (!bodyText) {
      throw new Error('Empty response returned by Gemini engine.');
    }

    const parsed: TranslationResult = JSON.parse(bodyText.trim());
    return parsed;
  } catch (error: any) {
    console.error('Gemini Translation Error:', error);
    // Graceful fallback system if API fails, preventing hard crashes
    return {
      translatedTitle: sourceLanguage === 'en'
        ? `[Afaan Oromo Translation Pending] ${title}`
        : `[English Translation Pending] ${title}`,
      translatedDescription: sourceLanguage === 'en'
        ? `[Afaan Oromo Translation Pending] ${description}`
        : `[English Translation Pending] ${description}`,
    };
  }
}

/**
 * Matches a Freelancer Profile against Job Requirements, checking skills, bio, rate, and previous work.
 *
 * @param jobDetails Properties of the Job (Title, skills required, body details)
 * @param freelancerProfile Attributes of the Freelancer Developer / Specialist
 */
export async function matchFreelancerToJob(
  jobDetails: {
    titleEn: string;
    descriptionEn: string;
    skillsRequired: string[];
    experienceLevel: string;
  },
  freelancerProfile: {
    fullName: string;
    titleEn: string;
    bioEn: string;
    skills: string[];
    hourlyRate: number;
  }
): Promise<MatchResult> {
  try {
    const ai = getGeminiClient();

    const prompt = `
      Perform a deep analytical evaluation of compatibility between a Freelancer Profile and a Freelance Job Posting on 'HojiiLink Ethiopia'.
      
      JOB DETAILED SPECIFICATIONS:
      - Title: "${jobDetails.titleEn}"
      - Required Skills: ${JSON.stringify(jobDetails.skillsRequired)}
      - Experience Requirement: "${jobDetails.experienceLevel}"
      - Description: "${jobDetails.descriptionEn}"

      FREELANCER PROFILE:
      - Full Name: "${freelancerProfile.fullName}"
      - Professional Title: "${freelancerProfile.titleEn}"
      - Core Skills: ${JSON.stringify(freelancerProfile.skills)}
      - Bio: "${freelancerProfile.bioEn}"
      - Hourly Rate: $${freelancerProfile.hourlyRate}/hr

      Calculate a matching score out of 100 based on core qualifications, overlap of key skills, relevant experience level compatibility, and suitability.
      Provide detailed analytical explanations in both English and Afaan Oromo explaining why they are suitable or what exact areas they are missing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Analyze the candidates and calculate match scores strictly. Provide reasons in English (en) and Afaan Oromo (om) for bilingual system displays. Always output a JSON structure matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'score',
            'matchedSkills',
            'missingSkills',
            'suitabilityExplanationEn',
            'suitabilityExplanationOm',
          ],
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'Synthesized suitability percentage score from 0 to 100.',
            },
            matchedSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Skills explicitly listed or strongly implied on both sides.',
            },
            missingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Skills required by the job that are missing from the freelancer profile.',
            },
            suitabilityExplanationEn: {
              type: Type.STRING,
              description: 'A professional overview explanation in English outlining suitability factors.',
            },
            suitabilityExplanationOm: {
              type: Type.STRING,
              description: 'A professional overview explanation in Afaan Oromo outlining suitability factors.',
            },
          },
        },
      },
    });

    const bodyText = response.text;
    if (!bodyText) {
      throw new Error('Empty response returned by matching engine.');
    }

    return JSON.parse(bodyText.trim());
  } catch (error: any) {
    console.error('Gemini Matching System Error:', error);
    // Basic fallback algorithm if AI API limit or secret key is offline
    const matched = freelancerProfile.skills.filter((skill) =>
      jobDetails.skillsRequired.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
    const missing = jobDetails.skillsRequired.filter(
      (skill) => !freelancerProfile.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
    const calculatedScore = jobDetails.skillsRequired.length > 0
      ? Math.round((matched.length / jobDetails.skillsRequired.length) * 100)
      : 50;

    return {
      score: Math.min(100, Math.max(0, calculatedScore)),
      matchedSkills: matched,
      missingSkills: missing,
      suitabilityExplanationEn: 'Automated matching heuristics applied. Deep AI capability is currently initializing core services fallback.',
      suitabilityExplanationOm: 'Algorithmiin madaallii sanyii dandeettii hojiirra ooleera. Sirni AI deeggarsa dandeettii dabalataa qopheessaa jira.',
    };
  }
}
