/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Rect } from '../../common/core/graphics/rect';
import { DejaTilesModule } from './index';
import { IDejaTile } from './tile.interface';
import { DejaTilesComponent } from './tiles.component';

@Component({
    template: `<deja-tiles style="height: 500px;width: 400px;display: block;" [models]="tiles" canDelete canCopy canCut canPaste designMode="true" maxwidth="100%" tileminwidth="25%" tileminheight="25%" tilemaxheight="50%" tilemaxwidth="50%">
                    <ng-template #tileTemplate let-tile let-pressed="pressed" let-selected="selected">
                        <span style="width: 100%;height: 100%;display: block;" class="tile-content noselect" [style.background-color]="tile.templateModel.color" [attr.selected]="selected" [attr.pressed]="pressed">{{ tile.templateModel.name }}</span>
                    </ng-template>
                </deja-tiles>`,
})
class DejaTilesContainerComponent {
    protected fructs = [
        {
            name: 'Peach',
            color: '#FF6F00',
        },
        {
            name: 'Banana',
            color: '#FFEB3B',
        },
        {
            name: 'Cantaloupe',
            color: '#AED581',
        },
        {
            name: 'Cherries',
            color: '#880E4F',
        },
        {
            name: 'Chinese Pears',
            color: '#F5F5F5',
        },
        {
            name: 'Cranberries',
            color: '#C2185B',
        },
        {
            name: 'Guava',
            color: '#FFCA28',
        },
        {
            name: 'Grapes',
            color: '#303F9F',
        },
        {
            name: 'Lemon',
            color: '#FFF176',
        },
        {
            name: 'Mango',
            color: '#FBC02D',
        },
        {
            name: 'Pineapple',
            color: '#FDD835',
        },
        {
            name: 'Watermelon',
            color: '#E91E63',
        },
    ] as any[];

    public tiles: IDejaTile[];

    constructor() {
        let x = 0;
        let y = 0;

        this.tiles = this.fructs
            .map((fruct) => {
                const tile = {
                    bounds: new Rect(x, y, 30, 30),
                    id: fruct.name,
                    color: fruct.color,
                    templateModel: fruct,
                } as IDejaTile;

                x += 30;
                if (x + 30 > 100) {
                    x = 0;
                    y += 30;
                }

                return tile;
            });
    }
}

describe('DejaTilesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaTilesContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTilesModule,
            ],
        }).compileComponents();
    }));

    fit('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        fixture.detectChanges();
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance;
        expect(tilesInstance).toBeTruthy();
    }));
});
