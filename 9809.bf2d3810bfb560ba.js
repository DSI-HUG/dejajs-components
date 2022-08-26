"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[9809],{4696:(w,p,l)=>{l.d(p,{I:()=>m});let m=(()=>{class n{constructor(e,t,r,a){this._r=e,this._g=t,this._b=r,this._a=a}static equals(e,t){return!e==!t&&!e.isEmpty()&&e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}static fromHSL(e,t,r){let a,s,f;if(0===t)a=s=f=r;else{const i=(b,h,c)=>(c<0&&(c+=1),c>1&&(c-=1),c<.16666666666666666?b+6*(h-b)*c:c<.5?h:c<.6666666666666666?b+(h-b)*(.6666666666666666-c)*6:b),o=r<.5?r*(1+t):r+t-r*t,d=2*r-o;a=i(d,o,e+1/3),s=i(d,o,e),f=i(d,o,e-1/3)}return new n(Math.round(255*a),Math.round(255*s),Math.round(255*f))}static fromHex(e){if(!e||e.length<3)return new n;let t,r,a,s,f=e.startsWith("#")?1:0;switch(e.length-f){case 3:t=parseInt(e[f]+e[f],16),r=parseInt(e[++f]+e[f],16),a=parseInt(e[++f]+e[f],16);break;case 4:t=parseInt(e[f]+e[f],16),r=parseInt(e[++f]+e[f],16),a=parseInt(e[++f]+e[f],16),s=parseInt(e[++f]+e[f],16);break;case 6:t=parseInt(e[f]+e[++f],16),r=parseInt(e[++f]+e[++f],16),a=parseInt(e[++f]+e[++f],16);break;case 8:t=parseInt(e[f]+e[++f],16),r=parseInt(e[++f]+e[++f],16),a=parseInt(e[++f]+e[++f],16),s=parseInt(e[++f]+e[++f],16);break;default:throw new Error("Invalid color.")}return new n(t,r,a,s)}static parse(e){if(!e||0===e.length)return new n;if(n.COLOR_NAMES[e])return n.fromHex(n.COLOR_NAMES[e]);if(e.startsWith("#"))return n.fromHex(e);{const t=/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(e);if(null!==t)return new n(+t[1],+t[2],+t[3]);const r=/rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([0-9.]*)\)/.exec(e);if(null!==r){let a=+r[4];return isNaN(a)?a=1:a<=1&&(a=Math.round(255*a)),new n(+r[1],+r[2],+r[3],a)}return}}get r(){return this._r}get g(){return this._g}get b(){return this._b}get a(){return this._a}get bestTextColor(){if(this.isEmpty())return new n;const t=1-(.299*this.r+.587*this.g+.114*this.b)/255<.5?0:255;return new n(t,t,t)}get grayScale(){if(this.isEmpty())return new n;const e=Math.round((this.r+this.g+this.b)/3);return new n(e,e,e,this.a)}isEmpty(){return void 0===this.r||void 0===this.g||void 0===this.b}clone(){return new n(this.r,this.g,this.b,this.a)}toHex(){const e=t=>`0${Number(t).toString(16)}`.slice(-2).toUpperCase();if(!this.isEmpty())return void 0!==this.a?`#${e(this.r)}${e(this.g)}${e(this.b)}${e(this.a)}`:`#${e(this.r)}${e(this.g)}${e(this.b)}`}toHSL(){const e=this.r/255,t=this.g/255,r=this.b/255,a=Math.max(e,t,r),s=Math.min(e,t,r);let f=(a+s)/2,i=f;const o=f;if(a===s)f=i=0;else{const d=a-s;i=o>.5?d/(2-a-s):d/(a+s),f=e>t&&e>r?(t-r)/d+(t<r?6:0):t>r?(r-e)/d+2:(e-t)/d+4,f/=6}return{h:f,s:i,l:o}}}return n.COLOR_NAMES={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd3"},n})()},8613:(w,p,l)=>{l.d(p,{Z:()=>e});var m=l(4696);class n extends m.I{constructor(){super(...arguments),this.subColors=[]}}var k=l(5e3);let e=(()=>{class t{constructor(){this.palet={"mat-red":{50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c"},"mat-pink":{50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f"},"mat-purple":{50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c"},"mat-deep-purple":{50:"#ede7f6",100:"#d1c4e9",200:"#b39ddb",300:"#9575cd",400:"#7e57c2",500:"#673ab7",600:"#5e35b1",700:"#512da8",800:"#4527a0",900:"#311b92"},"mat-indigo":{50:"#e8eaf6",100:"#c5cae9",200:"#9fa8da",300:"#7986cb",400:"#5c6bc0",500:"#3f51b5",600:"#3949ab",700:"#303f9f",800:"#283593",900:"#1a237e"},"mat-blue":{50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1"},"mat-light-blue":{50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b"},"mat-cyan":{50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064"},"mat-teal":{50:"#e0f2f1",100:"#b2dfdb",200:"#80cbc4",300:"#4db6ac",400:"#26a69a",500:"#009688",600:"#00897b",700:"#00796b",800:"#00695c",900:"#004d40"},"mat-green":{50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},"mat-light-green":{50:"#f1f8e9",100:"#dcedc8",200:"#c5e1a5",300:"#aed581",400:"#9ccc65",500:"#8bc34a",600:"#7cb342",700:"#689f38",800:"#558b2f",900:"#33691e"},"mat-lime":{50:"#f9fbe7",100:"#f0f4c3",200:"#e6ee9c",300:"#dce775",400:"#d4e157",500:"#cddc39",600:"#c0ca33",700:"#afb42b",800:"#9e9d24",900:"#827717"},"mat-yellow":{50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17"},"mat-amber":{50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00"},"mat-orange":{50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100"},"mat-deep-orange":{50:"#fbe9e7",100:"#ffccbc",200:"#ffab91",300:"#ff8a65",400:"#ff7043",500:"#ff5722",600:"#f4511e",700:"#e64a19",800:"#d84315",900:"#bf360c"},"mat-brown":{50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723"},"mat-grey":{0:"#ffffff",50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",1e3:"#000000"},"mat-blue-grey":{50:"#eceff1",100:"#cfd8dc",200:"#b0bec5",300:"#90a4ae",400:"#78909c",500:"#607d8b",600:"#546e7a",700:"#455a64",800:"#37474f",900:"#263238"}}}get colors(){return this._colors||(this._colors=[],Object.keys(this.palet).forEach(a=>{const s=n.fromHex(this.palet[a][500]);s.subColors=[],s.name=a,this._colors.push(s),Object.keys(this.palet[a]).forEach(f=>{const i=n.fromHex(this.palet[a][f]);i.name=f,s.subColors.unshift(i)})})),this._colors}getColor(a){return this.palet[a]}getPalet(a){return this.palettes||(this.palettes={},Object.keys(this.palet).forEach(s=>{Object.keys(this.palet[s]).forEach(i=>{this.palettes[i]||(this.palettes[i]=[]),this.palettes[i].push(m.I.fromHex(this.palet[s][i]))})})),this.palettes[a]}getColorFromText(a){let s=0;for(let o=0;o<a.length;o++)s+=a.charCodeAt(o);const f=this.colors,i=f[s%f.length].subColors;return i[s%i.length]}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275prov=k.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},9809:(w,p,l)=>{l.d(p,{K:()=>f,c:()=>s});var m=l(8767),n=l(4004),k=l(9646),e=l(4782),t=l(5e3),r=l(520),a=l(8613);class s{constructor(){this.displayName=void 0,this.naqme=void 0,this.code=void 0,this.color=void 0}}let f=(()=>{class i{constructor(d,b){this.httpClient=d,this.countriesDic={},this.materialColors=b.getPalet("700")}getCountryByIndex$(d){return this.getCountries$().pipe((0,n.U)(b=>b[d%b.length]))}getCountryByCode$(d){return(0,k.of)(this.countriesDic[d])}getCountries$(d,b){let h=b||0;return this.httpClient.get("assets/datas/countries.json",{}).pipe((0,n.U)(c=>m.cV.deserializeArray(s,c.data)),(0,n.U)(c=>{let u=0;return c.forEach(g=>{g.displayName=g.naqme,g.color=this.materialColors[u].toHex(),this.countriesDic[g.code]=g,++u>=this.materialColors.length&&(u=0)}),c}),(0,e.d)({bufferSize:1,refCount:!1}),(0,n.U)(c=>{if(d){const u=new RegExp(`^${d}`,"i"),g=new RegExp(`^(?!${d}).*(${d})`,"i"),v=c.filter(y=>u.test(y.naqme));return c.forEach(y=>{g.test(y.naqme)&&v.push(y)}),v}return c}),(0,n.U)(c=>{let u=c;if(h)for(;h>0;)u=u.concat(c),h-=c.length;return u}))}}return i.\u0275fac=function(d){return new(d||i)(t.LFG(r.eN),t.LFG(a.Z))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()}}]);