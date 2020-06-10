//https://github.com/joshkirk/highway-scroll/blob/master/src/js/_global/storage.js

export default {
    'firstLoad': true,
    'windowHeight': '',
    'windowWidth':'',
    'reducedMotion': window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    'isDesktop' : null,
    'isMobile'  : null,
    'isFirefox' : null,
    'isSafari' : null,
    'isIe11' : null,
    'isChrome' : null,
}