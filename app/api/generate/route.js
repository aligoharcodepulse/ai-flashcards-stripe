import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on the single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overlay complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Remember the goal is to facilitate effective learning and retention of information through the flashcards.

Return in the following JSON format:
{
    "flashcards":[
        {
            "front":str,
            "back":str
        }
    ]
}
`;

export async function POST(req) {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    const data = await req.text();

    const completion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: data }
        ],
        model: 'mixtral-8x7b-32768', 
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        stream: false,
    });

    console.log(">>>>>>>>>>>>>>>>>", completion);

    let flashcards;
    try {
        flashcards = JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Failed to parse flashcards" }, { status: 500 });
    }

    return NextResponse.json(flashcards.flashcards);
}