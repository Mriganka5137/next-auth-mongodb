import { connectToDatabase } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body, { status: 200 });
}
