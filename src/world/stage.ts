import { Config } from "../core/config.ts"

export class Stage {
	option: { element?: HTMLElement }
	element: HTMLElement | null
	count: number = 0
	config: Config = new Config()
	posY: number = 0.2
	saturation: number = 100
	brightness: number = 50
	private _background: HTMLElement | null = null
	private _rainbow: number[] = [0, 45, 90, 135, 180, 225, 270, 315]
	private _spectrum: string[] = [
		`hsl(${this._rainbow[0]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[1]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[2]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[3]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[4]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[5]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[6]} ${this.saturation}% ${this.brightness}%)`,
		`hsl(${this._rainbow[7]} ${this.saturation}% ${this.brightness}%)`,
	]
	private _backgroundPositionY: number = 0

	constructor(option: any = {}) {
		this.option = option
		this.element = this.option.element || null
		this.config.add(this._updateSpectrum.bind(this))

		if (!this.element) return

		const background: HTMLElement = document.createElement("div")
		background.classList.add("background")
		this.element.appendChild(background)
		this._background = background

		this.config.addParameter("posY", this.posY, { min: 0.01, max: 1, step: 0.01 })
		this.config.addParameter("saturation", this.saturation, { min: 0, max: 100, step: 0.01 })
		this.config.addParameter("brightness", this.brightness, { min: 0, max: 100, step: 0.01 })
		this._updateSpectrum()

		window.requestAnimationFrame(this._update.bind(this))
	}

	public getElement(): HTMLElement | null {
		return this.element
	}

	private _updateSpectrum(): void {
		this._spectrum = []
		this.saturation = this.config.parameters.saturation
		this.brightness = this.config.parameters.brightness
		this._spectrum = this._rainbow.map((hue: number): string => {
			return `hsl(${hue} ${this.saturation}% ${this.brightness}%)`
		})
		this._spectrum = this._spectrum.concat(this._spectrum.slice(), this._spectrum.slice(0, 1))
	}

	private _update(): void {
		if (this._background) {
			const colors: string = this._spectrum.join(",")
			this._background.style.backgroundImage = `linear-gradient(to bottom, ${colors})`

			this.posY = this.config.parameters.posY
			this._backgroundPositionY += this.posY
			if (this._backgroundPositionY >= 200) this._backgroundPositionY = 0
			this._background.style.backgroundPositionY = `${this._backgroundPositionY}%`
		}
		this.count++
		window.requestAnimationFrame(this._update.bind(this))
	}
}