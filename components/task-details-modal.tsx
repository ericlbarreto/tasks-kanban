"use client"

import type { Task } from "@/lib/api"
import { formatDate, getStatusColor, getPriorityColor } from "@/lib/utils"
import { X } from "lucide-react"

interface TaskDetailsModalProps {
  task: Task
  onClose: () => void
}

export default function TaskDetailsModal({ task, onClose }: TaskDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Detalhes da Tarefa</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            <div className="flex space-x-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
              {task.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Descrição</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <p>Criado em: {formatDate(task.createdAt)}</p>
              <p>Atualizado em: {formatDate(task.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

