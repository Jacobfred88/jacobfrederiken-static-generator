// import ASScroll from '@ashthornton/asscroll';
const Browserizr = require('browserizr').default;
import { listen } from 'quicklink';
import LazyLoad from 'vanilla-lazyload';
import store from './store';
import WaitCursor from '../utils/waitCursor';
import Cursor from '../components/cursor';
import Preloader from '../utils/preloader';
import CustomScroll from '../utils/customScroll';

import Menu from '../partials/menu';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import ScrollToPlugin from '../utils/gsap-shockingly-green/esm/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

var lazyLoadInstance;
const waitCursor = new WaitCursor(300);

const setCurrentLinks = () => {
	const links = document.querySelectorAll('a');

	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		// Clean class
		link.classList.remove('is-current-link');

		// Active link
		if (link.href === location.href) {
			link.classList.add('is-current-link');
		}
	}
};

export const onReady = () => {
	const classes = Browserizr.detect().cssClasses([
		'Mobile',
		'Desktop',
		'IE11',
		'IOS',
		'Chrome',
		'Safari',
		'Android',
		'Edge',
		'IPhone5',
		'IPad',
	]);

	classes.map((detectClass) => {
		document.querySelector('html').classList.add(detectClass);
	});

	store.isDesktop = Browserizr.detect().isDesktop();
	store.isMobile = Browserizr.detect().isMobile();
	store.isFirefox = Browserizr.detect().isMoz();
	store.isSafari = Browserizr.detect().isSafari();
	store.isIe11 = Browserizr.detect().isIE11();
	store.isChrome = Browserizr.detect().isChrome();

	if (!store.isMobile) {
		new CustomScroll();
	} else {
		ScrollTrigger.defaults({
			scroller: '[data-scroll-container]',
		});
	}
	new Preloader();
	new Cursor();
	new Menu();

	listen();

	setCurrentLinks();

	lazyLoadInstance = new LazyLoad({
		elements_selector: '[data-lazy]',
	});

	let vh = store.windowHeight * 0.01;

	document.body.style.setProperty('--vh', `${vh}px`);
	document.body.style.setProperty('--vhu', `${vh}px`); // viewport height updated
};

export const onResize = () => {
	window.dispatchEvent(new CustomEvent('onResize'));

	let vh = store.windowHeight * 0.01;
	document.body.style.setProperty('--vhu', `${vh}px`);

	if (store.scroller) {
		store.scroller.onResize(store.windowHeight, store.windowHeight);
	}
};

export const onLeave = (from, trigger, location) => {
	waitCursor.start();
};

/*
 *	Highway NAVIGATE_IN callback
 *
 *	onEnter should only contain event bindings and non-
 *	DOM related event measurements. Both view containers
 *	are still loaded into the DOM during this callback.
 */
export const onEnter = (to, trigger, location) => {
	lazyLoadInstance.update();
	setCurrentLinks();
	waitCursor.end();
};

/*
 *	Highway NAVIGATE_END callback
 *
 *	onEnterCompleted should be your primary event callback.
 *	The previous view's DOM node has been removed when this
 *	event fires.
 */
export const onEnterCompleted = (from, to, trigger, location) => {
	if (store.firstLoad) {
		store.firstLoad = false;
	}

	listen({
		el: to.view,
	});

	/* --- Track Page Views through Ajax --- */
	// tracking("google", "set", "page", location.pathname);
	// tracking("google", "send", {
	// 	hitType: "pageview",
	// 	page: location.pathname,
	// 	title: to.page.title
	// });
};
