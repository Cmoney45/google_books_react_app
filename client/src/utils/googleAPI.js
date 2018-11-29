import axios from "axios";
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
const api_key = env.REACT_APP_GOOGLE_BOOKS_API_KEY || process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export default {
    // Search the book with the given id
    searchBook: (id) => {

        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${id}&key=${api_key}`);
    }

};
