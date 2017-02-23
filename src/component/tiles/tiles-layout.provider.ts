/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { clearTimeout, setTimeout } from 'timers';
import { Directions, Position, Rect, Size } from '../../common/core/graphics';
import { IDejaTile, IDejaTileList } from './index';

interface ILayoutInfo {
    id: string;
    bounds: Rect;
}

interface ILayoutInfos {
    infos: { [id: string]: ILayoutInfo };
    height: number;
    targetBounds: Rect;
    validBounds: Rect;
}

export class DejaTilesLayoutProvider {
    private targetBounds = {} as Rect;
    private destination = {} as Rect;
    private lastTargetBounds: Rect;
    private moveTimer: NodeJS.Timer;
    private moveDestination: Rect;
    private originalLayout: ILayoutInfos;
    private validLayout: ILayoutInfos;
    private beforeSizeLayout: ILayoutInfos;
    private hundredPercentWidth: number;
    private cursor: string;
    private width: number;
    private height: number;
    private tileMinHeight = 30;
    private tileMinWidth = 30;
    private maxWidth = 100;
    private dragPageOffset = {} as Position;
    private dragOriginalPosition = {} as Position;
    private dragRelativePosition: { [id: string]: Position };
    private expandedTile: IDejaTile;

    private tiles = [] as IDejaTileList;

    constructor(maxWidth: string, maxHeight: string, tileMinWidth: string, tileMaxWidth: string, tileMinHeight: string, tileMaxHeight: string, private sizeChanged: (width: number, height: number) => void) {
        let regexp = /(\d+)(.*)/i;

        let extractValueAndUnit = (prop: string, value: string) => {
            let matches = regexp.exec(value);
            if (matches && matches.length >= 1) {
                this[prop] = parseInt(matches[1]);
                if (matches.length >= 2) {
                    this[prop + 'Unit'] = matches[2];
                } else {
                    this[prop + 'Unit'] = 'px';
                }
            }
        };
        extractValueAndUnit('maxWidth', maxWidth);
        extractValueAndUnit('maxHeight', maxHeight);
        extractValueAndUnit('tileMinWidth', tileMinWidth);
        extractValueAndUnit('tileMaxWidth', tileMaxWidth);
        extractValueAndUnit('tileMinHeight', tileMinHeight);
        extractValueAndUnit('tileMaxHeight', tileMaxHeight);
    }

    protected get targetPixelBounds() {
        if (this.targetBounds) {
            return {
                height: this.getPixelSize(this.targetBounds.height || 0),
                left: this.getPixelSize(this.targetBounds.left || 0),
                top: this.getPixelSize(this.targetBounds.top || 0),
                width: this.getPixelSize(this.targetBounds.width || 0),
            };
        } else {
            return undefined;
        }
    }

    public getFreePlace(tiles: IDejaTile[], idealBounds: Rect) {
        const percentHeight = this.getPercentSize(this.height);
        let freePlaces = [] as Rect[];
        for (let x = 0; x < this.maxWidth - idealBounds.width; x += this.tileMinWidth) {
            for (let y = 0; y < percentHeight - idealBounds.height; y += this.tileMinHeight) {
                const currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);
                if (tiles.filter((t) => t.bounds.intersectWith(currentBounds)).length === 0) {
                    freePlaces.push(currentBounds);
                }
            }
        }

        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((bounds1, bounds2) => {
                const calcDistance = (bounds) => {
                    return Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right() - idealBounds.right())) + 2 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom() - idealBounds.bottom()));
                };
                return calcDistance(bounds1) - calcDistance(bounds2);
            });

            return freePlaces[0];
        }

        // Add at the end
        return new Rect(0, percentHeight, idealBounds.width, idealBounds.height);
    }

    public HitTest(tiles: IDejaTile[], pixelBounds: Rect): IDejaTile[] {
        let percentBounds = new Rect(this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return tiles.filter((t) => t.bounds.intersectWith(percentBounds));
    }

    public getPixelSize(value: number, unit?: string): number {
        if (!unit || unit === '%') {
            return Math.round(value * this.hundredPercentWidth / 100);
        } else {
            return value;
        }
    }

    public getPercentSize(value: number): number {
        return Math.round(value * 100 / this.hundredPercentWidth);
    }

    public getSizePercentLimit(prop: string): number {
        let unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this.getPercentSize(this[prop]);
        } else {
            return this[prop];
        }
    }

    public getSizePixelLimit(prop: string): number {
        let unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this[prop];
        } else {
            return this.getPixelSize(this[prop]);
        }
    }

    public getTileMinPercentWidth(): number {
        return this.getSizePercentLimit('tileMinWidth');
    }

    public getTileMaxPercentWidth(): number {
        return this.getSizePercentLimit('tileMaxWidth');
    }

    public getTileMinPercentHeight(): number {
        return this.getSizePercentLimit('tileMinHeight');
    }

    public getTileMaxPercentHeight(): number {
        return this.getSizePercentLimit('tileMaxHeight');
    }

    public getMaxPercentWidth(): number {
        return this.getSizePercentLimit('maxWidth');
    }

    public getMaxPercentHeight(): number {
        return this.getSizePercentLimit('maxHeight');
    }

    public getTileMinPixelSize(): Size {
        return new Size(this.getSizePixelLimit('tileMinWidth'), this.getSizePixelLimit('tileMinHeight'));
    }

    public getTileMaxPixelSize(): Size {
        return new Size(this.getSizePixelLimit('tileMaxWidth'), this.getSizePixelLimit('tileMaxHeight'));
    }

    public getMaxPixelWidth(): number {
        return this.getSizePixelLimit('maxWidth');
    }

    public getMaxPixelHeight(): number {
        return this.getSizePixelLimit('maxHeight');
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        // Save layout
        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        } else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = tile;
        tile.expanded = true;
        let percentHeight = Math.ceil(pixelheight * 100 / this.hundredPercentWidth);
        let height = this.getPixelSize(percentHeight);
        this.size(tile, new Position(0, tile.t + height), Directions.bottom);
    }

    public cancelExpand() {
        if (this.beforeSizeLayout) {
            this.expandedTile.expanded = false;
            this.restoreLayout(this.beforeSizeLayout);
            this.refreshTiles();
            this.beforeSizeLayout = undefined;
        }
    }

    public refreshTiles(tiles?: IDejaTileList, hundredPercentWidth?: number) {
        if (tiles) {
            this.tiles = tiles;
        }

        if (hundredPercentWidth) {
            this.hundredPercentWidth = hundredPercentWidth;
        }

        let height = 0;
        let width = 0;
        let placeAtTheEnd = [] as IDejaTile[];

        this.tiles.forEach((tile) => {
            if (tile.bounds) {
                if (tile.dragging) {
                    if (this.height > height) {
                        height = this.height;
                    }
                    if (this.width > width) {
                        width = this.width;
                    }
                    if (tile.b > height) {
                        height = tile.b;
                    }
                    if (tile.r > width) {
                        width = tile.r;
                    }
                } else if (tile.bounds.top >= 0 && tile.bounds.left >= 0) {
                    let l = this.getPixelSize(tile.bounds.left);
                    let w = this.getPixelSize(tile.bounds.width);
                    let t = this.getPixelSize(tile.bounds.top);
                    let h = this.getPixelSize(tile.bounds.height);
                    if (t + h > height) {
                        height = t + h;
                    }
                    if (l + w > width) {
                        width = l + w;
                    }
                    tile.l = l;
                    tile.t = t;
                    tile.r = l + w;
                    tile.b = t + h;
                } else {
                    placeAtTheEnd.push(tile);
                }
            } else {
                placeAtTheEnd.push(tile);
            }
        });

        let top = height;
        let left = 0;
        placeAtTheEnd.forEach((tile) => {
            tile.bounds = tile.bounds || new Rect(left, this.getPercentSize(top), 3 * this.getTileMinPercentWidth(), this.getTileMinPercentHeight());
            let w = this.getPixelSize(tile.bounds.width);
            let h = this.getPixelSize(tile.bounds.height);
            let t = this.getPixelSize(tile.bounds.top);
            let l = this.getPixelSize(tile.bounds.left);

            if (left + w > width) {
                top += h;
                tile.bounds.left = 0;
                tile.bounds.top = this.getPercentSize(t);
            }

            if (t + h > height) {
                height = t + h;
            }

            tile.l = l;
            tile.t = t;
            tile.r = l + w;
            tile.b = t + h;
            left += l;
        });

        if (this.height !== height || this.width !== width) {
            this.height = height;
            this.width = width;
            this.sizeChanged(this.width, this.height);
        }
    }

    public startDrag(tiles: IDejaTile[], cursor: string, pageX: number, pageY: number) {
        // Backup config
        this.cursor = cursor;

        // Save layout
        let savedLayout = this.saveLayout();

        // Bring all tiles together
        let targetBounds: Rect;
        tiles.forEach((t) => {
            targetBounds = targetBounds ? Rect.union(targetBounds, t.bounds) : t.bounds;
            t.dragging = true;
        });

        this.dragRelativePosition = {};
        tiles.forEach((t) => {
            this.dragRelativePosition[t.id] = new Position(t.bounds.left - targetBounds.left, t.bounds.top - targetBounds.top);
        });

        this.dragPageOffset = new Position(pageX, pageY);

        this.dragOriginalPosition = new Position(targetBounds.left, targetBounds.top);

        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        delete this.validLayout;
    }

    public cancelDrag(tiles: IDejaTile[]) {
        if (this.moveTimer) {
            clearTimeout(this.moveTimer);
            this.moveTimer = undefined;
        }

        tiles.forEach((t) => {
            t.dragging = false;
            t.dropping = true;
        });

        setTimeout(() => {
            tiles.forEach((t) => t.dropping = false);
        }, 1000);

        // Restore original layout
        this.restoreLayout(this.originalLayout);
        delete this.originalLayout;
        delete this.validLayout;
        delete this.targetBounds;
        this.refreshTiles();
    }

    public drop(tiles: IDejaTile[]) {
        let changed: IDejaTile[];

        if (this.moveTimer) {
            clearTimeout(this.moveTimer);
            this.moveTimer = undefined;
        }

        this.restoreLayout(this.validLayout);
        if (this.cursor !== 'move') {
            // Only one tile can be resized at time
            let tile = tiles[0];
            tile.bounds = this.validLayout.validBounds;
            tile.dragging = false;
        } else {
            tiles.forEach((t) => {
                let left = this.validLayout.validBounds.left + this.dragRelativePosition[t.id].left;
                let top = this.validLayout.validBounds.top + this.dragRelativePosition[t.id].top;
                t.bounds = new Rect(left, top, t.bounds.width, t.bounds.height);
                t.dragging = false;
                t.dropping = true;
            });

            setTimeout(() => {
                tiles.forEach((t) => t.dropping = false);
            }, 1000);
        }

        if (this.validLayout) {
            changed = this.tiles.filter((t) => !Rect.equals(t.bounds, this.originalLayout[t.id] && this.originalLayout[t.id].bounds));
        }

        delete this.originalLayout;
        delete this.validLayout;
        delete this.targetBounds;

        this.refreshTiles();

        return changed;
    }

    public drag(tiles: IDejaTile[], pageX: number, pageY: number) {
        // Search related coords
        let offset = new Position(pageX - this.dragPageOffset.left, pageY - this.dragPageOffset.top);
        let offsetLeft = offset.left + this.getPixelSize(this.dragOriginalPosition.left);
        let offsetTop = offset.top + this.getPixelSize(this.dragOriginalPosition.top);

        let sizemin = this.getTileMinPixelSize();
        let sizemax = this.getTileMaxPixelSize();

        if (this.cursor !== 'move') {
            // Only one tile can be resized at time
            let tile = tiles[0];
            let offsetRight = offsetLeft + this.getPixelSize(tile.bounds.width);
            let offsetBottom = offsetTop + this.getPixelSize(tile.bounds.height);
            switch (this.cursor) {
                case 'nw-resize':
                    tile.l = Math.max(Math.min(offsetLeft, tile.r - sizemin.width), tile.r - sizemax.width);
                    tile.t = Math.max(Math.min(offsetTop, tile.b - sizemin.height), tile.b - sizemax.height);
                    this.size(tile, new Position(offsetLeft, offsetTop), Directions.left + Directions.top);
                    break;
                case 'sw-resize':
                    tile.l = Math.max(Math.min(offsetLeft, tile.r - sizemin.width), tile.r - sizemax.width);
                    tile.b = Math.max(Math.min(offsetBottom, tile.t + sizemax.height), tile.t + sizemin.height);
                    this.size(tile, new Position(offsetLeft, offsetBottom), Directions.left + Directions.bottom);
                    break;
                case 'w-resize':
                    tile.l = Math.max(Math.min(offsetLeft, tile.r - sizemin.width), tile.r - sizemax.width);
                    this.size(tile, new Position(offsetLeft, 0), Directions.left);
                    break;
                case 'ne-resize':
                    tile.r = Math.max(Math.min(offsetRight, tile.l + sizemax.width), tile.l + sizemin.width);
                    tile.t = Math.max(Math.min(offsetTop, tile.b - sizemin.height), tile.b - sizemax.height);
                    this.size(tile, new Position(offsetRight, offsetTop), Directions.right + Directions.top);
                    break;
                case 'se-resize':
                    tile.r = Math.max(Math.min(offsetRight, tile.l + sizemax.width), tile.l + sizemin.width);
                    tile.b = Math.max(Math.min(offsetBottom, tile.t + sizemax.height), tile.t + sizemin.height);
                    this.size(tile, new Position(offsetRight, offsetBottom), Directions.right + Directions.bottom);
                    break;
                case 'e-resize':
                    tile.r = Math.max(Math.min(offsetRight, tile.l + sizemax.width), tile.l + sizemin.width);
                    this.size(tile, new Position(offsetRight, 0), Directions.right);
                    break;
                case 'n-resize':
                    tile.t = Math.max(Math.min(offsetTop, tile.b - sizemin.height), tile.b - sizemax.height);
                    this.size(tile, new Position(0, offsetTop), Directions.top);
                    break;
                case 's-resize':
                    tile.b = Math.max(Math.min(offsetBottom, tile.t + sizemax.height), tile.t + sizemin.height);
                    this.size(tile, new Position(0, offsetBottom), Directions.bottom);
                    break;
                default:
                    throw 'Invalid direction';
            }
        } else {
            tiles.forEach((t) => {
                t.l = offsetLeft + this.getPixelSize(this.dragRelativePosition[t.id].left);
                t.t = offsetTop + this.getPixelSize(this.dragRelativePosition[t.id].top);
                t.r = t.l + this.getPixelSize(t.bounds.width);
                t.b = t.t + this.getPixelSize(t.bounds.height);
            });

            // Calc new drag and drop rectangle
            this.moveDestination = new Rect(
                this.getPercentSize(offsetLeft),
                this.getPercentSize(offsetTop),
                this.targetBounds.width,
                this.targetBounds.height,
            );

            this.move();
        }
    }

    public size(tile: IDejaTile, pixelpos: Position, directions: Directions) {
        // Calc new tile bounds
        let percentPos = new Position(this.getPercentSize(pixelpos.left), this.getPercentSize(pixelpos.top));
        let dragBounds = tile.bounds.clone();
        let newTargetBounds = tile.bounds.clone();
        let minWidth: number;
        let minHeight: number;
        let maxWidth: number;
        let maxHeight: number;

        if (directions & Directions.left) {
            minWidth = this.getTileMinPercentWidth();
            maxWidth = this.getTileMaxPercentWidth();
            let dleft = percentPos.left;
            let tleft = dragBounds.left < dleft ? minWidth * Math.ceil(dleft / minWidth) : minWidth * Math.floor(dleft / minWidth);
            let twidth = Math.min(maxWidth, Math.max(minWidth, newTargetBounds.right() - tleft));
            dragBounds.width = dragBounds.right() - dleft;
            dragBounds.left = dleft;
            newTargetBounds.left = newTargetBounds.right() - twidth;
            newTargetBounds.width = twidth;
        }
        if (directions & Directions.right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            let dright = percentPos.left;
            let tright = dragBounds.right() < dright ? minWidth * Math.ceil(dright / minWidth) : minWidth * Math.floor(dright / minWidth);
            dragBounds.width = dright - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tright - newTargetBounds.left));
        }
        if (directions & Directions.top) {
            minHeight = this.getTileMinPercentHeight();
            maxHeight = this.getTileMaxPercentHeight();
            let dtop = percentPos.top;
            let ttop = dragBounds.top < dtop ? minHeight * Math.ceil(dtop / minHeight) : minHeight * Math.floor(dtop / minHeight);
            let theight = Math.min(maxHeight, Math.max(minHeight, newTargetBounds.bottom() - ttop));
            dragBounds.height = dragBounds.bottom() - dtop;
            dragBounds.top = dtop;
            newTargetBounds.top = newTargetBounds.bottom() - theight;
            newTargetBounds.height = theight;
        }
        if (directions & Directions.bottom) {
            minHeight = minHeight || this.getTileMinPercentHeight();
            maxHeight = maxHeight || this.getTileMaxPercentHeight();
            let dbottom = percentPos.top;
            let tbottom = dragBounds.bottom() < dbottom ? minHeight * Math.ceil(dbottom / minHeight) : minHeight * Math.floor(dbottom / minHeight);
            dragBounds.height = dbottom - dragBounds.top;
            newTargetBounds.height = Math.min(maxHeight, Math.max(minHeight, tbottom - newTargetBounds.top));
        }

        if (Rect.equals(newTargetBounds, this.destination)) {
            // Nothing change, wait for timers
            return;
        }

        // Restore a previous layout if exists for this position
        if (tile.expanded) {
            let ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            tile.bounds = ensureBounds;
            this.refreshTiles();
        } else {
            // Restore the original layout before moving something
            this.restoreLayout(this.originalLayout);

            this.destination = newTargetBounds.clone();

            // Check if location is free without pushing tiles
            let result = this.tiles.find((t) => !t.dragging && t.bounds.intersectWith(newTargetBounds));
            if (!result) {
                this.targetBounds = newTargetBounds;

                // Save layout
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles();
            } else {
                // Location must be freed
                if (newTargetBounds) {
                    // Ensure new destination
                    let ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = newTargetBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles();
                    }
                }
            }
        }
    }

    private move() {
        let minWidth = this.getTileMinPercentWidth();
        let minHeight = this.getTileMinPercentHeight();

        // Search a new target
        let newTargetBounds = this.ensureContainer(new Rect(
            minWidth * Math.round(this.moveDestination.left / minWidth),
            minHeight * Math.round(this.moveDestination.top / minHeight),
            this.moveDestination.width,
            this.moveDestination.height,
        ));

        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < 3 && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < 3) {
            // Nothing change, wait for timers
            return;
        }
        this.lastTargetBounds = newTargetBounds;

        if (this.moveTimer) {
            clearTimeout(this.moveTimer);
            this.moveTimer = undefined;
        }

        // Restore the original layout before moving something
        this.restoreLayout(this.originalLayout);

        // Check if location is free without pushing tiles
        let result = this.tiles.find((t) => !t.dragging && t.bounds.intersectWith(newTargetBounds));
        if (!result) {
            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();

            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles();
        } else {
            // Location must be freed, timer
            this.moveTimer = setTimeout(() => {
                // console.log('moveTimer timer');
                this.moveTimer = undefined;

                this.destination = newTargetBounds.clone();
                if (newTargetBounds) {
                    // Ensure new destination
                    let ensureBounds = this.ensureTarget(newTargetBounds, this.moveDestination, Directions.all);
                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = newTargetBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles();
                    }
                }
            }, 500);
        }

    }

    // Ensure that the specified bounds are inside the tiles area. Return the corrected rectangle.
    private ensureContainer(percentBounds: Rect): Rect {
        if (percentBounds.left < 0) {
            percentBounds = percentBounds.offset(-percentBounds.left, 0);
        }

        if (percentBounds.top < 0) {
            percentBounds = percentBounds.offset(0, -percentBounds.top);
        }

        let maxPercentWidth = this.getMaxPercentWidth();
        if (maxPercentWidth && percentBounds.right() > maxPercentWidth) {
            percentBounds = percentBounds.offset(maxPercentWidth - percentBounds.right(), 0);
        }

        let maxPercentHeight = this.getMaxPercentHeight();
        if (maxPercentHeight && percentBounds.bottom() > maxPercentHeight) {
            percentBounds = percentBounds.offset(0, maxPercentHeight - percentBounds.bottom());
        }

        return percentBounds;
    }

    // Ensure that a tile can be dropped at the specified bounds. Return the corrected rectangle.
    private ensureTarget(bounds: Rect, effectiveBounds?: Rect, directions?: Directions, originalBounds?: Rect): Rect {
        if (!effectiveBounds) {
            effectiveBounds = bounds;
        }

        // Backup bounds
        if (!originalBounds) {
            originalBounds = bounds.clone();
        }

        if (!directions) {
            directions = Directions.all;
        } else {
            // We always can escape to the bottom in case of
            directions |= Directions.bottom;
        }

        let tilesToPush = {} as { [direction: number]: IDejaTile[] };
        tilesToPush[Directions.left] = [];
        tilesToPush[Directions.right] = [];
        tilesToPush[Directions.top] = [];
        tilesToPush[Directions.bottom] = [];

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.tiles.length; i++) {
            let t = this.tiles[i];
            if (!t.dragging && !t.expanded) {
                if (t.bounds.intersectWith(bounds)) {
                    let swapTargetRect = new Rect(this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                    if (t.bounds.left === effectiveBounds.left && t.bounds.top === effectiveBounds.top && t.bounds.width === effectiveBounds.width && t.bounds.height === effectiveBounds.height && effectiveBounds.adjacent(swapTargetRect)) {
                        // swap
                        t.bounds = swapTargetRect;
                        return bounds;
                    } else {
                        let hol = t.bounds.left - effectiveBounds.left; // Ce qui dépasse Ã  gauche
                        let hor = effectiveBounds.right() - t.bounds.right(); // Ce qui dépasse Ã  droite
                        let vot = t.bounds.top - effectiveBounds.top; // Ce qui dépasse en haut
                        let vob = effectiveBounds.bottom() - t.bounds.bottom(); // Ce qui dépasse en bas
                        let hoe = Math.max(0, Math.min(t.bounds.right(), effectiveBounds.right()) - Math.max(t.bounds.left, effectiveBounds.left)) / Math.min(t.bounds.width, effectiveBounds.width);
                        let voe = Math.max(0, Math.min(t.bounds.bottom(), effectiveBounds.bottom()) - Math.max(t.bounds.top, effectiveBounds.top)) / Math.min(t.bounds.height, effectiveBounds.height);

                        // Calc prefered direction
                        let preferedDirection: Directions;
                        if (voe >= hoe && directions & Directions.horizontal) {
                            // horizontal
                            preferedDirection = hor >= hol && directions & Directions.left ? Directions.left : Directions.right;
                        } else {
                            // vertical
                            preferedDirection = vob >= vot && directions & Directions.top ? Directions.top : Directions.bottom;
                        }
                        tilesToPush[preferedDirection].push(t);
                    }
                }
            }
        }

        // try first horizontal move
        let remain = 0;
        if (tilesToPush[Directions.left].length) {
            remain = this.pushHorizontal(bounds, -1, tilesToPush[Directions.left]);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                return this.ensureTarget(bounds, effectiveBounds, directions & ~Directions.left, originalBounds);
            }
        }

        // Now try right
        if (tilesToPush[Directions.right].length) {
            remain = this.pushHorizontal(bounds, 1, tilesToPush[Directions.right]);
        }

        if (remain > 0) {
            // No horizontal place, restore original position
            this.restoreLayout(this.originalLayout);
            return this.ensureTarget(originalBounds, effectiveBounds, directions & Directions.vertical);
        } else {
            // Try top
            if (tilesToPush[Directions.top].length) {
                remain = this.pushVertical(bounds, -1, tilesToPush[Directions.top]);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return this.ensureTarget(bounds, effectiveBounds, Directions.bottom);
                }
            }

            // And finally bottom
            remain = this.pushVertical(bounds, 1, tilesToPush[Directions.bottom]);
            if (remain) {
                // Destination is not available, keep tile at the original place
                return null;
            }
        }

        return bounds;
    }

    private saveLayout(): ILayoutInfos {
        let layout = {} as ILayoutInfos;
        layout.height = this.getTileMinPercentHeight();
        this.tiles.forEach((tile) => {
            let y = this.getPixelSize(tile.bounds.top || 0);
            let h = this.getPixelSize(tile.bounds.height || this.tileMinHeight);
            if (y + h > layout.height) {
                layout.height = y + h;
            }
            layout[tile.id] = {
                bounds: tile.bounds.clone(),
                id: tile.id,
            } as ILayoutInfo;
        });
        return layout;
    }

    private restoreLayout(layout: ILayoutInfos) {
        if (!layout) {
            return;
        }

        this.tiles.forEach((tile) => {
            let config = layout[tile.id] as ILayoutInfo;
            tile.bounds = config.bounds.clone();
        });
    }

    private calcHorizontalOverflow(direction: number, tiles: IDejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                // Offset tile
                let tryBounds = t.bounds.offset(direction * offset, 0);
                let roffset = 0;
                let maxWidth = this.getMaxPercentWidth();
                if (tryBounds.left < 0) {
                    roffset = -tryBounds.left;
                } else if (maxWidth && tryBounds.right() > maxWidth) {
                    roffset = tryBounds.right() - maxWidth;
                }

                let adjacentTiles = this.tiles.filter((tt) => !tt.dragging && t !== tt && tt.bounds.intersectWith(tryBounds));
                if (adjacentTiles.length) {
                    roffset += this.calcHorizontalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });

        return overflow;
    }

    private moveHorizontal(direction: number, tiles: IDejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                let newBounds = targetBounds[t.id] = t.bounds.offset(direction * offset, 0);
                let adjacentTiles = this.tiles.filter((tt) => !tt.dragging && t !== tt && tt.bounds.intersectWith(newBounds));
                if (adjacentTiles.length) {
                    this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushHorizontal(bounds: Rect, direction: number, tiles?: IDejaTile[], offset?: number): number {
        let overflow = 0;
        let targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                let ho = direction > 0 ? Math.max(0, bounds.right() - t.bounds.left) : Math.max(0, t.bounds.right() - bounds.left);
                if (ho > offset) {
                    offset = ho;
                }
            });
        }

        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcHorizontalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveHorizontal(direction, tiles, offset, targetBounds);

                // Copy bounds array to tiles
                this.tiles.forEach((t) => {
                    if (targetBounds[t.id]) {
                        t.bounds = targetBounds[t.id];
                    }
                });
            }
        }

        return overflow;
    }

    private calcVerticalOverflow(direction: number, tiles: IDejaTile[], offset: number, blackList?: Object): number {
        let overflow = 0;
        blackList = blackList || {};

        tiles.forEach((t) => {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;

                // Offset tile
                let tryBounds = t.bounds.offset(0, direction * offset);
                let roffset = 0;
                let maxHeight = this.getMaxPercentHeight();
                if (tryBounds.top < 0) {
                    roffset = -tryBounds.top;
                } else if (maxHeight && tryBounds.bottom() > maxHeight) {
                    roffset = tryBounds.bottom() - maxHeight;
                }

                let adjacentTiles = this.tiles.filter((tt) => !tt.dragging && t !== tt && tt.bounds.intersectWith(tryBounds));
                if (adjacentTiles.length) {
                    roffset += this.calcVerticalOverflow(direction, adjacentTiles, offset, blackList);
                }

                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });

        return overflow;
    }

    private moveVertical(direction: number, tiles: IDejaTile[], offset: number, targetBounds: { [id: number]: Rect }) {
        tiles.forEach((t) => {
            if (!targetBounds[t.id]) {
                // Offset tile
                let newBounds = targetBounds[t.id] = t.bounds.offset(0, direction * offset);
                let adjacentTiles = this.tiles.filter((tt) => !tt.dragging && t !== tt && tt.bounds.intersectWith(newBounds));
                if (adjacentTiles.length) {
                    this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    }

    private pushVertical(bounds: Rect, direction: number, tiles: IDejaTile[], offset?: number): number {
        let overflow = 0;
        let targetBounds = {} as { [id: number]: Rect };

        if (!offset) {
            offset = 0;
            tiles.forEach((t) => {
                let vo = direction > 0 ? Math.max(0, bounds.bottom() - t.bounds.top) : Math.max(0, t.bounds.bottom() - bounds.top);
                if (vo > offset) {
                    offset = vo;
                }
            });
        }

        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcVerticalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveVertical(direction, tiles, offset, targetBounds);

                // Copy bounds array to tiles
                this.tiles.forEach((t) => {
                    if (targetBounds[t.id]) {
                        t.bounds = targetBounds[t.id];
                    }
                });
            }
        }

        return overflow;
    }
}
