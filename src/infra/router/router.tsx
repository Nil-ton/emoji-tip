import { useRouter } from 'next/navigation'
export function useNavigate() {
    const router = useRouter()

    return { push: router.push }
}