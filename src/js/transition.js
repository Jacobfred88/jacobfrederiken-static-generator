import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import {select} from './utils';



class Transition extends Highway.Transition {

    constructor(props) {
      super(props);

      this.sail = select('[data-sail]');
    }

    in({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0);

        // Remove Old View
        from.remove();

        gsap.to(this.sail,{
          y: '-100vh',
          duration: 1,
          ease: 'expo.out',
          onComplete: () => done(),
        });

      }

      out({ from, done }) {

        gsap.fromTo(this.sail, {
          y: '100vh',
        }, {
          y: 0,
          duration: 1,
          ease: 'expo.out',
          onComplete: () => done(),
        });
      }
}

// Don`t forget to export your transition
export default Transition;
