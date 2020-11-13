/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { IDejaChipsComponentCloseEvent } from '@deja-js/component/chips';
import { IDejaDragContext, IDejaDragEvent, IDejaDropEvent } from '@deja-js/component/dragdrop';
import { IDejaMouseDroppableContext } from '@deja-js/component/mouse-dragdrop';
import { DejaClipboardService } from '@deja-js/core';

import { IDejaGridColumn } from '../data-grid-column/data-grid-column';
import { IDejaGridGroupsEvent } from './data-grid-group';

/** Zone de regroupement des colonnes dans laquelle les colonnes peuvent être drag and droppée */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-grid-grouparea',
    styleUrls: ['./data-grid-grouparea.component.scss'],
    templateUrl: './data-grid-grouparea.component.html'
})
export class DejaGridGroupAreaComponent {
    /** Cet évenement est levé lorsque le model de groupe est modifié */
    @Output() public readonly groupsChanged = new EventEmitter<IDejaGridGroupsEvent>();
    /** Cet évenement est levé lorsqu'un group est supprimé du model */
    @Output() public readonly groupRemoved = new EventEmitter<IDejaChipsComponentCloseEvent>();
    private _groups = [] as IDejaGridColumn[];
    private columnGroupKey = 'deja-grid-column';
    private groupGroupKey = 'deja-grid-group';

    /** Revoie le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant */
    public get groups(): IDejaGridColumn[] {
        return this._groups;
    }

    @Input()
    /** Définit le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant */
    public set groups(columns: IDejaGridColumn[]) {
        this._groups = columns || [];
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() private clipboardService: DejaClipboardService) { }

    public getDragContext(group: IDejaGridColumn): IDejaDragContext {
        if (!this.clipboardService) {
            return null;
        }

        // console.log(`getDragContext ` + group.name + ' ' + Date.now());
        return {
            dragendcallback: (event: IDejaDragEvent) => {
                // eslint-disable-next-line no-prototype-builtins
                if (!event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    return;
                }
            },
            dragstartcallback: (event: IDejaDragEvent) => {
                event.dragInfo[this.groupGroupKey] = group;
            }
        } as IDejaDragContext;
    }

    public getDropContext(): IDejaMouseDroppableContext {
        if (!this.clipboardService) {
            return null;
        }

        const raiseEvent = (evt: Event, group: IDejaGridColumn) => {
            const e = {
                column: group,
                columns: this.groups,
                originalEvent: evt
            } as IDejaGridGroupsEvent;

            this.groupsChanged.emit(e);
            evt.preventDefault();
        };

        const dragcallback = (event: IDejaDropEvent): void => {
            // eslint-disable-next-line no-prototype-builtins
            if (event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
                if (!this.groups.find(column => column === sourceColumn)) {
                    event.preventDefault();
                }

            // eslint-disable-next-line no-prototype-builtins
            } else if (event.dragInfo.hasOwnProperty(this.groupGroupKey)) {
                const targetElement = this.getGroupElementFromHtmlElement(event.target as HTMLElement);
                const attrIndex = (targetElement?.getAttribute('index')) || null;
                const targetIndex = attrIndex !== null ? +attrIndex : null;
                if (targetIndex === null) {
                    return;
                }

                const sourceColumn = event.dragInfo[this.groupGroupKey] as IDejaGridColumn;
                const sourceIndex = this.groups.findIndex(column => column === sourceColumn);

                // Dead zones
                if (sourceIndex === targetIndex) {
                    event.preventDefault();
                    return;
                }

                this.groups.splice(sourceIndex, 1);
                this.groups.splice(targetIndex, 0, sourceColumn);

                raiseEvent(event, sourceColumn);

                this.changeDetectorRef.markForCheck();

                event.preventDefault();

            } else {
                return;
            }
        };

        return {
            dragentercallback: dragcallback,
            dragovercallback: dragcallback,
            dropcallback: (event: IDejaDropEvent) => {
                // eslint-disable-next-line no-prototype-builtins
                if (event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;

                    const targetElement = this.getGroupElementFromHtmlElement(event.target as HTMLElement);
                    const attrIndex = (targetElement?.getAttribute('index')) || null;
                    const targetIndex = attrIndex !== null ? +attrIndex : null;

                    if (targetIndex !== null) {
                        const targetBounds = targetElement.getBoundingClientRect();
                        if (event.x <= targetBounds.left + targetBounds.width / 2) {
                            this.groups.splice(targetIndex, 0, sourceColumn);
                        } else if (targetIndex < this.groups.length - 1) {
                            this.groups.splice(targetIndex + 1, 0, sourceColumn);
                        } else {
                            this.groups.push(sourceColumn);
                        }
                    } else {
                        this.groups.push(sourceColumn);
                    }

                    raiseEvent(event, sourceColumn);

                // eslint-disable-next-line no-prototype-builtins
                } else if (event.dragInfo.hasOwnProperty(this.groupGroupKey)) {
                    const sourceColumn = event.dragInfo[this.groupGroupKey] as IDejaGridColumn;
                    raiseEvent(event, sourceColumn);
                }

                this.changeDetectorRef.markForCheck();
            }
        } as IDejaMouseDroppableContext;
    }

    public removeGroup(event: IDejaChipsComponentCloseEvent): boolean {
        this.groupRemoved.emit(event);
        event.stopPropagation();
        return false;
    }

    private getGroupElementFromHtmlElement(element: HTMLElement): HTMLElement {
        let parentElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (parentElement && !parentElement.hasAttribute('groupname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }

        if (!parentElement) {
            return undefined;
        }

        return parentElement;
    }
}
