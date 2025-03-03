import axios from "axios";
import { Config } from "./config";
import { getAccessToken } from "../store/profile.store";
import { setServerStatus } from "../store/server.store";

export const request = async (url = "", method = "get", data = {}) => {
    try {
        // Validate Config.base_url
        if (!Config || !Config.base_url) {
            throw new Error("Config.base_url is not defined or invalid.");
        }

        // Fetch the access token
        const access_token = getAccessToken();
        if (!access_token) {
            throw new Error("Access token is missing or invalid.");
        }

        // Make the request to the server
        const response = await axios({
            url: Config.base_url + url,
            method: method,
            data: method.toLowerCase() === "get" ? undefined : data, // Only attach `data` for non-GET methods
            headers: {
                Authorization: `Bearer ${access_token}`, // Include Bearer token
                "Content-Type": "application/json", // Explicitly set content type
            },
        });

        // Set server status to 200 on success
        setServerStatus(200);
        return response.data;
    } catch (error) {
        // Handle errors and set appropriate server status
        if (error.response) {
            const status = error.response.status === 401 ? 403 : error.response.status;
            setServerStatus(status);
        } else if (error.code === "ERR_NETWORK") {
            setServerStatus("error");
        } else {
            setServerStatus(500); // General server error
            console.error("Unexpected error:", error);
        }

        // Log the error and return `false` for failure
        console.error("Error in request:", error);
        return false;
    }
};

