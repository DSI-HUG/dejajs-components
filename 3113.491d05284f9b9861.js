"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[3113],{3113:($,D,d)=>{d.r(D),d.d(D,{DejaContentEditableDemoModule:()=>R});var s=d(9808),u=d(3075),C=d(9224),x=d(7446),y=d(3251),E=d(4594),t=d(5e3),f=d(3191),M=d(2031),j=d(1135),I=d(4968),g=d(2722),S=d(1884),F=d(4004),_=d(5963),U=d(5698),b=d(9300),A=d(3900);let H=(()=>{class r extends M.yl{constructor(e,l){super(),this.control=l,this._disabled=null,this._inEdition=!1,this._editMode=!1,this._mandatory=!1,this._multiline=!1,this.edit$=new j.X([!1,!1]),this.onTouchedCallback=()=>{},this.onChangeCallback=o=>{},this.control&&(this.control.valueAccessor=this),this.element=e.nativeElement,(0,I.R)(this.element,"mousedown").pipe((0,g.R)(this.destroyed$)).subscribe(o=>this.inEdition||this.disabled?(o.cancelBubble=!0,!1):this.editMode?(this.edit$.next([!0,!0]),o.cancelBubble=!0,!1):void 0);const m=this.edit$.pipe((0,S.x)(),(0,F.U)(([o,p])=>((null==p||p)&&(0,_.H)(10).pipe((0,U.q)(1),(0,g.R)(this.destroyed$)).subscribe(()=>{this.selectAll(),this.focus()}),this._inEdition=o,o?this.element.setAttribute("contenteditable","true"):this.element.removeAttribute("contenteditable"),this.refreshView(),o))),G=m.pipe((0,b.h)(o=>!o)),J=(0,I.R)(this.element.ownerDocument,"mousedown").pipe((0,b.h)(o=>!this.isChildElement(o.target)),(0,g.R)(G));m.pipe((0,b.h)(o=>o),(0,A.w)(()=>J),(0,g.R)(this.destroyed$)).subscribe(()=>{const o=this.element.innerText.replace(/\n/g,"<br />").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");this.onTouchedCallback(),(o||!this.mandatory)&&(this.value=o),this.inEdition=!1});const k=(0,I.R)(this.element,"keydown").pipe((0,g.R)(G));m.pipe((0,b.h)(o=>o),(0,A.w)(()=>k),(0,g.R)(this.destroyed$)).subscribe(o=>{if(o.cancelBubble=!0,o.stopPropagation(),o.code!==M.mW.Enter||this.multiline)o.code===M.mW.Escape&&(this.inEdition=!1);else{const p=this.element.innerText;(p||!this.mandatory)&&(this.value=p),this.inEdition=!1}return!1})}set mandatory(e){this._mandatory=(0,f.Ig)(e)}get mandatory(){return this._mandatory}set multiline(e){this._multiline=(0,f.Ig)(e)}get multiline(){return this._multiline}set disabled(e){const l=(0,f.Ig)(e);this._disabled=l||null,this.disabled&&this.edit$.next([!1,!1])}get disabled(){var e;return(null===(e=this.control)||void 0===e?void 0:e.disabled)||this._disabled}set editMode(e){this._editMode=(0,f.Ig)(e)}get editMode(){return this._editMode}set inEdition(e){this.disabled||this.edit$.next([(0,f.Ig)(e),!1])}get inEdition(){return this._inEdition}set value(e){e!==this.model&&(this.writeValue(e),this.onChangeCallback(e))}get value(){return this.model}writeValue(e){this.model=e,this.refreshView()}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}ngOnInit(){this.model=this.element.innerHTML}focus(){this.element.focus()}selectAll(){const e=document.createRange();e.selectNodeContents(this.element);const l=window.getSelection();l.removeAllRanges(),l.addRange(e)}edit(e){this.edit$.next([!this.disabled,e])}isChildElement(e){let l=e;for(;l&&l!==this.element;)l=l.parentElement;return l===this.element}refreshView(){!this.model||(this.inEdition?this.element.innerText=this.model.replace(/<br\s*[/]?>/gi,"\n"):this.element.innerHTML=this.model.replace(/\n/g,"<br />"))}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(t.SBq),t.Y36(u.a5,10))},r.\u0275dir=t.lG2({type:r,selectors:[["","deja-editable",""]],hostVars:1,hostBindings:function(e,l){2&e&&t.uIk("disabled",l._disabled)},inputs:{mandatory:"mandatory",multiline:"multiline",disabled:"disabled",editMode:["deja-editable","editMode"],inEdition:"inEdition"},features:[t.qOj]}),r})(),T=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[s.ez,u.u5]}),r})();var Z=d(3485),B=d(1402),w=d(1339);function a(r,c){1&r&&(t.TgZ(0,"mat-card",4),t._UZ(1,"deja-markdown",5),t.qZA()),2&r&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/content-editable/readme.md"))}function i(r,c){if(1&r){const e=t.EpF();t.TgZ(0,"mat-card",4)(1,"mat-toolbar",6),t._uU(2,"Content Editable Demo"),t.qZA(),t.TgZ(3,"mat-card-content")(4,"mat-checkbox",7),t.NdJ("ngModelChange",function(v){t.CHM(e);const m=t.oxw();return t.KtG(m.designMode=v)}),t._uU(5,"Design Mode\xa0"),t.qZA(),t.TgZ(6,"mat-checkbox",7),t.NdJ("ngModelChange",function(v){t.CHM(e);const m=t.oxw();return t.KtG(m.disabled=v)}),t._uU(7,"Disabled"),t.qZA()(),t.TgZ(8,"mat-card-content",8)(9,"div",9),t._uU(10," Lorem ipsum dolor sit amet, consectetur adipiscing elit. "),t._UZ(11,"br"),t._uU(12," Mauris auctor sit amet odio et aliquet. Curabitur auctor eleifend mattis. "),t._UZ(13,"br"),t._uU(14," Nullam sit amet quam tellus. Ut mattis tellus sed erat ultricies ornare. "),t._UZ(15,"br"),t._uU(16," Nulla dictum nisi eu tortor lacinia porttitor. Donec eu arcu et enim cursus viverra. "),t._UZ(17,"br"),t._uU(18," Praesent pulvinar dui nisi, a tincidunt arcu finibus sed. "),t._UZ(19,"br"),t.TgZ(20,"a",10),t._uU(21,"Google"),t.qZA()()()()}if(2&r){const e=t.oxw();t.xp6(4),t.Q6J("ngModel",e.designMode),t.xp6(2),t.Q6J("ngModel",e.disabled),t.xp6(3),t.Q6J("deja-editable",e.designMode)("disabled",e.disabled)}}const L=B.Bz.forChild([{path:"",component:(()=>{class r{constructor(){this.tabIndex=1,this.designMode=!1,this.disabled=!1}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["deja-content-editable-demo"]],decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],["color","primary"],["color","primary",3,"ngModel","ngModelChange"],["id","contentEditableContainer"],["multiline","",3,"deja-editable","disabled"],["href","http://www.google.ch"]],template:function(e,l){1&e&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(m){return l.tabIndex=m.index}),t._UZ(1,"mat-tab",1)(2,"mat-tab",2),t.qZA(),t.YNc(3,a,2,1,"mat-card",3),t.YNc(4,i,22,4,"mat-card",3)),2&e&&(t.Q6J("selectedIndex",l.tabIndex),t.xp6(3),t.Q6J("ngIf",0===l.tabIndex),t.xp6(1),t.Q6J("ngIf",1===l.tabIndex))},dependencies:[s.O5,H,w.F,u.JJ,u.On,C.a8,C.dn,x.oG,y.SP,y.uX,E.Ye],encapsulation:2}),r})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let R=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[s.ez,T,Z.O,u.u5,C.QW,x.p9,y.Nh,E.g0,L]}),r})()},9224:($,D,d)=>{d.d(D,{QW:()=>w,a8:()=>T,dn:()=>M,hq:()=>g,n5:()=>j});var s=d(5e3),u=d(508);const C=["*",[["mat-card-footer"]]],x=["*","mat-card-footer"];let M=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275dir=s.lG2({type:a,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),a})(),j=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275dir=s.lG2({type:a,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-card-title"]}),a})(),g=(()=>{class a{constructor(){this.align="start"}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275dir=s.lG2({type:a,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(n,h){2&n&&s.ekj("mat-card-actions-align-end","end"===h.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),a})(),T=(()=>{class a{constructor(n){this._animationMode=n}}return a.\u0275fac=function(n){return new(n||a)(s.Y36(s.QbO,8))},a.\u0275cmp=s.Xpm({type:a,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(n,h){2&n&&s.ekj("_mat-animation-noopable","NoopAnimations"===h._animationMode)},exportAs:["matCard"],ngContentSelectors:x,decls:2,vars:0,template:function(n,h){1&n&&(s.F$t(C),s.Hsn(0),s.Hsn(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card._mat-animation-noopable{transition:none !important;animation:none !important}.mat-card>.mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card>.mat-divider-horizontal{left:auto;right:0}.mat-card>.mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card>.mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.mat-card-image img{width:100%}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],encapsulation:2,changeDetection:0}),a})(),w=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({imports:[u.BQ,u.BQ]}),a})()}}]);