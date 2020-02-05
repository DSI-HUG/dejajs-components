import { Rect } from '@deja-js/core';

export interface IDejaTilesRefreshParams {
    resetWidth?: boolean;
    ensureVisible?: string; // Tile id
    ensureBounds?: Rect;
}
