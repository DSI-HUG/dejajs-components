import { Injectable } from '@angular/core';

@Injectable()
export class DejaComboListService<T> {

    public selectable: T[];
    public selectableBuffer: T[];
    public selected: T[];
    public selectedBuffer: T[];

    constructor() { }

    // public toggleSelectable(item: T, add = true) {
    //     const index = this.selectableBuffer.indexOf(item, 0);
    //     if (index > -1) {
    //         this.selectableBuffer.splice(index, 1);
    //     } else if (add) {
    //         this.selectableBuffer.push(item);
    //     }
    // }

    public toggleSelectable(item: T, add = true) {
        const index = this.selectableBuffer.indexOf(item, 0);
        if (index > -1) {
            this.selectableBuffer = this.selectableBuffer.filter((_, idx) => idx !== index);
        } else if (add) {
            this.selectableBuffer = this.selectableBuffer.concat([item]);
        }
    }

    public toggleSelected(item: T, add = true) {
        const index = this.selectedBuffer.indexOf(item, 0);
        if (index > -1) {
            this.selectedBuffer = this.selectedBuffer.filter((_, idx) => idx !== index);
        } else if (add) {
            this.selectedBuffer = this.selectedBuffer.concat([item]);
        }
    }

    public raiseBuffer() {
        // this.selectableBuffer.forEach((item: T) => this.raiseOne(item));
        this.selectable = this.selectable.filter((i: T) => this.selectableBuffer.some((item: T) => i === item));
        this.selected = this.selected.concat(this.selectableBuffer);
        this.selectableBuffer = [];
        this.sortAll();
    }

    public dropBuffer() {
        this.selectedBuffer.forEach((item: T) => this.dropOne(item));
    }

    public raiseOne(item: T) {
        this.selectable = this.selectable.filter((i: T) => i !== item);
        this.selected = this.selected.concat([item]);
        this.sortAll();
        // const index = this.selectable.indexOf(item, 0);
        // if (index > -1) {
        //     this.selected.unshift(this.selectable.splice(index, 1)[0]);
        //     this.sortAll();
        //     return false;
        // }
        // return true;
    }

    public dropOne(item: T) {
        this.selectable = this.selectable.filter((i: T) => i !== item);
        this.sortAll();
        // const index = this.selected.indexOf(item, 0);
        // if (index > -1) {
        //     this.selectable.unshift(this.selected.splice(index, 1)[0]);
        //     this.sortAll();
        //     return false;
        // }
        // return true;
    }

    public raiseAll() {
        this.selected = this.selected.concat(this.selectable);
        this.selectableBuffer = [];
    }

    public dropAll() {
        this.selectable = this.selectable.concat(this.selected);
        this.selectedBuffer = [];
    }

    private sortAll() {
        // todo
    }

}
