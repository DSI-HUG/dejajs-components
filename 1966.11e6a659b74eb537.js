"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[1966],{5235:(Q,k,r)=>{r.r(k),r.d(k,{DejaRangeDemoModule:()=>be});var p=r(9808),R=r(3075),y=r(7423),Z=r(9224),W=r(3251),E=r(4594),J=r(9623),e=r(5e3),v=r(3191),P=r(7916),d=r(4968),A=r(2181),j=r(5698),U=r(4004),B=r(2722);const K=["rangeTemplate"],$=["separatorTemplate"];function Y(a,i){if(1&a&&(e.TgZ(0,"span",7),e._uU(1),e.qZA()),2&a){const t=e.oxw().$implicit;e.xp6(1),e.AsE("",t.min," - ",t.max,"")}}function z(a,i){}function V(a,i){1&a&&(e.TgZ(0,"span",10),e._UZ(1,"span",11),e.qZA())}function L(a,i){}const S=function(a,i,t){return{$implicit:a,index:i,ranges:t}};function X(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"span",8),e.NdJ("mousedown",function(o){e.CHM(t);const s=e.oxw().index,c=e.oxw();return e.KtG(c.onMouseDown(o,s))}),e.YNc(1,V,2,0,"span",9),e.YNc(2,L,0,0,"ng-template",5),e.qZA()}if(2&a){const t=e.oxw(),n=t.$implicit,o=t.index,s=e.oxw();e.xp6(1),e.Q6J("ngIf",!s.separatorTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",s.separatorTemplate)("ngTemplateOutletContext",e.kEZ(3,S,n,o,s.ranges))}}function q(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"section",2)(1,"span",3),e.NdJ("mousedown",function(o){const c=e.CHM(t).index,g=e.oxw();return e.KtG(g.onSelect(o,c))}),e.YNc(2,Y,2,2,"span",4),e.YNc(3,z,0,0,"ng-template",5),e.qZA(),e.YNc(4,X,3,7,"span",6),e.qZA()}if(2&a){const t=i.$implicit,n=i.index,o=e.oxw();e.Udp("width",t.$width,"px"),e.xp6(1),e.ekj("selected",o.selected===n),e.xp6(1),e.Q6J("ngIf",!o.rangeTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",o.rangeTemplate)("ngTemplateOutletContext",e.kEZ(8,S,t,n,o.ranges)),e.xp6(1),e.Q6J("ngIf",o.ranges.length>n+1)}}class _{constructor(i,t,n,o){this.min=i,this.max=t,this.$width=n,this.trackBy=o}}let ee=(()=>{class a extends P.yl{constructor(t,n,o){super(),this.changeDetectorRef=t,this.elementRef=n,this.control=o,this.select=new e.vpe,this.errorFeedback=new e.vpe,this.step=1,this.selected=0,this.minimumRangePercentage=.01,this._readOnly=!0,this._disabled=!1,this._onChangeCallback=s=>{},this._onTouchCallback=()=>{},this.control&&(this.control.valueAccessor=this)}onResize(){this.ranges=this.ranges.concat()}registerOnChange(t){this._onChangeCallback=t}registerOnTouched(t){this._onTouchCallback=t}get ranges(){return this._ranges||[]}set ranges(t){t&&(this.writeValue(t),this._onChangeCallback(t))}set disabled(t){this._disabled=(0,v.Ig)(t),this.changeDetectorRef.markForCheck()}get disabled(){return this._disabled}set readOnly(t){this._readOnly=(0,v.Ig)(t)}get readOnly(){return this._readOnly||this.disabled}writeValue(t){if(t&&t.length){const o=this.elementRef.nativeElement.firstElementChild.getBoundingClientRect().width,s=t[t.length-1].max-t[0].min;this._ranges=t.map((c,g)=>(c.$width=+(o*((t[g].max-t[g].min)/(s/100))/100).toFixed(2),c)),this.changeDetectorRef.markForCheck()}}setDisabledState(t){this.disabled=t}add(){if(!this.readOnly){if("number"!=typeof this.step)throw new Error("Invalid step type, you have to implement the add function yourself for the fn & array.");{const t=this.ranges,n=this.selected,o=t[n],s=o.max-o.min;let x,f;const b=s>=2*this.step;if(s/(t[t.length-1].max-t[0].min)>2*this.minimumRangePercentage&&b){x=o.min+s/2,f=new _(o.min,x),o.min=x;let l=[...t.slice(0,n),f,o,...t.length-1>n?t.slice(n+1):[]];const M=l.indexOf(f);l[M].max=this.toStep(l,M,l[M].max),l=l.map((O,w)=>(0!==w&&(O.min=l[w-1].max),O)),this.ranges=l}else this.errorFeedback.emit(new Error("Range is too small to be splitted"))}}}remove(){if(!this.readOnly&&this.ranges.length>2){const t=this.ranges.filter((n,o)=>this.selected!==o);this.ranges=t.map((n,o)=>(o!==t.length-1&&(n.max=t[o+1].min),n))}}refresh(){this.changeDetectorRef.markForCheck()}onSelect(t,n){if(!this.disabled&&this.selected!==n){const o=t;o.range=this.ranges[n],o.index=n,o.ranges=this.ranges,this.select.emit(o),this.selected=n}}onMouseDown(t,n){if(!this.readOnly){const o=t.pageX,c=this.ranges,g=this.ranges[n],D=g.max;let h=t.target.parentElement;for(;!h.classList.contains("block");)h=h.parentElement;const x=(0,d.R)(document,"mouseup"),f=(0,d.R)(document.body,"mouseleave"),b=x.pipe((0,A.b)(f),(0,j.q)(1),(0,U.U)(()=>{this.elementRef.nativeElement.firstElementChild.ownerDocument.body.classList.remove("noselect"),this._onChangeCallback(this._ranges)}),(0,A.b)(this.destroyed$));(0,d.R)(document,"mousemove").pipe((0,B.R)(b)).subscribe(C=>{const M=-(o-C.pageX),O=this.ranges[n+1],w=c[c.length-1].max-c[0].min,F=this.elementRef.nativeElement.firstElementChild,I=F.getBoundingClientRect().width;F.ownerDocument.body.classList.add("noselect");let T=D+M*w/I;const G=this.minimumRangePercentage*w,Re=g.min+G;T=Math.min(T,O.max-G),T=Math.max(T,Re);const Pe=this.toStep(c,n,T);O.min=g.max=Pe,c[n]=g,c[n+1]=O,this.writeValue(c)})}}trackBy(t,n){return n.trackBy||n}toStep(t,n,o){const s=t[n],g=t[t.length-1>n?n+1:n].max,D=0!==n?t[n-1].max:0,x=this.minimumRangePercentage*(t[t.length-1].max-t[0].min),f=s.min+x,b=g-x;if("number"==typeof this.step){const m=this.step,C=100/(100*m),l=Math.round(o*C)/C,M=m.toString().replace(/[0-9]+\./,"").length,O=+l.toFixed(M),w=Math.min(O,g-m),F=Math.max(O,D+m),I=f<F?F:f,N=b>w?w:b;return o>s.max?N:I}if("function"==typeof this.step){const m={};return m.range=this.ranges[n],m.index=n,m.ranges=this.ranges,m.newMax=o,this.step(m)}if(this.step instanceof Array){let C,m=o;return this.step.filter(l=>l<=b&&l>=f).forEach(l=>{const M=Math.abs(l-o);(void 0===C||C>M)&&(m=l,C=M)}),m}throw new Error("Invalid step type.")}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(e.sBO),e.Y36(e.SBq),e.Y36(R.a5,10))},a.\u0275cmp=e.Xpm({type:a,selectors:[["deja-range"]],contentQueries:function(t,n,o){if(1&t&&(e.Suo(o,K,5),e.Suo(o,$,5)),2&t){let s;e.iGM(s=e.CRH())&&(n.rangeTemplate=s.first),e.iGM(s=e.CRH())&&(n.separatorTemplate=s.first)}},hostBindings:function(t,n){1&t&&e.NdJ("resize",function(){return n.onResize()},!1,e.Jf7)},inputs:{step:"step",selected:"selected",disabled:"disabled",readOnly:"readOnly"},outputs:{select:"select",errorFeedback:"errorFeedback"},features:[e.qOj],decls:2,vars:2,consts:[["id","container"],["class","block",3,"width",4,"ngFor","ngForOf","ngForTrackBy"],[1,"block"],[1,"range",3,"mousedown"],["class","default-range",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["class","separator",3,"mousedown",4,"ngIf"],[1,"default-range"],[1,"separator",3,"mousedown"],["class","default-separator",4,"ngIf"],[1,"default-separator"],[1,"default-separator-item"]],template:function(t,n){1&t&&(e.TgZ(0,"section",0),e.YNc(1,q,5,12,"section",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",n.ranges)("ngForTrackBy",n.trackBy))},dependencies:[p.sg,p.O5,p.tP],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;box-shadow:0 2px 1px -1px #0003,0 1px 1px #00000024,0 1px 3px #0000001f;height:32px}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{user-select:none}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .block[_ngcontent-%COMP%]{display:inline-flex}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{display:inline-flex;flex-grow:100;justify-content:center}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{display:inline-flex;flex-basis:auto;justify-content:center;z-index:5}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]:hover{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{width:7px;cursor:pointer}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .default-range[_ngcontent-%COMP%]{align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{cursor:ew-resize}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]   .default-separator[_ngcontent-%COMP%]{width:7px;height:25.6px;margin-top:3.2px;display:flex;justify-content:center}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]   .default-separator[_ngcontent-%COMP%]   .default-separator-item[_ngcontent-%COMP%]{height:100%;width:1px}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range.selected[_ngcontent-%COMP%]{animation-name:selected;animation-duration:175ms;animation-fill-mode:both;animation-timing-function:ease-in-out}[_nghost-%COMP%]   #container[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]:not(.selected){animation-name:not-selected;animation-duration:175ms;animation-fill-mode:both;animation-timing-function:ease-in-out}"],changeDetection:0}),a})(),te=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[p.ez]}),a})();var H=r(9321),ne=r(3485),oe=r(1865),ae=r(2076),se=r(2940),ie=r(6590);class u{constructor(i,t){this.minWeight=i,this.maxWeight=t}}const re=[new _(4,16),new _(16,20),new _(20,24),new _(24,36)],ce=[new _(0,12.5),new _(12.5,25),new _(25,30)],ge=[new _(0,12),new _(12,20),new _(20,24)],le=[new u(3,4),new u(4,6),new u(6,9),new u(9,12),new u(12,16),new u(16,20),new u(20,25),new u(25,32),new u(32,40),new u(40,200)],me=[1,2,4,8,16,20,22,24];var de=r(1339);const he=["dejaRange"],pe=["dejaWeight"];function _e(a,i){1&a&&(e.TgZ(0,"mat-card",5),e._UZ(1,"deja-markdown",6),e.qZA()),2&a&&(e.xp6(1),e.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/range/readme.md"))}function ue(a,i){if(1&a&&(e.TgZ(0,"span",22),e._uU(1),e.ALo(2,"number"),e.ALo(3,"number"),e.qZA()),2&a){const t=i.$implicit;e.xp6(1),e.AsE("",e.xi3(2,2,t.minWeight,"1.0-2")," - ",e.xi3(3,5,t.maxWeight,"1.0-2")," kg")}}function fe(a,i){1&a&&(e.TgZ(0,"span",23),e.O4$(),e.TgZ(1,"svg",24),e._UZ(2,"polygon",25),e.qZA(),e.TgZ(3,"svg",26),e._UZ(4,"rect",27),e.qZA(),e.TgZ(5,"svg",24),e._UZ(6,"polygon",28),e.qZA()())}function Ce(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"deja-snackbar",30),e.NdJ("onAnimationDone",function(){e.CHM(t);const o=e.oxw().$implicit;return e.KtG(o.gate=!1)}),e.TgZ(1,"deja-message-box",31),e._uU(2),e.qZA()()}if(2&a){const t=e.oxw().$implicit;e.Q6J("duration",5e3),e.xp6(2),e.Oqu(t.message)}}function xe(a,i){if(1&a&&e.YNc(0,Ce,3,2,"deja-snackbar",29),2&a){const t=i.$implicit;e.Q6J("ngIf",null==t?null:t.gate)}}function Me(a,i){if(1&a){const t=e.EpF();e.TgZ(0,"div")(1,"mat-card",7)(2,"mat-toolbar",8),e._uU(3,"Default template : Read Only"),e.qZA(),e.TgZ(4,"mat-card-content")(5,"deja-range",9),e.NdJ("ngModelChange",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.readOnlyRanges=o)}),e.qZA()()(),e.TgZ(6,"mat-card",7)(7,"mat-toolbar",8),e._uU(8,"Default template : Movable separator, with an array of accepted intervals"),e.qZA(),e.TgZ(9,"mat-card-content")(10,"deja-range",10),e.NdJ("ngModelChange",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.rangesWithInterval=o)}),e.qZA()()(),e.TgZ(11,"mat-card",7)(12,"mat-toolbar",8),e._uU(13,"Default template : Movable separator, with a numeric step"),e.qZA(),e.TgZ(14,"mat-card-content")(15,"deja-range",11,12),e.NdJ("ngModelChange",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.ranges=o)})("errorFeedback",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.errorFeed.emit(o))}),e.qZA()(),e.TgZ(17,"mat-card-content")(18,"button",13),e._uU(19,"Simple"),e.qZA(),e.TgZ(20,"button",14),e.NdJ("click",function(){e.CHM(t);const o=e.MAs(16);return e.KtG(o.add())}),e._uU(21,"Split selected range"),e.qZA(),e.TgZ(22,"button",14),e.NdJ("click",function(){e.CHM(t);const o=e.MAs(16);return e.KtG(o.remove())}),e._uU(23,"Remove selected range"),e.qZA()()(),e.TgZ(24,"mat-card",7)(25,"mat-toolbar",8),e._uU(26,"Custom template : Movable separator, with a function based step, logarithmic interpolation bewtween the model (weight) and the inner model"),e.qZA(),e.TgZ(27,"mat-card-content")(28,"deja-range",15,16),e.NdJ("ngModelChange",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.weights=o)})("ngModelChange",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.computeRangeFromWeight())})("errorFeedback",function(o){e.CHM(t);const s=e.oxw();return e.KtG(s.errorFeed.emit(o))}),e.YNc(30,ue,4,8,"ng-template",null,17,e.W1O),e.YNc(32,fe,7,0,"ng-template",null,18,e.W1O),e.qZA()(),e.TgZ(34,"mat-card-content")(35,"button",14),e.NdJ("click",function(){e.CHM(t);const o=e.MAs(29),s=e.oxw();return e.KtG(s.add(o.selected))}),e._uU(36,"Split selected range"),e.qZA(),e.TgZ(37,"button",14),e.NdJ("click",function(){e.CHM(t);const o=e.MAs(29),s=e.oxw();return e.KtG(s.remove(o.selected))}),e._uU(38,"Remove selected range"),e.qZA(),e.TgZ(39,"button",19),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.decrease())}),e._uU(40,"Decrease minimum"),e.qZA(),e.TgZ(41,"button",20),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.increase())}),e._uU(42,"Increase maximum"),e.qZA()()(),e.YNc(43,xe,1,1,"ng-template",21),e.ALo(44,"async"),e.qZA()}if(2&a){const t=e.oxw();e.xp6(5),e.Q6J("ngModel",t.readOnlyRanges),e.xp6(5),e.Q6J("ngModel",t.rangesWithInterval)("readOnly",!1)("selected",1)("step",t.steps),e.xp6(5),e.Q6J("ngModel",t.ranges)("readOnly",!1)("step",2.5),e.xp6(13),e.Q6J("ngModel",t.weights)("readOnly",!1)("selected",0)("step",t.stepFn),e.xp6(11),e.Q6J("disabled",0===(null==t.weights[0]?null:t.weights[0].minWeight)),e.xp6(4),e.Q6J("ngForOf",e.lcZ(44,14,t.errors$))}}const De=oe.Bz.forChild([{path:"",component:(()=>{class a{constructor(){this.errorFeed=new e.vpe,this.tabIndex=1,this.numericStep=1,this.readOnlyRanges=re,this.rangesWithInterval=ge,this.ranges=ce,this.weights=le,this.steps=me,this.computeRangeFromWeight(),this.errors$=(0,ae.D)(this.errorFeed).pipe((0,U.U)(t=>({gate:!0,message:t.message})),(0,se.R)((t,n)=>[...t,n],[]),(0,ie.d)([]))}computeRangeFromWeight(){let t=0;this.weights=this.weights.map(n=>{const s=Math.log(4*(n.maxWeight-n.minWeight));return n.min=t,n.max=t+s,t+=s,n})}stepFn(t){const n=t.ranges[t.index],o=t.ranges.length-1===t.index,c=Math.pow(Math.E,t.newMax-n.min)/4;let g=n.minWeight+c;if(g=Math.round(g),g=Math.max(g,n.minWeight+1),!o){const h=t.ranges[t.index+1];g=Math.min(g,h.maxWeight-1),h.minWeight=g,n.maxWeight=g}return n.min+Math.log(4*(g-n.minWeight))}remove(t){if(this.weights.length>=2){const n=this.weights.find((s,c)=>t===c),o=this.weights.filter((s,c)=>t!==c);t>0&&(o[t-1].maxWeight=n.maxWeight),this.weights=o,this.weightRef.selected=0,this.computeRangeFromWeight()}}add(t){const n=this.weights.find((s,c)=>t===c),o=n.maxWeight-n.minWeight;if(o>=2){const s=new u(n.minWeight,n.minWeight+o/2);n.minWeight=n.minWeight+o/2;const c=0!==t?this.weights.slice(0,t):[],g=t<this.weights.length?this.weights.slice(t+1):[];this.weights=[...c,s,n,...g],this.weightRef.selected=0,this.computeRangeFromWeight()}}increase(){this.weights[this.weights.length-1].maxWeight++,this.computeRangeFromWeight()}decrease(){this.weights[0].minWeight>0&&(this.weights[0].minWeight--,this.computeRangeFromWeight())}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["deja-range-demo"]],viewQuery:function(t,n){if(1&t&&(e.Gf(he,5),e.Gf(pe,5)),2&t){let o;e.iGM(o=e.CRH())&&(n.rangeRef=o.first),e.iGM(o=e.CRH())&&(n.weightRef=o.first)}},outputs:{errorFeed:"errorFeed"},decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],[1,"demo-card"],["color","primary"],[3,"ngModel","ngModelChange"],[3,"ngModel","readOnly","selected","step","ngModelChange"],[3,"ngModel","readOnly","step","ngModelChange","errorFeedback"],["dejaRange",""],["mat-raised-button",""],["mat-raised-button","",3,"click"],["id","custom-range",3,"ngModel","readOnly","selected","step","ngModelChange","errorFeedback"],["dejaWeight",""],["rangeTemplate",""],["separatorTemplate",""],["id","decrease","mat-raised-button","",3,"disabled","click"],["id","increase","mat-raised-button","",3,"click"],["ngFor","",3,"ngForOf"],[1,"custom-range"],[1,"custom-separator"],[1,"triangle"],["points","0,0 10,0 5,5"],[1,"line"],["x","4.5","y","0"],["points","0,5 5,0 10,5 "],["alignment","bottom right",3,"duration","onAnimationDone",4,"ngIf"],["alignment","bottom right",3,"duration","onAnimationDone"],["type","warn","horizontal",""]],template:function(t,n){1&t&&(e.TgZ(0,"mat-tab-group",0),e.NdJ("selectedTabChange",function(s){return n.tabIndex=s.index}),e._UZ(1,"mat-tab",1)(2,"mat-tab",2),e.qZA(),e.YNc(3,_e,2,1,"mat-card",3),e.YNc(4,Me,45,16,"div",4)),2&t&&(e.Q6J("selectedIndex",n.tabIndex),e.xp6(3),e.Q6J("ngIf",0===n.tabIndex),e.xp6(1),e.Q6J("ngIf",1===n.tabIndex))},dependencies:[p.sg,p.O5,de.F,J.b,ee,H.w,R.JJ,R.On,y.lW,Z.a8,Z.dn,W.SP,W.uX,E.Ye,p.Ov,p.JJ],styles:["[_nghost-%COMP%]   #custom-range-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-around}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:24px}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:block;flex-grow:1;flex-shrink:0;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:1;flex-basis:36px;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]{flex-basis:max-content;align-self:center;height:24px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-range[_ngcontent-%COMP%]{display:flex;align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]{display:flex;width:10px;flex-wrap:wrap}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]{margin-top:-5px;width:10px;height:5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{fill:#333}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]{height:34px;margin-top:-5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%]{fill:#333;height:34px;width:1px}"]}),a})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let be=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[p.ez,ne.O,J.J,te,H.n,R.u5,y.ot,Z.QW,W.Nh,E.g0,De]}),a})()},7331:(Q,k,r)=>{r.d(k,{D:()=>W});var p=r(4482),R=r(5032),y=r(5403),Z=r(8421);function W(E){return(0,p.e)((J,e)=>{let v=!1,P=null,d=null;const A=()=>{if(null==d||d.unsubscribe(),d=null,v){v=!1;const j=P;P=null,e.next(j)}};J.subscribe((0,y.x)(e,j=>{null==d||d.unsubscribe(),v=!0,P=j,d=(0,y.x)(e,A,R.Z),(0,Z.Xf)(E(j)).subscribe(d)},()=>{A(),e.complete()},void 0,()=>{P=d=null}))})}}}]);