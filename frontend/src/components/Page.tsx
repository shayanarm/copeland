'use client';
import React from "react";
import { Breakpoint, Container, Paper, useMediaQuery, useTheme } from "@mui/material";

export default function Page(props: { children: React.ReactNode, maxWidth?: Breakpoint | undefined }): React.JSX.Element {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (<Paper
        sx={theme => ({
            background: theme.palette.common.white,
            marginTop: theme.spacing(5),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
                paddingTop: theme.spacing(5)
            },
            overflow: "hidden"
        })}
        elevation={matchesSM ? 0 : 3}
        variant="elevation"
        style={{ maxWidth: theme.breakpoints.values[props.maxWidth || "md"] }}
        component={Container}>
        {props.children}
    </Paper>);
};