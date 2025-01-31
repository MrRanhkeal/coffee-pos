import axios from "axios";
import { Config } from "./config";
import { getAccessToken } from "../store/profile.store";
import { setServerStatus } from "../store/server.store";

export const request = async (url = "", method = "get", data = {}) => {
    try {
    // Fetch the access token
    const access_token = getAccessToken();

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
            console.error("Unexpected error:", error);
        }

        // Log the error and return `false` for failure
        console.error("Error in request:", error);
        return false;
    }
};

    // import axios from "axios";
    // import {Config} from "./config";
    // import { getAccessToken } from "../store/profile.store";
    // import { setServerStatus } from "../store/server.store";
    // export const request = (url = "", method = "get", data = {}) => {

    //      // in react
    //     // var headers = { "Content-Type": "application/json" };
    //     // if (data instanceof FormData) {
    //     //     // check if param data is FormData
    //     //     headers = { "Content-Type": "multipart/form-data" };
    //     // }


    //     //verify access_token from server
    //     var access_token = getAccessToken();
    //     return axios({
    //         //data connection with server
    //         url: Config.base_url + url,
    //         method: method,
    //         data: data,
    //         //verify access_token
    //         headers: {
    //             //...headers,
    //         Authorization: "Bearer " + access_token,
    //         },

    //         //get token fix from server
    //        //headers:{ Authorization: "Bearer " + access_token, }
    //     })
    //         .then((res) => {
    //             setServerStatus(200);
    //         return res.data;
    //         })
    //         .catch((err) => {
    //         var response = err.response;
    //         if (response) {
    //             var status = response.status;
    //             if (status == "401") {
    //                 status=403;
    //             }
    //             setServerStatus(status);
    //         } 
    //         else if (err.code == "ERR_NETWORK") {
    //             setServerStatus("error");
    //         }
    //         console.log( err);
    //         return false;
    //     });
    // };
//other source

//then fixed
// Filename: request.js
// import axios from "axios";
// import { Config } from "./config";
// import { getAccessToken } from "../store/profile.store";
// import { setServerStatus } from "../store/server.store";

// export const request = async (url = "", method = "get", data = {}) => {
//     try {
//         // Validate Config.base_url
//         if (!Config || !Config.base_url) {
//             throw new Error("Config.base_url is not defined or invalid.");
//         }

//         // Retrieve access token
//         const accessToken = getAccessToken();
//         if (!accessToken) {
//             throw new Error("Access token is missing or invalid.");
//         }

//         // Log the outgoing request for debugging
//         console.debug("Sending request:", {
//             url: Config.base_url + url,
//             method,
//             data,
//         });

//         // Perform Axios request
//         const response = await axios({
//             url: Config.base_url + url,
//             method,
//             data,
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         // Success: Update server status
//         setServerStatus(200);
//         console.debug("Response received:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Request error:", error);

//         // Handle known error cases
//         const response = error.response;
//         if (response) {
//             let status = response.status;
//             if (status === 401) {
//                 status = 403; // Handle unauthorized as forbidden
//             }
//             setServerStatus(status);
//         } else if (error.code === "ERR_NETWORK") {
//             setServerStatus("error"); // Network error
//         } else {
//             setServerStatus(500); // General server error
//         }

//         return false;
//     }
// };

