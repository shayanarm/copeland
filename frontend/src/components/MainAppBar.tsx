'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import NextLink from 'next/link';

// const pages: string[] = [];

const APP_NAME = "THE WEATHER APP";

function MainAppBar() {

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box href="/" component={NextLink} sx={{display: "flex", alignItems: "center", textDecoration: "none"}}>
                        <UmbrellaIcon color='primary'/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="span"
                            sx={(theme) => ({
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                            })}
                        >
                            {APP_NAME}
                        </Typography>
                    </Box>                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MainAppBar;