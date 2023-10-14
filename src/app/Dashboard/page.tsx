"use client"

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        async function checkCookie() {
            if (localStorage.getItem("login")) {
                const res = await (await fetch("/api/Cookie", {
                    method: "POST",
                    body: JSON.stringify({
                        "cookie": localStorage.getItem("login")
                    })
                })).json()
                // console.log(res)
                if (!res.ok) router.push("/")
            }
            else {
                router.push("/")
            }
        }
        checkCookie()
    }, [router])

    return (
        <main>
            <button onClick={() => alert(localStorage.getItem("login")?.split(":")[0])}>Dashboard</button>
        </main>
    )
}