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
        }
        checkCookie()
    }, [])

    return (
        <main>
            <button onClick={() => alert("hola")}>Dashboard</button>
        </main>
    )
}