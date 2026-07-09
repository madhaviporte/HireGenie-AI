import fs from 'fs'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"
import { askAi } from '../services/openRouter.services.js'

export const analyzeResume = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" })
        }
        const filepath = req.file.path

        const fileBuffer = await fs.promises.readFile(filepath)
        const uint8Array = new Uint8Array(fileBuffer)

        const pdf = await pdfjsLib.getDocument({ data:uint8Array }).promise

        let resumText = "";

        //Ectract text from all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent()

            const pageText = content.items.map(item => item.str).join(" ")
            resumText += pageText + "\n"
        }

        resumText = resumText
            .replace(/\s+/g, " ")
            .trim()

        const message = [
  {
    role: "system",
    content: `
You are a resume parser.

Extract information from the resume.

Return ONLY valid JSON.

Do not use markdown.
Do not wrap the response in \`\`\`json.
Do not add explanations.

JSON format:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}
`
  },
  {
    role: "user",
    content: resumText
  }
];



        const aiResponse = await askAi(message)

        console.log("=========== AI RESPONSE ===========");
console.log(aiResponse);
console.log("===================================");

      let cleaned = aiResponse
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

const match = cleaned.match(/\{[\s\S]*\}/);

if (!match) {
  throw new Error("AI did not return valid JSON");
}

const parsed = JSON.parse(match[0]);

        fs.unlinkSync(filepath)

        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumText
        });

    } catch (error) {
  console.error(error)

  if(req.file && fs.existsSync(req.file.path)){
    fs.unlinkSync(req.file.path);
  }

 return res.status(500).json({message: error.message})
    }
}