import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Text from "../../data/textFakeData";
import { Box, Button, Container, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import '../assets/typo.css'
import LinearProgress from '@mui/material/LinearProgress';
import Timer from "../Timer";
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export default function Game() {
    const nav = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem("user"));
    const [text, setText] = useState("");
    const [input, setInput] = useState("");
    const [lastLetter, setLastLetter] = useState("");
    const [words, setWords] = useState([]);
    const [wpm, setWpm] = useState(0);
    const [completed, setCompleted] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState();
    const [started, setStarted] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const [rootCount, setRootCount] = useState(countDown);

    const [textList, setTextList] = useState([]);
    const [textChoice, setTextChoice] = useState("");
    const ref = useRef(null);

    //timer


    //set text
    useEffect(() => {
        if (userId === null) {
            nav('/');
        }
        setText(Text);
        setWords(Text.split(" "));
        setCompleted([]);
        setIsFinished(false);
        setWords([]);
        setText("");
        setInput("");
        setLastLetter("");
        setWpm(0);
        setRootCount(countDown);
    }, []);

    //get paragraph that are available 
    useEffect(() => {
        const urlGet = `http://localhost:9999/text?userId=${userId}`
        fetch(urlGet)
            .then(res => res.json())
            .then(data => setTextList(data))
            .catch(setTextList([]));
    }, []);

    const handleSelectChange = (e) => {
        setTextChoice(e.target.value);
    }
    const handleCountDownChange = (e) => {
        setCountDown(e.target.value);
    }


    const calculateWpm = () => {
        const now = Date.now();
        const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s
        console.log(diff);
        const wordsTyped = Math.ceil(
            completed.reduce((acc, word) => (acc += word.length), 0) / 5
        );
        const wpm = Math.ceil(wordsTyped / diff);
        setWpm(wpm);
    }


    const handleStartGame = () => {
        setCompleted([]);
        setWpm(0);
        if (textChoice !== "") {
            const target = textList.find(t => t.id === textChoice);
            if (target) {
                setText(target.para.trim());
                setWords(target.para.trim().split(" "));
                setStarted(true);
                setIsFinished(false);
                setStartTime(Date.now());

            }
        }
    }
    const handleChange = (e) => {
        const input = e.target.value;
        const lastInput = input[input.length - 1];
        const current = words[0];
        console.log("input", input);
        console.log("lastInput", lastInput);
        console.log("current", current);
        //validate input with the paragraph
        if (lastInput === " ") {
            //check if it matches to current word
            if (input.trim() === current) {
                //remove word from the words array
                //clear the input;
                const newWords = [...words.slice(1)];
                console.log("newWords", newWords);
                //add current word to completed
                const newCompleted = [...completed, current];
                console.log("newCompleted", newCompleted);

                //setter
                setWords(newWords);
                setCompleted(newCompleted);
                setInput("");
                setIsFinished(newWords.length === 0);
                if (isFinished) {
                    setStarted(false);
                }
            }
        } else {
            setInput(input);
            setLastLetter(lastInput);
        }
        calculateWpm();
    }
    useEffect(() => {
        if (started) {
            countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
        }
        countDown === 0 && setIsFinished(true);

    }, [countDown, started]);

    //render phase

    if (started && !isFinished) {
        return (
            <>
                <Box
                    sx={{
                        border: 1,
                        width: 1000,
                        padding: "2rem",
                        textAlign: "center",
                        display: "inline-block",
                        margin: "2rem auto",
                        fontWeight: "600"
                    }}
                >
                    <div>
                        <Timer value={countDown} />
                    </div>
                    <div style={{ margin: "1rem 0" }}>
                        <>Your Progress</>
                    </div>
                    <div>
                        <LinearProgress variant="determinate" value={100 / text.split(" ").length * completed.length} />
                    </div>
                    {/* This is for paragraph */}
                    <div style={
                        {
                            "display": "relative",
                            "left": 0,
                            "top": 0
                        }
                    }>
                        <div className="typingField" id="text-container" onClick={() => { ref.current.focus() }}>
                            <p>
                                {
                                    text.split(" ").map((word, wordIndex) => {
                                        let highlight = false;
                                        let currentWord = false;

                                        //if word is completed ==> turn to green
                                        if (completed.length > wordIndex) {
                                            highlight = true;
                                        }
                                        if (completed.length === wordIndex) {
                                            currentWord = true;
                                        }
                                        return (
                                            <span key={wordIndex} className={`${highlight && "green"} ${currentWord && "underline"} word`}>
                                                {word.split("").map((letter, letterIndex) => {
                                                    //check if current word is type correctly
                                                    const isCurrentWord = wordIndex === completed.length;
                                                    const isIncorrectType = letter !== input[letterIndex];
                                                    const isHighlighted = letterIndex < input.length;
                                                    return (
                                                        <span className={`${isCurrentWord && isHighlighted
                                                            ? isIncorrectType
                                                                ? "red"
                                                                : "green"
                                                            : ""
                                                            }`} key={letterIndex}>
                                                            {letter}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                        )
                                    })}
                            </p>
                            <input type="text" ref={ref} onChange={handleChange} value={input} autoFocus={true} autoComplete={false} />
                        </div>
                    </div>
                </Box >
            </>
        )
    }
    if (started && isFinished) {
        return (
            <Box
                sx={{
                    border: 1,
                    width: 500,
                    padding: "2rem",
                    textAlign: "center",
                    display: "inline-block",
                    margin: "2rem auto"
                }}
            >
                <h2>
                    Your WPM is <strong>{wpm}</strong>
                </h2>
                <button className="start-btn" onClick={() => { setStarted(false); setCompleted(false); setCountDown(rootCount) }}>
                    Play again
                </button>
            </Box>
        )
    }
    else {
        return (
            <Box
                sx={{
                    border: 1,
                    width: 500,
                    padding: "2rem",
                    textAlign: "center",
                    display: "inline-block",
                    margin: "2rem auto"
                }}
            >
                <h2>Welcome to the Typing test</h2>
                <p>
                    <strong>Rules:</strong> <br />
                    Type in the input field the highlighted word. <br />
                    The correct words will turn <strong><span className="green">green</span></strong>.
                    <br />
                    Incorrect letters will turn <span className="red">red</span>.
                    <br />
                    <br />
                    Have fun!
                </p>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Paragraph</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Paragraph"
                                value={textChoice}
                                onChange={handleSelectChange}
                            >
                                {textList &&
                                    textList.map((choice, index) => {
                                        return (
                                            <MenuItem key={index} value={choice.id}>{choice.title}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            type="number"
                            name="time"
                            defaultValue={countDown}
                            fullWidth
                            id="time"
                            label="time"
                            autoFocus
                            onChange={handleCountDownChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" className="start-btn" onClick={handleStartGame}>
                            Start game
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }


}