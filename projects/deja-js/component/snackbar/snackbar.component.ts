/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { debounce, delay, Subject, Subscription, take, takeUntil, tap, timer } from 'rxjs';

interface IAnimation {
    before: CSSStyleDeclaration;
    after: CSSStyleDeclaration;
    delay?: number;
    duration: number;
    easing: string;
}

@Component({
    selector: 'deja-snackbar',
    styleUrls: ['./snackbar.component.scss'],
    template: '<ng-content></ng-content>'

})
export class DejaSnackbarComponent extends Destroy implements OnInit, AfterViewInit, OnDestroy {

    /**
     * all snackbar instances
     */
    private static INSTANCES: DejaSnackbarComponent[] = [];

    /**
 * callback used to negate the boolean responsible for the presence of the snackbar on the dom (see demo)
 */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public readonly onAnimationDone = new EventEmitter();

    /**
     * inner container
     */
    // @ViewChild('container') public host;

    /**
     * specify delay for the enter animation
     */
    @Input() public delay = 0;

    /**
     * specify lifetime of the snackbar on the screen
     */
    @Input() public duration = 0;

    /**
     * set a container for the snackbar instead of default behavior (viewport)
     */
    @Input() public outerContainerElement?: HTMLElement;

    /**
     * inner container element, represent the snackbar since the host has no height width and a position relative to it's html declaration
     */
    private host: HTMLElement;

    /**
     * height of the inner container element
     */
    private height = 32;

    /**
     * vertical space between snackbar
     */
    private marginTop = 6;

    /**
     * snackbar creation timestamp, used for calculation, forthe adapt animation
     */
    private timestamp: number = +new Date();

    /**
     * enter animation duration
     */
    private enterAnimationDuration = 350;

    /**
     * leave animation duration
     */
    private leaveAnimationDuration = 175;

    /**
     * adapt animation duration
     */
    private adaptAnimationDuration = 225;

    /**
     * string representation of the alignment, used for statements and initial final position
     */
    private anchor?: string;

    /**
     * object representation of the alignment, used to filter incompatible alignments and build the string representation
     */
    private _alignments = {} as {
        [prop: string]: boolean;
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
    };

    private animate$ = new Subject<IAnimation>();
    private animate$sub: Subscription;

    /**
     * _alignments setter
     */
    @Input() public set alignment(value: string) {
        this._alignments = {
            bottom: false,
            left: false,
            right: false,
            top: false
        };

        // set _alignments
        if (value) {
            value.split(/\s+/g).forEach((align: string) => this._alignments[align] = true);
        }

        // filter incompatible alignments
        this._alignments.bottom = this._alignments.top && this._alignments.bottom ? false : this._alignments.bottom;
        this._alignments.left = this._alignments.right && this._alignments.left ? false : this._alignments.left;
    }

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        super();

        this.host = this.elementRef.nativeElement;

        if (!DejaSnackbarComponent.INSTANCES) {
            DejaSnackbarComponent.INSTANCES = [];
        }

        DejaSnackbarComponent.INSTANCES.push(this);

        const applyParams = (styles: CSSStyleDeclaration): void => {
            Object.keys(styles)
                .forEach(key => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access
                    (<any> this.host.style)[key] = (<any>styles)[key];
                });
        };

        this.animate$sub = this.animate$.pipe(
            tap(animation => applyParams(animation.before)),
            delay(1),
            tap(animation => {
                this.host.style.transitionDuration = `${animation.duration}ms`;
                this.host.style.transitionTimingFunction = animation.easing;
                this.host.style.transitionProperty = Object.keys(animation.before).join(',');
            }),
            debounce(animation => timer(animation.delay || 1)),
            tap(animation => applyParams(animation.after)),
            debounce(animation => timer(animation.duration)),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.host.style.transitionDuration = '';
            this.host.style.transitionTimingFunction = '';
            this.host.style.transitionProperty = '';
        });
    }

    /**
     * used to recalculate the position of the snackbar on the X axis when resizing / changing from landscape to portrait and vice versa
     *
     * @param event
     */
    @HostListener('window:resize', [])
    public onResize(): void {
        this.setNewWidth();
    }

    /**
     * onInit hook
     */
    public ngOnInit(): void {
        // Choose animation depending on alignment
        const anchors = [] as string[];

        Object.keys(this._alignments).forEach(key => {
            if (this._alignments[key]) {
                anchors.push(key);
            }
        });

        anchors.sort((x, y) => x > y ? 1 : -1);
        const anchor = anchors.reduce((acc, curr) => {
            if (acc === '') {
                acc += curr;
            } else {
                acc += `-${curr}`;
            }
            return acc;
        }, '');

        this.anchor = anchor;
    }

    /**
     * afterviewInit hook
     */
    public ngAfterViewInit(): void {
        if (!this.outerContainerElement) {
            // Set default outer container if none specified
            this.outerContainerElement = this.host.ownerDocument.body;
        } else {
            // Otherwise, set inner container position to absolute for correct placement of snackbars
            this.host.classList.add('absolute');
        }

        this.height = this.host.getBoundingClientRect().height;
        this.setPosition();
        this.launchEnterAnimation();

        // if a duration has been been specified, launch the 'leave' animation after snackbar's lifetime flow, then emit amination done
        timer(this.duration + this.delay).pipe(
            take(1),
            tap(() => {
                if (this.duration) {
                    this.launchLeaveAnimation();
                }
            }),
            delay(this.leaveAnimationDuration),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.onAnimationDone.emit());
    }

    /**
     * onDestroy hook
     */
    public ngOnDestroy(): void {
        super.ngOnDestroy();

        // check if snackbars have to move (if they were created after the one deleted)
        if (DejaSnackbarComponent.INSTANCES.length) {
            DejaSnackbarComponent.INSTANCES
                .filter(instance => this.outerContainerElement === instance.outerContainerElement)
                .filter(instance => this.anchor === instance.anchor)
                .forEach(instance => {
                    if (instance.timestamp > this.timestamp) {
                        instance.launchAdaptAnimation(this.height);
                    }
                });
        }
        // remove the soon to be destroyed snackbar from the instances array
        DejaSnackbarComponent.INSTANCES = DejaSnackbarComponent.INSTANCES
            .filter(instance => this !== instance);

        this.animate$sub.unsubscribe();
    }

    /**
     * emit animation done
     *
     * @param event
     */
    protected animationDone(event: Event): void {
        this.onAnimationDone.emit(event);
    }

    protected increaseElevation(): void {
        const zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex + 1).toString();
    }

    protected decreaseElevation(): void {
        const zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex - 1).toString();
    }

    /**
     * compute cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     *
     * @return cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     */
    private computePosition(): { innerContainerWidth: number; innerContainerHeight: number; precedentInstanceHeight: number; computedHeight: number } {
        // Inner container
        const innerContainerElementBounds = this.host.getBoundingClientRect();
        const innerContainerWidth = innerContainerElementBounds.width;
        const innerContainerHeight = innerContainerElementBounds.height;

        // Instances sharing the same outer container and the same anchor
        const instancesInSameZone = DejaSnackbarComponent.INSTANCES
            .filter((instance: DejaSnackbarComponent) => this.outerContainerElement === instance.outerContainerElement)
            .filter((instance: DejaSnackbarComponent) => this.anchor === instance.anchor)
            .filter((instance: DejaSnackbarComponent) => this !== instance);

        let precedentInstanceHeight = 0;

        if (instancesInSameZone) {
            const precedentInstance = instancesInSameZone[instancesInSameZone.length - 1];

            if (precedentInstance) {
                const innerContainerElement = precedentInstance.elementRef.nativeElement;
                precedentInstanceHeight = innerContainerElement.getBoundingClientRect().height;
            }
        }

        // computed height of inner containers, sharing the same outer container and the same anchor
        const computedHeight = instancesInSameZone
            .map((instance: DejaSnackbarComponent) => {
                const innerContainerElement = instance.elementRef.nativeElement;
                return innerContainerElement.getBoundingClientRect().height;
            })
            .reduce((acc, curr) => {
                acc += curr + this.marginTop;
                return acc;
            }, 0);

        return {
            innerContainerWidth,
            innerContainerHeight,
            precedentInstanceHeight,
            computedHeight
        };
    }

    /**
     * set the final position of the snackbar
     */
    private setPosition(): void {

        const { innerContainerWidth, innerContainerHeight, computedHeight } = this.computePosition();

        if (this.anchor === 'left') {
            this.host.style.left = `${2}%`;
            this.host.style.bottom = `calc(${33}% + ${computedHeight}px)`;
        }
        if (this.anchor === 'right') {
            this.host.style.left = `calc(${98}% - ${innerContainerWidth}px)`;
            this.host.style.bottom = `calc(${33}% + ${computedHeight}px)`;
        }
        if (this.anchor === 'top') {
            this.host.style.left = `calc(${50}% - ${innerContainerWidth / 2}px )`;
            this.host.style.bottom = `calc(${92}% - ${innerContainerHeight}px)`;
        }
        if (this.anchor === 'bottom') {
            this.host.style.left = `calc(${50}% - ${innerContainerWidth / 2}px )`;
            this.host.style.bottom = `calc(${2}% + ${computedHeight}px)`;
        }

        if (this.anchor === 'bottom-left') {
            this.host.style.left = `${2}%`;
            this.host.style.bottom = `calc(${2}% + ${computedHeight}px)`;
        }
        if (this.anchor === 'bottom-right') {
            this.host.style.left = `calc(${98}% - ${innerContainerWidth}px)`;
            this.host.style.bottom = `calc(${2}% + ${computedHeight}px)`;
        }
        if (this.anchor === 'left-top') {
            this.host.style.left = `${2}%`;
            this.host.style.bottom = `calc(${92}% - ${innerContainerHeight}px - ${computedHeight}px)`;
        }
        if (this.anchor === 'right-top') {
            this.host.style.left = `calc(${98}% - ${innerContainerWidth}px)`;
            this.host.style.bottom = `calc(${92}% - ${innerContainerHeight}px - ${computedHeight}px)`;
        }

    }

    /**
     * recalculate X position for the snackbar (see @HostListener)
     */
    private setNewWidth(): void {
        const { innerContainerWidth } = this.computePosition();

        if (this.anchor === 'top' || this.anchor === 'bottom') {
            this.elementRef.nativeElement.style.left = `calc(${50}% - ${innerContainerWidth / 2}px )`;
        }
    }

    /**
     * launch adapt animation (snackbar disposal trigger this method)
     * important note:
     * matrix retrieval is used instead of translate Y because using translateY in enter and adapt animation seems
     * to cause unexpected behavior (understand bug)
     * there is also a known bug, if you close a snackbar which share anchor and container with an other one created at the same moment
     * adaptation of the position will not be performed correctly, see demo for more information about how to avoid this behavior
     *
     * @param height
     */
    private launchAdaptAnimation(height: number): void {

        let direction = 1;
        if (this._alignments.top) {
            direction = -1;
        }

        const transform = window.getComputedStyle(this.host).transform;
        const sixthStr = transform.split(',').slice(-1).pop();
        const sixth = sixthStr && parseFloat(sixthStr) || 0;

        this.animate$.next({
            before: {
                transform: `${transform}`
            },
            after: {
                transform: `matrix(1,0,0,1,0,${sixth + ((height + this.marginTop) * direction)})`
            },
            duration: this.adaptAnimationDuration,
            easing: 'ease'
        } as IAnimation);
    }

    /**
     * launch enter animation (snackbar instanciation trigger this method)
     */
    private launchEnterAnimation(): void {
        let direction = -1;
        if (this._alignments.top) {
            direction = 1;
        }

        this.animate$.next({
            before: {
                opacity: '0',
                transform: `translateY(${direction * 200}%)`
            },
            after: {
                opacity: '1',
                transform: 'translateY(0)'
            },
            delay: this.delay,
            duration: this.enterAnimationDuration,
            easing: 'ease'
        } as IAnimation);
    }

    /**
     * launch leave animation (snackbar lifetime flow trigger this animation)
     */
    private launchLeaveAnimation(): void {
        this.animate$.next({
            before: {
                opacity: '1'
            },
            after: {
                opacity: '0'
            },
            duration: this.leaveAnimationDuration,
            easing: 'ease'
        } as IAnimation);
    }
}
