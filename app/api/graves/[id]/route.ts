import { NextResponse } from "next/server";
import { getGraveById } from "@/lib/graves";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const grave = await getGraveById(id);

  if (!grave) {
    return NextResponse.json({ error: "Grave not found" }, { status: 404 });
  }

  return NextResponse.json({ grave });
}
