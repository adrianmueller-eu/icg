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
 * Class representing a Sphere in the Scenegraph
 * @extends Node
 */
class SphereNode extends Node {
	/**
	 * Creates a new Sphere with center and radius
	 * @param  {Vector} center - The center of the Sphere
	 * @param  {number} radius - The radius of the Sphere
	 * @param  {Vector} color  - The color of the Sphere
	 * @param  {Material} material - The material of the sphere
	 */
	constructor(center, radius, color, material) {
		super();
		this.center = center;
		this.radius = radius;
		this.color = color;
		this.material = material;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitSphereNode(this);
	}

	setRastersphere(gl) {
		this.rastersphere = new RasterSphere(gl, this.center, this.radius, this.color)
	}

	toString() {
		return "Sphere: (" +
			"center: " + this.center.toString() + "; " +
			"radius: " + this.radius + "; " +
			"color: " + this.color.toString() + ")";
	}
}

/**
 * Class representing an Axis Aligned Box in the Scenegraph
 * @extends Node
 */
class AABoxNode extends Node {
	/**
	 * Creates an axis aligned box
	 * @param  {Vector} minPoint - The minimum Point
	 * @param  {Vector} maxPoint - The maximum Point
	 * @param  {Vector} color    - The color of the cube
	 * @param  {Material} material - The material of the cube
	 */
	constructor(minPoint, maxPoint, color, material) {
		super();
		this.minPoint = minPoint;
		this.maxPoint = maxPoint;
		this.color = color;
		this.material = material;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitAABoxNode(this);
	}

	setRasterbox(gl) {
		this.rasterbox = new RasterBox(gl, this.minPoint, this.maxPoint);
	}

	toString() {
		return "AABox: (" +
			"minPoint: " + this.minPoint.toString() + "; " +
			"maxpoint: " + this.maxPoint.toString() + ")";
	}
}

/**
 * Class representing a Textured Axis Aligned Box in the Scenegraph
 * @extends Node
 */
class TextureBoxNode extends Node {
	/**
	 * Creates an axis aligned box textured box
	 * @param  {Vector} minPoint - The minimum Point
	 * @param  {Vector} maxPoint - The maximum Point
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

	setRasterTextureBox(gl) {
		this.rastertexturebox = new RasterTextureBox(gl, this.minPoint, this.maxPoint, this.texture);
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
	 * @param {Vector} eye
	 * @param {Vector} center
	 * @param {Vector} up
	 * @param {number} near
	 * @param {number} far
	 * @param {number} fovy
	 */
	constructor(eye = new Vector(0, 0, -10, 1),
				center = new Vector(0, 0, -9, 1),
				up = new Vector(0, -1, 0, 0),
				near = 0.1, far = 100, fovy = 60) {
		super();
		this.eye = eye;
		this.center = center;
		this.up = up;
		this.fovy = fovy;
		this.near = near;
		this.far = far;
		this.aspect = window.aspect;
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
	 * @param  {Vector} position - The position of the light
	 * @param  {Vector} color  - The color of the light
	 * @param  {number} intensity - The intensity of the light
	 * @param  {number} ambient - The acceptance rate for ambient light
	 * @param  {number} diffuse - The acceptance rate for diffuse light
	 * @param  {number} specular - The acceptance rate for specular light
	 * @param  {number} constant - the constant lighting from off this light
	 * @param  {number} linear - the linear with distance decreasing factor
	 * @param  {number} quadratic - the quadratic with distance decreasing factor
	 */
	constructor(position, color, intensity, ambient = 1.0, diffuse = 1.0, specular = 1.0, constant = 0.8, linear = 0.01, quadratic = 0.001) {
		super();
		this.position = position;
		this.color = color;
		this.intensity = intensity;
		this.ambient = ambient;
		this.diffuse = diffuse;
		this.specular = specular;
		this.constant = constant;
		this.linear = linear;
		this.quadratic = quadratic;
	}

	/**
	 * Accepts a visitor according to the visitor pattern
	 * @param  {Visitor} visitor - The visitor
	 */
	accept(visitor) {
		visitor.visitLightNode(this);
	}

	toString() {
		return "Light: (" +
			"position: " + this.position.toString() + "; " +
			"color: " + this.color.toString() + ")";
	}
}