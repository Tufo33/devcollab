import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
    try {
        const deletedTask = await prisma.task.delete({where: { id: Number(params.id) }
        })
        return NextResponse.json(deletedTask)
    } catch(error) {
        console.error(error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}

export async function PUT(request: Request, { params } : { params: { id: string }}) {
    try {
        const body = await request.json()
        const updatedTask = await prisma.task.update({ where: {id: Number(params.id) },
        data: {
            status: body.status
        }
    })
    return NextResponse.json(updatedTask)
    } catch(error) {
        console.error(error)
        return NextResponse.json({ error: String(error)}, {status: 500})
    }
}