import { cookiesBack } from "@/infra/cookies/back";
import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
export async function POST(req: NextRequest) {


    const body = await req.json()

    const db = file.readJson(path.resolve(__dirname, '../../../public/db.json'))

    if (body.movie.toUpperCase() !== db?.username?.toUpperCase()) {
        cookiesBack.delete('KICK_MOVIE')
        return NextResponse.json({ status: 418 })
    }

    cookiesBack.set('KICK_MOVIE', db?.username?.username)
    file.createJson({ ...db, count: db.count + 1 }, path.resolve(__dirname, '../../../public/db.json'))
    return NextResponse.json({ message: 'its the movie', status: 200 })
}