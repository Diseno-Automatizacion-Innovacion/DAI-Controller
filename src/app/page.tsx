"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'

/* ------------------------------- Components ------------------------------- */
import LoadingMenu from '@/Components/Dashboard/LoadingMenu'
import LoginMenu from '@/Components/Dashboard/LoginMenu'
import login2 from "@/Components/Dashboard/login2"
import { useLanguage } from '@/Hooks/useLanguage'
import location from '../../public/Translations/location.json'




export default function Login() {

  const router = useRouter()

  const [loading, setLoading] = useState(LoadingMenu)
  dispatchEvent
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
        else setLoading(LoginMenu)
      }

      else setLoading(LoginMenu)
    }
    checkCookie()
  }, [router])


  return (
    <main className='flex items-center place-content-center h-[100vh] bg-[url(/background/login.jpg)] bg-cover'>
      <div className='h-[60vh] aspect-[9/16] bg-white dark:bg-slate-950 rounded text-black shadow'>
        {loading}
      </div>
    </main>
  )
}
