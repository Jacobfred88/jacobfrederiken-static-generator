import {H} from '../routing';

export default class BaseComponent {
    constructor() {
        this.destroy = this.destroy.bind(this);
        this.resize = this.resize.bind(this);
        
        window.addEventListener('onResize', this.resize);

        H.on("NAVIGATE_OUT", this.destroy);
    }


    resize() {
        if(this.onResize) {
            this.onResize();
        }
    }

    destroy() {

        window.removeEventListener('onResize', this.resize);
        H.off("NAVIGATE_OUT", this.destroy);
        if(this.onDestroy) {
            this.onDestroy();
        }
    }
}
