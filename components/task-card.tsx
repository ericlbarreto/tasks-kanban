"use client"

import { useState } from "react"
import type { Task } from "@/lib/api"
import { Pencil, Trash2, GripVertical } from "lucide-react"
import TaskDetailsModal from "./task-details-modal"
import EditTaskModal from "./edit-task-modal"
import DeleteTaskModal from "./delete-task-modal"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (id: string) => void
  className?: string
}

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted, className }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      <div className={cn("task-card group", className)}>
        <div className="flex items-center">
          <GripVertical size={20} className="mr-2 text-gray-400 opacity-0 group-hover:opacity-100 cursor-grab" />
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-foreground line-clamp-1">{task.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowEditModal(true)
                  }}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDeleteModal(true)
                  }}
                  className="text-foreground/60 hover:text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-sm text-foreground/60 mb-3 line-clamp-2">{task.description}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {task.priority === "High" && (
                  <span className="text-danger text-xs px-2 py-1 rounded-full bg-danger/20">Alta</span>
                )}
                {task.priority === "Medium" && (
                  <span className="text-warning text-xs px-2 py-1 rounded-full bg-warning/20">Média</span>
                )}
                {task.priority === "Low" && (
                  <span className="text-success text-xs px-2 py-1 rounded-full bg-success/20">Baixa</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetails && <TaskDetailsModal task={task} onClose={() => setShowDetails(false)} />}

      {showEditModal && (
        <EditTaskModal task={task} onClose={() => setShowEditModal(false)} onTaskUpdated={onTaskUpdated} />
      )}

      {showDeleteModal && (
        <DeleteTaskModal taskId={task.id} onClose={() => setShowDeleteModal(false)} onTaskDeleted={onTaskDeleted} />
      )}
    </>
  )
}

