import axios from "axios";

let API_URL = 'http://localhost:8080/api/movie';

export const PostMovies = async (values) => {
    const formData = {
        name: values.name,
        duration: values.duration,
        category: {
            id: values.category.id},
        director: values.director
    }
    try {
        const response = await axios.post(API_URL, formData);
        return response.request
    }catch (error) {
        console.log(error)
        throw error;
    }
}

export const GetMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.result
    } catch (error) {
        throw error;
    }
}