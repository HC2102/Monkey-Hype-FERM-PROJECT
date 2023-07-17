import { Container, Typography } from "@mui/material";
import React from "react";

export default function Home() {
    return (<>
        <Container sx={{
            margin: "2rem auto",
            alignContent: "center"
        }}>
            <Container sx={{textAlign:"center"}} >
                <Typography variant="h2">Welcome to Monkey Hype 🙈</Typography>
                <div className="dashboard-container" style={{ justifyContent: "center", width: "100%", }}>
                    <img src="/img/landing.jpg" alt="landing " style={{ margin: " 0" }} />
                </div>
            </Container>
        </Container>
    </>)
}