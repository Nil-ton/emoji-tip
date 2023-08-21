import { tomorrowAt3pm } from "@/util/tomorrowAt3pm"
import { cookiesFront } from "../cookies/front"
import { tokensService } from "@/services/tokensService/tokensService"

export const HttpClient = {
    post: async (url: string, body: any = {}, options = {} as Options) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        })
        return response.json()
    },
    put: async (url: string, body: any = {}, options: any = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options,
        })
        return response.json()
    },

    async get(url: string, options = {} as Options): Promise<any> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const res = await response.json();

        if (!options.refesh) return res;

        if (res.status === 401 && options.refesh) {
            const refesh = await HttpClient.get('/api/authentication/refesh')
            tokensService.save(refesh)
            const accessToken = refesh.accessToken
            const retryResponse = await HttpClient.get(url, {
                ...options,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            return retryResponse
        }
        return res
    }
}