import { fetchService } from "./fetchService";

async function getAllLibraries() {
    return fetchService.get("/libraries")
}

async function getLibraryById(id) {
    return fetchService.get(`/libraries/${id}`)
}

async function getAllBooks(libraryId) {
    return fetchService.get(`/libraries/${libraryId}/books`)
}

async function createBook(libraryId, book) {
    return fetchService.post(`/libraries/${libraryId}/books`, book);
}

export const libraryService = {
    getAllLibraries,
    getLibraryById,
    getAllBooks,
    createBook
}
