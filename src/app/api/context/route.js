import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("POST API NEXT.js")
    const formData = await req.formData();

    // Get data from frontend
    const file = formData.get("file");
    const filename = formData.get("filename");
    const query = formData.get("query");
    const new_file = formData.get("new_file");
    const old_file_name = formData.get("old_file_name");

    // Prepare form data to send to Flask
    const backendForm = new FormData();
    backendForm.append("file", file, filename);
    backendForm.append("filename", filename);
    backendForm.append("query", query);
    backendForm.append("new_file", new_file);
    backendForm.append("old_file_name", old_file_name);

    // Call Flask backend with all the data
    const flaskUrl=process.env.FLASK_BACKEND_URL || 'http://localhost:8080'
    const response = await fetch(`${flaskUrl}/context`, {
      method: "POST",
      body: backendForm,
    });

    // Check if response was correct
    if (!response.ok) {
      throw new Error("Flask backend error");
    }

    // Wait and then return data from Flask to frontend
    const data = await response.json();
    return NextResponse.json(data);
  } 
  catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
