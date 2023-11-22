"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import menuIcon from "../../../public/icons/menu.svg"


export default function Dashboard() {

    const [toggle, setToggle] = useState(false) // a[0] valor a[1] function

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
        <main className='bg-slate-900 h-screen'>
            <header tabIndex={0} className='fixed flex flex-col justify-center items-center top-0 bg-slate-500 rounded h-full left-0 cursor-pointer duration-200 ease-in-out  focus:w-5/6  z-30' onFocus={() => {
                setToggle(true)
            }} onBlur={() => {
                setToggle(false)
            }}>
                {
                    toggle ?
                        <div>abierto</div>
                        :
                        <Image src={menuIcon.src} alt="hola" width={30} height={30} />
                }

            </header>
            <div id='blur' className={`absolute z-10 w-screen h-screen bg-black ${toggle ? "" : "hidden"} opacity-70 blur-sm`}>

            </div>
        </main>
    )
}