import ASScroll from '@ashthornton/asscroll';
import store from '../global/store';
import {select, selectAll} from '../utils'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {H} from '../routing';

export default class CustomScroll {
    constructor() {

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        this.onLeave = this.onLeave.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.updateScrollTrigger = this.updateScrollTrigger.bind(this);
        this.onScrollTriggerRefresh = this.onScrollTriggerRefresh.bind(this);

        this.scroller = new ASScroll({
            element: '[data-scroll-container]',
            innerElement: '[data-scroll-inner]',
            disableResize: true,
            disableOnTouch:true,
        });

        store.scroller = this.scroller;

        this.setup();

        H.on("NAVIGATE_OUT", this.onLeave);
        H.on("NAVIGATE_IN", this.onEnter);
    }

    setup() {

        
        store.scroller.enable();
        this.setupScrollTrigger(document.querySelector('[data-scroll-inner]'));
    }

    setupScrollTrigger(scrollInner) {
        
    
        ScrollTrigger.defaults({
            scroller: '[data-scroll-inner]'
        });

        ScrollTrigger.scrollerProxy(scrollInner, {
            scrollTop(value) {
                return arguments.length ? store.scroller.scrollTo(value) : -store.scroller.smoothScrollPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
        });

        this.scroller.on("raf", this.updateScrollTrigger);
        ScrollTrigger.addEventListener("refresh", this.onScrollTriggerRefresh);
    }

    updateScrollTrigger() {
        ScrollTrigger.update();
    }

    onScrollTriggerRefresh() {
        this.scroller.onResize()
    }

    onLeave() {
        this.scroller.disable();
        this.scroller.off("raf", this.updateScrollTrigger);
        ScrollTrigger.removeEventListener("refresh", this.onScrollTriggerRefresh);
    }

    onEnter({to}) {
        this.scroller.enable(false, true, to.view.querySelector('[data-scroll-inner]'));  
        this.setupScrollTrigger(to.view.querySelector('[data-scroll-inner]'));
    }

}


