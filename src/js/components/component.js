import BaseComponent from "./baseComponent";
import store from '../global/store';
import {select, selectAll} from '../utils';
export default class Components extends BaseComponent {
    constructor(elm) {
        super();

        this.root = elm;
    
    }

    onResize() {
        console.log('resize',store);
    }

    onDestroy() {
        console.log('destory!');
    }
}