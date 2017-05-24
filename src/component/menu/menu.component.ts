/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

/** Menu avec placement optimisé (Voir DejaDropDownComponent) */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-menu',
    styleUrls: [
        './menu.component.scss',
    ],
    templateUrl: './menu.component.html',
})
export class DejaMenuComponent {
    /** ID de l'élement dans lequel le menu doit s'afficher (le menu ne peut dépasser de l'élement spécifié ici) */
    @Input() public dropdownContainerId: string;
    /** Point de référence du bouton pour l'alignement du menu. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input() public buttonAlignment = 'left bottom';
    /** Ancre d'alignement du menu. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'. */
    @Input() public menuAlignment = 'left bottom';
    /** Renvoie une valeur qui indique si le menu est affiché. */
    @Input() public isVisible = false;
    /** Renvoie ou définit l'élement du DOM sur lequel le menu devra s'aligner */
    @Input() public ownerElement: HTMLElement;

    constructor(private elementRef: ElementRef) {
        this.ownerElement = this.elementRef.nativeElement;
    }

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    /** Affiche le menu. */
    public show(event: Event) {
        this.ownerElement = (event && event.target) || this.elementRef.nativeElement;
        this.isVisible = true;
    }

    /** Ferme le menu. */
    public close() {
        this.isVisible = false;
    }
}
