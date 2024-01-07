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
                console.log('new unionWorker creating = ', this.unionWorker)
            } else {
                console.log('unionWorker already created = ', this.unionWorker)
            }
        }
        return this.unionWorker
    }

    clearUnionWorker() {
        this.unionWorker.terminate()
        this.unionWorker = undefined
        console.log('unionWorker clear = ', this.unionWorker)
    }
}