import { API } from "config/api";

const get = async (url) => {
    try {
        const result = (await API.get(url)).data;
        return result;
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const post = async (url, data) => {
    try {
        const result = await API.post(url, data);
        return result;
    } catch (error) {
        console.log("Error with POST: ", error);
        return [];
    }
}

const del = async (url) => {
    try {
        const result = (await API.delete(url)).data;
        return result;
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

export const fetchService = {
    get, post, del
}
