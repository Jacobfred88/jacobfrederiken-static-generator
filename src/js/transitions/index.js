import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { select } from '../utils';
import AssetLoader from '../utils/assetLoader';
import Sail from '../utils/sail';
import WebGl from '../utils/webGl';

class Transition extends Highway.Transition {
	in({ from, to, done }) {
		// Reset Scroll
		select('[data-scroll-container]').scrollTo(0, 0);
		if (WebGl.context) {
			WebGl.context.updateScrollValues(0, 0);
			WebGl.context.needRender();
		}

		// Remove Old View
		from.remove();

		AssetLoader.loaded.then(() => {
			done();
			Sail.in();
		});
	}

	out({ from, done }) {
		Sail.out(done);
	}
}

// Don`t forget to export your transition
export default Transition;
