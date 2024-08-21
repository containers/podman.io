"use strict";(self.webpackChunkpodman=self.webpackChunkpodman||[]).push([[56942],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>y});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),c=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=c(e.components);return a.createElement(p.Provider,{value:n},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(t),u=r,y=m["".concat(p,".").concat(u)]||m[u]||d[u]||o;return t?a.createElement(y,i(i({ref:n},s),{},{components:t})):a.createElement(y,i({ref:n},s))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=u;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[m]="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},27667:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=t(87462),r=(t(67294),t(3905));const o={title:"Easy Development Dependency Management With Podman and Tent",layout:"default",author:"fhsinchy",categories:["blogs"],tags:["tent","hpc","podman","containers","dependency-management","linux"]},i=void 0,l={permalink:"/blogs/2021/02/08/easy-development-dependency-management-with-podman-and-tent",source:"@site/blog/2021-02-08-easy-development-dependency-management-with-podman-and-tent.md",title:"Easy Development Dependency Management With Podman and Tent",description:"podman logo",date:"2021-02-08T00:00:00.000Z",formattedDate:"February 8, 2021",tags:[{label:"tent",permalink:"/blogs/tags/tent"},{label:"hpc",permalink:"/blogs/tags/hpc"},{label:"podman",permalink:"/blogs/tags/podman"},{label:"containers",permalink:"/blogs/tags/containers"},{label:"dependency-management",permalink:"/blogs/tags/dependency-management"},{label:"linux",permalink:"/blogs/tags/linux"}],readingTime:4.705,hasTruncateMarker:!0,authors:[{name:"fhsinchy"}],frontMatter:{title:"Easy Development Dependency Management With Podman and Tent",layout:"default",author:"fhsinchy",categories:["blogs"],tags:["tent","hpc","podman","containers","dependency-management","linux"]},prevItem:{title:"Announcement&#58; Support for Older Distros on Kubic Project/OBS",permalink:"/blogs/2021/03/02/podman-support-for-older-distros"},nextItem:{title:"Easy Development Dependency Management With Podman and Tent",permalink:"/blogs/2021/02/08/new"}},p={authorsImageUrls:[void 0]},c=[{value:"By Farhan Hasin Chowdhury GitHub",id:"by-farhan-hasin-chowdhury-github",level:2}],s={toc:c},m="wrapper";function d(e){let{components:n,...o}=e;return(0,r.kt)(m,(0,a.Z)({},s,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"podman logo",src:t(1382).Z,width:"228",height:"61"})),(0,r.kt)("h1",{id:"easy-development-dependency-management-with-podman-and-tent"},"Easy Development Dependency Management With Podman and Tent"),(0,r.kt)("h2",{id:"by-farhan-hasin-chowdhury-github"},"By Farhan Hasin Chowdhury ",(0,r.kt)("a",{parentName:"h2",href:"https://github.com/fhsinchy"},"GitHub")),(0,r.kt)("p",null,"Installing and managing development dependencies for various project is a chore and one thing that can improve your everyday workflow is the usage of containers."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/fhsinchy/tent/"},"Tent")," is a CLI tool for running development dependencies such as MySQL, Mongo, ElasticSearch etc inside pre-configured containers using simple one-liners."))}d.isMDXComponent=!0},1382:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/podman-ce586c2894883ad9c353492b5e1893a8.svg"}}]);