"use client"
import { useRouter } from "next/navigation"
import location from '../../../public/Translations/location.json'


export default function Login_Menu() {

    const router = useRouter()

    let lang = "en" as keyof typeof location.Login
    if (Object.keys(location.Login).includes(navigator.language.slice(0, 2)))
        lang = navigator.language.slice(0, 2) as keyof typeof location.Login


    async function Auth(usr: string, pass: string) {
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

    const inputs = "w-[70%] rounded text-center bg-inherit p-2 focus:outline-none focus:ring decoration-blue-400 duration-500 ease-in-out"

    return (
        <div className="flex flex-col gap-3 h-full place-content-center items-center">
            <input type="text" className={inputs} placeholder={location.Login[lang].user_placeholder} id="user" />
            <input type="password" className={inputs} name="" placeholder={location.Login[lang].password_placeholder} id="password" />
            <button className="text-slate-900 dark:text-white" onClick={() => {
                // Este tipo de cosas son los puntos negativos de ts
                const user = (document.querySelector("#user") as HTMLInputElement)?.value
                const pass = (document.querySelector("#password") as HTMLInputElement)?.value
                Auth(user, pass)
            }}>
                {location.Login[lang].login_button}
            </button>
        </div>
    )
}