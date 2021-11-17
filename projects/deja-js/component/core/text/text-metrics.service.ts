/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Destroy } from '@deja-js/component/core/destroy';
import { BehaviorSubject, delay, filter, map, Observable, range, Subject, switchMap, take, takeUntil, toArray } from 'rxjs';


/**
 * Service to measure the theorical size of a text inside a container
 */
export class DejaTextMetricsService extends Destroy {
    private canvas: HTMLCanvasElement;
    private element$ = new Subject<HTMLElement>();
    private computedStyles: CSSStyleDeclaration;
    private charSize$ = new BehaviorSubject<number[]>(null);

    /**
     * Constructor
     * Add observable to wait for element to be set. And then take its properties to measure all ASCII char size.
     */
    public constructor() {
        super();

        this.element$.pipe(
            delay(1),
            take(1),
            switchMap(element => range(0, 255).pipe(
                map(i => this.getTextWidth(String.fromCharCode(i), element)),
                toArray()
            )),
            takeUntil(this.destroyed$)
        ).subscribe(charSize => this.charSize$.next(charSize));
    }

    /** Setter for base element */
    public set metricsElem(elem: HTMLElement) {
        this.element$.next(elem);
    }

    /**
     * Calcule la longeur (en pixels) d'une chaine de caractères
     *
     * @param text Le texte à mesurer
     * @param elem Le conteneur du texte
     *
     * @return la largeur du texte donné
     */
    public getTextWidth(text: string, elem: HTMLElement): number {
        this.computedStyles = window.getComputedStyle(elem);
        const font = `${this.computedStyles.fontSize} ${this.computedStyles.fontFamily}`;

        const canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);

        return metrics.width * 1.1; // Correction for letter-spacing
    }

    /**
     * Retourne la largeur maximum d'un tableau de strings.
     *
     * @param texts les textes à comparer.
     * @param elem Le conteneur du texte
     *
     * @return la width du texte le plus long dans le tableau donné en param.
     */
    public getTextMaxWidth(texts: string[], elem: HTMLElement): number {
        let maxWidth = 0;

        texts.forEach(text => {
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
     * @param maxWidth taille du conteneur
     * @param text texte à mesurer
     *
     * @return Hauteur théorique du conteneur.
     */
    // eslint-disable-next-line rxjs/finnish
    public getTextHeight(maxWidth: number, text: string): Observable<number> {
        return this.getNumberOfLines(maxWidth, text).pipe(
            map(numberOfLines => {
                const computedLineHeight = parseInt(this.computedStyles.lineHeight.replace('px', ''), 10);
                const lineHeight = (!isNaN(computedLineHeight)) ?
                    computedLineHeight :
                    Math.floor(parseInt(this.computedStyles.fontSize.replace('px', ''), 10) * 1.5);

                return lineHeight * +numberOfLines;
            })
        );
    }

    /**
     * Calcule le nombre de lignes qu'un texte va prendre en fonction de la largeur de son conteneur.
     *
     * @param maxWidth taille du conteneur
     * @param text texte à mesurer
     *
     * @return Nombre de lignes théoriques du conteneur.
     */
    // eslint-disable-next-line rxjs/finnish
    private getNumberOfLines(maxWidth: number, text: string): Observable<number> {
        return this.charSize$.pipe(
            filter(charSize => charSize !== null),
            map(charSize => {
                let tmpSize = 0;
                let numberOfLines = 1;
                let averageCharSize = 0;
                if (text.length > 0) {
                    const arr = text.split(' ');
                    let spaceWidth = 0;
                    const printableCharSizeArray = charSize.filter(size => size > 0);
                    averageCharSize = printableCharSizeArray.reduce((a, b) => a + b, 0) / printableCharSizeArray.length;
                    arr.forEach((txt: string) => {
                        let w = 0;
                        // eslint-disable-next-line no-loops/no-loops
                        for (let j = 0; j < txt.length; j++) {
                            const charCode = txt.charCodeAt(j);
                            // Si le caractère fait partie de la table ascii qu'on a calculé dans this.getAllCharsize() on incrémente la taille du mot de sa taille.
                            // Sinon, on ajoute la moyenne des tailles calculées (qui correspond théoriquement à la taille moyenne d'un caractère)
                            w += (charSize[charCode]) ? charSize[charCode] : averageCharSize;
                        }
                        if ((tmpSize + w + spaceWidth) > maxWidth) {
                            tmpSize = w;
                            numberOfLines++;
                        } else {
                            tmpSize += w + spaceWidth;
                        }
                        if (spaceWidth === 0) {
                            spaceWidth = charSize[32];
                        }
                    });
                }

                return numberOfLines;
            })
        );
    }
}
