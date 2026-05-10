import { createTheme } from "@mui/material/styles";
import { light, dark } from "./Themes/DefaultTheme";

const buildPalette = (theme) => {
    const isDark = theme.mode === "dark";

    return {
        mode: theme.mode,

        primary: { main: theme.colors.primary },
        secondary: { main: theme.colors.secondary },
        error: { main: theme.colors.error },

        background: {
            default: theme.colors.background,
        },

        text: {
            primary: theme.colors.text.primary,
            secondary: theme.colors.text.secondary,
        },
    };
};

export const getTheme = (mode = "light") =>
    createTheme({
        palette: buildPalette(mode === "dark" ? dark : light),

        gradients: {
            primary: "linear-gradient(135deg, #0B1C3A 0%, #142C55 100%)",
        },

        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },

        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    body: {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    },
                }),
            },

            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                    },
                },
            },

            MuiButton: {
                defaultProps: {
                    variant: "contained",
                },
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        borderRadius: 8,
                    },
                },
            },

            MuiTextField: {
                defaultProps: {
                    variant: "outlined",
                },
            },
        },
    });
