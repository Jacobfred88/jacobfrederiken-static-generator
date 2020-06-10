// import ASScroll from '@ashthornton/asscroll';
const Browserizr = require('browserizr').default;
import LazyLoad from 'vanilla-lazyload';
import { listen } from 'quicklink';
import store from './store';

var lazyLoadInstance;
// var scroll;

export const onReady = ()=> {

    // if ('scrollRestoration' in history) {
    //     history.scrollRestoration = 'manual';
    // }

    // scroll = new ASScroll({
    //     'element': '[data-scroll-container]',
    //     disableResize: false
    // });

    // scroll.enable();

    const classes = Browserizr.detect().cssClasses(['Mobile', 'Desktop','IE11','IOS','Chrome','Safari','Android','Edge','IPhone5','IPad']);
    
    classes.map(detectClass => {
      document.querySelector('html').classList.add(detectClass);
    });

    store.isDesktop = Browserizr.detect().isDesktop();
    store.isMobile = Browserizr.detect().isMobile();
    store.isFirefox = Browserizr.detect().isMoz();
    store.isSafari = Browserizr.detect().isSafari();
    store.isIe11 = Browserizr.detect().isIE11();
    store.isChrome = Browserizr.detect().isChrome();

    lazyLoadInstance = new LazyLoad({
        elements_selector: '[data-lazy]',
        threshold: 1000,
    });

    listen();

    let vh = store.windowHeight * 0.01;

	document.body.style.setProperty('--vh', `${vh}px`);
	document.body.style.setProperty('--vhu', `${vh}px`); // viewport height updated

};

export const onResize = () => {
    window.dispatchEvent(new CustomEvent('onResize'));


    let vh = store.windowHeight * 0.01;
    document.body.style.setProperty('--vhu', `${vh}px`);

    scroll.onResize( store.windowHeight, store.windowHeight );
}


export const onLeave = (from, trigger, location)=> {
    // scroll.disable();
};

/*
 *	Highway NAVIGATE_IN callback
 *
 *	onEnter should only contain event bindings and non-
 *	DOM related event measurements. Both view containers
 *	are still loaded into the DOM during this callback.
 */
export const onEnter = (to, trigger, location)=>{
    lazyLoadInstance.update();
    // scroll.enable(false, true, to.view);

    
};

/*
 *	Highway NAVIGATE_END callback
 *
 *	onEnterCompleted should be your primary event callback.
 *	The previous view's DOM node has been removed when this
 *	event fires.
 */
export const onEnterCompleted = (from, to, trigger, location)=>{
    
    // scroll.enable(true, true, to.view);

    listen({
        el: to.view,
    });

    if(store.firstLoad) {
        store.firstLoad = false;
    }

	/* --- Track Page Views through Ajax --- */
	// tracking("google", "set", "page", location.pathname);
	// tracking("google", "send", {
	// 	hitType: "pageview",
	// 	page: location.pathname,
	// 	title: to.page.title
	// });
};