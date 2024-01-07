export default class WebWorker {
    // static instance;
    constructor(worker) {
        // if (WebWorker.instance) return WebWorker.instance;
        const code = worker.toString();
        const blob = new Blob(['('+code+')()']);
        // WebWorker.instance = this;
        return new Worker(URL.createObjectURL(blob));
    }
}