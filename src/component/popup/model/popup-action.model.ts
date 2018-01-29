
export class DejaPopupAction {

    public refreshDrawer?= true;
    public isFinalAction?= false;
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
