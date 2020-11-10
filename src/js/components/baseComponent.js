import { H } from '../routing';
import { preloading } from '../utils/preloader';
import store from '../global/store';

export default class BaseComponent {
	constructor() {
		this.destroy = this.destroy.bind(this);
		this.resize = this.resize.bind(this);
		this.preloadCompleted = this.preloadCompleted.bind(this);

		window.addEventListener('onResize', this.resize);

		H.on('NAVIGATE_OUT', this.destroy);

		preloading(this.preloadCompleted);
	}

	preloadCompleted() {
		if (store.scroller && this.onScrollerRaf) {
			store.scroller.on('raf', ({ scrollPos, smoothScrollPos }) =>
				this.onScrollerRaf({ scrollPos, smoothScrollPos })
			);
		}

		if (this.onPreloadCompleted) {
			this.onPreloadCompleted();
		}
	}

	resize() {
		if (this.onResize) {
			this.onResize();
		}
	}

	destroy() {
		if (store.scroller && this.onScrollerRaf) {
			store.scroller.off('raf', this.onScrollerRaf);
		}

		window.removeEventListener('onResize', this.resize);
		if (this.onDestroy) {
			this.onDestroy();
		}
	}
}
