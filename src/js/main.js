import Highway from '@dogstudio/highway';
import Renderer from './renderer.js';
import Transition from './transition.js';

// Call Highway.Core once.
// Store it in a variable to use events
new Highway.Core({
    renderers: {
        global: Renderer
    },
    transitions: {
        global: Transition
    }
});