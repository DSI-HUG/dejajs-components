import { IItemBase } from './index';

/** Interface représentant un model de liste hierarchique. */
export interface IItemTree extends IItemBase {
    /** Indique si l'élément peut être réduit. */
    collapsible?: boolean;
    /** Indique si l'élément est réduit. */
    collapsed?: boolean;
    /** Usage interne. */
    expanding?: boolean;
    /** Usage interne. */
    collapsing?: boolean;
    /** Retourne la profondeur de l'élément dans la hierarchie. */
    depth?: number;
    /** Usage interne. */
    $items?: IItemTree[];
}
