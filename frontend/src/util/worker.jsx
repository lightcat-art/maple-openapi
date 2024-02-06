export default class WebWorker {
    // static instance;
    constructor(worker) {
        if (WebWorker.instance) return WebWorker.instance;
        this.unionWorker = null;
        WebWorker.instance = this;
        // return new Worker(URL.createObjectURL(blob));
    }

    getUnionWorker(worker) {
        if(typeof(Worker) !== "undefined") {
            if(typeof(this.unionWorker) === "undefined" || !this.unionWorker) {
                const code = worker.toString();
                const blob = new Blob(['('+code+')()']);
                this.unionWorker = new Worker(URL.createObjectURL(blob));
            } else {
            }
        }
        return this.unionWorker
    }

    clearUnionWorker() {
        this.unionWorker.terminate()
        this.unionWorker = undefined
    }
}