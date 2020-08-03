import BaseComponent from "./baseComponent";
import store from '../global/store';

export default class Components extends BaseComponent {
    constructor() {
        super();
    }

    onResize() {
        console.log('resize',store);
    }

    onDestroy() {
        console.log('destory!');
    }
}