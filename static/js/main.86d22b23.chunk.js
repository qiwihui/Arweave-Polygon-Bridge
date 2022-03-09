(this["webpackJsonparweave-polygon-bridge"]=this["webpackJsonparweave-polygon-bridge"]||[]).push([[0],{457:function(e,t,n){"use strict";(function(e){var a=n(0),c=n.n(a),i=n(458),o=n(65),s=n.n(o),r=n(42),l=n(272),d=n(31),u=n(74),h=n(103),j=n(270),v=n(271),b=n(279),p=n(473),g=n(79),x=n(14);t.a=function(){const t="Select a Currency",n="Select a Provider",[a,o]=c.a.useState(t),[f,w]=c.a.useState(),[O,m]=c.a.useState(n),[y,C]=c.a.useState(),[S,k]=c.a.useState(),[B,F]=c.a.useState(),[I,U]=c.a.useState(),[W,A]=c.a.useState("https://node1.bundlr.network"),[T,M]=c.a.useState(),[L,P]=c.a.useState(),[N,D]=c.a.useState(),E=Object(l.a)(),_=c.a.useRef(),[G,V]=c.a.useState("image/png"),[q,J]=c.a.useState("application/elixir"),[R,z]=c.a.useState("test"),[H,K]=c.a.useState(),Q=async()=>{clearInterval(_.current),C(void 0),k(void 0),F(void 0),U(void 0),D(void 0),w(void 0),o(t),m(n)},X=async t=>{let n=t.target.files,a=new FileReader;n&&n.length>0&&(a.onload=function(){a.result&&k(e.from(a.result))},a.readAsArrayBuffer(n[0]))},Y=async e=>{N&&await Q();const t=new g.providers.Web3Provider(e);return await t._ready(),t},Z={MetaMask:async e=>{var t,n;if(null===(t=window)||void 0===t||null===(n=t.ethereum)||void 0===n||!n.isMetaMask)return;await window.ethereum.enable();const a=await Y(window.ethereum),c="0x".concat(e.chainId.toString(16));try{await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:c}]})}catch(i){4902===i.code&&await window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:c,rpcUrls:e.rpcUrls,chainName:e.chainName}]})}return a},WalletConnect:async e=>await Y(await new p.a(e).enable())},$={matic:{providers:["MetaMask","WalletConnect"],opts:{chainId:137,chainName:"Polygon Mainnet",rpcUrls:["https://polygon-rpc.com"]}}},ee=e=>e.charAt(0).toUpperCase()+e.substring(1).toLowerCase(),te=e=>{const t=new s.a(e).multipliedBy(I.currencyConfig.base[1]);if(!t.isLessThan(1))return t;E({status:"error",title:"Value too small!"})};return Object(x.jsxs)(d.c,{mt:10,children:[Object(x.jsxs)(d.a,{children:[" ",Object(x.jsxs)(u.a,{children:[Object(x.jsx)(u.b,{as:r.a,rightIcon:Object(x.jsx)(b.a,{}),children:ee(a)}),Object(x.jsx)(u.d,{children:Object.keys($).map((e=>Object(x.jsx)(u.c,{onClick:()=>{Q(),o(e)},children:ee(e)},e)))})]}),Object(x.jsxs)(u.a,{children:[Object(x.jsx)(u.b,{disabled:a===t,as:r.a,rightIcon:Object(x.jsx)(b.a,{}),children:O}),Object(x.jsx)(u.d,{children:Object.keys(Z).map((e=>$[a]&&-1!==$[a].providers.indexOf(e)?Object(x.jsx)(u.c,{onClick:()=>m(e),children:e},e):void 0))})]}),Object(x.jsx)(r.a,{disabled:!(O!==n&&a!==t&&W.length>8),onClick:async()=>await(async()=>{if(_.current&&clearInterval(_.current),N)return D(void 0),U(void 0),void w(void 0);const e=O,t=a,n=Z[e],c=$[t];console.log("loading: ".concat(e," for ").concat(t));const i=await n(c.opts).catch((t=>{E({status:"error",title:"Failed to load provider ".concat(e),duration:1e4}),console.log(t)}));D(i)})(),children:N?"Disconnect":"Connect"})]}),Object(x.jsxs)(d.b,{children:["Connected Account: ",null!==f&&void 0!==f?f:"None"]}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(r.a,{w:400,disabled:!N,onClick:async()=>await(async()=>{const e=new i.WebBundlr(W,a,N);try{await e.utils.getBundlerAddress(a)}catch{return void E({status:"error",title:"Failed to connect to bundlr ".concat(W),duration:1e4})}try{await e.ready()}catch(t){console.log(t)}e.address||console.log("something went wrong"),E({status:"success",title:"Connected to ".concat(W)}),w(null===e||void 0===e?void 0:e.address),U(e)})(),children:"Connect to Bundlr"}),Object(x.jsx)(h.a,{value:W,onChange:e=>{A(e.target.value)},placeholder:"Bundler Address"})]}),I&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(d.a,{children:[Object(x.jsxs)(r.a,{onClick:async()=>{f&&I.getBalance(f).then((e=>{C(e.toString())})),await(async()=>{_&&clearInterval(_.current),_.current=window.setInterval((async()=>{null===I||void 0===I||I.getLoadedBalance().then((e=>{C(e.toString())})).catch((e=>clearInterval(_.current)))}),5e3)})()},children:["Get ",ee(a)," Balance"]}),y&&Object(x.jsx)(j.a,{label:"(".concat(y," ").concat(I.currencyConfig.base[0],")"),children:Object(x.jsxs)(d.b,{children:[ee(a)," Balance:"," ",I.utils.unitConverter(y).toFixed(7,2).toString()," ",I.currencyConfig.ticker.toLowerCase()]})})]}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(r.a,{w:200,onClick:async()=>{if(I&&T){E({status:"info",title:"Funding...",duration:15e3});const e=te(T);if(!e)return;await I.fund(e).then((e=>{E({status:"success",title:"Funded ".concat(null===e||void 0===e?void 0:e.target),description:" tx ID : ".concat(null===e||void 0===e?void 0:e.id),duration:1e4})})).catch((e=>{var t;E({status:"error",title:"Failed to fund - ".concat((null===(t=e.data)||void 0===t?void 0:t.message)||e.message)})}))}},children:"Fund Bundlr"}),Object(x.jsx)(h.a,{placeholder:"".concat(ee(a)," Amount"),value:T,onChange:e=>{M(e.target.value)}})]}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(r.a,{w:200,onClick:async()=>{if(I&&L){E({status:"info",title:"Withdrawing..",duration:15e3});const e=te(L);if(!e)return;await I.withdrawBalance(e).then((e=>{var t;E({status:"success",title:"Withdrawal successful - ".concat(null===(t=e.data)||void 0===t?void 0:t.tx_id),duration:5e3})})).catch((e=>{E({status:"error",title:"Withdrawal Unsuccessful!",description:e.message,duration:5e3})}))}},children:"Withdraw Balance"}),Object(x.jsx)(h.a,{placeholder:"".concat(ee(a)," Amount"),value:L,onChange:e=>{P(e.target.value)}})]}),Object(x.jsx)(d.b,{children:"----------------------------------"}),Object(x.jsx)(d.b,{children:"Way 0x01. Upload File"}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(d.b,{children:'Tags Value(default is "image/png"):'}),"// TODO Optimize Display",Object(x.jsx)(h.a,{onChange:e=>V(e.target.value),placeholder:"image/png"})]}),Object(x.jsx)(r.a,{onClick:()=>{var e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",document.body.appendChild(e),e.addEventListener("input",(function(t){X(t),document.body.removeChild(e)})),e.click()},children:"Select file from Device"}),S&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(d.a,{children:[Object(x.jsx)(r.a,{onClick:async()=>{if(S){const e=await(null===I||void 0===I?void 0:I.utils.getPrice(a,S.length));F(null===e||void 0===e?void 0:e.toString())}},children:"Get Price"}),B&&Object(x.jsx)(d.b,{children:"Cost: ".concat(I.utils.unitConverter(B).toString()," ").concat(I.currencyConfig.ticker.toLowerCase()," ")})]}),Object(x.jsx)(r.a,{onClick:async()=>{S&&await(null===I||void 0===I?void 0:I.uploader.upload(S,[{name:"Content-Type",value:G}]).then((e=>{E({status:200===(null===e||void 0===e?void 0:e.status)||201===(null===e||void 0===e?void 0:e.status)?"success":"error",title:200===(null===e||void 0===e?void 0:e.status)||201===(null===e||void 0===e?void 0:e.status)?"Successful!":"Unsuccessful! ".concat(null===e||void 0===e?void 0:e.status),description:null!==e&&void 0!==e&&e.data.id?"https://arweave.net/".concat(e.data.id):void 0,duration:15e3}),console.log("uploaded tx id is "+e.data.id)})).catch((e=>{E({status:"error",title:"Failed to upload - ".concat(e)})})))},children:"Upload File to Bundlr Network"})]}),Object(x.jsx)(d.b,{children:"----------------------------------"}),Object(x.jsx)(d.b,{children:"Way 0x02. Upload Code or Any Other Txt"}),Object(x.jsx)(d.a,{children:Object(x.jsx)(v.a,{onChange:e=>{z(e.target.value)},style:{minHeight:"300px",marginTop:"5px",width:"500px"}})}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(d.b,{children:'Tags Value(default is "application/elixir"):'}),Object(x.jsx)(h.a,{onChange:e=>J(e.target.value),placeholder:"application/elixir"})]}),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(r.a,{onClick:async()=>{if(R){const t=await(null===I||void 0===I?void 0:I.utils.getPrice(a,e.from(R,"utf8").length));K(null===t||void 0===t?void 0:t.toString())}},children:"Get Price"}),H&&Object(x.jsx)(d.b,{children:"Cost: ".concat(I.utils.unitConverter(H).toString()," ").concat(I.currencyConfig.ticker.toLowerCase()," ")})]}),Object(x.jsx)(r.a,{onClick:async()=>{R&&await(null===I||void 0===I?void 0:I.uploader.upload(e.from(R,"utf8"),[{name:"Content-Type",value:q}]).then((e=>{E({status:200===(null===e||void 0===e?void 0:e.status)||201===(null===e||void 0===e?void 0:e.status)?"success":"error",title:200===(null===e||void 0===e?void 0:e.status)||201===(null===e||void 0===e?void 0:e.status)?"Successful!":"Unsuccessful! ".concat(null===e||void 0===e?void 0:e.status),description:null!==e&&void 0!==e&&e.data.id?"https://arweave.net/".concat(e.data.id):void 0,duration:15e3})})).catch((e=>{E({status:"error",title:"Failed to upload - ".concat(e)})})))},children:"Upload Text to Bundlr Network"})]})]})}}).call(this,n(9).Buffer)},476:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(80),o=n.n(i),s=n(457),r=n(273),l=n(82),d=n(14);o.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(r.a,{theme:l.c,children:Object(d.jsx)(s.a,{})})}),document.getElementById("root"))},562:function(e,t){},564:function(e,t){},573:function(e,t){},575:function(e,t){},601:function(e,t){},602:function(e,t){},607:function(e,t){},609:function(e,t){},616:function(e,t){},635:function(e,t){},680:function(e,t){},682:function(e,t){},727:function(e,t){},761:function(e,t){},762:function(e,t){},798:function(e,t){},800:function(e,t){},812:function(e,t){},864:function(e,t){}},[[476,1,2]]]);