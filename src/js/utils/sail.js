import gsap from 'gsap';
import { select } from './index.js';

const Sail = {
	elm: select('[data-sail]'),
	show(cb) {
		console.log('shiw');
		gsap.fromTo(
			this.elm,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				duration: 0.25,
				ease: 'expo.out',
				onComplete: () => cb(),
			}
		);
	},
	hide() {
		console.log('hide');
		gsap.to(this.elm, {
			autoAlpha: 0,
			duration: 0.25,
			delay: 0.1,
			ease: 'expo.out',
		});
	},
};

export default Sail;
