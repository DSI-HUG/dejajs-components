
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Color } from '../../../../src/common/core/graphics/color';
import { ColorEvent } from '../../../../src/common/core/graphics/color-event';
import { MaterialColors } from '../../../../src/common/core/style/material-colors';
import { DejaPopupAction } from '../../../../src/component/popup/model/popup-action.model';
import { DejaPopupConfig } from '../../../../src/component/popup/model/popup-config.model';

@Component({
    selector: 'deja-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

    protected selectedColor = new Color(233, 30, 99);

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DejaPopupConfig,
        protected materialColors: MaterialColors,
    ) { }

    protected onColorPickerChange(event: ColorEvent) {
        // this.hoveredColor = event.color;
        const action = new DejaPopupAction('color-change', 'ground-control');
        action.data = event;
        this.config.dejaPopupCom$.next(action);
    }

}
