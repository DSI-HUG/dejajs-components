/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

export class Folder {
    public label: string;
    public children: Folder[];

    public constructor(level: number, item: number) {
        this.label = `Level ${level} - Item ${item}`;
        this.children = [];
    }
}

@Injectable()
export class FoldersService {

    private folders = [] as Folder[];

    public constructor() {
        this.addLevel(1, this.folders);
    }

    public getFolders(): Folder[] {
        return this.folders;
    }

    private addLevel(level: number, children: Folder[]) {
        if (level > 15) {
            return;
        }

        const child = new Folder(level, 1);
        this.addLevel(level + 1, child.children);

        children.push(child);

    }
}
