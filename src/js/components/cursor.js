import {lerp,hasAttrInTree,selectAll} from '../utils';
import {H} from '../routing';

class Cursor {
  constructor() {

      // if(!document.body.hasAttribute('is-mobile')) {

        this.updateElements = this.updateElements.bind(this);
        this.cursor = document.querySelector('[data-cursor]');
        // this.text = this.cursor.querySelector('[data-cursor-text]');

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;

        document.addEventListener('mousemove', this.onMousemove.bind(this));
        

        this.hoverElements = [];
        this.onUpdate();
        this.updateElements();

        H.on('NAVIGATE_IN', this.updateElements);

      // } else {
      //   this.cursor.classList.add('hidden');
      // }

  }

  onMouseleave() {
    this.cursor.classList.add('c-cursor--hide');
  }

  onMouseenter() {
    this.cursor.classList.remove('c-cursor--hide');
  }

  updateElements() {
    this.hoverElements = selectAll('[data-hover]');
  }

  onUpdate() {

    requestAnimationFrame(this.onUpdate.bind(this));


    this.vx = lerp(this.vx, this.x, 0.15);
    this.vy = lerp(this.vy, this.y, 0.15);
    this.velocityX =  this.vx - this.x;
    this.velocityY =  this.vy - this.y;

    // var currentElm = document.elementFromPoint(this.x,this.y);

  
    this.cursor.style.transform = `translate3d(${this.vx}px,${this.vy}px,0px)`;
  }

  onMousemove(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }
}

export default Cursor;
