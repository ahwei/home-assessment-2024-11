import { HfInference } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "hello" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
  if (!text) {
    return NextResponse.json({ error: "Text is missing" }, { status: 400 });
  }

  try {
    const result = await hf.textGeneration({
      model: "gpt2",
      inputs: text,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate text: " + error },
      { status: 500 },
    );
  }
}
