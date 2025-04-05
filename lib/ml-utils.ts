// Utility functions for ML model integration

// Function to preprocess transaction data before sending to ML model
export function preprocessTransaction(transaction: any) {
  // Clone the transaction to avoid modifying the original
  const processedData = { ...transaction }

  // Convert categorical variables to numerical if needed
  // This depends on how your ML model expects the data

  // Example: Convert boolean values to 0/1
  if (typeof processedData.isInternational === "boolean") {
    processedData.isInternational = processedData.isInternational ? 1 : 0
  }

  if (typeof processedData.isNewMerchant === "boolean") {
    processedData.isNewMerchant = processedData.isNewMerchant ? 1 : 0
  }

  if (typeof processedData.isNewLocation === "boolean") {
    processedData.isNewLocation = processedData.isNewLocation ? 1 : 0
  }

  // Add any feature engineering logic here
  // For example, calculate time since last transaction, etc.

  return processedData
}

// Function to interpret ML model results
export function interpretResults(prediction: any) {
  // Add logic to interpret the raw model output
  // This depends on what your model returns

  const interpretedResults = {
    ...prediction,
    riskLevel: getRiskLevel(prediction.riskScore),
    recommendedAction: getRecommendedAction(prediction.riskScore, prediction.fraudProbability),
  }

  return interpretedResults
}

// Helper function to determine risk level from score
function getRiskLevel(riskScore: number) {
  if (riskScore < 30) return "Low"
  if (riskScore < 60) return "Medium"
  return "High"
}

// Helper function to recommend actions based on risk
function getRecommendedAction(riskScore: number, fraudProbability: number) {
  if (riskScore > 80 || fraudProbability > 0.8) {
    return "Block Transaction and Investigate"
  }

  if (riskScore > 60 || fraudProbability > 0.6) {
    return "Flag for Review"
  }

  if (riskScore > 40 || fraudProbability > 0.4) {
    return "Additional Verification"
  }

  return "Approve"
}

// Function to calculate model performance metrics
export function calculateModelMetrics(predictions: any[], actualLabels: any[]) {
  // Calculate accuracy, precision, recall, F1 score, etc.
  // This is a simplified example

  let truePositives = 0
  let falsePositives = 0
  let trueNegatives = 0
  let falseNegatives = 0

  for (let i = 0; i < predictions.length; i++) {
    const predicted = predictions[i] > 0.5 // Assuming binary classification with 0.5 threshold
    const actual = actualLabels[i] === 1

    if (predicted && actual) truePositives++
    if (predicted && !actual) falsePositives++
    if (!predicted && !actual) trueNegatives++
    if (!predicted && actual) falseNegatives++
  }

  const accuracy = (truePositives + trueNegatives) / predictions.length
  const precision = truePositives / (truePositives + falsePositives)
  const recall = truePositives / (truePositives + falseNegatives)
  const f1Score = (2 * (precision * recall)) / (precision + recall)

  return {
    accuracy,
    precision,
    recall,
    f1Score,
    confusionMatrix: {
      truePositives,
      falsePositives,
      trueNegatives,
      falseNegatives,
    },
  }
}

