/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DejaTextMetricsService {
    private canvas;
    private element$: Subject<HTMLElement> = new Subject();
    private computedStyles: CSSStyleDeclaration;
    private charSize$ = new BehaviorSubject<number[]>(null);

    constructor() {
        Observable.from(this.element$)
            .delay(1)
            .first()
            .subscribe((element) => {
                const charSize = [];
                for (let i = 0; i < 255; i++) {
                    const c = String.fromCharCode(i);
                    charSize[i] = this.getTextWidth(c, element);
                }
                this.charSize$.next(charSize);
            });
    }

    public set metricsElem(elem: HTMLElement) {
        this.element$.next(elem);
    }

    /**
     * Calcule la longeur (en pixels) d'une chaine de caractères
     *
     * @param {string} text Le texte à mesurer
     * @param {HTMLElement} elem Le conteneur du texte
     *
     * @return {number} la largeur du texte donné
     */
    public getTextWidth(text: string, elem: HTMLElement): number {
        this.computedStyles = window.getComputedStyle(elem);
        const font = this.computedStyles.fontSize + ' ' + this.computedStyles.fontFamily;

        const canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);

        return metrics.width * 1.1; // Correction for letter-spacing
    }

    /**
     * Retourne la largeur maximum d'un tableau de strings.
     *
     * @param {string[]} texts les textes à comparer.
     * @param {HTMLElement} elem Le conteneur du texte
     *
     * @return {number} la width du texte le plus long dans le tableau donné en param.
     */
    public getTextMaxWidth(texts: string[], elem: HTMLElement): number {
        let maxWidth = 0;

        texts.forEach((text: string) => {
            const width = this.getTextWidth(text, elem);
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        return maxWidth;
    }

    /**
     * Mesure la heuteur théorique d'un texte contenu dans un conteneur d'une taille donnée.
     *
     * @param {number} maxWidth taille du conteneur
     * @param {string} text texte à mesurer
     *
     * @return {number} Hauteur théorique du conteneur.
     */
    public getTextHeight(maxWidth: number, text: string): Observable<number> {
        return this.getNumberOfLines(maxWidth, text)
            .map((numberOfLines: number) => {
                const computedLineHeight = parseInt(this.computedStyles.lineHeight.replace('px', ''), 10);
                const lineHeight = (!isNaN(computedLineHeight)) ?
                    computedLineHeight :
                    Math.floor(parseInt(this.computedStyles.fontSize.replace('px', ''), 10) * 1.5);

                return lineHeight * +numberOfLines;
            });
    }

    /**
     * Calcule le nombre de lignes qu'un texte va prendre en fonction de la largeur de son conteneur.
     *
     * @param {number} maxWidth taille du conteneur
     * @param {string} text texte à mesurer
     *
     * @return {number} Nombre de lignes théoriques du conteneur.
     */
    private getNumberOfLines(maxWidth: number, text: string): Observable<number> {
        return this.charSize$
            .filter((charSize) => charSize !== null)
            .map((charSize) => {
                const arr = text.split(' ');

                let tmpSize = 0;
                let numberOfLines = 1;
                arr.forEach((txt: string) => {
                    let w = 0;
                    for (let j = 0; j < txt.length; j++) {
                        const charCode = txt.charCodeAt(j);
                        // Si le caractère fait partie de la table ascii qu'on a calculé dans this.getAllCharsize() on incrémente la taille du mot de sa taille.
                        // Sinon, on ajoute la moyenne des tailles calculées (qui correspond théoriquement à la taille moyenne d'un caractère)
                        w += (charSize[charCode]) ? charSize[charCode] : charSize.reduce((a, b) => a + b, 0) / charSize.length;
                    }
                    if (tmpSize + w > maxWidth) {
                        tmpSize = w;
                        numberOfLines++;
                    } else {
                        tmpSize += w;
                    }
                });

                return numberOfLines;
            });
    }
}
