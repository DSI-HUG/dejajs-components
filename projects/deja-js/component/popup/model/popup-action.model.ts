/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
export class DejaPopupAction {
    public refreshDrawer = true;
    public isFinalAction = false;
    public panelClass?: string;
    public data?: any;
    public icon?: string;
    public label?: string;

    constructor(
        public name: string,
        public target?: string,
    ) {
        if (!this.icon) {
            this.icon = name;
        }
        if (!this.label) {
            this.label = name;
        }
    }

}

export class DejaPopupButton extends DejaPopupAction {
    constructor(
        public name: string,
        public label?: string,
        public icon?: string,
        public isFinalAction = true,
    ) {
        super(name);
    }
}
