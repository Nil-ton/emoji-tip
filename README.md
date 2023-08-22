# Overview

Desafie your cinematographic knowledge by deciphering movies through emojis! Test your interpretative skills while decoding enigmatic emojis and guessing the film's title of the day. Have fun and challenge your friends in this exciting game of visual clues and film culture. Come play EmojiTip and prove that você é the master of emojis in the cinema world!

**WebSite**: https://emojitip.com.br/

# Environment Setup

- [Node LTS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)

# Getting Started

Clone the project: `git clone https://github.com/Nil-ton/emoji-tip`

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Development Dependencies

```json
"dependencies": {
    "@types/node": "20.5.0",
    "@types/react": "18.2.20",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "eslint": "8.47.0",
    "eslint-config-next": "13.4.18",
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.1",
    "lucide-react": "^0.268.0",
    "next": "13.4.18",
    "openai": "^4.0.0",
    "postcss": "8.4.28",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6"
  },
  "devDependencies": {
    "@types/js-cookie": "^3.0.3",
    "@types/jsonwebtoken": "^9.0.2"
  }
```

# Project Structure

## Pages

- `./src/app/page.tsx`: Project's main page.
- `./src/app/globals.css`: Global styles of the application.
- `./src/app/recomendacao-dia/page.tsx`: Recommended movie of the day page.

## API Routes

- `./src/app/api`: Next.js API routes.
- `./src/app/api/authentication/route.ts`: API route responsible for generating access tokens.
- `./src/app/api/authentication/session/route.ts`: API route responsible for token access verification.
- `./src/app/api/authentication/refesh/route.ts`: API route responsible for generating new tokens if session verification is valid.
- `./src/app/api/emoji-tip/route.ts`: API route responsible for generating emojis.
- `./src/app/api/kick-movie/route.js``: API route responsible for verifying whether the attempted movie is Dio's movie or not. If correct, it grants access credentials; if not, it sends an error.

## Components

`./src/components`: Where all the components used in the frontend are located.

## Hooks

- `./src/hooks/useSession.tsx`: Hook responsible for handling the validation of the user's token.

```tsx
import { authService } from "@/services/auth/authService";
import React from "react";

export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService
      .session()
      .then((res) => {
        if (res.status !== 200) {
          setError(res);
        } else {
          setSession(res);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { session, loading, error };
}
```

## Infra

`./src/infra/cookies/front.ts`: Functions responsible for frontend cookie management.

```ts
"use client";
import { tomorrowAt3pm } from "@/util/tomorrowAt3pm";
import Cookies from "js-cookie";
import React from "react";

export const cookiesFront = {
  set(key: string, value: any, options?: Partial<Cookies.CookieAttributes>) {
    Cookies.set(key, JSON.stringify(value), {
      expires: tomorrowAt3pm(),
      sameSite: "Lax",
      path: "/",
      ...options,
    });
  },

  get(key: string) {
    const cookie = Cookies.get(key);
    if (!cookie) return null;
    return JSON.parse(cookie);
  },

  delete(key: string) {
    Cookies.remove(key);
  },

  useGet<T>(key: string, initialValue?: any): T {
    const [cookie, setCookie] = React.useState<any>(initialValue);
    React.useEffect(() => {
      const updateCookieValue = () => {
        const updatedCookieValue = this.get(key) || initialValue;
        setCookie(updatedCookieValue);
      };
      updateCookieValue();
      const intervalId = setInterval(updateCookieValue, 1000);
      return () => clearInterval(intervalId);
    }, [key]);

    return cookie as T;
  },
};
```

`./src/infra/cookies/back.ts`: Functions responsible for backend API cookie management.

```ts
"use client";
import { tomorrowAt3pm } from "@/util/tomorrowAt3pm";
import Cookies from "js-cookie";
import React from "react";

export const cookiesBack = {
  set(key: string, value: any, options?: Partial<Cookies.CookieAttributes>) {
    Cookies.set(key, JSON.stringify(value), {
      expires: tomorrowAt3pm(),
      sameSite: "Lax",
      path: "/",
      ...options,
    });
  },

  get(key: string) {
    const cookie = Cookies.get(key);
    if (!cookie) return null;
    return JSON.parse(cookie);
  },

  delete(key: string) {
    Cookies.remove(key);
  },

  useGet<T>(key: string, initialValue?: any): T {
    const [cookie, setCookie] = React.useState<any>(initialValue);
    React.useEffect(() => {
      const updateCookieValue = () => {
        const updatedCookieValue = this.get(key) || initialValue;
        setCookie(updatedCookieValue);
      };
      updateCookieValue();
      const intervalId = setInterval(updateCookieValue, 1000);
      return () => clearInterval(intervalId);
    }, [key]);

    return cookie as T;
  },
};
```

`./src/infra/HttpClient/HttpClient.ts`: Functions responsible for API calls.

```ts
import { tokensService } from "@/services/tokensService/tokensService";

const URL = process.env.NEXT_PUBLIC_URL_APP;
export const HttpClient = {
  post: async (url: string, body: any = {}, options = {} as Options) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return response.json();
  },
  put: async (url: string, body: any = {}, options: any = {}) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return response.json();
  },

  async get(url: string, options = {} as Options): Promise<any> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const res = await response.json();

    if (!options.refesh) return res;

    if (res.status === 401 && options.refesh) {
      const refesh = await HttpClient.get(`${URL}/api/authentication/refesh`);
      tokensService.save(refesh);
      const accessToken = refesh.accessToken;
      const retryResponse = await HttpClient.get(url, {
        ...options,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return retryResponse;
    }
    return res;
  },
};
```

`./src/infra/router/router.tsx`: Function responsible for handling page navigation in the application.

```tsx
import { useRouter } from "next/navigation";
export function useNavigate() {
  const router = useRouter();

  return { push: router.push };
}
```

## Services

`./src/services/auth/authServices.ts`: Functions responsible for handling access token on the frontend.

`./src/services/chatIA/chatIA.ts`: Functions responsible for handling everything generated by artificial intelligence, ChatGPT.

`./src/services/movieDB/movieDB.ts`: Functions responsible for handling everything related to movie data.

```ts
import { HttpClient } from "@/infra/HttpClient/HttpClient";
import { generateRandomNumber } from "@/util/generateRandomNumber";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_TMDB_URL;

export const movieDB: IMovieDB = {
  async generateMovieList() {
    const randomPage = generateRandomNumber(1, 2);
    const movieList = await HttpClient.get(
      `${url}/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${randomPage}&sort_by=popularity.desc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );

    return movieList as unknown as MovieListResponse;
  },
  async moreDetails(movieId: number) {
    const withVideo = await HttpClient.get(
      `${url}/3/movie/${movieId}?language=pt-BR&append_to_response=videos`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );
    const withCast = await HttpClient.get(
      `${url}/3/movie/${movieId}?language=pt-BR&append_to_response=credits`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );
    const withProvidersStreamers = await HttpClient.get(
      `${url}/3/movie/${movieId}/watch/providers?language=pt-BR&watch_region=BR`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );
    return {
      ...withVideo,
      credits: withCast.credits,
      providers: withProvidersStreamers.results.BR,
    };
  },

  async movieRandomDay() {
    const randomPage = generateRandomNumber(0, 10);
    const movieList = await this.generateMovieList();
    const getMovieRandom = movieList.results[randomPage];
    const moreDetails = await this.moreDetails(getMovieRandom.id);
    const DTOMovie = moreDetails;

    return DTOMovie as unknown as MovieRandomDayResponse;
  },
  async findMovie(movieName: string) {
    const movieSearch = await this.searchMovie(movieName);
    const moreDetails = await this.moreDetails(movieSearch.results[0].id);
    const DTOMovie = moreDetails;

    return DTOMovie as unknown as MovieRandomDayResponse;
  },

  async searchMovie(query: string) {
    const searchMovieList = await HttpClient.get(
      `${url}/3/search/movie?query=${query}&include_adult=false&language=pt-BR`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );
    return searchMovieList as unknown as MovieListResponse;
  },
};
```

`./src/services/tokensService/tokenService.ts`: Functions responsible for handling all application cookie management.

## Util

`./src/util`: Utility functions used in the application.

## Environment Variables

```env
NEXT_PUBLIC_URL_APP=
NEXT_PUBLIC_SECRET_KEY_JWT=
NEXT_PUBLIC_TMDB_URL=
NEXT_PUBLIC_TMDB_URL_IMAGE=
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_TMDB_TOKEN=
```

# License

- [MIT](https://github.com/Nil-ton/emoji-tip/blob/main/LICENSE)
