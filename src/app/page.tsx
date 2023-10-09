"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'

// Components
import loading_menu from '@/Components/Dashboard/loading_menu'
import login_menu from '@/Components/Dashboard/login_menu'
import { useLanguage } from '@/Components/useLanguage'
import location from '../../public/Translations/location.json'




export default function Login() {

    const router = useRouter()

    const [loading, setLoading] = useState(loading_menu)

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
                else setLoading(login_menu)
            }
        }
        checkCookie()
    }, [])


    return (
        <main className='flex items-center place-content-center h-[100vh]'>
            <div className='w-[30vw] h-[60vh] bg-slate-800 rounded text-black'>
                {loading}
            </div>
        </main>
    )
}