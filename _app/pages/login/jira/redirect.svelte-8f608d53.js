import{S as c,i as d,s as f,e as u,t as m,c as h,a as p,h as g,d as l,b as _,g as b,G as x,O as y,H as s}from"../../../chunks/vendor-bad6d441.js";import{l as J}from"../../../chunks/Config-e5e786dd.js";import{a as U}from"../../../chunks/JiraLogin-89912625.js";import"../../../chunks/Defaults-0244c464.js";function v(n){let t,e,a,r;return{c(){t=u("button"),e=m("Login to Jira"),this.h()},l(o){t=h(o,"BUTTON",{class:!0});var i=p(t);e=g(i,"Login to Jira"),i.forEach(l),this.h()},h(){_(t,"class","button is-primary")},m(o,i){b(o,t,i),x(t,e),a||(r=y(t,"click",n[0]),a=!0)},p:s,i:s,o:s,d(o){o&&l(t),a=!1,r()}}}function w(n){function t(){const e=J(),a=U(e.jira.clientId);window.location.href=a}return[t]}class S extends c{constructor(t){super();d(this,t,w,v,f,{})}}export{S as default};
