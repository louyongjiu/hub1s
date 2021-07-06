/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/(function(){var A=["require","exports","vs/github1s/authorizing-github","vs/workbench/workbench.web.api","vs/css!vs/github1s/authorizing-overlay","vs/css!vs/code/browser/workbench/workbench","vs/css!vs/github1s/notification","vs/github1s/notification","vs/github1s/util","vs/github1s/authorizing-overlay","vs/code/browser/workbench/workbench","vs/base/common/uri","vs/base/common/event","vs/base/common/uuid","vs/base/common/cancellation","vs/base/common/buffer","vs/base/common/lifecycle","vs/base/parts/request/browser/request","vs/platform/windows/common/windows","vs/base/common/resources","vs/base/browser/browser","vs/nls!vs/code/browser/workbench/workbench","vs/base/common/network","vs/platform/product/common/product","vs/platform/log/common/log"],_=function(k){for(var a=[],h=0,d=k.length;h<d;h++)a[h]=A[k[h]];return a};define(A[4],_([5]),{}),define(A[6],_([5]),{}),define(A[7],_([0,1,6]),function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.renderNotification=void 0;const h="GITHUB1S_NOTIFICATION",d="20210212",l=`${[{title:"ATTENTION: This page is NOT officially provided by GitHub.",content:"GitHub1s is an open source project, which is not officially provided by GitHub.",link:"https://github.com/conwnet/github1s"}].map(u=>`
		<div class="notification-main">
			<div class="notification-title">${u.title}</div>
			<div class="notification-content">
				${u.content}
				${u.link?`<a class="notification-link" href="${u.link}" target="_blank">See more</a>`:""}
			</div>
		</div>`)}
<div class="notification-footer">
	<button class="notification-confirm-button">OK</button>
	<div class="notification-show-me-again">
		<input type="checkbox" checked>Don't show me again</div>
	</div>
</div>
`,b=()=>{if(!(!window.localStorage||window.localStorage.getItem(h)===d)){const u=document.createElement("div");u.classList.add("github1s-notification"),u.innerHTML=l,document.body.appendChild(u),u.querySelector(".notification-confirm-button").onclick=()=>{!!u.querySelector(".notification-show-me-again input").checked&&window.localStorage.setItem(h,d),document.body.removeChild(u)}}};a.renderNotification=b}),define(A[8],_([0,1]),function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.delegate=a.replaceBrowserUrl=a.getBrowserUrl=void 0;const h=()=>window.location.href;a.getBrowserUrl=h;const d=l=>{window.history.replaceState&&window.history.replaceState(null,"",l)};a.replaceBrowserUrl=d;const w=(l,b,u,S)=>l==null?void 0:l.addEventListener(u,function(n){const o=l.querySelectorAll(b);for(let r=0,c=o.length;r<c;r++)o[r]===n.target&&S.call(this,n)});a.delegate=w}),define(A[2],_([0,1,3]),function(k,a,h){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getGitHubAccessToken=void 0;const w="https://github.com/login/oauth/authorize?scope=repo,user:email&client_id=eae6621348403ea49103",l="directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=520,top=150,left=150",b="https://auth.github1s.com",u=n=>new Promise(o=>setTimeout(o,n)),S=(n=!1)=>{const o=window.open(w,"_blank",l);return new Promise(r=>{let c=!1;!o&&n&&(c=!0,h.commands.executeCommand("github1s.vscode.get-github-access-token-with-overlay").then(E=>r(E)));const v=E=>{var O;E.origin!==b||o&&E.source!==o||((O=E.data)===null||O===void 0?void 0:O.type)!=="authorizing"||c&&!("access_token"in E.data.payload)||(c&&h.commands.executeCommand("github1s.vscode.hide-authorizing-overlay"),window.removeEventListener("message",v),r(E.data.payload))};window.addEventListener("message",v),u(300*1e3).then(()=>{window.removeEventListener("message",v),r({error:"authorizing_timeout",error_description:"Authorizing timeout"})})})};a.getGitHubAccessToken=S}),define(A[9],_([0,1,3,2,4]),function(k,a,h,d){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.hideAuthorizingOverlay=a.getGitHubAccessTokenWithOverlay=a.AuthorizingOverlay=void 0;const w=`
<div class="github1s-authorizing-dialog">
	<div class="close-button"></div>
	<div class="header-title">
		Authenticating to GitHub
	</div>
	<div class="features-description">
		<ul class="feature-list">
			<li class="feature-item">
				<a class="link" href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting" target="_blank">Higher Rate Limit</a>
			</li>
			<li class="feature-item">
				<a class="link" href="https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql" target="_blank">GitHub GraphQL API</a>
			</li>
			<li class="feature-item">
				<a class="link" href="https://docs.github.com/en/graphql/reference/objects#blame" target="_blank">Git Blame Feature</a>
			</li>
		</ul>
	</div>
	<div class="github-documentation">
		Read more about this on
		<a class="link"
			href="https://docs.github.com/en/github/authenticating-to-github"
			target="_blank">
			GitHub Documentation
		</a>
	</div>
	<div class="authorizing-methods">
		<button class="authorizing-button loading">
			<svg class="github-logo" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
				<path fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
				</path>
			</svg>
			<span>Connect to GitHub</span>
		</button>
		<div class="split-line"></div>
		<form class="input-oauth-token-form">
			<input class="input-box" placeholder="\bInput OAuth Token" />
			<button type="submit" class="submit-button loading">Submit</button>
		</form>
		<div class="create-token-link">
			<a class="link" href="https://github.com/settings/tokens/new?scopes=repo&description=GitHub1s" target="_blank">
				Create New OAuth Token
			</a>
		</div>
	</div>
</div>
`;class l{constructor(){this._overlayVisible=!1,this._finishCallback=()=>{}}static getInstance(){return l._instance?l._instance:l._instance=new l}show(){if(this._overlayVisible!==!0)return this._overlayVisible=!0,document.body.classList.add("github1s-overlay-visible"),document.body.appendChild(this.getRootElement()),this.clearAllErrors(),new Promise(n=>this._finishCallback=n)}hide(){if(this._overlayVisible!==!1){this._overlayVisible=!1;const n=this.getDialogElement();n.classList.add("exiting"),setTimeout(()=>{n.classList.remove("exiting"),document.body.classList.remove("github1s-overlay-visible"),document.body.removeChild(this.getRootElement())},180)}}getRootElement(){return this._rootElement||(this._rootElement=this.createElements(),this.registerListeners()),this._rootElement}getDialogElement(){return this.getRootElement().querySelector(".github1s-authorizing-dialog")}createElements(){const n=document.createElement("div");return n.classList.add("github1s-authorizing-mask"),n.innerHTML=w,n}createErrorElement(n,o){const r=document.createElement("div");if(r.classList.add("error-message"),r.innerText=n,o){const c=document.createElement("a");c.setAttribute("href",o),c.setAttribute("target","_blank"),c.classList.add("link"),c.innerText="See more",r.appendChild(c)}return r}clearAllErrors(){var n;(n=this.getDialogElement().querySelectorAll(".error-message"))===null||n===void 0||n.forEach(o=>{var r;(r=o.parentElement)===null||r===void 0||r.removeChild(o)})}setAuthorizingButtonError(n,o){var r;this.clearAllErrors();const c=this.createErrorElement(n,o);(r=this.getDialogElement().querySelector(".authorizing-button"))===null||r===void 0||r.insertAdjacentElement("afterend",c)}async handleClickAuthorizingButton(){const n=await(0,d.getGitHubAccessToken)(!1);return"access_token"in n?(this._finishCallback(n),!0):("error"in n&&this.setAuthorizingButtonError(n.error_description,n.error_uri),!1)}setSubmitTokenError(n,o){var r;this.clearAllErrors();const c=this.createErrorElement(n,o);(r=this.getDialogElement().querySelector(".create-token-link"))===null||r===void 0||r.insertAdjacentElement("afterend",c)}async handleClickSubmitTokenButton(){var n;const o=(n=this.getDialogElement().querySelector(".input-oauth-token-form .input-box"))===null||n===void 0?void 0:n.value;if(!o)return this.setSubmitTokenError("Please input the token"),!1;const r=await h.commands.executeCommand("github1s.validate-token",o,!0);return r.valid?r.remaining<=0?(this.setSubmitTokenError("The token is valid, but it has exceeded the rate limit"),!1):(this._finishCallback({access_token:o}),!0):(this.setSubmitTokenError("The token is invalid"),!1)}registerListeners(){var n;const o=this.getDialogElement();(n=o.querySelector(".close-button"))===null||n===void 0||n.addEventListener("click",()=>{this._finishCallback({error:"user_canceled",error_description:"Authorizing canceled"}),this.hide()});const r=o.querySelector(".authorizing-button");r==null||r.addEventListener("click",async()=>{this.clearAllErrors(),r.setAttribute("disabled","disabled"),await this.handleClickAuthorizingButton()&&this.hide(),r.removeAttribute("disabled")});const c=o.querySelector(".input-oauth-token-form .submit-button");c==null||c.addEventListener("click",async v=>{v.preventDefault(),this.clearAllErrors(),c.setAttribute("disabled","disabled"),await this.handleClickSubmitTokenButton()&&this.hide(),c.removeAttribute("disabled")})}}a.AuthorizingOverlay=l;const b=()=>l.getInstance().show();a.getGitHubAccessTokenWithOverlay=b;const u=()=>l.getInstance().hide();a.hideAuthorizingOverlay=u}),define(A[10],_([0,1,3,11,12,13,14,15,16,17,18,19,20,21,22,23,24,8,7,2,9]),function(k,a,h,d,w,l,b,u,S,n,o,r,c,v,E,O,P,N,$,G,D){"use strict";Object.defineProperty(a,"__esModule",{value:!0});const z=()=>[{id:"github1s.vscode.get-browser-url",handler:N.getBrowserUrl},{id:"github1s.vscode.replace-browser-url",handler:N.replaceBrowserUrl},{id:"github1s.vscode.get-github-access-token",handler:G.getGitHubAccessToken},{id:"github1s.vscode.get-github-access-token-with-overlay",handler:D.getGitHubAccessTokenWithOverlay},{id:"github1s.vscode.hide-authorizing-overlay",handler:D.hideAuthorizingOverlay}];function q(R,t){let e;if(t){let i=0;t.forEach((s,p)=>{e||(e=""),e+=`${i++==0?"":"&"}${p}=${encodeURIComponent(s)}`})}return d.URI.parse(window.location.href).with({path:R,query:e})}class U{constructor(){let t;const e=document.getElementById("vscode-workbench-auth-session"),i=e?e.getAttribute("data-settings"):void 0;if(i)try{t=JSON.parse(i)}catch(s){}t&&(this.setPassword(`${O.default.urlProtocol}.login`,"account",JSON.stringify(t)),this.authService=`${O.default.urlProtocol}-${t.providerId}.login`,this.setPassword(this.authService,"account",JSON.stringify(t.scopes.map(s=>({id:t.id,scopes:s,accessToken:t.accessToken})))))}get credentials(){if(!this._credentials){try{const t=window.localStorage.getItem(U.CREDENTIALS_OPENED_KEY);t&&(this._credentials=JSON.parse(t))}catch(t){}Array.isArray(this._credentials)||(this._credentials=[])}return this._credentials}save(){window.localStorage.setItem(U.CREDENTIALS_OPENED_KEY,JSON.stringify(this.credentials))}async getPassword(t,e){return this.doGetPassword(t,e)}async doGetPassword(t,e){for(const i of this.credentials)if(i.service===t&&(typeof e!="string"||e===i.account))return i.password;return null}async setPassword(t,e,i){this.doDeletePassword(t,e),this.credentials.push({service:t,account:e,password:i}),this.save();try{if(i&&t===this.authService){const s=JSON.parse(i);Array.isArray(s)&&s.length===0&&await this.logout(t)}}catch(s){console.log(s)}}async deletePassword(t,e){const i=await this.doDeletePassword(t,e);if(i&&t===this.authService)try{await this.logout(t)}catch(s){console.log(s)}return i}async doDeletePassword(t,e){let i=!1;return this._credentials=this.credentials.filter(s=>s.service===t&&s.account===e?(i=!0,!1):!0),i&&this.save(),i}async findPassword(t){return this.doGetPassword(t)}async findCredentials(t){return this.credentials.filter(e=>e.service===t).map(({account:e,password:i})=>({account:e,password:i}))}async logout(t){const e=new Map;e.set("logout",String(!0)),e.set("service",t),await(0,n.request)({url:q("/auth/logout",e).toString(!0)},b.CancellationToken.None)}}U.CREDENTIALS_OPENED_KEY="credentials.provider";class f extends S.Disposable{constructor(){super(...arguments);this._onCallback=this._register(new w.Emitter),this.onCallback=this._onCallback.event}create(t){const e=new Map,i=(0,l.generateUuid)();e.set(f.QUERY_KEYS.REQUEST_ID,i);const{scheme:s,authority:p,path:y,query:H,fragment:I}=t||{scheme:void 0,authority:void 0,path:void 0,query:void 0,fragment:void 0};return s&&e.set(f.QUERY_KEYS.SCHEME,s),p&&e.set(f.QUERY_KEYS.AUTHORITY,p),y&&e.set(f.QUERY_KEYS.PATH,y),H&&e.set(f.QUERY_KEYS.QUERY,H),I&&e.set(f.QUERY_KEYS.FRAGMENT,I),this.periodicFetchCallback(i,Date.now()),q("/callback",e)}async periodicFetchCallback(t,e){const i=new Map;i.set(f.QUERY_KEYS.REQUEST_ID,t);const s=await(0,n.request)({url:q("/fetch-callback",i).toString(!0)},b.CancellationToken.None),p=await(0,u.streamToBuffer)(s.stream);if(p.byteLength>0){try{this._onCallback.fire(d.URI.revive(JSON.parse(p.toString())))}catch(y){console.error(y)}return}Date.now()-e<f.FETCH_TIMEOUT&&setTimeout(()=>this.periodicFetchCallback(t,e),f.FETCH_INTERVAL)}}f.FETCH_INTERVAL=500,f.FETCH_TIMEOUT=5*60*1e3,f.QUERY_KEYS={REQUEST_ID:"vscode-requestId",SCHEME:"vscode-scheme",AUTHORITY:"vscode-authority",PATH:"vscode-path",QUERY:"vscode-query",FRAGMENT:"vscode-fragment"};class g{constructor(t,e){this.workspace=t,this.payload=e,this.trusted=!0}async open(t,e){if(!((e==null?void 0:e.reuse)&&!e.payload&&this.isSame(this.workspace,t))){const i=this.createTargetUrl(t,e);i&&((e==null?void 0:e.reuse)?window.location.href=i:c.isStandalone?window.open(i,"_blank","toolbar=no"):window.open(i))}}createTargetUrl(t,e){let i;return t?(0,o.isFolderToOpen)(t)?i=`${document.location.origin}${document.location.pathname}?${g.QUERY_PARAM_FOLDER}=${encodeURIComponent(t.folderUri.toString())}`:(0,o.isWorkspaceToOpen)(t)&&(i=`${document.location.origin}${document.location.pathname}?${g.QUERY_PARAM_WORKSPACE}=${encodeURIComponent(t.workspaceUri.toString())}`):i=`${document.location.origin}${document.location.pathname}?${g.QUERY_PARAM_EMPTY_WINDOW}=true`,(e==null?void 0:e.payload)&&(i+=`&${g.QUERY_PARAM_PAYLOAD}=${encodeURIComponent(JSON.stringify(e.payload))}`),i}isSame(t,e){return!t||!e?t===e:(0,o.isFolderToOpen)(t)&&(0,o.isFolderToOpen)(e)?(0,r.isEqual)(t.folderUri,e.folderUri):(0,o.isWorkspaceToOpen)(t)&&(0,o.isWorkspaceToOpen)(e)?(0,r.isEqual)(t.workspaceUri,e.workspaceUri):!1}hasRemote(){if(this.workspace){if((0,o.isFolderToOpen)(this.workspace))return this.workspace.folderUri.scheme===E.Schemas.vscodeRemote;if((0,o.isWorkspaceToOpen)(this.workspace))return this.workspace.workspaceUri.scheme===E.Schemas.vscodeRemote}return!0}}g.QUERY_PARAM_EMPTY_WINDOW="ew",g.QUERY_PARAM_FOLDER="folder",g.QUERY_PARAM_WORKSPACE="workspace",g.QUERY_PARAM_PAYLOAD="payload";class Q{constructor(t){this.onDidChange=w.Event.None;let e,i;if(t){let s;(0,o.isFolderToOpen)(t)?s=t.folderUri:(0,o.isWorkspaceToOpen)(t)&&(s=t.workspaceUri),(s==null?void 0:s.scheme)==="github1s"&&([e="conwnet",i="github1s"]=d.URI.parse((0,N.getBrowserUrl)()).path.split("/").filter(Boolean))}i&&e?(this.label=(0,v.localize)(0,null,e,i),this.tooltip=(0,v.localize)(1,null,e,i)):(this.label=(0,v.localize)(2,null),this.tooltip=(0,v.localize)(3,null))}}(function(){const R=document.getElementById("vscode-workbench-web-configuration"),t=R?R.getAttribute("data-settings"):void 0;if(!R||!t)throw new Error("Missing web configuration element");const e=JSON.parse(t);Array.isArray(e.staticExtensions)&&e.staticExtensions.forEach(m=>{m.extensionLocation=d.URI.revive(m.extensionLocation)});let i=!1,s,p=Object.create(null),y;new URL(document.location.href).searchParams.forEach((m,T)=>{switch(T){case g.QUERY_PARAM_FOLDER:s={folderUri:d.URI.parse(m)},i=!0;break;case g.QUERY_PARAM_WORKSPACE:s={workspaceUri:d.URI.parse(m)},i=!0;break;case g.QUERY_PARAM_EMPTY_WINDOW:s=void 0,i=!0;break;case g.QUERY_PARAM_PAYLOAD:try{p=JSON.parse(m)}catch(Y){console.error(Y)}break;case"logLevel":y=m;break}}),i||(e.folderUri?s={folderUri:d.URI.revive(e.folderUri)}:e.workspaceUri?s={workspaceUri:d.URI.revive(e.workspaceUri)}:s=void 0);const I=new g(s,p);let M;I.hasRemote()||(M=new Q(s));const F=m=>{let T=`quality=${m}`;new URL(document.location.href).searchParams.forEach((L,C)=>{C!=="quality"&&(T+=`&${C}=${L}`)}),window.location.href=`${window.location.origin}?${T}`},B=e.settingsSyncOptions?{enabled:e.settingsSyncOptions.enabled,enablementHandler:m=>{let T=`settingsSync=${m?"true":"false"}`;new URL(document.location.href).searchParams.forEach((L,C)=>{C!=="settingsSync"&&(T+=`&${C}=${L}`)}),window.location.href=`${window.location.origin}?${T}`}}:void 0;(0,h.create)(document.body,Object.assign(Object.assign({},e),{commands:z(),logLevel:y?(0,P.parseLogLevel)(y):void 0,settingsSyncOptions:B,windowIndicator:M,productQualityChangeHandler:F,workspaceProvider:I,urlCallbackProvider:new f,credentialsProvider:new U})),setTimeout(()=>(0,$.renderNotification)(),1e3)})()})}).call(this);

//# sourceMappingURL=workbench.js.map
