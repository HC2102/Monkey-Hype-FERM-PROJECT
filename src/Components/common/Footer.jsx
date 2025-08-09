import React from "react";
import Box from '@mui/material/Box';
import { Container, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#164B60",
                color: "white",
                padding: "3rem 0",
                width: "100%",
                margin: 0,
                maxHeight: "auto",
                marginTop:"auto"
            }}>
                <Typography
                    variant="h6"
                    noWrap
                    href="/"
                    sx={{
                        mr: 2,
                        display: { md: 'flex' },
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        margin: 0
                    }}>
                    Made with 🪲 by HE170417
                </Typography>
            </Box>
        </>
    )
}
