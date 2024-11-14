'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import theme from './theme';
import { ThemeProvider, alpha } from "@mui/material/styles";
import React from 'react';
import MainAppBar from '../components/MainAppBar';
import { CssBaseline } from "@/components/CssBaseline";
import { Box } from '@mui/material';
import { State } from '@/model';
import { StateContext } from '@/components/StateContext';

const SNACK_AUTOHIDE_MS = 3000;

export default function Template({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {
    const [state, setState] = React.useState<State>(() => (
        {
            loading: false
        }
    ));

    return (
            <StateContext.Provider value={{ state, setState }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box component={"main"} sx={(theme) => ({
                        backgroundColor: alpha(theme.palette.primary.light, 0.2),
                        [theme.breakpoints.down('sm')]: {
                            backgroundColor: theme.palette.common.white
                        },
                        direction: "ltr",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh"
                    })} >
                        <Box component={"div"} sx={(theme) => ({
                            position: "fixed",
                            display: "block",
                            width: "100%",
                            zIndex: 1000
                        })}>
                            <MainAppBar />
                        </Box>
                        <Box component="div" sx={(theme) => ({
                            marginTop: theme.spacing(16),
                            [theme.breakpoints.down('sm')]: {
                                marginTop: theme.spacing(12)
                            }
                        })}>
                            {children}
                        </Box>
                    </Box>
                </ThemeProvider>
            </StateContext.Provider>
    );
}