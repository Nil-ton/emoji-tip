import { HttpClient } from "../../infra/HttpClient/HttpClient";

const body = (prompt: string) => ({
    model: 'gpt-3.5-turbo',
    max_tokens: 228,
    messages: [
        {
            "role": "user",
            "content": prompt,
        }
    ]
})

const options: Options = {
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    }
}

export async function chatIA(prompt: string) {
    return await HttpClient.post('https://api.openai.com/v1/chat/completions', body(prompt), options)
}