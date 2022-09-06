class EventEmitter {
  events: any

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, callback?: any):any {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  unSubscribe(eventName: string, callback?: any):any {
    this.events[eventName] = this.events[eventName].filter((eventCallback: any):any => callback !== eventCallback);
  }

  emit(eventName: any, args?: any):any {
    const event = this.events[eventName];
    event && event.forEach((callback: any):any => callback.call(null, args));
  }
}

export const emitter = new EventEmitter()