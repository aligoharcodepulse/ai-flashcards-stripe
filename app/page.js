 "use client"
import { Button, Container, Toolbar, Typography, AppBar, Box, Grid, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSubmit = async ()=>{
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    } 

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }

  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }
  const handleSignIn = () => {
    router.push('/sign-in')
  }
  const handleOpen = () => {
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}

  return(
   <Container maxWidth="100vw">
    <Head>
      <title>Flashcard Saas</title>
      <meta name="description" content="Create flashcard from the text" />
    </Head>

    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow:1}}>Flashcard SaaS</Typography>
        <SignedOut>
          <Button color="inherit" onClick={handleSignIn}>Login</Button>
          <Button color="inherit" onClick={handleSignUp}>Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>
    </AppBar>


    <Box sx={{my:6,textAlign:'center'}}>
      <Typography variant="h3" gutterBottom>Welcome to Flashcard SaaS</Typography>
      <Typography variant="h5" gutterBottom>The easiest way to make falshcards from your text</Typography>
      <Button variant="contained" color="primary" sx={{mt:2}} onClick={()=>{router.push('/generate')}}>Get Started</Button>
    </Box>
    <Box sx={{my:6}}>
      <Typography variant="h4" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Easy text input</Typography>
          <Typography>{' '}Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Smart Flashcards</Typography>
          <Typography>{' '}Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Accessible Anywhere</Typography>
          <Typography>{' '}Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
        </Grid>
      </Grid>
    </Box>


    <Box sx={{my:6,textAlign:'center'}}>
      <Typography variant="h4" style={{marginBottom:20}}>Pricing</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            p:3,
            border:'1px solid',
            borderColor:'grey.300',
            borderRadius:2,

          }}>
            <Typography variant="h5" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>$5 / month</Typography>
            <Typography>{' '}Access to basic flashcards features and limited storage.</Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleOpen}>Choose Basic</Button>
          </Box>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>Basic subscription is available for free now!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} md={6}>
          <Box sx={{
            p:3,
            border:'1px solid',
            borderColor:'grey.300',
            borderRadius:2,

          }}>
            <Typography variant="h5" gutterBottom>Pro</Typography>
            <Typography variant="h6" gutterBottom>$10 / month</Typography>
            <Typography>{' '}Unlimited flashcards and storage, with primary support.</Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>Choose Pro</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
   </Container>
  )  
}
