const axios = require("axios");

const BATCH_SIZE = 50;

async function fetchCompanies(webhook, totalCount = 10000) {
  const companies = [];
  let start = 0;
  const limit = BATCH_SIZE;

  while (start < totalCount) {
    try {
      const url = `${webhook}/crm.company.list`;

      const params = {
        start: start,
        order: JSON.stringify({ ID: "ASC" }),
        filter: JSON.stringify({}),
        select: JSON.stringify(["*", "UF_*"]),
      };

      const response = await axios.get(url, { params });

      if (response.data && response.data.result) {
        const batchCompanies = response.data.result;
        companies.push(...batchCompanies);

        if (batchCompanies.length < limit) {
          break;
        }

        start += limit;
      } else {
        throw new Error("Invalid response from Bitrix24");
      }
    } catch (error) {
      console.error(
        `Error fetching companies batch (start: ${start}):`,
        error.message
      );
      throw error;
    }
  }

  return companies;
}

module.exports = {
  fetchCompanies,
};
