import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as os from 'os'


export async function POST(req: NextRequest) {
    const data = await req.json()

    console.log(data)

    if ((process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") && os.platform.name === "win32") {
        return NextResponse.json({
            "ok": true,
            "cookie": "test"
        })
    }

    try {
        const credentials = fs.readFileSync("/etc/daiShadow").toString()

        console.log(credentials)

        var shadowPass = credentials.split(`${data.usr}:`)[1].split(":")[0]
        // var hashPass = child.execSync(`mkpasswd -5 -S pocopene ${data.pass}`).toString().replace(/\n$/, "")
        var hashPass = crypto.createHash("md5").update("pocopene" + data.pass).digest("hex")

        console.log({
            "shadow": shadowPass,
            "hash": hashPass
        })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({
            "ok": false
        })
    }

    if (shadowPass == hashPass) {
        let cookie = data.usr + ":" + crypto.randomUUID()
        try {
            const cookieFile = fs.readFileSync("/etc/daiCookies").toString()
            if (cookieFile.includes(data.usr)) {
                let reg = new RegExp(data.usr + ":.+")
                fs.writeFileSync("/etc/daiCookies", cookieFile.replace(reg, ""))
            }
        }
        catch { }
        fs.writeFileSync(`/etc/daiCookies`, `${cookie}\n`, { flag: "a" })

        return NextResponse.json({
            "ok": true,
            "cookie": cookie
        })
    }
    else {
        return NextResponse.json({
            "ok": false
        })
    }

}