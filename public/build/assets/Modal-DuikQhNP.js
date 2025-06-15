import{r as l,j as s}from"./app-Dn5VNY7D.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:d="",children:n,iconNode:c,...i},u)=>l.createElement("svg",{ref:u,...b,width:t,height:t,stroke:e,strokeWidth:o?Number(r)*24/Number(t):r,className:x("lucide",d),...i},[...c.map(([m,a])=>l.createElement(m,a)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(e,t)=>{const r=l.forwardRef(({className:o,...d},n)=>l.createElement(h,{ref:n,iconNode:t,className:x(`lucide-${w(e)}`,o),...d}));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],j=g("X",k),p={sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-2xl",full:"w-full mx-6"},$=({title:e,size:t="md",isOpen:r,onClose:o,children:d,closeOnOverlayClick:n=!0,closeOnEsc:c=!0,overlayClassName:i="",className:u=""})=>{l.useEffect(()=>{if(!r||!c)return;const a=f=>{f.key==="Escape"&&o()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[r,c,o]);const m=a=>{n&&a.target===a.currentTarget&&o()};return r?s.jsx("div",{className:`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${i}`,onClick:m,children:s.jsxs("div",{className:`bg-secondary text-secondary-foreground rounded-lg shadow-lg overflow-auto w-full ${p[t]} ${u}`,children:[e&&s.jsx(v,{onClose:o,children:e}),s.jsx(y,{children:d})]})}):null},v=({children:e,className:t="",showCloseButton:r=!0,onClose:o})=>s.jsxs("div",{className:`flex justify-between items-center p-4 border-b ${t}`,children:[s.jsx("h3",{className:"text-xl font-semibold",children:e}),r&&s.jsx("button",{onClick:o,className:"text-red-500 hover:text-accent-foreground text-2xl","aria-label":"Close",children:s.jsx(j,{})})]}),y=({children:e,className:t=""})=>s.jsx("div",{className:`p-4 ${t}`,children:e});export{$ as M,g as c};
