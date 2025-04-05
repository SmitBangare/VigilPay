import { NextResponse } from "next/server"

// This is a Next.js API route that will communicate with your ML model
export async function POST(request: Request) {
  try {
    // Parse the incoming transaction data
    const transaction = await request.json()

    // Option 1: If your ML model is deployed as an external API
    // Replace this URL with your actual ML model endpoint
    const response = await fetch("https://your-ml-model-api.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })

    const prediction = await response.json()

    // Option 2: If you're using a local ML model or want to implement custom logic
    // You would process the transaction data here and return a prediction

    return NextResponse.json({
      success: true,
      prediction: prediction,
      // Include any additional data your frontend needs
      riskScore: prediction.riskScore,
      fraudProbability: prediction.fraudProbability,
      flagged: prediction.riskScore > 60,
    })
  } catch (error) {
    console.error("Error processing prediction:", error)
    return NextResponse.json({ success: false, error: "Failed to process prediction" }, { status: 500 })
  }
}

