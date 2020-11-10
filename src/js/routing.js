import Highway from '@dogstudio/highway';
import Global from './renderers';
import Transition from './transitions';
import ProjectTransition from './transitions/project';
import { onLeave, onEnter, onEnterCompleted } from './global/renderer';

export const H = new Highway.Core({
	renderers: {
		global: Global,
	},
	transitions: {
		global: Transition,
		contextual: {
			project: ProjectTransition,
		},
	},
});

const exclude = ['/cart'];

H.on('NAVIGATE_OUT', ({ from, trigger, location }) => {
	onLeave(from, trigger, location);
});

H.on('NAVIGATE_IN', ({ to, trigger, location }) => {
	onEnter(to, trigger, location);
});

H.on('NAVIGATE_END', ({ from, to, trigger, location }) => {
	onEnterCompleted(from, to, trigger, location);

	H.cache.forEach((value, key, map) => {
		exclude.forEach((path) => {
			if (new URL(key).pathname == path) {
				H.cache.delete(key);
			}
		});
	});
});
