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
        <main className='bg-color-bg h-screen'>
            <header tabIndex={0} className='fixed flex flex-col top-0 bg-menu rounded h-full left-0 cursor-pointer duration-200 ease-in-out  focus:w-5/6  z-30' onFocus={() => {
                setToggle(true)
            }} onBlur={() => {
                setToggle(false)
            }}>
                {
                    toggle ?
                        <div className='grid gap-24 grid-cols-3'>
                            <div className='col-start-1 row-start-1 border border-red-500 rounded-xl p-4 text-center font-bold text-2xl'>
                                Luces
                            </div>
                            <div className='w-[33%] col-start-2 row-start-1 border border-red-500 rounded-xl p-4 text-center font-bold text-2xl'>
                                puertas
                            </div>
                            <div className='w-[60%] col-start-3 row-start-1 border border-red-500 rounded-xl p-4 text-center font-bold text-2xl'>
                                Configuración
                            </div>
                        </div>
                        :
                        <Image src={menuIcon.src} alt="hola" width={30} height={30} />
                }

            </header>
            <div id='blur' className={`absolute z-10 w-screen h-screen bg-black ${toggle ? "" : "hidden"} opacity-70 blur-sm`}>

            </div>
        </main>
    )
}