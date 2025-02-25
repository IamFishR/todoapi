const fetch = require("node-fetch");

const getCompanyInfo = async (req, res) => {
    const symbol = req.body.symbol;
    if (!symbol) {
        return res.status(400).json({ status: false, message: "Symbol is required" });
    }

    const baseURL = "https://www.nseindia.com";
    const apiURL = `${baseURL}/api/quote-equity?symbol=${symbol}`;

    try {
        // Step 1: Get fresh cookies from NSE
        const initialResponse = await fetch(baseURL, { method: "GET", headers: { "User-Agent": "Mozilla/5.0" } });
        const cookies = initialResponse.headers.get("set-cookie");

        if (!cookies) {
            return res.status(403).json({ status: false, message: "Failed to get cookies from NSE" });
        }

        // Step 2: Use the retrieved cookies in the API request
        const options = {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
                "Cookie": cookies, // Attach the retrieved cookies
                "Referer": baseURL,
            }
        };

        const response = await fetch(apiURL, options);
        if (!response.ok) throw new Error(`NSE API error: ${response.statusText}`);

        const data = await response.json();
        return res.status(200).json({ status: true, message: "Company information", data });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Error fetching company info", error: error.message });
    }
};


exports = {
    getCompanyInfo
}