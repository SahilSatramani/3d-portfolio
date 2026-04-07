import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function chunkText(text: string, maxChunkSize: number = 500): string[] {
  const sections = text.split(/\n##+ /);
  const chunks: string[] = [];

  for (const section of sections) {
    if (section.trim().length === 0) continue;
    const sectionText = section.trim();
    if (sectionText.length <= maxChunkSize) {
      chunks.push(sectionText);
    } else {
      const paragraphs = sectionText.split(/\n\n+/);
      let current = "";
      for (const para of paragraphs) {
        if ((current + para).length > maxChunkSize && current.length > 0) {
          chunks.push(current.trim());
          current = para;
        } else {
          current += (current ? "\n\n" : "") + para;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    }
  }
  return chunks;
}

async function embedAndStore(chunks: string[]): Promise<void> {
  console.log(`Embedding ${chunks.length} chunks...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`Processing chunk ${i + 1}/${chunks.length}`);

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { error } = await supabase.from("documents").insert({
      content: chunk,
      embedding,
      metadata: { chunk_index: i, total_chunks: chunks.length },
    });

    if (error) {
      console.error(`Error inserting chunk ${i + 1}:`, error);
      throw error;
    }
  }
  console.log("All chunks embedded and stored successfully.");
}

async function main(): Promise<void> {
  const kbPath = path.join(process.cwd(), "knowledge-base.md");
  if (!fs.existsSync(kbPath)) {
    throw new Error("knowledge-base.md not found in project root");
  }

  const text = fs.readFileSync(kbPath, "utf-8");
  console.log(`Read ${text.length} characters from knowledge-base.md`);

  const chunks = chunkText(text);
  console.log(`Split into ${chunks.length} chunks`);

  // Clear existing documents before re-embedding
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error clearing documents:", deleteError);
    throw deleteError;
  }
  console.log("Cleared existing documents");

  await embedAndStore(chunks);
}

main().catch(console.error);
