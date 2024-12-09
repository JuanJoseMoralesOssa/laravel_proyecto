import axios from "axios";

const getCategories = async () => {
    try {
        const response = await axios.get("/categories/all", {
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        });
        return response.data;
        // const response = await axios.get("/api/categories");
        // return response.data;
    } catch (error) {
        console.error(error);
    }
};

const CategoriesService = {
    getCategories,
};

export default CategoriesService;
