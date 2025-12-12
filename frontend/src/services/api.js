import axios from "axios";

// Detecta automaticamente o backend URL baseado no hostname atual
const getBackendUrl = () => {
	// 1. RUNTIME CONFIG (prioridade máxima) - pode ser editado sem rebuild
	if (window.RUNTIME_CONFIG?.BACKEND_URL) {
		return window.RUNTIME_CONFIG.BACKEND_URL;
	}

	// 2. ENV var do build (fallback)
	if (process.env.REACT_APP_BACKEND_URL) {
		return process.env.REACT_APP_BACKEND_URL;
	}

	// 3. Auto-detect baseado no hostname
	const hostname = window.location.hostname;

	// Se localhost, usa backend local
	if (hostname === "localhost" || hostname === "127.0.0.1") {
		return "http://localhost:8080";
	}

	// Em produção, assume que a API está em api.DOMINIO ou atendeapi.DOMINIO
	const protocol = window.location.protocol;

	// Se o domínio começa com "atende", troca para "atendeapi"
	if (hostname.startsWith("atende") && !hostname.startsWith("atendeapi")) {
		return `${protocol}//atendeapi.${hostname.split('.').slice(1).join('.')}`;
	}

	// Caso contrário, adiciona prefixo "api."
	return `${protocol}//api.${hostname}`;
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
