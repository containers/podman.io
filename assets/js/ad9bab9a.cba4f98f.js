"use strict";(self.webpackChunkpodman=self.webpackChunkpodman||[]).push([[9093],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),u=a,h=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},90091:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var o=n(87462),a=(n(67294),n(3905));const r={title:"Podman REST API and Docker compatibility",layout:"default",author:"mheon",categories:["blogs"],tags:["podman","containers","api","rest-api","hpc","rest","v2"]},i=void 0,s={permalink:"/blogs/2020/07/01/rest-versioning",source:"@site/blog/2020-07-01-rest-versioning.md",title:"Podman REST API and Docker compatibility",description:"podman logo",date:"2020-07-01T00:00:00.000Z",formattedDate:"July 1, 2020",tags:[{label:"podman",permalink:"/blogs/tags/podman"},{label:"containers",permalink:"/blogs/tags/containers"},{label:"api",permalink:"/blogs/tags/api"},{label:"rest-api",permalink:"/blogs/tags/rest-api"},{label:"hpc",permalink:"/blogs/tags/hpc"},{label:"rest",permalink:"/blogs/tags/rest"},{label:"v2",permalink:"/blogs/tags/v-2"}],readingTime:1.835,hasTruncateMarker:!0,authors:[{name:"mheon"}],frontMatter:{title:"Podman REST API and Docker compatibility",layout:"default",author:"mheon",categories:["blogs"],tags:["podman","containers","api","rest-api","hpc","rest","v2"]},prevItem:{title:"Podman REST API and Docker compatibility",permalink:"/blogs/2020/07/01/new"},nextItem:{title:"Announcing Podman v2.0",permalink:"/blogs/2020/06/29/new"}},l={authorsImageUrls:[void 0]},p=[{value:"By Matthew Heon GitHub",id:"by-matthew-heon-github",level:2},{value:"Versioning the REST API",id:"versioning-the-rest-api",level:2}],c={toc:p},m="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"podman logo",src:n(1382).Z,width:"228",height:"61"})),(0,a.kt)("h1",{id:"podman-rest-api-and-docker-compatibility"},"Podman REST API and Docker compatibility"),(0,a.kt)("h2",{id:"by-matthew-heon-github"},"By Matthew Heon ",(0,a.kt)("a",{parentName:"h2",href:"https://github.com/mheon"},"GitHub")),(0,a.kt)("h2",{id:"versioning-the-rest-api"},"Versioning the REST API"),(0,a.kt)("p",null,"Podman v2.0.0 launched recently, and with it the REST API. We\u2019ve seen a great deal of excitement with this new API because of what it will enable - enabling applications and automation to use Podman when the could previously only use Docker. As you may know, Podman\u2019s REST API is split into two halves: one providing a Docker-compatible API, and a Libpod API providing support for Podman\u2019s unique features such as pods. We would love for all projects to eventually grow to support for our native Libpod API, but this will take time (and may be impossible for older, no longer maintained projects). As such, we need to talk about the Compatibility API and how it can be used."),(0,a.kt)("p",null,"When we developed the compatibility API layer, we targeted the latest released version of the Docker API, v1.40. Within this version, we aimed to implement all endpoints, with the exception of those used for Swarm(",(0,a.kt)("sup",{parentName:"p",id:"fnref-1-253880"},(0,a.kt)("a",{parentName:"sup",href:"#fn-1-253880",className:"footnote-ref"},"1")),"). Podman is not a tool for managing clusters, and does not intend to become one. We recognize that many existing tools do not target this specific Docker API version, and these are occasionally breaking changes in the Docker API that may make using the newest API impossible. The core Podman team cannot commit to being bug-for-bug compatible with every version of the Docker API. The Podman team commits to fixing bugs related to the latest version of Docker API. We may fix bugs with older versions that affect many users. As a community project, we gladly accept help here - if you find bugs that prevent Podman from working with a specific API version you use and are willing to fix them, we\u2019re always happy to accept patches!"),(0,a.kt)("p",null,"We\u2019re very excited by the possibilities the new Podman API offers, and encourage everyone to try it out. Question and bug reports are always welcome at our ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/containers/podman"},"Github page")," or our ",(0,a.kt)("a",{parentName:"p",href:"https://lists.podman.io/admin/lists/podman.lists.podman.io/"},"email list"),"."),(0,a.kt)("div",{className:"footnotes"},(0,a.kt)("hr",{parentName:"div"}),(0,a.kt)("ol",{parentName:"div"},(0,a.kt)("li",{parentName:"ol",id:"fn-1-253880"},"The Podman team believes the best tool for container orchestration is ",(0,a.kt)("a",{parentName:"li",href:"https://kubernetes.io/"},"Kubernetes"),". The ",(0,a.kt)("inlineCode",{parentName:"li"},"podman generate kube")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"podman play kube")," ease developer transitioning from single node containers/pods to full Kubernetes workloads.",(0,a.kt)("a",{parentName:"li",href:"#fnref-1-253880",className:"footnote-backref"},"\u21a9")))))}d.isMDXComponent=!0},1382:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/podman-ce586c2894883ad9c353492b5e1893a8.svg"}}]);