import { chatIA } from "@/services/chatIA/chatIA";
import { movieDB } from "@/services/movieDB/movieDB";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const movieRandomDay = await movieDB.movieRandomDay()
    file.createJson({
        username: movieRandomDay.title,
        password: movieRandomDay.title,
        count: 0,
        ...movieRandomDay,
    }, 'db')

    const prompt = `Nome em portugues:${movieRandomDay.title}, nome original: ${movieRandomDay.original_title}, visão geral: ${movieRandomDay.overview}
  Gere 4 emojis que tenha relação com o nome do filme acima.
  Envie apenas os emojis
`.trim()
    // const messageIA = await chatIA(prompt)
    const ia = { choices: [{ message: { content: '123' } }] }
    return NextResponse.json(ia)
}

