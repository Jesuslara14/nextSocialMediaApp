"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Profile(){
    const { status } = useSession();
    const router = useRouter()

    if (status === "unauthenticated"){
        router.push('/profile/login');
        return(
            <div>
                Reditecting...
            </div>
        )
    }
}