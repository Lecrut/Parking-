export function mapTicketTypeToPrice(ticketType: string): number {
  switch (ticketType) {
    case 'Dzienny':
      return 20
    case 'Tygodniowy':
      return 100
    case 'Miesięczny':
      return 250
    case 'Standard':
      return 5
    default:
      return 0
  }
}
