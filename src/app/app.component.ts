import { Component, OnInit } from '@angular/core';

import { Communicator } from '../communicator/communicator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    communicator: Communicator;

    constructor() {
    }

    ngOnInit() {
        this.startSequence();
    }

    startSequence() {
        // connect to the WebSocket server
        this.communicator = new Communicator();
        this.communicator.registerOnServer();
    }

    obtainPathParams() {
        const origin = window.location.origin;
        let url = window.location.href;
        url = url.replace(origin,'').replace('/', '');
        url = url.trim();
        return url.split('/');
    }
}
