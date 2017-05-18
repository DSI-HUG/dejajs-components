/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Rect } from '../../common/core/graphics';
import { IDejaTile } from './tile.interface';

export class DejaTile implements IDejaTile {
    private static currentId = 0;

    public cutted$ = new BehaviorSubject<boolean>(false);
    public dragging$ = new BehaviorSubject<boolean>(false);
    public dropping$ = new BehaviorSubject<boolean>(false);
    public pressed$ = new BehaviorSubject<boolean>(false);
    public selected$ = new BehaviorSubject<boolean>(false);
    public expanded$ = new BehaviorSubject<boolean>(false);
    public hidden$ = new Subject<boolean>();
    public pending$ = new BehaviorSubject<boolean>(false);
    public deleted$ = new Subject();
    public pixelBounds$ = new Subject<Rect>();
    public isTemporary = false;
    public fading = false;

    private _id: string;
    private _isCutted = false;
    private _isDragging = false;
    private _isDropping = false;
    private _isPressed = false;
    private _isSelected = false;
    private _isExpanded = false;
    private _isHidden = false;
    private _isPending = false;
    private _pixelBounds: Rect;
    private _percentBounds: Rect;
    private _model: IDejaTile;
    private _color: string;

    constructor(private tile: IDejaTile) {
        this._model = tile;
        this._id = tile.id;
        this._percentBounds = tile.bounds;
        this._color = tile.color;
        if (tile.effects) {
            this.isCutted = tile.effects.cutted;
            this.isSelected = tile.effects.selected;
            this._isPending = tile.effects.pending;
            this.fading = tile.effects.fading;
        }
        if (!this._id) {
            this._id = '#' + DejaTile.currentId++;
        }
    }

    public get model() {
        return this._model;
    }

    public get color() {
        return this._color;
    }

    public set pixelBounds(value: Rect) {
        if (!Rect.equals(this._pixelBounds, value)) {
            this._pixelBounds = value;
            this.pixelBounds$.next(value);
        }
    }

    public get pixelBounds() {
        return this._pixelBounds;
    }

    public set isCutted(value: boolean) {
        if (this._isCutted !== value) {
            this._isCutted = value;
            this.cutted$.next(value);
        }
    }

    public get isCutted() {
        return this._isCutted;
    }

    public set isDragging(value: boolean) {
        if (this._isDragging !== value) {
            this._isDragging = value;
            this.dragging$.next(value);
        }
    }

    public get isDragging() {
        return this._isDragging;
    }

    public set isDropping(value: boolean) {
        if (this._isDropping !== value) {
            this._isDropping = value;
            this.dropping$.next(value);
        }
    }

    public get isDropping() {
        return this._isDropping;
    }

    public set isPressed(value: boolean) {
        if (this._isPressed !== value) {
            this._isPressed = value;
            this.pressed$.next(value);
        }
    }

    public get isPressed() {
        return this._isPressed;
    }

    public set isSelected(value: boolean) {
        if (this._isSelected !== value) {
            this._isSelected = value;
            this.selected$.next(value);
        }
    }

    public get isSelected() {
        return this._isSelected;
    }

    public set isExpanded(value: boolean) {
        if (this._isExpanded !== value) {
            this._isExpanded = value;
            this.expanded$.next(value);
        }
    }

    public get isExpanded() {
        return this._isExpanded;
    }

    public set isHidden(value: boolean) {
        if (this._isHidden !== value) {
            this._isHidden = value;
            this.hidden$.next(value);
        }
    }

    public get isHidden() {
        return this._isHidden;
    }

    public set isPending(value: boolean) {
        if (this._isPending !== value) {
            this._isPending = value;
            this.pending$.next(value);
        }
    }

    public get isPending() {
        return this._isPending;
    }

    public get id() {
        return this._id;
    }

    public get type() {
        return this.tile.type;
    }

    public set percentBounds(bounds: Rect) {
        this._percentBounds = bounds;
    }

    public get percentBounds() {
        return this._percentBounds;
    }

    public get templateModel() {
        return this.tile.templateModel;
    }

    public makeId() {
        this._id = '#' + DejaTile.currentId++;
    }

    public refreshBounds() {
        this.percentBounds = this.model.bounds;
    }

    public equalsTo(tile: IDejaTile) {
        if (this.model.id) {
            return this.model.id === tile.id;
        } else {
            return this.model === tile;
        }
    }

    public clone() {
        return new DejaTile(this.toTileModel());
    }

    public delete() {
        this.deleted$.next();
    }

    public toTileModel() {
        return {
            id: this.id,
            type: this.type,
            bounds: this.percentBounds,
            color: this._color,
            templateModel: this.templateModel,
            effects: {
                pending: this.isPending || undefined,
                cutted: this.isCutted || undefined,
                selected: this.isSelected || undefined,
            }
        } as IDejaTile;
    }
}
