"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[398],{2718:(W,F,o)=>{o.d(F,{V:()=>B});var C=o(9841),t=o(4482),l=o(5797),O=o(3268),E=o(9635),T=o(3269);function v(...f){const p=(0,T.jO)(f);return p?(0,E.z)(v(...f),(0,O.Z)(p)):(0,t.e)((x,g)=>{(0,C.l)([x,...(0,l.k)(f)])(g)})}function B(...f){return v(...f)}},7802:(W,F,o)=>{o.d(F,{LD:()=>J,sQ:()=>N});var C=o(9808),t=o(5e3),l=o(3075),O=o(7423),E=o(5245),T=o(1636),v=o(2722),B=o(2718),f=o(4004),p=o(1135),x=o(7579),g=o(8505),$=o(1884),u=o(7331),M=o(5963),i=o(2181),d=o(8372),b=o(4326),m=o(9300),S=o(4968),R=o(5698),K=o(3191),P=o(9009);const V=["*"];function X(r,h){if(1&r&&t._UZ(0,"deja-color-fab",5),2&r){const a=h.index;t.Q6J("color",h.$implicit),t.uIk("index",a)}}function Y(r,h){if(1&r&&t._UZ(0,"deja-color-fab",6),2&r){const e=h.$implicit,a=h.index;t.Udp("transition-duration",100*a+"ms"),t.Q6J("color",e),t.uIk("index",a)}}function H(r,h){if(1&r){const e=t.EpF();t.TgZ(0,"div",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().resetDefaultColor()}),t.TgZ(1,"mat-icon"),t._uU(2,"undo"),t.qZA()()}if(2&r){const e=t.oxw();t.Udp("background-color",e._resetcolor.toHex()),t.xp6(1),t.Udp("color",e.getBestTextColor(e._resetcolor.toHex()))}}let Z=(()=>{class r extends T.yl{constructor(e){super(),this.element=e.nativeElement}set color(e){if(this._colorFab=e,e){const a=(c,y)=>{y?this.element.setAttribute(c,y.toString()):this.element.removeAttribute(c)};e.active$.pipe((0,v.R)(this.destroyed$)).subscribe(c=>a("active",c)),e.color$.pipe((0,B.V)(e.disabled$),(0,f.U)(([c,y])=>c&&y?c.grayScale:c),(0,v.R)(this.destroyed$)).subscribe(c=>this.element.style.backgroundColor=c?c.toHex():"")}}get tile(){return this._colorFab}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(t.SBq))},r.\u0275cmp=t.Xpm({type:r,selectors:[["deja-color-fab"]],inputs:{color:"color"},features:[t.qOj],ngContentSelectors:V,decls:1,vars:0,template:function(e,a){1&e&&(t.F$t(),t.Hsn(0))},styles:["[_nghost-%COMP%]{border-radius:50%;cursor:pointer;transition:all linear .2s;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:space-around;margin:.45rem}[small][_nghost-%COMP%]{width:1.65rem;height:1.65rem;margin:.3rem}[active][_nghost-%COMP%]{transform:scale(1.4);transition:transform linear .2s!important}"]}),r})();class w{constructor(h,e=!1,a=!1){this._color=h,this._disabled=e,this._active=a,this.color$=new p.X(h),this.disabled$=new p.X(e),this.active$=new p.X(a)}set color(h){this.color$.next(this._color=h)}get color(){return this._color}set disabled(h){this.disabled$.next(this._disabled=h)}get disabled(){return this._disabled}set active(h){this.active$.next(this._active=h)}get active(){return this._active}}let J=(()=>{class r{constructor(e,a){this.control=a,this.colorhover=new t.vpe,this.destroyed$=new x.x,this._colors$=new p.X([]),this._resetcolor$=new p.X(null),this._colorFabs=[],this._subColorFabs=[],this._selectedBaseIndex=0,this._disabled=!1,this.selectedBaseIndex$=new p.X(0),this.selectedSubIndex$=new p.X(0),this.hilightedBaseIndex$=new x.x,this.hilightedSubIndex$=new x.x,this.onTouchedCallback=()=>{},this.onChangeCallback=s=>{};const c=e.nativeElement;this.control&&(this.control.valueAccessor=this),this._colorFabs$=this._colors$.pipe((0,f.U)(s=>s.map((n,_)=>new w(n,this._disabled,_===this._selectedBaseIndex))),(0,g.b)(s=>this._colorFabs=s)),this._colors$.pipe((0,B.V)(this._resetcolor$),(0,v.R)(this.destroyed$)).subscribe(([s,n])=>{if(!s||!s.length||!n)return void(this._resetcolor=void 0);let D;s.reduce((I,j)=>{const U=j;return U.subColors?I=[...I,...U.subColors]:I.push(j),I},[]).reduce((I,j)=>{const U=.3*Math.abs(j.r-n.r)+.4*Math.abs(j.g-n.g)+.25*Math.abs(j.b-n.b);return U<I?(D=j,U):I},765),this._resetcolor=D});const y=this.hilightedBaseIndex$.pipe((0,$.x)(),(0,u.D)(s=>(0,M.H)(void 0!==s?100:1e3)),(0,g.b)(s=>{var n,_;this.hilightedBaseIndex=s;const D=new CustomEvent("ColorEvent",{});D.color=s?null===(_=null===(n=this._colorFabs)||void 0===n?void 0:n[s])||void 0===_?void 0:_.color:this.value,this.colorhover.emit(D)}),(0,f.U)(s=>void 0!==s?s:this._selectedBaseIndex||0)),k=this.selectedBaseIndex$.pipe((0,g.b)(s=>this._selectedBaseIndex=s));this._subColorFabs$=y.pipe((0,i.b)(k),(0,$.x)(),(0,g.b)(s=>{this._colorFabs&&this._colorFabs.forEach((n,_)=>n.active=_===s)}),(0,d.b)(100),(0,g.b)(()=>c.setAttribute("sub-tr","")),(0,f.U)(s=>{var n;return(null===(n=this._colorFabs)||void 0===n?void 0:n[s])&&this._colorFabs[s].color.subColors}),(0,f.U)(s=>null==s?void 0:s.map((n,_)=>new w(n,this._disabled,_===this._selectedSubIndex))),(0,g.b)(s=>this._subColorFabs=s)),this._subColorFabs$.pipe((0,b.g)(100),(0,v.R)(this.destroyed$)).subscribe(()=>c.removeAttribute("sub-tr"));const A=this.hilightedSubIndex$.pipe((0,$.x)(),(0,u.D)(s=>(0,M.H)(void 0!==s?200:1100)),(0,g.b)(s=>{var n,_;this.hilightedSubIndex=s;const D=new CustomEvent("ColorEvent",{});D.color=void 0!==s?null===(_=null===(n=this._subColorFabs)||void 0===n?void 0:n[s])||void 0===_?void 0:_.color:this.value,this.colorhover.emit(D)}),(0,f.U)(s=>void 0!==s?s:this._selectedSubIndex||0)),L=this.selectedSubIndex$.pipe((0,$.x)(),(0,g.b)(s=>this._selectedSubIndex=s));A.pipe((0,i.b)(L),(0,m.h)(()=>!!this._subColorFabs),(0,v.R)(this.destroyed$)).subscribe(s=>this._subColorFabs.forEach((n,_)=>n.active=_===s)),(0,S.R)(c,"mousemove").pipe((0,m.h)(()=>!this._disabled),(0,v.R)(this.destroyed$)).subscribe(s=>{const n=s.target,_=n.attributes[r.INDEX_ATTRIBUTE];n.hasAttribute("basecolor")?(this.hilightedBaseIndex$.next(+_.value),this.hilightedSubIndex$.next(this.hilightedSubIndex)):n.hasAttribute("subcolor")?(this.hilightedBaseIndex$.next(this.hilightedBaseIndex),this.hilightedSubIndex$.next(+_.value)):(this.hilightedBaseIndex$.next(void 0),this.hilightedSubIndex$.next(void 0))}),(0,S.R)(c,"click").pipe((0,m.h)(()=>!this._disabled),(0,v.R)(this.destroyed$)).subscribe(s=>{const n=s.target;(n.hasAttribute("basecolor")||n.hasAttribute("subcolor"))&&(this.value=P.Il.parse(n.style.backgroundColor))})}get subColorFabs(){return this._subColorFabs}get subColorFabs$(){return this._subColorFabs$}get colorFabs$(){return this._colorFabs$}set resetcolor(e){""===e&&(e=new P.Il);const a=e&&("string"==typeof e?P.Il.parse(e):e);this._resetcolor$.next(a||null)}set disabled(e){const a=(0,K.Ig)(e);this._colorFabs&&this._colorFabs.forEach(c=>c.disabled=a),this._subColorFabs&&this._subColorFabs.forEach(c=>c.disabled=a),this._disabled=a||null}get disabled(){return this._disabled}getBestTextColor(e){return P.Il.fromHex(e).bestTextColor.toHex()}resetDefaultColor(){this.value=this._resetcolor}set colors(e){this._colors$.next(e||[]),this.selectedBaseIndex$.next(0)}set selectedColor(e){const a=c=>{(0,M.H)(1).pipe((0,R.q)(1),(0,v.R)(this.destroyed$)).subscribe(()=>this.selectedSubIndex$.next(c))};this._colorFabs&&(this._colorFabs.find((y,k)=>{var A;const L=y.color,s=null===(A=L.subColors)||void 0===A?void 0:A.findIndex(n=>P.Il.equals(n,e));return void 0!==s&&s>=0?(this.selectedBaseIndex$.next(k),a(s),!0):!!P.Il.equals(L,e)&&(this.selectedBaseIndex$.next(k),a(0),!0)})||(this.selectedBaseIndex$.next(0),a(0)))}set value(e){P.Il.equals(e,this._value)||(this.writeValue(e),this.onChangeCallback(e))}get value(){return this._value}writeValue(e){this._value=e,this.selectedColor=e}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.unsubscribe()}}return r.INDEX_ATTRIBUTE="index",r.\u0275fac=function(e){return new(e||r)(t.Y36(t.SBq),t.Y36(l.a5,10))},r.\u0275cmp=t.Xpm({type:r,selectors:[["deja-color-selector"]],inputs:{resetcolor:"resetcolor",disabled:"disabled",colors:"colors"},outputs:{colorhover:"colorhover"},decls:7,vars:7,consts:[["id","basecolors",1,"colors-wrapper"],["basecolor","","small","",3,"color",4,"ngFor","ngForOf"],["id","subcolors",1,"colors-wrapper"],["subcolor","",3,"transition-duration","color",4,"ngFor","ngForOf"],["id","reset",3,"background-color","click",4,"ngIf"],["basecolor","","small","",3,"color"],["subcolor","",3,"color"],["id","reset",3,"click"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0),t.YNc(1,X,1,2,"deja-color-fab",1),t.ALo(2,"async"),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,Y,1,4,"deja-color-fab",3),t.ALo(5,"async"),t.qZA(),t.YNc(6,H,3,4,"div",4)),2&e&&(t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,3,a.colorFabs$)),t.xp6(3),t.Q6J("ngForOf",t.lcZ(5,5,a.subColorFabs$)),t.xp6(2),t.Q6J("ngIf",!!a._resetcolor))},directives:[Z,E.Hw,C.sg,C.O5],pipes:[C.Ov],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .colors-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center;flex-wrap:wrap;margin:1rem .5rem}[_nghost-%COMP%]   .colors-wrapper[_ngcontent-%COMP%]   deja-color-fab[_ngcontent-%COMP%]{float:left}[_nghost-%COMP%]   .colors-wrapper[_ngcontent-%COMP%]   #subcolors[_ngcontent-%COMP%]   deja-color-fab[_ngcontent-%COMP%]{opacity:1}[sub-tr][_nghost-%COMP%]   #subcolors.colors-wrapper[_ngcontent-%COMP%]   deja-color-fab[_ngcontent-%COMP%]{opacity:0;transform:scale(0)}[_nghost-%COMP%]   #reset[_ngcontent-%COMP%]{padding:.5rem 0;cursor:pointer;text-align:center}"]}),r})(),N=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[C.ez,l.u5,O.ot,E.Ps]]}),r})()},1802:(W,F,o)=>{o.d(F,{j:()=>g,x:()=>$});var C=o(1314),t=o(9808),l=o(5e3),O=o(1636),E=o(3191),T=o(2529),v=o(2722),B=o(5963),f=o(5698);function p(u,M){1&u&&l.Hsn(0)}const x=["*"];let g=(()=>{class u extends O.yl{constructor(i,d,b,m){super(),this.changeDetectorRef=i,this.elementRef=d,this.overlayContainer=b,this.overlayBackdropClass="cdk-overlay-transparent-backdrop",this.visibleChange=new l.vpe,this.closed=new l.vpe,this.overlayOffsetX=0,this.overlayOffsetY=0,this._isVisible=!1,this._hasBackdrop=!0,this._width=null,this._widthForMobile="100%",this._positions=O.Gg.default,this._isMobile=!1,this.disableMediaService=!1,this.overlayContainer.getContainerElement().addEventListener("contextmenu",R=>(R.preventDefault(),!1)),m.isMobile$.pipe((0,T.o)(()=>!this.disableMediaService),(0,v.R)(this.destroyed$)).subscribe(R=>{this._isMobile=R,this.updateOriginOverlay(),this.changeDetectorRef.markForCheck()})}get isVisible(){return this._isVisible}set isVisible(i){const d=(0,E.Ig)(i);if(this._isVisible!==d){this._isVisible=d;const b=this.overlayContainer.getContainerElement();b.className=Array.from(b.classList).filter(m=>m.startsWith("cdk")).join(" "),b.classList.add("deja-overlay-container"),this.isVisible&&this.overlayContainerClass&&this.overlayContainerClass.split(" ").forEach(m=>{b.classList.add(m)}),this.changeDetectorRef.markForCheck(),this.visibleChange.emit(this._isVisible)}}set hasBackdrop(i){this._hasBackdrop=(0,E.Ig)(i)}get hasBackdrop(){return this._hasBackdrop}set ownerElement(i){this._ownerElement=i,this.updateOriginOverlay()}get positionPairs(){return this.positions}get positions(){return this.isMobile?this._positionsForMobile?this._positionsForMobile:O.Gg.parse("start top start top"):this._positions}set positions(i){this._positions="string"==typeof i?O.Gg.parse(i):i}set positionsForMobile(i){this._positionsForMobile="string"==typeof i?O.Gg.parse(i):i}get isMobile(){return this._isMobile}set isMobile(i){this._isMobile=(0,E.Ig)(i),this.updateOriginOverlay(),this.disableMediaService=!0}get width(){return this._width}set width(i){this._width=(0,E.su)(i)}get widthForMobile(){return this._widthForMobile}set widthForMobile(i){this._widthForMobile=i}get overlayWidth(){return this.isMobile?this._widthForMobile:this._width}updatePosition(){var i,d;null===(d=null===(i=this.overlay)||void 0===i?void 0:i.overlayRef)||void 0===d||d.updatePosition()}show(i,d){this.overlayOffsetX=void 0!==d?+i:0,this.overlayOffsetY=d||0,this.overlayOrigin=new C.xu(new l.SBq(this.isMobile&&document.body||(null==i?void 0:i.target)||this.ownerElement||this.elementRef.nativeElement)),this.isVisible=!0,this.changeDetectorRef.markForCheck(),(0,B.H)(1).pipe((0,f.q)(1),(0,v.R)(this.destroyed$)).subscribe(()=>this.updatePosition())}close(){this.isVisible=!1,this.closed.emit(!0),this.changeDetectorRef.markForCheck()}updateOriginOverlay(){this.overlayOrigin=new C.xu(new l.SBq(this.isMobile&&document.body||this._ownerElement||this.elementRef.nativeElement))}}return u.\u0275fac=function(i){return new(i||u)(l.Y36(l.sBO),l.Y36(l.SBq),l.Y36(C.Xj),l.Y36(O.yJ))},u.\u0275cmp=l.Xpm({type:u,selectors:[["deja-overlay"]],viewQuery:function(i,d){if(1&i&&l.Gf(C.pI,7),2&i){let b;l.iGM(b=l.CRH())&&(d.overlay=b.first)}},inputs:{overlayBackdropClass:"overlayBackdropClass",overlayContainerClass:"overlayContainerClass",overlayOffsetX:"overlayOffsetX",overlayOffsetY:"overlayOffsetY",isVisible:"isVisible",hasBackdrop:"hasBackdrop",ownerElement:"ownerElement",positions:"positions",positionsForMobile:"positionsForMobile",isMobile:"isMobile",width:"width",widthForMobile:"widthForMobile"},outputs:{visibleChange:"visibleChange",closed:"closed"},features:[l.qOj],ngContentSelectors:x,decls:2,vars:8,consts:[["cdk-connected-overlay","",3,"cdkConnectedOverlayHasBackdrop","cdkConnectedOverlayBackdropClass","cdkConnectedOverlayOpen","cdkConnectedOverlayOffsetY","cdkConnectedOverlayOffsetX","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","backdropClick","detach"],["overlayCmp",""]],template:function(i,d){1&i&&(l.F$t(),l.YNc(0,p,1,0,"ng-template",0,1,l.W1O),l.NdJ("backdropClick",function(){return d.close()})("detach",function(){return d.close()})),2&i&&l.Q6J("cdkConnectedOverlayHasBackdrop",d.hasBackdrop)("cdkConnectedOverlayBackdropClass",d.overlayBackdropClass)("cdkConnectedOverlayOpen",!!d.isVisible)("cdkConnectedOverlayOffsetY",d.overlayOffsetY)("cdkConnectedOverlayOffsetX",d.overlayOffsetX)("cdkConnectedOverlayOrigin",d.overlayOrigin)("cdkConnectedOverlayPositions",d.positionPairs)("cdkConnectedOverlayWidth",d.overlayWidth)},directives:[C.pI],styles:["@media print{.deja-overlay-container{display:none}}\n"],encapsulation:2,changeDetection:0}),u})(),$=(()=>{class u{}return u.\u0275fac=function(i){return new(i||u)},u.\u0275mod=l.oAB({type:u}),u.\u0275inj=l.cJS({imports:[[t.ez,O.cO,C.U8]]}),u})()}}]);