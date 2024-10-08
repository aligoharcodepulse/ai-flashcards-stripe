'use client'
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";

export default function Flashcards(){
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashCards, setFlashCards] = useState([])
    const router = useRouter()

    useEffect(()=>{
        async function getFlashcards() {
            if(!user) return
            const docRef = doc(collection(db,'users'),user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collections = docSnap.data().flashCards || []
                setFlashCards(collections)
            }
            else{
                await setDoc(docRef,{flashCards:[]})
            }
        }
        getFlashcards()
    },[user])

    if (!isLoaded || !isSignedIn) {
        return null
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return(
        <Container maxWidth='100vw'>
            <Typography variant="h4" sx={{mt:4, textAlign:'center'}}>All FlashCards</Typography>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashCards.map((flashCard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={()=>{handleCardClick(flashCard.name)}}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {flashCard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
