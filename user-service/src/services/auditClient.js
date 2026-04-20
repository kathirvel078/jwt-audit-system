const axios = require("axios");

const logEvent = async (event) => {
  try {
    await axios.post(`${process.env.AUDIT_SERVICE_URL}/audit`, event);
  } catch (err) {
    console.error("Audit error:", err.message);
  }
};

module.exports = logEvent;