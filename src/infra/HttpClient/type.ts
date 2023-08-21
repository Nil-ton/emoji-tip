interface Options {
    next?: { revalidate?: number | false | undefined, tags?: string[] }
    headers?: {
        'Content-Type'?: 'application/json',
        "Authorization"?: string
    },
    cache?: 'no-cache',
    refesh?: boolean
}