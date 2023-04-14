import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/movies",
});

export const addMovie = async data => {
	console.log("addMovie called with data:", data);
	try {
		const response = await api.post("", data);
		console.log("addMovie response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getMovies = async () => {
	try {
		const response = await api.get("");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const populateMovies = async () => {
	try {
		const response = await api.post("/populate");
		console.log("populateMovies response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const searchMovies = async searchQuery => {
	try {
		const response = await api.get("/search", {
			params: { phrase: searchQuery },
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const deleteAllMovies = async () => {
	try {
		const response = await api.delete("/movies");
		console.log("deleteAllMovies response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
