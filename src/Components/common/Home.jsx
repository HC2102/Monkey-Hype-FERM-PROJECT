import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                textAlign: "center",
                p: 3,
            }}
        >
            <Container>
                <Typography variant="h2" gutterBottom>
                    Welcome to Monkey Hype 🙈
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <img src="/img/landing.jpg" alt="landing" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                </Box>
                <Button component={Link} to="/game" variant="contained" color="primary">
                    Start Typing
                </Button>
            </Container>
        </Box>
    );
}
