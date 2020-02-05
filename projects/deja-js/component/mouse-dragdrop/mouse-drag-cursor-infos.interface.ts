import { Position } from '@deja-js/core';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

export interface IDragCursorInfos extends IDropCursorInfos {
    position: Position;
    originalEvent: MouseEvent;
}