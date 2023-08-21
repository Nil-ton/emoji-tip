'use client'
import { WithAuthorization } from "@/components/WithAuthorization"
import { cookiesFront } from "@/infra/cookies/front"
import { useNavigate } from "@/infra/router/router"
import { movieDB } from "@/services/movieDB/movieDB"
import React from "react"

type props = {
    params: { movie: string }
}

const YOUTUBE_URL = 'https://www.youtube.com/embed/'
const urlImage = process.env.NEXT_PUBLIC_TMDB_URL_IMAGE

function Authenticated() {
    const movie = cookiesFront.get('KICK_MOVIE')
    const [film, setMovie] = React.useState<MovieRandomDayResponse | null>(null)
    const cast = film?.credits?.cast
    const router = useNavigate()

    React.useEffect(() => {
        if (!movie) {
            router.push('/')
        }
        const castSort = (film: MovieRandomDayResponse) => film?.credits?.cast.sort((a, b) => b.popularity - a.popularity).splice(0, 4)
        const getMovie = async () => {
            const res = await movieDB.findMovie(movie)
            setMovie({ ...res, credits: { ...res.credits, cast: castSort(res) } })
        }
        if (movie) {
            getMovie()
        }

        globalThis?.document?.querySelector('iframe')
    }, [movie])

    const imageBackground = {
        backgroundImage: `url(${urlImage}${film?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        backgroundPosition: 'center 0px'
    }
    const imageCard = {
        backgroundImage: `url(${urlImage}${film?.poster_path})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    const trailer = new URL(`${YOUTUBE_URL}${film?.videos?.results?.[0]?.key}?mute=1&autoplay=1`).href

    console.log(film)

    return film && <div className="relative">
        <div style={imageBackground}></div>
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t via-black/100 from-black to-transparent">
            <div className="flex lg:px-32">
                <div className="hidden mt-40 mx-5 md:flex">
                    <div
                        style={imageCard}
                        className="w-52 h-72 rounded-md shrink-0" />
                </div>
                <div className="mt-40 mx-5 flex flex-col gap-5">
                    <h1 className="text-5xl bold">{film?.title}</h1>
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                        {film?.genres?.map((current) => (
                            <span
                                key={current.id}
                                className="text-sm border-2 rounded-3xl py-1 px-2">
                                {current.name}
                            </span>))}
                    </div>
                    <p>{film?.overview}</p>
                    <div className="flex flex-col gap-5 mb-10">
                        <h2 className="text-4xl bold">Cast</h2>
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                            {cast?.map((current) => (
                                <picture key={current.id} className="w-32 h-30">
                                    <img
                                        src={`${urlImage}${current.profile_path}`}
                                        alt={current.name}
                                        className="object-cover w-32 h-30 rounded-lg" />
                                    <span className="block">{current.name}</span>
                                    <span className="block">{current.character}</span>
                                </picture>
                            ))}
                        </div>
                    </div>
                    {film?.providers && (
                        <div className="mb-10">
                            <h3 className="mb-5 text-4xl bold">Disponivel</h3>
                            <div className="flex flex-col flex-wrap gap-5">
                                <div>
                                    {film?.providers?.buy && <h4 className="text-2xl mb-5">Comprar</h4>}
                                    <div className="flex gap-5">
                                        {film?.providers?.buy?.map((current) => (
                                            <div key={current.provider_id}>
                                                <picture>
                                                    <img
                                                        src={`${urlImage}${current.logo_path}`}
                                                        alt={current.provider_name}
                                                        className="rounded-3xl" />
                                                </picture>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {film?.providers?.flatrate && <h4 className="text-2xl mb-5">Streamer</h4>}

                                    <div className="flex gap-5">
                                        {film?.providers?.flatrate?.map((current) => (
                                            <div key={current.provider_id}>
                                                <picture>
                                                    <img
                                                        src={`${urlImage}${current.logo_path}`}
                                                        alt={current.provider_name}
                                                        className="rounded-3xl" />
                                                </picture>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {film?.providers?.rent && <h4 className="text-2xl mb-5">Alugar</h4>}

                                    <div className="flex gap-5">
                                        {film?.providers?.rent?.map((current) => (
                                            <div key={current.provider_id}>
                                                <picture>
                                                    <img
                                                        src={`${urlImage}${current.logo_path}`}
                                                        alt={current.provider_name}
                                                        className="rounded-3xl" />
                                                </picture>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="w-full flex justify-center">
                {film?.videos?.results?.[0] && <iframe src={trailer} width={500} height={300} allowFullScreen></iframe>}
            </div>

        </div>
    </div >
}

export default WithAuthorization(Authenticated)