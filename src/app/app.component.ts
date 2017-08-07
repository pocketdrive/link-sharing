import { Component, OnInit, NgZone } from '@angular/core';
import * as _ from 'lodash';
import * as  SimplePeer  from 'simple-peer';
import { createWriteStream, supported, version } from 'StreamSaver';

import { Communicator } from '../communicator/communicator';

declare const streamSaver: any;

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
    downloadComplete: boolean = false;
    error: string = null;
    message: string = null;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.startSequence();
    }

    async startSequence() {
        if (!SimplePeer.WEBRTC_SUPPORT) {
            this.error = 'WebRTC not supported by your browser';
            this.message = 'Unfortunately, this browser does not support our link sharing download feature yet. Please switch to google Chrome or Opera';
            console.error(this.error);
            return;
        }
        if (!streamSaver.supported) {
            this.error = 'Streaming not supported by your browser';
            this.message = 'Unfortunately, this browser does not support our link sharing download feature yet. Please switch to google Chrome or Opera';
            console.error(this.error);
            return;
        }

        // connect to the WebSocket server
        const params = this.obtainPathParams();
        this.communicator = new Communicator(params[0], params[1]);
        this.communicator.on('error', this.handleWsError());
        this.communicator.registerOnServer();
        const connectionStatus = await this.waitForP2PConnection();

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
            pd.on('message', this.handleMessage());
            this.updateUI();
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

    handleMessage() {
        const localThis = this;

        return (message, info) => {
            if (info.type !== 'json') return;

            const msgObj = JSON.parse(message);

            switch (msgObj.type) {
                case 'error':
                    localThis.error = msgObj.error;
                    localThis.message = msgObj.message;
                    console.error(this.error, this.message);
                    break;
            }
        }
    }

    updateUI() {
        this.interval = setInterval(() => {
            document.getElementById('percentage').innerText = '' + (this.percentage || 0);
            if (this.percentage === 100) {
                this.downloadComplete = true;
                clearInterval(this.interval);
            }
        }, 1000);
    }

    handleWsError() {
        const localThis = this;

        return (msgObj) => {
            localThis.error = msgObj.error;
            localThis.message = msgObj.message;
            console.error(this.error, this.message);
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
