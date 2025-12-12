import React, { createContext, useState, useEffect, useContext } from "react";
import { openApi } from "../../services/api";

const WhitelabelContext = createContext();

// Helper para obter URL base do backend (mesma lógica do api.js)
const getBackendUrl = () => {
  if (window.RUNTIME_CONFIG?.BACKEND_URL) {
    return window.RUNTIME_CONFIG.BACKEND_URL;
  }
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080";
  }
  const protocol = window.location.protocol;
  if (hostname.startsWith("atende") && !hostname.startsWith("atendeapi")) {
    return `${protocol}//atendeapi.${hostname.split('.').slice(1).join('.')}`;
  }
  return `${protocol}//api.${hostname}`;
};

const defaultWhitelabel = {
  companyName: "Atendechat",
  primaryColorLight: "#8B5CF6",
  secondaryColorLight: "#F3F4F6",
  backgroundColorLight: "#FFFFFF",
  textColorLight: "#1F2937",
  primaryColorDark: "#8B5CF6",
  secondaryColorDark: "#1F2937",
  backgroundColorDark: "#111827",
  textColorDark: "#F9FAFB",
  logoLight: null,
  logoDark: null,
  favicon: null,
  loginBanner: null,
  loginLogo: null,
};

export const WhitelabelProvider = ({ children }) => {
  const [whitelabel, setWhitelabel] = useState(defaultWhitelabel);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWhitelabel();
  }, []);

  const fetchWhitelabel = async () => {
    setLoading(true);
    try {
      // Usa rota pública que não precisa de autenticação (openApi não tem interceptors)
      const { data } = await openApi.get("/whitelabel/public");
      if (data) {
        setWhitelabel({ ...defaultWhitelabel, ...data });

        // Atualiza favicon se existir
        if (data.favicon) {
          updateFavicon(`${getBackendUrl()}${data.favicon}`);
        }

        // Atualiza title se existir
        if (data.companyName) {
          document.title = data.companyName;
        }
      }
    } catch (error) {
      // Usa configurações padrão se não encontrar whitelabel
      console.log("Whitelabel not found, using defaults");
      setWhitelabel(defaultWhitelabel);
    } finally {
      setLoading(false);
    }
  };

  const updateFavicon = (url) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  const getColors = (mode) => ({
    primary: mode === "light" ? whitelabel.primaryColorLight : whitelabel.primaryColorDark,
    secondary: mode === "light" ? whitelabel.secondaryColorLight : whitelabel.secondaryColorDark,
    background: mode === "light" ? whitelabel.backgroundColorLight : whitelabel.backgroundColorDark,
    text: mode === "light" ? whitelabel.textColorLight : whitelabel.textColorDark,
  });

  const getLogo = (mode) => {
    const logo = mode === "light" ? whitelabel.logoLight : whitelabel.logoDark;
    if (logo) {
      return `${getBackendUrl()}${logo}`;
    }
    return null;
  };

  // Função para obter URL completa de qualquer imagem do whitelabel
  const getImageUrl = (path) => {
    if (!path) return null;
    return `${getBackendUrl()}${path}`;
  };

  return (
    <WhitelabelContext.Provider
      value={{
        whitelabel,
        loading,
        fetchWhitelabel,
        getColors,
        getLogo,
        getImageUrl,
        getBackendUrl,
      }}
    >
      {children}
    </WhitelabelContext.Provider>
  );
};

export const useWhitelabelContext = () => {
  const context = useContext(WhitelabelContext);
  if (!context) {
    throw new Error("useWhitelabelContext must be used within WhitelabelProvider");
  }
  return context;
};

export { WhitelabelContext };
