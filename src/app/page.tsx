"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'


export default function Login() {

    const router = useRouter()

    const [loading, setLoading] = useState(<div>hola</div>)

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
                setLoading(<div></div>)
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
            <div className='w-[30vw] h-[50vh] bg-white rounded'>
                {loading}
            </div>
        </main>
    )
}