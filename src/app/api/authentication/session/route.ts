import { file } from "@/services/writeFile/writeFile";
import { NextRequest, NextResponse } from "next/server";
import { verify, decode } from 'jsonwebtoken'

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT as string

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ message: 'Autenticação inválida', status: 401 });
    }

    try {
        verify(token, SECRET_KEY_JWT);
        const data = file.readJson('db');
        return NextResponse.json({ data, status: 200 });

    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return NextResponse.json({ message: 'Erro na verificação do token', status: 401 });
    }
}
