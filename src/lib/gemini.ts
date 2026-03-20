import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

type ModerationResult = {
  label: "safe" | "spam" | "negative" | "other";
  reason: string;
};

const moderationSchema = {
  type: "object",
  properties: {
    label: { type: "string", enum: ["safe", "spam", "negative", "other"] },
    reason: {
      type: "string",
    },
  },
  required: ["label", "reason"],
} as const;

export async function moderateReview(
  content: string,
): Promise<ModerationResult> {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a moderation assistant for a movie review website.
              Classify this review as one of: safe, spam, negative, or other.
              Return JSON only.
              Review:
              ${content}`,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: moderationSchema,
    },
  });
  const jsonText = response.text;

  if (!jsonText) {
    return {
      label: "other",
      reason: "Empty response from Gemini",
    };
  }
  return JSON.parse(jsonText) as ModerationResult;
}
