import axios from "axios";



export const getCategories = async () => {
    try {

        const response = await axios.get("http://localhost:8080/api/category");
        console.log(response.data);

        return response.data.result;
    }catch (error) {
        console.error(error);
    }
}
