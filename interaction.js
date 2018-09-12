/**
 * Author: noxafy
 * Created: 13.08.18
 */
// user input event listener
UserInteraction = {
	init() {
		this.KeyEvents.init();
		this.initOnClick();
	},
	KeyEvents: {
		hitCmd: false, // user wants to make a browser short cut
		lastKey: undefined,
		init() {
			window.addEventListener('keydown', (event) => {
				if (this.hitCmd) return;

				switch (event.key) {
					case "Meta":
						this.hitCmd = true;
						return;
				}

				event.preventDefault();
				if (event.key === this.lastKey || event.repeat) return;
				this.lastKey = event.key;
				let key = event.key.toLowerCase();
				switch (key) {
					case "p":
						for (let animationNode of animationNodes) {
							animationNode.toggleActive();
						}
						break;
					case "f":
						UserInteraction.toggleFullScreenMode();
						break;
					case "v":
						UserInteraction.toggleSpecsView();
						break;
					case "m":
						UserInteraction.toggleMenuView();
						break;
					case "r":
						Preferences.canvas.toggleRenderer();
						break;
				}

				this.animationControl(key, true);
			});

			window.addEventListener('keyup', (event) => {
				switch (event.key) {
					case "Meta":
						this.hitCmd = false;
				}
				if (this.hitCmd) return;

				event.preventDefault();
				this.lastKey = undefined;
				this.animationControl(event.key.toLowerCase(), false);
			});
		},
		w_downtime: undefined,
		animationControl(key, set) {
			switch (key) {
				// 2D driver
				case "i":
					this.ControlHelper.set2DDriver("moveForward", set);
					break;
				case "j":
					this.ControlHelper.set2DDriver("moveLeftward", set);
					break;
				case "k":
					this.ControlHelper.set2DDriver("moveBackward", set);
					break;
				case "l":
					this.ControlHelper.set2DDriver("moveRightward", set)
					break;
				// 3D driver and free flight driver
				case "w":
					if (set) {
						let now = Date.now();
						if (this.w_downtime && now - this.w_downtime <= 200) {
							this.ControlHelper.double3DDriverSpeed(true);
						} else {
							this.w_downtime = now;
						}
					} else {
						this.ControlHelper.double3DDriverSpeed(false);
					}
					this.ControlHelper.set3DDriver("moveForward", set);
					this.ControlHelper.setFreeFlight("moveForward", set);
					break;
				case "a":
					this.ControlHelper.set3DDriver("moveLeftward", set);
					this.ControlHelper.setFreeFlight("moveLeftward", set);
					break;
				case "s":
					this.ControlHelper.set3DDriver("moveBackward", set);
					this.ControlHelper.setFreeFlight("moveBackward", set);
					break;
				case "d":
					this.ControlHelper.set3DDriver("moveRightward", set);
					this.ControlHelper.setFreeFlight("moveRightward", set);
					break;
				case "shift":
					this.ControlHelper.set3DDriver("moveDownward", set);
					this.ControlHelper.setFreeFlight("moveDownward", set);
					break;
				case " ":
					this.ControlHelper.set3DDriver("moveUpward", set);
					this.ControlHelper.setFreeFlight("moveUpward", set);
					break;
				case "arrowleft":
					this.ControlHelper.setFreeFlight("yawLeftward", set);
					break;
				case "arrowright":
					this.ControlHelper.setFreeFlight("yawRightward", set);
					break;
				case "arrowup":
					this.ControlHelper.setFreeFlight("pitchUpward", set);
					break;
				case "arrowdown":
					this.ControlHelper.setFreeFlight("pitchDownward", set);
					break;
				// Free rotor
				case "x":
					this.ControlHelper.setRotor("pitchUpward", set);
					break;
				case "y":
					this.ControlHelper.setRotor("yawRightward", set);
					break;
				case "z":
					this.ControlHelper.setRotor("rollRightward", set);
					break;
			}
		},
		ControlHelper: {
			set2DDriver(foo, set) {
				this.forEachAnimatorSet(foo, set, animator => {
					return animator instanceof Driver2D;
				})
			},
			set3DDriver(foo, set) {
				this.forEachAnimatorSet(foo, set, animator => {
					return animator instanceof Driver3D;
				})
			},
			setFreeFlight(foo, set) {
				this.forEachAnimatorSet(foo, set, animator => {
					return animator instanceof FreeFlight;
				});
			},
			setRotor(foo, set) {
				this.forEachAnimatorSet(foo, set, animator => {
					return animator instanceof FreeRotor || animator instanceof AxisAlignedRotor;
				});
			},
			double3DDriverSpeed(set) {
				this.forEachAnimatorSet("doubleSpeed", set, animator => {
					return animator instanceof Driver3D || animator instanceof FreeFlight;
				})
			},
			forEachAnimatorSet(foo, set, filter) {
				for (let animationNode of window.animationNodes) {
					let animator = animationNode.animator;
					if (filter(animator)) {
						animator[foo](set);
					}
				}
			}
		}
	},
	toggleSpecsView() {
		if (Preferences.showSpecs) SpecsView.disable();
		else SpecsView.enable();
		Preferences.showSpecs = !Preferences.showSpecs;
	},
	toggleMenuView() {
		if (Preferences.showMenu) MenuView.disable();
		else MenuView.enable();
		Preferences.showMenu = !Preferences.showMenu;
	},
	toggleFullScreenMode() {
		if (Preferences.fullscreenActivated) {
			if (document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();
			else if (document.exitFullscreen) document.exitFullscreen();
			else {
				console.error("Couldn't exit fullscreen mode!");
				return;
			}
			Preferences.fullscreenActivated = false;
		} else {
			let p = canvas.parentNode.parentNode;
			if (p.mozRequestFullScreen) p.mozRequestFullScreen();
			else if (p.webkitRequestFullScreen) p.webkitRequestFullScreen();
			else if (p.msRequestFullscreen) p.msRequestFullscreen();
			else if (p.requestFullscreen) p.requestFullscreen();
			else {
				console.error("Fullscreen mode not available!")
				return;
			}
			Preferences.fullscreenActivated = true;
		}
	},
	onFileDropped(cb) {
		document.body.addEventListener("dragover", function (e) {
			e.preventDefault();
		});
		document.body.addEventListener("dragleave", function (e) {
			e.preventDefault();
		});
		document.body.addEventListener("drop", function (e) {
			e.preventDefault();
			const file = e.dataTransfer.files[0];
			if (!FileReader) {
				window.alert("Sorry, file dropping not available!")
				return false;
			}
			cb(file);
			return false;
		});
	},
	initOnClick() {
		let objColor, objMaterial, objId;

		initCanvasOnClick(Preferences.canvas.raytracer);
		initCanvasOnClick(Preferences.canvas.rasterizer);

		function initCanvasOnClick(canvas) {
			const renderer = new MouseRayTracingRenderer(canvas);
			canvas.addEventListener('click', function (e) {
				const rect = canvas.getBoundingClientRect();
				let mousePos = new Position(0, 0, 0);
				mousePos.x = (e.clientX - rect.left) * (canvas.width / rect.width);
				mousePos.y = (e.clientY - rect.top) * (canvas.height / rect.height);

				renderer.findObject(window.sg, mousePos, function (obj) {
					if (obj && obj.id === objId) return;
					if (objColor) unlight();
					if (obj) light(obj);
				});
			});
		}

		function unlight() {
			objColor.x = getUnLighted(objColor.x)
			objColor.y = getUnLighted(objColor.y)
			objColor.z = getUnLighted(objColor.z)
			objMaterial.ambient.x = getUnLighted(objMaterial.ambient.x)
			objMaterial.ambient.y = getUnLighted(objMaterial.ambient.y)
			objMaterial.ambient.z = getUnLighted(objMaterial.ambient.z)

			objColor = undefined;
			objMaterial = undefined;
			objId = undefined;

			function getUnLighted(val) {
				return Math.pow(val * 1.2 - 0.2, 2);
			}
		}

		function light(obj) {
			objColor = obj.color;
			objMaterial = obj.material;
			objId = obj.id;

			objColor.x = getLighted(objColor.x)
			objColor.y = getLighted(objColor.y)
			objColor.z = getLighted(objColor.z)
			objMaterial.ambient.x = getLighted(objMaterial.ambient.x)
			objMaterial.ambient.y = getLighted(objMaterial.ambient.y)
			objMaterial.ambient.z = getLighted(objMaterial.ambient.z)

			function getLighted(val) {
				return Math.sqrt((val + 0.2) / 1.2);
			}
		}
	}
}

class MouseRayTracingRenderer extends Renderer {
	constructor(canvas) {
		super(new RayTracingCameraTraverser(), null, new MouseRayTracingDrawTraverser());
		this.canvas = canvas;
	}

	findObject(rootNode, mousePos, cb) {
		this.render(rootNode);
		const rw = (this.canvas.width - 1) / 2;
		const rh = (this.canvas.height - 1) / 2;
		const ray = Raytracer.makeRay(rw, rh, mousePos.x, mousePos.y, this.camera);
		Raytracer.findMinIntersection(ray, this.bounding_spheres, cb);
	}

	clear() {
		this.bounding_spheres = [];
	}
}

class MouseRayTracingDrawTraverser extends RayTracingDrawTraverser {
	constructor() {
		super();
	}

	visitLightableNode(node) {
		const vm = this.renderer.lookat.mul(this.getTopMatrix());
		let obj;
		if (node instanceof SphereNode) {
			obj = new Sphere(vm.mul(node.center), node.radius, node.color, node.material);
		} else if (node instanceof AABoxNode) {
			let center = node.minPoint.add(node.maxPoint).div(2);
			let radius = node.minPoint.sub(center).length;
			obj = new Sphere(vm.mul(center), radius, node.color, node.material);
		} else if (node instanceof PyramidNode) {
			let center = new Position(0, 0, 0);
			let radius = node.minPoint.add(center).length;
			let height = node.top.y;
			if (height > radius) {
				let project = height - radius;
				radius += project / 2;
				center.y = project / 2;
			} else if (height < -radius) {
				let project = height + radius;
				radius -= project / 2;
				center.y = project / 2;
			}
			obj = new Sphere(vm.mul(center), radius, node.color, node.material);
		} else if (node instanceof ConeNode) {
			let center = new Position(0, 0, 0);
			let radius = node.radius;
			let height = node.top.y;
			if (height > radius) {
				let project = height - radius;
				radius += project / 2;
				center.y = project / 2;
			} else if (height < -radius) {
				let project = height + radius;
				radius -= project / 2;
				center.y = project / 2;
			}
			obj = new Sphere(vm.mul(center), radius, node.color, node.material);
		} else if (node instanceof GenericNode) {
			// ignore for now
			return;
		} else {
			throw Error("Unknown lightable node: " + (node.constructor) ? node.constructor.name : node.toString());
		}
		obj.id = this.renderer.bounding_spheres.length - 1;
		this.renderer.bounding_spheres.push(obj);
	}
}