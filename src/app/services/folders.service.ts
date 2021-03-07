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
    }
}

@Injectable()
export class FoldersService {

    private folders = [] as Folder[];

    public constructor() {
        this.folders = this.addLevel(1);
    }

    public getFolders(): Folder[] {
        return this.folders;
    }

    private addLevel(level: number): Folder[] {
        if (level > 15) {
            return null;
        }

        const child = new Folder(level, 1);
        child.children = this.addLevel(level + 1);

        return [child];
    }
}
