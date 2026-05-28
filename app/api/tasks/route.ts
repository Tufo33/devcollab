import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log("Task body:", body)
        console.log("Versuche Task zu erstellen...")  // ← neu

        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status,
                userId: body.userId,
                assignedTo: body.assignedTo,
                workspaceId: body.workspaceId,
            },
        })
        return NextResponse.json(task)
    } catch(error) {
        console.error(error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}

export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}