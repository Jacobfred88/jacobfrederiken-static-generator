import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { select } from '../utils';
import AssetLoader from '../utils/assetLoader';
import Sail from '../utils/sail';

class Transition extends Highway.Transition {
	in({ from, to, done }) {
		// Reset Scroll
		select('[data-scroll-container]').scrollTo(0, 0);

		// Remove Old View
		from.remove();

		AssetLoader.loaded.then(() => {
			done();
			Sail.hide();
		});
	}

	out({ from, done }) {
		Sail.show(done);
	}
}

// Don`t forget to export your transition
export default Transition;
