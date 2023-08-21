'use client'
import { HttpClient } from "@/infra/HttpClient/HttpClient"
import { cookiesFront } from "@/infra/cookies/front"
import React from "react"

export function EmojiTip() {
    const [emojis, setEmojis] = React.useState<string | null>(null)

    React.useEffect(() => {
        const cookie = cookiesFront.get('E')
        if (cookie) return setEmojis(cookie)
        HttpClient.get(`${process.env.NEXT_PUBLIC_URL_APP}/api/emoji-tip`)
            .then((res) => setEmojis(res.emojis))
    })

    return <div className='flex justify-center z-10'>
        <span className='flex flex-col justify-center items-center gap-4 rounded-lg border border-yellow-600 p-10 bg-slate-900'>
            <span className='block text-lg'>
                Qual filme é descrito por esses emojis?
            </span>
            <span className='block text-5xl'>
                {emojis}
            </span>
        </span>
    </div>
}