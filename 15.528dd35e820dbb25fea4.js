(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"0M4/":function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),a=function(){},o=l("lzlj"),i=l("FVSy"),r=l("w6M7"),u=l("iss+"),d=l("t/Na"),c=l("ZYjt"),s=l("73VK"),m=l("glHa"),p=l("ca9q"),b=l("Hv1I"),f=l("bujt"),g=l("UodH"),h=l("dWZg"),x=l("lLAP"),v=l("Mr+X"),w=l("SMsm"),y=l("Ip0R"),k=l("Rlre"),R=l("La40"),C=l("jdxo"),_=(l("Xgxk"),l("+il0"),l("O5R2"),l("BuZO"),l("RXVH"),l("88/t")),I=function(n,e){void 0===n&&(n="Some snackbar"),void 0===e&&(e=!0),this.content=n,this.gate=e},z=function(){function n(){this.tabIndex=1,this.push=new t.EventEmitter}return n.prototype.ngOnInit=function(){this.colors=(new C.i).palet,this.danger=this.colors["mat-red"][500],this.warning=this.colors["mat-orange"][500],this.success=this.colors["mat-green"][500],this.info=this.colors["mat-blue"][500],this.default=this.colors["mat-grey"][900],this.dangers=_.a.from(this.push).filter(function(n){return"danger"===n}).map(function(){return new I("Danger snackbar")}).scan(function(n,e){return n.concat([e])},[]).defaultIfEmpty([]),this.warnings=_.a.from(this.push).filter(function(n){return"warning"===n}).map(function(){return new I("Warning snackbar")}).scan(function(n,e){return n.concat([e])},[]).defaultIfEmpty([]),this.successes=_.a.from(this.push).filter(function(n){return"success"===n}).map(function(){return new I("Success snackbar")}).scan(function(n,e){return n.concat([e])},[]).defaultIfEmpty([]),this.infos=_.a.from(this.push).filter(function(n){return"info"===n}).map(function(){return new I("Info snackbar")}).scan(function(n,e){return n.concat([e])},[]).defaultIfEmpty([]),this.messages=_.a.interval(2e3).map(function(){return new I("Server push snackbar")}).scan(function(n,e){return n.concat([e])},[]).defaultIfEmpty([])},n}(),T=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]   #container[_ngcontent-%COMP%]{display:block;margin:auto;max-width:800px;max-height:800px;min-height:400px;box-sizing:border-box;border:1px solid #000}[_nghost-%COMP%]   .snackbarContent[_ngcontent-%COMP%]{display:flex;justify-content:space-between;border-radius:1px;box-shadow:0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.4)}[_nghost-%COMP%]   .snackbarContent[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin:12px 0 12px 12px}[_nghost-%COMP%]   #btnContainer[_ngcontent-%COMP%]{width:500px;margin:auto auto 12px}"]],data:{}});function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"mat-card",[["class","demo-card demo-basic mat-card"]],null,null,null,o.b,o.a)),t["\u0275did"](1,49152,null,0,i.a,[],null,null),(n()(),t["\u0275eld"](2,0,null,0,1,"deja-markdown",[],null,null,null,r.b,r.a)),t["\u0275did"](3,8503296,null,0,u.a,[t.ChangeDetectorRef,d.c,c.c],{url:[0,"url"]},null)],function(n,e){n(e,3,0,"https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/snackbar/readme.md")},null)}function F(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"deja-snackbar",[["alignment","top left"]],null,[[null,"onAnimationDone"],["window","resize"]],function(n,e,l){var a=!0,o=n.component;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),"onAnimationDone"===e&&(a=0!=(o.simpleGate=!1)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{duration:[0,"duration"],alignment:[1,"alignment"]},{onAnimationDone:"onAnimationDone"}),(n()(),t["\u0275eld"](2,0,null,0,3,"deja-message-box",[["horizontal",""],["type","primary"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,6,{actionsTemplate:0}),(n()(),t["\u0275ted"](-1,0,[" Hello world ! I'm a simple snackbar. "]))],function(n,e){n(e,1,0,2e3,"top left"),n(e,3,0,"primary","")},null)}function j(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","action-button"],["mat-mini-fab",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=0!=(n.parent.parent.context.$implicit.gate=!1)&&t),t},f.d,f.b)),t["\u0275did"](1,180224,null,0,g.b,[t.ElementRef,h.a,x.c],{color:[0,"color"]},null),(n()(),t["\u0275eld"](2,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,v.b,v.a)),t["\u0275did"](3,638976,null,0,w.a,[t.ElementRef,w.c,[8,null]],null,null),(n()(),t["\u0275ted"](-1,0,["clear"]))],function(n,e){n(e,1,0,"blank"),n(e,3,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled||null),n(e,2,0,t["\u0275nov"](e,3).inline)})}function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"deja-snackbar",[["alignment","right"]],null,[["window","resize"]],function(n,e,l){var a=!0;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{outerContainerElement:[0,"outerContainerElement"],alignment:[1,"alignment"]},null),(n()(),t["\u0275eld"](2,0,null,0,4,"deja-message-box",[["horizontal",""],["type","primary"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,7,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,[" "," "])),(n()(),t["\u0275and"](0,[[7,2],["actionsTemplate",2]],0,0,null,j))],function(n,e){n(e,1,0,t["\u0275nov"](e.parent.parent,19),"right"),n(e,3,0,"primary","")},function(n,e){n(e,5,0,e.parent.context.$implicit.content)})}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](1,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.context.$implicit.gate)},null)}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","action-button"],["mat-mini-fab",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=0!=(n.parent.parent.context.$implicit.gate=!1)&&t),t},f.d,f.b)),t["\u0275did"](1,180224,null,0,g.b,[t.ElementRef,h.a,x.c],{color:[0,"color"]},null),(n()(),t["\u0275eld"](2,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,v.b,v.a)),t["\u0275did"](3,638976,null,0,w.a,[t.ElementRef,w.c,[8,null]],null,null),(n()(),t["\u0275ted"](-1,0,["clear"]))],function(n,e){n(e,1,0,"blank"),n(e,3,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled||null),n(e,2,0,t["\u0275nov"](e,3).inline)})}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"deja-snackbar",[["alignment","bottom left"]],null,[["window","resize"]],function(n,e,l){var a=!0;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{alignment:[0,"alignment"]},null),(n()(),t["\u0275eld"](2,0,null,0,4,"deja-message-box",[["horizontal",""],["type","success"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,8,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,[" "," "])),(n()(),t["\u0275and"](0,[[8,2],["actionsTemplate",2]],0,0,null,M))],function(n,e){n(e,1,0,"bottom left"),n(e,3,0,"success","")},function(n,e){n(e,5,0,e.parent.context.$implicit.content)})}function $(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](1,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.context.$implicit.gate)},null)}function V(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","action-button"],["mat-mini-fab",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=0!=(n.parent.parent.context.$implicit.gate=!1)&&t),t},f.d,f.b)),t["\u0275did"](1,180224,null,0,g.b,[t.ElementRef,h.a,x.c],{color:[0,"color"]},null),(n()(),t["\u0275eld"](2,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,v.b,v.a)),t["\u0275did"](3,638976,null,0,w.a,[t.ElementRef,w.c,[8,null]],null,null),(n()(),t["\u0275ted"](-1,0,["clear"]))],function(n,e){n(e,1,0,"blank"),n(e,3,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled||null),n(e,2,0,t["\u0275nov"](e,3).inline)})}function q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"deja-snackbar",[["alignment","bottom"]],null,[["window","resize"]],function(n,e,l){var a=!0;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{alignment:[0,"alignment"]},null),(n()(),t["\u0275eld"](2,0,null,0,4,"deja-message-box",[["horizontal",""],["type","warn"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,9,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,[" "," "])),(n()(),t["\u0275and"](0,[[9,2],["actionsTemplate",2]],0,0,null,V))],function(n,e){n(e,1,0,"bottom"),n(e,3,0,"warn","")},function(n,e){n(e,5,0,e.parent.context.$implicit.content)})}function A(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](1,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.context.$implicit.gate)},null)}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","action-button"],["mat-mini-fab",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=0!=(n.parent.parent.context.$implicit.gate=!1)&&t),t},f.d,f.b)),t["\u0275did"](1,180224,null,0,g.b,[t.ElementRef,h.a,x.c],{color:[0,"color"]},null),(n()(),t["\u0275eld"](2,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,v.b,v.a)),t["\u0275did"](3,638976,null,0,w.a,[t.ElementRef,w.c,[8,null]],null,null),(n()(),t["\u0275ted"](-1,0,["clear"]))],function(n,e){n(e,1,0,"blank"),n(e,3,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled||null),n(e,2,0,t["\u0275nov"](e,3).inline)})}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"deja-snackbar",[["alignment","bottom right"]],null,[["window","resize"]],function(n,e,l){var a=!0;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{alignment:[0,"alignment"]},null),(n()(),t["\u0275eld"](2,0,null,0,4,"deja-message-box",[["horizontal",""],["type","danger"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,10,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,[" "," "])),(n()(),t["\u0275and"](0,[[10,2],["actionsTemplate",2]],0,0,null,S))],function(n,e){n(e,1,0,"bottom right"),n(e,3,0,"danger","")},function(n,e){n(e,5,0,e.parent.context.$implicit.content)})}function H(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](1,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.context.$implicit.gate)},null)}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"deja-snackbar",[["alignment","left"]],null,[[null,"onAnimationDone"],["window","resize"]],function(n,e,l){var a=!0;return"window:resize"===e&&(a=!1!==t["\u0275nov"](n,1).onResize(l)&&a),"onAnimationDone"===e&&(a=0!=(n.parent.context.$implicit.gate=!1)&&a),a},s.b,s.a)),t["\u0275did"](1,4440064,null,0,m.a,[t.ElementRef],{duration:[0,"duration"],alignment:[1,"alignment"]},{onAnimationDone:"onAnimationDone"}),(n()(),t["\u0275eld"](2,0,null,0,3,"deja-message-box",[["horizontal",""],["type","primary"]],null,null,null,p.b,p.a)),t["\u0275did"](3,114688,null,1,b.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,11,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,[" "," "]))],function(n,e){n(e,1,0,5e3,"left"),n(e,3,0,"primary","")},function(n,e){n(e,5,0,e.parent.context.$implicit.content)})}function W(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](1,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.context.$implicit.gate)},null)}function Z(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,35,"div",[["class","demo-card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,15,"div",[["id","btnContainer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"button",[["mat-raised-button",""]],[[4,"background",null],[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.push.emit("danger")&&t),t},f.d,f.b)),t["\u0275did"](3,180224,null,0,g.b,[t.ElementRef,h.a,x.c],null,null),(n()(),t["\u0275ted"](-1,0,["Danger"])),(n()(),t["\u0275eld"](5,0,null,null,2,"button",[["mat-raised-button",""]],[[4,"background",null],[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.push.emit("warning")&&t),t},f.d,f.b)),t["\u0275did"](6,180224,null,0,g.b,[t.ElementRef,h.a,x.c],null,null),(n()(),t["\u0275ted"](-1,0,["Warning"])),(n()(),t["\u0275eld"](8,0,null,null,2,"button",[["mat-raised-button",""]],[[4,"background",null],[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.push.emit("success")&&t),t},f.d,f.b)),t["\u0275did"](9,180224,null,0,g.b,[t.ElementRef,h.a,x.c],null,null),(n()(),t["\u0275ted"](-1,0,["Success"])),(n()(),t["\u0275eld"](11,0,null,null,2,"button",[["mat-raised-button",""]],[[4,"background",null],[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.push.emit("info")&&t),t},f.d,f.b)),t["\u0275did"](12,180224,null,0,g.b,[t.ElementRef,h.a,x.c],null,null),(n()(),t["\u0275ted"](-1,0,["Info"])),(n()(),t["\u0275eld"](14,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=0!=(n.component.simpleGate=!0)&&t),t},f.d,f.b)),t["\u0275did"](15,180224,null,0,g.b,[t.ElementRef,h.a,x.c],null,null),(n()(),t["\u0275ted"](-1,0,["Simple"])),(n()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](18,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](19,0,[["containerEl",1]],null,3,"section",[["id","container"]],[[4,"position",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,2,null,D)),t["\u0275did"](21,802816,null,0,y.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,y.b,[t.ChangeDetectorRef]),(n()(),t["\u0275and"](16777216,null,null,2,null,$)),t["\u0275did"](24,802816,null,0,y.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,y.b,[t.ChangeDetectorRef]),(n()(),t["\u0275and"](16777216,null,null,2,null,A)),t["\u0275did"](27,802816,null,0,y.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,y.b,[t.ChangeDetectorRef]),(n()(),t["\u0275and"](16777216,null,null,2,null,H)),t["\u0275did"](30,802816,null,0,y.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,y.b,[t.ChangeDetectorRef]),(n()(),t["\u0275eld"](32,0,null,null,3,"section",[["style","width: 400px; height: 4000px; border: red solid 1px;"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,2,null,W)),t["\u0275did"](34,802816,null,0,y.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,y.b,[t.ChangeDetectorRef])],function(n,e){var l=e.component;n(e,18,0,l.simpleGate),n(e,21,0,t["\u0275unv"](e,21,0,t["\u0275nov"](e,22).transform(l.infos))),n(e,24,0,t["\u0275unv"](e,24,0,t["\u0275nov"](e,25).transform(l.successes))),n(e,27,0,t["\u0275unv"](e,27,0,t["\u0275nov"](e,28).transform(l.warnings))),n(e,30,0,t["\u0275unv"](e,30,0,t["\u0275nov"](e,31).transform(l.dangers))),n(e,34,0,t["\u0275unv"](e,34,0,t["\u0275nov"](e,35).transform(l.messages)))},function(n,e){var l=e.component;n(e,2,0,l.danger,t["\u0275nov"](e,3).disabled||null),n(e,5,0,l.warning,t["\u0275nov"](e,6).disabled||null),n(e,8,0,l.success,t["\u0275nov"](e,9).disabled||null),n(e,11,0,l.info,t["\u0275nov"](e,12).disabled||null),n(e,14,0,t["\u0275nov"](e,15).disabled||null),n(e,19,0,"relative")})}function B(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,10,"mat-tab-group",[["class","mat-tab-group"]],[[2,"mat-tab-group-dynamic-height",null],[2,"mat-tab-group-inverted-header",null]],[[null,"selectedTabChange"]],function(n,e,l){var t=!0;return"selectedTabChange"===e&&(t=!1!==(n.component.tabIndex=l.index)&&t),t},k.c,k.b)),t["\u0275did"](1,3325952,null,1,R.e,[t.ElementRef,t.ChangeDetectorRef],{selectedIndex:[0,"selectedIndex"]},{selectedTabChange:"selectedTabChange"}),t["\u0275qud"](603979776,1,{_tabs:1}),(n()(),t["\u0275eld"](3,16777216,null,null,3,"mat-tab",[["label","API REFERENCE"]],null,null,null,k.d,k.a)),t["\u0275did"](4,770048,[[1,4]],2,R.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,2,{templateLabel:0}),t["\u0275qud"](335544320,3,{_explicitContent:0}),(n()(),t["\u0275eld"](7,16777216,null,null,3,"mat-tab",[["label","EXAMPLES"]],null,null,null,k.d,k.a)),t["\u0275did"](8,770048,[[1,4]],2,R.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,4,{templateLabel:0}),t["\u0275qud"](335544320,5,{_explicitContent:0}),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](12,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,Z)),t["\u0275did"](14,16384,null,0,y.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,e){var l=e.component;n(e,1,0,l.tabIndex),n(e,4,0,"API REFERENCE"),n(e,8,0,"EXAMPLES"),n(e,12,0,0===l.tabIndex),n(e,14,0,1===l.tabIndex)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).dynamicHeight,"below"===t["\u0275nov"](e,1).headerPosition)})}var X=t["\u0275ccf"]("deja-snackbar-demo",z,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"deja-snackbar-demo",[],null,null,null,B,T)),t["\u0275did"](1,114688,null,0,z,[],null,null)],function(n,e){n(e,1,0)},null)},{},{},[]),G=l("gIcY"),K=l("M2Lx"),Y=l("Fzqc"),U=l("Wf4p"),J=l("4c35"),Q=l("8mMr"),nn=l("QmMH"),en=l("KYkd"),ln=l("PDM1"),tn=l("ZYCi");l.d(e,"DejaSnackbarDemoModuleNgFactory",function(){return an});var an=t["\u0275cmf"](a,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[X]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,y.p,y.o,[t.LOCALE_ID,[2,y.A]]),t["\u0275mpd"](4608,G["\u0275angular_packages_forms_forms_i"],G["\u0275angular_packages_forms_forms_i"],[]),t["\u0275mpd"](4608,K.b,K.b,[]),t["\u0275mpd"](4608,d.i,d.o,[y.d,t.PLATFORM_ID,d.m]),t["\u0275mpd"](4608,d.p,d.p,[d.i,d.n]),t["\u0275mpd"](5120,d.a,function(n){return[n]},[d.p]),t["\u0275mpd"](4608,d.l,d.l,[]),t["\u0275mpd"](6144,d.j,null,[d.l]),t["\u0275mpd"](4608,d.h,d.h,[d.j]),t["\u0275mpd"](6144,d.b,null,[d.h]),t["\u0275mpd"](4608,d.f,d.k,[d.b,t.Injector]),t["\u0275mpd"](4608,d.c,d.c,[d.f]),t["\u0275mpd"](1073742336,y.c,y.c,[]),t["\u0275mpd"](1073742336,G["\u0275angular_packages_forms_forms_bb"],G["\u0275angular_packages_forms_forms_bb"],[]),t["\u0275mpd"](1073742336,G.FormsModule,G.FormsModule,[]),t["\u0275mpd"](1073742336,Y.a,Y.a,[]),t["\u0275mpd"](1073742336,U.j,U.j,[[2,U.c]]),t["\u0275mpd"](1073742336,h.b,h.b,[]),t["\u0275mpd"](1073742336,U.u,U.u,[]),t["\u0275mpd"](1073742336,g.c,g.c,[]),t["\u0275mpd"](1073742336,w.b,w.b,[]),t["\u0275mpd"](1073742336,i.e,i.e,[]),t["\u0275mpd"](1073742336,J.g,J.g,[]),t["\u0275mpd"](1073742336,K.c,K.c,[]),t["\u0275mpd"](1073742336,R.i,R.i,[]),t["\u0275mpd"](1073742336,Q.b,Q.b,[]),t["\u0275mpd"](1073742336,nn.a,nn.a,[]),t["\u0275mpd"](1073742336,d.e,d.e,[]),t["\u0275mpd"](1073742336,d.d,d.d,[]),t["\u0275mpd"](1073742336,en.a,en.a,[]),t["\u0275mpd"](1073742336,ln.a,ln.a,[]),t["\u0275mpd"](1073742336,tn.o,tn.o,[[2,tn.t],[2,tn.l]]),t["\u0275mpd"](1073742336,a,a,[]),t["\u0275mpd"](256,d.m,"XSRF-TOKEN",[]),t["\u0275mpd"](256,d.n,"X-XSRF-TOKEN",[]),t["\u0275mpd"](1024,tn.j,function(){return[[{path:"",component:z},{path:"**",redirectTo:"",pathMatch:"full"}]]},[])])})},Rlre:function(n,e,l){"use strict";l.d(e,"b",function(){return p}),l.d(e,"c",function(){return v}),l.d(e,"a",function(){return _}),l.d(e,"d",function(){return z});var t=l("CcnG"),a=l("La40"),o=l("Ip0R"),i=l("M2Lx"),r=l("Fzqc"),u=l("Wf4p"),d=l("4c35"),c=l("dWZg"),s=l("wFw1"),m=l("qAlS"),p=t["\u0275crt"]({encapsulation:2,styles:[".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}.mat-tab-label.mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media (max-width:599px){.mat-tab-label{padding:0 12px}}@media (max-width:959px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}"],data:{}});function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](0,null,null,0))],null,null)}function f(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](1,212992,null,0,d.c,[t.ComponentFactoryResolver,t.ViewContainerRef],{portal:[0,"portal"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,e){n(e,1,0,e.parent.context.$implicit.templateLabel)},null)}function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275ted"](0,null,["",""]))],null,function(n,e){n(e,0,0,e.parent.context.$implicit.textLabel)})}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,7,"div",[["class","mat-tab-label mat-ripple"],["mat-ripple",""],["matTabLabelWrapper",""],["role","tab"]],[[8,"id",0],[1,"tabIndex",0],[1,"aria-controls",0],[1,"aria-selected",0],[2,"mat-tab-label-active",null],[2,"mat-ripple-unbounded",null],[2,"mat-tab-disabled",null]],[[null,"click"]],function(n,e,l){var a=!0;return"click"===e&&(a=!1!==n.component._handleClick(n.context.$implicit,t["\u0275nov"](n.parent,3),n.context.index)&&a),a},null,null)),t["\u0275did"](1,212992,null,0,u.t,[t.ElementRef,t.NgZone,c.a,[2,u.i],[2,s.a]],{disabled:[0,"disabled"]},null),t["\u0275did"](2,16384,[[3,4]],0,a.g,[t.ElementRef],{disabled:[0,"disabled"]},null),(n()(),t["\u0275eld"](3,0,null,null,4,"div",[["class","mat-tab-label-content"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](5,16384,null,0,o.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](7,16384,null,0,o.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,e){n(e,1,0,e.context.$implicit.disabled||e.component.disableRipple),n(e,2,0,e.context.$implicit.disabled),n(e,5,0,e.context.$implicit.templateLabel),n(e,7,0,!e.context.$implicit.templateLabel)},function(n,e){var l=e.component;n(e,0,0,l._getTabLabelId(e.context.index),l._getTabIndex(e.context.$implicit,e.context.index),l._getTabContentId(e.context.index),l.selectedIndex==e.context.index,l.selectedIndex==e.context.index,t["\u0275nov"](e,1).unbounded,t["\u0275nov"](e,2).disabled)})}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"mat-tab-body",[["class","mat-tab-body"],["role","tabpanel"]],[[8,"id",0],[1,"aria-labelledby",0],[2,"mat-tab-body-active",null]],[[null,"_onCentered"],[null,"_onCentering"]],function(n,e,l){var t=!0,a=n.component;return"_onCentered"===e&&(t=!1!==a._removeTabBodyWrapperHeight()&&t),"_onCentering"===e&&(t=!1!==a._setTabBodyWrapperHeight(l)&&t),t},k,w)),t["\u0275did"](1,114688,null,0,a.c,[t.ElementRef,[2,r.b]],{_content:[0,"_content"],position:[1,"position"],origin:[2,"origin"]},{_onCentering:"_onCentering",_onCentered:"_onCentered"})],function(n,e){n(e,1,0,e.context.$implicit.content,e.context.$implicit.position,e.context.$implicit.origin)},function(n,e){var l=e.component;n(e,0,0,l._getTabContentId(e.context.index),l._getTabLabelId(e.context.index),l.selectedIndex==e.context.index)})}function v(n){return t["\u0275vid"](2,[t["\u0275qud"](402653184,1,{_tabBodyWrapper:0}),t["\u0275qud"](402653184,2,{_tabHeader:0}),(n()(),t["\u0275eld"](2,0,null,null,4,"mat-tab-header",[["class","mat-tab-header"]],[[2,"mat-tab-header-pagination-controls-enabled",null],[2,"mat-tab-header-rtl",null]],[[null,"indexFocused"],[null,"selectFocusedIndex"]],function(n,e,l){var t=!0,a=n.component;return"indexFocused"===e&&(t=!1!==a._focusChanged(l)&&t),"selectFocusedIndex"===e&&(t=!1!==(a.selectedIndex=l)&&t),t},C,R)),t["\u0275did"](3,3325952,[[2,4],["tabHeader",4]],1,a.f,[t.ElementRef,t.ChangeDetectorRef,m.e,[2,r.b]],{disableRipple:[0,"disableRipple"],selectedIndex:[1,"selectedIndex"]},{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}),t["\u0275qud"](603979776,3,{_labelWrappers:1}),(n()(),t["\u0275and"](16777216,null,0,1,null,h)),t["\u0275did"](6,802816,null,0,o.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](7,0,[[1,0],["tabBodyWrapper",1]],null,2,"div",[["class","mat-tab-body-wrapper"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](9,802816,null,0,o.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,e){var l=e.component;n(e,3,0,l.disableRipple,l.selectedIndex),n(e,6,0,l._tabs),n(e,9,0,l._tabs)},function(n,e){n(e,2,0,t["\u0275nov"](e,3)._showPaginationControls,"rtl"==t["\u0275nov"](e,3)._getLayoutDirection())})}var w=t["\u0275crt"]({encapsulation:2,styles:[".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}"],data:{animation:[{type:7,name:"translateTab",definitions:[{type:0,name:"center, void, left-origin-center, right-origin-center",styles:{type:6,styles:{transform:"none"},offset:null},options:void 0},{type:0,name:"left",styles:{type:6,styles:{transform:"translate3d(-100%, 0, 0)"},offset:null},options:void 0},{type:0,name:"right",styles:{type:6,styles:{transform:"translate3d(100%, 0, 0)"},offset:null},options:void 0},{type:1,expr:"* => left, * => right, left => center, right => center",animation:{type:4,styles:null,timings:"500ms cubic-bezier(0.35, 0, 0.25, 1)"},options:null},{type:1,expr:"void => left-origin-center",animation:[{type:6,styles:{transform:"translate3d(-100%, 0, 0)"},offset:null},{type:4,styles:null,timings:"500ms cubic-bezier(0.35, 0, 0.25, 1)"}],options:null},{type:1,expr:"void => right-origin-center",animation:[{type:6,styles:{transform:"translate3d(100%, 0, 0)"},offset:null},{type:4,styles:null,timings:"500ms cubic-bezier(0.35, 0, 0.25, 1)"}],options:null}],options:{}}]}});function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](0,null,null,0))],null,null)}function k(n){return t["\u0275vid"](2,[t["\u0275qud"](402653184,1,{_portalHost:0}),(n()(),t["\u0275eld"](1,0,[["content",1]],null,2,"div",[["class","mat-tab-body-content"]],[[24,"@translateTab",0]],[[null,"@translateTab.start"],[null,"@translateTab.done"]],function(n,e,l){var t=!0,a=n.component;return"@translateTab.start"===e&&(t=!1!==a._onTranslateTabStarted(l)&&t),"@translateTab.done"===e&&(t=!1!==a._onTranslateTabComplete(l)&&t),t},null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](3,212992,null,0,a.d,[t.ComponentFactoryResolver,t.ViewContainerRef,a.c],null,null)],function(n,e){n(e,3,0)},function(n,e){n(e,1,0,e.component._position)})}var R=t["\u0275crt"]({encapsulation:2,styles:[".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}.mat-tab-label.mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media (max-width:599px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media screen and (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}"],data:{}});function C(n){return t["\u0275vid"](2,[t["\u0275qud"](402653184,1,{_inkBar:0}),t["\u0275qud"](402653184,2,{_tabListContainer:0}),t["\u0275qud"](402653184,3,{_tabList:0}),(n()(),t["\u0275eld"](3,0,null,null,2,"div",[["aria-hidden","true"],["class","mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4 mat-ripple"],["mat-ripple",""]],[[2,"mat-tab-header-pagination-disabled",null],[2,"mat-ripple-unbounded",null]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component._scrollHeader("before")&&t),t},null,null)),t["\u0275did"](4,212992,null,0,u.t,[t.ElementRef,t.NgZone,c.a,[2,u.i],[2,s.a]],{disabled:[0,"disabled"]},null),(n()(),t["\u0275eld"](5,0,null,null,0,"div",[["class","mat-tab-header-pagination-chevron"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,[[2,0],["tabListContainer",1]],null,6,"div",[["class","mat-tab-label-container"]],null,[[null,"keydown"]],function(n,e,l){var t=!0;return"keydown"===e&&(t=!1!==n.component._handleKeydown(l)&&t),t},null,null)),(n()(),t["\u0275eld"](7,0,[[3,0],["tabList",1]],null,5,"div",[["class","mat-tab-list"],["role","tablist"]],null,[[null,"cdkObserveContent"]],function(n,e,l){var t=!0;return"cdkObserveContent"===e&&(t=!1!==n.component._onContentChanges()&&t),t},null,null)),t["\u0275did"](8,1720320,null,0,i.a,[i.b,t.ElementRef,t.NgZone],null,{event:"cdkObserveContent"}),(n()(),t["\u0275eld"](9,0,null,null,1,"div",[["class","mat-tab-labels"]],null,null,null,null,null)),t["\u0275ncd"](null,0),(n()(),t["\u0275eld"](11,0,null,null,1,"mat-ink-bar",[["class","mat-ink-bar"]],null,null,null,null,null)),t["\u0275did"](12,16384,[[1,4]],0,a.a,[t.ElementRef,t.NgZone,a.j],null,null),(n()(),t["\u0275eld"](13,0,null,null,2,"div",[["aria-hidden","true"],["class","mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4 mat-ripple"],["mat-ripple",""]],[[2,"mat-tab-header-pagination-disabled",null],[2,"mat-ripple-unbounded",null]],[[null,"click"]],function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component._scrollHeader("after")&&t),t},null,null)),t["\u0275did"](14,212992,null,0,u.t,[t.ElementRef,t.NgZone,c.a,[2,u.i],[2,s.a]],{disabled:[0,"disabled"]},null),(n()(),t["\u0275eld"](15,0,null,null,0,"div",[["class","mat-tab-header-pagination-chevron"]],null,null,null,null,null))],function(n,e){var l=e.component;n(e,4,0,l._disableScrollBefore||l.disableRipple),n(e,14,0,l._disableScrollAfter||l.disableRipple)},function(n,e){var l=e.component;n(e,3,0,l._disableScrollBefore,t["\u0275nov"](e,4).unbounded),n(e,13,0,l._disableScrollAfter,t["\u0275nov"](e,14).unbounded)})}var _=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function I(n){return t["\u0275vid"](0,[t["\u0275ncd"](null,0),(n()(),t["\u0275and"](0,null,null,0))],null,null)}function z(n){return t["\u0275vid"](2,[t["\u0275qud"](402653184,1,{_implicitContent:0}),(n()(),t["\u0275and"](0,[[1,2]],null,0,null,I))],null,null)}},w6M7:function(n,e,l){"use strict";var t=l("CcnG");l("iss+"),l("t/Na"),l("ZYjt"),l.d(e,"a",function(){return a}),l.d(e,"b",function(){return o});var a=t["\u0275crt"]({encapsulation:2,styles:[["code[class*=language-],pre[class*=language-]{text-shadow:0 1px #fff;word-spacing:normal;word-break:normal;word-wrap:normal;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}code[class*=language-],pre[class*=language-]{color:#000;background:0 0;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{position:relative;margin:.5em 0;overflow:visible;padding:0}pre[class*=language-]>code{position:relative;border-left:10px solid #358ccb;box-shadow:-1px 0 0 0 #358ccb,0 0 0 1px #dfdfdf;background-color:#fdfdfd;background-image:linear-gradient(transparent 50%,rgba(69,142,209,.04) 50%);background-size:3em 3em;background-origin:content-box;background-attachment:local}code[class*=language]{max-height:inherit;height:inherit;padding:0 1em;display:block;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background-color:#fdfdfd;box-sizing:border-box;margin-bottom:1em}:not(pre)>code[class*=language-]{position:relative;padding:.2em;border-radius:.3em;color:#c92c2c;border:1px solid rgba(0,0,0,.1);display:inline;white-space:normal}pre[class*=language-]:after,pre[class*=language-]:before{content:'';z-index:-2;display:block;position:absolute;bottom:.75em;left:.18em;width:40%;height:20%;max-height:13em;box-shadow:0 13px 8px #979797;-webkit-transform:rotate(-2deg);transform:rotate(-2deg)}:not(pre)>code[class*=language-]:after,pre[class*=language-]:after{right:.75em;left:auto;-webkit-transform:rotate(2deg);transform:rotate(2deg)}.token.block-comment,.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#7d8b99}.token.punctuation{color:#5f6364}.token.boolean,.token.constant,.token.deleted,.token.function-name,.token.number,.token.property,.token.symbol,.token.tag{color:#c92c2c}.token.attr-name,.token.builtin,.token.char,.token.function,.token.inserted,.token.selector,.token.string{color:#2f9c0a}.token.entity,.token.operator,.token.url,.token.variable{color:#a67f59;background:rgba(255,255,255,.5)}.token.atrule,.token.attr-value,.token.class-name,.token.keyword{color:#1990b8}.token.important,.token.regex{color:#e90}.language-css .token.string,.style .token.string{color:#a67f59;background:rgba(255,255,255,.5)}.token.important{font-weight:400}.token.bold{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}.namespace{opacity:.7}@media screen and (max-width:767px){pre[class*=language-]:after,pre[class*=language-]:before{bottom:14px;box-shadow:none}}.token.cr:before,.token.lf:before,.token.tab:not(:empty):before{color:#e0d7d1}pre[class*=language-].line-numbers{padding-left:0}pre[class*=language-].line-numbers code{padding-left:3.8em}pre[class*=language-].line-numbers .line-numbers-rows{left:0}pre[class*=language-][data-line]{padding-top:0;padding-bottom:0;padding-left:0}pre[data-line] code{position:relative;padding-left:4em}pre .line-highlight{margin-top:0}.markdown-content{overflow-y:auto;padding:1rem}.markdown-content table{border-collapse:collapse}.markdown-content table tr td,.markdown-content table tr th{border-width:1px;border-style:solid;padding:1rem}"]],data:{}});function o(n){return t["\u0275vid"](2,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","markdown-content"]],[[8,"innerHTML",1]],null,null,null,null))],null,function(n,e){n(e,0,0,e.component.html)})}}}]);