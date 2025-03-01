import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Task {
  id: number
  title: string
  description: string
  status: "pending" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks")
    return response.data
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
    const response = await api.post("/tasks", task)
    return response.data
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}

export default api

