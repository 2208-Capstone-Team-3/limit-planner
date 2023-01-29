import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
//let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: new Date('2023-01-01').toISOString().replace(/T.*$/, '')
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: new Date('2023-01-05').toISOString().replace(/T.*$/, '')
  }
]

export function createEventId() {
  return String(eventGuid++)
}
