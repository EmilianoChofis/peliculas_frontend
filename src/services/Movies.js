import axios from 'axios';

let API_URL = 'http://localhost:8080/api/movie';

export const PostMovies = async (values) => {
	const formData = {
		name: values.name,
		duration: values.duration,
		category: {
			id: values.category.id,
		},
		director: values.director,
	};
	try {
		const response = await axios.post(API_URL, formData);
		return response.request;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const GetMovies = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data.result;
	} catch (error) {
		throw error;
	}
};

export const GetMovieById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data.result;
	} catch (error) {
		throw error;
	}
};

export const PutMovie = async (values) => {
	const formData = {
		name: values.name,
		duration: values.duration,
		category: {
			id: values.category.id,
		},
		director: values.director,
	};
	try {
		const response = await axios.put(`${API_URL}/${values.id}`, formData);
		return response.request;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const UpdateStatusMovie = async (id) => {
	try {
		const response = await axios.put(`${API_URL}/status/${id}`);
		return response.request;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const UpdateMovie = async (values) => {
	const formData = {
		id: values.id,
		name: values.name,
		duration: values.duration,
		category: {
			id: values.category.id,
		},
		director: values.director,
	};
	try {
		const response = await axios.put(`${API_URL}`, formData);
		return response.request;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
