"use client"

import type { Task } from "@/lib/api"
import { formatDate, mappedStatus, mappedPriority } from "@/lib/utils"
import { X } from "lucide-react"

interface TaskDetailsModalProps {
  task: Task
  onClose: () => void
}

export default function TaskDetailsModal({ task, onClose }: TaskDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#282829] rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-6 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Detalhes da Tarefa</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            <div className="flex flex-col space-y-2 mt-2">
              <div>
                <h3 className="text-sm font-semibold">Status</h3>
                <span className="text-xs rounded-full">{mappedStatus[task.status]}</span>
              </div>
              <div>
                  <h3 className="text-sm font-semibold">Prioridade</h3>
                  {task.priority === "high" && (
                    <span className="text-xs text-danger bg-danger/20 px-2 py-1 rounded-full">{mappedPriority[task.priority]}</span>
                  )}
                  {task.priority === "medium" && (
                    <span className={`text-xs text-warning bg-warning/20 px-2 py-1 rounded-full`}>{mappedPriority[task.priority]}</span>
                  )}
                  {task.priority === "low" && (
                    <span className={`text-xs text-success bg-success/20 px-2 py-1 rounded-full`}>{mappedPriority[task.priority]}</span>
                  )}
                </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-neutral-100 mb-1">Descrição</h4>
            <p className="text-sm text-neutral-400">{task.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-neutral-100 mb-1">Datas</h4>

            <div className="flex justify-between text-sm text-gray-500">
              <p>Criado em: {formatDate(task.createdAt)}</p>
              <p>Atualizado em: {formatDate(task.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-primary p-2 rounded-md">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

