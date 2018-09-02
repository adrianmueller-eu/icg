/**
 * Author: noxafy
 * Created: 18.08.18
 */
SpecsView = {
	specsElem: document.getElementById("specs-view"),
	disable() {
		this.FPS.e.innerText = "";
		this.specsElem.className = "disabled";
	},
	enable() {
		this.FPS.init();
		this.specsElem.className = "";
	},
	init() {
		this.FPS.init();
		if (Preferences.showSpecs) {
			this.enable();
		}
		// disabled state is default
	},
	FPS: {
		e: document.getElementById("fps_val"),
		cnt: 40,
		sum: 0,
		i: 1,
		add(deltaT) {
			this.sum += deltaT;
			if (--this.i === 0) {
				this.e.innerText = Math.round(10000 * this.cnt / this.sum) / 10;
				this.sum = 0;
				this.i = this.cnt;
			}
		},
		init() {
			this.i = this.cnt;
		}
	},
	LightChanger: {
		sliders: document.getElementById("light_props_sliders"),
		enable(light) {
			this.registerSlider("intensity", light.intensity, function (val) {
				return light.intensity = val;
			}, 5);
			this.registerSlider("constant", Math.sqrt(light.constant), function (val) {
				return light.constant = Math.pow(val, 2);
			});
			this.registerSlider("linear", Math.cbrt(light.linear), function (val) {
				return light.linear = Math.pow(val, 3);
			});
			this.registerSlider("quadratic", Math.pow(light.quadratic, 1 / 4), function (val) {
				return light.quadratic = Math.pow(val, 4);
			});

			this.sliders.className = "";
		},
		registerSlider(id, default_val, set, max = 1, min = 0, step = 0.001) {
			// label
			const label = document.createElement("label");
			label.for = id;
			label.id = id + "_label";
			this.sliders.appendChild(label);

			// input element
			const el = document.createElement("input");
			el.type = "range";
			el.value = default_val;
			el.min = min;
			el.max = max;
			el.step = step;
			this.sliders.appendChild(el);

			// change listener
			el.onchange = () => {
				let res = set(el.value);
				label.innerText = id + ": " + Utils.round(res);
			}
			el.value = default_val;
			el.onchange();

			this.sliders.className = "";
		},
		disable() {
			this.sliders.innerHTML = "";
			this.sliders.className = "disabled";
		}
	}
}

SpecsView.init();