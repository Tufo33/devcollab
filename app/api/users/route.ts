import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try{
    const body = await request.json()
    
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password        
        },
    })

    return NextResponse.json(user)
} catch(error) {
    console.error(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
}
}