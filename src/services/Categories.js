import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/category");
        console.log(response.data);
        return response.data;
    }catch (error) {
        console.error(error);
    }
}
