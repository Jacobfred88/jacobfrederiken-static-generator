import Highway from '@dogstudio/highway';
import Renderer from './renderer.js';
import Transition from './transition.js';
import {addDetectClasses} from './utils/detect';
import Prefetch from './components/prefetch';

addDetectClasses();

const H = new Highway.Core({
    renderers: {
        global: Renderer
    },
    transitions: {
        global: Transition
    }
});

new Prefetch(H);