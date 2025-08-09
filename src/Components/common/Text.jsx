import React from 'react';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Update } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TextAcc = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [id, setId] = useState(props.obj.id)
    const [title, setTitle] = useState(props.obj.title);
    const [desc, setDesc] = useState(props.obj.para);

    const handleDelete = () => {
        const urlDelete = `http://localhost:9999/text/${id}`
        fetch(urlDelete, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleOnUpdate = (e) => {
        const urlUpdate = `http://localhost:9999/text/${id}`
        setDesc(e.target.value);
        const updatedItem = {
            ...props.obj,
            "para": desc
        }

        fetch(urlUpdate, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
        }).catch(err => {
            console.log(err);
        })


    }
    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{desc.substring(0, 15) + "..."}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <TextField fullWidth required multiline id="standard-basic" variant="standard" defaultValue={desc}
                            onChange={e => handleOnUpdate(e)} />
                    </Container>
                    <Container sx={{ margin: "1rem 0" }}>
                        <Button variant="outlined" color='error' size='small' startIcon={<DeleteOutlineIcon />} onClick={handleDelete}>
                            Delete
                        </Button>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default function Text() {
    //fetch current data
    const urlGetText = "http://localhost:9999/text"
    const [myPara, setMyPara] = useState([]);
    const currentId = localStorage.getItem("user");
    const nav = useNavigate();

    useEffect(() => {
        if(currentId === null){
            nav("/");
        }
        fetch(urlGetText)
            .then(res => res.json())
            .then(data => setMyPara(data))
            .catch(setMyPara([]));
    }, []);
    //for add button popup
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    };
    // for storing value
    const [title, setTitle] = useState("");
    const [para, setPara] = useState("");

    //handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlCreate = `http://localhost:9999/text`
        const newItem = {
            "userId": 1,
            "title": title,
            "para": para
        }

        fetch(urlCreate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        }).then(res => {
            if (res.ok) {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <>
            <Container sx={{ margin: "1rem auto 2rem" }} >
                <Typography variant='h3' align='center' sx={{ fontFamily: "cursive" }}>Your saved paragraph</Typography>
            </Container>
            <Container>
                {/* for text arrc */}
                {myPara.length === 0 ? <Typography variant='body2'>Empty</Typography>
                    : myPara.map((e, index) => {
                        return (
                            <TextAcc obj={e} />)
                    })}
            </Container>
            <Container sx={{ marginTop: "1rem" }}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                    Add  new paragraph
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add new paragraph"}
                    </DialogTitle>
                    <form onSubmit={e => { handleSubmit(e) }}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please fill out the fields to create a new paragraph.
                            </DialogContentText>
                            <TextField required fullWidth margin='normal' id="outlined-basic" label="Title" variant="outlined"
                                onChange={(e) => setTitle(e.target.value)} />
                            <TextField required fullWidth multiline id="outlined-basic" label="Paragraph" variant="outlined"
                                onChange={(e) => setPara(e.target.value)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e => handleClose(e)}>Close</Button>
                            <Button autoFocus type='submit'>
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </Container>
        </>
    );
}