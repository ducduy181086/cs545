import { jwtDecode } from "jwt-decode";
import { apiAuthenticator } from "./api"
const parseAuthorityFromResponse = (response) => {
    try {
        const { access_token } = response;
        const decodedToken = jwtDecode(access_token);
        const authority = decodedToken.roles?.[0]?.authority || null;
        if (authority) {
            localStorage.setItem('authority', authority);
        }

        return authority;
    } catch (error) {
        console.error('Failed to parse authority:', error);
        return null;
    }
};

export const loginUser = async (userData) => {
    return apiAuthenticator
        .post('/authenticate', userData)
        .then((response) => {
            const role = parseAuthorityFromResponse(response.data)
            return {
                ...response.data,
                role: role
            }
        })
        .catch((error) => {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        });
};

export const registerBuyer = async (email, password) => {
    return apiAuthenticator
        .post('/authenticate/register-buyer', { email, password })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error('Registration buyer error:', error.response?.data || error.message);
            throw error;
        });
};

export const registerSeller = async (email, password) => {
    return apiAuthenticator
        .post('/authenticate/register-seller', { email, password })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error('Registration buyer error:', error.response?.data || error.message);
            throw error;
        });
};