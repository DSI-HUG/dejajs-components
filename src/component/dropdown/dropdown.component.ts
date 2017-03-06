/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
import { KeyCodes } from '../../common/core/keycodes.enum';

/** Place un conteneur déroulant */
@Component({
    selector: 'deja-dropdown',
    styleUrls: [
        './dropdown.component.scss',
    ],
    template: `<ng-content></ng-content>`,
})
export class DejaDropDownComponent implements AfterViewInit {
    /** Déclenché lorsque le conteneur déroulant disparait */
    @Output() public hide = new EventEmitter();

    /** Renvoie ou définit l'élement du DOM sur lequel le conteneur déroulant devra s'aligner */
    @Input() public ownerElement: ElementRef | HTMLElement;

    /** Marge en pixel à gauche entre le conteneur déroulant et l'élement propriétaire */
    @Input() public ownerLeftMargin = 0;

    /** Marge en pixel en haut entre le conteneur déroulant et l'élement propriétaire */
    @Input() public ownerTopMargin = 0;

    /** Marge en pixel à droite entre le conteneur déroulant et l'élement propriétaire */
    @Input() public ownerRightMargin = 0;

    /** Marge en pixel en bas entre le conteneur déroulant et l'élement propriétaire */
    @Input() public ownerBottomMargin = 0;

    /** Element dans lequel le conteneur déroulant doit s'afficher (le conteneur déroulant ne peut dépasser de l'élement spécifié ici) */
    @Input() public containerElement: ElementRef | HTMLElement;

    /** Renvoie ou définit une valeur indiquant si le conteneur déroulant peut s'afficher par dessus son propriétaire */
    @Input() public avoidOnwerOverflow = true;

    /** Renvoie ou définit une valeur indiquant si le conteneur déroulant se ferme sur pression de la touche Echap */
    @Input()
    public set closeOnEscape(value: true) {
        this.closeOnEscape$.next(value);
    }

    private show$ = new Subject<boolean>();
    private closeOnEscape$ = new BehaviorSubject<boolean>(true);

    private ownerAlignents = {
        bottom: false,
        left: false,
        right: false,
        top: false,
    };

    private dropdownAlignments = {
        bottom: false,
        left: false,
        right: false,
        top: false,
    };

    /** Point de référence du propriétaire pour l'alignement du conteneur déroulant. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input() set ownerAlignment(value: string) {
        this.ownerAlignents = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };

        if (value) {
            value.split(/\s+/).map((align) => this.ownerAlignents[align] = true);
        }
    }

    /** Ancre d'alignement du conteneur déroulant. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input() set dropdownAlignment(value: string) {
        this.dropdownAlignments = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };

        if (value) {
            value.split(/\s+/).map((align) => this.dropdownAlignments[align] = true);
        }
    }

    public get dropdownElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    constructor(private elementRef: ElementRef) {
        const element = elementRef.nativeElement as HTMLElement;

        const setDropDownPosition = (dropDownPosition) => {
            const { left, top, width, height, valign, halign } = dropDownPosition;
            element.style.left = left !== null ? `${left}px` : '';
            element.style.top = top !== null ? `${top}px` : '';
            element.style.width = width !== null ? `${width}px` : '';
            element.style.height = height !== null ? `${height}px` : '';
            if (valign) {
                element.setAttribute('valign', valign);
            } else {
                element.removeAttribute('valign');
            }
            if (halign) {
                element.setAttribute('halign', halign);
            } else {
                element.removeAttribute('halign');
    }
        };

        const unRregisterEscape$ = Observable.from(this.closeOnEscape$)
            .filter((value) => !value);

        const registerEscape$ = Observable.from(this.closeOnEscape$)
            .filter((value) => value);

        const keyUp$ = Observable.fromEvent(element.ownerDocument, 'keydown') as Observable<KeyboardEvent>;

        Observable.combineLatest(keyUp$, registerEscape$)
            .takeUntil(unRregisterEscape$)
            .filter(([event]) => event.keyCode === KeyCodes.Escape)
            .subscribe(() => this.hide.emit());

        Observable.from(this.show$)
            .do(() => setDropDownPosition({
                left: -1000,
                top: -1000,
                width: null,
                height: null,
                valign: null,
                halign: null,
            } as IDropDownPosition))
            .debounceTime(100)
            .subscribe((value) => {
                if (value) {
            // Calc owner screen position
                    const ownerElement = (this.ownerElement as ElementRef).nativeElement || this.ownerElement;
                    const ownerRect = ownerElement.getBoundingClientRect();
                    const ownerBounds = Rect.fromLTRB(ownerRect.left + +this.ownerLeftMargin, ownerRect.top + +this.ownerTopMargin, ownerRect.right - +this.ownerRightMargin, ownerRect.bottom - +this.ownerBottomMargin);

            // Calc container screen position
                    const body = this.elementRef.nativeElement.ownerDocument.body;
                    const bodyRect = body.getBoundingClientRect();
                    const containerElement = this.containerElement && (this.containerElement as ElementRef).nativeElement || this.containerElement;
                    const containerRect = !containerElement ? bodyRect : containerElement.getBoundingClientRect();

            // Calc min max relative to screen
                    const minLeft = Math.max(bodyRect.left, containerRect.left);
                    const maxRight = Math.min(bodyRect.right, containerRect.right);
                    const minTop = Math.max(bodyRect.top, containerRect.top);
                    const maxBottom = Math.min(bodyRect.bottom, containerRect.bottom);

            // Calc dropdown screen position                
                    const dropdownContElement = this.elementRef.nativeElement as HTMLElement;
                    const dropdownRect = dropdownContElement.getBoundingClientRect();
            let left: number;
            let top: number;
            let width = dropdownRect.width;
            let height = dropdownRect.height;

            // Calc container absolute alignment
            if (this.ownerAlignents.left) {
                if (this.dropdownAlignments.left) {
                    left = ownerBounds.left;
                } else if (this.dropdownAlignments.right) {
                    left = ownerBounds.left - width;
                } else {
                    left = ownerBounds.left - width / 2;
                }
            }

            if (this.ownerAlignents.top) {
                if (this.dropdownAlignments.top) {
                    top = ownerBounds.top;
                } else if (this.dropdownAlignments.bottom) {
                    top = ownerBounds.top - height;
                } else {
                    top = ownerBounds.top + ownerBounds.height / 2 - height / 2;
                }
            }

            if (this.ownerAlignents.right) {
                if (this.ownerAlignents.left) {
                    width = ownerBounds.width;
                } else if (this.dropdownAlignments.left) {
                    left = ownerBounds.right;
                } else if (this.dropdownAlignments.right) {
                    left = ownerBounds.right - width;
                } else {
                    left = ownerBounds.right - width / 2;
                }
            }

            if (this.ownerAlignents.bottom) {
                if (this.ownerAlignents.top) {
                    height = ownerBounds.height;
                } else if (this.dropdownAlignments.top) {
                    top = ownerBounds.bottom;
                } else if (this.dropdownAlignments.bottom) {
                    top = ownerBounds.bottom - height;
                } else {
                    top = ownerBounds.bottom - height / 2;
                }
            }

            if (top === undefined) {
                top = ownerBounds.top + ownerBounds.height / 2 - height / 2;
            }

            if (left === undefined) {
                left = ownerBounds.left + ownerBounds.width / 2 - width / 2;
            }

                    const dropdownBounds = new Rect(left, top, width, height);

            // Ensure container bounds
            if (minLeft > dropdownBounds.left) {
                dropdownBounds.left = minLeft;
            }

            if (minTop > dropdownBounds.top) {
                dropdownBounds.top = minTop;
            }

            if (dropdownBounds.right > maxRight && this.dropdownAlignments.right) {
                dropdownBounds.left = Math.max(maxRight - dropdownBounds.width, minLeft);
            }

            if (dropdownBounds.bottom > maxBottom && this.dropdownAlignments.bottom) {
                dropdownBounds.top = Math.max(maxBottom - dropdownBounds.height, minTop);
            }

            if (dropdownBounds.intersectWith(ownerBounds) && this.avoidOnwerOverflow) {
                // Try a better aligment
                if (dropdownBounds.left < ownerBounds.right && dropdownBounds.right > ownerBounds.left) {
                            const overflowTop = dropdownBounds.bottom - ownerBounds.top;
                            const overflowBottom = ownerBounds.bottom - dropdownBounds.top;
                    if (overflowTop > 0 && overflowBottom > 0) {
                                const topHeight = Math.min(ownerBounds.top - minTop, dropdownBounds.height);
                                const bottomHeight = Math.min(maxBottom - ownerBounds.bottom, dropdownBounds.height);
                        if (overflowBottom > 0 && bottomHeight < topHeight) {
                            dropdownBounds.top = ownerBounds.top - topHeight;
                            if (dropdownBounds.height > topHeight) {
                                dropdownBounds.height = topHeight;
                            }
                        } else {
                            dropdownBounds.top = ownerBounds.bottom;
                            if (dropdownBounds.height > bottomHeight) {
                                dropdownBounds.height = bottomHeight;
                            }
                        }
                    }
                }

                if (dropdownBounds.top < ownerBounds.bottom && dropdownBounds.bottom > ownerBounds.top) {
                            const overflowLeft = dropdownBounds.right - ownerBounds.left;
                            const overflowRight = ownerBounds.right - dropdownBounds.left;
                    if (overflowLeft > 0 && overflowRight > 0) {
                                const leftWidth = Math.min(ownerBounds.left - minLeft, dropdownBounds.width);
                                const rightWidth = Math.min(maxRight - ownerBounds.right, dropdownBounds.width);
                        if (overflowRight > 0 && rightWidth < leftWidth) {
                            dropdownBounds.left = ownerBounds.left - leftWidth;
                            if (dropdownBounds.width > leftWidth) {
                                dropdownBounds.width = leftWidth;
                            }
                        } else {
                            dropdownBounds.left = ownerBounds.right;
                            if (dropdownBounds.width > rightWidth) {
                                dropdownBounds.width = rightWidth;
                            }
                        }
                    }
                }
            }

            // Ensure container bounds
            if (minLeft > dropdownBounds.left) {
                // Recalc new position
                dropdownBounds.left = minLeft;
                if (this.dropdownAlignments.right) {
                    // Right blocked
                    if (this.ownerAlignents.left) {
                        dropdownBounds.width = Math.max(5, ownerBounds.left - minLeft);
                    } else if (this.ownerAlignents.right) {
                        dropdownBounds.width = ownerBounds.right - minLeft;
                    }
                }
            }

            if (minTop > dropdownBounds.top) {
                dropdownBounds.top = minTop;
                if (this.dropdownAlignments.bottom) {
                    // Bottom blocked
                    if (this.ownerAlignents.top) {
                        dropdownBounds.height = Math.max(5, ownerBounds.top - minTop);
                    } else if (this.ownerAlignents.bottom) {
                        dropdownBounds.height = ownerBounds.bottom - minTop;
                    }
                }
            }

            if (dropdownBounds.right > maxRight) {
                if (this.dropdownAlignments.left) {
                    // Left blocked
                    dropdownBounds.width = maxRight - dropdownBounds.left;
                } else if (maxRight - dropdownBounds.width < minLeft) {
                    // Limited width
                    dropdownBounds.left = minLeft;
                    dropdownBounds.width = maxRight - minLeft;
                } else {
                    dropdownBounds.left = maxRight - dropdownBounds.width;
                }
            }

            if (dropdownBounds.bottom > maxBottom) {
                if (this.dropdownAlignments.top) {
                    // Top blocked
                    dropdownBounds.height = maxBottom - dropdownBounds.top;
                } else if (maxBottom - dropdownBounds.height < minTop) {
                    // Limited height
                    dropdownBounds.top = minTop;
                    dropdownBounds.height = maxBottom - minTop;
                } else {
                    dropdownBounds.top = maxBottom - dropdownBounds.height;
                }
            }

                    const dropDownPosition = {} as IDropDownPosition;

            if (dropdownBounds.top >= ownerBounds.bottom) {
                        dropDownPosition.valign = 'bottom';
            } else if (dropdownBounds.bottom <= ownerBounds.top) {
                        dropDownPosition.valign = 'top';
            } else {
                        dropDownPosition.valign = 'center';
            }

            if (dropdownBounds.left >= ownerBounds.right) {
                        dropDownPosition.halign = 'right';
            } else if (dropdownBounds.right <= ownerBounds.left) {
                        dropDownPosition.halign = 'left';
            } else {
                        dropDownPosition.halign = 'center';
            }

            // Convert to relative
                    const parentElement = dropdownContElement.offsetParent as HTMLElement;
                    const parentRect = parentElement && parentElement.getBoundingClientRect();
                    const relativeBounds = (parentRect && dropdownBounds.offset(- parentRect.left, - parentRect.top)) || dropdownBounds;

                    dropDownPosition.left = relativeBounds.left;
                    dropDownPosition.top = relativeBounds.top;
                    dropDownPosition.width = relativeBounds.width;
                    dropDownPosition.height = relativeBounds.height;

                    setDropDownPosition(dropDownPosition);
                } else {
                    // Hide
    }
            });
            }

    public ngAfterViewInit() {
        this.show$.next(true);
                        }

    public show() {
        this.show$.next(true);
        }
    }

interface IDropDownPosition {
    left: number;
    top: number;
    width: number;
    height: number;
    valign: string;
    halign: string;
}
