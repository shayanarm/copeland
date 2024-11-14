'use client';
import { CssBaselineProps, CssBaseline as DefaultBaseline, styled } from "@mui/material";

export const CssBaseline = styled(DefaultBaseline)<CssBaselineProps>(({ theme }) => ({
    '@global': {
        html: {
            WebkitFontSmoothing: 'auto',
        },
        body: {
            margin: 0
        },
        img: {
            verticalAlign: "middle"
        },
        svg: {
            verticalAlign: "middle"
        }
    },
}));