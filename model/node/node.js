/**
 * Class representing a Node in a Scenegraph
 */
class Node {
	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		throw Error("Unsupported operation");
	}
}

/**
 * Class representing a GroupNode in the Scenegraph.
 * A GroupNode holds a transformation and is able
 * to have child nodes attached to it.
 * @extends Node
 */
class GroupNode extends Node {
	/**
	 * Constructor
	 * @param  {Matrix} mat - A matrix describing the node's transformation
	 */
	constructor(mat) {
		super();
		this.matrix = mat;
		this.children = [];
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitGroupNode(this);
	}

	/**
	 * Adds a child node
	 * @param {Node} childNode - The child node to add
	 */
	add(childNode) {
		this.children.push(childNode);
	}

	toString() {
		let sum = "";
		for (let child of this.children) {
			sum += child.toString() + ", "
		}
		if (sum) {
			sum = sum.substr(0, sum.length - 2);
		}
		return "GroupNode: [" + sum + "]"
	}
}

/**
 * Class representing a Textured Axis Aligned Box in the Scenegraph
 * @extends Node
 */
class TextureBoxNode extends Node {
	/**
	 * Creates an axis aligned box textured box
	 * @param  {Position} minPoint - The minimum Point
	 * @param  {Position} maxPoint - The maximum Point
	 * @param  {string} texture  - The image filename for the texture
	 */
	constructor(minPoint, maxPoint, texture) {
		super();
		this.minPoint = minPoint;
		this.maxPoint = maxPoint;
		this.texture = texture;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitTextureBoxNode(this);
	}

	setRasterRenderer(gl) {
		this.raster = new RasterTextureBox(gl, this.minPoint, this.maxPoint, this.texture);
	}

	toString() {
		return "TextureBox: " +
			"(minPoint: " + this.minPoint.toString() + "; " +
			"maxpoint: " + this.maxPoint.toString() + "; " +
			"texture: " + this.texture + ")";
	}
}

/**
 * Class representing the camera in the Scenegraph
 * @extends Node
 */
class CameraNode extends Node {
	/**
	 * Creates a camera
	 * @param {Vector} direction
	 * @param {number} aspect
	 * @param {number} near
	 * @param {number} far
	 * @param {number} fovy
	 */
	constructor(direction, aspect, near = 0.1, far = 100, fovy = 60) {
		super();
		this.direction = direction;
		this.center = new Position(0, 0, 0); // always 0
		this.eye = this.center.sub(direction);
		let up = new Vector(0, 1, 0); // like humans are used to, up vector is always 0,1,0
		let angleTo90 = this.direction.angleTo(up) - Math.PI / 2;
		this.up = Matrix.rotation(new Vector(1, 0, 0), angleTo90).mul(up);
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.fovy = fovy;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitCameraNode(this);
	}

	toString() {
		return "Camera";
	}
}

/**
 * Class representing a light
 */
class LightNode extends Node {
	/**
	 * Creates a new light with position and light color
	 * @param {Position} position  - The position of the light
	 * @param {Vector}   color     - The color of the light
	 * @param {number}   intensity - The intensity of the light
	 * @param {number}   constant  - the constant lighting from this light
	 * @param {number}   linear    - the linear with distance decreasing factor
	 * @param {number}   quadratic - the quadratic with distance decreasing factor
	 */
	constructor(position, color, intensity, constant, linear, quadratic) {
		super();
		this.position = position;
		this.color = color;
		this.intensity = intensity;

		this.ambient = new Vector(1, 1, 1);
		this.diffuse = new Vector(1, 1, 1);
		this.specular = new Vector(1, 1, 1);

		this.constant = constant;
		this.linear = linear;
		this.quadratic = quadratic;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitLightNode(this);
	}

	toString() {
		return "Light: (" + this.color.toString() + "; " +
			"Position: " + this.position.toString() + ")";
	}
}