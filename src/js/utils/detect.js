if(typeof document !== `undefined`) {
  
const Browserizr = require('browserizr').default;
var detect = null;

    detect = Browserizr.detect();
}

export const addDetectClasses = () => {

    const classes = detect.cssClasses(['Mobile', 'Desktop','IE11','IOS','Chrome','Safari','Android','Edge','IPhone5','IPad']);
    classes.map(detectClass => {
      document.querySelector('html').classList.add(detectClass);
    })

}

export default detect;