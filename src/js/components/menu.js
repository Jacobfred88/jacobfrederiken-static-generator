import BaseComponent from "./baseComponent";
import store from '../global/store';
import {select,selectAll} from '../utils';
import {H} from '../routing';
import {preloading} from '../utils/preloader';
import gsap from 'gsap';

export default class Header extends BaseComponent {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
        this.reset = this.reset.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.overlay = select('[data-menu-overlay]');
        this.toggleBtn = select('[data-menu-toggle]')

        this.overlayIsOpen = false;
        this.toggleBtn.addEventListener('click', this.toggle);

        this.disableSolidMode = false;

        this.tl = gsap.timeline({
          defaults: {
            duration: 0.65,
            ease: 'power4.out',
          },
        });

        H.on('NAVIGATE_IN', this.reset);
        H.on('NAVIGATE_OUT', this.onLeave);

        preloading(() => {
          this.reset();
        });
    }

    onLeave() {
    }

    reset() {
      gsap.set(this.overlay,{
        display: 'none',
      });
      this.overlayIsOpen = false;
      document.body.classList.remove('is-overlay-open');
    }

    toggle() {

      if(this.overlayIsOpen) {
        this.closeOverlay();
      } else {
        this.openOverlay();
      }
    }

    openOverlay() {
      this.overlayIsOpen = true;
      document.body.classList.add('is-overlay-open');

      this.tl
      .clear()
      .fromTo(this.overlay, {
        display: 'none',
        opacity:0,
      },{
        display: 'block',
        opacity:1,
      });
    }

    closeOverlay() {
      this.overlayIsOpen = false;
      document.body.classList.remove('is-overlay-open');

      this.tl
      .clear()
      .to(this.overlay,{
        display: 'none',
        opacity:0,
      });
    }
}
