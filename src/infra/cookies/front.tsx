'use client'
import { tomorrowAt3pm } from '@/util/tomorrowAt3pm';
import Cookies from 'js-cookie'
import React from 'react';

export const cookiesFront = {
    set(key: string, value: any, options?: Partial<Cookies.CookieAttributes>) {
        Cookies.set(key, JSON.stringify(value), {
            expires: tomorrowAt3pm(),
            sameSite: 'Lax',
            path: '/',
            ...options,
        });
    },

    get(key: string) {
        const cookie = Cookies.get(key);
        if (!cookie) return null
        return JSON.parse(cookie)
    },

    delete(key: string) {
        Cookies.remove(key);
    },

    useGet<T>(key: string, inicialValue?: any): T {
        const [cookie, setCookie] = React.useState<any>(inicialValue)
        React.useEffect(() => {
            const updateCookieValue = () => {
                const updatedCookieValue = this.get(key) || inicialValue
                setCookie(updatedCookieValue);
            };
            updateCookieValue();
            const intervalId = setInterval(updateCookieValue, 1000);
            return () => clearInterval(intervalId);
        }, [key]);

        return cookie as T
    }
}
