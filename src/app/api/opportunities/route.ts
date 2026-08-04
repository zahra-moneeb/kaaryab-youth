
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Opportunity } from "@/types/opportunity";


const filePath = path.join(
  process.cwd(),
  "src/data/opportunities.json"
);


// GET all opportunities
export async function GET() {
  const fileData = fs.readFileSync(filePath, "utf-8");

  const opportunities: Opportunity[] = JSON.parse(fileData);

  return NextResponse.json(opportunities);
}


// POST create opportunity

export async function POST(request: Request) {
  try {
    const newOpportunity = await request.json();

    const newId = Date.now();

    const opportunityToAdd = {
      id: newId,
      postedAt: new Date().toISOString().split("T")[0],
      featured: false,
      ...newOpportunity,
    };

    return NextResponse.json(
      opportunityToAdd,
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error("POST Error:", error);

    return NextResponse.json(
      {
        message: "Failed to create opportunity",
      },
      {
        status: 500,
      }
    );
  }
}