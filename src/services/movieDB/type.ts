interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface MovieListResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface Backdrop {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface Logo {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface MovieImageResponse {
    backdrops: Backdrop[];
    id: number;
    logos: Logo[];
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

interface VideoListResponse {
    results: Video[];
}

interface ActorData {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface PersonData {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department?: string;
    job?: string;
}

interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

interface MovieLinks {
    link: string;
    rent: Provider[];
    buy: Provider[];
    flatrate: Provider[];
}

interface MovieData {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    videos: VideoListResponse;
    vote_average: number;
    vote_count: number;
    credits: { cast: ActorData[], crew: [PersonData[]] }
    providers: MovieLinks
}





interface MovieRandomDayResponse extends MovieData {
    images: MovieImageResponse
}

interface IMovieDB {
    generateMovieList(): Promise<MovieListResponse>
    moreDetails(movieId: number): Promise<MovieData>
    movieRandomDay(): Promise<MovieRandomDayResponse>;
    searchMovie(query: string): Promise<MovieListResponse>
    findMovie(movieName: string): Promise<MovieRandomDayResponse>
}