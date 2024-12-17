export interface Ticket {
  id: number
  name: string
  description: string
  durationInDays: number
  price: number
  imageUrl: string
  allowedEntries: string
  status: string
}
