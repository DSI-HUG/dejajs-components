/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Position } from '../../common/core/graphics/position';

/** Menu avec placement optimisé (Voir DejaDropDownComponent) */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-menu',
    styleUrls: [
        './menu.component.scss',
    ],
    templateUrl: './menu.component.html',
})
export class DejaMenuComponent implements OnInit, OnDestroy {
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

    @Output() visibleChange = new EventEmitter<boolean>();

    protected dropDownPosition: Position;
    protected isMobile = false;

    private contentInitialized$ = new Subject();
    private media$sub: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef, media: ObservableMedia) {
        this.ownerElement = this.elementRef.nativeElement;

        this.media$sub = Observable.merge(this.contentInitialized$, media.asObservable())
            .subscribe(() => {
                this.isMobile = media.isActive('xs') || media.isActive('sm');
                this.changeDetectorRef.markForCheck();
            });
    }

    private get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    public ngOnDestroy() {
        if (this.media$sub) {
            this.media$sub.unsubscribe();
        }
    }

    public ngOnInit() {
        this.contentInitialized$.next();
    }

    /** Affiche le menu. */
    public show(event: MouseEvent) {
        if (!this.buttonAlignment) {
            this.dropDownPosition = new Position(event.pageX, event.pageY);
        }
        this.ownerElement = (event && event.target) || this.elementRef.nativeElement;
        this.isVisible = true;
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
    }

    /** Ferme le menu. */
    public close() {
        this.isVisible = false;
        this.visibleChange.emit(this.isVisible);
        this.changeDetectorRef.markForCheck();
    }
}
