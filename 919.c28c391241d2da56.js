"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[919],{9952:(L,R,n)=>{n.d(R,{M:()=>U});var C=n(9947),e=n(8889),Z=n(9985),A=n(4623),E=n(6921),O=n(7613);function U(...B){const I=(0,O.jO)(B);return(0,C.e)((z,t)=>{const T=B.length,b=new Array(T);let f=B.map(()=>!1),h=!1;for(let u=0;u<T;u++)(0,Z.Xf)(B[u]).subscribe(new e.Q(t,x=>{b[u]=x,!h&&!f[u]&&(f[u]=!0,(h=f.every(A.y))&&(f=null))},E.Z));z.subscribe(new e.Q(t,u=>{if(h){const x=[u,...b];t.next(I?I(...x):x)}}))})}},9919:(L,R,n)=>{n.r(R),n.d(R,{DejaMessageBoxDemoModule:()=>te});var C=n(6019),e=n(9133),Z=n(86),A=n(888),E=n(5304),O=n(3660),U=n(2605),B=n(8643),I=n(3),z=n(4272),t=n(3668);let T=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[C.ez]]}),a})();var b=n(6412),f=n(3507),h=n(3067),u=n(1675),x=n(1574),$=n(273),F=n(7038),Y=n(5077),w=n(5583),Q=n(5933),l=n(4753),_=n(9463),s=n(461),M=n(9952),J=n(7384),N=n(8660),it=n(5180),st=n(8316),lt=n(9516);const X=function(a,i,o){(void 0!==o&&!(0,lt.Z)(a[i],o)||void 0===o&&!(i in a))&&(0,st.Z)(a,i,o)};var rt=n(5091),dt=n(1846),mt=n(1894),pt=n(1155),gt=n(4368),H=n(6247),K=n(6874),ut=n(5021),G=n(1467);var xt=n(8802),vt=n(3904),V=n(2057),_t=n(9250),Tt=n(7025),q=Function.prototype.toString,jt=Object.prototype.hasOwnProperty,Zt=q.call(Object);var At=n(4609);const S=function(a,i){if(("constructor"!==i||"function"!=typeof a[i])&&"__proto__"!=i)return a[i]};var Bt=n(1413),k=n(9659);const Pt=function(a,i,o,d,c,m,p){var g=S(a,o),r=S(i,o),j=p.get(r);if(j)X(a,o,j);else{var v=m?m(g,r,o+"",a,i,p):void 0,P=void 0===v;if(P){var y=(0,K.Z)(r),D=!y&&(0,xt.Z)(r),W=!y&&!D&&(0,At.Z)(r);v=r,y||D||W?(0,K.Z)(g)?v=g:function(a){return(0,G.Z)(a)&&(0,ut.Z)(a)}(g)?v=(0,pt.Z)(g):D?(P=!1,v=(0,dt.Z)(r,!0)):W?(P=!1,v=(0,mt.Z)(r,!0)):v=[]:function(a){if(!(0,G.Z)(a)||"[object Object]"!=(0,_t.Z)(a))return!1;var i=(0,Tt.Z)(a);if(null===i)return!0;var o=jt.call(i,"constructor")&&i.constructor;return"function"==typeof o&&o instanceof o&&q.call(o)==Zt}(r)||(0,H.Z)(r)?(v=g,(0,H.Z)(g)?v=function(a){return(0,Bt.Z)(a,(0,k.Z)(a))}(g):(!(0,V.Z)(g)||(0,vt.Z)(g))&&(v=(0,gt.Z)(r))):P=!1}P&&(p.set(r,v),c(v,r,d,m,p),p.delete(r)),X(a,o,v)}},Rt=function tt(a,i,o,d,c){a!==i&&(0,rt.Z)(i,function(m,p){if(c||(c=new it.Z),(0,V.Z)(m))Pt(a,i,p,o,tt,d,c);else{var g=d?d(S(a,p),m,p+"",a,i,c):void 0;void 0===g&&(g=m),X(a,p,g)}},k.Z)};var a,zt=n(5955),Yt=n(7905);const et=(a=function(a,i,o){Rt(a,i,o)},(0,zt.Z)(function(i,o){var d=-1,c=o.length,m=c>1?o[c-1]:void 0,p=c>2?o[2]:void 0;for(m=a.length>3&&"function"==typeof m?(c--,m):void 0,p&&(0,Yt.Z)(o[0],o[1],p)&&(m=c<3?void 0:m,c=1),i=Object(i);++d<c;){var g=o[d];g&&a(i,g,d)}return i}));class wt extends E.vA{}let ot=(()=>{class a extends class{constructor(i,o,d){this.lazyLoaderService=i,this.dialog=o,this.tooltipConfig=d,this.close$=new $.x,this.positions=[{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top",offsetY:20},{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom",offsetY:-20},{originX:"start",originY:"center",overlayX:"end",overlayY:"center",offsetX:-20},{originX:"end",originY:"center",overlayX:"start",overlayY:"top",offsetX:20},{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top",offsetY:20},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",offsetY:-20},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top",offsetY:20},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",offsetY:-20},{originX:"start",originY:"top",overlayX:"start",overlayY:"top"}],this.tooltipConfig||(this.tooltipConfig=new E.vA)}open$(i,o,d){this.close();const c=et(d,{hasBackdrop:!1,panelClass:["tooltip-overlay","no-padding-dialog","tooltip-opening"]}),m=this.openRef$(o,i,c).pipe((0,F.d)({bufferSize:1,refCount:!1})),g=m.pipe((0,h.w)(r=>{var at;const j=null==(at=r.componentInstance.elementRef)?void 0:at.nativeElement.parentElement,v=j?(0,Y.R)(j,"mouseenter"):w.E,P=i?(0,Y.R)(i,"mouseenter"):w.E,y=j?(0,Y.R)(j,"mouseleave"):w.E,D=i?(0,Y.R)(i,"mouseleave"):w.E,W=v.pipe((0,Q.b)(P),(0,l.U)(()=>!1)),ee=y.pipe((0,Q.b)(D),(0,l.U)(()=>!0));return W.pipe((0,Q.b)(ee),(0,_.b)(c.hideDelay||10),(0,s.h)(Boolean),(0,l.U)(()=>{}))})).pipe((0,Q.b)(this.close$),(0,M.M)(m),(0,J.b)(([r,j])=>j.removePanelClass("tooltip-opened")),(0,N.g)(300),(0,J.b)(([r,j])=>j.close(r)));return m.pipe((0,h.w)(r=>r.afterClosed()),(0,x.Te)(g),(0,F.d)({bufferSize:1,refCount:!1}))}close(){this.close$.next()}openRef$(i,o,d){return this.lazyLoaderService.loadModule$(this.getModule()).pipe((0,h.w)(c=>{const m=et({},this.tooltipConfig,d||{});m.data=i||{},m.minWidth=m.minWidth||"100px",this.dialog._injector=c.injector;const p=this.dialog.open(c.module.componentType,m);return p.afterOpened().pipe((0,l.U)(()=>p))}),(0,J.b)(c=>{var j;const p=null==(j=c.componentInstance.elementRef)?void 0:j.nativeElement.parentElement.getBoundingClientRect(),g=null==o?void 0:o.getBoundingClientRect(),r=document.body.getBoundingClientRect();p&&g?this.positions.find((v,P)=>{let y=v.offsetX||0;switch(v.originX){case"start":y+=g.left;break;case"end":y+=g.right;break;default:y+=g.left+g.width/2}let D=v.offsetY||0;switch(v.originY){case"top":D+=g.top;break;case"bottom":D+=g.bottom;break;default:D+=g.top+g.height/2}switch(v.overlayX){case"center":y-=p.width/2;break;case"end":y-=p.width}switch(v.overlayY){case"center":D-=p.height/2;break;case"bottom":D-=p.height}return!(P<this.positions.length-1&&(y<r.left||D<r.top||y+p.width>r.right||D+p.height>r.bottom)||(y+p.width>r.right&&(y=r.right-p.width),D+p.height>r.bottom&&(D=r.bottom-p.height),D<r.top&&(D=r.top),y<r.left&&(y=r.left),c.updatePosition({left:`${y}px`,top:`${D}px`}),c.addPanelClass("tooltip-opened"),0))}):console.error("A tooltip component must inherits from TooltipComponent directive. Position can't be updated")}))}}{constructor(o,d){const c=new wt;c.minWidth="800px",super(o,d,c)}getModule(){return n.e(183).then(n.bind(n,9183)).then(o=>o.NewsCardModule)}}return a.\u0275fac=function(o){return new(o||a)(t.LFG(x.jd),t.LFG(E.uw))},a.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac}),a})();var Ft=n(7991),Nt=n(9417),Wt=n(9468),nt=n(6263);let Lt=(()=>{class a extends x.yl{constructor(o){super(),this.delay=300;const d=o.nativeElement,c=(0,Y.R)(d,"mouseleave");(0,Y.R)(d,"mouseenter").pipe((0,h.w)(()=>(0,Nt.H)(this.delay).pipe((0,Wt.q)(1),(0,s.h)(()=>!!this.openTooltip$),(0,h.w)(()=>this.openTooltip$(d)),(0,nt.R)(c))),(0,nt.R)(this.destroyed$)).subscribe()}}return a.\u0275fac=function(o){return new(o||a)(t.Y36(t.SBq))},a.\u0275dir=t.lG2({type:a,selectors:[["","app-tooltip",""]],inputs:{delay:["tooltip-delay","delay"],openTooltip$:["app-tooltip","openTooltip$"]},features:[t.qOj]}),a})();function Xt(a,i){1&a&&(t.TgZ(0,"mat-card",5),t._UZ(1,"deja-markdown",6),t.qZA()),2&a&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/message-box/readme.md"))}function St(a,i){if(1&a){const o=t.EpF();t.TgZ(0,"button",31),t.NdJ("click",function(){return t.CHM(o),t.oxw(3).dialogTitle=null}),t._uU(1," Cancel "),t.qZA(),t.TgZ(2,"button",31),t.NdJ("click",function(){return t.CHM(o),t.oxw(3).dialogTitle=null}),t._uU(3," Ok "),t.qZA()}}function Ht(a,i){if(1&a){const o=t.EpF();t.TgZ(0,"deja-dialog",28),t.NdJ("closed",function(){return t.CHM(o),t.oxw(2).dialogTitle=null}),t.TgZ(1,"deja-message-box",29),t.NdJ("close",function(){return t.CHM(o),t.oxw(2).dialogTitle=null}),t._UZ(2,"span",30),t.YNc(3,St,4,0,"ng-template",null,18,t.W1O),t.qZA(),t.qZA()}if(2&a){const o=t.oxw(2);t.xp6(2),t.Q6J("innerHtml",o.dialogTitle,t.oJD)}}function Kt(a,i){1&a&&(t.TgZ(0,"button",32),t.TgZ(1,"mat-icon"),t._uU(2,"clear"),t.qZA(),t.qZA())}function Gt(a,i){if(1&a&&(t.TgZ(0,"div",7),t.YNc(1,Ht,5,1,"deja-dialog",8),t.TgZ(2,"deja-message-box",9),t._uU(3," Du texte dans la "),t.TgZ(4,"b"),t._uU(5,"message box"),t.qZA(),t.qZA(),t.TgZ(6,"deja-message-box",10),t._uU(7," Du texte dans la "),t.TgZ(8,"b"),t._uU(9,"message box"),t.qZA(),t.qZA(),t.TgZ(10,"deja-message-box",11),t.TgZ(11,"span",12),t._uU(12,'Un message "success (Rester sur moi avec la souris pour afficher un lazy tooltip)"'),t.qZA(),t.qZA(),t.TgZ(13,"deja-message-box",13),t._uU(14,' Un message "warn" '),t.TgZ(15,"b"),t._uU(16,"horizontal"),t.qZA(),t._uU(17," avec titre "),t.qZA(),t.TgZ(18,"deja-message-box",14),t._uU(19,' Un message "info" '),t.TgZ(20,"b"),t._uU(21,"horizontal"),t.qZA(),t.qZA(),t.TgZ(22,"deja-message-box",15),t._uU(23,' Un message "warn" '),t.TgZ(24,"b"),t._uU(25,"horizontal"),t.qZA(),t.qZA(),t._UZ(26,"div",16),t.TgZ(27,"deja-message-box",17),t._uU(28,' Un message "danger" '),t.TgZ(29,"b"),t._uU(30,"horizontal"),t.qZA(),t._uU(31," avec une action au format template "),t.YNc(32,Kt,3,0,"ng-template",null,18,t.W1O),t.qZA(),t.TgZ(34,"deja-message-box",19),t._uU(35," Un message horizontal sans type ni titre "),t.qZA(),t.TgZ(36,"deja-message-box",20),t._uU(37," Un message horizontal sans type ni titre "),t.qZA(),t.TgZ(38,"deja-message-box",21),t._uU(39," Un message horizontal sans type ni titre "),t.qZA(),t.TgZ(40,"deja-message-box",22),t._uU(41," Un message horizontal sans type ni titre "),t.qZA(),t.TgZ(42,"deja-message-box",23),t._uU(43," Un message horizontal sans type ni titre "),t.qZA(),t.TgZ(44,"deja-message-box",24),t.TgZ(45,"span",12),t._uU(46,'Un message "danger" (Rester sur moi avec la souris pour afficher un lazy tooltip)"'),t.qZA(),t.qZA(),t.TgZ(47,"deja-message-box",25),t.TgZ(48,"span",12),t._uU(49,'Un message "success" (Rester sur moi avec la souris pour afficher un lazy tooltip)"'),t.qZA(),t.qZA(),t.TgZ(50,"deja-message-box",26),t.TgZ(51,"span",12),t._uU(52,'Un message "warn" (Rester sur moi avec la souris pour afficher un lazy tooltip)"'),t.qZA(),t.qZA(),t.TgZ(53,"deja-message-box",27),t.TgZ(54,"span",12),t._uU(55,'Un message "info" (Rester sur moi avec la souris pour afficher un lazy tooltip)"'),t.qZA(),t.qZA(),t.qZA()),2&a){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.dialogTitle),t.xp6(1),t.Q6J("actions",o.closeAction),t.xp6(4),t.Q6J("actions",o.closeAction),t.xp6(4),t.Q6J("actions",o.actions),t.xp6(1),t.Q6J("app-tooltip",o.newsTooltip$),t.xp6(2),t.Q6J("actions",o.closeAction),t.xp6(9),t.Q6J("actions",o.closeAction),t.xp6(14),t.Q6J("actions",o.closeAction),t.xp6(8),t.Q6J("actions",o.actions),t.xp6(1),t.Q6J("app-tooltip",o.newsTooltip$),t.xp6(2),t.Q6J("actions",o.actions),t.xp6(1),t.Q6J("app-tooltip",o.newsTooltip$),t.xp6(2),t.Q6J("actions",o.actions),t.xp6(1),t.Q6J("app-tooltip",o.newsTooltip$),t.xp6(2),t.Q6J("actions",o.actions),t.xp6(1),t.Q6J("app-tooltip",o.newsTooltip$)}}let Vt=(()=>{class a{constructor(o,d){this.tabIndex=1,this.actions=[{action:()=>{this.dialogTitle="<b>I am a deja-dialog !</b><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet felis id nisl maximus interdum. Morbi mollis sapien sapien. Vivamus lacinia elementum eros"},text:"Cliquez moi pour ouvrir une deja-dialog",type:"primary"},{action:()=>alert("test action"),text:"test sans icon"},{action:()=>alert("test action"),type:"danger"}],this.closeAction=[{action:()=>alert("test action"),icon:"clear"}],this.newsTooltip$=c=>o.getNews$(10).pipe((0,h.w)(m=>d.open$(c,null==m?void 0:m[Math.round(10*Math.random())])))}}return a.\u0275fac=function(o){return new(o||a)(t.Y36(u.Y),t.Y36(ot))},a.\u0275cmp=t.Xpm({type:a,selectors:[["message-box-demo"]],decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],["class","example",4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],[1,"example"],[3,"closed",4,"ngIf"],["type","primary","title","Title",3,"actions"],["type","primary","title","Title","horizontal","",3,"actions"],["type","success",3,"actions"],[3,"app-tooltip"],["type","warn","horizontal","","title","Title",3,"actions"],["type","info","horizontal",""],["type","warn","horizontal","",3,"actions"],[2,"margin","1rem"],["type","danger","horizontal","","title","Title"],["actionsTemplate",""],["horizontal",""],["type","danger","horizontal","","light","",3,"actions"],["type","success","horizontal","","light",""],["type","warn","horizontal","","light",""],["type","info","horizontal","","light",""],["type","danger","light","",3,"actions"],["type","success","light","",3,"actions"],["type","warn","light","",3,"actions"],["type","info","light","",3,"actions"],[3,"closed"],["type","primary","title","Title","showCloseIcon","true",3,"close"],[3,"innerHtml"],["mat-button","",3,"click"],["mat-icon-button",""]],template:function(o,d){1&o&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(m){return d.tabIndex=m.index}),t._UZ(1,"mat-tab",1),t._UZ(2,"mat-tab",2),t.qZA(),t.YNc(3,Xt,2,1,"mat-card",3),t.YNc(4,Gt,56,16,"div",4)),2&o&&(t.Q6J("selectedIndex",d.tabIndex),t.xp6(3),t.Q6J("ngIf",0===d.tabIndex),t.xp6(1),t.Q6J("ngIf",1===d.tabIndex))},directives:[U.SP,U.uX,C.O5,A.a8,Ft.F,z.b,Lt,I.a,Z.lW,O.Hw],styles:["[_nghost-%COMP%]   .example[_ngcontent-%COMP%]{margin-top:2rem}[_nghost-%COMP%]   deja-message-box[_ngcontent-%COMP%]{margin-bottom:1rem}"]}),a})();const kt=f.Bz.forChild([{path:"",component:Vt},{path:"**",redirectTo:"",pathMatch:"full"}]);let te=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({providers:[ot],imports:[[C.ez,I.W,b.O,z.J,e.u5,Z.ot,A.QW,E.Is,O.Ps,U.Nh,B.g0,kt,T]]}),a})()},3:(L,R,n)=>{n.d(R,{a:()=>z,W:()=>t});var C=n(6019),e=n(3668),Z=n(1574),A=n(5077),E=n(461),O=n(6263);const U=["okaction"],B=["cancelaction"],I=["*"];let z=(()=>{class T extends Z.yl{constructor(f){super(),this.closed=new e.vpe,(0,A.R)(f.nativeElement.ownerDocument,"keyup").pipe((0,E.h)(u=>{var x,$;return!(u.code!==Z.mW.Enter||!(null==(x=this.okButton)?void 0:x._elementRef))||!(u.code!==Z.mW.Escape||!(null==($=this.cancelButton)?void 0:$._elementRef))}),(0,O.R)(this.destroyed$)).subscribe(u=>{u.code===Z.mW.Enter?this.okButton._elementRef.nativeElement.click():u.code===Z.mW.Escape&&this.cancelButton._elementRef.nativeElement.click()})}close(f){let h=!0,u=f.target;const x=f.currentTarget;for(;u.parentElement&&u!==x;)"dialog"===u.className&&(h=!1),u=u.parentElement;h&&(this.closed.emit(),f.preventDefault())}}return T.\u0275fac=function(f){return new(f||T)(e.Y36(e.SBq))},T.\u0275cmp=e.Xpm({type:T,selectors:[["deja-dialog"]],contentQueries:function(f,h,u){if(1&f&&(e.Suo(u,U,5),e.Suo(u,B,5)),2&f){let x;e.iGM(x=e.CRH())&&(h.okButton=x.first),e.iGM(x=e.CRH())&&(h.cancelButton=x.first)}},hostBindings:function(f,h){1&f&&e.NdJ("click",function(x){return h.close(x)})},outputs:{closed:"closed"},features:[e.qOj],ngContentSelectors:I,decls:2,vars:0,consts:[[1,"dialog"]],template:function(f,h){1&f&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.qZA())},styles:["[_nghost-%COMP%]{align-items:center;background-color:#0009;display:flex;height:100%;justify-content:center;left:0;position:fixed;top:0;width:100%;z-index:999}[_nghost-%COMP%]   .dialog[_ngcontent-%COMP%]{z-index:1000}"]}),T})(),t=(()=>{class T{}return T.\u0275fac=function(f){return new(f||T)},T.\u0275mod=e.oAB({type:T}),T.\u0275inj=e.cJS({imports:[[C.ez]]}),T})()},4272:(L,R,n)=>{n.d(R,{b:()=>w,J:()=>Q});var C=n(6019),e=n(3668),Z=n(86),A=n(888),E=n(3660),O=n(348);const U=["actionsTemplate"];function B(l,_){if(1&l&&(e.TgZ(0,"mat-icon",6),e._uU(1),e.qZA()),2&l){const s=e.oxw(2);e.xp6(1),e.Oqu(s.icon)}}function I(l,_){if(1&l&&(e.TgZ(0,"span",7),e._uU(1),e.qZA()),2&l){const s=e.oxw(2);e.xp6(1),e.Oqu(s.title)}}function z(l,_){if(1&l){const s=e.EpF();e.TgZ(0,"button",8),e.NdJ("click",function(){return e.CHM(s),e.oxw(2).onClose()}),e.TgZ(1,"mat-icon"),e._uU(2,"close"),e.qZA(),e.qZA()}}function t(l,_){if(1&l&&(e.TgZ(0,"mat-card-title"),e.YNc(1,B,2,1,"mat-icon",3),e.YNc(2,I,2,1,"span",2),e.TgZ(3,"div",4),e.YNc(4,z,3,0,"button",5),e.qZA(),e.qZA()),2&l){const s=e.oxw();e.xp6(1),e.Q6J("ngIf",s.icon),e.xp6(1),e.Q6J("ngIf",!s.horizontal),e.xp6(2),e.Q6J("ngIf",s.showCloseIcon)}}function T(l,_){if(1&l&&(e.TgZ(0,"h2",7),e._uU(1),e.qZA()),2&l){const s=e.oxw();e.xp6(1),e.Oqu(s.title)}}function b(l,_){if(1&l){const s=e.EpF();e.TgZ(0,"button",12),e.NdJ("click",function(){return e.CHM(s),e.oxw().$implicit.action()}),e._uU(1),e.qZA()}if(2&l){const s=e.oxw().$implicit;e.uIk("data-icon",s.icon),e.xp6(1),e.hij(" ",s.text," ")}}function f(l,_){if(1&l&&(e.TgZ(0,"mat-icon"),e._uU(1),e.qZA()),2&l){const s=e.oxw(2).$implicit;e.xp6(1),e.Oqu(s.icon)}}function h(l,_){if(1&l){const s=e.EpF();e.TgZ(0,"button",13),e.NdJ("click",function(){return e.CHM(s),e.oxw().$implicit.action()}),e.YNc(1,f,2,1,"mat-icon",1),e.qZA()}if(2&l){const s=e.oxw().$implicit;e.ekj("action-button",!s.type),e.xp6(1),e.Q6J("ngIf",s.icon)}}function u(l,_){if(1&l&&(e.TgZ(0,"span"),e.YNc(1,b,2,2,"button",10),e.YNc(2,h,2,3,"button",11),e.qZA()),2&l){const s=_.$implicit;e.xp6(1),e.Q6J("ngIf",s.text),e.xp6(1),e.Q6J("ngIf",s.icon&&!s.text)}}function x(l,_){if(1&l&&(e.TgZ(0,"mat-card-actions"),e.YNc(1,u,3,2,"span",9),e.qZA()),2&l){const s=e.oxw();e.xp6(1),e.Q6J("ngForOf",s.actions)}}function $(l,_){}function F(l,_){if(1&l&&(e.TgZ(0,"mat-card-actions"),e.YNc(1,$,0,0,"ng-template",14),e.qZA()),2&l){const s=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",s.actionsTemplate)}}const Y=["*"];let w=(()=>{class l{constructor(){this.close=new e.vpe,this._showCloseIcon=!1}set horizontal(s){this._horizontal=(0,O.Ig)(s)}get horizontal(){return this._horizontal}set showCloseIcon(s){this._showCloseIcon=(0,O.Ig)(s)}get showCloseIcon(){return this._showCloseIcon}ngOnInit(){!this.icon&&this.type&&(this.icon=this.getIconFromType(this.type)),this.actions&&this.actions.forEach(s=>{!s.icon&&s.type&&(s.icon=this.getIconFromType(s.type))})}onClose(){this.close.emit()}getIconFromType(s){switch(s){case"info":case"primary":return s="primary","info_outline";case"success":return"done";case"warn":return"warning_outline";case"danger":return"error_outline";default:return null}}}return l.\u0275fac=function(s){return new(s||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["deja-message-box"]],contentQueries:function(s,M,J){if(1&s&&e.Suo(J,U,5),2&s){let N;e.iGM(N=e.CRH())&&(M.actionsTemplate=N.first)}},inputs:{type:"type",title:"title",icon:"icon",actions:"actions",horizontal:"horizontal",showCloseIcon:"showCloseIcon"},outputs:{close:"close"},ngContentSelectors:Y,decls:7,vars:7,consts:[["id","msgbox"],[4,"ngIf"],["id","title",4,"ngIf"],["id","icon",4,"ngIf"],[1,"header-actions"],["mat-icon-button","","type","button","class","close",3,"click",4,"ngIf"],["id","icon"],["id","title"],["mat-icon-button","","type","button",1,"close",3,"click"],[4,"ngFor","ngForOf"],["mat-button","","type","button","class","with-icon",3,"click",4,"ngIf"],["mat-icon-button","","type","button",3,"action-button","click",4,"ngIf"],["mat-button","","type","button",1,"with-icon",3,"click"],["mat-icon-button","","type","button",3,"click"],[3,"ngTemplateOutlet"]],template:function(s,M){1&s&&(e.F$t(),e.TgZ(0,"mat-card",0),e.YNc(1,t,5,3,"mat-card-title",1),e.TgZ(2,"mat-card-content"),e.YNc(3,T,2,1,"h2",2),e.Hsn(4),e.qZA(),e.YNc(5,x,2,1,"mat-card-actions",1),e.YNc(6,F,2,1,"mat-card-actions",1),e.qZA()),2&s&&(e.Tol(M.type),e.xp6(1),e.Q6J("ngIf",M.icon||M.showCloseIcon),e.xp6(2),e.Q6J("ngIf",M.horizontal&&M.title),e.xp6(2),e.Q6J("ngIf",M.actions),e.xp6(1),e.Q6J("ngIf",!M.actions&&M.actionsTemplate))},directives:[A.a8,C.O5,A.dn,A.n5,E.Hw,Z.lW,A.hq,C.sg,C.tP],styles:["deja-message-box{display:block;border-radius:3px;overflow:hidden;background-color:transparent}deja-message-box #msgbox{border:0;margin:0;padding:0;display:block;border-radius:3px}deja-message-box #msgbox>.mat-card-title{text-transform:uppercase;align-items:center;display:flex;margin:0;padding:1rem 0 0 1.2rem;font-size:1rem}deja-message-box #msgbox>.mat-card-title #icon{margin-right:.3rem}deja-message-box #msgbox>.mat-card-title .header-actions{position:absolute;top:0;right:0}deja-message-box #msgbox>.mat-card-content{margin:0;overflow:hidden;font-weight:300;padding:.5rem .75rem .75rem 1.3rem}deja-message-box #msgbox>.mat-card-content h2{font-size:1rem;margin:0;font-weight:500;text-transform:uppercase;line-height:1.5rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}deja-message-box #msgbox>.mat-card-actions{align-items:center;display:flex;justify-content:flex-end;margin:0;padding:.5rem}deja-message-box[horizontal] #msgbox{align-items:stretch;display:flex;flex-direction:row;padding:0;position:relative}deja-message-box[horizontal] #msgbox>.mat-card-title{align-items:center;display:flex;flex:0 0 auto;justify-content:center;margin:0;text-align:center;padding:.5rem 0 .5rem .8rem}deja-message-box[horizontal] #msgbox>.mat-card-title #icon{margin:0}deja-message-box[horizontal] #msgbox>.mat-card-content{align-self:center;flex:1 1 auto;padding:.75rem}deja-message-box[horizontal] #msgbox>.mat-card-actions{margin:0;padding:0;position:absolute;right:0;top:0}deja-message-box[horizontal] #msgbox>.mat-card-actions [mat-icon-button] mat-icon{font-size:1rem}\n"],encapsulation:2}),l})(),Q=(()=>{class l{}return l.\u0275fac=function(s){return new(s||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[[C.ez,Z.ot,A.QW,E.Ps]]}),l})()}}]);