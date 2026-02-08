import notificationapi from 'notificationapi-node-server-sdk';

let initialized = false;

export const initializedNotificationAPI = () => {
    if (!initialized) {
        const {
            NOTIFICATIONAPI_CLIENT_ID: apiKey,
            NOTIFICATIONAPI_CLIENT_SECRECT: apiSecret,
            NOTIFICATIONAPI_API_URL: baseURL
        } = process.env

        if (!apiKey || !apiSecret) {
            throw new Error(
                "Notification API credentials not found."
            )
        }

        notificationapi.init(apiKey, apiSecret, baseURL ? { baseURL } : undefined)
        initialized = true
    }

    return notificationapi;
}