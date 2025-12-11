import axios from "axios";

// Detecta automaticamente o backend URL baseado no hostname atual
const getBackendUrl = () => {
	// Se REACT_APP_BACKEND_URL estiver definido, usa ele
	if (process.env.REACT_APP_BACKEND_URL) {
		console.log('🔧 [API Config] Usando REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
		return process.env.REACT_APP_BACKEND_URL;
	}

	// Caso contrário, usa o mesmo host/IP que está acessando o frontend
	const protocol = window.location.protocol; // http: ou https:
	const hostname = window.location.hostname; // localhost ou 192.168.0.130
	const backendPort = 8080;

	const url = `${protocol}//${hostname}:${backendPort}`;
	console.log('🔧 [API Config] Detecção automática:');
	console.log('   • Protocol:', protocol);
	console.log('   • Hostname:', hostname);
	console.log('   • Backend URL:', url);

	return url;
};

const baseURL = getBackendUrl();
console.log('✅ [API Config] Base URL configurada:', baseURL);

const api = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

export const openApi = axios.create({
	baseURL: baseURL
});

export default api;
