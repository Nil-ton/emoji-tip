'use client'
import { HttpClient } from '@/infra/HttpClient/HttpClient'
import { cookiesFront } from '@/infra/cookies/front'
import { useNavigate } from '@/infra/router/router'
import { authService } from '@/services/auth/authService'
import { movieDB } from '@/services/movieDB/movieDB'
import { uniqueArray } from '@/util/uniqueArray'
import React from 'react'

export function FieldMovieSearch() {
    const [value, setValue] = React.useState('')
    const [AutocompleteResults, setAutocompleteResults] = React.useState<MovieListResponse['results']>([])
    const errorKick = cookiesFront.useGet<{ id: string }[]>('ERROR_KICK', [])
    const kickMovie = cookiesFront.useGet<string>('KICK_MOVIE', '')
    const router = useNavigate()

    async function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        setValue(inputValue);
        const searchResults = await movieDB.searchMovie(inputValue);
        const uniqueTitlesSet = uniqueArray<MovieListResponse['results']>(searchResults.results, 'title')
        setAutocompleteResults(uniqueTitlesSet);
    }

    async function handleSearchInputClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const inputValue = e.currentTarget.name
        const res = await HttpClient.post(process.env.NEXT_PUBLIC_URL_APP + '/api/kick-movie', { movie: inputValue })
        if (res.status === 418) {
            const currentErrorKick = [...errorKick, { id: inputValue }]
            const uniqueArraySet = uniqueArray<{ id: string }[]>(currentErrorKick, 'id')
            cookiesFront.set('ERROR_KICK', uniqueArraySet.reverse())
        }
        setValue('')
        setAutocompleteResults([])
    }

    function handleBlur() {
        setTimeout(() => {
            setAutocompleteResults([])
        }, 200)
    }

    async function controller() {
        const credenciatials = { username: kickMovie, password: kickMovie }
        await authService.login(credenciatials)
        router.push(`/recomendacao-dia`)
    }

    return <div className='flex justify-center'>
        <span className='flex justify-center items-center gap-5 relative'>
            {kickMovie && <button
                onClick={controller}
                className='min-w-[255px] bg-slate-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md outline-none focus:ring-2 focus:ring-blue-900'>
                Acesse o site
            </button>}

            {!kickMovie && <>
                <input
                    value={value}
                    onChange={handleSearchInputChange}
                    type="text"
                    onBlur={handleBlur}
                    placeholder={'Digite o nome do filme...'}
                    className='bg-slate-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md outline-none focus:ring-2 focus:ring-blue-900'
                />
                <span className='z-10 flex flex-col items-start bg-slate-900 w-full max-h-44 overflow-y-auto rounded-md absolute top-14 data-[autocomplete=false]:hidden'>
                    {AutocompleteResults?.map((current) => (
                        <button key={current.id}
                            onClick={handleSearchInputClick}
                            name={current.title}
                            className='text-slate-200 px-4 py-3 hover:bg-slate-950 w-full'>
                            {current.title}
                        </button>
                    ))}
                </span>
            </>}


            <span
                data-hidden={kickMovie || Boolean(errorKick?.length === 0)}
                className='data-[hidden=true]:hidden top-14 flex flex-col gap-1 z-0 absolute min-w-[230px]'
            >
                {kickMovie && <span className='top-14 flex flex-col gap-1'>
                    <span className='bg-emerald-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md'>
                        {kickMovie}
                    </span>
                </span>}
                {errorKick?.map((item, i) => (
                    <span
                        key={item.id + i}
                        className='bg-red-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md'
                    >
                        {item.id}
                    </span>))}
            </span>
        </span>
    </div>
}