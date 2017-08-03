/**
 * Created by RAVIDU-PC on 8/2/2017.
 */
import * as _ from 'lodash';

export default class FSAPIHandler {

    fs: any = null;
    fileInfo;
    dataBuffer;
    bufferWatcher;
    bufferWatcherStarted;

    constructor(fileInfo) {
        this.fileInfo = fileInfo;
        this.dataBuffer = [];
        this.bufferWatcherStarted = false;

        window['requestFileSystem'] = window['requestFileSystem'] || window['webkitRequestFileSystem'];
        window['requestFileSystem']('TEMPORARY', this.fileInfo.info.size, (fs) => {
            this.fs = fs;
            console.log('Opened ' + fs.name);
            this._initSequence();
        }, (e) => {
            // console.log(e);
        });

    }

    async _initSequence() {
        // wait for fs
        if (!await this._waitForFS()) {
            console.log('Failed to load File System API');
            return;
        }
        await this._createFile();
    }

    async _createFile() {
        this.fs.root.getFile(this.fileInfo.data.fileName, {create: true, exclusive: true}, (fileEntry) => {
        }, (error) => {
            console.log('Error', error)
        });
    }

    _appendToFile(data) {
        if(!this.bufferWatcher) {
            this._initateBufferWatcher();
        }
        this.dataBuffer.push(data);
    }

    _flushBufferToFile(dataChunk) {
            dataChunk = '1234567';
            this.fs.root.getFile(this.fileInfo.data.fileName, {create: false}, (fileEntry) => {

                // Create a FileWriter object for our FileEntry.
                fileEntry.createWriter((fileWriter) => {

                    fileWriter.seek(fileWriter.length); // Start write position at EOF.

                    // Create a new Blob and write it to the file.
                    var blob = new Blob([dataChunk], {type: 'application/octet-stream'});

                    fileWriter.write(blob);


                }, (error) => {
                    console.log('Error', error)
                });

            }, (error) => {
                console.log('Error', error)
            });


    }


    _initateBufferWatcher() {
        this.bufferWatcherStarted = true;
        let bufferedItem;
        this.bufferWatcher = setInterval(() => {
            while (this.dataBuffer.length > 0) {
                bufferedItem = this.dataBuffer.shift();
                this._flushBufferToFile(bufferedItem);
            }
        }, 10);

    }

    _readFile(){
        this.fs.root.getFile(this.fileInfo.data.fileName, {}, (fileEntry)=> {

            // Get a File object representing the file,
            // then use FileReader to read its contents.
            fileEntry.file((file)=> {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    console.log(this.result);

                };

                reader.readAsArrayBuffer(file);
            });

        });
    }

    async _waitForFS() {
        let attempts = 0;
        return await new Promise((resolve) => {
            let int = setInterval(() => {
                if (this.fs !== null) {
                    resolve(true);
                } else if (attempts === 10) {
                    resolve(false);
                }
                attempts++;
            }, 10);
        });

    }
}
