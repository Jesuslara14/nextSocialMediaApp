"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Profile(){
    const { data: session, status } = useSession();
    const router = useRouter()

    console.log(session)

    if (status === "loading"){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if (status === "unauthenticated"){
        router.push('/profile/login');
        return(
            <div>
                Reditecting...
            </div>
        )
    }

    return(
        <>
            {
                session.user.email
            }
        </>
        
    )
}