/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, HostBinding, HostListener, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-accordion',
    styleUrls: ['./accordion.component.scss'],
    template: '<ng-content></ng-content>',
})
export class DejaAccordionComponent {
    private groups: DejaAccordionGroupComponent[] = [];
    @HostBinding('class.accordion') true;

    public addGroup(group: DejaAccordionGroupComponent): void {
        this.groups.push(group);
    }
}

@Component({
    selector: 'deja-accordion-group',
    template: '<ng-content></ng-content>',
})
export class DejaAccordionGroupComponent {
    @HostBinding('class.open') @Input() public isOpen: boolean;
    @HostBinding('class.accordion-group') true;

    constructor(private accordion: DejaAccordionComponent) {
        this.accordion.addGroup(this);
    }

    @HostListener('click', ['$event'])
    public toggleOpen(event: MouseEvent): void {

        let target = event.target as HTMLElement;
        const element = event.currentTarget as HTMLElement;

        while (target.parentElement && target !== element) {
            if (target.localName === 'deja-accordion-header') {
                this.isOpen = !this.isOpen;
            }
            target = target.parentElement;
        }
    }
}

@Component({
    selector: 'deja-accordion-header',
    template: `<ng-content></ng-content>`,
})
export class DejaAccordionHeaderComponent {
    @HostBinding('class.accordion-header') true;
}

@Component({
    selector: 'deja-accordion-body',
    template: '<ng-content></ng-content>',
})
export class DejaAccordionBodyComponent {
    @HostBinding('class.accordion-body') true;
}
