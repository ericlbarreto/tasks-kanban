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

export function getPriorityColor(priority) {
  switch (priority) {
    case 'Baixa':
      return 'success';
    case 'Média':
      return 'warning';
    case 'Alta':
      return 'danger';
    default:
      return '';
  }
}

export const mappedStatus = {
  'pending': 'Pendente',
  'in_progress': 'Em andamento',
  'done': 'Concluída'
}

export const mappedPriority = {
  'low': 'Baixa',
  'medium': 'Média',
  'high': 'Alta'
}
