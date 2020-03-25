import Highway from '@dogstudio/highway';
import Renderer from './renderer.js';
import Transition from './transition.js';
import {addDetectClasses} from './utils/detect';


addDetectClasses();

new Highway.Core({
    renderers: {
        global: Renderer
    },
    transitions: {
        global: Transition
    }
});