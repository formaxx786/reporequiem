import { NextResponse } from "next/server";
import { createGrave, getAllGraves, validateGraveInput } from "@/lib/graves";

export async function GET() {
  const graves = await getAllGraves();
  return NextResponse.json({ graves });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validInput = validateGraveInput(payload);
    const grave = await createGrave(validInput);

    return NextResponse.json({ grave }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create grave" },
      { status: 400 }
    );
  }
}
