define("ShareToolsModel",[],function(){var e=function(){};return e.prototype={setShareUrl:function(e){if(!e)throw new Error("ShareTools: Share URL must be set");this.shareUrl=e},getShareUrl:function(){return this.shareUrl},setFacebookMessage:function(e){if(!e||!e.title)throw new Error('ShareTools: Facebook message requires a "title"');this.facebookMessage=e},getFacebookMessage:function(){return this.facebookMessage},setTwitterMessage:function(e){if(!e)throw new Error("ShareTools: Twitter message must be set");this.twitterMessage=e},getTwitterMessage:function(){return this.twitterMessage},setEmailMessage:function(e){if(!e||!e.subject||!e.subject)throw new Error('ShareTools: Email message requires a "subject" and a "message`"');this.emailMessage=e},getEmailMessage:function(){return this.emailMessage}},e}),define("text",["module"],function(e){"use strict";var t,n,r,i,s,o=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],u=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,a=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,f=typeof location!="undefined"&&location.href,l=f&&location.protocol&&location.protocol.replace(/\:/,""),c=f&&location.hostname,h=f&&(location.port||undefined),p={},d=e.config&&e.config()||{};t={version:"2.0.12",strip:function(e){if(e){e=e.replace(u,"");var t=e.match(a);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:d.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=o[t];try{e=new ActiveXObject(n)}catch(r){}if(e){o=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,d.isBuild&&(p[e]=r),i(r)},load:function(e,n,r,i){if(i&&i.isBuild&&!i.inlineText){r();return}d.isBuild=i&&i.isBuild;var s=t.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=n.toUrl(o),a=d.useXhr||t.useXhr;if(u.indexOf("empty:")===0){r();return}!f||a(u,l,c,h)?t.get(u,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([o],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(p.hasOwnProperty(n)){var s=t.jsEscape(p[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(d.env==="node"||!d.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node&&!process.versions["node-webkit"])n=require.nodeRequire("fs"),t.get=function(e,t,r){try{var i=n.readFileSync(e,"utf8");i.indexOf("﻿")===0&&(i=i.substring(1)),t(i)}catch(s){r&&r(s)}};else if(d.env==="xhr"||!d.env&&t.createXhr())t.get=function(e,n,r,i){var s=t.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);d.onXhr&&d.onXhr(s,e),s.onreadystatechange=function(t){var i,o;s.readyState===4&&(i=s.status||0,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r&&r(o)):n(s.responseText),d.onXhrComplete&&d.onXhrComplete(s,e))},s.send(null)};else if(d.env==="rhino"||!d.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),r!==null&&n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(d.env==="xpconnect"||!d.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)r=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in r,t.get=function(e,t){var n,o,u,a={};s&&(e=e.replace(/\//g,"\\")),u=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),n.init(u,1,0,!1),o=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),o.init(n,"utf-8",n.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),o.readString(n.available(),a),o.close(),n.close(),t(a.value)}catch(f){throw new Error((u&&u.path||"")+": "+f)}};return t}),define("text!templates/buttons.tmpl",[],function(){return'<div class="share ns__share">\n    <h2 class="share__title"><%= label %></h2>\n    <ul class="share__tools ">\n        <% for ( var i = 0; i < networks.length; i++ ) { %> \n            <li class="share__tool share__tool--<%=networks[i] %>">\n                <a href="#" data-network="<%=networks[i] %>" class="share__tool--network"> \n                    <span><%=networks[i].charAt(0).toUpperCase() + \' \' + networks[i].slice(1) %></span>\n                </a> \n            </li>\n        <% } %>\n    </ul>\n</div>\n'}),define("text!templates/dropdown.tmpl",[],function(){return'<div class="share ns__share-dropdown">\n    <div class="share__button">\n        <div class="share__png_icon"></div>\n        <p><%= label %></p>\n    </div>\n    <span class="share__overlay">\n        <p><%= label %></p>\n        <ul>\n            <% for ( var i = 0; i < networks.length; i++ ) { %>\n                <li class="share__tool share__tool--<%=networks[i] %>">\n                    <a id="<%=networks[i] %>__share-button" data-network="<%=networks[i] %>" class="share__tool--network" href="#">\n                        <span> <i aria-hidden="true" class="gelicon gelicon--<%=networks[i] %>"></i></span>\n                        <%=networks[i].charAt(0).toUpperCase() + networks[i].slice(1) %>\n                    </a>\n                </li>\n            <% } %>\n        </ul>\n        <a href="#" class="share__overlay-close" tabindex="4"></a>\n     </span>\n </div>\n'}),define("templates/templates",["text!templates/buttons.tmpl","text!templates/dropdown.tmpl"],function(e,t){return{buttons:e,dropdown:t}}),define("ShareToolsView",["bootstrap","TemplateEngine","templates/templates"],function(e,t,n){var r=function(e){var t=this;this.controller=e.controller,this.model=e.model,this.label=e.config.label,this.template=n[e.config.template],this.$holderEl=e.config.holderEl;if(!this.template)throw new Error("ShareTools: Template ("+e.template+") not found");this.render(),this.setElSelectors(),this.addListeners()};return r.prototype={render:function(){var n={label:this.label,networks:this.controller.getNetworks()},r=t(this.template,n);this.$el=e.$(r),this.$holderEl.empty(),this.$holderEl.append(this.$el)},setElSelectors:function(){this.$shareButton=this.$el.find(".share__button"),this.$toggleOverlay=this.$el.find(".share__overlay"),this.$closeButton=this.$el.find(".share__overlay-close"),this.$networks=this.$el.find(".share__tool--network")},addListeners:function(){this.$shareButton&&this.$toggleOverlay&&(this.$shareButton.on("click",this.toggleShareOverlay.bind(this)),this.$closeButton.on("click",this.toggleShareOverlay.bind(this))),this.$networks.on("click",this.networkClicked.bind(this))},toggleShareOverlay:function(){this.$toggleOverlay.toggle()},networkClicked:function(e){var t=$(e.currentTarget).data("network");return this.controller.openShareWindow(t),this.$toggleOverlay.toggle(),!1}},r}),define("ShareTools",["ShareToolsModel","ShareToolsView"],function(e,t){var n=function(n){this.options=n,this.model=new e,this.view=new t({model:this.model,controller:this,config:n}),this.init()};return n.prototype={init:function(){this.setMessages(this.options.messages),this.setShareUrl(this.options.shareUrl)},setShareUrl:function(e){this.model.setShareUrl(e)},setMessages:function(e){this.model.setFacebookMessage(e.facebook),this.model.setTwitterMessage(e.twitter),this.model.setEmailMessage(e.email)},openShareWindow:function(e){var t=this.getShareTargetUrl(e),n=this.getNetworkConfig(e);n.popup?window.open(t,"_blank","width=626,height=235"):window.location.href=t},getShareTargetUrl:function(e){var t=this.getNetworkConfig(e),n=this.getNetworkParameters(t),r=this.buildQueryStringFrom(n);return t.shareEndpoint+r},buildQueryStringFrom:function(e){var t="?";for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];t+=n+"="+encodeURIComponent(r)+"&"}return t.slice(0,-1)},getNetworkParameters:function(e){var t=e.staticParameters||{};for(var n in e.dynamicParameters)e.dynamicParameters.hasOwnProperty(n)&&(t[n]=e.dynamicParameters[n]());return t},getNetworkConfigList:function(){var e=this;return[{name:"facebook",shareEndpoint:"https://www.facebook.com/dialog/feed",popup:!0,staticParameters:{app_id:"58567469885",redirect_uri:"http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed",display:"popup",locale:"en_GB"},dynamicParameters:{link:function(){return e.model.getShareUrl()},name:function(){return e.model.getFacebookMessage().title},description:function(){return e.model.getFacebookMessage().description},picture:function(){return e.model.getFacebookMessage().image}}},{name:"twitter",shareEndpoint:"https://twitter.com/intent/tweet",popup:!0,dynamicParameters:{text:function(){return e.model.getTwitterMessage()+" "+e.model.getShareUrl()}}},{name:"email",shareEndpoint:"mailto:",popup:!1,dynamicParameters:{subject:function(){return e.model.getEmailMessage().subject},body:function(){return e.model.getEmailMessage().message+" "+e.model.getShareUrl()}}}]},getNetworkConfig:function(e){var t=this.getNetworkConfigList();for(var n=0;n<t.length;n++){var r=t[n];if(r.name===e)return r}return null},getNetworks:function(){var e=this.getNetworkConfigList(),t=[];for(var n=0;n<e.length;n++)t.push(e[n].name);return t}},n});