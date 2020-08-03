

export default class WaitCursor {

    constructor(props) {

        this.delay = props;
        
        this.cursorTimeout = null;

        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
    }

    start() {
        this.cursorTimeout = setTimeout(this.addWait,this.delay);
    }

    end() {
        clearTimeout(this.cursorTimeout);
        this.removeWait();
    }

    addWait() {
        document.body.style.cursor = 'wait';
    }

    removeWait() {
        document.body.style.cursor = null;
    }
}