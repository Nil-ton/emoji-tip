import { HttpClient } from "@/infra/HttpClient/HttpClient"

const URL = process.env.NEXT_PUBLIC_URL_APP

export async function Emojis() {
    const tip = await HttpClient.get(`${URL}/api/emoji-tip`, { next: { tags: ['emoji'] } })

    const emojis = tip?.choices?.[0]?.message?.content

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