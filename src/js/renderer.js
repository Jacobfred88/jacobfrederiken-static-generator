import Highway from '@dogstudio/highway';
import LazyLoad from 'vanilla-lazyload';

class CustomRenderer extends Highway.Renderer {
  constructor(props) {
    super(props);
    this.lazyLoadInstance = new LazyLoad({
        elements_selector: '[data-lazy]',
        threshold: 1000,
    });
  }
  onEnter() {  }
  onLeave() {  }
  
  onEnterCompleted() { 
    this.lazyLoadInstance.update();
  }

  onLeaveCompleted() { }
}

// Don`t forget to export your renderer
export default CustomRenderer;