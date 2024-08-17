'use client'

import { useUser } from "@clerk/nextjs"
import { doc, writeBatch, collection, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Paper, TextField, Typography } from "@mui/material"

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashCards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const handleSubmit = async() =>{
        fetch('api/generate',{
            method: 'POST',
            body: text,
        })
        .then((res)=> res.json())
        .then((data)=> setFlashCards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev)=>({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async() => {
        if (!name) {
            alert('Please enter a name...')
            return
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,'users'),user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()){
            const collections= docSnap.data().flashCards || []
            if (collections.find((f)=> f.name === name)) {
                alert("Flashcard collection with the same name already exists.")
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef,{flashCards:collections}, {merge:true})
            }
        }
        else{
            batch.set(userDocRef,{flashCards:[{name}]})
        }
        
        const colRef = collection(userDocRef,name)
        flashCards.forEach((flashcard)=>{
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef,flashcard)
        })
        await batch.commit()
        handleClose()
        router.push('flashCards')
    }
    return(
        <Container maxWidth="md">
            <Box sx={{
                mt:4,mb:6, display:'flex', flexDirection:'column',alignItems:'center'
            }}>
               <Typography variant="h4" gutterBottom>Generate FlashCards</Typography>
               <Paper sx={{p:3, width:'100%'}}>
                <TextField value={text}
                onChange= {(e)=>setText(e.target.value)}
                label="Enter text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                   mb:2
                }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
               </Paper>
            </Box>
            {flashCards.length > 0 &&
                <Box sx={{mt:4}}>
                    <Typography variant="h5">FlashCards Preview</Typography>
                    <Grid container spacing={3}>
                        {flashCards.map((flashcard, index)=>(
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={()=>{
                                        handleCardClick(index)
                                    }}>
                                        <CardContent>
                                            <Box sx={{perspective:'1000px',}}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component = "div">{flashcard.front}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component = "div">{flashcard.back}</Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
        </Container>
    )
}