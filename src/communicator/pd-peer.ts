/**
 * Created by anuradhawick on 8/1/17.
 */
import * as  SimplePeer  from 'simple-peer';

declare const streamSaver: any;

const options = {
    initiator: true,
    channelConfig: {},
    channelName: 'dvios-intercon',
    config: {
        iceServers: [
            {url: 'stun:stun.l.google.com:19302'},
            {url: 'turn:192.158.29.39:3478?transport=tcp', username: '28224511:1379330808', credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='},
            {url: 'turn:turn.anyfirewall.com:443?transport=tcp', credential: 'webrtc', username: 'webrtc'}
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
    fileStream;
    writer;
    receivedContent;

    constructor() {
        this.pingReceived = false;
        this.peerObj = null;
        this.connected = false;
        this.callBacks = {
            message: null,
            disconnect: null,
            signal: null,
            progress: null,
            connect: null
        };
        this.signalBuffer = [];
        this.dataBuffer = null;
        this.receiveInfo = null;
        this.currentReceiveProgress = 0;

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
            this.callBacks.message && this.callBacks.message();
            console.log('ended')
        });

        // data reception event
        this.peerObj.on('data', (data) => {
            try {
                let obj = JSON.parse(data);
                if (obj.type === 'ping') {
                    this.pingReceived = true;
                }
                // pass down the message
                this._receiveDataToBuffer(data, false);
            } catch (e) {
                this._receiveDataToBuffer(data, true);
            }
        });
    }

    on(event: 'message' | 'disconnect' | 'signal' | 'progress' | 'connect', callback: Function) {
        this.callBacks[event] = callback;
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
                this.receivedContent = 0;
                if (this.receiveInfo.type === 'file') {
                    this.fileStream = streamSaver.createWriteStream(this.receiveInfo.data.fileName, this.receiveInfo.info.size);
                    this.writer = this.fileStream.getWriter();
                } else {
                    this.dataBuffer = new Buffer(0);
                }
            } else if (obj.eof) {
                if (this.receiveInfo.type === 'file') {
                    this.writer.close();
                } else {
                    this.callBacks.message && this.callBacks.message(this.dataBuffer, this.receiveInfo);
                }
                this.currentReceiveProgress = 0;
            } else {
                this.receivedContent += data.byteLength;
                if (this.receiveInfo.type !== 'file') {
                    this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
                }
                this.currentReceiveProgress = (this.receivedContent / this.receiveInfo.info.size) * 100;
                this.callBacks.progress && this.callBacks.progress(this.currentReceiveProgress);
            }
        } else {
            this.receivedContent += data.byteLength;
            if (this.receiveInfo.type === 'file') {
                this.writer.write(data);
            } else {
                this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
            }
            this.currentReceiveProgress = (this.receivedContent / this.receiveInfo.info.size) * 100;
            this.callBacks.progress && this.callBacks.progress(this.currentReceiveProgress);

        }
    }
}
