"use client"

import { useState, useCallback } from "react"
import type { Task } from "@/lib/api"
import { mockTasks } from "@/lib/mock-data"
import TaskCard from "./task-card"
import AddTaskModal from "./add-task-modal"
import { Plus } from "lucide-react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addModalStatus, setAddModalStatus] = useState<Task["status"]>("Pendente")
  const [filter, setFilter] = useState({ search: "", status: "", priority: "" })

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

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter)
    applyFilters(tasks, newFilter)
  }

  const handleAddTask = (status: Task["status"]) => {
    setAddModalStatus(status)
    setShowAddModal(true)
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    const newTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    setTasks(newTasks)
    applyFilters(newTasks, filter)
  }

  const handleTaskDelete = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    applyFilters(newTasks, filter)
  }

  const handleTaskAdd = (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const newTasks = [...tasks, task]
    setTasks(newTasks)
    applyFilters(newTasks, filter)
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(
      newTasks.findIndex((task) => task.id === draggableId),
      1,
    )
    reorderedItem.status = destination.droppableId as Task["status"]
    newTasks.splice(destination.index, 0, reorderedItem)

    setTasks(newTasks)
    applyFilters(newTasks, filter)
  }

  const pendingTasks = getTasksByStatus("Pendente")
  const inProgressTasks = getTasksByStatus("Em andamento")
  const completedTasks = getTasksByStatus("Concluída")

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
            <button
              onClick={() => handleAddTask("Pendente")}
              className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg"
            >
              Nova atividade
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Droppable droppableId="Pendente">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-card rounded-2xl p-6 min-h-[500px] w-full bg-[#282829]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Pendente ({pendingTasks.length})</h2>
                  <button onClick={() => handleAddTask("Pendente")} className="p-1 rounded-full hover:bg-secondary">
                    <Plus size={20} className="text-primary" />
                  </button>
                </div>
                <div className="space-y-3">
                  {pendingTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskCard
                            task={task}
                            onTaskUpdated={handleTaskUpdate}
                            onTaskDeleted={handleTaskDelete}
                            className="bg-[#E25858]/20 hover:bg-[#E25858]/30"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Em andamento">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-card rounded-2xl p-6 min-h-[500px] w-full bg-[#282829]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Realizando ({inProgressTasks.length})</h2>
                  <button onClick={() => handleAddTask("Em andamento")} className="p-1 rounded-full hover:bg-secondary">
                    <Plus size={20} className="text-primary" />
                  </button>
                </div>
                <div className="space-y-3">
                  {inProgressTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskCard
                            task={task}
                            onTaskUpdated={handleTaskUpdate}
                            onTaskDeleted={handleTaskDelete}
                            className="bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Concluída">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-card rounded-2xl p-6 min-h-[500px] w-full bg-[#282829]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Concluída ({completedTasks.length})</h2>
                  <button onClick={() => handleAddTask("Concluída")} className="p-1 rounded-full hover:bg-secondary">
                    <Plus size={20} className="text-primary" />
                  </button>
                </div>
                <div className="space-y-3">
                  {completedTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskCard
                            task={task}
                            onTaskUpdated={handleTaskUpdate}
                            onTaskDeleted={handleTaskDelete}
                            className="bg-[#4EA8DE]/20 hover:bg-[#4EA8DE]/30"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>

        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onTaskAdded={handleTaskAdd}
            initialStatus={addModalStatus}
          />
        )}
      </div>
    </DragDropContext>
  )
}

