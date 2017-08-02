/**
 * Created by anuradhawick on 7/31/17.
 */
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import uuid from 'uuid/v4';

import { centralServer, centralServerWSPort } from '../../config';
import PDPeer from './pd-peer';
import * as wsm from './ws-messages';

export class Communicator {
    ws: $WebSocket;
    registeredDevice: boolean = false;
    pdPeer: PDPeer = null;
    username: string = `user-${uuid().toString()}`;
    deviceId: string = `dev-id-${uuid().toString()}`;

    constructor(private targetUsername, private targetDeviceId) {
        this.ws = new $WebSocket(`ws://${centralServer}:${centralServerWSPort}`);
        this.ws.onMessage(
            (msg: MessageEvent) => {
                this._onMessage(msg.data);
            },
            {autoApply: false}
        );
        this.ws.setSend4Mode(WebSocketSendMode.Direct);
    }

    async _onMessage(msg: string) {
        const obj = JSON.parse(msg);
        switch (obj.type) {
            case wsm.registerDevice:
                if (obj.success) {
                    this.registeredDevice = true;
                    let signal = await this.initPeerAndGetSignal();
                    this._sendOfferToPeer(signal);
                }
                break;
            case wsm.acceptOffer:
                this.signalSelfPeer(obj.answer);
                break;
        }
    }

    signalSelfPeer(signals) {
        signals.forEach((signal) => {
            this.pdPeer.setSignal(signal)
        });
    }

    registerOnServer() {
        const msg = {
            type: wsm.registerDevice,
            data: {username: this.username, deviceId: this.deviceId}
        };

        this._sendMessageToServer(
            JSON.stringify(msg)
        );
    }

    async initPeerAndGetSignal() {
        this.pdPeer = new PDPeer();
        return await this.pdPeer.getSignal();
    }

    _sendOfferToPeer(signal) {
        const msg = {
            type: wsm.connectionOffer,
            data: {
                username: this.targetUsername,
                deviceId: this.targetDeviceId,
                offer: signal,
                fromUsername: this.username,
                fromDeviceId: this.deviceId
            }
        };

        this._sendMessageToServer(
            JSON.stringify(msg)
        );
    }

    _sendMessageToServer(msg: string) {
        this.ws.send(msg);
    }

    isConnectedP2P() {
        return this.pdPeer && this.pdPeer.isConnected();
    }

    getPeerObject() {
        return this.pdPeer;
    }
}
