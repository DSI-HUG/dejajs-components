/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, HostBinding, HostListener, Input, ViewEncapsulation } from '@angular/core';

/**
 * Accordion component for Angular
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-accordion',
    styleUrls: ['./accordion.component.scss'],
    template: '<ng-content></ng-content>',
})
export class DejaAccordionComponent {
    /**
     * Internal use. Add accordion class to :host to avoid useless DOM
     */
    @HostBinding('class.accordion') protected accordionClass = true;
    private groups: DejaAccordionGroupComponent[] = [];

    /**
     * Add a group to the current Accordion Component
     *
     * @param {DejaAccordionGroupComponent} group
     */
    public addGroup(group: DejaAccordionGroupComponent): void {
        this.groups.push(group);
    }
}

/**
 * Accordion-group component for Angular
 * Work inside an AccordionComponent
 */
@Component({
    selector: 'deja-accordion-group',
    template: '<ng-content></ng-content>',
})
export class DejaAccordionGroupComponent {
    /**
     * Status of the accordion group.
     */
    @HostBinding('class.open') @Input() public isOpen: boolean;
    /**
     * Internal use. Add accordion-group class to :host to avoid useless DOM
     */
    @HostBinding('class.accordion-group') protected accordionGroupClass = true;

    constructor(private accordion: DejaAccordionComponent) {
        this.accordion.addGroup(this);
    }

    /**
     * Subscription to "click" event.
     * Check if click is on header and then it toggle the group.
     *
     * @param {MouseEvent} event
     */
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

/**
 * Accordion component for Angular
 * Work inside AccordionGroupComponent
 */
@Component({
    selector: 'deja-accordion-header',
    template: `<ng-content></ng-content>`,
})
export class DejaAccordionHeaderComponent {
    /**
     * Internal use. Add accordion-header class to :host to avoid useless DOM
     */
    @HostBinding('class.accordion-header') protected accordionHeaderClass = true;
}

/**
 * Accordion component for Angular
 * Work inside AccordionGroupComponent (behind AccordionHeaderComponent)
 */
@Component({
    selector: 'deja-accordion-body',
    template: '<ng-content></ng-content>',
})
export class DejaAccordionBodyComponent {
    /**
     * Internal use. Add accordion-body class to :host to avoid useless DOM
     */
    @HostBinding('class.accordion-body') protected accordionBodyClass = true;
}
