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
    template: `<deja-tiles style="height: 500px;width: 400px;display: block;" [(models)]="tiles" canDelete canCopy canCut canPaste designMode="true" maxwidth="100%" tileminwidth="5%" tileminheight="5%" tilemaxheight="50%" tilemaxwidth="50%">
                    <ng-template #tileTemplate let-tile let-pressed="pressed" let-selected="selected">
                        <span style="width: 100%;height: 100%;display: block;" class="tile-content noselect" [style.background-color]="tile.templateModel.color" [attr.selected]="selected" [attr.pressed]="pressed">{{ tile.templateModel.name }}</span>
                    </ng-template>
                </deja-tiles>`,
    styles: [`* { transition: unset !important; }
    deja-tiles {
        left: 100px;
        top: 100px;
        postion: absolute;
    }`]
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
            name: 'ChinesePears',
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
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile:not([cutted])'));
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

    fit('should change the cursor when mouse is over a tile', async(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEvent = (element: HTMLElement, type: string, x: number, y: number) => {
            const bounds = element.getBoundingClientRect();
            const eventInit = () => ({
                bubbles: true,
                cancelable: (type !== 'mousemove'),
                view: document.defaultView,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
                shiftKey: false,
                button: 0,
                buttons: 0,
                clientX: bounds.left + x,
                clientY: bounds.top + y,
                relatedTarget: element,
            } as MouseEventInit);
            const event = new MouseEvent(type, eventInit());
            element.dispatchEvent(event);
            fixture.detectChanges();
        };

        observeDom$(fixture)
            .debounceTime(10)
            .map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile'));
                const selectedTile = fixture.debugElement.query(By.css('deja-tiles > #tiles > deja-tile[selected="true"]'));
                const selectedElement = selectedTile.nativeElement as HTMLElement;

                expect(tileElements.length).toBe(12);
                expect(selectedTile).toBeDefined();
                sendMouseEvent(tilesContainerElement, 'mouseenter', 0, 0);

                sendMouseEvent(selectedElement, 'mousemove', 1, 1);
                return selectedElement;
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('nw-resize');
                sendMouseEvent(selectedElement, 'mousemove', 60, 1);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('n-resize');
                sendMouseEvent(selectedElement, 'mousemove', 119, 1);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('ne-resize');
                sendMouseEvent(selectedElement, 'mousemove', 119, 60);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('e-resize');
                sendMouseEvent(selectedElement, 'mousemove', 119, 119);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('se-resize');
                sendMouseEvent(selectedElement, 'mousemove', 60, 119);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('s-resize');
                sendMouseEvent(selectedElement, 'mousemove', 1, 119);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('sw-resize');
                sendMouseEvent(selectedElement, 'mousemove', 1, 60);
            })
            .delay(20)
            .do((selectedElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('w-resize');
                sendMouseEvent(selectedElement, 'mousemove', 60, 60);
            })
            .delay(20)
            .do(() => {
                expect(tilesContainerElement.style.cursor).toBe('move');
                sendMouseEvent(tilesContainerElement, 'mousemove', 1, 1);
            })
            .delay(20)
            .subscribe(() => {
                expect(tilesContainerElement.style.cursor).toBe('');
                tilesContainerInstance.testDone();
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Cherries'];

        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    fit('should ivert two tiles when a tile is drag and dropped into another', async(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance as DejaTilesContainerComponent;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;
        const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();

        const sendMouseEvent = (element: HTMLElement, type: string, pageX: number, pageY: number, buttons = 0) => {
            const eventInit = () => ({
                bubbles: true,
                cancelable: (type !== 'mousemove'),
                view: document.defaultView,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
                shiftKey: false,
                button: 0,
                buttons: buttons,
                clientX:  pageX,
                clientY: pageY,
                relatedTarget: element,
            } as MouseEventInit);
            const event = new MouseEvent(type, eventInit());
            element.dispatchEvent(event);
            fixture.detectChanges();
        };

        observeDom$(fixture)
            .debounceTime(10)
            .first()
            .map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles > #tiles > deja-tile'));
                const dragTile = fixture.debugElement.query(By.css('deja-tiles > #tiles > deja-tile#Peach'));

                const dragElement = dragTile.nativeElement as HTMLElement;

                expect(tileElements.length).toBe(12);
                expect(dragElement).toBeDefined();
                sendMouseEvent(tilesContainerElement, 'mouseenter', 0, 0);

                sendMouseEvent(dragElement, 'mousemove', tilesContainerBounds.left + 60, tilesContainerBounds.top + 60);
                fixture.detectChanges();
                return dragElement;
            })
            .delay(20)
            .do((dragElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('move');
                sendMouseEvent(dragElement, 'mousedown', tilesContainerBounds.left + 60, tilesContainerBounds.top + 60, 1);
            })
            .delay(20)
            .do((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEvent(dragElement, 'mousemove', tilesContainerBounds.left + 70, tilesContainerBounds.top + 70, 1);
            })
            .delay(20)
            .do((dragElement: HTMLElement) => {
                // Drag on another tile
                sendMouseEvent(dragElement, 'mousemove', tilesContainerBounds.left + 190, tilesContainerBounds.top + 190, 1);
            })
            .delay(600)
            .do((dragElement: HTMLElement) => {
                expect(tilesContainerElement.style.cursor).toBe('move');
                const bounds = dragElement.getBoundingClientRect();
                const invertedElement = fixture.debugElement.query(By.css('deja-tiles > #tiles > deja-tile#ChinesePears'));
                const invertedBounds = invertedElement.nativeElement.getBoundingClientRect();
                expect(bounds.left).toBe(tilesContainerBounds.left + 120);
                expect(bounds.top).toBe( tilesContainerBounds.top + 120);
                expect(invertedBounds.left).toBe(tilesContainerBounds.left);
                expect(invertedBounds.top).toBe(tilesContainerBounds.top);
            })
            .delay(20)
            .subscribe(() => {
                tilesContainerInstance.testDone();
            });

        spyOn(tilesContainerInstance, 'testDone');

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            tilesInstance.refresh();
            expect(tilesContainerInstance.testDone).toHaveBeenCalled();
        });
    }));
});
