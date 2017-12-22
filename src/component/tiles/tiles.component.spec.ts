/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { DejaClipboardModule } from '../../common/core/clipboard/index';
import { Rect } from '../../common/core/graphics/rect';
import { DejaTilesModule } from './index';
import { IDejaTile } from './tile.interface';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';
import { DejaTilesComponent } from './tiles.component';

@Component({
    encapsulation: ViewEncapsulation.None,
    template: `<deja-tiles style="height: 500px;width: 400px;display: block;" [(models)]="tiles" canDelete canCopy canCut canPaste designMode="true" maxwidth="100%" tileminwidth="25%" tileminheight="25%" tilemaxheight="50%" tilemaxwidth="50%">
                    <ng-template #tileTemplate let-tile let-pressed="pressed" let-selected="selected">
                        <span style="width: 100%;height: 100%;display: block;" class="tile-content noselect" [style.background-color]="tile.templateModel.color" [attr.selected]="selected" [attr.pressed]="pressed">{{ tile.templateModel.name }}</span>
                    </ng-template>
                </deja-tiles>`,
    styles: [`* { transition: unset !important; }`]
})
class DejaTilesContainerComponent {
    public fructs = [
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

    public testDone() {
        return true;
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
                DejaClipboardModule.forRoot(),
            ]
        }).compileComponents();
    }));

    const observeDom$ = (fixture: ComponentFixture<DejaTilesContainerComponent>) => {
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const layoutProvider = tilesDebugElement.injector.get(DejaTilesLayoutProvider) as DejaTilesLayoutProvider;
        return Observable.from(layoutProvider.layoutCompleted);
    };

    fit('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        fixture.detectChanges();
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance;
        expect(tilesInstance).toBeTruthy();
    }));

    fit('should insert a new tile without bounds at the end', async(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture)
            .first()
            .subscribe(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile'));
                expect(tileElements.length).toBe(13);
                const beerTile = tileElements.find((t) => t.nativeElement.id === 'Beer');
                expect(beerTile).toBeDefined();
                expect(beerTile.nativeElement.offsetTop).toBe(480);
                tilesContainerInstance.testDone();
            });

        spyOn(tilesContainerInstance, 'testDone');

        tilesContainerInstance.tiles.unshift({
            id: 'Beer',
            color: '#FBC02D',
            templateModel: {
                name: 'Beer',
                color: '#FBC02D',
            },
        } as IDejaTile);

        tilesContainerInstance.tiles = [...tilesContainerInstance.tiles];
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    fit('should select the specified tiles', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture)
            .subscribe(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile[selected="true"]'));
                switch (++pass) {
                    case 1:
                        expect(tileElements.length).toBe(0);
                        tilesInstance.selectedTiles = ['Peach', 'Cherries'];
                        tilesInstance.refresh();
                        break;

                    default:
                        tilesContainerInstance.testDone();
                        expect(tileElements.length).toBe(2);
                }
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    fit('should delete the selected tiles', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture)
            .subscribe(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile'));
                switch (++pass) {
                    case 1:
                        expect(tileElements.length).toBe(12);
                        tilesInstance.deleteSelection();
                        break;

                    default:
                        tilesContainerInstance.testDone();
                        expect(tileElements.length).toBe(10);
                }
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Guava', 'Mango'];

        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    fit('should cut, and paste the selected tiles', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture)
            .subscribe(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile:not[cutted]'));
                switch (++pass) {
                    case 1:
                        expect(tileElements.length).toBe(12);
                        tilesInstance.cutSelection();
                        tilesInstance.refresh();
                        break;

                    case 2:
                        expect(tileElements.length).toBe(10);
                        tilesInstance.copySelection();
                        tilesInstance.refresh();
                        break;

                    default:
                        tilesContainerInstance.testDone();
                        expect(tileElements.length).toBe(12);
                        break;

                }
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Guava', 'Mango'];

        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    fit('should copy, and paste the selected tiles', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture)
            .subscribe(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile'));
                switch (++pass) {
                    case 1:
                        expect(tileElements.length).toBe(12);
                        tilesInstance.copySelection();
                        tilesInstance.refresh();
                        break;

                    case 2:
                        expect(tileElements.length).toBe(12);
                        tilesInstance.paste();
                        tilesInstance.refresh();
                        break;

                    default:
                        tilesContainerInstance.testDone();
                        expect(tileElements.length).toBe(14);
                        break;

                }
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Guava', 'Mango'];

        fixture.whenStable().then(() => {

            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));
});
