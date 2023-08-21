import { useSession } from "@/hooks/useSession";
import { useNavigate } from "@/infra/router/router";
import React from "react";

export function WithAuthorization<P extends object>(Component: React.ComponentType<P>) {
    return function WithAuthentication(props: P) {
        const router = useNavigate();
        const session = useSession()

        React.useEffect(() => {
            if (session.error && !session.loading) {
                router.push('/?error=401');
            }
        }, [router, session.error, session.loading])


        return <Component {...props} />;
    };
}