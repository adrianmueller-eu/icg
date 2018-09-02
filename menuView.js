/**
 * Author: noxafy
 * Created: 02.09.18
 */
MenuView = {
	menuElem: document.getElementById("menu-view"),
	disable() {
		this.menuElem.className = "disabled";
	},
	enable() {
		this.menuElem.className = "";
	},
	endButtonLoading() {
		const bnt = document.getElementById("sg-export-btn");
		bnt.className = "";
		bnt.innerText = "Export Scenegraph"
	}
}