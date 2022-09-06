export interface IEventEmitter {
  events: any
  subscribe: () => void
  unSubscribe: () => void
  emit: () => void
}
