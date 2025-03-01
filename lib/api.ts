import axios from "axios"

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

// Task types
export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "done"
  priority?: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

// API functions for tasks
export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks")
    return response.data
  },

  // Get task by id
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  // Create new task
  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
    const response = await api.post("/tasks", task)
    return response.data
  },

  // Update task
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}

export default api

