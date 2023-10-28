"use client"

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import menuIcon from "../../../public/icons/menu.svg"


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
            <header tabIndex={0} className='fixed flex flex-col justify-center items-center top-0 bg-slate-500 rounded h-full left-0 cursor-pointer focus:hover:w-5/6 hover:w-5/6  duration-200 ease-in-out'>
                <Image src={menuIcon} alt='Icon' className=''></Image>
            </header>
        </main>
    )
}