"use client"

import { useState } from "react"

export default function TestPage() {
    const [result, setResult] = useState('')

    async function createWorkspace() {
        const res = await fetch("/api/workspaces", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Team Alpha", ownerId: 1})
        })
        const data = await res.json()
        setResult(JSON.stringify(data, null, 2))
    }

    async function createUser() {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: "Mehmet", 
            email: "mehmet@test.com",
            password: "123456"
          }),
        })
        const data = await res.json()
        setResult(JSON.stringify(data, null, 2))
      }

    return (
        <div style={{ padding: "20px" }}>
            <h1>API Test</h1>
            <button onClick={createUser}>Create User</button>
            <button onClick={createWorkspace}>Create Workspace</button>
            <pre>{result}</pre>
        </div>
    )
}