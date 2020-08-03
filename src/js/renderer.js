import Highway from '@dogstudio/highway';
import Component from './components/component';
class CustomRenderer extends Highway.Renderer {

  constructor(props) {
    super(props);

    this.components = [];
  }
  
  onEnter() { 

    // this.components.push(new Component());

    new Component()
  }
  
  onLeave() {  }
  
  onEnterCompleted() { }
  onLeaveCompleted() { 

    // this.components.map(component => {
    //   component.destroy();
    // });
  }
}

// Don`t forget to export your renderer
export default CustomRenderer;