import { authService } from "@/services/auth/authService";
import React from "react";

export function useSession() {
    const [session, setSession] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        authService.session()
            .then((res) => {
                if (res.status !== 200) {
                    setError(res)
                } else {
                    setSession(res)
                }
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, []);
    return { session, loading, error }
}