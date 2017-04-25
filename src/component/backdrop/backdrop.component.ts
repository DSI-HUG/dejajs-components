/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';

/** Simple composant à placer en arrière plan pour simuler un effet modale
 * Afficher le composant avec un *ngIf. Par defaut, le div affiché par le composant sera en pleine page avec un z-index de 10.
 * Tous le contenu qui dois être accessible, en tant que contenu modale doit avoir un index supérieur à 10.
*/
@Component({
    selector: 'deja-backdrop',
    styleUrls: [
        './backdrop.component.scss',
    ],
    template: '<ng-content></ng-content>',
})
export class DejaBackdropComponent { }
