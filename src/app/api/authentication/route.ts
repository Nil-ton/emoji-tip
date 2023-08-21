import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
import { decode, sign } from 'jsonwebtoken'

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT as string

export async function POST(req: NextRequest) {
    const data = await req.json() as IAuthServiceLogin
    const db = file.readJson('db')
    const credentials = { username: db.username, password: db.password }

    if (data.username !== credentials.username) return NextResponse.json({ message: 'Filme inválido', status: 401 })

    const accessToken = sign(credentials, SECRET_KEY_JWT, { expiresIn: '3s' })
    const refeshToken = sign({ title: credentials.username }, SECRET_KEY_JWT, { expiresIn: '1d' })
    return NextResponse.json({ accessToken, refeshToken, status: 200 })
}
