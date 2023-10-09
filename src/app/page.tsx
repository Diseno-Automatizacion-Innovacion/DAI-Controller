"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'


export default function Login() {

    const router = useRouter()

    const [loading, setLoading] = useState(
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></  circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0   12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )

    useEffect(() => {
        async function checkCookie() {
            if (localStorage.getItem("login")) {
                const res = await (await fetch("/api/Cookie", {
                    method: "POST",
                    body: JSON.stringify({
                        "cookie": localStorage.getItem("login")
                    })
                })).json()
                console.log(res)
                if (res.ok) router.push("/Dashboard")
                setLoading(<div>Todo lo del login :D</div>)
            }
        }
        checkCookie()
    }, [])


    async function Auth(usr: string, pass: string) {
        console.log('a')
        const res = await (await fetch("/api/Login", {
            method: "POST",
            body: JSON.stringify({
                "usr": usr,
                "pass": pass
            })
        })).json()

        if (res.ok) {
            // document.cookie = `login=${usr}:${res.cookie};domain=/`
            window.localStorage.setItem("login", res.cookie)
            router.push("/Dashboard")
        }
    }

    return (
        <main className='flex items-center place-content-center h-[100vh]'>
            <div className='w-[30vw] h-[50vh] bg-slate-800 rounded text-black'>
                {loading}
            </div>
        </main>
    )
}