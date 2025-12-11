import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../services/api";

const WhitelabelContext = createContext();

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
      // Tenta buscar whitelabel do backend
      const { data } = await api.get("/whitelabel");
      if (data) {
        setWhitelabel({ ...defaultWhitelabel, ...data });

        // Atualiza favicon se existir
        if (data.favicon) {
          updateFavicon(`${process.env.REACT_APP_BACKEND_URL}${data.favicon}`);
        }

        // Atualiza title se existir
        if (data.companyName) {
          document.title = data.companyName;
        }
      }
    } catch (error) {
      // Usa configurações padrão se não encontrar whitelabel
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
      return `${process.env.REACT_APP_BACKEND_URL}${logo}`;
    }
    return null;
  };

  return (
    <WhitelabelContext.Provider
      value={{
        whitelabel,
        loading,
        fetchWhitelabel,
        getColors,
        getLogo,
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
