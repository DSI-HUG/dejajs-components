"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[592],{9876:(x,f,e)=>{e.d(f,{M:()=>E});var o=e(348),t=e(3668),m=e(9133),a=e(6019),r=e(3660);const c=["itemTemplate"],u=["insertTemplate"];function O(h,M){}const I=function(h,M){return{$implicit:h,index:M}};function P(h,M){if(1&h&&(t.TgZ(0,"span"),t.YNc(1,O,0,0,"ng-template",6),t.qZA()),2&h){const n=t.oxw(),p=n.$implicit,y=n.index,l=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",l.itemTemplate)("ngTemplateOutletContext",t.WLB(2,I,p,y))}}function T(h,M){if(1&h&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&h){const n=t.oxw().$implicit,p=t.oxw();t.xp6(1),t.Oqu(p.getTextValue(n))}}function _(h,M){if(1&h){const n=t.EpF();t.TgZ(0,"mat-icon",7),t.NdJ("click",function(y){t.CHM(n);const l=t.oxw(),D=l.$implicit,g=l.index;return t.oxw().onClose(y,D,g)}),t._uU(1,"close"),t.qZA()}}function C(h,M){if(1&h&&(t.TgZ(0,"span",2),t.YNc(1,P,2,5,"span",3),t.YNc(2,T,2,1,"ng-template",null,4,t.W1O),t.YNc(4,_,2,0,"mat-icon",5),t.qZA()),2&h){const n=t.MAs(3),p=t.oxw();t.xp6(1),t.Q6J("ngIf",p.itemTemplate)("ngIfElse",n),t.xp6(3),t.Q6J("ngIf",!p.readonly&&!p.disabled)}}function i(h,M){}const d=function(){return{}};function s(h,M){if(1&h&&(t.TgZ(0,"span",8),t.YNc(1,i,0,0,"ng-template",6),t.qZA()),2&h){const n=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",n.insertTemplate)("ngTemplateOutletContext",t.DdM(2,d))}}let E=(()=>{class h{constructor(n){this.control=n,this.close=new t.vpe,this._disabled=null,this._readonly=!1,this.onChangeCallback=p=>{},this.onTouchedCallback=()=>{},this.control&&(this.control.valueAccessor=this)}set readonly(n){this._readonly=(0,o.Ig)(n)||null}get readonly(){return this._readonly}set disabled(n){this._disabled=(0,o.Ig)(n)||null}get disabled(){return this._disabled}set items(n){this.writeValue(n)}get items(){return this._items}get itemTemplate(){return this.itemTemplateExternal||this.itemTemplateInternal}get insertTemplate(){return this.insertTemplateExternal||this.insertTemplateInternal}set value(n){this.writeValue(n),this.onChangeCallback(n)}get value(){return this._items}writeValue(n){this._items=n}registerOnChange(n){this.onChangeCallback=n}registerOnTouched(n){this.onTouchedCallback=n}setDisabledState(n){this.disabled=n}getTextValue(n){return n?this.textField&&n.model&&void 0!==n.model[this.textField]?n.model[this.textField]:this.textField&&void 0!==n[this.textField]?n[this.textField]:n.displayName?"string"==typeof n.displayName?n.displayName:n.displayName():"function"==typeof n.toString?n.toString():"":""}onClose(n,p,y){const l=new CustomEvent("DejaChipsCloseEvent",{});return l.item=p,l.index=y,this.items.splice(y,1),this.onChangeCallback(this.items),this.close.emit(l),n.stopPropagation(),!1}}return h.\u0275fac=function(n){return new(n||h)(t.Y36(m.a5,10))},h.\u0275cmp=t.Xpm({type:h,selectors:[["deja-chips"]],contentQueries:function(n,p,y){if(1&n&&(t.Suo(y,c,5),t.Suo(y,u,5)),2&n){let l;t.iGM(l=t.CRH())&&(p.itemTemplateInternal=l.first),t.iGM(l=t.CRH())&&(p.insertTemplateInternal=l.first)}},hostVars:1,hostBindings:function(n,p){2&n&&t.uIk("disabled",p._disabled)},inputs:{_items:"_items",textField:"textField",itemTemplateExternal:"itemTemplateExternal",insertTemplateExternal:"insertTemplateExternal",readonly:"readonly",disabled:"disabled",items:"items"},outputs:{close:"close"},decls:2,vars:2,consts:[["class","chips-item",4,"ngFor","ngForOf"],["class","insert-item",4,"ngIf"],[1,"chips-item"],[4,"ngIf","ngIfElse"],["caption",""],["id","close-button",3,"click",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["id","close-button",3,"click"],[1,"insert-item"]],template:function(n,p){1&n&&(t.YNc(0,C,5,3,"span",0),t.YNc(1,s,2,3,"span",1)),2&n&&(t.Q6J("ngForOf",p.items),t.xp6(1),t.Q6J("ngIf",p.insertTemplate))},directives:[a.sg,a.O5,a.tP,r.Hw],styles:["[_nghost-%COMP%]{margin:0;padding:0;overflow:hidden;display:flex;flex-wrap:wrap;align-items:center}[disabled][_nghost-%COMP%] > span.chips-item[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-style:italic}[_nghost-%COMP%] > span.insert-item[_ngcontent-%COMP%]{flex:1 1 auto}[_nghost-%COMP%] > span.chips-item[_ngcontent-%COMP%]{margin:.1rem;padding:.38rem;flex:0 0 auto;border-radius:.88rem;display:flex;align-items:center;text-decoration:none;transition:.3s;cursor:default}[_nghost-%COMP%] > span.chips-item[_ngcontent-%COMP%]   #close-button[_ngcontent-%COMP%]{zoom:72%;z-index:3;cursor:pointer}"]}),h})()},1880:(x,f,e)=>{e.d(f,{O:()=>r});var o=e(6019),t=e(9133),m=e(3660),a=e(3668);let r=(()=>{class c{}return c.\u0275fac=function(O){return new(O||c)},c.\u0275mod=a.oAB({type:c}),c.\u0275inj=a.cJS({imports:[[o.ez,t.u5,m.Ps]]}),c})()},7972:(x,f,e)=>{e.d(f,{_:()=>m});var o=e(3668),t=e(3660);let m=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275cmp=o.Xpm({type:a,selectors:[["deja-sort-indicator"]],inputs:{sortInfos:["sort-infos","sortInfos"]},decls:3,vars:1,template:function(c,u){1&c&&(o.TgZ(0,"span"),o.TgZ(1,"mat-icon"),o._uU(2,"arrow_upward"),o.qZA(),o.qZA()),2&c&&o.uIk("sortorder",u.sortInfos?u.sortInfos.order:null)},directives:[t.Hw],styles:['[_nghost-%COMP%]{display:block;position:relative;width:1rem}[_nghost-%COMP%]   [sortorder][_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{position:absolute;right:0;top:50%;transform:translateY(-50%);transition:all .5s linear;padding:.3rem;zoom:72%}[_nghost-%COMP%]   [sortorder="1"][_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(180deg)}']}),a})()},2570:(x,f,e)=>{e.d(f,{a:()=>I});var o=e(3668),t=e(4986),m=e(5077),a=e(461),r=e(6263);const c=["okaction"],u=["cancelaction"],O=["*"];let I=(()=>{class P extends t.yl{constructor(_){super(),this.closed=new o.vpe,(0,m.R)(_.nativeElement.ownerDocument,"keyup").pipe((0,a.h)(i=>{var d,s;return!(i.code!==t.mW.Enter||!(null===(d=this.okButton)||void 0===d?void 0:d._elementRef))||!(i.code!==t.mW.Escape||!(null===(s=this.cancelButton)||void 0===s?void 0:s._elementRef))}),(0,r.R)(this.destroyed$)).subscribe(i=>{i.code===t.mW.Enter?this.okButton._elementRef.nativeElement.click():i.code===t.mW.Escape&&this.cancelButton._elementRef.nativeElement.click()})}close(_){let C=!0,i=_.target;const d=_.currentTarget;for(;i.parentElement&&i!==d;)"dialog"===i.className&&(C=!1),i=i.parentElement;C&&(this.closed.emit(),_.preventDefault())}}return P.\u0275fac=function(_){return new(_||P)(o.Y36(o.SBq))},P.\u0275cmp=o.Xpm({type:P,selectors:[["deja-dialog"]],contentQueries:function(_,C,i){if(1&_&&(o.Suo(i,c,5),o.Suo(i,u,5)),2&_){let d;o.iGM(d=o.CRH())&&(C.okButton=d.first),o.iGM(d=o.CRH())&&(C.cancelButton=d.first)}},hostBindings:function(_,C){1&_&&o.NdJ("click",function(d){return C.close(d)})},outputs:{closed:"closed"},features:[o.qOj],ngContentSelectors:O,decls:2,vars:0,consts:[[1,"dialog"]],template:function(_,C){1&_&&(o.F$t(),o.TgZ(0,"div",0),o.Hsn(1),o.qZA())},styles:["[_nghost-%COMP%]{align-items:center;background-color:#0009;display:flex;height:100%;justify-content:center;left:0;position:fixed;top:0;width:100%;z-index:999}[_nghost-%COMP%]   .dialog[_ngcontent-%COMP%]{z-index:1000}"]}),P})()},4761:(x,f,e)=>{e.d(f,{W:()=>a});var o=e(6019),t=e(3668);e(2570);let a=(()=>{class r{}return r.\u0275fac=function(u){return new(u||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[o.ez]]}),r})()},2116:(x,f,e)=>{e.d(f,{u:()=>m});var o=e(6019),t=e(3668);let m=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[o.ez]]}),a})()},6706:(x,f,e)=>{e.d(f,{b:()=>t});var o=e(3668);let t=(()=>{class m{}return m.\u0275fac=function(r){return new(r||m)},m.\u0275cmp=o.Xpm({type:m,selectors:[["deja-list-loader"]],decls:4,vars:0,consts:[[1,"spinner"],[1,"bounce1"],[1,"bounce2"],[1,"bounce3"]],template:function(r,c){1&r&&(o.TgZ(0,"div",0),o._UZ(1,"div",1),o._UZ(2,"div",2),o._UZ(3,"div",3),o.qZA())},styles:["[_nghost-%COMP%]   .spinner[_ngcontent-%COMP%]{margin:40px auto 0;width:70px;text-align:center}[_nghost-%COMP%]   .spinner[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}[_nghost-%COMP%]   .spinner[_ngcontent-%COMP%]   .bounce1[_ngcontent-%COMP%]{-webkit-animation-delay:-.32s;animation-delay:-.32s}[_nghost-%COMP%]   .spinner[_ngcontent-%COMP%]   .bounce2[_ngcontent-%COMP%]{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}"]}),m})()},8177:(x,f,e)=>{e.d(f,{n:()=>a});var o=e(6019),t=e(3668);e(4337);let a=(()=>{class r{}return r.\u0275fac=function(u){return new(u||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[o.ez]]}),r})()},4337:(x,f,e)=>{e.d(f,{w:()=>T});var o=e(3668),t=e(4986),m=e(273),a=e(7384),r=e(8660),c=e(1092),u=e(9417),O=e(6263),I=e(9468);const P=["*"];let T=(()=>{class _ extends t.yl{constructor(i){super(),this.elementRef=i,this.onAnimationDone=new o.vpe,this.delay=0,this.duration=0,this.marginTop=6,this.timestamp=+new Date,this.enterAnimationDuration=350,this.leaveAnimationDuration=175,this.adaptAnimationDuration=225,this._alignments={},this.animate$=new m.x,_.INSTANCES||(_.INSTANCES=[]),_.INSTANCES.push(this);const d=s=>{Object.keys(s).forEach(E=>{this.host.style[E]=s[E]})};this.animate$sub=this.animate$.pipe((0,a.b)(s=>d(s.before)),(0,r.g)(1),(0,a.b)(s=>{this.host.style.transitionDuration=`${s.duration}ms`,this.host.style.transitionTimingFunction=s.easing,this.host.style.transitionProperty=Object.keys(s.before).join(",")}),(0,c.D)(s=>(0,u.H)(s.delay||1)),(0,a.b)(s=>d(s.after)),(0,c.D)(s=>(0,u.H)(s.duration)),(0,O.R)(this.destroyed$)).subscribe(()=>{this.host.style.transitionDuration="",this.host.style.transitionTimingFunction="",this.host.style.transitionProperty=""})}set alignment(i){this._alignments={bottom:!1,left:!1,right:!1,top:!1},i&&i.split(/\s+/g).forEach(d=>this._alignments[d]=!0),this._alignments.bottom=(!this._alignments.top||!this._alignments.bottom)&&this._alignments.bottom,this._alignments.left=(!this._alignments.right||!this._alignments.left)&&this._alignments.left}onResize(){this.setNewWidth()}ngOnInit(){const i=[];Object.keys(this._alignments).forEach(s=>{this._alignments[s]&&i.push(s)}),i.sort((s,E)=>s>E?1:-1);const d=i.reduce((s,E)=>s+(""===s?E:`-${E}`),"");this.anchor=d}ngAfterViewInit(){this.host=this.elementRef.nativeElement,this.outerContainerElement?this.host.classList.add("absolute"):this.outerContainerElement=this.host.ownerDocument.body,this.height=this.host.getBoundingClientRect().height,this.setPosition(),this.launchEnterAnimation(),(0,u.H)(this.duration+this.delay).pipe((0,I.q)(1),(0,a.b)(()=>{this.duration&&this.launchLeaveAnimation()}),(0,r.g)(this.leaveAnimationDuration),(0,O.R)(this.destroyed$)).subscribe(()=>this.onAnimationDone.emit())}ngOnDestroy(){super.ngOnDestroy(),_.INSTANCES.length&&_.INSTANCES.filter(i=>this.outerContainerElement===i.outerContainerElement).filter(i=>this.anchor===i.anchor).forEach(i=>{i.timestamp>this.timestamp&&i.launchAdaptAnimation(this.height)}),_.INSTANCES=_.INSTANCES.filter(i=>this!==i),this.animate$sub.unsubscribe()}animationDone(i){this.onAnimationDone.emit(i)}increaseElevation(){const i=window.getComputedStyle(this.host).zIndex;this.host.style.zIndex=(+i+1).toString()}decreaseElevation(){const i=window.getComputedStyle(this.host).zIndex;this.host.style.zIndex=(+i-1).toString()}computePosition(){const i=this.host.getBoundingClientRect(),d=i.width,s=i.height,E=_.INSTANCES.filter(n=>this.outerContainerElement===n.outerContainerElement).filter(n=>this.anchor===n.anchor).filter(n=>this!==n);let h=0;if(E){const n=E[E.length-1];n&&(h=n.elementRef.nativeElement.getBoundingClientRect().height)}return{innerContainerWidth:d,innerContainerHeight:s,precedentInstanceHeight:h,computedHeight:E.map(n=>n.elementRef.nativeElement.getBoundingClientRect().height).reduce((n,p)=>n+(p+this.marginTop),0)}}setPosition(){const{innerContainerWidth:i,innerContainerHeight:d,computedHeight:s}=this.computePosition();"left"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(33% + ${s}px)`),"right"===this.anchor&&(this.host.style.left=`calc(98% - ${i}px)`,this.host.style.bottom=`calc(33% + ${s}px)`),"top"===this.anchor&&(this.host.style.left=`calc(50% - ${i/2}px )`,this.host.style.bottom=`calc(92% - ${d}px)`),"bottom"===this.anchor&&(this.host.style.left=`calc(50% - ${i/2}px )`,this.host.style.bottom=`calc(2% + ${s}px)`),"bottom-left"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(2% + ${s}px)`),"bottom-right"===this.anchor&&(this.host.style.left=`calc(98% - ${i}px)`,this.host.style.bottom=`calc(2% + ${s}px)`),"left-top"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(92% - ${d}px - ${s}px)`),"right-top"===this.anchor&&(this.host.style.left=`calc(98% - ${i}px)`,this.host.style.bottom=`calc(92% - ${d}px - ${s}px)`)}setNewWidth(){const{innerContainerWidth:i}=this.computePosition();("top"===this.anchor||"bottom"===this.anchor)&&(this.elementRef.nativeElement.style.left=`calc(50% - ${i/2}px )`)}launchAdaptAnimation(i){let d=1;this._alignments.top&&(d=-1);const s=window.getComputedStyle(this.host).transform,E=parseFloat(s.split(",").slice(-1).pop());this.animate$.next({before:{transform:`${s}`},after:{transform:`matrix(1,0,0,1,0,${E+(i+this.marginTop)*d})`},duration:this.adaptAnimationDuration,easing:"ease"})}launchEnterAnimation(){let i=-1;this._alignments.top&&(i=1),this.animate$.next({before:{opacity:"0",transform:`translateY(${200*i}%)`},after:{opacity:"1",transform:"translateY(0)"},delay:this.delay,duration:this.enterAnimationDuration,easing:"ease"})}launchLeaveAnimation(){this.animate$.next({before:{opacity:"1"},after:{opacity:"0"},duration:this.leaveAnimationDuration,easing:"ease"})}}return _.INSTANCES=[],_.\u0275fac=function(i){return new(i||_)(o.Y36(o.SBq))},_.\u0275cmp=o.Xpm({type:_,selectors:[["deja-snackbar"]],hostBindings:function(i,d){1&i&&o.NdJ("resize",function(){return d.onResize()},!1,o.Jf7)},inputs:{delay:"delay",duration:"duration",outerContainerElement:"outerContainerElement",alignment:"alignment"},outputs:{onAnimationDone:"onAnimationDone"},features:[o.qOj],ngContentSelectors:P,decls:1,vars:0,template:function(i,d){1&i&&(o.F$t(),o.Hsn(0))},styles:["[_nghost-%COMP%]{position:absolute;bottom:0;left:0;display:block;box-sizing:border-box;z-index:25}.absolute[_nghost-%COMP%]{position:absolute!important}"]}),_})()},8838:(x,f,e)=>{e.d(f,{p:()=>o});const o=t=>{const m=t.value;if("gruy\xe8re"===m)return[`${m} is not a fruit`]}},7379:(x,f,e)=>{e.d(f,{g:()=>a});var o=e(9546),t=e(5517),m=e(3668);let a=(()=>{class r extends o.NJ{constructor(u){super(),this.countriesService=u}getItemList$(u){return this.countriesService.getCountries$(u)}}return r.\u0275fac=function(u){return new(u||r)(m.LFG(t.K))},r.\u0275prov=m.Yz7({token:r,factory:r.\u0275fac}),r})()},3394:(x,f,e)=>{e.d(f,{Z:()=>m});var o=e(3668);class t{constructor(r,c){this.label=`Level ${r} - Item ${c}`,this.children=[]}}let m=(()=>{class a{constructor(){this.folders=[],this.addLevel(1,this.folders)}getFolders(){return this.folders}addLevel(c,u){if(c>15)return;const O=new t(c,1);this.addLevel(c+1,O.children),u.push(O)}}return a.\u0275fac=function(c){return new(c||a)},a.\u0275prov=o.Yz7({token:a,factory:a.\u0275fac}),a})()},6999:(x,f,e)=>{e.d(f,{Yg:()=>n,u3:()=>y});var o=e(3668),t=e(348),m=e(273),a=e(5804),r=e(1404),c=e(8410),u=e(9468),O=e(9661),I=e(9463),P=e(4753),T=e(3970),_=e(6263),C=e(928);const d=new Set;let s,E=(()=>{class l{constructor(g){this._platform=g,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):M}matchMedia(g){return(this._platform.WEBKIT||this._platform.BLINK)&&function(l){if(!d.has(l))try{s||(s=document.createElement("style"),s.setAttribute("type","text/css"),document.head.appendChild(s)),s.sheet&&(s.sheet.insertRule(`@media ${l} {body{ }}`,0),d.add(l))}catch(D){console.error(D)}}(g),this._matchMedia(g)}}return l.\u0275fac=function(g){return new(g||l)(o.LFG(C.t4))},l.\u0275prov=o.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})();function M(l){return{matches:"all"===l||""===l,media:l,addListener:()=>{},removeListener:()=>{}}}let n=(()=>{class l{constructor(g,v){this._mediaMatcher=g,this._zone=v,this._queries=new Map,this._destroySubject=new m.x}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(g){return p((0,t.Eq)(g)).some(j=>this._registerQuery(j).mql.matches)}observe(g){const j=p((0,t.Eq)(g)).map(b=>this._registerQuery(b).observable);let L=(0,a.a)(j);return L=(0,r.z)(L.pipe((0,u.q)(1)),L.pipe((0,O.T)(1),(0,I.b)(0))),L.pipe((0,P.U)(b=>{const A={matches:!1,breakpoints:{}};return b.forEach(({matches:B,query:R})=>{A.matches=A.matches||B,A.breakpoints[R]=B}),A}))}_registerQuery(g){if(this._queries.has(g))return this._queries.get(g);const v=this._mediaMatcher.matchMedia(g),L={observable:new c.y(b=>{const A=B=>this._zone.run(()=>b.next(B));return v.addListener(A),()=>{v.removeListener(A)}}).pipe((0,T.O)(v),(0,P.U)(({matches:b})=>({query:g,matches:b})),(0,_.R)(this._destroySubject)),mql:v};return this._queries.set(g,L),L}}return l.\u0275fac=function(g){return new(g||l)(o.LFG(E),o.LFG(o.R0b))},l.\u0275prov=o.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})();function p(l){return l.map(D=>D.split(",")).reduce((D,g)=>D.concat(g)).map(D=>D.trim())}const y={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"}}}]);