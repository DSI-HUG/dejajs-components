"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[937],{1092:(N,O,s)=>{s.d(O,{D:()=>w});var p=s(9947),n=s(6921),h=s(8889),b=s(9985);function w(R){return(0,p.e)((D,e)=>{let _=!1,j=null,x=null;const y=()=>{if(null==x||x.unsubscribe(),x=null,_){_=!1;const I=j;j=null,e.next(I)}};D.subscribe(new h.Q(e,I=>{null==x||x.unsubscribe(),_=!0,j=I,x=new h.Q(e,y,n.Z),(0,b.Xf)(R(I)).subscribe(x)},()=>{y(),e.complete()},void 0,()=>{j=x=null}))})}},5933:(N,O,s)=>{s.d(O,{b:()=>D});var p=s(9947),n=s(2254),h=s(5373),b=s(7613),w=s(7867);function D(...e){return function(...e){const _=(0,b.yG)(e),j=(0,b._6)(e,1/0);return e=(0,n.k)(e),(0,p.e)((x,y)=>{(0,h.J)(j)((0,w.D)([x,...e],_)).subscribe(y)})}(...e)}},2254:(N,O,s)=>{s.d(O,{k:()=>n});const{isArray:p}=Array;function n(h){return 1===h.length&&p(h[0])?h[0]:h}},7858:(N,O,s)=>{s.d(O,{J:()=>R});var p=s(6019),n=s(86),h=s(888),b=s(3660),w=s(3668);let R=(()=>{class D{}return D.\u0275fac=function(_){return new(_||D)},D.\u0275mod=w.oAB({type:D}),D.\u0275inj=w.cJS({imports:[[p.ez,n.ot,h.QW,b.Ps]]}),D})()},5901:(N,O,s)=>{s.d(O,{b:()=>V});var p=s(348),n=s(3668),h=s(888),b=s(6019),w=s(3660),R=s(86);const D=["actionsTemplate"];function e(l,u){if(1&l&&(n.TgZ(0,"mat-icon",6),n._uU(1),n.qZA()),2&l){const c=n.oxw(2);n.xp6(1),n.Oqu(c.icon)}}function _(l,u){if(1&l&&(n.TgZ(0,"span",7),n._uU(1),n.qZA()),2&l){const c=n.oxw(2);n.xp6(1),n.Oqu(c.title)}}function j(l,u){if(1&l){const c=n.EpF();n.TgZ(0,"button",8),n.NdJ("click",function(){return n.CHM(c),n.oxw(2).onClose()}),n.TgZ(1,"mat-icon"),n._uU(2,"close"),n.qZA(),n.qZA()}}function x(l,u){if(1&l&&(n.TgZ(0,"mat-card-title"),n.YNc(1,e,2,1,"mat-icon",3),n.YNc(2,_,2,1,"span",2),n.TgZ(3,"div",4),n.YNc(4,j,3,0,"button",5),n.qZA(),n.qZA()),2&l){const c=n.oxw();n.xp6(1),n.Q6J("ngIf",c.icon),n.xp6(1),n.Q6J("ngIf",!c.horizontal),n.xp6(2),n.Q6J("ngIf",c.showCloseIcon)}}function y(l,u){if(1&l&&(n.TgZ(0,"h2",7),n._uU(1),n.qZA()),2&l){const c=n.oxw();n.xp6(1),n.Oqu(c.title)}}function I(l,u){if(1&l){const c=n.EpF();n.TgZ(0,"button",12),n.NdJ("click",function(){return n.CHM(c),n.oxw().$implicit.action()}),n._uU(1),n.qZA()}if(2&l){const c=n.oxw().$implicit;n.uIk("data-icon",c.icon),n.xp6(1),n.hij(" ",c.text," ")}}function H(l,u){if(1&l&&(n.TgZ(0,"mat-icon"),n._uU(1),n.qZA()),2&l){const c=n.oxw(2).$implicit;n.xp6(1),n.Oqu(c.icon)}}function S(l,u){if(1&l){const c=n.EpF();n.TgZ(0,"button",13),n.NdJ("click",function(){return n.CHM(c),n.oxw().$implicit.action()}),n.YNc(1,H,2,1,"mat-icon",1),n.qZA()}if(2&l){const c=n.oxw().$implicit;n.ekj("action-button",!c.type),n.xp6(1),n.Q6J("ngIf",c.icon)}}function Y(l,u){if(1&l&&(n.TgZ(0,"span"),n.YNc(1,I,2,2,"button",10),n.YNc(2,S,2,3,"button",11),n.qZA()),2&l){const c=u.$implicit;n.xp6(1),n.Q6J("ngIf",c.text),n.xp6(1),n.Q6J("ngIf",c.icon&&!c.text)}}function $(l,u){if(1&l&&(n.TgZ(0,"mat-card-actions"),n.YNc(1,Y,3,2,"span",9),n.qZA()),2&l){const c=n.oxw();n.xp6(1),n.Q6J("ngForOf",c.actions)}}function L(l,u){}function q(l,u){if(1&l&&(n.TgZ(0,"mat-card-actions"),n.YNc(1,L,0,0,"ng-template",14),n.qZA()),2&l){const c=n.oxw();n.xp6(1),n.Q6J("ngTemplateOutlet",c.actionsTemplate)}}const K=["*"];let V=(()=>{class l{constructor(){this.close=new n.vpe,this._showCloseIcon=!1}set horizontal(c){this._horizontal=(0,p.Ig)(c)}get horizontal(){return this._horizontal}set showCloseIcon(c){this._showCloseIcon=(0,p.Ig)(c)}get showCloseIcon(){return this._showCloseIcon}ngOnInit(){!this.icon&&this.type&&(this.icon=this.getIconFromType(this.type)),this.actions&&this.actions.forEach(c=>{!c.icon&&c.type&&(c.icon=this.getIconFromType(c.type))})}onClose(){this.close.emit()}getIconFromType(c){switch(c){case"info":case"primary":return c="primary","info_outline";case"success":return"done";case"warn":return"warning_outline";case"danger":return"error_outline";default:return null}}}return l.\u0275fac=function(c){return new(c||l)},l.\u0275cmp=n.Xpm({type:l,selectors:[["deja-message-box"]],contentQueries:function(c,M,B){if(1&c&&n.Suo(B,D,5),2&c){let z;n.iGM(z=n.CRH())&&(M.actionsTemplate=z.first)}},inputs:{type:"type",title:"title",icon:"icon",actions:"actions",horizontal:"horizontal",showCloseIcon:"showCloseIcon"},outputs:{close:"close"},ngContentSelectors:K,decls:7,vars:7,consts:[["id","msgbox"],[4,"ngIf"],["id","title",4,"ngIf"],["id","icon",4,"ngIf"],[1,"header-actions"],["mat-icon-button","","type","button","class","close",3,"click",4,"ngIf"],["id","icon"],["id","title"],["mat-icon-button","","type","button",1,"close",3,"click"],[4,"ngFor","ngForOf"],["mat-button","","type","button","class","with-icon",3,"click",4,"ngIf"],["mat-icon-button","","type","button",3,"action-button","click",4,"ngIf"],["mat-button","","type","button",1,"with-icon",3,"click"],["mat-icon-button","","type","button",3,"click"],[3,"ngTemplateOutlet"]],template:function(c,M){1&c&&(n.F$t(),n.TgZ(0,"mat-card",0),n.YNc(1,x,5,3,"mat-card-title",1),n.TgZ(2,"mat-card-content"),n.YNc(3,y,2,1,"h2",2),n.Hsn(4),n.qZA(),n.YNc(5,$,2,1,"mat-card-actions",1),n.YNc(6,q,2,1,"mat-card-actions",1),n.qZA()),2&c&&(n.Tol(M.type),n.xp6(1),n.Q6J("ngIf",M.icon||M.showCloseIcon),n.xp6(2),n.Q6J("ngIf",M.horizontal&&M.title),n.xp6(2),n.Q6J("ngIf",M.actions),n.xp6(1),n.Q6J("ngIf",!M.actions&&M.actionsTemplate))},directives:[h.a8,b.O5,h.dn,h.n5,w.Hw,R.lW,h.hq,b.sg,b.tP],styles:["deja-message-box{display:block;border-radius:3px;overflow:hidden;background-color:transparent}deja-message-box #msgbox{border:0;margin:0;padding:0;display:block;border-radius:3px}deja-message-box #msgbox>.mat-card-title{text-transform:uppercase;align-items:center;display:flex;margin:0;padding:1rem 0 0 1.2rem;font-size:1rem}deja-message-box #msgbox>.mat-card-title #icon{margin-right:.3rem}deja-message-box #msgbox>.mat-card-title .header-actions{position:absolute;top:0;right:0}deja-message-box #msgbox>.mat-card-content{margin:0;overflow:hidden;font-weight:300;padding:.5rem .75rem .75rem 1.3rem}deja-message-box #msgbox>.mat-card-content h2{font-size:1rem;margin:0;font-weight:500;text-transform:uppercase;line-height:1.5rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}deja-message-box #msgbox>.mat-card-actions{align-items:center;display:flex;justify-content:flex-end;margin:0;padding:.5rem}deja-message-box[horizontal] #msgbox{align-items:stretch;display:flex;flex-direction:row;padding:0;position:relative}deja-message-box[horizontal] #msgbox>.mat-card-title{align-items:center;display:flex;flex:0 0 auto;justify-content:center;margin:0;text-align:center;padding:.5rem 0 .5rem .8rem}deja-message-box[horizontal] #msgbox>.mat-card-title #icon{margin:0}deja-message-box[horizontal] #msgbox>.mat-card-content{align-self:center;flex:1 1 auto;padding:.75rem}deja-message-box[horizontal] #msgbox>.mat-card-actions{margin:0;padding:0;position:absolute;right:0;top:0}deja-message-box[horizontal] #msgbox>.mat-card-actions [mat-icon-button] mat-icon{font-size:1rem}\n"],encapsulation:2}),l})()},1670:(N,O,s)=>{s.r(O),s.d(O,{DejaRangeDemoModule:()=>ve});var p=s(6019),n=s(9133),h=s(86),b=s(888),w=s(2605),R=s(8643),D=s(7858),e=s(3668);class _{constructor(g,t,o){this.min=g,this.max=t,this.$width=o}}var j=s(348),x=s(4986),y=s(5077),I=s(5933),H=s(9468),S=s(7384),Y=s(6263);const $=["rangeTemplate"],L=["separatorTemplate"];function q(i,g){if(1&i&&(e.TgZ(0,"span",7),e._uU(1),e.qZA()),2&i){const t=e.oxw().$implicit;e.xp6(1),e.AsE("",t.min," - ",t.max,"")}}function K(i,g){}function V(i,g){1&i&&(e.TgZ(0,"span",10),e._UZ(1,"span",11),e.qZA())}function l(i,g){}const u=function(i,g,t){return{$implicit:i,index:g,ranges:t}};function c(i,g){if(1&i){const t=e.EpF();e.TgZ(0,"span",8),e.NdJ("mousedown",function(a){e.CHM(t);const r=e.oxw().index;return e.oxw().onMouseDown(a,r)}),e.YNc(1,V,2,0,"span",9),e.YNc(2,l,0,0,"ng-template",5),e.qZA()}if(2&i){const t=e.oxw(),o=t.$implicit,a=t.index,r=e.oxw();e.xp6(1),e.Q6J("ngIf",!r.separatorTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",r.separatorTemplate)("ngTemplateOutletContext",e.kEZ(3,u,o,a,r.ranges))}}function M(i,g){if(1&i){const t=e.EpF();e.TgZ(0,"section",2),e.TgZ(1,"span",3),e.NdJ("mousedown",function(a){const m=e.CHM(t).index;return e.oxw().onSelect(a,m)}),e.YNc(2,q,2,2,"span",4),e.YNc(3,K,0,0,"ng-template",5),e.qZA(),e.YNc(4,c,3,7,"span",6),e.qZA()}if(2&i){const t=g.$implicit,o=g.index,a=e.oxw();e.Udp("width",t.$width,"px"),e.xp6(1),e.ekj("selected",a.selected===o),e.xp6(1),e.Q6J("ngIf",!a.rangeTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",a.rangeTemplate)("ngTemplateOutletContext",e.kEZ(8,u,t,o,a.ranges)),e.xp6(1),e.Q6J("ngIf",a.ranges.length>o+1)}}let B=(()=>{class i extends x.yl{constructor(t,o,a){super(),this.changeDetectorRef=t,this.elementRef=o,this.control=a,this.select=new e.vpe,this.errorFeedback=new e.vpe,this.step=1,this.selected=0,this.minimumRangePercentage=.01,this._readOnly=!0,this._disabled=!1,this._onChangeCallback=r=>{},this._onTouchCallback=()=>{},this.control&&(this.control.valueAccessor=this)}onResize(){this.ranges=this.ranges.concat()}registerOnChange(t){this._onChangeCallback=t}registerOnTouched(t){this._onTouchCallback=t}get ranges(){return this._ranges||[]}set ranges(t){t&&(this.writeValue(t),this._onChangeCallback(t))}set disabled(t){this._disabled=(0,j.Ig)(t),this.changeDetectorRef.markForCheck()}get disabled(){return this._disabled}set readOnly(t){this._readOnly=(0,j.Ig)(t)}get readOnly(){return this._readOnly||this.disabled}writeValue(t){if(t&&t.length){const a=this.elementRef.nativeElement.firstElementChild.getBoundingClientRect().width,r=t[t.length-1].max-t[0].min;this._ranges=t.map((m,d)=>(m.$width=+(a*((t[d].max-t[d].min)/(r/100))/100).toFixed(2),m)),this.changeDetectorRef.markForCheck()}}setDisabledState(t){this.disabled=t}add(){if(!this.readOnly){if("number"!=typeof this.step)throw new Error("Invalid step type, you have to implement the add function yourself for the fn & array.");{const t=this.ranges,o=this.selected,a=t[o],r=a.max-a.min;let A,P;const k=r>=2*this.step;if(r/(t[t.length-1].max-t[0].min)>2*this.minimumRangePercentage&&k){A=a.min+r/2,P=new _(a.min,A),a.min=A;let f=[...t.slice(0,o),P,a,...t.length-1>o?t.slice(o+1):[]];const E=f.indexOf(P);f[E].max=this.toStep(f,E,f[E].max),f=f.map((W,F)=>(0!==F&&(W.min=f[F-1].max),W)),this.ranges=f}else this.errorFeedback.emit(new Error("Range is too small to be splitted"))}}}remove(){if(!this.readOnly&&this.ranges.length>2){const t=this.ranges.filter((o,a)=>this.selected!==a);this.ranges=t.map((o,a)=>(a!==t.length-1&&(o.max=t[a+1].min),o))}}refresh(){this.changeDetectorRef.markForCheck()}onSelect(t,o){if(!this.disabled&&this.selected!==o){const a=t;a.range=this.ranges[o],a.index=o,a.ranges=this.ranges,this.select.emit(a),this.selected=o}}onMouseDown(t,o){if(!this.readOnly){const a=t.pageX,m=this.ranges,d=this.ranges[o],J=d.max;let T=t.target.parentElement;for(;!T.classList.contains("block");)T=T.parentElement;const A=(0,y.R)(document,"mouseup"),P=(0,y.R)(document.body,"mouseleave"),k=A.pipe((0,I.b)(P),(0,H.q)(1),(0,S.b)(()=>{this.elementRef.nativeElement.firstElementChild.ownerDocument.body.classList.remove("noselect"),this._onChangeCallback(this._ranges)}));(0,y.R)(document,"mousemove").pipe((0,Y.R)(this.destroyed$.pipe((0,I.b)(k)))).subscribe(Z=>{const E=-(a-Z.pageX),W=this.ranges[o+1],F=m[m.length-1].max-m[0].min,Q=this.elementRef.nativeElement.firstElementChild,G=Q.getBoundingClientRect().width;Q.ownerDocument.body.classList.add("noselect");let U=J+E*F/G;const ee=this.minimumRangePercentage*F,Pe=d.min+ee;U=Math.min(U,W.max-ee),U=Math.max(U,Pe);const Re=this.toStep(m,o,U);W.min=d.max=Re,m[o]=d,m[o+1]=W,this.writeValue(m)})}}toStep(t,o,a){const r=t[o],d=t[t.length-1>o?o+1:o].max,J=0!==o?t[o-1].max:0,A=this.minimumRangePercentage*(t[t.length-1].max-t[0].min),P=r.min+A,k=d-A;if("number"==typeof this.step){const C=this.step,Z=100/(100*C),f=Math.round(a*Z)/Z,E=C.toString().replace(/[0-9]+\./,"").length,W=+f.toFixed(E),F=Math.min(W,d-C),Q=Math.max(W,J+C),G=P<Q?Q:P,X=k>F?F:k;return a>r.max?X:G}if("function"==typeof this.step){const C={};return C.range=this.ranges[o],C.index=o,C.ranges=this.ranges,C.newMax=a,this.step(C)}if(this.step instanceof Array){let Z,C=a;return this.step.filter(f=>f<=k&&f>=P).forEach(f=>{const E=Math.abs(f-a);(void 0===Z||Z>E)&&(C=f,Z=E)}),C}throw new Error("Invalid step type.")}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.sBO),e.Y36(e.SBq),e.Y36(n.a5,10))},i.\u0275cmp=e.Xpm({type:i,selectors:[["deja-range"]],contentQueries:function(t,o,a){if(1&t&&(e.Suo(a,$,5),e.Suo(a,L,5)),2&t){let r;e.iGM(r=e.CRH())&&(o.rangeTemplate=r.first),e.iGM(r=e.CRH())&&(o.separatorTemplate=r.first)}},hostBindings:function(t,o){1&t&&e.NdJ("resize",function(){return o.onResize()},!1,e.Jf7)},inputs:{step:"step",selected:"selected",disabled:"disabled",readOnly:"readOnly"},outputs:{select:"select",errorFeedback:"errorFeedback"},features:[e.qOj],decls:2,vars:1,consts:[["id","container"],["ngFor","",3,"ngForOf"],[1,"block"],[1,"range",3,"mousedown"],["class","default-range",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["class","separator",3,"mousedown",4,"ngIf"],[1,"default-range"],[1,"separator",3,"mousedown"],["class","default-separator",4,"ngIf"],[1,"default-separator"],[1,"default-separator-item"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0),e.YNc(1,M,5,12,"ng-template",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",o.ranges))},directives:[p.sg,p.O5,p.tP],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;box-shadow:0 2px 1px -1px #0003,0 1px 1px #00000024,0 1px 3px #0000001f;height:32px}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;user-select:none}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .block[_ngcontent-%COMP%]{display:inline-flex}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{display:inline-flex;flex-grow:100;justify-content:center}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{display:inline-flex;flex-basis:auto;justify-content:center;z-index:5}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]:hover{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{width:7px;cursor:pointer}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .default-range[_ngcontent-%COMP%]{align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{cursor:ew-resize}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]   .default-separator[_ngcontent-%COMP%]{width:7px;height:25.6px;margin-top:3.2px;display:flex;justify-content:center}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]   .default-separator[_ngcontent-%COMP%]   .default-separator-item[_ngcontent-%COMP%]{height:100%;width:1px}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range.selected[_ngcontent-%COMP%]{-webkit-animation-name:selected;animation-name:selected;-webkit-animation-duration:175ms;animation-duration:175ms;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]:not(.selected){-webkit-animation-name:not-selected;animation-name:not-selected;-webkit-animation-duration:175ms;animation-duration:175ms;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}"],changeDetection:0}),i})(),z=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[p.ez]]}),i})();var te=s(8177),ne=s(6412),oe=s(3507),ae=s(7867),ie=s(4753),se=s(2405),ce=s(8975);class v{constructor(g,t){this.minWeight=g,this.maxWeight=t}}const re=[new _(4,16),new _(16,20),new _(20,24),new _(24,36)],le=[new _(0,12.5),new _(12.5,25),new _(25,30)],ge=[new _(0,12),new _(12,20),new _(20,24)],me=[new v(3,4),new v(4,6),new v(6,9),new v(9,12),new v(12,16),new v(16,20),new v(20,25),new v(25,32),new v(32,40),new v(40,200)],de=[1,2,4,8,16,20,22,24];var _e=s(7991),pe=s(4337),he=s(5901);const ue=["dejaRange"],fe=["dejaWeight"];function xe(i,g){1&i&&(e.TgZ(0,"mat-card",5),e._UZ(1,"deja-markdown",6),e.qZA()),2&i&&(e.xp6(1),e.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/range/readme.md"))}function Ce(i,g){if(1&i&&(e.TgZ(0,"span",22),e._uU(1),e.ALo(2,"number"),e.ALo(3,"number"),e.qZA()),2&i){const t=g.$implicit;e.xp6(1),e.AsE("",e.xi3(2,2,t.minWeight,"1.0-2")," - ",e.xi3(3,5,t.maxWeight,"1.0-2")," kg")}}function Me(i,g){1&i&&(e.TgZ(0,"span",23),e.O4$(),e.TgZ(1,"svg",24),e._UZ(2,"polygon",25),e.qZA(),e.TgZ(3,"svg",26),e._UZ(4,"rect",27),e.qZA(),e.TgZ(5,"svg",24),e._UZ(6,"polygon",28),e.qZA(),e.qZA())}function be(i,g){if(1&i){const t=e.EpF();e.TgZ(0,"deja-snackbar",30),e.NdJ("onAnimationDone",function(){return e.CHM(t),e.oxw().$implicit.gate=!1}),e.TgZ(1,"deja-message-box",31),e._uU(2),e.qZA(),e.qZA()}if(2&i){const t=e.oxw().$implicit;e.Q6J("duration",5e3),e.xp6(2),e.Oqu(t.message)}}function De(i,g){if(1&i&&e.YNc(0,be,3,2,"deja-snackbar",29),2&i){const t=g.$implicit;e.Q6J("ngIf",null==t?null:t.gate)}}function Oe(i,g){if(1&i){const t=e.EpF();e.TgZ(0,"div"),e.TgZ(1,"mat-card",7),e.TgZ(2,"mat-toolbar",8),e._uU(3,"Default template : Read Only"),e.qZA(),e.TgZ(4,"mat-card-content"),e.TgZ(5,"deja-range",9),e.NdJ("ngModelChange",function(a){return e.CHM(t),e.oxw().readOnlyRanges=a}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"mat-card",7),e.TgZ(7,"mat-toolbar",8),e._uU(8,"Default template : Movable separator, with an array of accepted intervals"),e.qZA(),e.TgZ(9,"mat-card-content"),e.TgZ(10,"deja-range",10),e.NdJ("ngModelChange",function(a){return e.CHM(t),e.oxw().rangesWithInterval=a}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(11,"mat-card",7),e.TgZ(12,"mat-toolbar",8),e._uU(13,"Default template : Movable separator, with a numeric step"),e.qZA(),e.TgZ(14,"mat-card-content"),e.TgZ(15,"deja-range",11,12),e.NdJ("ngModelChange",function(a){return e.CHM(t),e.oxw().ranges=a})("errorFeedback",function(a){return e.CHM(t),e.oxw().errorFeed.emit(a)}),e.qZA(),e.qZA(),e.TgZ(17,"mat-card-content"),e.TgZ(18,"button",13),e._uU(19,"Simple"),e.qZA(),e.TgZ(20,"button",14),e.NdJ("click",function(){return e.CHM(t),e.MAs(16).add()}),e._uU(21,"Split selected range"),e.qZA(),e.TgZ(22,"button",14),e.NdJ("click",function(){return e.CHM(t),e.MAs(16).remove()}),e._uU(23,"Remove selected range"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(24,"mat-card",7),e.TgZ(25,"mat-toolbar",8),e._uU(26,"Custom template : Movable separator, with a function based step, logarithmic interpolation bewtween the model (weight) and the inner model"),e.qZA(),e.TgZ(27,"mat-card-content"),e.TgZ(28,"deja-range",15,16),e.NdJ("ngModelChange",function(a){return e.CHM(t),e.oxw().weights=a})("ngModelChange",function(){return e.CHM(t),e.oxw().computeRangeFromWeight()})("errorFeedback",function(a){return e.CHM(t),e.oxw().errorFeed.emit(a)}),e.YNc(30,Ce,4,8,"ng-template",null,17,e.W1O),e.YNc(32,Me,7,0,"ng-template",null,18,e.W1O),e.qZA(),e.qZA(),e.TgZ(34,"mat-card-content"),e.TgZ(35,"button",14),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(29);return e.oxw().add(a.selected)}),e._uU(36,"Split selected range"),e.qZA(),e.TgZ(37,"button",14),e.NdJ("click",function(){e.CHM(t);const a=e.MAs(29);return e.oxw().remove(a.selected)}),e._uU(38,"Remove selected range"),e.qZA(),e.TgZ(39,"button",19),e.NdJ("click",function(){return e.CHM(t),e.oxw().decrease()}),e._uU(40,"Decrease minimum"),e.qZA(),e.TgZ(41,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().increase()}),e._uU(42,"Increase maximum"),e.qZA(),e.qZA(),e.qZA(),e.YNc(43,De,1,1,"ng-template",21),e.ALo(44,"async"),e.qZA()}if(2&i){const t=e.oxw();e.xp6(5),e.Q6J("ngModel",t.readOnlyRanges),e.xp6(5),e.Q6J("ngModel",t.rangesWithInterval)("readOnly",!1)("selected",1)("step",t.steps),e.xp6(5),e.Q6J("ngModel",t.ranges)("readOnly",!1)("step",2.5),e.xp6(13),e.Q6J("ngModel",t.weights)("readOnly",!1)("selected",0)("step",t.stepFn),e.xp6(11),e.Q6J("disabled",0===(null==t.weights[0]?null:t.weights[0].minWeight)),e.xp6(4),e.Q6J("ngForOf",e.lcZ(44,14,t.errors$))}}const je=oe.Bz.forChild([{path:"",component:(()=>{class i{constructor(){this.errorFeed=new e.vpe,this.tabIndex=1,this.numericStep=1,this.readOnlyRanges=re,this.rangesWithInterval=ge,this.ranges=le,this.weights=me,this.steps=de,this.computeRangeFromWeight(),this.errors$=(0,ae.D)(this.errorFeed).pipe((0,ie.U)(t=>({gate:!0,message:t.message})),(0,se.R)((t,o)=>[...t,o],[]),(0,ce.d)([]))}computeRangeFromWeight(){let t=0;this.weights=this.weights.map(o=>{const r=Math.log(4*(o.maxWeight-o.minWeight));return o.min=t,o.max=t+r,t+=r,o})}stepFn(t){const o=t.ranges[t.index],a=t.ranges.length-1===t.index,m=Math.pow(Math.E,t.newMax-o.min)/4;let d=o.minWeight+m;if(d=Math.round(d),d=Math.max(d,o.minWeight+1),!a){const T=t.ranges[t.index+1];d=Math.min(d,T.maxWeight-1),T.minWeight=d,o.maxWeight=d}return o.min+Math.log(4*(d-o.minWeight))}remove(t){if(this.weights.length>=2){const o=this.weights.find((r,m)=>t===m),a=this.weights.filter((r,m)=>t!==m);t>0&&(a[t-1].maxWeight=o.maxWeight),this.weights=a,this.weightRef.selected=0,this.computeRangeFromWeight()}}add(t){const o=this.weights.find((r,m)=>t===m),a=o.maxWeight-o.minWeight;if(a>=2){const r=new v(o.minWeight,o.minWeight+a/2);o.minWeight=o.minWeight+a/2;const m=0!==t?this.weights.slice(0,t):[],d=t<this.weights.length?this.weights.slice(t+1):[];this.weights=[...m,r,o,...d],this.weightRef.selected=0,this.computeRangeFromWeight()}}increase(){this.weights[this.weights.length-1].maxWeight++,this.computeRangeFromWeight()}decrease(){this.weights[0].minWeight>0&&(this.weights[0].minWeight--,this.computeRangeFromWeight())}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["deja-range-demo"]],viewQuery:function(t,o){if(1&t&&(e.Gf(ue,5),e.Gf(fe,5)),2&t){let a;e.iGM(a=e.CRH())&&(o.rangeRef=a.first),e.iGM(a=e.CRH())&&(o.weightRef=a.first)}},outputs:{errorFeed:"errorFeed"},decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],[1,"demo-card"],["color","primary"],[3,"ngModel","ngModelChange"],[3,"ngModel","readOnly","selected","step","ngModelChange"],[3,"ngModel","readOnly","step","ngModelChange","errorFeedback"],["dejaRange",""],["mat-raised-button",""],["mat-raised-button","",3,"click"],["id","custom-range",3,"ngModel","readOnly","selected","step","ngModelChange","errorFeedback"],["dejaWeight",""],["rangeTemplate",""],["separatorTemplate",""],["id","decrease","mat-raised-button","",3,"disabled","click"],["id","increase","mat-raised-button","",3,"click"],["ngFor","",3,"ngForOf"],[1,"custom-range"],[1,"custom-separator"],[1,"triangle"],["points","0,0 10,0 5,5"],[1,"line"],["x","4.5","y","0"],["points","0,5 5,0 10,5 "],["alignment","bottom right",3,"duration","onAnimationDone",4,"ngIf"],["alignment","bottom right",3,"duration","onAnimationDone"],["type","warn","horizontal",""]],template:function(t,o){1&t&&(e.TgZ(0,"mat-tab-group",0),e.NdJ("selectedTabChange",function(r){return o.tabIndex=r.index}),e._UZ(1,"mat-tab",1),e._UZ(2,"mat-tab",2),e.qZA(),e.YNc(3,xe,2,1,"mat-card",3),e.YNc(4,Oe,45,16,"div",4)),2&t&&(e.Q6J("selectedIndex",o.tabIndex),e.xp6(3),e.Q6J("ngIf",0===o.tabIndex),e.xp6(1),e.Q6J("ngIf",1===o.tabIndex))},directives:[w.SP,w.uX,p.O5,b.a8,_e.F,R.Ye,b.dn,B,n.JJ,n.On,h.lW,p.sg,pe.w,he.b],pipes:[p.Ov,p.JJ],styles:["[_nghost-%COMP%]   #custom-range-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-around}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:24px}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:block;flex-grow:1;flex-shrink:0;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:1;flex-basis:36px;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]{flex-basis:max-content;align-self:center;height:24px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-range[_ngcontent-%COMP%]{display:flex;align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]{display:flex;width:10px;flex-wrap:wrap}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]{margin-top:-5px;width:10px;height:5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{fill:#333}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]{height:34px;margin-top:-5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%]{fill:#333;height:34px;width:1px}"]}),i})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let ve=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[],imports:[[p.ez,ne.O,D.J,z,te.n,n.u5,h.ot,b.QW,w.Nh,R.g0,je]]}),i})()}}]);