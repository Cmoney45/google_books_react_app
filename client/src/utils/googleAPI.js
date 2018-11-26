import axios from "axios";
const api_key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export default {
    // Search the book with the given id
    searchBook: (id) => {

        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${id}&key=${api_key}`);
    }

};
