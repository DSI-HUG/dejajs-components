"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[4329],{9809:(X,A,i)=>{i.d(A,{K:()=>I,c:()=>w});var o=i(8767),$=i(4004),R=i(9646),U=i(4782),g=i(5e3),h=i(520),x=i(9009);class w{constructor(){this.displayName=void 0,this.naqme=void 0,this.code=void 0,this.color=void 0}}let I=(()=>{class p{constructor(d,b){this.httpClient=d,this.countriesDic={},this.materialColors=b.getPalet("700")}getCountryByIndex$(d){return this.getCountries$().pipe((0,$.U)(b=>b[d%b.length]))}getCountryByCode$(d){return(0,R.of)(this.countriesDic[d])}getCountries$(d,b){let O=b||0;return this.httpClient.get("assets/datas/countries.json",{}).pipe((0,$.U)(v=>o.cV.deserializeArray(w,v.data)),(0,$.U)(v=>{let f=0;return v.forEach(E=>{E.displayName=E.naqme,E.color=this.materialColors[f].toHex(),this.countriesDic[E.code]=E,++f>=this.materialColors.length&&(f=0)}),v}),(0,U.d)({bufferSize:1,refCount:!1}),(0,$.U)(v=>{if(d){const f=new RegExp(`^${d}`,"i"),E=new RegExp(`^(?!${d}).*(${d})`,"i"),N=v.filter(j=>f.test(j.naqme));return v.forEach(j=>{E.test(j.naqme)&&N.push(j)}),N}return v}),(0,$.U)(v=>{let f=v;if(O)for(;O>0;)f=f.concat(v),O-=v.length;return f}))}}return p.\u0275fac=function(d){return new(d||p)(g.LFG(h.eN),g.LFG(x.ZD))},p.\u0275prov=g.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},811:(X,A,i)=>{i.d(A,{Sx:()=>Q,$Q:()=>k,lq:()=>V,dY:()=>J});var o=i(5e3),$=i(5245),R=i(7916),U=i(1135),g=i(8505),h=i(9300),x=i(2722),w=i(4326),I=i(2718),p=i(4968),M=i(3900),d=i(9646),b=i(9751),O=i(576),f=i(5698),E=i(4004),N=i(7579),j=i(2181),S=i(1884),P=i(9009);const z=["block"],Z=["content"];let W=(()=>{class n extends R.yl{constructor(){super(),this.dragCursor$=new U.X(null),this.dropCursor$=new U.X(null),this.dragging$=new U.X(!1),this._isDragging=!1,this.dragging$.pipe((0,g.b)(e=>this._isDragging=e),(0,h.h)(e=>!e),(0,x.R)(this.destroyed$)).subscribe(()=>this.context=void 0)}get isDragging(){return this._isDragging}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),Q=(()=>{class n extends R.yl{constructor(e,a){super(),this.elementRef=e,this.dragDropService=a,this.cursor$=new U.X(null),this.cursor$.pipe((0,h.h)(t=>!t),(0,g.b)(t=>{this.currentCursor&&(this.contentElement&&(this.contentElement.style.opacity="0"),this.iconElement&&(this.iconElement.style.opacity="0")),this.currentCursor=t}),(0,w.g)(300),(0,x.R)(this.destroyed$)).subscribe(()=>{this.position=void 0}),this.cursor$.pipe((0,h.h)(t=>!!t),(0,g.b)(t=>{e.nativeElement.style.display="",this.contentElement&&(this.contentElement.style.opacity="0"),this.iconElement&&(this.iconElement.style.opacity="0"),this.currentCursor=t}),(0,h.h)(t=>!t.className||"hidden"!==t.className),(0,g.b)(t=>{t.html?(e.nativeElement.className=t.className,this.contentElement&&(this.contentElement.innerHTML=t.html,this.contentElement.style.width=`${t.width||48}px`,this.contentElement.style.height=`${t.height||48}px`)):this.iconElement&&(this.iconElement.style.opacity="1")}),(0,w.g)(1),(0,x.R)(this.destroyed$)).subscribe(t=>{t.html&&this.contentElement&&(this.contentElement.style.opacity="1")}),this.dragDropService.dragCursor$.pipe((0,I.V)(this.dragDropService.dropCursor$),(0,x.R)(this.destroyed$)).subscribe(([t,l])=>{var D,C,c,u;const r=(t||l)&&{className:(null==l?void 0:l.className)||(null==t?void 0:t.className),html:(null==l?void 0:l.html)||(null==t?void 0:t.html)||l&&(null==t?void 0:t.originalHtml),width:(null==l?void 0:l.width)||(null==t?void 0:t.width),height:(null==l?void 0:l.height)||(null==t?void 0:t.height),position:null==t?void 0:t.position,originalEvent:null==t?void 0:t.originalEvent};(null==r?void 0:r.html)!==(null===(D=this.currentCursor)||void 0===D?void 0:D.html)||(null==r?void 0:r.className)!==(null===(C=this.currentCursor)||void 0===C?void 0:C.className)||(null==r?void 0:r.width)!==(null===(c=this.currentCursor)||void 0===c?void 0:c.width)||(null==r?void 0:r.height)!==(null===(u=this.currentCursor)||void 0===u?void 0:u.height)?this.cursor$.next(r):this.position=null==r?void 0:r.position})}set position(e){e?(this.elementRef.nativeElement.style.left=`${e.left}px`,this.elementRef.nativeElement.style.top=`${e.top}px`,this.elementRef.nativeElement.style.display=""):this.elementRef.nativeElement.style.display="none"}get iconElement(){var e;return null===(e=this.icon)||void 0===e?void 0:e.nativeElement}get contentElement(){var e;return null===(e=this.content)||void 0===e?void 0:e.nativeElement}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(W))},n.\u0275cmp=o.Xpm({type:n,selectors:[["mouse-dragdrop-cursor"]],viewQuery:function(e,a){if(1&e&&(o.Gf(z,7),o.Gf(Z,7)),2&e){let t;o.iGM(t=o.CRH())&&(a.icon=t.first),o.iGM(t=o.CRH())&&(a.content=t.first)}},features:[o.qOj],decls:7,vars:0,consts:[["id","block"],["block",""],["id","content"],["content",""]],template:function(e,a){1&e&&(o.TgZ(0,"div",0,1)(2,"mat-icon",null,1),o._uU(4,"block"),o.qZA()(),o._UZ(5,"div",2,3))},dependencies:[$.Hw],styles:["mouse-dragdrop-cursor{position:fixed;width:0;height:0;overflow:visible;z-index:10000;user-select:none;display:flex;align-items:center;justify-content:space-around}mouse-dragdrop-cursor #block{position:absolute;top:0;left:0;width:3rem;height:3rem;display:flex;align-items:center;justify-content:space-around;transform:translate(-50%,-50%);transition-property:opacity;transition-timing-function:linear;transition-duration:.3s;cursor:default}mouse-dragdrop-cursor #content{position:absolute;top:0;left:0;transform:translate(-50%,-50%);transition-property:opacity;transition-timing-function:linear;transition-duration:.3s;cursor:default}\n"],encapsulation:2}),n})(),V=(()=>{class n extends R.yl{constructor(e,a){super();const t=e.nativeElement,l=(0,p.R)(t,"mouseleave"),D=(0,p.R)(t,"mouseenter"),C=(0,p.R)(t.ownerDocument,"mouseup"),c=(0,p.R)(t,"mousedown"),u=(0,p.R)(t.ownerDocument,"mousemove");D.pipe((0,h.h)(()=>!a.isDragging),(0,M.w)(()=>c.pipe((0,h.h)(r=>1===r.buttons),(0,x.R)(l),(0,M.w)(r=>{const H=s=>s.tagName===this.context.target.toUpperCase()||`#${s.id}`===this.context.target||s.hasAttribute(this.context.target.substring(1,this.context.target.length-1))||s.className.split(" ").some(m=>`.${m}`===this.context.target);let B=(0,d.of)(null);if(this.context){let s;if(this.context.target)for(s=r.target;s&&!H(s);)s=s.parentElement;else s=t;if(s&&this.context.dragStart){const m=this.context.dragStart(s);m&&(function v(n){return!!n&&(n instanceof b.y||(0,O.m)(n.lift)&&(0,O.m)(n.subscribe))}(m)?B=m.pipe((0,f.q)(1),(0,E.U)(T=>(a.context=T,T&&s))):(a.context=m,B=(0,d.of)(s)))}}return B.pipe((0,h.h)(s=>!!s),(0,M.w)(s=>{a.dragging$.next(!0);const m=new N.x,K=D.pipe((0,h.h)(L=>1!==L.buttons&&a.isDragging)),T=C.pipe((0,j.b)(K,m),(0,f.q)(1),(0,g.b)(()=>{a.dragCursor$.next(null),a.dragging$.next(!1)}));return u.pipe((0,x.R)(T),(0,g.b)(L=>{if(s&&1===L.buttons){const q=new P.UL(t.getBoundingClientRect()),F=new P.Ly(L.pageX,L.pageY),_=q.containsPoint(F)?s.innerHTML:void 0,Y=5;let G=new P.UL(r.pageX,r.pageY,2*Y,2*Y);G=G.offset(-Y,-Y),G.containsPoint(F)||a.dragCursor$.next({position:F,html:_,originalHtml:s.innerHTML,width:s.offsetWidth,height:s.offsetHeight,className:this.context.className,originalEvent:L})}else m.next();return!1}))}))}))),(0,x.R)(this.destroyed$)).subscribe()}set context(e){this._context=e}get context(){return this._context}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(W))},n.\u0275dir=o.lG2({type:n,selectors:[["","mouse-draggable",""]],inputs:{context:["mouse-draggable","context"]},features:[o.qOj]}),n})(),J=(()=>{class n extends R.yl{constructor(e,a){super();const t=e.nativeElement;let l;const D=a.dragging$.pipe((0,S.x)()),C=a.dragCursor$.pipe((0,h.h)(c=>!!c),(0,M.w)(c=>D.pipe((0,h.h)(u=>!u),(0,f.q)(1),(0,g.b)(()=>{var u;l&&(null===(u=this.context)||void 0===u?void 0:u.drop)&&this.context.drop(l,c),l=void 0,a.dropCursor$.next(null)}))));D.pipe((0,h.h)(c=>c),(0,M.w)(()=>a.dragCursor$.pipe((0,x.R)(C),(0,M.w)(c=>{var u;const r=new P.UL(t.getBoundingClientRect());if(this.context&&c){const{pageX:H,pageY:B}=c.originalEvent;if(r.containsPoint(new P.Ly(H,B))){if(l){if(this.context.dragOver){const s=this.context.dragOver(l,c);if(s)return(0,d.of)(s)}}else if(l=a.context,this.context.dragEnter){const s=this.context.dragEnter(l,c);if(s){const m=s;return m.subscribe?m:(0,d.of)(s)}}}else l&&(!(null===(u=this.context)||void 0===u)&&u.dragLeave&&this.context.dragLeave(l),l=void 0,a.dropCursor$.next(null))}return(0,d.of)(null)}))),(0,h.h)(c=>!!c),(0,x.R)(this.destroyed$)).subscribe(c=>a.dropCursor$.next(c))}set context(e){this._context=e}get context(){return this._context}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(W))},n.\u0275dir=o.lG2({type:n,selectors:[["","mouse-droppable",""]],inputs:{context:["mouse-droppable","context"]},features:[o.qOj]}),n})(),k=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[$.Ps]}),n})()}}]);