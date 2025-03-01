import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Pendente":
      return "bg-red-100 text-red-800"
    case "Em andamento":
      return "bg-yellow-100 text-yellow-800"
    case "Concluída":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getPriorityColor(priority?: string): string {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-800"
    case "Média":
      return "bg-yellow-100 text-yellow-800"
    case "Baixa":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

