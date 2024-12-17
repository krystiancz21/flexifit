export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatShortDate = (dateString: string | undefined) => {
  try {
    if (!dateString) {
      return 'Data niedostępna'
    }
    
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Data niedostępna'
    }
    
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    console.error('Date parsing error:', error)
    return 'Data niedostępna'
  }
} 