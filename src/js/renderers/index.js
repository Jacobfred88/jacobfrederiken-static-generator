import Highway from '@dogstudio/highway';
import { select, selectAll } from '../utils';
import store from '../global/store';
import ScrollAni from '../components/scrollAni';
import AssetLoader from '../utils/assetLoader';
import WebGl from '../utils/webGl';

class CustomRenderer extends Highway.Renderer {
	constructor(props) {
		super(props);
	}

	onEnter() {
		if (!store.firstLoad) {
			AssetLoader.load({ element: this.wrap.lastElementChild });
		}
	}

	onLeave() {}

	onEnterCompleted() {
		if (WebGl.context) {
			setTimeout(() => {
				WebGl.clean();
				if (selectAll('[data-plane]', this.wrap.lastElementChild)) {
					selectAll('[data-plane]', this.wrap.lastElementChild).map(
						(elm) => {
							WebGl.savedPlane = null;
							WebGl.add(elm);
						}
					);
				}
			}, 0);
		} else {
			// new ScrollAni();
		}
	}

	onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default CustomRenderer;
