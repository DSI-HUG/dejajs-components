import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDejaComboListAction } from '../model/combo-list-action.interface';

const noop = () => { };

export const DEFAULT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: forwardRef(() => DejaComboListComponent),
    multi: true
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-combo-list',
    templateUrl: './combo-list.component.html',
    styleUrls: ['./combo-list.component.scss'],
    providers: [DEFAULT_VALUE_ACCESSOR]
})
export class DejaComboListComponent<T> implements OnChanges, ControlValueAccessor {

    @Input() public itemsToSelect: T[];
    @Input() public itemsSelected: T[];
    @Input() public disabled = false;
    @Input() public disableFastActions = false;
    @Input() public labelFieldName = 'label';
    @Input() public sortDirection = null; // or 'asc' or 'desc'
    @Output() public action = new EventEmitter<IDejaComboListAction<T>>();

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.init();
    }

    public ngOnChanges() {
        this.sortAll();
    }

    public selected(item: T): void {
        const index = this.itemsToSelect.indexOf(item, 0);
        if (index > -1) {
            this.itemsSelected.unshift(this.itemsToSelect.splice(index, 1)[0]);
            this.onChangeCallback(this.itemsSelected);
            this.emit('select', item);
            this.sortAll();
        }
    }

    public deselect(item: T) {
        const index = this.itemsSelected.indexOf(item, 0);
        if (index > -1) {
            this.itemsToSelect.unshift(this.itemsSelected.splice(index, 1)[0]);
            this.onChangeCallback(this.itemsSelected);
            this.emit('deselect', item);
            this.sortAll();
        }
    }

    public selectAll() {
        this.itemsSelected = this.itemsSelected.concat(this.itemsToSelect);
        this.onChangeCallback(this.itemsSelected);
        this.itemsToSelect = [];
        this.emit('select_all');
        this.sort(this.itemsSelected);
    }

    public selectNone() {
        this.itemsToSelect = this.itemsToSelect.concat(this.itemsSelected);
        this.itemsSelected = [];
        this.onChangeCallback(this.itemsSelected);
        this.emit('select_none');
        this.sort(this.itemsToSelect);
    }

    // ************* ControlValueAccessor Implementation **************

    /** get accessor */
    public get value(): T[] {
        return this.itemsSelected;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: T[]): void {
        if (value !== this.itemsSelected) {
            this.itemsSelected = value;
            this.onChangeCallback(this.value);
            this.sortAll();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // Allows Angular to disable the input.
    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // ************* End of ControlValueAccessor Implementation **************

    private init() {
        this.itemsSelected = [];
        this.itemsToSelect = [];
    }

    private emit(type: string, currentItem: T = null) {
        const action: IDejaComboListAction<T> = {
            type,
            payload: {
                currentItem,
                selectedItems: this.itemsSelected,

            }
        };
        this.action.emit(action);
    }

    private sortAll() {
        this.sort(this.itemsSelected);
        this.sort(this.itemsToSelect);
    }

    private sort(aItem: T[]): T[] {
        if (!this.sortDirection) {
            return aItem;
        }
        const fieldname = this.labelFieldName;
        const coeff = this.sortDirection === 'asc' ? 1 : -1;
        return aItem.sort((a, b) => {
            if (a[fieldname] < b[fieldname]) { return -1 * coeff; }
            if (a[fieldname] > b[fieldname]) { return 1 * coeff; }
            return 0;
        });
    }
}
