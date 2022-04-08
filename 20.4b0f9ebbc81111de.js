"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[20,779],{5857:(w,M,e)=>{e.d(M,{H:()=>g});var n=e(5e3),d=e(8966),p=(e(7514),e(9808));function C(s,_){if(1&s){const a=n.EpF();n.TgZ(0,"img",11),n.NdJ("load",function(){return n.CHM(a),n.oxw(2).imageLoaded.emit()}),n.qZA()}if(2&s){const a=n.oxw(2);n.uIk("src",a.item.urlToImage,n.LSH)}}function c(s,_){if(1&s&&(n.TgZ(0,"span",1)(1,"span",2),n.YNc(2,C,1,1,"img",3),n.qZA(),n.TgZ(3,"span",4)(4,"span",5),n._uU(5),n.qZA(),n.TgZ(6,"span",6),n._uU(7),n.qZA(),n.TgZ(8,"span",7)(9,"a",8),n._uU(10),n.qZA(),n.TgZ(11,"span",9),n._uU(12),n.qZA(),n.TgZ(13,"span",10),n._uU(14),n.qZA()()()()),2&s){const a=n.oxw();n.xp6(2),n.Q6J("ngIf",a.item.urlToImage),n.xp6(3),n.Oqu(a.item.title),n.xp6(2),n.Oqu(a.item.description),n.xp6(2),n.uIk("href",a.item.url,n.LSH),n.xp6(1),n.Oqu(a.item.url),n.xp6(2),n.Oqu(a.item.author),n.xp6(2),n.Oqu(a.item.publishedAt)}}let g=(()=>{class s{constructor(a,l){this.elementRef=a,this.imageLoaded=new n.vpe,l&&(this.item=l)}}return s.\u0275fac=function(a){return new(a||s)(n.Y36(n.SBq),n.Y36(d.WI,8))},s.\u0275cmp=n.Xpm({type:s,selectors:[["news-card"]],inputs:{item:"item"},outputs:{imageLoaded:"imageLoaded"},decls:1,vars:1,consts:[["class","news",4,"ngIf"],[1,"news"],[1,"logo"],[3,"load",4,"ngIf"],[1,"text"],[1,"title"],[1,"description"],[1,"footer"],[1,"url"],[1,"author"],[1,"publishedAt"],[3,"load"]],template:function(a,l){1&a&&n.YNc(0,c,15,7,"span",0),2&a&&n.Q6J("ngIf",l.item)},directives:[p.O5],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]{padding:5px;overflow:hidden;display:flex;flex-direction:row}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{flex:0 0 25%}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:auto;height:auto;object-fit:contain;max-width:100%;max-height:100%}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:flex;flex-direction:column;border-left:1px #aaa solid;padding-left:.3rem;margin-left:.3rem;flex:0 0 75%}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:200%;margin:0 1rem .3rem .3rem;white-space:normal}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:120%;margin:.3rem 1rem .3rem .3rem;white-space:normal}[_nghost-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{display:flex;flex-direction:row;margin:.3rem 1rem 0 .3rem;overflow:hidden;justify-content:space-between;flex-wrap:wrap}"]}),s})()},4779:(w,M,e)=>{e.r(M),e.d(M,{NewsCardModule:()=>C});var n=e(9808),d=e(1636),m=e(5857),p=e(5e3);let C=(()=>{class c extends d.sw{constructor(){super(m.H)}}return c.\u0275fac=function(s){return new(s||c)},c.\u0275mod=p.oAB({type:c}),c.\u0275inj=p.cJS({providers:[],imports:[[n.ez]]}),c})()},7514:(w,M,e)=>{e.d(M,{ef:()=>C,wg:()=>c});var n=e(655),d=e(8767);class C{constructor(){this.sources=void 0,this.status=void 0}}(0,n.gn)([(0,d.ep)({type:class p{constructor(){this.id=void 0,this.name=void 0,this.category=void 0,this.language=void 0,this.country=void 0,this.sortBysAvailable=void 0}}}),(0,n.w6)("design:type",Array)],C.prototype,"sources",void 0);class c{constructor(){this.articles=void 0,this.status=void 0,this.sources=void 0}}(0,n.gn)([(0,d.ep)({type:class m{constructor(){this.author=void 0,this.title=void 0,this.description=void 0,this.url=void 0,this.urlToImage=void 0,this.publishedAt=void 0}}}),(0,n.w6)("design:type",Array)],c.prototype,"articles",void 0)},1857:(w,M,e)=>{e.d(M,{Y:()=>a});var n=e(8767),d=e(6698),m=e(4004),p=e(3900),C=e(8505),c=e(4782),g=e(7514),s=e(5e3),_=e(520);let a=(()=>{class l{constructor(f){this.httpClient=f,this.news$=this.httpClient.get("https://newsapi.org/v1/sources?language=en").pipe((0,m.U)(r=>n.cV.deserialize(g.ef,r)),(0,m.U)(r=>{if("ok"!==r.status)throw new Error("Fail to get news");return r.sources}),(0,m.U)(r=>r.filter(O=>"technology"===O.category||"gaming"===O.category)),(0,p.w)(r=>{const O=r[Math.round(Math.random()*(r.length-1))];return this.httpClient.get(`https://newsapi.org/v1/articles?source=${O.id}&apiKey=228bc9410a2a4f608d2ad2e5626896f3`)}),(0,m.U)(r=>n.cV.deserialize(g.wg,r)),(0,m.U)(r=>{if("ok"!==r.status)throw new Error("Fail to get news");return r.articles}),(0,C.b)(r=>{console.log("x",r)}),(0,c.d)({bufferSize:1,refCount:!1}))}getNews$(f){return this.news$.pipe((0,m.U)(r=>{let O=r;if(f)for(;f>0;)O=O.concat((0,d.Z)(r)),f-=r.length;return O}))}}return l.\u0275fac=function(f){return new(f||l)(s.LFG(_.eN))},l.\u0275prov=s.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},7201:(w,M,e)=>{e.r(M),e.d(M,{ViewPortDemoModule:()=>B});var n=e(9808),d=e(3075),m=e(7423),p=e(9224),C=e(7446),c=e(5245),g=e(7531),s=e(3251),_=e(4594),a=e(3636),l=e(3485),v=e(4779),f=e(1402),r=e(4782),O=e(1857),t=e(5e3),E=e(1339),T=e(7322),D=e(5857);const A=["viewport"];function y(i,x){1&i&&(t.TgZ(0,"mat-card",4),t._UZ(1,"deja-markdown",5),t.qZA()),2&i&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/v2/viewport/readme.md"))}function I(i,x){if(1&i){const o=t.EpF();t.TgZ(0,"news-card",21),t.NdJ("imageLoaded",function(){const u=t.CHM(o).$implicit;return t.oxw(2).imageLoaded(u)}),t.qZA()}2&i&&t.Q6J("item",x.$implicit.model)}function Z(i,x){if(1&i){const o=t.EpF();t.TgZ(0,"mat-card",4)(1,"mat-toolbar",6),t._uU(2,"Viewport"),t.qZA(),t.TgZ(3,"mat-card-content",7)(4,"div",8),t._uU(5,"Sample with a big list of more than 3000 templates. Rendering can be horizontal or vertical. Only the visible templates are created on the dom. In this example, the size of the template is automatically calculated on the rendering, and the scroll bar is adapted during the scolling. This is the worst case for perfomances."),t.qZA(),t.TgZ(6,"div",9)(7,"mat-checkbox",10),t.NdJ("ngModelChange",function(P){return t.CHM(o),t.oxw().isHorizontal=P}),t._uU(8,"Horizontal"),t.qZA(),t.TgZ(9,"mat-checkbox",11),t.NdJ("ngModelChange",function(P){return t.CHM(o),t.oxw().hasButtons=P}),t._uU(10,"Buttons Scrolling (Tips: press ctrl to increase the step)"),t.qZA(),t.TgZ(11,"span",12)(12,"span"),t._uU(13,"Ensure index:"),t.qZA(),t.TgZ(14,"mat-form-field",13)(15,"input",14),t.NdJ("ngModelChange",function(P){return t.CHM(o),t.oxw().ensureIndex=P}),t.qZA()(),t.TgZ(16,"button",15),t.NdJ("click",function(){t.CHM(o);const P=t.MAs(29),u=t.oxw();return P.ensureVisible(u.ensureIndex)}),t._uU(17,"Go"),t.qZA(),t.TgZ(18,"a",16),t.NdJ("click",function(){return t.CHM(o),t.oxw().reload()}),t.TgZ(19,"mat-icon"),t._uU(20,"refresh"),t.qZA()()(),t.TgZ(21,"span",17)(22,"span"),t._uU(23,"Ensure scroll position:"),t.qZA(),t.TgZ(24,"mat-form-field",13)(25,"input",14),t.NdJ("ngModelChange",function(P){return t.CHM(o),t.oxw().scrollPosition=P}),t.qZA()(),t.TgZ(26,"button",15),t.NdJ("click",function(){t.CHM(o);const P=t.MAs(29),u=t.oxw();return P.viewPortService.scrollPosition$.next(u.scrollPosition)}),t._uU(27,"Go"),t.qZA()()(),t.TgZ(28,"viewport",18,19),t.ALo(30,"async"),t.YNc(31,I,1,1,"ng-template",null,20,t.W1O),t.qZA()()()}if(2&i){const o=t.oxw();t.xp6(7),t.Q6J("ngModel",o.isHorizontal),t.xp6(2),t.Q6J("ngModel",o.hasButtons),t.xp6(6),t.Q6J("ngModel",o.ensureIndex),t.xp6(10),t.Q6J("ngModel",o.scrollPosition),t.xp6(3),t.Q6J("debugMode",!1)("models",t.lcZ(30,8,o.news$))("direction",o.isHorizontal?"horizontal":"vertical")("scrollingStyle",o.hasButtons?"buttons":"scrollbar")}}const N=f.Bz.forChild([{path:"",component:(()=>{class i{constructor(o){this.tabIndex=1,this.isHorizontal=!1,this.hasButtons=!1,this.exampleValue='\n    <viewport [models]="news$ | async" itemSize="120">\n        <ng-template #viewPortItemTemplate let-item>\n            <div *ngIf="item" class="news" [attr.id]="id">\n                <img [attr.src]="item.urlsToLogos.medium" class="logo">\n                <span class="text">\n                    <span class="name">{{ item.name }}</span>\n                    <span class="description">{{ item.description }}</span>\n                    <div class="footer">\n                        <a class="url" [attr.href]="item.url">{{ item.url }}</a>\n                        <span class="category">{{ item.category }}</span>\n                        <span class="country">{{ item.country }}</span>\n                        <span class="language">{{ item.language }}</span>\n                    </div>\n                </span>\n            </div>\n        </ng-template>\n    </viewport>',this.news$=o.getNews$(50).pipe((0,r.d)({bufferSize:1,refCount:!1}))}reload(){this.viewport&&this.viewport.reloadViewPort()}imageLoaded(o){requestAnimationFrame(()=>requestAnimationFrame(()=>{o.loaded||(o.loaded=!0,o.size=void 0,this.viewport.refreshViewPort())}))}}return i.\u0275fac=function(o){return new(o||i)(t.Y36(O.Y))},i.\u0275cmp=t.Xpm({type:i,selectors:[["viewport-demo"]],viewQuery:function(o,h){if(1&o&&t.Gf(A,5),2&o){let P;t.iGM(P=t.CRH())&&(h.viewport=P.first)}},decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],["color","primary"],["id","viewPortContainer"],[1,"viewPortTitle"],[1,"viewPortOptions"],[3,"ngModel","ngModelChange"],[1,"flexOffset1rl",3,"ngModel","ngModelChange"],[1,"viewPortEnsureIndex"],[1,"flex3r"],["matInput","","type","number","autocomplete","off",3,"ngModel","ngModelChange"],["type","button","mat-button","",3,"click"],["mat-button","",3,"click"],[1,"viewPortEnsureScrollPos"],["viewPortMode","auto","itemSize","41",3,"debugMode","models","direction","scrollingStyle"],["viewport",""],["viewPortItemTemplate",""],[3,"item","imageLoaded"]],template:function(o,h){1&o&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(u){return h.tabIndex=u.index}),t._UZ(1,"mat-tab",1)(2,"mat-tab",2),t.qZA(),t.YNc(3,y,2,1,"mat-card",3),t.YNc(4,Z,33,10,"mat-card",3)),2&o&&(t.Q6J("selectedIndex",h.tabIndex),t.xp6(3),t.Q6J("ngIf",0===h.tabIndex),t.xp6(1),t.Q6J("ngIf",1===h.tabIndex))},directives:[s.SP,s.uX,n.O5,p.a8,E.F,_.Ye,p.dn,C.oG,d.JJ,d.On,T.KE,g.Nt,d.wV,d.Fj,m.lW,m.zs,c.Hw,a.Ef,D.H],pipes:[n.Ov],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;overflow:hidden}[_nghost-%COMP%]   .mat-tab-group[_ngcontent-%COMP%]{flex:0 0 auto}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]{flex:1 1 auto;display:flex;flex-direction:column;overflow:hidden}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-toolbar[_ngcontent-%COMP%]{flex:0 0 auto}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]{flex:1 1 auto;display:flex;flex-direction:column;overflow:hidden}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortTitle[_ngcontent-%COMP%]{flex:0 0 auto}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;justify-content:flex-start}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]   .mat-checkbox[_ngcontent-%COMP%]{padding:.5rem}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]   .viewPortEnsureIndex[_ngcontent-%COMP%], [_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]   .viewPortEnsureScrollPos[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;padding-left:2rem}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]   .viewPortEnsureIndex[_ngcontent-%COMP%]   .flex3r[_ngcontent-%COMP%], [_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   .viewPortOptions[_ngcontent-%COMP%]   .viewPortEnsureScrollPos[_ngcontent-%COMP%]   .flex3r[_ngcontent-%COMP%]{flex:0 0 3rem;overflow:hidden}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[_ngcontent-%COMP%]{padding-top:1rem;flex:1 1 100%}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]{box-shadow:inset 1px 0 #aaa,inset -1px 0 #aaa,inset 0 -1px #aaa}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]:first-child{box-shadow:inset 1px 0 #aaa,inset -1px 0 #aaa,inset 0 -1px #aaa,inset 0 1px #aaa}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]{box-shadow:inset -1px 0 #aaa,inset 0 -1px #aaa,inset 0 1px #aaa}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]:first-child{box-shadow:inset 1px 0 #aaa,inset -1px 0 #aaa,inset 0 -1px #aaa,inset 0 1px #aaa}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]{max-width:45rem;display:block}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{max-width:20rem!important}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{flex:0 1 25rem!important}[_nghost-%COMP%]   .demo-card[_ngcontent-%COMP%]   .mat-card-content[_ngcontent-%COMP%]   viewport[horizontal=true][_ngcontent-%COMP%]   .listitem[_ngcontent-%COMP%]   .news[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{flex-direction:column!important}"]}),i})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let B=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[],imports:[[n.ez,l.O,d.u5,m.ot,p.QW,C.p9,c.Ps,g.c,s.Nh,_.g0,v.NewsCardModule,N,a.J0]]}),i})()},2718:(w,M,e)=>{e.d(M,{V:()=>s});var n=e(9841),d=e(4482),m=e(5797),p=e(3268),C=e(9635),c=e(3269);function g(..._){const a=(0,c.jO)(_);return a?(0,C.z)(g(..._),(0,p.Z)(a)):(0,d.e)((l,v)=>{(0,n.l)([l,...(0,m.k)(_)])(v)})}function s(..._){return g(..._)}},1365:(w,M,e)=>{e.d(M,{M:()=>g});var n=e(4482),d=e(5403),m=e(8421),p=e(4671),C=e(5032),c=e(3269);function g(...s){const _=(0,c.jO)(s);return(0,n.e)((a,l)=>{const v=s.length,f=new Array(v);let r=s.map(()=>!1),O=!1;for(let t=0;t<v;t++)(0,m.Xf)(s[t]).subscribe((0,d.x)(l,E=>{f[t]=E,!O&&!r[t]&&(r[t]=!0,(O=r.every(p.y))&&(r=null))},C.Z));a.subscribe((0,d.x)(l,t=>{if(O){const E=[t,...f];l.next(_?_(...E):E)}}))})}}}]);