/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Rect } from '@deja-js/component/core/graphics';
import { debounceTime, delay, from, map, Observable, take, tap } from 'rxjs';

import { DejaTilesModule } from './index';
import { DejaTile } from './tile.class';
import { DejaTilesComponent } from './tiles.component';
import { IDejaTilesEvent } from './tiles.event';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

const padding = 0;

interface Fruct {
    name: string;
    color: string;
}

@Component({
    selector: 'DejaTilesContainerComponent',
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<deja-tiles id="tiles1" style="height: 500px;width: 400px;display: block;" [(models)]="tiles" canDelete canPaste canCut [designMode]="designMode" maxwidth="100%" tileminwidth="5%" tileminheight="5%" tilemaxheight="50%" tilemaxwidth="50%">
                    <ng-template #tileTemplate let-tile let-pressed="pressed" let-selected="selected">
                        <span style="width: 100%;height: 100%;display: block;" class="tile-content noselect" [style.background-color]="tile.color" [attr.selected]="selected" [attr.pressed]="pressed">{{ tile.templateModel.name }}</span>
                    </ng-template>
                </deja-tiles>
                <deja-tiles id="tiles2" style="height: 500px;width: 400px;display: block;" canPaste canCopy [designMode]="designMode" maxwidth="100%" tileminwidth="5%" tileminheight="5%" tilemaxheight="50%" tilemaxwidth="50%">
                    <ng-template #tileTemplate let-tile let-pressed="pressed" let-selected="selected">
                        <span style="width: 100%;height: 100%;display: block;" class="tile-content noselect" [style.background-color]="tile.color" [attr.selected]="selected" [attr.pressed]="pressed">{{ tile.templateModel.name }}</span>
                    </ng-template>
                </deja-tiles>`,
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    styles: [`* { transition: unset !important; }
    deja-tiles {
        left: 100px;
        top: 100px;
    }`]
})
class DejaTilesContainerComponent {
    public fructs = [
        {
            name: 'Peach',
            color: '#FF6F00'
        },
        {
            name: 'Banana',
            color: '#FFEB3B'
        },
        {
            name: 'Cantaloupe',
            color: '#AED581'
        },
        {
            name: 'Cherries',
            color: '#880E4F'
        },
        {
            name: 'ChinesePears',
            color: '#F5F5F5'
        },
        {
            name: 'Cranberries',
            color: '#C2185B'
        },
        {
            name: 'Guava',
            color: '#FFCA28'
        },
        {
            name: 'Grapes',
            color: '#303F9F'
        },
        {
            name: 'Lemon',
            color: '#FFF176'
        },
        {
            name: 'Mango',
            color: '#FBC02D'
        },
        {
            name: 'Pineapple',
            color: '#FDD835'
        },
        {
            name: 'Watermelon',
            color: '#E91E63'
        }
    ] as Fruct[];

    public tiles: DejaTile[];

    public designMode = true;

    public constructor() {
        let x = 0;
        let y = 0;

        this.tiles = this.fructs
            .map(fruct => {
                const tile = new DejaTile(fruct.name);
                tile.percentBounds = new Rect(x, y, 30, 30);
                tile.color = fruct.color;
                tile.templateModel = fruct;

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
    let overlayContainerElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        // Define a ckeditor base path just for tests, because webpack configuration or asset plugin not working
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const wnd = window as { CKEDITOR_BASEPATH: string };
        wnd.CKEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/ckeditor/';

        void TestBed.configureTestingModule({
            declarations: [
                DejaTilesContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTilesModule
            ],
            providers: [
                {
                    provide: OverlayContainer,
                    useFactory: (): { getContainerElement: () => HTMLElement } => {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: (): HTMLElement => overlayContainerElement };
                    }
                }
            ]
        }).compileComponents();
    }));

    const observeDom$ = (fixture: ComponentFixture<DejaTilesContainerComponent>): Observable<IDejaTilesEvent> => {
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const layoutProvider = tilesDebugElement.injector.get(DejaTilesLayoutProvider);
        return from(layoutProvider.layoutCompleted);
    };

    const sendMouseEvent = (element: EventTarget, type: string, pageX: number, pageY: number, buttons = 0): void => {
        const eventInit = (): MouseEventInit => ({
            bubbles: true,
            cancelable: (type !== 'mousemove'),
            view: document.defaultView,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            button: 0,
            buttons: buttons,
            clientX: pageX,
            clientY: pageY,
            relatedTarget: element
        } as MouseEventInit);
        const event = new MouseEvent(type, eventInit());
        element.dispatchEvent(event);
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        fixture.detectChanges();
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as HTMLElement;
        void expect(tilesInstance).toBeTruthy();
    }));

    it('should insert a new tile without bounds at the end', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesContainerInstance = fixture.componentInstance;
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture).pipe(
            take(1),
            tap(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                void expect(tileElements.length).toBe(13);
                const beerTile = tileElements.find(t => (t.nativeElement as HTMLElement).id === 'Beer');
                void expect(beerTile).toBeDefined();
                void expect((beerTile?.nativeElement as HTMLElement).offsetTop).toBe(360 + padding);
            }),
            delay(10)
        ).subscribe(() => {
            done();
        });

        const tile = new DejaTile('Beer');
        tile.color = '#FBC02D';
        tile.templateModel = {
            name: 'Beer',
            color: '#FBC02D'
        };

        tilesContainerInstance.tiles.unshift(tile);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tilesContainerInstance.tiles = [...tilesContainerInstance.tiles];
        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should select the specified tiles', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture).subscribe(() => {
            fixture.detectChanges();
            const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile[selected="true"]'));
            switch (++pass) {
                case 1:
                    void expect(tileElements.length).toBe(0);
                    tilesInstance.selectedTiles = ['Peach', 'Cherries'];
                    tilesInstance.refresh();
                    break;

                default:
                    done();
                    void expect(tileElements.length).toBe(2);
            }
        });

        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should delete the selected tiles', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture).subscribe(() => {
            fixture.detectChanges();
            const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
            switch (++pass) {
                case 1:
                    void expect(tileElements.length).toBe(12);
                    tilesInstance.deleteSelection();
                    break;

                default:
                    done();
                    void expect(tileElements.length).toBe(10);
            }
        });

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Guava', 'Mango'];

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should change the cursor when mouse is over a tile', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: HTMLElement, type: string, x: number, y: number, buttons = 0): void => {
            const bounds = element.getBoundingClientRect();
            sendMouseEvent(element, type, bounds.left + x, bounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const selectedTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile[selected="true"]'));
                const selectedElement = selectedTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(selectedTile).toBeDefined();

                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                sendMouseEventRelative(selectedElement, 'mousemove', 1, 1);
                return selectedElement;
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('nw-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 60, 1);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('n-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 119, 1);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('ne-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 119, 60);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('e-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 119, 119);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('se-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 60, 119);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('s-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 1, 119);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('sw-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 1, 60);
            }),
            delay(20),
            tap((selectedElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('w-resize');
                sendMouseEventRelative(selectedElement, 'mousemove', 60, 60);
            }),
            delay(20),
            tap(() => {
                void expect(tilesContainerElement.style.cursor).toBe('move');
                sendMouseEventRelative(tilesContainerElement, 'mousemove', 1, 1);
            }),
            delay(20)
        ).subscribe(() => {
            void expect(tilesContainerElement.style.cursor).toBe('');
            done();
        });

        fixture.detectChanges();
        tilesInstance.selectedTiles = ['Cherries'];

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should add and remove tiles', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            tap(() => {
                const tile = new DejaTile('Litchi');
                tile.percentBounds = new Rect(0, 0, 30, 30);
                tile.color = '#C2185B';
                tile.templateModel = {
                    name: 'Litchi',
                    color: '#C2185B'
                };

                tilesInstance.addTiles([tile]);
            }),
            delay(20),
            tap(() => {
                fixture.detectChanges();
                const addedTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Litchi'));
                void expect(addedTile).not.toBeNull();
            }),
            delay(10),
            tap(() => tilesInstance.removeTiles(['Cantaloupe', 'Guava'])),
            delay(20),
            tap(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                void expect(tileElements.length).toBe(11);
            }),
            delay(10),
            tap(() => {
                // Get free place should return Cantaloupe place
                const rect = tilesInstance.getFreePlace(0, 0, 30, 30);
                void expect(rect.left).toBe(60);
                void expect(rect.top).toBe(0);
            })
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should cut, copy and paste the selected tiles', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tiles1DebugElement = fixture.debugElement.query(By.css('deja-tiles#tiles1'));
        const tiles1Instance = tiles1DebugElement.componentInstance as DejaTilesComponent;
        const tiles2DebugElement = fixture.debugElement.query(By.css('deja-tiles#tiles2'));
        const tiles2Instance = tiles2DebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendKeyUp = (element: EventTarget, code: string, ctrlKey: boolean): void => {
            const event = new KeyboardEvent('keyup', {
                code: `Key${code.toUpperCase()}`,
                key: code,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            element.dispatchEvent(event);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            take(1),
            delay(1),
            tap(() => sendKeyUp(tilesContainerElement.ownerDocument, 'X', true)),
            delay(1),
            tap(() => {
                const cuttedElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile[cutted="true"]'));
                void expect(cuttedElements.length).toBe(0);
                const elements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles2 > #tiles > deja-tile'));
                void expect(elements.length).toBe(0);
                tiles1Instance.onFocus();
            }),
            delay(1),
            tap(() => sendKeyUp(tilesContainerElement.ownerDocument, 'X', true)),
            delay(1),
            tap(() => {
                const cuttedElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile[cutted="true"]'));
                void expect(cuttedElements.length).toBe(2);
                tiles1Instance.onBlur();
                tiles2Instance.onFocus();
            }),
            delay(1),
            tap(() => sendKeyUp(tilesContainerElement.ownerDocument, 'V', true)),
            delay(20),
            tap(() => {
                const cuttedElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile[cutted="true"]'));
                void expect(cuttedElements.length).toBe(0);
                tiles2Instance.refresh();
            }),
            delay(1),
            tap(() => {
                const elements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles2 > #tiles > deja-tile'));
                void expect(elements.length).toBe(2);
                tiles2Instance.selectedTiles = tiles2Instance.tiles.map(tile => tile.id);
            }),
            delay(1),
            tap(() => sendKeyUp(tilesContainerElement.ownerDocument, 'C', true)),
            delay(1),
            tap(() => {
                tiles2Instance.onBlur();
                tiles1Instance.onFocus();
            }),
            delay(1),
            tap(() => sendKeyUp(tilesContainerElement.ownerDocument, 'V', true)),
            delay(20),
            tap(() => {
                tiles1Instance.refresh();
                tiles2Instance.refresh();
            }),
            delay(1)
        ).subscribe(() => {
            const elements1 = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
            void expect(elements1.length).toBe(12);
            const elements2 = fixture.debugElement.queryAll(By.css('deja-tiles#tiles2 > #tiles > deja-tile'));
            void expect(elements2.length).toBe(2);
            done();
        });

        fixture.detectChanges();
        tiles1Instance.selectedTiles = ['Guava', 'Mango'];

        void fixture.whenStable().then(() => {
            tiles1Instance.refresh();
            tiles1Instance.onBlur();
        });
    });

    it('should invert two tiles when a tile is drag and dropped into another', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const dragTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Peach'));

                const dragElement = dragTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(dragElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                sendMouseEventRelative(dragElement, 'mousemove', 60, 60);
                fixture.detectChanges();
                return dragElement;
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('move');
                sendMouseEventRelative(dragElement, 'mousedown', 60, 60, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 75, 75, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Drag on another tile
                sendMouseEventRelative(dragElement, 'mousemove', 180, 180, 1);
            }),
            delay(600),
            tap((dragElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(dragElement.ownerDocument, 'mouseup', 180, 180, 0);
            }),
            delay(10),
            tap((dragElement: HTMLElement) => {
                const bounds = dragElement.getBoundingClientRect();
                const invertedElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#ChinesePears'));
                const invertedBounds = (invertedElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();

                void expect(bounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + 120 + padding);
                void expect(invertedBounds.left).toBe(tilesContainerBounds.left + padding);
                void expect(invertedBounds.top).toBe(tilesContainerBounds.top + padding);
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the correct border', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Peach'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 119, 60);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('e-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 119, 60, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 135, 60, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 240, 60, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 240, 60, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + padding);
                void expect(bounds.width).toBe(200 - 2 * padding);
                void expect(bounds.height).toBe(120 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 360 + padding + 120); // 120 la tuile passe dessous
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the left border', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Cantaloupe'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 241, 60);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('w-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 241, 60, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 225, 60, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 0, 60, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 0, 60, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 160 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + padding);
                void expect(bounds.width).toBe(200 - 2 * padding);
                void expect(bounds.height).toBe(120 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 360 + padding + 120); // 120 la tuile passe dessous
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the bottom border', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Banana'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 180, 119);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('s-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 180, 119, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 180, 135, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 180, 150, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 180, 150, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + padding);
                void expect(bounds.width).toBe(120 - 2 * padding);
                void expect(bounds.height).toBe(151 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 400 + padding);
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the top border', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Grapes'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 180, 241);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('n-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 180, 241, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 180, 225, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 180, 200, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 180, 200, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + 199 + padding);
                void expect(bounds.width).toBe(120 - 2 * padding);
                void expect(bounds.height).toBe(161 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 400 + padding);
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the bottom right corner', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Peach'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 119, 119);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('se-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 119, 119, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 129, 135, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 240, 240, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 240, 240, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + padding);
                void expect(bounds.width).toBe(200 - 2 * padding);
                void expect(bounds.height).toBe(200 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 560 + padding);
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the top right corner', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Grapes'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 239, 241);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('ne-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 239, 241, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 255, 231, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 300, 200, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 300, 200, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Pineapple'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + 199 + padding);
                void expect(bounds.width).toBe(181 - 2 * padding);
                void expect(bounds.height).toBe(161 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 120 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 360 + padding + 160); // 160 la tuile passe dessous
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the top left corner', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Lemon'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 241, 241);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('nw-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 241, 241, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 225, 225, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 200, 200, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 200, 200, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Watermelon'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 199 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + 199 + padding);
                void expect(bounds.width).toBe(161 - 2 * padding);
                void expect(bounds.height).toBe(161 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 240 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 360 + padding + 40); // 40 la tuile passe dessous
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should be able to size a tile with the mouse from the bottom left corner', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));
                const sizeTile = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Lemon'));

                const sizeElement = sizeTile.nativeElement as HTMLElement;

                void expect(tileElements.length).toBe(12);
                void expect(sizeElement).toBeDefined();
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);

                return sizeElement;
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                sendMouseEventRelative(sizeElement, 'mousemove', 241, 359);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                void expect(tilesContainerElement.style.cursor).toBe('sw-resize');
                // Start size
                sendMouseEventRelative(sizeElement, 'mousedown', 241, 359, 1);
            }),
            delay(20),
            tap((dragElement: HTMLElement) => {
                // Start drag
                sendMouseEventRelative(dragElement, 'mousemove', 231, 375, 1);
            }),
            delay(20),
            tap((sizeElement: HTMLElement) => {
                // Size on left
                sendMouseEventRelative(sizeElement, 'mousemove', 200, 400, 1);
            }),
            delay(600),
            tap((sizeElement: HTMLElement) => {
                // Drop
                sendMouseEventRelative(sizeElement.ownerDocument, 'mouseup', 200, 400, 0);
            }),
            tap((sizeElement: HTMLElement) => {
                const bounds = sizeElement.getBoundingClientRect();
                const testElement = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles > deja-tile#Watermelon'));
                const testBounds = (testElement.nativeElement as HTMLElement).getBoundingClientRect();
                const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
                void expect(bounds.left).toBe(tilesContainerBounds.left + 199 + padding);
                void expect(bounds.top).toBe(tilesContainerBounds.top + 240 + padding);
                void expect(bounds.width).toBe(161 - 2 * padding);
                void expect(bounds.height).toBe(161 - 2 * padding);
                void expect(testBounds.left).toBe(tilesContainerBounds.left + 240 + padding);
                void expect(testBounds.top).toBe(tilesContainerBounds.top + 400 + padding);
            }),
            delay(20)
        ).subscribe(() => {
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });

    it('should select by drag and drop with the mouse', done => {
        const fixture = TestBed.createComponent(DejaTilesContainerComponent);
        const tilesDebugElement = fixture.debugElement.query(By.directive(DejaTilesComponent));
        const tilesInstance = tilesDebugElement.componentInstance as DejaTilesComponent;
        const tilesContainer = fixture.debugElement.query(By.css('deja-tiles#tiles1 > #tiles'));
        const tilesContainerElement = tilesContainer.nativeElement as HTMLElement;

        const sendMouseEventRelative = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const tilesContainerBounds = tilesContainerElement.getBoundingClientRect();
            sendMouseEvent(element, type, tilesContainerBounds.left + x, tilesContainerBounds.top + y, buttons);
            fixture.detectChanges();
        };

        observeDom$(fixture).pipe(
            debounceTime(10),
            take(1),
            map(() => {
                fixture.detectChanges();
                const tileElements = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile'));

                void expect(tileElements.length).toBe(12);
                sendMouseEventRelative(tilesContainerElement, 'mouseenter', 0, 0);
            }),
            delay(20),
            tap(() => {
                sendMouseEventRelative(tilesContainerElement, 'mousemove', 365, 20);
            }),
            delay(20),
            tap(() => {
                void expect(tilesContainerElement.style.cursor).toBe('');
                // Start selection
                sendMouseEventRelative(tilesContainerElement, 'mousedown', 365, 20, 1);
            }),
            delay(20),
            tap(() => {
                // Select
                sendMouseEventRelative(tilesContainerElement, 'mousemove', 20, 230, 1);
            }),
            delay(20),
            tap(() => {
                // Drop
                sendMouseEventRelative(tilesContainerElement.ownerDocument, 'mouseup', 20, 230, 0);
            })
        ).subscribe(() => {
            const selectedTiles = fixture.debugElement.queryAll(By.css('deja-tiles#tiles1 > #tiles > deja-tile[selected="true"]'));
            void expect(selectedTiles.length).toBe(6);
            done();
        });

        fixture.detectChanges();

        void fixture.whenStable().then(() => {
            tilesInstance.refresh();
        });
    });
});
