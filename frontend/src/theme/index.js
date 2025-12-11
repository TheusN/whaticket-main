// Theme configuration - Redesign 2025
// Nova identidade visual com Poppins, OLED dark mode e palette moderna

export const getDesignTokens = (mode) => ({
    // Typography - Poppins universal
    typography: {
        fontFamily: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '3.052rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2.441rem',
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.953rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.563rem',
            fontWeight: 600,
            lineHeight: 1.35,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.75,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        overline: {
            fontSize: '0.625rem',
            fontWeight: 700,
            lineHeight: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
        },
    },

    // Shape - Border radius system
    shape: {
        borderRadius: 12, // Padrão para cards
    },

    // Spacing - Múltiplos de 8px
    spacing: 8,

    // Breakpoints - Mobile-first responsivo
    breakpoints: {
        values: {
            xs: 0,      // Mobile portrait
            sm: 600,    // Mobile landscape / Tablet portrait
            md: 960,    // Tablet landscape
            lg: 1280,   // Desktop
            xl: 1920,   // Large desktop
        },
    },

    // Scrollbar styles
    scrollbarStyles: {
        "&::-webkit-scrollbar": {
            width: '8px',
            height: '8px',
        },
        "&::-webkit-scrollbar-thumb": {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: "#8B5CF6",
            borderRadius: '4px',
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: mode === "light" ? "#F5F5F5" : "#0A0A0A",
        },
    },

    scrollbarStylesSoft: {
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "#E5E5E5" : "#1F1F1F",
            borderRadius: '4px',
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: mode === "light" ? "#FAFAFA" : "#000000",
        },
    },

    // Palette - Nova identidade visual
    palette: {
        type: mode,

        // Primary - Roxo moderno (#8B5CF6)
        primary: {
            main: "#8B5CF6",
            light: "#A78BFA",
            dark: "#7C3AED",
            contrastText: "#FFFFFF",
        },

        // Secondary - Verde
        secondary: {
            main: "#10B981",
            light: "#34D399",
            dark: "#059669",
        },

        // Error
        error: {
            main: "#EF4444",
            light: "#FCA5A5",
            dark: "#DC2626",
        },

        // Warning
        warning: {
            main: "#F59E0B",
            light: "#FCD34D",
            dark: "#D97706",
        },

        // Info
        info: {
            main: "#3B82F6",
            light: "#93C5FD",
            dark: "#2563EB",
        },

        // Success
        success: {
            main: "#10B981",
            light: "#86EFAC",
            dark: "#059669",
        },

        // Background
        background: {
            default: mode === "light" ? "#FAFAFA" : "#000000", // OLED TRUE BLACK
            paper: mode === "light" ? "#FFFFFF" : "#0A0A0A", // OLED surface1
        },

        // Text
        text: {
            primary: mode === "light" ? "#171717" : "#FAFAFA",
            secondary: mode === "light" ? "#737373" : "#A3A3A3",
            disabled: mode === "light" ? "#D4D4D4" : "#525252",
        },

        // Divider
        divider: mode === "light" ? "#E5E5E5" : "#1A1A1A",

        // Custom colors (compatibilidade)
        textPrimary: mode === "light" ? "#8B5CF6" : "#FAFAFA",
        borderPrimary: mode === "light" ? "#8B5CF6" : "#FAFAFA",
        dark: { main: mode === "light" ? "#171717" : "#FAFAFA" },
        light: { main: mode === "light" ? "#FAFAFA" : "#171717" },

        // Surfaces (OLED)
        surface1: mode === "light" ? "#FFFFFF" : "#0A0A0A",
        surface2: mode === "light" ? "#FFFFFF" : "#141414",
        surface3: mode === "light" ? "#FFFFFF" : "#1F1F1F",

        // Borders
        border: mode === "light" ? "#E5E5E5" : "#262626",

        // Legacy colors (manter compatibilidade)
        tabHeaderBackground: mode === "light" ? "#F5F5F5" : "#0A0A0A",
        optionsBackground: mode === "light" ? "#FAFAFA" : "#0A0A0A",
        options: mode === "light" ? "#FAFAFA" : "#141414",
        fontecor: mode === "light" ? "#10B981" : "#FAFAFA",
        fancyBackground: mode === "light" ? "#FAFAFA" : "#000000",
        bordabox: mode === "light" ? "#E5E5E5" : "#262626",
        newmessagebox: mode === "light" ? "#F5F5F5" : "#141414",
        inputdigita: mode === "light" ? "#FFFFFF" : "#141414",
        contactdrawer: mode === "light" ? "#FFFFFF" : "#0A0A0A",
        announcements: mode === "light" ? "#F5F5F5" : "#141414",
        login: mode === "light" ? "#FFFFFF" : "#000000",
        announcementspopover: mode === "light" ? "#FFFFFF" : "#0A0A0A",
        chatlist: mode === "light" ? "#F5F5F5" : "#0A0A0A",
        boxlist: mode === "light" ? "#F5F5F5" : "#141414",
        boxchatlist: mode === "light" ? "#F5F5F5" : "#0A0A0A",
        total: mode === "light" ? "#FFFFFF" : "#0A0A0A",
        messageIcons: mode === "light" ? "#737373" : "#A3A3A3",
        inputBackground: mode === "light" ? "#FFFFFF" : "#141414",
        barraSuperior: mode === "light"
            ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
            : "#0A0A0A",
        boxticket: mode === "light" ? "#F5F5F5" : "#141414",
        campaigntab: mode === "light" ? "#F5F5F5" : "#141414",
        mediainput: mode === "light" ? "#F5F5F5" : "#000000",

        // WhatsApp colors (manter)
        whatsapp: {
            green: "#25D366",
            lightGreen: "#DCF8C6",
        },
    },

    // Shadows - Sistema de elevação
    shadows: mode === "light" ? [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ] : [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    ],

    // Transitions
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },

    // Overrides para Material-UI components
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
                },
                body: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                },
                // ♿ ACESSIBILIDADE: Focus visible para navegação por teclado
                '*:focus-visible': {
                    outline: `3px solid ${mode === "light" ? "#8B5CF6" : "#A78BFA"}`,
                    outlineOffset: '2px',
                    borderRadius: '4px',
                },
                // ♿ ACESSIBILIDADE: Remover outline apenas quando usando mouse
                '*:focus:not(:focus-visible)': {
                    outline: 'none',
                },
                // ♿ ACESSIBILIDADE: Skip to main content link
                '.skip-to-main': {
                    position: 'absolute',
                    left: '-9999px',
                    zIndex: 999,
                    padding: '1em',
                    backgroundColor: mode === "light" ? "#8B5CF6" : "#A78BFA",
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '0 0 4px 0',
                    '&:focus': {
                        left: '0',
                        top: '0',
                    },
                },
            },
        },
        MuiPaper: {
            root: {
                backgroundImage: 'none',
            },
            rounded: {
                borderRadius: 12,
            },
        },
        MuiButton: {
            root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                // ♿ ACESSIBILIDADE: Mínimo 48x48px para touch targets
                minHeight: '48px',
                minWidth: '48px',
                // ♿ ACESSIBILIDADE: Focus visible customizado
                '&:focus-visible': {
                    outline: `3px solid ${mode === "light" ? "#8B5CF6" : "#A78BFA"}`,
                    outlineOffset: '2px',
                },
            },
            contained: {
                boxShadow: mode === "light"
                    ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                    : '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
                '&:hover': {
                    boxShadow: mode === "light"
                        ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
                },
            },
            sizeSmall: {
                // ♿ ACESSIBILIDADE: Mesmo botões pequenos precisam ser clicáveis
                minHeight: '40px',
                minWidth: '40px',
            },
        },
        // ♿ ACESSIBILIDADE: IconButton com tamanho adequado
        MuiIconButton: {
            root: {
                padding: '12px', // Garante 48x48px
                '&:focus-visible': {
                    outline: `3px solid ${mode === "light" ? "#8B5CF6" : "#A78BFA"}`,
                    outlineOffset: '2px',
                    borderRadius: '50%',
                },
            },
        },
        MuiCard: {
            root: {
                borderRadius: 16,
                boxShadow: mode === "light"
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)',
            },
        },
        MuiTextField: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 12,
                    // ♿ ACESSIBILIDADE: Focus visible em inputs
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: mode === "light" ? "#8B5CF6" : "#A78BFA",
                            borderWidth: '2px',
                        },
                    },
                },
                // ♿ ACESSIBILIDADE: Labels sempre visíveis para screen readers
                '& .MuiInputLabel-outlined': {
                    '&.Mui-focused': {
                        color: mode === "light" ? "#8B5CF6" : "#A78BFA",
                    },
                },
            },
        },
        // ♿ ACESSIBILIDADE: Links com contraste adequado
        MuiLink: {
            root: {
                color: mode === "light" ? "#7C3AED" : "#A78BFA",
                textDecorationColor: mode === "light" ? "#7C3AED" : "#A78BFA",
                '&:hover': {
                    color: mode === "light" ? "#6D28D9" : "#C4B5FD",
                },
                '&:focus-visible': {
                    outline: `3px solid ${mode === "light" ? "#8B5CF6" : "#A78BFA"}`,
                    outlineOffset: '2px',
                    borderRadius: '2px',
                },
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: 20,
            },
        },
    },
});

export default getDesignTokens;
