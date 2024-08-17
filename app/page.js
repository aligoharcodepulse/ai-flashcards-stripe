// "use client"
import { Button, Container, Toolbar, Typography, AppBar, Box, Grid } from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";

export default function Home() {
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
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Toolbar>
    </AppBar>


    <Box sx={{my:6,textAlign:'center'}}>
      <Typography variant="h3" gutterBottom>Welcome to Flashcard SaaS</Typography>
      <Typography variant="h5" gutterBottom>The easiest way to make falshcards from your text</Typography>
      <Button variant="contained" color="primary" sx={{mt:2}}>Get Started</Button>
    </Box>
    <Box sx={{my:6}}>
      <Typography variant="h4" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Easy text input</Typography>
          <Typography>{' '}Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
          <Typography>{' '}Our AI intelligently breaks down your text into concise flascards, perfect for studying.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
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
            <Typography>{' '}Access to basic flascards features and limited storage.</Typography>
            <Button variant="contained" color="primary" sx={{mt:2}}>Choose Basic</Button>
          </Box>
        </Grid>
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
            <Button variant="contained" color="primary" sx={{mt:2}}>Choose Pro</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
   </Container>
  )  
}
