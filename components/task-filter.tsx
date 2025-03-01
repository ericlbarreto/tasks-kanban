"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface TaskFilterProps {
  onFilterChange: (filter: { search: string; status: string; priority: string }) => void
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onFilterChange({ search: value, status, priority })
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setStatus(value)
    onFilterChange({ search, status: value, priority })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setPriority(value)
    onFilterChange({ search, status, priority: value })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setPriority("")
    onFilterChange({ search: "", status: "", priority: "" })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:w-48">
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>

        <div className="md:w-48">
          <select
            value={priority}
            onChange={handlePriorityChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todas as prioridades</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        {(search || status || priority) && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <X size={18} className="mr-1" />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}

