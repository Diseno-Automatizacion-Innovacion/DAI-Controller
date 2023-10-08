"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function Login() {

    const router = useRouter()


    async function Auth(usr: string, pass: string) {
        console.log('a')
        const res = await (await fetch("/api/Login", {
            method: "POST",
            body: JSON.stringify({
                "usr": usr,
                "pass": pass
            })
        })).json()

        console.log(res.ok)
    }

    return (
        <main>
            <button onClick={() => {
                Auth("dai", "ChangeMe")
            }}>Hola</button>
        </main>
    )
}