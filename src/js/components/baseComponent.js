export default class BaseComponent {
    constructor() {
      
        this.resize = this.resize.bind(this);
        window.addEventListener('onResize', this.resize);
    }

    resize() {
        if(this.onResize) {
            this.onResize();
        }
    }

    destroy() {
        
        window.removeEventListener('onResize', this.resize);

        if(this.onDestroy) {
            this.onDestroy();
        }
    }
}
