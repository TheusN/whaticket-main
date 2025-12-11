import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import {enUS, ptBR, esES} from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery, CssBaseline } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';
import { TicketsFilterProvider } from './context/Tickets/TicketsFilterContext';
import { WhitelabelProvider, useWhitelabelContext } from './context/Whitelabel/WhitelabelContext';
import getDesignTokens from "./theme";

import Routes from "./routes";

const queryClient = new QueryClient();

// Componente interno que usa o WhitelabelContext para cores dinâmicas
const ThemedApp = () => {
    const [locale, setLocale] = useState();
    const { whitelabel, loading: whitelabelLoading } = useWhitelabelContext();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    // Preparar cores do whitelabel para o tema
    const whitelabelColors = React.useMemo(() => {
        if (!whitelabel) return null;
        return {
            primaryColorLight: whitelabel.primaryColorLight,
            primaryColorDark: whitelabel.primaryColorDark,
            secondaryColorLight: whitelabel.secondaryColorLight,
            secondaryColorDark: whitelabel.secondaryColorDark,
            backgroundColorLight: whitelabel.backgroundColorLight,
            backgroundColorDark: whitelabel.backgroundColorDark,
            textColorLight: whitelabel.textColorLight,
            textColorDark: whitelabel.textColorDark,
        };
    }, [whitelabel]);

    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode, whitelabelColors), locale),
        [mode, whitelabelColors, locale]
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale = i18nlocale?.substring(0, 2) ?? 'pt';

        if (browserLocale === "pt"){
            setLocale(ptBR);
        }else if( browserLocale === "en" ) {
            setLocale(enUS)
        }else if( browserLocale === "es" )
            setLocale(esES)

    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);

    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                    <TicketsFilterProvider>
                      <Routes />
                    </TicketsFilterProvider>
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

// App principal que envolve tudo com o WhitelabelProvider
const App = () => {
    return (
        <WhitelabelProvider>
            <ThemedApp />
        </WhitelabelProvider>
    );
};

export default App;
