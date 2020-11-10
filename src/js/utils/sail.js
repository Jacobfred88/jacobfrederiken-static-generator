import gsap from 'gsap';
import { select } from './index.js';

const Sail = {
	elm: select('[data-sail'),
	out(cb) {
		gsap.fromTo(
			this.elm,
			{
				y: '100vh',
			},
			{
				y: '0',
				duration: 1,
				ease: 'expo.out',
				onComplete: () => cb(),
			}
		);
	},
	in() {
		gsap.to(this.elm, {
			y: '-100vh',
			duration: 1,
			delay: 0.2,
			ease: 'expo.out',
		});
	},
};

export default Sail;
