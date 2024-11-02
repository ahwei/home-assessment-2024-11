import companyProducts from "@/data/company_products.json";
import patents from "@/data/patents.json";
import { Patent } from "@/types/Patent";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  return NextResponse.json({ data: "hello" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { patentId, companyName } = await request.json();

  if (!patentId || !companyName) {
    return NextResponse.json(
      { error: "Patent ID or company name is missing" },
      { status: 400 },
    );
  }

  const patent: Patent | undefined = patents.find(
    (p: Patent) => p.id === patentId,
  );

  const company = companyProducts.companies.find((c) => c.name === companyName);

  if (!patent) {
    return NextResponse.json({ error: "Patent not found" }, { status: 404 });
  }

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  try {
    const prompt = `
    Analyze the potential patent infringement risks for the following company products based on the provided patent claims.

    Patent ID: ${patent.publication_number}
    Title: ${patent.title}
    Claims: ${patent.claims}

    Company Name: ${company.name}
    Products:
    ${company.products.map((p) => `- ${p.name}: ${p.description}`).join("\n")}

    Return the analysis in the following JSON format:

    {
      "analysis_id": "unique_id",
      "patent_id": "${patent.publication_number}",
      "company_name": "${company.name}",
      "analysis_date": "YYYY-MM-DD",
      "top_infringing_products": [
        {
          "product_name": "Product Name",
          "infringement_likelihood": "High/Moderate/Low",
          "relevant_claims": ["1", "2"],
          "explanation": "Detailed explanation...",
          "specific_features": ["Feature1", "Feature2"]
        }
      ],
      "overall_risk_assessment": "Overall risk description."
    }
    `;
    console.log("start ai generation");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a patent attorney." },
        { role: "user", content: prompt },
      ],
    });
    console.log("finish ai generation");

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to generate analysis");
    }
    const jsonStr = content.replace(/```json\s*|\s*```/g, "").trim();
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch (error) {
      console.error("error", error);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate analysis: " + error },
      { status: 500 },
    );
  }
}
