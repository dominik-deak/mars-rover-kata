import { processMarsRoverInput, Rover } from "./index";

describe("Mars Rover", () => {
	describe("Rover initialization", () => {
		test("should create a rover with position and direction", () => {
			const rover = new Rover(1, 2, "N");
			expect(rover.getPosition()).toBe("1 2 N");
		});
	});

	describe("Turn commands", () => {
		test("should turn left from North to West", () => {
			const rover = new Rover(0, 0, "N");
			rover.execute("L");
			expect(rover.getPosition()).toBe("0 0 W");
		});

		test("should turn right from North to East", () => {
			const rover = new Rover(0, 0, "N");
			rover.execute("R");
			expect(rover.getPosition()).toBe("0 0 E");
		});

		test("should turn left 4 times to face North again", () => {
			const rover = new Rover(0, 0, "N");
			rover.execute("L");
			rover.execute("L");
			rover.execute("L");
			rover.execute("L");
			expect(rover.getPosition()).toBe("0 0 N");
		});

		test("should turn right 4 times to face North again", () => {
			const rover = new Rover(0, 0, "N");
			rover.execute("R");
			rover.execute("R");
			rover.execute("R");
			rover.execute("R");
			expect(rover.getPosition()).toBe("0 0 N");
		});
	});

	describe("Move commands", () => {
		test("should move forward when facing North", () => {
			const rover = new Rover(0, 0, "N");
			rover.execute("M");
			expect(rover.getPosition()).toBe("0 1 N");
		});

		test("should move forward when facing East", () => {
			const rover = new Rover(0, 0, "E");
			rover.execute("M");
			expect(rover.getPosition()).toBe("1 0 E");
		});

		test("should move forward when facing South", () => {
			const rover = new Rover(0, 1, "S");
			rover.execute("M");
			expect(rover.getPosition()).toBe("0 0 S");
		});

		test("should move forward when facing West", () => {
			const rover = new Rover(1, 0, "W");
			rover.execute("M");
			expect(rover.getPosition()).toBe("0 0 W");
		});
	});

	describe("Command sequences", () => {
		test("should execute a sequence of commands", () => {
			const rover = new Rover(1, 2, "N");
			rover.execute("LMLMLMLMM");
			expect(rover.getPosition()).toBe("1 3 N");
		});

		test("should execute complex movement sequence", () => {
			const rover = new Rover(3, 3, "E");
			rover.execute("MMRMMRMRRM");
			expect(rover.getPosition()).toBe("5 1 E");
		});
	});

	describe("Input parsing and processing", () => {
		test("should process single rover input", () => {
			const input = `5 5
                            1 2 N
                            LMLMLMLMM`;
			const output = processMarsRoverInput(input);
			expect(output).toBe("1 3 N");
		});

		test("should process multiple rovers input", () => {
			const input = `5 5
                            1 2 N
                            LMLMLMLMM
                            3 3 E
                            MMRMMRMRRM`;
			const output = processMarsRoverInput(input);
			expect(output).toBe("1 3 N\n5 1 E");
		});

		test("should match the exact example from README", () => {
			const input = `5 5
                            1 2 N
                            LMLMLMLMM
                            3 3 E
                            MMRMMRMRRM`;
			const expectedOutput = `1 3 N\n5 1 E`;
			const output = processMarsRoverInput(input);
			expect(output).toBe(expectedOutput);
		});
	});
});
