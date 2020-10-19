import store from '../global/store';
import {select, selectAll} from '../utils'
import gsap from 'gsap';

export default class Preloader {
    constructor() {
        
        this.onComplete = this.onComplete.bind(this);

        this.root = select('[data-preloader]');
        this.lines = select('[data-preloader-lines]', this.root);
        this.logo = select('[data-preloader-logo]', this.root);

        this.delay = 1000;

        if(document.body.hasAttribute('disable-preloader')) {
          this.onComplete();
        } else {
          this.init();
        }
    }

    init() {

      var tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'power4.inOut',
        },
        onComplete: this.onComplete,
      });
    }

    onComplete() {

      store.firstLoad = false;

      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('preloaderDone'));
      },this.delay);

      var tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'expo.out',
        },
      });

      tl.to(this.root, {
        yPercent: '-100',
        delay:this.delay/1000,
      });
    }
}

export const preloading = (cb) => {

  if(!store.firstLoad) {
    cb();
  } else {
    document.addEventListener('preloaderDone', cb);
  }
}
