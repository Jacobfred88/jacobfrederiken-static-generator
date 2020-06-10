import "./routing";
import store from './global/store';
import {onReady,onResize} from './global/renderer';

if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
	
	store.windowWidth = window.innerWidth;
	store.windowHeight = window.innerHeight;
	
	onReady();
}, false);


let resizeTimeout = setTimeout(()=>{},0);

window.onresize = function(){
	
	/* --- Clear the timeout if actively resizing --- */
	clearTimeout(resizeTimeout);

	/* --- Delay resize event --- */
	resizeTimeout = setTimeout(()=>{

		/* --- Keep these up to date --- */
		store.windowWidth = window.innerWidth;
		store.windowHeight = window.innerHeight;
		
		/* --- Fire onResize --- */
		onResize();
	}, 250);
};