"use client"

import { useEffect, useState } from "react"

type Task = {
  id: number
  title: string
  description: string
  status: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "open",
    userId: 1,
    assignedTo: 1,
    workspaceId: 2
  })

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const columns = [
    { id: "open", label: "Open" },
    { id: "in_progress", label: "In Progress" },
    { id: "done", label: "Done"}
  ]

  async function createTask() {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
    const task = await res.json()
    setTasks([...tasks, task])
    setShowForm(false)
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ))
  }

  async function deleteTask(id: number) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">DevCollab</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        + New Task
      </button>
      {showForm && (
        <div className="bg-gray-900 rounded-xl p-4 mb-6">
          <input
            className="w-full bg-gray-800 rounded p-2 mb-3 text-white"
            placeholder="Task Title"
            value={newTask.title}
            onChange={e => setNewTask({...newTask, title: e.target.value})}
          />
          <input
            className="w-full bg-gray-800 rounded p-2 mb-3 text-white"
            placeholder="Description"
            value={newTask.description}
            onChange={e => setNewTask({...newTask, description: e.target.value})}
          />
          <button 
            onClick={createTask}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.id} className="bg-gray-900 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              {col.label}
            </h2>
            <div className="flex flex-col gap-3">
              {tasks
                .filter(task => task.status === col.id)
                .map(task => (
                  <div key={task.id} className="bg-gray-800 rounded-lg p-3">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      {col.id !== "in_progress" && (
                        <button
                          onClick={() => updateStatus(task.id, "in_progress")}
                          className="text-xs bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                        >
                          In Progress
                        </button>
                      )}
                      {col.id !== "done" && (
                        <button
                          onClick={() => updateStatus(task.id, "done")}
                          className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                        >
                          Done
                        </button>
                      )}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}