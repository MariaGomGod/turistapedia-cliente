const HOST = process.env.BACKEND_HOST || "http://localhost";
const PORT = process.env.BACKEND_PORT || "8080";
const BASE_API_URL = HOST + ":" + PORT;

export {
    BASE_API_URL
}