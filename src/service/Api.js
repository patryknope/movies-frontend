import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/movies",
});

export const addMovie = async data => {
	try {
		const response = await api.post("", data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMovies = async ({ page = 0, size = 10 } = {}) => {
	try {
		page = parseInt(page);

		const response = await api.get("", {
			params: { page, size },
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(
				`Failed to get movies. Server returned ${response.status}`
			);
		}
	} catch (error) {
		console.error(error);
		throw error;
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
		throw error;
	}
};

export const deleteAllMovies = async () => {
	try {
		const response = await api.delete("/");
		console.log("deleteAllMovies response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const setMovies = async movies => {
	try {
		const response = await api.put("/", movies);
		console.log("setMovies response:", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
