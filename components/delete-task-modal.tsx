"use client"

import { useState } from "react"
import { taskService } from "@/lib/api"
import { X } from "lucide-react"

interface DeleteTaskModalProps {
  taskId: string
  onClose: () => void
  onTaskDeleted: () => void
}

export default function DeleteTaskModal({ taskId, onClose, onTaskDeleted }: DeleteTaskModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await taskService.deleteTask(taskId)
      onTaskDeleted()
      onClose()
    } catch (error) {
      console.error("Error deleting task:", error)
      setError("Ocorreu um erro ao excluir a tarefa")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#282829] rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Excluir Tarefa</h2>

        <p className="mb-4 text-neutral-100">
          Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
        </p>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary" disabled={isDeleting}>
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  )
}

