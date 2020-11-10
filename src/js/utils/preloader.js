import store from '../global/store';
import { select, selectAll } from '../utils';
import gsap from 'gsap';
import AssetLoader from '../utils/assetLoader';

export default class Preloader {
	constructor() {
		this.onComplete = this.onComplete.bind(this);

		this.root = select('[data-preloader]');
		this.lines = select('[data-preloader-lines]', this.root);
		this.logo = select('[data-preloader-logo]', this.root);
		this.progressElm = select('[data-preloader-progress]', this.root);

		this.delay = 1200;

		this.progress = {
			amount: 0,
		};

		if (document.body.hasAttribute('disable-preloader')) {
			this.onComplete();
		} else {
			this.init();
		}
	}

	init() {
		AssetLoader.load({
			element: document.body,
			progress: (progress) => {
				if (progress == 0) {
					this.updateProgress(1);
				} else {
					this.updateProgress(
						progress / AssetLoader.promisesToLoad.length
					);
				}
			},
		});

		AssetLoader.loaded.then(() => {
			this.onComplete();
		});
	}

	updateProgress(progress) {
		gsap.to(this.progress, {
			amount: progress * 100,
			duration: 1,
			onUpdate: () => {
				this.progressElm.innerHTML = Math.round(this.progress.amount);
			},
		});
	}

	onComplete() {
		store.firstLoad = false;

		setTimeout(() => {
			document.dispatchEvent(new CustomEvent('preloaderDone'));
		}, this.delay);

		var tl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'expo.out',
			},
		});

		tl.to(this.root, {
			yPercent: '-100',
			delay: this.delay / 1000,
		});
	}
}

export const preloading = (cb) => {
	if (!store.firstLoad) {
		cb();
	} else {
		document.addEventListener('preloaderDone', cb);
	}
};
