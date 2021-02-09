/**
 *   Add any promises that need to be resolved before showing
 *   the page by using the add( promise ) method.
 */

const AssetLoader = {
	promisesToLoad: [],

	load({ element = document.body, progress = false } = {}) {
		this.element = element;
		this.addMedia();

		return (this.loaded = new Promise((resolve) => {
			if (progress) {
				if (this.promisesToLoad.length == 0) {
					progress(0);
				}
				this.progressPromise(this.promisesToLoad, progress).then(() => {
					this.promisesToLoad = [];
					resolve();
				});
			} else {
				Promise.all(this.promisesToLoad).then(() => {
					this.promisesToLoad = [];
					resolve();
				});
			}
		}));
	},

	add(promise) {
		this.promisesToLoad.push(promise);
	},

	addMedia() {
		const images = this.element.querySelectorAll('img');
		for (let i = 0; i < images.length; i++) {
			if (!images[i].hasAttribute('data-lazy')) {
				this.promisesToLoad.push(
					new Promise((resolve) => {
						const imgEl = document.createElement('img');
						imgEl.addEventListener('load', resolve);
						imgEl.addEventListener('error', resolve);
						imgEl.src = images[i].src;
					})
				);
			}
		}

		const videos = this.element.querySelectorAll('video');

		for (let i = 0; i < videos.length; i++) {
			if (!videos[i].hasAttribute('data-lazy')) {
				this.promisesToLoad.push(
					new Promise((resolve) => {
						const videoEl = document.createElement('video');
						videoEl.addEventListener('canplaythrough', resolve);
						videoEl.addEventListener('error', resolve);
						videoEl.src = videos[i].src;
						videoEl.load();
					})
				);
			}
		}

		// TODO: check background images
	},

	progressPromise(promises, tickCallback) {
		let len = promises.length;
		let progress = 0;

		function tick(promise) {
			promise
				.then(function () {
					progress++;
					tickCallback(progress, len);
				})
				.catch((reason) => {
					console.log(reason);
				});

			return promise;
		}

		return Promise.all(promises.map(tick));
	},
};

export default AssetLoader;
