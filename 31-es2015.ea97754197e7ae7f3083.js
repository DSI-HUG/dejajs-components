(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{QpsU:function(e,t,n){"use strict";n.r(t);var r=n("SVse"),a=n("Dxy4"),o=n("PDjf"),c=n("M9ds"),i=n("l0rg"),l=n("iInd"),d=n("CL0Z"),s=n("8Y7J");function m(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"mat-card",5),s["\u0275\u0275text"](1," TODO "),s["\u0275\u0275elementEnd"]())}function u(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"mat-card",6),s["\u0275\u0275elementStart"](1,"mat-toolbar",7),s["\u0275\u0275text"](2,"Manage app sidenav"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](3,"mat-card-content",8),s["\u0275\u0275elementStart"](4,"button",9),s["\u0275\u0275listener"]("click",(function(t){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().toggle()})),s["\u0275\u0275text"](5,"Toggle"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](6,"button",10),s["\u0275\u0275listener"]("click",(function(t){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().open()})),s["\u0275\u0275text"](7,"Open"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](8,"button",11),s["\u0275\u0275listener"]("click",(function(t){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().close()})),s["\u0275\u0275text"](9,"Close"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}let p=(()=>{class e{constructor(e){this.sidenavService=e,this.tabIndex=1}ngOnInit(){}toggle(){this.sidenavService.toggle()}open(){this.sidenavService.open()}close(){this.sidenavService.close()}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](d.b))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["sidenav-demo"]],decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],["class","demo-card",4,"ngIf"],[1,"demo-card","demo-basic"],[1,"demo-card"],["color","primary"],[1,"listContainer"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","accent",3,"click"],["mat-raised-button","","color","warn",3,"click"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"mat-tab-group",0),s["\u0275\u0275listener"]("selectedTabChange",(function(e){return t.tabIndex=e.index})),s["\u0275\u0275element"](1,"mat-tab",1),s["\u0275\u0275element"](2,"mat-tab",2),s["\u0275\u0275elementEnd"](),s["\u0275\u0275template"](3,m,2,0,"mat-card",3),s["\u0275\u0275template"](4,u,10,0,"mat-card",4)),2&e&&(s["\u0275\u0275property"]("selectedIndex",t.tabIndex),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngIf",0===t.tabIndex),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",1===t.tabIndex))},directives:[c.b,c.a,r.n,o.a,i.a,o.c,a.b],styles:["[_nghost-%COMP%]   button[_ngcontent-%COMP%]{margin:1rem .5rem}"]}),e})();n.d(t,"DejaSidenavDemoModule",(function(){return f}));const b=[{path:"",component:p}];let f=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[],imports:[[r.c,d.a,a.c,o.d,c.c,i.b,l.f.forChild(b)]]}),e})()}}]);