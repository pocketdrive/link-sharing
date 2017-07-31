/**
 * Created by anuradhawick on 7/31/17.
 */
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import uuid from 'uuid/v4';

import { centralServer, centralServerWSPort } from '../../config';

export class Communicator {
    ws: $WebSocket;
    connectedToServer: boolean = false;
    registeredDevice: boolean = false;
    connectedToPD: boolean = false;

    constructor() {
        this.ws = new $WebSocket(`ws://${centralServer}:${centralServerWSPort}`);
        this.ws.onMessage(
            (msg: MessageEvent) => {
                this.onMessage(msg.data);
            },
            {autoApply: false}
        );
        this.ws.setSend4Mode(WebSocketSendMode.Direct);
    }

    onMessage(msg: string) {
        const obj = JSON.parse(msg);
        switch (obj.type) {
            case 'registerDevice':
                if (obj.success) {

                }
                break;
        }
        console.log('message: ' + obj);
    }

    registerOnServer() {
        const msg = {
            type: 'registerDevice',
            data: {username: `user-${uuid().toString()}`, deviceId: `dev-id-${uuid().toString()}`}
        };

        this.sendMessage(
            JSON.stringify(msg)
        );
    }

    sendMessage(msg: string) {
        this.ws.send(msg);
    }
}
