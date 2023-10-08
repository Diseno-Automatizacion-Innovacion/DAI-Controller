import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs'
import * as child from 'child_process'


export async function POST(req: NextRequest) {
    const data = await req.json()

    console.log(data)

    try {
        const credentials = fs.readFileSync("/etc/daiShadow").toString()

        console.log(credentials)

        var shadowPass = credentials.split(`${data.usr}:`)[1].split(":")[0]
        var hashPass = child.execSync(`mkpasswd -5 -S pocopene ${data.pass}`).toString().replace(/\n$/, "")

        console.log({
            "shadow": shadowPass,
            "hash": hashPass
        })
    }
    catch {
        return NextResponse.json({
            "ok": false
        })
    }

    return NextResponse.json({
        "ok": shadowPass == hashPass
    })
}