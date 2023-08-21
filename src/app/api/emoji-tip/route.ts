import { chatIA } from "@/services/chatIA/chatIA";
import { movieDB } from "@/services/movieDB/movieDB";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isEmojis = file.readJson('db')?.emojis
  if (isEmojis) return NextResponse.json({ emojis: isEmojis })

  const movieRandomDay = await movieDB.movieRandomDay()
  const prompt = `Nome em portugues:${movieRandomDay.title}, nome original: ${movieRandomDay.original_title}, visão geral: ${movieRandomDay.overview} Gere 4 emojis que tenha relação com o nome do filme acima.Envie apenas os emojis`.trim()
  const messageIA = await chatIA(prompt)
  file.createJson({
    username: movieRandomDay.title,
    password: movieRandomDay.title,
    count: 0,
    emojis: messageIA?.choices?.[0]?.message?.content,
    ...movieRandomDay,
  }, 'db')

  console.log(messageIA)
  return NextResponse.json({ emojis: messageIA?.choices?.[0]?.message?.content })
}

