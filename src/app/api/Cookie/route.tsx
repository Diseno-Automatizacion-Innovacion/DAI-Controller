import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs'


export async function POST(req: NextRequest) {
    const data = await req.json()

    // console.log("route:", data)

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