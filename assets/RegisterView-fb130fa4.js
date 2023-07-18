import{r as s,o as H,b4 as J,aS as Q,b5 as X,b6 as Y,b0 as f,a3 as q,aU as Z,b7 as K,p as e,v as r,aX as l,b8 as a,aY as o,aZ as u,al as p,a_ as C,b1 as g,a$ as b,ah as ee,b9 as se,ba as ae,b2 as re,bb as te,F as ne,W as ie}from"./index-8596cc97.js";import{A as oe}from"./AuthCard-025c5c26.js";const ce=3,F=30,le=()=>{const[w,N]=s.useState(),[d,R]=s.useState(!0),{state:v}=H(),[m,P]=s.useState("password"),$=m==="password"?"fa-eye-slash":"fa-eye",T=()=>P(m==="password"?"text":"password"),x=s.useRef(null),y=s.useRef(null),S=s.useRef(null),h=s.useRef(null),z=J(),{handleSubmit:W,watch:B,register:k,formState:{isSubmitting:M,errors:E,isValid:O,dirtyFields:c}}=Q({mode:"onChange"}),V=W(async t=>{var n;N("");try{await X(t),(n=Y)==null||n.create({title:"Registration success",message:`Successfully register new user ${t.user}`,variant:f.success}),z(q.login,{state:v})}catch(i){const L=await Z(i);let U="Register error";L&&(U+=`: ${L}`),N(U)}});s.useEffect(()=>{h.current&&h.current.focus()},[]);const{ref:j,...G}=k("user",{required:!0,minLength:ce,maxLength:F}),_=s.useMemo(()=>!!c.user,[c.user]),D=s.useMemo(()=>!!c.passwd,[c.passwd]),I=s.useRef(K(async t=>{var n;if(t)try{await te(t),R(!1)}catch(i){((n=i==null?void 0:i.response)==null?void 0:n.status)===404&&R(!0)}},180)).current,A=B("user");return s.useEffect(()=>{I(A)},[A,I]),e(oe,{children:r(l,{className:a.form,children:[r("div",{children:[e("h4",{className:a.title,children:"Welcome to Proof Market!"}),e("div",{className:`${a.heading} text-muted`,children:"Create new account"}),r(l.Group,{hasError:!!E.user||!d,children:[r(o,{size:u.lg,className:a.control,children:[e(o.Addon,{children:e(p,{iconName:"fa-solid fa-user",className:a.icon})}),e(C,{type:"text",id:"userName",placeholder:"username","aria-label":"username",ref:t=>{j(t),h.current=t},...G})]}),!d&&e(l.Hint,{children:"Username should be unique"})]}),e(g,{classNames:"fade",timeout:300,in:_,unmountOnExit:!0,nodeRef:x,children:e("div",{ref:x,children:e(l.Group,{hasError:!!E.passwd,children:r(o,{size:u.lg,className:a.control,children:[e(o.Addon,{children:e(p,{iconName:"fa-solid fa-lock",className:a.icon})}),e(C,{type:m,id:"password",placeholder:"password","aria-label":"password",autoComplete:"off",...k("passwd",{required:!0,maxLength:F})}),e(o.Buttons,{children:e(b,{onClick:T,children:e(p,{iconName:`fa-solid ${$}`,className:a.icon})})})]})})})}),e(g,{classNames:"fade",timeout:300,in:D,unmountOnExit:!0,nodeRef:y,children:e("div",{ref:y,children:r(b,{block:!0,variant:f.success,size:u.lg,disabled:M||!O||!d,onClick:V,children:["Register",M&&e(ee,{})]})})}),e("div",{className:a.errorMsg,children:e(g,{in:!!w,timeout:300,nodeRef:S,unmountOnExit:!0,classNames:"fade",children:e("span",{ref:S,className:"errorMessage",children:w})})})]}),r("div",{className:a.bottomBlock,children:[r("div",{className:a.social,children:[e("h5",{className:a.title,children:"Join our Discord's proof-market channel/Telegram for questions/to stay updated"}),e(se,{socialLinks:ae})]}),e("h5",{className:"text-center text-muted",children:"Already have an account? "}),e(re,{to:q.login,state:v,children:e(b,{block:!0,variant:f.success,size:u.lg,children:"Sign in"})})]})]})})},me=()=>r(ne,{children:[e(ie,{children:e("title",{children:"Register"})}),e(le,{})]});export{me as default};
