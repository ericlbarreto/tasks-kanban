"use client"

import { useState, useCallback, useEffect } from "react"
import type { Task } from "@/lib/api"
import { taskService } from "@/lib/api"
import TaskCard from "./task-card"
import AddTaskModal from "./add-task-modal"
import { Plus, ChevronDown } from "lucide-react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [addModalStatus, setAddModalStatus] = useState<Task["status"]>("pending")
  const [filter, setFilter] = useState({ search: "", status: "", priority: "" })
  const [isLoading, setIsLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true)
      const fetchedTasks = await taskService.getAllTasks()
      console.log(fetchedTasks, 'fetchedTasks')
      setTasks(fetchedTasks)
      applyFilters(fetchedTasks, filter)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const applyFilters = useCallback((taskList: Task[], currentFilter: typeof filter) => {
    let filtered = [...taskList]

    if (currentFilter.search) {
      const searchLower = currentFilter.search.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower),
      )
    }

    if (currentFilter.status) {
      filtered = filtered.filter((task) => task.status === currentFilter.status)
    }

    if (currentFilter.priority) {
      filtered = filtered.filter((task) => task.priority === currentFilter.priority)
    }

    setFilteredTasks(filtered)
  }, [])

  useEffect(() => {
    applyFilters(tasks, filter)
  }, [tasks, filter, applyFilters])

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter)
    fetchTasks() // Atualiza os dados ao mudar os filtros
  }

  const handleAddTask = (status: Task["status"]) => {
    setAddModalStatus(status)
    setShowAddModal(true)
  }

  const handleTaskUpdate = async (updatedTask: Task) => {
    const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    setTasks(newTasks)
  }

  const handleTaskDelete = async (taskId: number) => {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
  }

  const handleTaskAdded = () => {
    fetchTasks()
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const taskToUpdate = tasks.find((task) => task.id === ~~draggableId)
    if (!taskToUpdate) return

    try {
      const updatedTask = await taskService.updateTask(taskToUpdate.id, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        priority: taskToUpdate.priority,
        status: destination.droppableId as Task["status"]
      })

      const newTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))

      setTasks(newTasks)
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const pendingTasks = getTasksByStatus("pending")
  const inProgressTasks = getTasksByStatus("in_progress")
  const completedTasks = getTasksByStatus("done")

  if (isLoading && tasks.length === 0) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kanban</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-4 py-2 bg-secondary rounded-lg text-foreground"
              value={filter.search}
              onChange={(e) => handleFilterChange({ ...filter, search: e.target.value })}
            />

            {/* Dropdown para Prioridade */}
            <div className="relative">
              <select
                className="px-4 py-2 bg-secondary rounded-lg text-foreground cursor-pointer appearance-none"
                value={filter.priority}
                onChange={(e) => handleFilterChange({ ...filter, priority: e.target.value })}
              >
                <option value="">Todas as Prioridades</option>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 text-foreground pointer-events-none" size={16} />
            </div>

            <button
              onClick={() => handleAddTask("pending")}
              className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg"
            >
              Nova atividade
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { status: "pending", title: "Pendentes", tasks: pendingTasks },
            { status: "in_progress", title: "Em Progresso", tasks: inProgressTasks },
            { status: "done", title: "Concluídas", tasks: completedTasks },
          ].map(({ status, title, tasks }) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-card rounded-2xl p-6 min-h-[500px]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">{title} ({tasks.length})</h2>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <Draggable key={String(task.id)} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TaskCard task={task} onTaskUpdated={handleTaskUpdate} onTaskDeleted={handleTaskDelete} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>

        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onTaskAdded={handleTaskAdded} />}
      </div>
    </DragDropContext>
  )
}
