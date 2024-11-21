import { fetchService } from "./fetchService";

async function getAllPosts() {
    return fetchService.get("/posts")
}

async function getById(id) {
    return fetchService.get(`/posts/${id}`)
}

async function create(post) {
    return fetchService.post("/posts", post);
}

async function del(id) {
    return fetchService.del(`/posts/${id}`)
}

export const postService = {
    getAllPosts,
    getById,
    create,
    del
}
