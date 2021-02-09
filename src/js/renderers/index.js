import Highway from '@dogstudio/highway';
import { select, selectAll } from '../utils';
import store from '../global/store';
import AssetLoader from '../utils/assetLoader';

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
		setTimeout(() => {}, 0);
	}

	onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default CustomRenderer;
