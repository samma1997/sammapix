import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ExtractedProblem {
  problem: string;
  userLanguage: string;
  keywordTarget: string;
  sammaPixTool: string | null;
}

const SAMMAPIX_TOOLS = [
  "compress", "webp", "resize-pack", "crop-ratio", "pdf-to-image",
  "ai-rename", "ai-alt-text", "smart-sort", "cull", "ai-organize", "ocr",
  "geo-sort", "travel-map", "twin-hunt", "batch-name",
  "film-lab", "stamp-it", "heic", "remove-bg", "upscale", "passport-photo",
  "blog-drop", "transcribe", "web-lift", "exif",
];

export async function extractProblemsFromThread(
  postTitle: string,
  postText: string,
  comments: string[], // top comments from the thread
  source: string,
): Promise<ExtractedProblem[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const commentsText = comments.slice(0, 15).join("\n---\n");

  const prompt = `Analyze this Reddit thread and extract SPECIFIC user problems related to images, photos, or digital media.

POST TITLE: "${postTitle}"
POST TEXT: "${postText?.slice(0, 500) || "(no text)"}"

TOP COMMENTS:
${commentsText || "(no comments available)"}

SammaPix tools that could solve problems: ${SAMMAPIX_TOOLS.join(", ")}

For each distinct problem you find, return:
- "problem": A clear 1-sentence description of the problem
- "userLanguage": The EXACT words/phrases the user used (copy verbatim from the text, in their language)
- "keywordTarget": A SEO keyword someone would Google to solve this problem (English, lowercase)
- "sammaPixTool": Which SammaPix tool solves this (from the list above), or null if none

Rules:
- Only extract REAL problems explicitly stated or clearly implied by users
- Do NOT invent problems that aren't in the text
- Focus on problems related to: image compression, conversion, metadata, resizing, renaming, organizing, editing
- Include privacy/metadata concerns (EXIF, GPS, location data)
- The userLanguage field should be a direct quote or very close paraphrase
- Return 0 problems if the thread has nothing relevant

Return a JSON array. Example:
[
  {
    "problem": "Users don't know their photos contain GPS location data",
    "userLanguage": "how would one check for this information",
    "keywordTarget": "check if photo has gps data",
    "sammaPixTool": "exif"
  }
]

Return ONLY the JSON array, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    // Extract JSON from potential markdown code blocks
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("[problem-extractor] Error:", err);
    return [];
  }
}

export async function generateBlogOutline(
  problem: string,
  userLanguage: string,
  keywordTarget: string,
  sammaPixTool: string | null,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Create a blog post outline for SammaPix (an AI-powered image tool platform).

PROBLEM: ${problem}
USER'S EXACT WORDS: "${userLanguage}"
TARGET KEYWORD: "${keywordTarget}"
${sammaPixTool ? `SAMMAPIX TOOL THAT SOLVES THIS: ${sammaPixTool}` : ""}

Write an outline for a blog post that:
1. Opens with the exact problem users describe (use their language)
2. Explains WHY this is a problem (consequences)
3. Shows the solution step-by-step
4. ${sammaPixTool ? `Naturally mentions how SammaPix's ${sammaPixTool} tool solves this` : "Provides a general solution"}
5. Includes a FAQ section with 3 related questions

Format as markdown outline with H2/H3 headers and bullet points for key content under each.
Target: 1200-1500 words final article.
Tone: Helpful, direct, no fluff. Like explaining to a friend.

Return ONLY the outline in markdown.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch {
    return "";
  }
}
