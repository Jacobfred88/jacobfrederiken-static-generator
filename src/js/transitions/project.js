import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import AssetLoader from '../utils/assetLoader';
import WebGl from '../utils/webGl';

class Transition extends Highway.Transition {
	in({ from, to, done }) {
		// Reset Scroll

		gsap.set(to, {
			opacity: 0,
		});

		// Animation
		gsap.fromTo(
			from,
			{
				opacity: 1,
			},
			{
				opacity: 1,
				duration: 2,
				onComplete: () => {
					// Reset Scroll
					select('[data-scroll-container]').scrollTo(0, 0);
					if (WebGl.context) {
						WebGl.context.updateScrollValues(0, 0);
						WebGl.context.needRender();
					}

					AssetLoader.loaded.then(() => {
						gsap.set(to, {
							opacity: 1,
						});

						from.remove();
						done();
					});
				},
			}
		);
	}

	out({ from, done }) {
		setTimeout(() => {
			done();
		}, 0);
	}
}

export default Transition;
