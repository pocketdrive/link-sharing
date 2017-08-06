import { Component, OnInit, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { createWriteStream, supported, version } from 'StreamSaver';

import { Communicator } from '../communicator/communicator';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    communicator: Communicator;
    loading: boolean = true;
    percentage: number = 0;
    interval = null;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.startSequence();
    }

    async startSequence() {
        // connect to the WebSocket server
        const params = this.obtainPathParams();
        this.communicator = new Communicator(params[0], params[1]);
        this.communicator.registerOnServer();
        let connectionStatus = await this.waitForP2PConnection();

        if (connectionStatus) {
            this.loading = false;
            const pd = this.communicator.getPeerObject();
            const message = {
                type: 'linkShare',
                username: params[0],
                fileId: params[2]
            };
            pd.sendBuffer(new Buffer(JSON.stringify(message)), 'json');
            pd.on('progress', this.updateDownloadBar());
            this.updateUI();
        } else {
            console.log('P2P connection timed out');
        }
    }

    obtainPathParams() {
        const origin = window.location.origin;
        let url = window.location.href;
        url = url.replace(origin, '').replace('/', '');
        url = url.trim();
        return url.split('/');
    }

    updateDownloadBar() {
        const localThis = this;

        return (progress) => {
            if (_.isNumber(progress)) {
                localThis.percentage = Math.round(progress);
            }
        }
    }

    updateUI() {
        this.interval = setInterval(() => {
            document.getElementById('percentage').innerText = '' + (this.percentage || 0);
            if (this.percentage === 100) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    async waitForP2PConnection() {
        let attempts = 0;
        return await new Promise((resolve) => {
            let int = setInterval(() => {
                if (this.communicator.isConnectedP2P()) {
                    resolve(true);
                    clearInterval(int);
                } else if (attempts === 10) {
                    resolve(false);
                    clearInterval(int)
                }
                attempts++;
            }, 1000);
        });
    }

    _downloadBlob(data, fileName, mimeType) {
        let blob, url;

        blob = new Blob([data], {
            type: mimeType
        });
        url = window.URL.createObjectURL(blob);
        this._downloadURL(url, fileName);
        setTimeout(function () {
            return window.URL.revokeObjectURL(url);
        }, 1000);
    };

    _downloadURL(data, fileName) {
        console.log(data);
        let a;

        a = document.createElement('a');
        a.href = data;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
    };
}
