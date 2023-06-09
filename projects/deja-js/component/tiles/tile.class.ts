/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Rect } from '@deja-js/component/core/graphics';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export class DejaTile {
    protected static CURRENT_ID = 0;

    public cutted$ = new BehaviorSubject<boolean>(false);
    public dragging$ = new BehaviorSubject<boolean>(false);
    public dropping$ = new BehaviorSubject<boolean>(false);
    public pressed$ = new BehaviorSubject<boolean>(false);
    public selected$ = new BehaviorSubject<boolean>(false);
    public hidden$ = new ReplaySubject<boolean>(1);
    public pixelBounds$ = new BehaviorSubject<Rect>(null);
    public deleted$ = new Subject<void>();
    public refresh$ = new Subject<void>();
    public isTemporary = false;

    private _id: string;
    private _color: string;
    private _templateModel: unknown;
    private _isDragging = false;
    private _isDropping = false;
    private _isPressed = false;
    private _isHidden = false;
    private _pixelBounds: Rect;
    private _selected: boolean;
    private _cutted: boolean;
    private _pending: boolean;
    private _fading: boolean;
    private _percentBounds: Rect;
    private _trackBy: unknown;

    public constructor(id?: string) {
        this._id = id || `#${DejaTile.CURRENT_ID++}`;
    }

    public get idealBounds(): Rect {
        return new Rect(0, 0, 15, 15);
    }

    public set pixelBounds(value: Rect) {
        if (!Rect.equals(this._pixelBounds, value)) {
            this._pixelBounds = value;
            this.pixelBounds$.next(value);
        }
    }

    public get pixelBounds(): Rect {
        return this._pixelBounds;
    }

    public set percentBounds(value: Rect) {
        this._percentBounds = value;
    }

    public get percentBounds(): Rect {
        return this._percentBounds;
    }

    public set templateModel(value: unknown) {
        this._templateModel = value;
    }

    public get templateModel(): unknown {
        return this._templateModel;
    }

    public get id(): string {
        return this._id;
    }

    public set trackBy(value: unknown) {
        this._trackBy = value;
    }

    public get trackBy(): unknown {
        return this._trackBy;
    }

    public set isCutted(value: boolean) {
        if (this._cutted !== value) {
            this._cutted = value;
            this.cutted$.next(value);
        }
    }

    public get isCutted(): boolean {
        return this._cutted;
    }

    public set color(value: string) {
        this._color = value;
    }

    public get color(): string {
        return this._color;
    }

    public set isDragging(value: boolean) {
        if (this._isDragging !== value) {
            this._isDragging = value;
            this.dragging$.next(value);
        }
    }

    public get isDragging(): boolean {
        return this._isDragging;
    }

    public set isDropping(value: boolean) {
        if (this._isDropping !== value) {
            this._isDropping = value;
            this.dropping$.next(value);
        }
    }

    public get isDropping(): boolean {
        return this._isDropping;
    }

    public set isPressed(value: boolean) {
        if (this._isPressed !== value) {
            this._isPressed = value;
            this.pressed$.next(value);
        }
    }

    public get isPressed(): boolean {
        return this._isPressed;
    }

    public set isSelected(value: boolean) {
        if (this._selected !== value) {
            this._selected = value;
            this.selected$.next(value);
        }
    }

    public get isSelected(): boolean {
        return this._selected;
    }

    public set isHidden(value: boolean) {
        if (this._isHidden !== value) {
            this._isHidden = value;
            this.hidden$.next(value);
        }
    }

    public get isHidden(): boolean {
        return this._isHidden;
    }

    public set isPending(value: boolean) {
        this._pending = value;
    }

    public get isPending(): boolean {
        return this._pending;
    }

    public get fading(): boolean {
        return this._fading;
    }

    public set fading(value: boolean) {
        this._fading = value;
    }

    public makeId(): void {
        this._id = `#${DejaTile.CURRENT_ID++}`;
    }

    public equalsTo(tile: DejaTile): boolean {
        if (this._templateModel) {
            return this._templateModel === tile._templateModel;
        } else {
            return this._id === tile._id;
        }
    }

    public clone(tile?: DejaTile): DejaTile {
        if (!tile) {
            tile = new DejaTile(this.id);
        }

        tile._percentBounds = this.percentBounds;
        tile._color = this.color;
        tile._templateModel = this.templateModel;
        tile._cutted = this._cutted;
        tile._selected = this._selected;
        tile._pending = this._pending;
        tile._fading = this._fading;
        return tile;
    }

    public delete(): void {
        this.deleted$.next();
    }

    public refresh(): void {
        this.refresh$.next();
    }
}
