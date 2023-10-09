import { useRouter } from "next/navigation"
import { useLanguage } from "../useLanguage"
import location from '../../../public/Translations/location.json'

export default function login_menu() {

    const router = useRouter()

    const lang = useLanguage() as keyof typeof location["Login"]

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
    return (
        <div className="flex flex-col h-full">
            <input type="text" placeholder="User" id="user" />
            <input type="password" name="" id="pass" />
            <button onClick={() => {
                // Este tipo de cosas son los puntos negativos de ts
                const user = (document.querySelector("#user") as HTMLInputElement)?.value
                const pass = (document.querySelector("#pass") as HTMLInputElement)?.value
                Auth(user, pass)
            }}>{location["Login"][lang]["login_button"]}</button>
        </div>
    )
}