import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs'
import * as os from 'os'


export async function POST(req: NextRequest) {
    const data = await req.json()

    if ((process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") && os.platform.name === "win32") {
        return NextResponse.json({
            "ok": true,
        })
    }

    try {
        const cookies = fs.readFileSync("/etc/daiCookies").toString()
        // console.log({
        //     "local": cookies,
        //     "res": data.cookie
        // })
        return NextResponse.json({
            "ok": cookies.includes(data.cookie)
        })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({
            "ok": false
        })
    }

}