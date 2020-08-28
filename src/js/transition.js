import Highway from '@dogstudio/highway';
import gsap from 'gsap';



class Transition extends Highway.Transition {

    in({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0);
    
        // Remove Old View
        from.remove();     

        // Animation
        gsap.set(to, {
            opacity: 0
        });

        gsap.to(to,{
            opacity: 1,
            duration: 0.55,
            onComplete: () => done()
            }
        );
      }
    
      out({ from, done }) {
         
        gsap.to(from, {
            opacity: 0,
            duration: 0.55,
            onComplete: () => done()
          }
        );
      }
}

// Don`t forget to export your transition
export default Transition;