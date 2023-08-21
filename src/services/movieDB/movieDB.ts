import { HttpClient } from "@/infra/HttpClient/HttpClient";
import { generateRandomNumber } from "@/util/generateRandomNumber";
const url = process.env.NEXT_PUBLIC_TMDB_URL;

export const movieDB: IMovieDB = {
    async generateMovieList() {
        const randomPage = generateRandomNumber(1, 2);
        const movieList = await HttpClient.get(
            `${url}/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${randomPage}&sort_by=popularity.desc`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                }
            }
        );

        return movieList as MovieListResponse;
    },

    async moreDetails(movieId: number) {
        const withVideo = await HttpClient.get(`${url}/3/movie/${movieId}?language=pt-BR&append_to_response=videos`, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` } });
        const withCast = await HttpClient.get(`${url}/3/movie/${movieId}?language=pt-BR&append_to_response=credits`, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` } });
        const withProvidersStreamers = await HttpClient.get(`${url}/3/movie/${movieId}/watch/providers?language=pt-BR&watch_region=BR`, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` } });

        return { ...withVideo, credits: withCast.credits, providers: withProvidersStreamers.results.BR };
    },

    async movieRandomDay() {
        const randomPage = generateRandomNumber(0, 10);
        const movieList = await this.generateMovieList();
        const getMovieRandom = movieList.results[randomPage];
        const moreDetails = await this.moreDetails(getMovieRandom.id);
        const DTOMovie = moreDetails;

        return DTOMovie as MovieRandomDayResponse;
    },

    async findMovie(movieName: string) {
        const movieSearch = await this.searchMovie(movieName);
        const moreDetails = await this.moreDetails(movieSearch.results[0]?.id);
        const DTOMovie = moreDetails;

        return DTOMovie as MovieRandomDayResponse;
    },

    async searchMovie(query: string) {
        const searchMovieList = await HttpClient.get(
            `${url}/3/search/movie?query=${query}&include_adult=false&language=pt-BR`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                }
            }
        );

        return searchMovieList as MovieListResponse;
    }
};
