import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const workspaces = await prisma.workspace.findMany()
  return NextResponse.json(workspaces)
}

export async function POST(request: Request) {
  
  try {
    const body = await request.json()

    const workspace = await prisma.workspace.create({
      data: {
        name: body.name,
        ownerId: body.ownerId,
      },
    })

    return NextResponse.json(workspace)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}