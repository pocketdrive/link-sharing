/**
 * Created by RAVIDU-PC on 8/2/2017.
 */
import * as _ from 'lodash';

export default class FSAPIHandler {

    fs: any = null;
    fileWriter: any = null;
    fileInfo;
    dataBuffer;
    bufferWatcher;
    bufferWatcherStarted;
    recivedSofar = 0;
    requestFileSystem;
    filename;
    fileCreated = false;
    complete = false;

    constructor(fileInfo) {
        this.fileInfo = fileInfo;
        this.dataBuffer = [];
        this.bufferWatcherStarted = false;
        this.filename = this.fileInfo.data.fileName + Math.round(Math.random() * 100000000) + '.mp3';

        // this.requestFileSystem = self['webkitRequestFileSystemSync'] || self['requestFileSystemSync'];
        window['requestFileSystem'] = window['requestFileSystem'] || window['webkitRequestFileSystem'];
        window['requestFileSystem']('TEMPORARY', this.fileInfo.info.size, (fs) => {
            this.fs = fs;
            console.log('Opened ' + fs.name);
        }, (e) => {
            console.log(e);
        });
    }

    async _createFile() {
        return new Promise((resolve) => {
            this.fs.root.getFile(this.filename, {create: true, exclusive: true}, (fileEntry) => {
                console.log(fileEntry);
                console.log('creating the bloody file')
                resolve();
            }, (error) => {
                console.log('Error', error)
            });
        });
    }

    appendToFile(data) {
        if (!this.bufferWatcher) {
            this._initiateBufferWatcher();
        }
        this.dataBuffer.push(data);
    }

    _flushBufferToFile(dataChunk) {
        return new Promise((resolve) => {
            this.fs.root.getFile(this.filename, {create: false}, (fileEntry) => {

                // Create a FileWriter object for our FileEntry.
                fileEntry.createWriter((fileWriter) => {
                    if (dataChunk === 'end') {
                        this.complete = true;
                        console.log('COMPLETE')
                        resolve();
                        return;
                    }
                    fileWriter.seek(fileWriter.length); // Start write position at EOF.
                    console.log()
                    // Create a new Blob and write it to the file.
                    let blob = new Blob([dataChunk], {type: 'application/octet-stream'});

                    fileWriter.write(blob);
                    this.recivedSofar += dataChunk.byteLength;
                    // console.log('wrote data: ', this.recivedSofar);
                    resolve();
                }, (error) => {
                    console.log('Error', error)
                });

            }, (error) => {
                console.log('Error', error)
            });
        });

    }


    async _initiateBufferWatcher() {
        this.bufferWatcherStarted = true;
        let bufferedItem;
        if (this.fs === null) {
            await this._waitForFS();
        }
        // create file if not
        if (!this.fileCreated) {
            this.fileCreated = true;
            await this._createFile();
        }
        while (this.dataBuffer.length > 0 || !this.complete) {
            if (this.dataBuffer.length > 0) {
                bufferedItem = this.dataBuffer.shift();
                await this._flushBufferToFile(bufferedItem);
                console.log('wrote to buffer')
            }
        }
        console.log('operation complete')
    }

    async readFile() {
        await this._waitForCompletion();
        this.fs.root.getFile(this.filename, {}, (fileEntry) => {

            // Get a File object representing the file,
            // then use FileReader to read its contents.
            fileEntry.file((file) => {
                const reader = new FileReader();
                reader.onloadend = function (e) {
                    console.log(e);

                };
                console.log(file)
                reader.readAsArrayBuffer(file);
            });

        });
    }

    async _waitForCompletion() {
        return await new Promise((resolve) => {
            let int = setInterval(() => {
                if (this.complete) {
                    resolve(true);
                }
            }, 1000);
        });
    }

    async _waitForFS() {
        let attempts = 0;
        return await new Promise((resolve) => {
            let int = setInterval(() => {
                if (this.fileWriter !== null) {
                    resolve(true);
                } else if (attempts === 10) {
                    resolve(false);
                }
                attempts++;
            }, 10);
        });
    }
}
