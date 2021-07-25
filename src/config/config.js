const HOST = process.env.REACT_APP_BACKEND_HOST || "http://localhost";
const PORT = process.env.REACT_APP_BACKEND_PORT || "8080";
const BASE_API_URL = HOST + ":" + PORT;

export {
    BASE_API_URL
}