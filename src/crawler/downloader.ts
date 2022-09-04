import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import EventEmitter from 'events'

class DownloadWorker {
  private queue: DownloadRequest[] = []
  private executingQueue: DownloadRequest[] = []
  private _total = 0
  private _thread = 4
  private _retry = 3
  private _executed = 0
  private _state = DownloadState.Stopped

  private readonly eventEmitter = new EventEmitter()

  constructor () {
    this.eventEmitter
      .on('finished', this.onFinished)
      .on('stop', this.onStop)
      .on('start', this.onStart)
      .on('addExecuting', this.onAddExecuting)
  }

  onStart (): void {
    this._state = DownloadState.Working
    this._total = this.getQueueLength()
    let i = 0
    while (i < this._thread) {
      const request = this.queue.pop()
      if (request === undefined) break
      this.executingQueue.push(request)
      i++
    }
    for (let x = 0; x < this.executingQueue.length; x++) {
      this.eventEmitter.emit('addExecuting', x)
    }
  }

  onFinished (): void {
    this.queue = []
  }

  onStop (): void {
    this._state = DownloadState.Stopped
    this._total = 0
    this.executingQueue = []
    this._retry = 0
    this._executed = 0
  }

  onAddExecuting (x: number): void {
    if (this._state !== DownloadState.Working) return
    axios(this.executingQueue[x].request).then((value) => {
      this.executingQueue[x].callback.call(this, value)
      this._executed++
      if (this._executed === this.total) {
        this._state = DownloadState.Finished
        this.eventEmitter.emit('finished')
        return
      }
      const request = this.queue.pop()
      if (request === undefined) return
      this.executingQueue[x] = request
      this.eventEmitter.emit('addExecuting', x)
    }).catch(() => {
      this._retry++
      if (this.executingQueue[x].retry === this._retry) {
        return
      }
      const request = this.queue.pop()
      if (request === undefined) return
      this.executingQueue[x] = request
      this.eventEmitter.emit('addExecuting', x)
    })
  }

  add (request: DownloadRequest): void {
    if (this._state === DownloadState.Working) throw new Error('now working')
    this.queue.push(request)
  }

  clear (): void {
    this.queue = []
    this.executingQueue = []
  }

  start (): void {
    this._state = DownloadState.Stopped
    this._retry = 0
    this.eventEmitter.emit('stop')
    this.eventEmitter.emit('start')
  }

  async wait (): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      this.eventEmitter.on('finished', () => {
        resolve()
      })
    })
  }

  set thread (thread: number) {
    this._thread = thread
  }

  get thread (): number {
    return this._thread
  }

  set retry (maxErrors: number) {
    this._retry = maxErrors
  }

  get retry (): number {
    return this._retry
  }

  get state (): DownloadState {
    return this._state
  }

  get total (): number {
    return this._total
  }

  get executed (): number {
    return this._executed
  }

  getQueueLength (): number {
    return this.queue.length
  }

  isFinished (): boolean {
    return this._state === DownloadState.Finished
  }

  onOneFinished (callback: () => void): this {
    this.eventEmitter.on('addExecuting', callback)
    return this
  }

  onError (callback: () => void): this {
    this.eventEmitter.on('error', callback)
    return this
  }
}

export enum DownloadState {
  Working,
  Stopped,
  Finished
}

export interface DownloadRequest {
  request: AxiosRequestConfig
  retry: number
  callback: (value: AxiosResponse<any>) => void
}

export default DownloadWorker
