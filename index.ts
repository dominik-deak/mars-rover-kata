type Direction = "N" | "E" | "S" | "W";

export class Rover {
	private readonly directions: Direction[] = ["N", "E", "S", "W"];

	private readonly commandHandlers: Record<string, () => void> = {
		L: () => this.turnLeft(),
		R: () => this.turnRight(),
		M: () => this.move(),
	};

	readonly directionMovements: Record<Direction, { dx: number; dy: number }> = {
		N: { dx: 0, dy: 1 },
		E: { dx: 1, dy: 0 },
		S: { dx: 0, dy: -1 },
		W: { dx: -1, dy: 0 },
	};

	constructor(
		private x: number,
		private y: number,
		private direction: Direction,
	) {}

	getPosition(): string {
		return `${this.x} ${this.y} ${this.direction}`;
	}

	execute(commands: string): void {
		for (const command of commands) {
			const handler = this.commandHandlers[command];
			if (handler) {
				handler();
			}
		}
	}

	move(): void {
		const movement = this.directionMovements[this.direction];
		this.x += movement.dx;
		this.y += movement.dy;
	}

	turnLeft(): void {
		const currentIndex = this.directions.indexOf(this.direction);
		const newIndex = (currentIndex - 1 + 4) % 4;
		this.direction = this.directions[newIndex];
	}

	turnRight(): void {
		const currentIndex = this.directions.indexOf(this.direction);
		const newIndex = (currentIndex + 1) % 4;
		this.direction = this.directions[newIndex];
	}
}

export function processMarsRoverInput(input: string): string {
	const lines = input
		.trim()
		.split("\n")
		.map((line) => line.trim());

	const results: string[] = [];

	for (let i = 1; i < lines.length; i += 2) {
		const positionLine = lines[i];
		const commandsLine = lines[i + 1];
		const [x, y, direction] = positionLine.split(" ");
		const rover = new Rover(
			parseInt(x, 10),
			parseInt(y, 10),
			direction as Direction,
		);

		rover.execute(commandsLine);
		results.push(rover.getPosition());
	}

	return results.join("\n");
}
