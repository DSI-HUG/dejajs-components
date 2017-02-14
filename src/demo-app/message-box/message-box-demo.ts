/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Message } from './message';

@Component({
    selector: 'message-box-demo',
    styleUrls: ['./message-box-demo.scss'],
    templateUrl: './message-box-demo.html',
})
export class MessageBoxDemo implements OnInit {

    protected actions = [
        {
            action: () => {
                this.dialogVisible = true;
            },
            text: 'Cliquez moi pour ouvrir une deja-dialog',
            type: 'primary',
        },
        {
            action: () => alert('test action'),
            text: 'test sans icon',
        },
        {
            action: () => alert('test action'),
            type: 'danger',
        },
    ];

    protected closeAction = [
        {
            action: () => alert('test action'),
            icon: 'clear',
        },
    ];

    private dialogVisible;

    /*
    The example below demonstrate how you can dynamically add snackbars using *ngFor structural directive.
    Here the Observable simulate items being push from the server
    */
    private messages: Observable<any>;

    constructor() { }

    public ngOnInit() {
        this.messages = Observable
            .interval(2000)
            .map((x: number) => {
                if(x % 2 === 0 ) {
                    return new Message('Server push information', 'info'); 
                } else {
                    return new Message('Server push error', 'danger'); 
                }
            })
            .scan((acc, curr) => [...acc, curr], [])
            .defaultIfEmpty([]);
    }

}
