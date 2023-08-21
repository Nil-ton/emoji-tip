import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from 'jsonwebtoken'
import { cookiesBack } from "@/infra/cookies/back";
import path from "path";

const NEXT_PUBLIC_SECRET_KEY_JWT = process.env.NEXT_PUBLIC_SECRET_KEY_JWT as string

export async function GET(req: NextRequest) {
    const token = cookiesBack.get('REFESH_TOKEN')

    if (!token) return NextResponse.json({ message: 'Token invalid', status: 401 })

    try {
        verify(token, NEXT_PUBLIC_SECRET_KEY_JWT)
        const db = file.readJson(path.resolve(__dirname, '../../../../public/db.json'))
        const credentials = { username: db.username, password: db.password }
        const accessToken = sign(credentials, NEXT_PUBLIC_SECRET_KEY_JWT, { expiresIn: '100s' })
        const refeshToken = sign({ title: credentials.username }, NEXT_PUBLIC_SECRET_KEY_JWT, { expiresIn: '7d' })
        return NextResponse.json({ accessToken: accessToken, refeshToken: refeshToken, status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error, status: 401 })
    }
}