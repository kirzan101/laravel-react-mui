import { createTheme } from "@mui/material/styles";
import { light, dark } from "./Themes/DefaultTheme";
import { lighten } from "@mui/material/styles";

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

            // =====================================================
            // ✅ OVERRIDES FOR DATAGRID (FOCUS + HOVER)
            // =====================================================
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
                            {
                                outline: "none",
                                boxShadow: "none",
                            },
                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                            {
                                outline: "none",
                                boxShadow: "none",
                            },
                    },
                },
            },

            // =====================================================
            // ✅ START OVERRIDES FOR TABS (LEFT SIDEBAR)
            // =====================================================
            MuiTabs: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRight: `1px solid ${theme.palette.divider}`,
                        minWidth: 220,
                        paddingRight: theme.spacing(1),

                        "& .MuiTabs-indicator": {
                            display: "none",
                        },
                    }),
                },
            },

            MuiTab: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "left",
                        textTransform: "none",

                        minHeight: 52,
                        gap: theme.spacing(1.5),

                        margin: theme.spacing(0.5, 1),
                        padding: theme.spacing(1.5, 2),

                        borderRadius: theme.shape.borderRadius * 2,

                        color: theme.palette.text.primary,

                        transition: theme.transitions.create(
                            ["background-color", "color"],
                            {
                                duration: theme.transitions.duration.shortest,
                            },
                        ),

                        "& .MuiSvgIcon-root": {
                            fontSize: 22,
                        },

                        "&.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,

                            "& .MuiSvgIcon-root": {
                                color: theme.palette.primary.contrastText,
                            },
                        },

                        "&:hover": {
                            backgroundColor: lighten(
                                theme.palette.primary.main,
                                0.2,
                            ),
                        },
                    }),
                },
            },
            // =====================================================
            // ✅ END OVERRIDES FOR TABS (LEFT SIDEBAR)
            // =====================================================
        },

        transitions: {
            duration: {
                enteringScreen: 400,
                leavingScreen: 300,
            },
        },
    });
};
