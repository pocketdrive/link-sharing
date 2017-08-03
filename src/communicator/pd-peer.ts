/**
 * Created by anuradhawick on 8/1/17.
 */
import * as  SimplePeer  from 'simple-peer';
import * as _ from 'lodash';

const options = {
    initiator: true,
    channelConfig: {},
    channelName: 'dvios-intercon',
    config: {
        iceServers: [
            {url: 'stun:stun.l.google.com:19302'},
            {url: 'turn:anuradha@192.248.8.242:3478', username: 'anuradha', credential: 'sanjeewa'}
        ]
    },
    constraints: {},
    offerConstraints: {},
    answerConstraints: {},
    reconnectTimer: false,
    sdpTransform: function (sdp) {
        return sdp
    },
    stream: false,
    trickle: true,
    objectMode: false
};

export default class PDPeer {
    pingReceived;
    peerObj;
    connected;
    callBacks;
    signalBuffer;
    dataBuffer;
    receiveInfo;
    currentReceiveProgress;
    RECEIVEDSIZE = 0;

    constructor() {
        this.pingReceived = false;
        this.peerObj = null;
        this.connected = false;
        this.callBacks = {
            onMessage: null,
            onDisconnect: null,
            onSignal: null,
            receiveProgressChange: null
        };
        this.signalBuffer = [];
        this.dataBuffer = null;
        this.receiveInfo = null;
        this.currentReceiveProgress = 0;

        if (!SimplePeer.WEBRTC_SUPPORT) {
            alert('Please switch to Google Chrome or FireFox. Thank you');
            return;
        }

        this.peerObj = new SimplePeer(options);

        // signal event
        this.peerObj.on('signal', (data) => {
            this.signalBuffer.push(data);
        });

        // connected event
        this.peerObj.on('connect', () => {
            this.connected = true;
        });


        this.peerObj.on('end', () => {
            console.log('ended')
        });

        // data reception event
        this.peerObj.on('data', (data) => {
            try {
                let obj = JSON.parse(data);
                if (obj.type === 'pong') {
                    this.pingReceived = true;
                }
                // pass down the message
                else if (this.callBacks.onMessage !== null) {
                    this._receiveDataToBuffer(data, false);
                }
            } catch (e) {
                if (this.callBacks.onMessage !== null) {
                    this._receiveDataToBuffer(data, true);
                }
            }
        });
    }

    receiveBuffer(callback) {
        this.callBacks.onMessage = callback;
    }


    getCurrentReceiveProgress(callback) {
        this.callBacks.receiveProgressChange = callback;
    }

    async sendBuffer(buffer, type = null, data = null) {
        let file = buffer;
        let i = 0;
        let metaObj = {
            sof: true,
            eof: false,
            info: {
                size: file.byteLength
            },
            type: type,
            data: data // To be used at the user level
        };
        this.peerObj.send(JSON.stringify(metaObj));

        while (file.byteLength > 0) {
            this.peerObj.send(file.slice(0, 1024 * 64));
            file = file.slice(1024 * 64);
            i++;
            // For ever 100 chunks wait for ping back to ensure buffer protection
            if (i === 100) {
                this.peerObj.send(JSON.stringify({type: 'ping'}));
                await this._waitForPing();
                i = 0;
            }
        }
        metaObj.eof = true;
        metaObj.sof = false;
        this.peerObj.send(JSON.stringify(metaObj));
    }

    async getSignal() {
        let attempts = 0;
        return await new Promise((resolve) => {
            let int = setInterval(() => {
                if (attempts === 10) {
                    resolve(this.signalBuffer);
                    clearInterval(int);
                }
                attempts++;
            }, 100);
        });
    }

    setSignal(signal) {
        this.peerObj.signal(signal)
    }

    isConnected() {
        return this.connected;
    }

    async _waitForPing() {
        let attempts = 0;
        const status = await new Promise((resolve) => {
            let int = setInterval(() => {
                if (this.pingReceived) {
                    this.pingReceived = false;
                    resolve(true);
                    clearInterval(int);
                } else if (attempts === 50) {
                    resolve(false);
                    this.pingReceived = false;
                    clearInterval(int)
                }
                attempts++;
            }, 10);
        });
        return status;
    }

    _receiveDataToBuffer(data, isBuffer) {
        if (!isBuffer) {
            let obj = JSON.parse(data);
            if (obj.sof) {
                this.receiveInfo = {info: obj.info, type: obj.type, data: obj.data};
                this.dataBuffer = new Buffer(0)
                this.RECEIVEDSIZE=0;
            } else if (obj.eof) {
                this.currentReceiveProgress = 0;
                this.callBacks.onMessage(this.dataBuffer, this.receiveInfo);
            } else {
                // this.currentReceiveProgress = (this.dataBuffer.byteLength / this.receiveInfo.info.size) * 100;
                this.RECEIVEDSIZE+=data.byteLength;
                this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
                this.currentReceiveProgress = (this.RECEIVEDSIZE / this.receiveInfo.info.size) * 100;
            }
        } else {
            this.RECEIVEDSIZE+=data.byteLength;
            // this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
            // this.currentReceiveProgress = (this.dataBuffer.byteLength / this.receiveInfo.info.size) * 100;
            this.currentReceiveProgress = (this.RECEIVEDSIZE / this.receiveInfo.info.size) * 100;
            console.log(this.currentReceiveProgress)
            if (this.callBacks.receiveProgressChange !== null) {
                this.callBacks.receiveProgressChange(this.currentReceiveProgress);
            }
        }
    }
}
