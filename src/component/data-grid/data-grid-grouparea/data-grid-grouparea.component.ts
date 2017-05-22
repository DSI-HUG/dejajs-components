/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { DejaClipboardService } from '../../../common/core/clipboard/clipboard.service';
import { IDejaDragEvent } from '../../dragdrop/draggable.directive';
import { IDejaDropEvent } from '../../dragdrop/droppable.directive';
import { IDejaGridColumn } from '../data-grid-column/data-grid-column';
import { IDejaGridGroupsEvent } from './data-grid-group';

/** Zone de regroupement des colonnes dans laquelle les colonnes peuvent être drag and droppée */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-grid-grouparea',
    styleUrls: ['./data-grid-grouparea.component.scss'],
    templateUrl: './data-grid-grouparea.component.html',
})
export class DejaGridGroupAreaComponent {
    /** Cet évenement est levé lorsque le model de groupe est modifié */
    @Output() public groupsChanged = new EventEmitter<IDejaGridGroupsEvent>();
    /** Cet évenement est levé lorsqu'un group est supprimé du model */
    @Output() public groupRemoved = new EventEmitter<IDejaGridGroupsEvent>();
    private _groups = [] as IDejaGridColumn[];
    private columnGroupKey = 'deja-grid-column';
    private groupGroupKey = 'deja-grid-group';

    /** Revoie le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant */
    public get groups() {
        return this._groups;
    }

    @Input()
    /** Définit le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant */
    public set groups(columns: IDejaGridColumn[]) {
        this._groups = columns || [];
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() private clipboardService: DejaClipboardService) { }

    protected getDragContext(group: IDejaGridColumn) {
        if (!this.clipboardService) {
            return null;
        }

        // console.log(`getDragContext ` + group.column.name + ' ' + Date.now();
        return {
            dragendcallback: (event: IDejaDragEvent) => {
                if (!event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    return;
                }
            },
            dragstartcallback: (event: IDejaDragEvent) => {
                event.dragInfo[this.groupGroupKey] = group;
            },
        };
    }

    protected getDropContext() {
        if (!this.clipboardService) {
            return null;
        }

        const dragcallback = (event: IDejaDropEvent) => {
            if (event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;
                if (!this.groups.find((column) => column === sourceColumn)) {
                    event.preventDefault();
                }

            } else if (event.dragInfo.hasOwnProperty(this.groupGroupKey)) {
                const targetElement = this.getGroupElementFromHTMLElement(event.target as HTMLElement);
                const targetIndex = targetElement && +targetElement.getAttribute('index');
                if (targetIndex === undefined) {
                    return;
                }

                const targetBounds = targetElement.getBoundingClientRect();

                const sourceColumn = event.dragInfo[this.groupGroupKey] as IDejaGridColumn;
                const sourceIndex = this.groups.findIndex((column) => column === sourceColumn);

                // Dead zones
                if (sourceIndex === targetIndex) {
                    event.preventDefault();
                    return;
                } else if (targetIndex === sourceIndex + 1) {
                    if (event.x <= targetBounds.left + targetBounds.width / 2) {
                        event.preventDefault();
                        return;
                    }
                } else if (targetIndex === sourceIndex - 1) {
                    if (event.x >= targetBounds.left + targetBounds.width / 2) {
                        event.preventDefault();
                        return;
                    }
                }

                this.groups.splice(sourceIndex, 1);
                this.groups.splice(targetIndex, 0, sourceColumn);

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
                const raiseEvent = (group: IDejaGridColumn) => {
                    const e = {
                        column: group,
                        columns: this.groups,
                        originalEvent: event,
                    } as IDejaGridGroupsEvent;

                    this.groupsChanged.emit(e);
                    event.preventDefault();
                };

                if (event.dragInfo.hasOwnProperty(this.columnGroupKey)) {
                    const sourceColumn = event.dragInfo[this.columnGroupKey] as IDejaGridColumn;

                    const targetElement = this.getGroupElementFromHTMLElement(event.target as HTMLElement);
                    const targetIndex = targetElement && +targetElement.getAttribute('index');

                    if (targetIndex !== undefined) {
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

                    raiseEvent(sourceColumn);

                } else if (event.dragInfo.hasOwnProperty(this.groupGroupKey)) {
                    const sourceColumn = event.dragInfo[this.groupGroupKey] as IDejaGridColumn;
                    raiseEvent(sourceColumn);
                }

                this.changeDetectorRef.markForCheck();
            },
        };
    }

    protected removeGroup(event: Event, index: number) {
        const column = this.groups.splice(index, 1);

        const e = {
            column: column[0],
            columns: this.groups,
            originalEvent: event,
        } as IDejaGridGroupsEvent;

        this.groupRemoved.emit(e);
        event.stopPropagation();
        return false;
    }

    protected getGroupColumnFromHTMLElement(element: HTMLElement): IDejaGridColumn {
        const groupElement = this.getGroupElementFromHTMLElement(element);
        const groupName = groupElement && groupElement.getAttribute('groupname');
        return groupName && this.groups.find((column) => column.name === groupName);
    }

    private getGroupElementFromHTMLElement(element: HTMLElement): HTMLElement {
        let parentElement = element;

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
