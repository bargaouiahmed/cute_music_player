import { API_KEY, HOSTING_KEY } from "./keys";

const getUrlStatus = async (url) => {
    try {
        const urlId = url.split('=')[1];
        console.log("Video ID:", urlId);

        const requestUrl = `https://${HOSTING_KEY}/dl?id=${urlId}`;
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": HOSTING_KEY
            }
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Handle different response statuses
        if (data.status === "processing") {
            // Optional: Add a retry mechanism
            await new Promise(resolve => setTimeout(resolve, 1000));
            return getUrlStatus(url);
        }

        return data;
    } catch (error) {
        console.error("Error fetching MP3 conversion:", error);
        throw error;
    }
}

export default getUrlStatus
