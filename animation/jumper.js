/**
 * Author: noxafy
 * Created: 14.08.18
 */
class Jumper extends Animator {
	/**
	 * Creates a new jumper animation
	 * @param {Vector} axis - The axis to rotate around
	 * @param {Number} timePerJump - Milliseconds needed for one jump
	 */
	constructor(axis, timePerJump) {
		super();
		this.axis = axis;
		this.timePerJump = timePerJump;
		this.timePassed = 0;
		this.currentAxisPercentage = 0; // "jumps" between 0 and 1
	}

	calc(deltaT, mat) {
		this.timePassed = (this.timePassed + deltaT) % (this.timePerJump);
		let resultingPercentage = this.jump();
		if (!resultingPercentage) return mat;

		let deltaPercentage = resultingPercentage - this.currentAxisPercentage;
		this.currentAxisPercentage = resultingPercentage;
		const trans = Matrix.translation(this.axis.mul(deltaPercentage));
		return mat.mul(trans);
	}

	/**
	 * Calculates the position on given jump axis depending on this.timePassed
	 * @return {Number} position on given jump axis [0;1]
	 */
	jump() {
		throw Error("Unsupported operation.")
	}
}

class LinearJumper extends Jumper {
	/**
	 * Creates a new linear jumper animation
	 * @param {Vector} axis - The axis to rotate around
	 * @param {number} jpm - Jumps per Minute
	 */
	constructor(axis, jpm = 60) {
		super(axis, 60000 / jpm);
	}

	jump() {
		return Math.abs(this.timePassed / this.timePerJump * 2 - 1);
	}
}

class SinJumper extends Jumper {
	/**
	 * Creates a new sinus jumper animation
	 * @param {Vector} axis - The axis to rotate around
	 * @param {number} jpm - Jumps per Minute
	 */
	constructor(axis, jpm = 60) {
		super(axis, 60000 / jpm);
		this.periodsPerMilliSecond = 2 / this.timePerJump;
	}

	jump() {
		return Math.sin(this.timePassed * this.periodsPerMilliSecond * Math.PI) / 2 + 0.5;
	}
}

class PhysicsJumper extends Jumper {
	/**
	 * Creates a new physics imitating jumper animation
	 * @param {Vector} axis - The axis to rotate around
	 * @param {number} g_scale - Scaling factor for gravitational acceleration
	 */
	constructor(axis, g_scale = 1) {
		super(axis, 0); // timePerJump is set later
		this.g = 9.81E-6 * g_scale * Math.pow(axis.y / axis.length, 2); // in 1/ms^2
		if (this.g < .1E-16) return;

		this.timePerJump = Math.sqrt(2 * this.g * Math.abs(axis.y)) / this.g;
		this.halfJumpsPerMillisecond = 2 / this.timePerJump;
		if (axis.y > 0) {
			this.jumpDirection = -1; // with y-coord
		} else {
			this.timePassed = this.timePerJump / 2;
			this.currentAxisPercentage = 1;
			this.jumpDirection = 1; // with y-coord
		}
	}

	jump() {
		if (this.g < .1E-16) return;
		return this.jumpDirection * Math.pow(this.timePassed * this.halfJumpsPerMillisecond - 1, 2) + 1;
	}
}