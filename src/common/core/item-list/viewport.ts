import { IItemBase } from './';

/** Interface représentant les information du ViewPort des listes. */
export interface IViewPortInfos {
    /** Liste plate affichée par le viewport */
    flatItemList: IItemBase[];
    /** Index de départ du viewport dans la liste des éléments visibles */
    startIndex: number;
    /** Nombre d'éléments affichés par le viewport */
    totalCount: number;
    /** Profondeur maximum dans la hierarchie */
    depthMax: number;
}
