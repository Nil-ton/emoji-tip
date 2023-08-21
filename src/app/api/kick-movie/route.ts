import { cookiesBack } from "@/infra/cookies/back";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const db = file.readJson('db')

    if (body.movie.toUpperCase() !== db?.username?.toUpperCase()) {
        cookiesBack.delete('KICK_MOVIE')
        return NextResponse.json({ status: 418 })
    }

    cookiesBack.set('KICK_MOVIE', db?.username?.username)
    file.createJson({ ...db, count: db.count + 1 }, 'db')
    return NextResponse.json({ message: 'its the movie', status: 200 })
}