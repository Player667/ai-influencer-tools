const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" })); // Increase request size limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded body limit
app.use(cors());


app.post("/generate-image", async (req, res) => {
    try {
      console.log("✅ Received Request:", req.body);
  
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token r8_DyveRv9IUhQJ4wVmhqOYSvUhGaB5mCg3Mt5uq",
        },
        body: JSON.stringify(req.body),
      });
  
      if (!response.ok) {
        console.error(`🔴 Replicate API Error: ${response.statusText}`);
        return res.status(500).json({ error: `Replicate API error: ${response.statusText}` });
      }
  
      let result = await response.json();
      console.log("🟡 Replicate API Response:", result);
  
      // Extract prediction ID
      const predictionId = result.id;
      const statusUrl = result.urls.get;
  
      // Poll the API until the status is "succeeded" or "failed"
      let status = result.status;
      while (status !== "succeeded" && status !== "failed") {
        console.log(`⏳ Waiting for prediction ${predictionId} to complete... Current status: ${status}`);
  
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before checking again
  
        const statusResponse = await fetch(statusUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token r8_DyveRv9IUhQJ4wVmhqOYSvUhGaB5mCg3Mt5uq",
          },
        });
  
        result = await statusResponse.json();
        status = result.status;
      }
  
      if (status === "succeeded") {
        console.log("🟢 Prediction Succeeded!", result);
        res.json(result);
      } else {
        console.error("🔴 Prediction Failed:", result.error);
        res.status(500).json({ error: "Replicate prediction failed." });
      }
    } catch (error) {
      console.error("🔴 Error in Backend:", error.message);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  });
  

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Backend server running on port ${PORT}`));
