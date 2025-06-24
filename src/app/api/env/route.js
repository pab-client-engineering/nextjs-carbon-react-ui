import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("env called");
    const config = { 
      backend_url: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost'
    };


    return NextResponse.json(
      config
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
