import { cookiesFront } from "@/infra/cookies/front"

const ACCESS_TOKEN = 'ACCESS_TOKEN'
const REFESH_TOKEN = 'REFESH_TOKEN'
export const tokensService = {
    save(tokens: any) {
        globalThis?.sessionStorage?.setItem(ACCESS_TOKEN, JSON.stringify(tokens.accessToken))
        cookiesFront.set(ACCESS_TOKEN, tokens.accessToken)
        cookiesFront.set(REFESH_TOKEN, tokens.refeshToken)
    },
    get() {
        return globalThis?.sessionStorage?.getItem(ACCESS_TOKEN)
    },
    delete() {
        globalThis?.sessionStorage?.removeItem((ACCESS_TOKEN))
        cookiesFront.delete(ACCESS_TOKEN)
    }
}