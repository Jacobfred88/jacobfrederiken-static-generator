import LocomotiveScroll from 'locomotive-scroll';
import store from '../global/store';
import { select, selectAll } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H } from '../routing';
import { defaultTypeResolver } from 'graphql';

export default class CustomScroll {
	constructor() {
		this.onLeave = this.onLeave.bind(this);
		this.onEnter = this.onEnter.bind(this);
		this.onScrollTriggerRefresh = this.onScrollTriggerRefresh.bind(this);
		store.scroller = new LocomotiveScroll({
			el: select('[data-scroll-container]'),
			smooth: !store.isMobile,
			lerp: 0.125,
			firefoxMultiplier: 200,
			smartphone: {
				smooth: !store.isMobile,
			},
			tablet: {
				smooth: !store.isMobile,
			},
			getDirection: true,
			getSpeed: true,
		});

		this.setup();

		H.on('NAVIGATE_OUT', this.onLeave);
		H.on('NAVIGATE_END', this.onEnter);
	}

	setup() {
		this.setupScrollTrigger(select('[data-scroll-container]'));
	}

	setupScrollTrigger(scrollInner) {
		ScrollTrigger.defaults({
			scroller: '[data-scroll-container]',
		});

		ScrollTrigger.scrollerProxy(scrollInner, {
			scrollTop(value) {
				return arguments.length
					? store.scroller.scrollTo(value, 0, 0)
					: store.scroller.scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			pinType: scrollInner.style.transform ? 'transform' : 'fixed',
		});

		store.scroller.on('scroll', ScrollTrigger.update);
		ScrollTrigger.addEventListener('refresh', this.onScrollTriggerRefresh);
	}

	onScrollTriggerRefresh() {
		store.scroller.update();
	}

	onLeave() {
		store.scroller.destroy();
		ScrollTrigger.removeEventListener(
			'refresh',
			this.onScrollTriggerRefresh
		);
	}

	onEnter() {
		store.scroller.init();
	}
}
