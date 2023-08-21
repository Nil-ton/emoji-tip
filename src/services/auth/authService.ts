import { HttpClient } from "@/infra/HttpClient/HttpClient"
import { tokensService } from "../tokensService/tokensService"

export const authService = {
    async login(credentials: IAuthServiceLogin): Promise<{ accessToken: string, refeshToken: string }> {
        const tokens = await HttpClient.post(process.env.NEXT_PUBLIC_URL_APP + '/api/authentication', credentials)

        if (tokens.status !== 200) throw Error('Usuário ou senha inválidos!')

        tokensService.save(tokens)

        return tokens as { accessToken: string, refeshToken: string }
    },
    async session() {
        const token = tokensService.get()
        const session = await HttpClient.get(process.env.NEXT_PUBLIC_URL_APP + '/api/authentication/session',
            { headers: { Authorization: `Bearer ${token}` }, refesh: true })
        return session;
    }
}