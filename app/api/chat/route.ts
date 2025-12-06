import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = process.env.MATHTUTO_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.question !== "string" || !body.question.trim()) {
      return NextResponse.json(
        { error: "Field 'question' is required." },
        { status: 400 }
      );
    }

    const question = body.question.trim();
    const level = typeof body.level === "string" ? body.level : "1BAC";
    const track = typeof body.track === "string" ? body.track : "SM";
    const maxChunks =
      typeof body.maxChunks === "number" && body.maxChunks > 0
        ? body.maxChunks
        : 6;

    const backendPayload = {
      question,
      level,
      track,
      max_chunks: maxChunks,
    };

    const backendResponse = await fetch(`${FASTAPI_URL}/explain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendPayload),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          error: "Backend error while calling /explain.",
          status: backendResponse.status,
        },
        { status: 502 }
      );
    }

    const data: {
      answer?: string;
      used_chunks?: unknown;
    } = await backendResponse.json();

    if (typeof data.answer !== "string" || !data.answer.trim()) {
      return NextResponse.json(
        { error: "Invalid response from backend: missing 'answer'." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      answer: data.answer,
      // Optional: expose used chunks for future UI / logging
      usedChunks: data.used_chunks ?? [],
    });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      { error: "Unexpected error in /api/chat." },
      { status: 500 }
    );
  }
}
