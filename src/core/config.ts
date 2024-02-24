import { Pane } from "tweakpane"

export class Config {
	private _pane: Pane | null
	private _listeners: Function[] = []
	parameters: any = {}

	constructor() {
		this._pane = new Pane()
		this._pane.on("change", (event: any) => {
			this._emitChange(event)
		})
	}

	public addParameter(key: string, value: any, option: any = {}): void {
		this.parameters[key] = value
		if (!this._pane) return
		this._pane.addBinding(this.parameters, key, option)
	}

	public add(listener: Function) {
		this._listeners.push(listener)
	}

	public remove(listener: Function) {
		const index: number = this._listeners.indexOf(listener)
		if (index > -1) {
			this._listeners.splice(index, 1)
		}
	}

	private _emitChange(event: any) {
		this._listeners.forEach(listener => listener(event))
	}
}