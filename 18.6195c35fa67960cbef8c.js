(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{VzA2:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){},a=e("lzlj"),u=e("FVSy"),r=e("w6M7"),d=e("iss+"),i=e("t/Na"),s=e("ZYjt"),c=e("73VK"),g=e("glHa"),m=e("ca9q"),p=e("Hv1I"),h=e("Ip0R"),b=e("FbN9"),f=e("8mMr"),w=e("dWZg"),v=e("2hCY"),C=e("gIcY"),k=e("1m/g"),x=e("21Lb"),M=e("OzfB"),R=e("bujt"),y=e("UodH"),_=e("lLAP"),O=e("Rlre"),P=e("La40"),E=(e("+il0"),e("RXVH"),e("88/t")),F=e("jdxo"),z=function(n,l){this.minWeight=n,this.maxWeight=l},j=[new F.j(4,16),new F.j(16,20),new F.j(20,24),new F.j(24,36)],W=[new F.j(0,12.5),new F.j(12.5,25),new F.j(25,30)],I=[new F.j(0,12),new F.j(12,20),new F.j(20,24)],N=[new z(3,4),new z(4,6),new z(6,9),new z(9,12),new z(12,16),new z(16,20),new z(20,25),new z(25,32),new z(32,40),new z(40,200)],T=[1,2,4,8,16,20,22,24],D=function(){function n(){this.tabIndex=1,this.numericStep=1,this.errorFeed=new t.EventEmitter,this.readOnlyRanges=j,this.rangesWithInterval=I,this.ranges=W,this.weights=N,this.steps=T,this.computeRangeFromWeight(),this.errors=E.a.from(this.errorFeed).map(function(n){return{gate:!0,message:n.message}}).scan(function(n,l){return n.concat([l])},[]).defaultIfEmpty([])}return n.prototype.stepFn=function(n){var l=n.ranges[n.index],e=n.ranges.length-1===n.index,t=Math.pow(Math.E,n.newMax-l.min)/4,o=l.minWeight+t;if(o=Math.round(o),o=Math.max(o,l.minWeight+1),!e){var a=n.ranges[n.index+1];o=Math.min(o,a.maxWeight-1),a.minWeight=o,l.maxWeight=o}return l.min+Math.log(4*(o-l.minWeight))},n.prototype.remove=function(n){if(this.weights.length>=2){var l=this.weights.find(function(l,e){return n===e}),e=this.weights.filter(function(l,e){return n!==e});n>0&&(e[n-1].maxWeight=l.maxWeight),this.weights=e,this.weightRef.selected=0,this.computeRangeFromWeight()}},n.prototype.add=function(n){var l=this.weights.find(function(l,e){return n===e}),e=l.maxWeight-l.minWeight;if(e>=2){var t=new z(l.minWeight,l.minWeight+e/2);l.minWeight=l.minWeight+e/2;var o=0!==n?this.weights.slice(0,n):[],a=n<this.weights.length?this.weights.slice(n+1):[];this.weights=o.concat([t,l],a),this.weightRef.selected=0,this.computeRangeFromWeight()}},n.prototype.increase=function(){this.weights[this.weights.length-1].maxWeight++,this.computeRangeFromWeight()},n.prototype.decrease=function(){this.weights[0].minWeight>0&&(this.weights[0].minWeight--,this.computeRangeFromWeight())},n.prototype.computeRangeFromWeight=function(){var n=0;this.weights=this.weights.map(function(l){var e=Math.log(4*(l.maxWeight-l.minWeight));return l.min=n,l.max=n+e,n+=e,l})},n}(),q=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]   #custom-range-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-around}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:24px}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:block;flex-grow:1;flex-shrink:0;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #flex-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:1;flex-basis:36px;box-sizing:border-box;margin:1rem}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]{flex-basis:max-content;-ms-grid-row-align:center;align-self:center;height:24px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-range[_ngcontent-%COMP%]{display:flex;align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]{display:flex;width:10px;flex-wrap:wrap}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]{margin-top:-5px;width:10px;height:5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.triangle[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{fill:#333}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]{height:34px;margin-top:-5px}[_nghost-%COMP%]   #custom-range[_ngcontent-%COMP%]   .custom-separator[_ngcontent-%COMP%]   svg.line[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%]{fill:#333;height:34px;width:1px}"]],data:{}});function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"mat-card",[["class","demo-card demo-basic mat-card"]],null,null,null,a.b,a.a)),t["\u0275did"](1,49152,null,0,u.a,[],null,null),(n()(),t["\u0275eld"](2,0,null,0,1,"deja-markdown",[],null,null,null,r.b,r.a)),t["\u0275did"](3,8503296,null,0,d.a,[t.ChangeDetectorRef,i.c,s.c],{url:[0,"url"]},null)],function(n,l){n(l,3,0,"https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/range/readme.md")},null)}function A(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[["class","custom-range"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,[""," - "," kg"])),t["\u0275ppd"](2,2),t["\u0275ppd"](3,2)],null,function(n,l){n(l,1,0,t["\u0275unv"](l,1,0,n(l,2,0,t["\u0275nov"](l.parent.parent,0),l.context.$implicit.minWeight,"1.0-2")),t["\u0275unv"](l,1,1,n(l,3,0,t["\u0275nov"](l.parent.parent,0),l.context.$implicit.maxWeight,"1.0-2")))})}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"span",[["class","custom-separator"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,":svg:svg",[["class","triangle"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,":svg:polygon",[["points","0,0 10,0 5,5"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,1,":svg:svg",[["class","line"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,":svg:rect",[["x","4.5"],["y","0"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,":svg:svg",[["class","triangle"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,0,":svg:polygon",[["points","0,5 5,0 10,5 "]],null,null,null,null,null))],null,null)}function V(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"deja-snackbar",[["alignment","bottom right"]],null,[[null,"onAnimationDone"],["window","resize"]],function(n,l,e){var o=!0;return"window:resize"===l&&(o=!1!==t["\u0275nov"](n,1).onResize(e)&&o),"onAnimationDone"===l&&(o=0!=(n.parent.context.$implicit.gate=!1)&&o),o},c.b,c.a)),t["\u0275did"](1,4440064,null,0,g.a,[t.ElementRef],{duration:[0,"duration"],alignment:[1,"alignment"]},{onAnimationDone:"onAnimationDone"}),(n()(),t["\u0275eld"](2,0,null,0,3,"deja-message-box",[["horizontal",""],["type","warn"]],null,null,null,m.b,m.a)),t["\u0275did"](3,114688,null,1,p.a,[],{type:[0,"type"],horizontal:[1,"horizontal"]},null),t["\u0275qud"](335544320,20,{actionsTemplate:0}),(n()(),t["\u0275ted"](5,0,["",""]))],function(n,l){n(l,1,0,5e3,"bottom right"),n(l,3,0,"warn","")},function(n,l){n(l,5,0,l.parent.context.$implicit.message)})}function H(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](16777216,null,null,1,null,V)),t["\u0275did"](1,16384,null,0,h.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](0,null,null,0))],function(n,l){n(l,1,0,null==l.context.$implicit?null:l.context.$implicit.gate)},null)}function U(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,92,"div",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,14,"mat-card",[["class","demo-card mat-card"]],null,null,null,a.b,a.a)),t["\u0275did"](2,49152,null,0,u.a,[],null,null),(n()(),t["\u0275eld"](3,0,null,0,3,"mat-toolbar",[["class","mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,b.b,b.a)),t["\u0275did"](4,4243456,null,1,f.a,[t.ElementRef,w.a,h.d],{color:[0,"color"]},null),t["\u0275qud"](603979776,8,{_toolbarRows:1}),(n()(),t["\u0275ted"](-1,0,["Default template : Read Only"])),(n()(),t["\u0275eld"](7,0,null,0,8,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](8,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](9,0,null,null,6,"deja-range",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],["window","resize"]],function(n,l,e){var o=!0,a=n.component;return"window:resize"===l&&(o=!1!==t["\u0275nov"](n,13).onResize(e)&&o),"ngModelChange"===l&&(o=!1!==(a.readOnlyRanges=e)&&o),o},v.b,v.a)),t["\u0275did"](10,671744,null,0,C.NgModel,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,C.NgControl,null,[C.NgModel]),t["\u0275did"](12,16384,null,0,C.NgControlStatus,[[4,C.NgControl]],null,null),t["\u0275did"](13,49152,null,2,k.a,[t.ChangeDetectorRef,t.ElementRef,[6,C.NgControl]],null,null),t["\u0275qud"](335544320,9,{rangeTemplate:0}),t["\u0275qud"](335544320,10,{separatorTemplate:0}),(n()(),t["\u0275eld"](16,0,null,null,14,"mat-card",[["class","demo-card mat-card"]],null,null,null,a.b,a.a)),t["\u0275did"](17,49152,null,0,u.a,[],null,null),(n()(),t["\u0275eld"](18,0,null,0,3,"mat-toolbar",[["class","mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,b.b,b.a)),t["\u0275did"](19,4243456,null,1,f.a,[t.ElementRef,w.a,h.d],{color:[0,"color"]},null),t["\u0275qud"](603979776,11,{_toolbarRows:1}),(n()(),t["\u0275ted"](-1,0,["Default template : Movable separator, with an array of accepted intervals"])),(n()(),t["\u0275eld"](22,0,null,0,8,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](23,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](24,0,null,null,6,"deja-range",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],["window","resize"]],function(n,l,e){var o=!0,a=n.component;return"window:resize"===l&&(o=!1!==t["\u0275nov"](n,28).onResize(e)&&o),"ngModelChange"===l&&(o=!1!==(a.rangesWithInterval=e)&&o),o},v.b,v.a)),t["\u0275did"](25,671744,null,0,C.NgModel,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,C.NgControl,null,[C.NgModel]),t["\u0275did"](27,16384,null,0,C.NgControlStatus,[[4,C.NgControl]],null,null),t["\u0275did"](28,49152,null,2,k.a,[t.ChangeDetectorRef,t.ElementRef,[6,C.NgControl]],{step:[0,"step"],selected:[1,"selected"],readOnly:[2,"readOnly"]},null),t["\u0275qud"](335544320,12,{rangeTemplate:0}),t["\u0275qud"](335544320,13,{separatorTemplate:0}),(n()(),t["\u0275eld"](31,0,null,null,26,"mat-card",[["class","demo-card mat-card"]],null,null,null,a.b,a.a)),t["\u0275did"](32,49152,null,0,u.a,[],null,null),(n()(),t["\u0275eld"](33,0,null,0,3,"mat-toolbar",[["class","mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,b.b,b.a)),t["\u0275did"](34,4243456,null,1,f.a,[t.ElementRef,w.a,h.d],{color:[0,"color"]},null),t["\u0275qud"](603979776,14,{_toolbarRows:1}),(n()(),t["\u0275ted"](-1,0,["Default template : Movable separator, with a numeric step"])),(n()(),t["\u0275eld"](37,0,null,0,8,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](38,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](39,0,null,null,6,"deja-range",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"errorFeedback"],["window","resize"]],function(n,l,e){var o=!0,a=n.component;return"window:resize"===l&&(o=!1!==t["\u0275nov"](n,43).onResize(e)&&o),"ngModelChange"===l&&(o=!1!==(a.ranges=e)&&o),"errorFeedback"===l&&(o=!1!==a.errorFeed.emit(e)&&o),o},v.b,v.a)),t["\u0275did"](40,671744,null,0,C.NgModel,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,C.NgControl,null,[C.NgModel]),t["\u0275did"](42,16384,null,0,C.NgControlStatus,[[4,C.NgControl]],null,null),t["\u0275did"](43,49152,[[1,4],["dejaRange",4]],2,k.a,[t.ChangeDetectorRef,t.ElementRef,[6,C.NgControl]],{step:[0,"step"],readOnly:[1,"readOnly"]},{errorFeedback:"errorFeedback"}),t["\u0275qud"](335544320,15,{rangeTemplate:0}),t["\u0275qud"](335544320,16,{separatorTemplate:0}),(n()(),t["\u0275eld"](46,0,null,0,11,"mat-card-content",[["class","mat-card-content"],["fxLayoutAlign","center center"]],null,null,null,null,null)),t["\u0275did"](47,737280,null,0,x.d,[M.g,t.ElementRef,[8,null],M.k],{align:[0,"align"]},null),t["\u0275did"](48,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](49,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],null,null,R.d,R.b)),t["\u0275did"](50,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Simple"])),(n()(),t["\u0275eld"](52,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,43).add(t["\u0275nov"](n,43).selected)&&o),o},R.d,R.b)),t["\u0275did"](53,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Split selected range"])),(n()(),t["\u0275eld"](55,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t["\u0275nov"](n,43).remove(t["\u0275nov"](n,43).selected)&&o),o},R.d,R.b)),t["\u0275did"](56,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Remove selected range"])),(n()(),t["\u0275eld"](58,0,null,null,31,"mat-card",[["class","demo-card mat-card"]],null,null,null,a.b,a.a)),t["\u0275did"](59,49152,null,0,u.a,[],null,null),(n()(),t["\u0275eld"](60,0,null,0,3,"mat-toolbar",[["class","mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,b.b,b.a)),t["\u0275did"](61,4243456,null,1,f.a,[t.ElementRef,w.a,h.d],{color:[0,"color"]},null),t["\u0275qud"](603979776,17,{_toolbarRows:1}),(n()(),t["\u0275ted"](-1,0,["Custom template : Movable separator, with a function based step, logarithmic interpolation bewtween the model (weight) and the inner model"])),(n()(),t["\u0275eld"](64,0,null,0,10,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](65,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](66,0,null,null,8,"deja-range",[["id","custom-range"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"errorFeedback"],["window","resize"]],function(n,l,e){var o=!0,a=n.component;return"window:resize"===l&&(o=!1!==t["\u0275nov"](n,70).onResize(e)&&o),"ngModelChange"===l&&(o=!1!==(a.weights=e)&&o),"ngModelChange"===l&&(o=!1!==a.computeRangeFromWeight()&&o),"errorFeedback"===l&&(o=!1!==a.errorFeed.emit(e)&&o),o},v.b,v.a)),t["\u0275did"](67,671744,null,0,C.NgModel,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,C.NgControl,null,[C.NgModel]),t["\u0275did"](69,16384,null,0,C.NgControlStatus,[[4,C.NgControl]],null,null),t["\u0275did"](70,49152,[[2,4],["dejaWeight",4]],2,k.a,[t.ChangeDetectorRef,t.ElementRef,[6,C.NgControl]],{step:[0,"step"],selected:[1,"selected"],readOnly:[2,"readOnly"]},{errorFeedback:"errorFeedback"}),t["\u0275qud"](335544320,18,{rangeTemplate:0}),t["\u0275qud"](335544320,19,{separatorTemplate:0}),(n()(),t["\u0275and"](0,[[18,2],["rangeTemplate",2]],null,0,null,A)),(n()(),t["\u0275and"](0,[[19,2],["separatorTemplate",2]],null,0,null,S)),(n()(),t["\u0275eld"](75,0,null,0,14,"mat-card-content",[["class","mat-card-content"],["fxLayoutAlign","center center"]],null,null,null,null,null)),t["\u0275did"](76,737280,null,0,x.d,[M.g,t.ElementRef,[8,null],M.k],{align:[0,"align"]},null),t["\u0275did"](77,16384,null,0,u.c,[],null,null),(n()(),t["\u0275eld"](78,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==n.component.add(t["\u0275nov"](n,70).selected)&&o),o},R.d,R.b)),t["\u0275did"](79,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Split selected range"])),(n()(),t["\u0275eld"](81,0,null,null,2,"button",[["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==n.component.remove(t["\u0275nov"](n,70).selected)&&o),o},R.d,R.b)),t["\u0275did"](82,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Remove selected range"])),(n()(),t["\u0275eld"](84,0,null,null,2,"button",[["id","decrease"],["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.decrease()&&t),t},R.d,R.b)),t["\u0275did"](85,180224,null,0,y.b,[t.ElementRef,w.a,_.c],{disabled:[0,"disabled"]},null),(n()(),t["\u0275ted"](-1,0,["Decrease minimum"])),(n()(),t["\u0275eld"](87,0,null,null,2,"button",[["id","increase"],["mat-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.increase()&&t),t},R.d,R.b)),t["\u0275did"](88,180224,null,0,y.b,[t.ElementRef,w.a,_.c],null,null),(n()(),t["\u0275ted"](-1,0,["Increase maximum"])),(n()(),t["\u0275and"](16777216,null,null,2,null,H)),t["\u0275did"](91,802816,null,0,h.m,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,h.b,[t.ChangeDetectorRef])],function(n,l){var e=l.component;n(l,4,0,"primary"),n(l,10,0,e.readOnlyRanges),n(l,19,0,"primary"),n(l,25,0,e.rangesWithInterval),n(l,28,0,e.steps,1,!1),n(l,34,0,"primary"),n(l,40,0,e.ranges),n(l,43,0,2.5,!1),n(l,47,0,"center center"),n(l,61,0,"primary"),n(l,67,0,e.weights),n(l,70,0,e.stepFn,0,!1),n(l,76,0,"center center"),n(l,85,0,0===(null==e.weights[0]?null:e.weights[0].minWeight)),n(l,91,0,t["\u0275unv"](l,91,0,t["\u0275nov"](l,92).transform(e.errors)))},function(n,l){n(l,3,0,t["\u0275nov"](l,4)._toolbarRows.length,!t["\u0275nov"](l,4)._toolbarRows.length),n(l,9,0,t["\u0275nov"](l,12).ngClassUntouched,t["\u0275nov"](l,12).ngClassTouched,t["\u0275nov"](l,12).ngClassPristine,t["\u0275nov"](l,12).ngClassDirty,t["\u0275nov"](l,12).ngClassValid,t["\u0275nov"](l,12).ngClassInvalid,t["\u0275nov"](l,12).ngClassPending),n(l,18,0,t["\u0275nov"](l,19)._toolbarRows.length,!t["\u0275nov"](l,19)._toolbarRows.length),n(l,24,0,t["\u0275nov"](l,27).ngClassUntouched,t["\u0275nov"](l,27).ngClassTouched,t["\u0275nov"](l,27).ngClassPristine,t["\u0275nov"](l,27).ngClassDirty,t["\u0275nov"](l,27).ngClassValid,t["\u0275nov"](l,27).ngClassInvalid,t["\u0275nov"](l,27).ngClassPending),n(l,33,0,t["\u0275nov"](l,34)._toolbarRows.length,!t["\u0275nov"](l,34)._toolbarRows.length),n(l,39,0,t["\u0275nov"](l,42).ngClassUntouched,t["\u0275nov"](l,42).ngClassTouched,t["\u0275nov"](l,42).ngClassPristine,t["\u0275nov"](l,42).ngClassDirty,t["\u0275nov"](l,42).ngClassValid,t["\u0275nov"](l,42).ngClassInvalid,t["\u0275nov"](l,42).ngClassPending),n(l,49,0,t["\u0275nov"](l,50).disabled||null),n(l,52,0,t["\u0275nov"](l,53).disabled||null),n(l,55,0,t["\u0275nov"](l,56).disabled||null),n(l,60,0,t["\u0275nov"](l,61)._toolbarRows.length,!t["\u0275nov"](l,61)._toolbarRows.length),n(l,66,0,t["\u0275nov"](l,69).ngClassUntouched,t["\u0275nov"](l,69).ngClassTouched,t["\u0275nov"](l,69).ngClassPristine,t["\u0275nov"](l,69).ngClassDirty,t["\u0275nov"](l,69).ngClassValid,t["\u0275nov"](l,69).ngClassInvalid,t["\u0275nov"](l,69).ngClassPending),n(l,78,0,t["\u0275nov"](l,79).disabled||null),n(l,81,0,t["\u0275nov"](l,82).disabled||null),n(l,84,0,t["\u0275nov"](l,85).disabled||null),n(l,87,0,t["\u0275nov"](l,88).disabled||null)})}function Y(n){return t["\u0275vid"](0,[t["\u0275pid"](0,h.f,[t.LOCALE_ID]),t["\u0275qud"](671088640,1,{rangeRef:0}),t["\u0275qud"](671088640,2,{weightRef:0}),(n()(),t["\u0275eld"](3,0,null,null,10,"mat-tab-group",[["class","mat-tab-group"]],[[2,"mat-tab-group-dynamic-height",null],[2,"mat-tab-group-inverted-header",null]],[[null,"selectedTabChange"]],function(n,l,e){var t=!0;return"selectedTabChange"===l&&(t=!1!==(n.component.tabIndex=e.index)&&t),t},O.c,O.b)),t["\u0275did"](4,3325952,null,1,P.e,[t.ElementRef,t.ChangeDetectorRef],{selectedIndex:[0,"selectedIndex"]},{selectedTabChange:"selectedTabChange"}),t["\u0275qud"](603979776,3,{_tabs:1}),(n()(),t["\u0275eld"](6,16777216,null,null,3,"mat-tab",[["label","API REFERENCE"]],null,null,null,O.d,O.a)),t["\u0275did"](7,770048,[[3,4]],2,P.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,4,{templateLabel:0}),t["\u0275qud"](335544320,5,{_explicitContent:0}),(n()(),t["\u0275eld"](10,16777216,null,null,3,"mat-tab",[["label","EXAMPLES"]],null,null,null,O.d,O.a)),t["\u0275did"](11,770048,[[3,4]],2,P.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,6,{templateLabel:0}),t["\u0275qud"](335544320,7,{_explicitContent:0}),(n()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](15,16384,null,0,h.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,U)),t["\u0275did"](17,16384,null,0,h.n,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,4,0,e.tabIndex),n(l,7,0,"API REFERENCE"),n(l,11,0,"EXAMPLES"),n(l,15,0,0===e.tabIndex),n(l,17,0,1===e.tabIndex)},function(n,l){n(l,3,0,t["\u0275nov"](l,4).dynamicHeight,"below"===t["\u0275nov"](l,4).headerPosition)})}var X=t["\u0275ccf"]("deja-range-demo",D,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"deja-range-demo",[],null,null,null,Y,q)),t["\u0275did"](1,49152,null,0,D,[],null,null)],null,null)},{},{errorFeed:"errorFeed"},[]),$=e("M2Lx"),K=e("Fzqc"),Z=e("hUWP"),G=e("V9q+"),B=e("Wf4p"),J=e("4c35"),Q=e("/svY"),nn=e("KYkd"),ln=e("QmMH"),en=e("SMsm"),tn=e("PDM1"),on=e("ZYCi");e.d(l,"DejaRangeDemoModuleNgFactory",function(){return an});var an=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[X]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,h.p,h.o,[t.LOCALE_ID,[2,h.A]]),t["\u0275mpd"](4608,C["\u0275angular_packages_forms_forms_i"],C["\u0275angular_packages_forms_forms_i"],[]),t["\u0275mpd"](4608,M.i,M.h,[M.d,M.f]),t["\u0275mpd"](5120,t.APP_BOOTSTRAP_LISTENER,function(n,l){return[M.l(n,l)]},[h.d,t.PLATFORM_ID]),t["\u0275mpd"](4608,$.b,$.b,[]),t["\u0275mpd"](4608,i.i,i.o,[h.d,t.PLATFORM_ID,i.m]),t["\u0275mpd"](4608,i.p,i.p,[i.i,i.n]),t["\u0275mpd"](5120,i.a,function(n){return[n]},[i.p]),t["\u0275mpd"](4608,i.l,i.l,[]),t["\u0275mpd"](6144,i.j,null,[i.l]),t["\u0275mpd"](4608,i.h,i.h,[i.j]),t["\u0275mpd"](6144,i.b,null,[i.h]),t["\u0275mpd"](4608,i.f,i.k,[i.b,t.Injector]),t["\u0275mpd"](4608,i.c,i.c,[i.f]),t["\u0275mpd"](1073742336,h.c,h.c,[]),t["\u0275mpd"](1073742336,C["\u0275angular_packages_forms_forms_bb"],C["\u0275angular_packages_forms_forms_bb"],[]),t["\u0275mpd"](1073742336,C.FormsModule,C.FormsModule,[]),t["\u0275mpd"](1073742336,M.e,M.e,[]),t["\u0275mpd"](1073742336,K.a,K.a,[]),t["\u0275mpd"](1073742336,x.b,x.b,[]),t["\u0275mpd"](1073742336,Z.a,Z.a,[]),t["\u0275mpd"](1073742336,G.a,G.a,[[2,M.j],t.PLATFORM_ID]),t["\u0275mpd"](1073742336,B.j,B.j,[[2,B.c]]),t["\u0275mpd"](1073742336,u.e,u.e,[]),t["\u0275mpd"](1073742336,J.g,J.g,[]),t["\u0275mpd"](1073742336,w.b,w.b,[]),t["\u0275mpd"](1073742336,B.u,B.u,[]),t["\u0275mpd"](1073742336,$.c,$.c,[]),t["\u0275mpd"](1073742336,P.i,P.i,[]),t["\u0275mpd"](1073742336,f.b,f.b,[]),t["\u0275mpd"](1073742336,y.c,y.c,[]),t["\u0275mpd"](1073742336,Q.a,Q.a,[]),t["\u0275mpd"](1073742336,i.e,i.e,[]),t["\u0275mpd"](1073742336,i.d,i.d,[]),t["\u0275mpd"](1073742336,nn.a,nn.a,[]),t["\u0275mpd"](1073742336,ln.a,ln.a,[]),t["\u0275mpd"](1073742336,en.b,en.b,[]),t["\u0275mpd"](1073742336,tn.a,tn.a,[]),t["\u0275mpd"](1073742336,on.o,on.o,[[2,on.t],[2,on.l]]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](256,i.m,"XSRF-TOKEN",[]),t["\u0275mpd"](256,i.n,"X-XSRF-TOKEN",[]),t["\u0275mpd"](1024,on.j,function(){return[[{path:"",component:D},{path:"**",redirectTo:"",pathMatch:"full"}]]},[])])})},w6M7:function(n,l,e){"use strict";var t=e("CcnG");e("iss+"),e("t/Na"),e("ZYjt"),e.d(l,"a",function(){return o}),e.d(l,"b",function(){return a});var o=t["\u0275crt"]({encapsulation:2,styles:[["code[class*=language-],pre[class*=language-]{text-shadow:0 1px #fff;word-spacing:normal;word-break:normal;word-wrap:normal;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}code[class*=language-],pre[class*=language-]{color:#000;background:0 0;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{position:relative;margin:.5em 0;overflow:visible;padding:0}pre[class*=language-]>code{position:relative;border-left:10px solid #358ccb;box-shadow:-1px 0 0 0 #358ccb,0 0 0 1px #dfdfdf;background-color:#fdfdfd;background-image:linear-gradient(transparent 50%,rgba(69,142,209,.04) 50%);background-size:3em 3em;background-origin:content-box;background-attachment:local}code[class*=language]{max-height:inherit;height:inherit;padding:0 1em;display:block;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background-color:#fdfdfd;box-sizing:border-box;margin-bottom:1em}:not(pre)>code[class*=language-]{position:relative;padding:.2em;border-radius:.3em;color:#c92c2c;border:1px solid rgba(0,0,0,.1);display:inline;white-space:normal}pre[class*=language-]:after,pre[class*=language-]:before{content:'';z-index:-2;display:block;position:absolute;bottom:.75em;left:.18em;width:40%;height:20%;max-height:13em;box-shadow:0 13px 8px #979797;-webkit-transform:rotate(-2deg);transform:rotate(-2deg)}:not(pre)>code[class*=language-]:after,pre[class*=language-]:after{right:.75em;left:auto;-webkit-transform:rotate(2deg);transform:rotate(2deg)}.token.block-comment,.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#7d8b99}.token.punctuation{color:#5f6364}.token.boolean,.token.constant,.token.deleted,.token.function-name,.token.number,.token.property,.token.symbol,.token.tag{color:#c92c2c}.token.attr-name,.token.builtin,.token.char,.token.function,.token.inserted,.token.selector,.token.string{color:#2f9c0a}.token.entity,.token.operator,.token.url,.token.variable{color:#a67f59;background:rgba(255,255,255,.5)}.token.atrule,.token.attr-value,.token.class-name,.token.keyword{color:#1990b8}.token.important,.token.regex{color:#e90}.language-css .token.string,.style .token.string{color:#a67f59;background:rgba(255,255,255,.5)}.token.important{font-weight:400}.token.bold{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}.namespace{opacity:.7}@media screen and (max-width:767px){pre[class*=language-]:after,pre[class*=language-]:before{bottom:14px;box-shadow:none}}.token.cr:before,.token.lf:before,.token.tab:not(:empty):before{color:#e0d7d1}pre[class*=language-].line-numbers{padding-left:0}pre[class*=language-].line-numbers code{padding-left:3.8em}pre[class*=language-].line-numbers .line-numbers-rows{left:0}pre[class*=language-][data-line]{padding-top:0;padding-bottom:0;padding-left:0}pre[data-line] code{position:relative;padding-left:4em}pre .line-highlight{margin-top:0}.markdown-content{overflow-y:auto;padding:1rem}.markdown-content table{border-collapse:collapse}.markdown-content table tr td,.markdown-content table tr th{border-width:1px;border-style:solid;padding:1rem}"]],data:{}});function a(n){return t["\u0275vid"](2,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","markdown-content"]],[[8,"innerHTML",1]],null,null,null,null))],null,function(n,l){n(l,0,0,l.component.html)})}}}]);