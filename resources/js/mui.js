import { createTheme } from "@mui/material/styles";
import { light, dark } from "./Themes/DefaultTheme";

const buildPalette = (theme) => {
    return {
        mode: theme.mode,

        primary: { main: theme.colors.primary },
        secondary: { main: theme.colors.secondary },
        accent: { main: theme.colors.accent },
        error: { main: theme.colors.error },

        textField: { main: theme.colors.textField },
        closeText: { main: theme.colors.closeText },

        background: {
            default: theme.colors.background,
        },

        text: {
            primary: theme.colors.text.primary,
            secondary: theme.colors.text.secondary,
        },
    };
};

export const getTheme = (mode = "light") => {
    const isDark = mode === "dark";
    const themeConfig = isDark ? dark : light;

    return createTheme({
        palette: buildPalette(themeConfig),

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

            // =====================================================
            // ✅ DARK MODE ONLY OVERRIDES (DataGrid + Inputs fix)
            // =====================================================
            ...(isDark && {
                MuiCheckbox: {
                    styleOverrides: {
                        root: {
                            color: themeConfig.colors.textField,

                            "&.Mui-checked": {
                                color: themeConfig.colors.textField,
                            },

                            "&.MuiCheckbox-indeterminate": {
                                color: themeConfig.colors.textField,
                            },
                        },
                    },
                },

                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: themeConfig.colors.textField,
                            },
                        },
                    },
                },
            }),
        },

        transitions: {
            duration: {
                enteringScreen: 400,
                leavingScreen: 300,
            },
        },
    });
};
