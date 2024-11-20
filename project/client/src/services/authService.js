import { jwtDecode } from "jwt-decode";
import { apiAuthenticator } from "./api"

const parseAuthorityFromResponse = (response) => {
    try {
        const { access_token } = response;
        const decodedToken = jwtDecode(access_token);
        const authority = decodedToken.roles?.[0]?.authority || null;
        const email = decodedToken.sub;

        return {
            role: authority,
            email: email
        };
    } catch (error) {
        console.error('Failed to parse authority:', error);
        return null;
    }
};

export const loginUser = async (userData) => {
    return apiAuthenticator
        .post('/authenticate', userData)
        .then((response) => {
            const jwtData = parseAuthorityFromResponse(response.data)
            return {
                ...response.data,
                ...jwtData
            }
        })
        .catch((error) => {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        });
};

export const registerBuyer = async (userData) => {
    return apiAuthenticator
        .post('/authenticate/register-buyer', userData)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error('Registration buyer error:', error.response?.data || error.message);
            throw error;
        });
};

export const registerSeller = async (userData) => {
    return apiAuthenticator
        .post('/authenticate/register-seller', userData)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error('Registration buyer error:', error.response?.data || error.message);
            throw error;
        });
};