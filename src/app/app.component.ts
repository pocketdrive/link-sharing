import { Component, OnInit, NgZone } from '@angular/core';

import { Communicator } from '../communicator/communicator';
import PDPeer from '../communicator/pd-peer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    communicator: Communicator;
    currentProgress: Number = 0;
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
                fileId: params[2]
            };
            pd.receiveBuffer(this.handlePeerMessage());
            pd.sendBuffer(new Buffer(JSON.stringify(message)), 'json');
            pd.getCurrentReceiveProgress(this.updateDownloadBar());
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

        return function (progress) {
            localThis.percentage = Math.round(progress);
        }
    }

    updateUI() {
        this.interval = setInterval(() => {
            document.getElementById('percentage').innerText = '' + this.percentage;
            if (this.percentage === 100) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    handlePeerMessage() {
        const localThis = this;

        // Performing context binding for the callback
        return function (messageBuffer, messageInfo) {
            if (messageInfo.type === 'file') {
                console.log('received file', JSON.stringify(messageInfo));
            }
        }
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
}
