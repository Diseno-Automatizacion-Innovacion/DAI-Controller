"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'

/* ------------------------------- Components ------------------------------- */
import LoadingMenu from '@/Components/Dashboard/LoadingMenu'
import LoginMenu from '@/Components/Dashboard/LoginMenu'
import { useLanguage } from '@/Hooks/useLanguage'
import location from '../../public/Translations/location.json'




export default function Login() {

    const router = useRouter()

    const [loading, setLoading] = useState(LoadingMenu)

    useEffect(() => {
        async function checkCookie() {
            // console.log("a")
            if (localStorage.getItem("login")) {
                const res = await (await fetch("/api/Cookie", {
                    method: "POST",
                    body: JSON.stringify({
                        "cookie": localStorage.getItem("login")
                    })
                })).json()
                console.log(res)
                if (res.ok) router.push("/Dashboard")
                else setLoading(LoginMenu)
            }
            else setLoading(LoginMenu)
        }
        checkCookie()
    }, [router])


    return (
        <main className='flex items-center place-content-center h-[100vh]'>
            <div className='h-[60vh] aspect-[9/16] bg-slate-800 rounded text-black'>
                {loading}
            </div>
        </main>
    )
}