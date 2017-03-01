/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { CommonModule } from '@angular/common';
import { Component, HostBinding, NgModule, ViewEncapsulation } from '@angular/core';

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
    template: '<div class="accordion-group" [class.open]="isOpen" (click)="toggleOpen($event)"><ng-content></ng-content></div>',
})
export class DejaAccordionGroupComponent {
    private isOpen = false;

    constructor(private accordion: DejaAccordionComponent) {
        this.accordion.addGroup(this);
    }

    public toggleOpen(event: MouseEvent): void {
        event.preventDefault();
        this.isOpen = !this.isOpen;
    }
}

@Component({
    selector: 'deja-accordion-header',
    template: `
        <div class="accordion-header">
            <ng-content></ng-content>
        </div>
    `,
})
export class DejaAccordionHeaderComponent { }

@Component({
    selector: 'deja-accordion-body',
    template: '<ng-content></ng-content>',
})
export class DejaAccordionBodyComponent {
    @HostBinding('class.accordion-body') true;
}

const DEJA_ACCORDION_DIRECTIVES = [DejaAccordionComponent, DejaAccordionGroupComponent, DejaAccordionHeaderComponent, DejaAccordionBodyComponent];

@NgModule({
    imports: [CommonModule],
    exports: DEJA_ACCORDION_DIRECTIVES,
    declarations: DEJA_ACCORDION_DIRECTIVES,
})
export class DejaAccordionModule { }
