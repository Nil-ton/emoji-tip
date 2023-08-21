import { cookiesBack } from "@/infra/cookies/back";
import { chatIA } from "@/services/chatIA/chatIA";
import { movieDB } from "@/services/movieDB/movieDB";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
import path from 'path';

export async function GET(req: NextRequest) {
  const isEmojis = cookiesBack.get('E')
  if (isEmojis) return NextResponse.json({ emojis: isEmojis })

  const movieRandomDay = await movieDB.movieRandomDay()
  const prompt = `Nome em portugues:${movieRandomDay.title}, nome original: ${movieRandomDay.original_title}, visão geral: ${movieRandomDay.overview} Gere 4 emojis que tenha relação com o nome do filme acima.Envie apenas os emojis`.trim()
  const messageIA = await chatIA(prompt)

  cookiesBack.set('UP', movieRandomDay.title)
  cookiesBack.set('E', messageIA?.choices?.[0]?.message?.content)
  return NextResponse.json({ emojis: messageIA?.choices?.[0]?.message?.content })
}

