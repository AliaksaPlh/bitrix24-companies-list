const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { fetchCompanies } = require("./services/bitrix24");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Bitrix24 API configuration
const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK || "";

app.get("/health", (req, res) => {
  console.log("Health check requested");
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/api/companies", async (req, res) => {
  try {
    const webhook = req.body.webhook || BITRIX24_WEBHOOK;
    const limit = req.body.limit || 10000;

    if (!webhook) {
      return res.status(400).json({
        error:
          "Webhook URL is required. Provide it in request body or set BITRIX24_WEBHOOK environment variable.",
      });
    }

    console.log(`Fetching companies from Bitrix24 (limit: ${limit})...`);
    const companies = await fetchCompanies(webhook, limit);

    console.log(`Successfully fetched ${companies.length} companies`);

    res.json({
      success: true,
      count: companies.length,
      companies: companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      error: "Failed to fetch companies",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
