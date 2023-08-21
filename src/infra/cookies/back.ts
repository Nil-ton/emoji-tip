import { tomorrowAt3pm } from '@/util/tomorrowAt3pm';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'

export const cookiesBack = {
    set(key: string, value: any, options?: Partial<ResponseCookie>) {
        const Cookies = cookies()
        Cookies.set(key, JSON.stringify(value), {
            expires: tomorrowAt3pm(),
            sameSite: 'lax',
            path: '/',
            ...options,
        });
    },
    get(params: string) {
        const Cookies = cookies()
        const cookie = Cookies.get(params);
        if (!cookie) return null
        return JSON.parse(cookie?.value)
    },
    delete(params: string) {
        const Cookies = cookies()
        Cookies.delete(params);
    }
}