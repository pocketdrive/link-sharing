import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import * as  SimplePeer  from 'simple-peer';

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

    constructor(private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        const mode = this.getParameterByName('mode') ? 'fileOpen' : 'linkShare';
        const isMultiPath = !!this.getParameterByName('multi');
        this.startSequence(mode, isMultiPath);
    }

    getParameterByName(name: string) {
        const searchParams = new URLSearchParams(window.location.search);

        return searchParams.get(name) || null;
    }

    async startSequence(mode, isMultiPath) {
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
                mode: mode,
                username: params[0],
                isMultiPath: isMultiPath,
                path: isMultiPath ? JSON.parse(this.getParameterByName('path')) : this.getParameterByName('path'),
                fileId: params[2]
            };
            pd.sendBuffer(new Buffer(JSON.stringify(message)), 'json');
            pd.on('progress', this.updateDownloadBar());
            pd.on('message', this.handleMessage());
            pd.on('disconnect', this.handleDisconnectError());
            this.updateUI();
        }
    }

    handleDisconnectError() {
        const localThis = this;

        return () => {
            localThis.error = "Peer connection dropped";
            localThis.message = "You are disconnected. Please check your internet connection and check whether host is online";
        }

    }

    obtainPathParams() {
        let url = window.location.pathname;
        if (url[0] === '/') {
            url = url.slice(1);
        }
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
            if (info.type == 'file') {
                const a = document.createElement('a');
                const blobVal = new window.Blob(message);

                a.download = info.data.fileName;
                a.href = URL.createObjectURL(blobVal);

                a.click();
                return;
            }

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
            try {
                document.getElementById('percentage').innerText = '' + (this.percentage || 0);
            } catch(e) {
                clearInterval(this.interval);
            }
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
