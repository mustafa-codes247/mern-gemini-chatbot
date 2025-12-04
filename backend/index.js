import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {GoogleGenAI} from '@google/genai';

dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});


const app=express();
app.use(cors())

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello world')
});


app.post("/",async (req,res)=>{

    let prompt = req.body.prompt;

    const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config:{
        systemInstruction:""
    }
});

console.log(response.text);
res.send(response.text);

});

app.listen(8080, () => {
    console.log("Server running successfully on port 8080");
});
