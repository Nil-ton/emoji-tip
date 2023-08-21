import { cookiesBack } from "@/infra/cookies/back";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const body = await req.json()
    const movie = cookiesBack.get('UP')

    if (body.movie.toUpperCase() !== movie?.toUpperCase()) {
        cookiesBack.delete('KICK_MOVIE')
        return NextResponse.json({ status: 418 })
    }

    cookiesBack.set('KICK_MOVIE', movie)
    return NextResponse.json({ message: 'its the movie', status: 200 })
}