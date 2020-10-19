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
        // console.log('scroll Raf',scrollPos,smoothScrollPos );
    }

    onPreloadCompleted() {
        // console.log('onPreloadCompleted');
    }

    onResize() {
        // console.log('resize',store);
    }

    onDestroy() {
        // console.log('destory!');
    }
}