import BaseComponent from "./baseComponent";
import store from '../global/store';
import {select, selectAll} from '../utils';
import gsap from 'gsap';
export default class Components extends BaseComponent {
    constructor(elm) {
        super();

        this.root = elm;
    }

    onScrollerRaf({ scrollPos, smoothScrollPos }) {
        console.log('scroll Raf',scrollPos,smoothScrollPos );
    }

    onPreloadCompleted() {
        console.log('onPreloadCompleted');

        Array.from(document.querySelectorAll('[data-plane]')).map(elm => {
            gsap.from(elm, {
              scrollTrigger: {
                trigger: elm,
                scrub:true,
                end: "center center",
              }, // start the animation when ".box" enters the viewport (once)
              scale:0.5,
            });
          });
    }

    onResize() {
        console.log('resize',store);
    }

    onDestroy() {
        console.log('destory!');
    }
}