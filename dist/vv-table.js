!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("vue")):"function"==typeof define&&define.amd?define("vv-table",["vue"],n):"object"==typeof exports?exports["vv-table"]=n(require("vue")):e["vv-table"]=n(e.vue)}(window,(function(e){return function(e){var n={};function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(i,r,function(n){return e[n]}.bind(null,r));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=4)}([function(e,n,t){var i=t(3);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,t(5).default)("6a5292eb",i,!0,{})},function(n,t){n.exports=e},function(e,n,t){"use strict";var i=t(0);t.n(i).a},function(e,n){e.exports="\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ntable.vv-table {\n    border-spacing: 0;\n    vertical-align: baseline;\n}\n    table.vv-table thead tr th {\n                border-bottom: 1px #cccccc solid;\n                border-right: 1px #dddddd solid;\n}\n    table.vv-table thead tr th:first-child, table.vv-table thead tr th:last-child {\n                    padding: 0 !important;\n                    width: 0 !important;\n}\n    table.vv-table thead tr th:nth-last-child(1) {\n                    border-right: none;\n}\n    table.vv-table thead tr th p {\n                    padding: 0;\n                    margin: 0;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    text-transform: uppercase;\n}\n    table.vv-table thead tr th button {\n                    border: none;\n                    background: transparent;\n                    width: 2em;\n}\n    table.vv-table tr {\n        background-color: #ededed;\n}\n    table.vv-table tr:nth-child(even) {\n            background-color: #dddddd;\n}\n    table.vv-table tr .cell {\n            padding: 0.125em 0.25em;\n}\n    table.vv-table tr .cell > input {\n                width: 100%;\n                border: none;\n                padding: 0.3em;\n}\n    table.vv-table tr .cell--value > button {\n                border: none;\n                opacity: 0.2;\n}\n    table.vv-table tr .new-row button {\n                border: none;\n                background: transparent;\n                width: 100%;\n}\n    table.vv-table tr > td:first-child {\n            text-align: center;\n}\n    table.vv-table .light {\n        color: #dddddd;\n}\n"},function(e,n,t){"use strict";t.r(n);var i=t(1),r=t.n(i);let s={},a=null;var o=r.a.directive("v-dd",{inserted:(e,n,t)=>{const i=n.value,r=+new Date+"";e.setAttribute("draggable",!0),e.addEventListener("dragstart",e=>{a=r,s[r]={dragData:i,onDropCallback:null},e.dataTransfer.setData("text",r),e.dataTransfer.effectAllowed="move",e.dataTransfer.dropEffect="move"},!1),e.addEventListener("dragend",e=>{if(a=null,s[r]){if("function"==typeof s[r].onDropCallback){const e=s[r].onDropCallback;setTimeout(()=>e(),0)}delete s[r]}},!1),e.addEventListener("dragover",e=>{e.preventDefault()},!1),e.addEventListener("drop",e=>{e.stopPropagation(),e.preventDefault();const n=e.dataTransfer.getData("text"),{dragData:i}=s[n];let r;e.target.childNodes&&(r=e.target.childNodes[0].data),t.data.on["dd-drop"](i,r,e)},!1)}});function l(e,n,t,i,r,s,a,o){var l,d="function"==typeof e?e.options:e;if(n&&(d.render=n,d.staticRenderFns=t,d._compiled=!0),i&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},d._ssrRegister=l):r&&(l=o?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(e,n){return l.call(n),c(e,n)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:d}}var d=l({directives:{dd:o},props:{sortBy:{required:!1,type:Function},name:{required:!0,type:String}},computed:{canSort(){return"function"==typeof this.sortBy}},data:()=>({startPos:{x:0},canDrag:!1}),methods:{onRelease(e){this.evalAction(e),this.startPos.x=0},evalAction(e,n){Math.abs(e.clientX-this.startPos.x)<10&&this.canSort&&this.sortBy(this.name)}}},(function(){var e=this.$createElement;return(this._self._c||e)("th",{directives:[{name:"dd",rawName:"v-dd",value:{name:this.name},expression:"{ name }"}],staticClass:"cell"},[this._t("default")],2)}),[],!1,null,null,null).exports,c=l({},(function(){var e=this.$createElement;return(this._self._c||e)("tr",{staticClass:"row"},[this._t("default")],2)}),[],!1,null,null,null).exports,u={directives:{hilite:r.a.directive("v-hilite",{inserted:e=>{e["v-hilite"]=e.value},update:e=>{if("none"===e.style.display)return;const n=e["v-hilite"].length;n+1===e.value.length||n-1===e.value.length||(e.value.length-1==0?e["v-hilite"]=e.value:(e.focus(),e.select())),e["v-hilite"]=e.value}}),dd:o},components:{"vv-th":d,"vv-row":c},props:{entries:{type:Array,required:!0},hide:{type:Array,required:!1},icons:{type:Object,required:!1},canEdit:{type:Boolean,required:!1}},data:()=>({activeColumns:[],entriesByRow:[],direction:{},dragging:"",selectedRows:[],inEdit:!1,editValue:""}),computed:{entriesByCol(){return this.activeColumns.reduce((e,n)=>(e[n]=this.entriesByRow.map(e=>e[n]),e),{})}},methods:{sendEdit(e){if(this.editValue){const n=this.entries[e[0]];this.$emit("editted",[n,e[1],e[2]]),this.inEdit=!1,this.editValue=""}},setEdit(e,n){this.canEdit&&(this.editValue=n,this.inEdit=e)},onDrop(e,n,t){const i=this.activeColumns.indexOf(e.name),r=this.activeColumns.indexOf(n);this.activeColumns.splice(i,1),this.activeColumns.splice(r,0,e.name)},selectAll(){this.selectedRows.length===this.entriesByRow.length?this.selectedRows=[]:this.selectedRows=this.entriesByRow.reduce((e,n,t)=>(e.push(t),e),[])},addRow(){const e=this.activeColumns.reduce((e,n)=>(e[n]=""+n,e),{});this.entriesByRow.push(e)},sortByDefault(e){const n=this.entriesByRow.sort((n,t)=>n[e]<t[e]?-1:n[e]>t[e]?1:0),t=Object.keys(this.direction)[0]!==e;"▲"===this.direction[e]?(n.reverse(),t&&(this.direction={}),this.direction[e]="▼"):(t&&(this.direction={}),this.direction[e]="▲")},setEntries(){this.entriesByRow=this.entries.map(e=>this.activeColumns.reduce((n,t)=>(n[t]=e[t],n),{}))},setActiveColumns(){this.activeColumns=Object.keys(this.entries[0]),this.hide&&this.hide.forEach(e=>{this.activeColumns.indexOf(e)>=0&&this.activeColumns.splice(this.activeColumns.indexOf(e),1)})}},created(){console.warn("vv-table: using local component"),this.setActiveColumns(),this.setEntries()},watch:{entries(){console.warn("vv-table: updated entries"),this.$forceUpdate()},hide:function(){this.hide&&this.hide.forEach(e=>{this.activeColumns.indexOf(e)>=0&&this.activeColumns.splice(this.activeColumns.indexOf(e),1)})}}},v=(t(2),l(u,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("table",{staticClass:"vv-table local"},[t("thead",[t("vv-row",[t("th",[t("button",{on:{click:e.selectAll}},[e._v("✔")])]),e._l(e.activeColumns,(function(n,i){return t("th",{directives:[{name:"dd",rawName:"v-dd",value:{name:n},expression:"{ name }"}],key:n+"-"+i,on:{click:function(t){return e.sortByDefault(n)},"dd-drop":e.onDrop}},[t("div",{staticClass:"colname",on:{"dd-drop":e.onDrop}},[e.icons[n]?t("p",[e._v(e._s(e.icons[n]+" ")),t("span",[e._v(" "+e._s(n))]),Object.keys(e.direction).indexOf(n)>=0?t("span",[e._v(" "+e._s(e.direction[n]))]):t("span",{staticClass:"light"},[e._v(" ▼")])]):t("p",[e._v(e._s(n)),Object.keys(e.direction).indexOf(n)>=0?t("span",[e._v(" "+e._s(e.direction[n]))]):t("span",{staticClass:"light"},[e._v(" ▼")])])])])})),t("th",[t("button",{on:{click:e.selectAll}},[e._v("+")])])],2)],1),t("tbody",[e._l(e.entriesByRow,(function(n,i){return t("vv-row",{key:"row-"+i,class:"row-"+i},[t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedRows,expression:"selectedRows"}],attrs:{type:"checkbox"},domProps:{value:i,checked:Array.isArray(e.selectedRows)?e._i(e.selectedRows,i)>-1:e.selectedRows},on:{change:function(n){var t=e.selectedRows,r=n.target,s=!!r.checked;if(Array.isArray(t)){var a=i,o=e._i(t,a);r.checked?o<0&&(e.selectedRows=t.concat([a])):o>-1&&(e.selectedRows=t.slice(0,o).concat(t.slice(o+1)))}else e.selectedRows=s}}})]),e._l(e.activeColumns,(function(r,s){return t("td",{key:r+"-"+s,staticClass:"cell",class:"row-"+i+"--cell-"+s},[t("div",{directives:[{name:"show",rawName:"v-show",value:r+"-"+n[r]+"-row-"+i!==e.inEdit,expression:"`${n}-${row[n]}-row-${i}` !== inEdit"}],staticClass:"cell--value"},[t("label",{on:{dblclick:function(t){return e.setEdit(r+"-"+n[r]+"-row-"+i,n[r])}}},[e._v(e._s(n[r]))]),""==n[r]&&e.canEdit?t("button",{on:{click:function(t){return e.setEdit(r+"-"+n[r]+"-row-"+i,n[r])}}},[e._v("add")]):e._e()]),t("input",{directives:[{name:"show",rawName:"v-show",value:r+"-"+n[r]+"-row-"+i===e.inEdit&&e.canEdit,expression:"`${n}-${row[n]}-row-${i}` === inEdit && canEdit"},{name:"model",rawName:"v-model",value:e.editValue,expression:"editValue"},{name:"hilite",rawName:"v-hilite"}],staticClass:"cell--edit",domProps:{value:e.editValue},on:{blur:function(n){return e.sendEdit([i,r,e.editValue])},keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.sendEdit([i,r,e.editValue])},input:function(n){n.target.composing||(e.editValue=n.target.value)}}})])})),t("td")],2)})),t("tr",[t("td",{staticClass:"new-row",attrs:{colspan:e.activeColumns.length+1}},[t("button",{on:{click:e.addRow}},[e._v("+")])]),t("td",[t("p",[e._v(e._s(e.editValue))])])])],2)])}),[],!1,null,null,null));n.default=v.exports},function(e,n,t){"use strict";function i(e,n){for(var t=[],i={},r=0;r<n.length;r++){var s=n[r],a=s[0],o={id:e+":"+r,css:s[1],media:s[2],sourceMap:s[3]};i[a]?i[a].parts.push(o):t.push(i[a]={id:a,parts:[o]})}return t}t.r(n),t.d(n,"default",(function(){return h}));var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},a=r&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,d=!1,c=function(){},u=null,v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,n,t,r){d=t,u=r||{};var a=i(e,n);return p(a),function(n){for(var t=[],r=0;r<a.length;r++){var o=a[r];(l=s[o.id]).refs--,t.push(l)}n?p(a=i(e,n)):a=[];for(r=0;r<t.length;r++){var l;if(0===(l=t[r]).refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete s[l.id]}}}}function p(e){for(var n=0;n<e.length;n++){var t=e[n],i=s[t.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](t.parts[r]);for(;r<t.parts.length;r++)i.parts.push(m(t.parts[r]));i.parts.length>t.parts.length&&(i.parts.length=t.parts.length)}else{var a=[];for(r=0;r<t.parts.length;r++)a.push(m(t.parts[r]));s[t.id]={id:t.id,refs:1,parts:a}}}}function f(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function m(e){var n,t,i=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(i){if(d)return c;i.parentNode.removeChild(i)}if(v){var r=l++;i=o||(o=f()),n=g.bind(null,i,r,!1),t=g.bind(null,i,r,!0)}else i=f(),n=w.bind(null,i),t=function(){i.parentNode.removeChild(i)};return n(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;n(e=i)}else t()}}var b,y=(b=[],function(e,n){return b[e]=n,b.filter(Boolean).join("\n")});function g(e,n,t,i){var r=t?"":i.css;if(e.styleSheet)e.styleSheet.cssText=y(n,r);else{var s=document.createTextNode(r),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(s,a[n]):e.appendChild(s)}}function w(e,n){var t=n.css,i=n.media,r=n.sourceMap;if(i&&e.setAttribute("media",i),u.ssrId&&e.setAttribute("data-vue-ssr-id",n.id),r&&(t+="\n/*# sourceURL="+r.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}])}));