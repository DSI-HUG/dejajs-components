/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';

@Injectable()
export class DejaTextMetricsService {
    private canvas;
    private elem: HTMLElement;
    private ElemObservable: Subject<HTMLElement> = new Subject();
    private computedStyles: CSSStyleDeclaration;
    private charSize: number[];

    constructor() { }

    public set metricsElem(elem: HTMLElement) {
        this.elem = elem;
        this.ElemObservable.next(elem);
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
        let font = this.computedStyles.fontSize + ' ' + this.computedStyles.fontFamily;

        let canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        let context = canvas.getContext('2d');
        context.font = font;
        let metrics = context.measureText(text);

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
            let width = this.getTextWidth(text, elem);
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
    public getTextHeight(maxWidth: number, text: string): Promise<number> {
        return new Promise<number>((resolve) => {
            this.getNumberOfLines(maxWidth, text).then((numberOfLines: number) => {
                let computedLineHeight = parseInt(this.computedStyles.lineHeight.replace('px', ''));
                let lineHeight = (!isNaN(computedLineHeight)) ?
                    computedLineHeight :
                    Math.floor(parseInt(this.computedStyles.fontSize.replace('px', '')) * 1.5);

                resolve(lineHeight * +numberOfLines);
            });
        });
    }

    /**
     * Calcule la taille théorique de chaque caractères ascii
     */
    private getAllCharSize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.charSize) {
                resolve();
            } else {
                this.getMetricsElement().then((element: HTMLElement) => {
                    this.charSize = [];
                    for (let i = 0; i < 255; i++) {
                        let c = String.fromCharCode(i);
                        this.charSize[i] = this.getTextWidth(c, element);
                    }
                    resolve();
                }).catch((err) => reject(err));
            }
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
    private getNumberOfLines(maxWidth: number, text: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getAllCharSize().then(() => {
                let arr = text.split(' ');

                let tmpSize = 0;
                let numberOfLines = 1;
                arr.forEach((txt: string) => {
                    let w = 0;
                    for (let j = 0; j < txt.length; j++) {
                        let charCode = txt.charCodeAt(j);
                        // Si le caractère fait partie de la table ascii qu'on a calculé dans this.getAllCharsize() on incrémente la taille du mot de sa taille.
                        // Sinon, on ajoute la moyenne des tailles calculées (qui correspond théoriquement à la taille moyenne d'un caractère)
                        w += (this.charSize[charCode]) ? this.charSize[charCode] : this.charSize.reduce( ( a, b ) => a + b, 0 ) / this.charSize.length;
                    }
                    if (tmpSize + w > maxWidth) {
                        tmpSize = w;
                        numberOfLines++;
                    } else {
                        tmpSize += w;
                    }
                });

                resolve(numberOfLines);
            }).catch((err) => reject(err));
        });
    }

    private getMetricsElement(): Promise<HTMLElement> {
        return new Promise((resolve) => {
            if (this.elem) {
                resolve(this.elem);
            } else {
                this.ElemObservable.subscribe((elem: HTMLElement) => {
                    resolve(elem);
                    this.ElemObservable.unsubscribe();
                });
            }
        });
    }
}
