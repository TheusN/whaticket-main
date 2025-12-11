import axios from "axios";

// Detecta automaticamente o backend URL baseado no hostname atual
const getBackendUrl = () => {
	// Se REACT_APP_BACKEND_URL estiver definido, usa ele
	if (process.env.REACT_APP_BACKEND_URL) {
		return process.env.REACT_APP_BACKEND_URL;
	}

	// Caso contrário, usa o mesmo host/IP que está acessando o frontend
	const protocol = window.location.protocol;
	const hostname = window.location.hostname;
	const backendPort = 8080;

	return `${protocol}//${hostname}:${backendPort}`;
};

const baseURL = getBackendUrl();

const api = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

export const openApi = axios.create({
	baseURL: baseURL
});

export default api;
