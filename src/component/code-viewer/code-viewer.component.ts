import { AfterViewChecked, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-code-viewer',
    styleUrls: ['./code-viewer.component.scss'],
    templateUrl: './code-viewer.component.html',
})
export class DejaCodeViewerComponent implements AfterViewChecked {
    @Input() public language: string;

    private initialised = false;

    constructor() { 
        // console.log('ok');
    }

    public ngAfterViewChecked() {
        // console.log('ok');
        if (!this.initialised) {
            // console.warn('not initialised');
            Prism.highlightAll(false, () => {
                this.initialised = true;
            });
        }
    }
}
