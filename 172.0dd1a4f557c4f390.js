"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[172],{9172:(N,g,o)=>{o.r(g),o.d(g,{DejaTagDemoModule:()=>x});var c=o(6019),d=o(9133),m=o(888),r=o(2605),u=o(8643),h=o(3660),p=o(138),f=o(1880),e=o(3668),C=o(348),D=o(7656),j=o(9876),T=o(8167);let v=(()=>{class n{constructor(t){this.control=t,this._disabled=null,this.text="",this.items=[],this.onTouchedCallback=()=>{},this.onChangeCallback=a=>{},this.onValidatorChangeCallback=a=>{},this.control&&(this.control.valueAccessor=this)}set disabled(t){const a=(0,C.Ig)(t);this._disabled=a||null}get disabled(){return this.control?this.control.disabled:this._disabled}get value(){return this.items}set value(t){this.writeValue(t),this.onChangeCallback(t),this.onTouchedCallback()}writeValue(t){this.items=t||[]}registerOnChange(t){this.onChangeCallback=t}registerOnTouched(t){this.onTouchedCallback=t}setDisabledState(t){this.disabled=t}onKeyDown(t){t.code===D.mW.Enter&&this.onAddItem(t.target.value)}onAddItem(t){t&&(this.items.push(t),this.value=this.items,this.text="")}onRemoveItem(){this.onChangeCallback(this.value)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(d.a5,10))},n.\u0275cmp=e.Xpm({type:n,selectors:[["deja-tag"]],hostVars:1,hostBindings:function(t,a){2&t&&e.uIk("disabled",a._disabled)},inputs:{placeholder:"placeholder",disabled:"disabled"},decls:6,vars:5,consts:[[3,"items","disabled","close"],["matInput","","matInput","","autocomplete","off",3,"ngModel","placeholder","disabled","ngModelChange","keydown"],["matSuffix","",3,"click"],[1,"matSuffix"]],template:function(t,a){1&t&&(e.TgZ(0,"deja-chips",0),e.NdJ("close",function(){return a.onRemoveItem()}),e.qZA(),e.TgZ(1,"mat-form-field"),e.TgZ(2,"input",1),e.NdJ("ngModelChange",function(l){return a.text=l})("keydown",function(l){return a.onKeyDown(l)}),e.qZA(),e.TgZ(3,"div",2),e.NdJ("click",function(){return a.onAddItem(a.text)}),e.TgZ(4,"mat-icon",3),e._uU(5,"add"),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.Q6J("items",a.items)("disabled",a.disabled),e.xp6(2),e.Q6J("ngModel",a.text)("placeholder",a.placeholder)("disabled",a.disabled))},directives:[j.M,T.KE,p.Nt,d.Fj,d.JJ,d.On,T.R9,h.Hw],styles:["[_nghost-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{display:block;width:100%}[_nghost-%COMP%]   .mat-form-field[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{cursor:pointer}"]}),n})(),b=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[],imports:[[c.ez,f.O,d.u5,h.Ps,p.c]]}),n})();var Z=o(6412);function A(n,s){1&n&&(e.TgZ(0,"mat-card",4),e._uU(1," TODO\n"),e.qZA())}function I(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"mat-card",4),e.TgZ(1,"mat-toolbar",5),e._uU(2,"Tag Component"),e.qZA(),e.TgZ(3,"mat-card-content"),e.TgZ(4,"deja-tag",6),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().values=i}),e.qZA(),e.TgZ(5,"div"),e._uU(6," Model : "),e.TgZ(7,"pre"),e._uU(8),e.ALo(9,"json"),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(4),e.Q6J("ngModel",t.values),e.xp6(4),e.Oqu(e.lcZ(9,2,t.values))}}const O=o(3507).Bz.forChild([{path:"",component:(()=>{class n{constructor(){this.tabIndex=1,this.values=["HTML5","ANGULAR"]}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["tag-demo"]],decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[1,"demo-card","demo-basic"],["color","primary"],["placeholder","Add tags",3,"ngModel","ngModelChange"]],template:function(t,a){1&t&&(e.TgZ(0,"mat-tab-group",0),e.NdJ("selectedTabChange",function(l){return a.tabIndex=l.index}),e._UZ(1,"mat-tab",1),e._UZ(2,"mat-tab",2),e.qZA(),e.YNc(3,A,2,0,"mat-card",3),e.YNc(4,I,10,4,"mat-card",3)),2&t&&(e.Q6J("selectedIndex",a.tabIndex),e.xp6(3),e.Q6J("ngIf",0===a.tabIndex),e.xp6(1),e.Q6J("ngIf",1===a.tabIndex))},directives:[r.SP,r.uX,c.O5,m.a8,u.Ye,m.dn,v,d.JJ,d.On],pipes:[c.Ts],encapsulation:2}),n})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let x=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[],imports:[[c.ez,Z.O,b,d.u5,m.QW,r.Nh,u.g0,O]]}),n})()}}]);