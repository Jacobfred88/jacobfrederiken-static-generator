import { listen } from 'quicklink';

export default class Prefetch {
  constructor(instance) {
    this.instance = instance;
    this.setup();
  }

  setup() {
    listen();
    this.instance.on('NAVIGATE_END', ({ to }) => {
      listen({
        el: to.view,
      });
    });
  }
}

