/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

 /**
 * Licensed under MIT https://github.com/rd-dev-ukraine/angular-io-slimscroll/blob/master/LICENSE
 */

import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

interface SlimScrollOptions {
    // width in pixels of the visible scroll area
    width: string;

    // height in pixels of the visible scroll area
    height: string;

    // width in pixels of the scrollbar and rail
    size: string;

    // scrollbar color, accepts any hex/color value
    color: string;

    // scrollbar position - left/right
    position: string;

    // distance in pixels between the side edge and the scrollbar
    distance: string;

    // default scroll position on load - top / bottom
    start: string;

    // sets scrollbar opacity
    opacity: number;

    // set transition for opacity
    transition: number;

    // enables always-on mode for the scrollbar
    alwaysVisible: boolean;

    // check if we should hide the scrollbar when user is hovering over
    disableFadeOut: boolean;

    // sets visibility of the rail
    railVisible: boolean;

    // sets rail color
    railColor: string;

    // sets rail opacity
    railOpacity: number;

    // defautlt CSS class of the slimscroll rail
    railClass: string;

    // defautlt CSS class of the slimscroll bar
    barClass: string;

    // defautlt CSS class of the slimscroll wrapper
    wrapperClass: string;

    // check if mousewheel should scroll the window if we reach top/bottom
    allowPageScroll: boolean;

    // scroll amount applied to each mouse wheel step
    wheelStep: number;

    // scroll amount applied when user is using gestures
    touchScrollStep: number;

    // sets border radius
    borderRadius: string;

    // sets border radius of the rail
    railBorderRadius: string;

    // set default point from which to start scrolling
    scrollTo: number;

    // auto scroll to bottom when content was added
    autoScrollToBottom: boolean;
}

const defaults: SlimScrollOptions = {
    width: 'auto',
    height: '100%',
    size: '7px',
    color: '#000',
    position: 'right',
    distance: '1px',
    start: 'top',
    opacity: 0.4,
    transition: 0.3,
    alwaysVisible: false,
    disableFadeOut: false,
    railVisible: false,
    railColor: '#333',
    railOpacity: 0.2,
    railClass: 'slimScrollRail',
    barClass: 'slimScrollBar',
    wrapperClass: 'slimScrollDiv',
    allowPageScroll: false,
    wheelStep: 20,
    touchScrollStep: 200,
    borderRadius: '7px',
    railBorderRadius: '7px',
    scrollTo: 0,
    autoScrollToBottom: false
};

@Directive({
    selector: '[slimScroll]'
})
export class DejaSlimScrollDirective implements OnInit, OnDestroy {
    private _me: HTMLElement;
    private _bar: HTMLDivElement;
    private _rail: HTMLDivElement;
    private _isOverPanel: boolean;
    private _isOverBar: boolean;
    private _isDragg: boolean;
    private _touchDif: number;
    private _barHeight: number;
    private _percentScroll: number;
    private _lastScroll: number;
    private _minBarHeight = 30;
    private _releaseScroll = false;
    private _options: SlimScrollOptions;
    private _previousHeight: number;
    private _queueHide: number;
    private _changesTracker: number;

    public constructor(private _renderer: Renderer2,
        elementRef: ElementRef) {
        this._me = elementRef.nativeElement;
        this._options = { ...defaults };
    }

    public ngOnInit(): void {
        this.init();
    }

    public ngOnDestroy(): void {
        if (this._changesTracker) {
            clearInterval(this._changesTracker);
        }
    }

    @HostListener('window:resize', ['$event'])
    public onResize(): void {
        this.init();
    }

    @Input()
    public set width(value: string) {
        this._options.width = value || defaults.width;
    }

    @Input()
    public set height(value: string) {
        this._options.height = value || defaults.height;
    }

    @Input()
    public set size(value: string) {
        this._options.size = value || defaults.size;
    }

    @Input()
    public set color(value: string) {
        this._options.color = value || defaults.color;
    }

    @Input()
    public set position(value: string) {
        this._options.position = value || defaults.position;
    }

    @Input()
    public set distance(value: string) {
        this._options.distance = value || defaults.distance;
    }

    @Input()
    public set start(value: string) {
        this._options.start = value || defaults.start;
    }

    @Input()
    public set opacity(value: number) {
        this._options.opacity = value || defaults.opacity;
    }

    @Input()
    public set transition(value: number) {
        this._options.transition = value || defaults.transition;
    }

    @Input()
    public set alwaysVisible(value: boolean) {
        this._options.alwaysVisible = value || defaults.alwaysVisible;
    }

    @Input()
    public set disableFadeOut(value: boolean) {
        this._options.disableFadeOut = value || defaults.disableFadeOut;
    }

    @Input()
    public set railVisible(value: boolean) {
        this._options.railVisible = value || defaults.railVisible;
    }

    @Input()
    public set railColor(value: string) {
        this._options.railColor = value || defaults.railColor;
    }

    @Input()
    public set railOpacity(value: number) {
        this._options.railOpacity = value || defaults.railOpacity;
    }

    @Input()
    public set railClass(value: string) {
        this._options.railClass = value || defaults.railClass;
    }

    @Input()
    public set barClass(value: string) {
        this._options.barClass = value || defaults.barClass;
    }

    @Input()
    public set wrapperClass(value: string) {
        this._options.wrapperClass = value || defaults.wrapperClass;
    }

    @Input()
    public set allowPageScroll(value: boolean) {
        this._options.allowPageScroll = value || defaults.allowPageScroll;
    }

    @Input()
    public set wheelStep(value: number) {
        this._options.wheelStep = value || defaults.wheelStep;
    }

    @Input()
    public set touchScrollStep(value: number) {
        this._options.touchScrollStep = value || defaults.touchScrollStep;
    }

    @Input()
    public set borderRadius(value: string) {
        this._options.borderRadius = value || defaults.borderRadius;
    }

    @Input()
    public set railBorderRadius(value: string) {
        this._options.railBorderRadius = value || defaults.railBorderRadius;
    }

    @Input()
    public set scrollTo(value: number) {
        this._options.scrollTo = value || defaults.scrollTo;
    }

    @Input()
    public set autoScrollToBottom(value: boolean) {
        this._options.autoScrollToBottom = value || defaults.autoScrollToBottom;
    }

    private init(): void {
        // ensure we are not binding it again
        if (this._bar && this._rail) {
            this.refresh();
        } else {
            this.setup();
        }
    }

    private trackPanelHeightChanged(): void {
        this._previousHeight = this._me.scrollHeight;

        this._changesTracker = window.setInterval(() => {
            if (this._previousHeight !== this._me.scrollHeight) {
                this._previousHeight = this._me.scrollHeight;

                this.init();

                if (this._options.autoScrollToBottom) {
                    this._renderer.setStyle(this._bar, 'top', `${this._me.offsetHeight - this._bar.offsetHeight}px`);
                    this.scrollContent(0, true);
                }
            }
        }, 1000);
    }

    private hasParentClass(e: HTMLElement, className: string): boolean {
        if (!e) {
            return false;
        }

        if (e.classList.contains(this._options.wrapperClass)) {
            return true;
        }

        return this.hasParentClass(e.parentElement, className);
    }

    private onWheel(e: MouseWheelEvent): void {
        // use mouse wheel only when mouse is over
        if (!this._isOverPanel) {
            return;
        }

        let delta = 0;
        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
        }
        if (e.detail) {
            delta = e.detail / 3;
        }

        const target = (e.target || e.currentTarget || e.relatedTarget) as HTMLElement;
        if (this.hasParentClass(target, this._options.wrapperClass)) {
            // scroll content
            this.scrollContent(delta, true);
        }

        // stop window scroll
        if (e.preventDefault && !this._releaseScroll) {
            e.preventDefault();
        }
        if (!this._releaseScroll) {
            e.returnValue = false;
        }
    }

    private attachWheel(target: Window): void {
        if (window.addEventListener) {
            target.addEventListener('DOMMouseScroll', (e: WheelEvent) => this.onWheel(e), false);
            target.addEventListener('mousewheel', (e: WheelEvent) => this.onWheel(e), false);
        } else {
            document.addEventListener('mousewheel', (e: WheelEvent) => this.onWheel(e), false);
        }
    }

    private showBar(): void {
        // recalculate bar height
        this.getBarHeight();
        clearTimeout(this._queueHide);

        // when bar reached top or bottom
        // tslint:disable-next-line:no-bitwise
        if (this._percentScroll === ~~this._percentScroll) {
            // release wheel
            this._releaseScroll = this._options.allowPageScroll;
        } else {
            this._releaseScroll = false;
        }

        this._lastScroll = this._percentScroll;

        // show only when required
        if (this._barHeight >= this._me.offsetHeight) {
            // allow window scroll
            this._releaseScroll = true;
            return;
        }

        this._renderer.setStyle(this._bar, 'opacity', this._options.opacity.toString());
        this._renderer.setStyle(this._rail, 'opacity', this._options.railOpacity.toString());
    }

    private hideBar(): void {
        // only hide when options allow it
        if (!this._options.alwaysVisible) {
            this._queueHide = window.setTimeout(() => {
                if (!(this._options.disableFadeOut && this._isOverPanel) && !this._isOverBar && !this._isDragg) {
                    this._renderer.setStyle(this._bar, 'opacity', '0');
                    this._renderer.setStyle(this._rail, 'opacity', '0');
                }
            }, 1000);
        }
    }

    private scrollContent(y: number, isWheel: boolean, isJump = false): void {
        this._releaseScroll = false;
        let delta: number = y;
        const maxTop: number = this._me.offsetHeight - this._bar.offsetHeight;

        if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(this._bar.style.top, 10) + y * this._options.wheelStep / 100 * this._bar.offsetHeight;

            // move bar, make sure it doesn"t go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn"t rounded away when the scrollbar"s CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            this._renderer.setStyle(this._bar, 'top', `${delta}px`);
        }

        // calculate actual scroll amount
        this._percentScroll = parseInt(this._bar.style.top, 10) / (this._me.offsetHeight - this._bar.offsetHeight);
        delta = this._percentScroll * (this._me.scrollHeight - this._me.offsetHeight);

        if (isJump) {
            delta = y;
            let offsetTop = delta / this._me.scrollHeight * this._me.offsetHeight;
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            this._renderer.setStyle(this._bar, 'top', `${offsetTop}px`);
        }

        // scroll content
        this._me.scrollTop = delta;

        // ensure bar is visible
        this.showBar();

        // trigger hide when scroll is stopped
        this.hideBar();
    }

    private getBarHeight(): void {
        // calculate scrollbar height and make sure it is not too small
        this._barHeight = Math.max(this._me.offsetHeight / (this._me.scrollHeight === 0 ? 1 : this._me.scrollHeight) * this._me.offsetHeight, this._minBarHeight);
        this._renderer.setStyle(this._bar, 'height', `${this._barHeight}px`);

        // hide scrollbar if content is not long enough
        const display = this._barHeight === this._me.offsetHeight ? 'none' : 'block';
        this._renderer.setStyle(this._bar, 'display', display);
    }

    private refresh(): void {
        this.getBarHeight();

        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
        if ('height' in this._options && this._options.height === 'auto') {
            this._renderer.setStyle(this._me.parentElement, 'height', 'auto');
            this._renderer.setStyle(this._me, 'height', 'auto');
            const height = this._me.parentElement.clientHeight;
            this._renderer.setStyle(this._me.parentElement, 'height', `${height}px`);
            this._renderer.setStyle(this._me, 'height', `${height}px`);
        } else if ('height' in this._options) {
            const h = this._options.height;
            this._renderer.setStyle(this._me.parentElement, 'height', h);
            this._renderer.setStyle(this._me, 'height', h);
        }

    }

    private setup(): void {
        // wrap content
        const wrapper = document.createElement('div');
        this._renderer.addClass(wrapper, this._options.wrapperClass);
        this._renderer.setStyle(wrapper, 'position', 'relative');
        this._renderer.setStyle(wrapper, 'overflow', 'hidden');
        this._renderer.setStyle(wrapper, 'width', this._options.width);
        this._renderer.setStyle(wrapper, 'height', this._options.height);

        // update style for the div
        this._renderer.setStyle(this._me, 'overflow', 'hidden');
        this._renderer.setStyle(this._me, 'width', this._options.width);
        this._renderer.setStyle(this._me, 'height', this._options.height);

        // create scrollbar rail
        this._rail = document.createElement('div');
        this._renderer.addClass(this._rail, this._options.railClass);
        this._renderer.setStyle(this._rail, 'width', this._options.size);
        this._renderer.setStyle(this._rail, 'height', '100%');
        this._renderer.setStyle(this._rail, 'position', 'absolute');
        this._renderer.setStyle(this._rail, 'top', '0');
        this._renderer.setStyle(this._rail, 'display', this._options.railVisible ? 'block' : 'none');
        this._renderer.setStyle(this._rail, 'border-radius', this._options.railBorderRadius);
        this._renderer.setStyle(this._rail, 'background', this._options.railColor);
        this._renderer.setStyle(this._rail, 'opacity', this._options.railOpacity.toString());
        this._renderer.setStyle(this._rail, 'transition', `opacity ${this._options.transition}s`);
        this._renderer.setStyle(this._rail, 'z-index', '90');

        // create scrollbar
        this._bar = document.createElement('div');
        this._renderer.addClass(this._bar, this._options.barClass);
        this._renderer.setStyle(this._bar, 'background', this._options.color);
        this._renderer.setStyle(this._bar, 'width', this._options.size);
        this._renderer.setStyle(this._bar, 'position', 'absolute');
        this._renderer.setStyle(this._bar, 'top', '0');
        this._renderer.setStyle(this._bar, 'opacity', this._options.opacity.toString());
        this._renderer.setStyle(this._bar, 'transition', `opacity ${this._options.transition}s`);
        this._renderer.setStyle(this._bar, 'display', this._options.alwaysVisible ? 'block' : 'none');
        this._renderer.setStyle(this._bar, 'border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'webkit-border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'moz-border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'z-index', '99');

        // set position
        if (this._options.position === 'right') {
            this._renderer.setStyle(this._rail, 'right', this._options.distance);
            this._renderer.setStyle(this._bar, 'right', this._options.distance);
        } else {
            this._renderer.setStyle(this._rail, 'left', this._options.distance);
            this._renderer.setStyle(this._bar, 'left', this._options.distance);
        }

        // wrap it
        this._me.parentElement.insertBefore(wrapper, this._me);
        wrapper.appendChild(this._me);

        if (this._options.scrollTo > 0) {
            // jump to a static point
            const offset = this._options.scrollTo;
            // scroll content by the given offset
            this.scrollContent(offset, false, true);
        }

        // append to parent div
        this._me.parentElement.appendChild(this._bar);
        this._me.parentElement.appendChild(this._rail);

        this._bar.addEventListener('mousedown', e => {
            this._isDragg = true;

            // disable text selection
            this._renderer.setStyle(document.querySelector('body'), '-webkit-user-select', 'none');
            this._renderer.setStyle(document.querySelector('body'), '-moz-user-select', 'none');
            this._renderer.setStyle(document.querySelector('body'), '-ms-user-select', 'none');
            this._renderer.setStyle(document.querySelector('body'), 'user-select', 'none');

            const t = parseFloat(this._bar.style.top);
            const pageY = e.pageY;

            const mousemoveEvent = (event: MouseEvent) => {
                const currTop = t + event.pageY - pageY;
                this._renderer.setStyle(this._bar, 'top', `${(currTop >= 0 ? currTop : 0)}px`);
                const position = this._bar.getClientRects()[0];
                if (position) {
                    this.scrollContent(0, position.top > 0);
                }
            };

            const mouseupEvent = () => {
                this._isDragg = false;

                // return normal text selection
                this._renderer.setStyle(document.querySelector('body'), '-webkit-user-select', 'initial');
                this._renderer.setStyle(document.querySelector('body'), '-moz-user-select', 'initial');
                this._renderer.setStyle(document.querySelector('body'), '-ms-user-select', 'initial');
                this._renderer.setStyle(document.querySelector('body'), 'user-select', 'initial');

                this.hideBar();

                document.removeEventListener('mousemove', mousemoveEvent, false);
                document.removeEventListener('mouseup', mouseupEvent, false);
            };

            document.addEventListener('mousemove', mousemoveEvent, false);
            document.addEventListener('mouseup', mouseupEvent, false);

            return false;
        }, false);

        // on rail over
        this._rail.addEventListener('mouseenter', () => this.showBar(), false);
        this._rail.addEventListener('mouseleave', () => this.hideBar(), false);

        // on bar over
        this._bar.addEventListener('mouseenter', () => this._isOverBar = true, false);
        this._bar.addEventListener('mouseleave', () => this._isOverBar = false, false);

        // show on parent mouseover
        this._me.addEventListener('mouseenter', () => {
            this._isOverPanel = true;
            this.showBar();
            this.hideBar();
        }, false);
        this._me.addEventListener('mouseleave', () => {
            this._isOverPanel = false;
            this.hideBar();
        }, false);

        // support for mobile
        this._me.addEventListener('touchstart', e => {
            if (e.touches.length) {
                // record where touch started
                this._touchDif = e.touches[0].pageY;
            }
        }, false);

        this._me.addEventListener('touchmove', e => {
            // prevent scrolling the page if necessary
            if (!this._releaseScroll) {
                e.preventDefault();
            }
            if (e.touches.length) {
                // see how far user swiped
                const diff = (this._touchDif - e.touches[0].pageY) / this._options.touchScrollStep;
                // scroll content
                this.scrollContent(diff, true);
                this._touchDif = e.touches[0].pageY;
            }
        }, false);
        // set up initial height
        this.getBarHeight();

        // hide bar on init if alwaysVisible equal false
        this.hideBar();

        // check start position
        if (this._options.start === 'bottom') {
            // scroll content to bottom
            this._renderer.setStyle(this._bar, 'top', `${this._me.offsetHeight - this._bar.offsetHeight}px`);
            this.scrollContent(0, true);
        }

        // attach scroll events
        this.attachWheel(window);

        // check whether it changes in content
        this.trackPanelHeightChanged();
    }
}
