(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57be9e12"],{"0508":function(e,t,a){"use strict";a("a1a3")},"0eca":function(e,t,a){},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function l(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,a){var n=l(),r=e-n,s=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=s;var l=Math.easeInOutQuad(c,n,r,t);o(l),c<t?i(e):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&s(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},u=c,d=(a("0508"),a("2877")),f=Object(d["a"])(u,n,r,!1,null,"46986d7b",null);t["a"]=f.exports},"3daf":function(e,t,a){},"5ea9":function(e,t,a){"use strict";a("3daf")},"7ec7":function(e,t,a){"use strict";var n=a("5530");a("159b"),a("b0c0");t["a"]={methods:{filterMenuToTable:function(e,t){var a=this,r=[];return e.forEach((function(i){var o;if(t||i.parentId||"menu"!==i.type)if(t||i.parentId||"directory"!==i.type){if(t&&t.id===i.parentId&&"menu"===i.type){var l=a.filterMenuToTable(e,i);o=Object(n["a"])({},i),o.children=l}else if(t&&t.id===i.parentId&&"directory"===i.type){var s=a.filterMenuToTable(e,i);o=Object(n["a"])({},i),o.children=s}}else{var c=a.filterMenuToTable(e,i);o=Object(n["a"])({},i),o.children=c}else{var u=a.filterMenuToTable(e,i);o=Object(n["a"])({},i),o.children=u}o&&(o.pid=i.id,r.push(o))})),r},filterMenuToTree:function(e,t){var a=this,n=[];return e.forEach((function(r){var i;if(t||r.parentId||"menu"!==r.type)if(t||r.parentId||"directory"!==r.type){if(t&&t.id===r.parentId&&"menu"===r.type)i={label:r.name};else if(t&&t.id===r.parentId&&"directory"===r.type){var o=a.filterMenuToTree(e,r);i={label:r.name},i.children=o}}else{var l=a.filterMenuToTree(e,r);i={label:r.name},i.children=l}else i={label:r.name};i&&(i.id=r.id,n.push(i))})),n}}}},a1a3:function(e,t,a){},b181:function(e,t,a){"use strict";a("c389")},c389:function(e,t,a){},ce8d:function(e,t,a){"use strict";a("0eca")},f982:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sys-role-container"},[a("table-layout",{staticClass:"table-layout",scopedSlots:e._u([{key:"headerLeft",fn:function(){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.handleAdd}},[e._v("新增")]),a("warning-confirm-button",{attrs:{"button-type":"danger",content:"确认批量删除 "+e.tableMultipleSelection.length+" 条数据？",closed:e.handleRefresh},on:{confirm:function(t){e.handleBulkDelete(t)}}},[e._v("批量删除")])]},proxy:!0},{key:"headerRight",fn:function(){return[a("el-input",{staticClass:"search-input",attrs:{size:"mini",placeholder:"请输入角色名称"},model:{value:e.tableSearchParams.name,callback:function(t){e.$set(e.tableSearchParams,"name",t)},expression:"tableSearchParams.name"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search",type:"primary"},on:{click:e.loadTableData},slot:"append"},[e._v("搜索")])],1),a("span",{staticClass:"line"},[e._v("|")]),a("el-button",{attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:e.handleRefresh}}),a("el-button",{attrs:{size:"mini",icon:"el-icon-download"}})]},proxy:!0},{key:"pagination",fn:function(){return[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.tablePagination.total>0,expression:"tablePagination.total>0"}],attrs:{total:e.tablePagination.total,page:e.tablePagination.currentPage,limit:e.tablePagination.pageSize},on:{"update:page":function(t){return e.$set(e.tablePagination,"currentPage",t)},"update:limit":function(t){return e.$set(e.tablePagination,"pageSize",t)},pagination:e.loadTableData}})]},proxy:!0}])},[[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticClass:"has-checkbox",staticStyle:{width:"100%"},attrs:{data:e.tableData,size:"small","header-cell-style":{backgroundColor:"#ebeef4"},border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index",width:"30",fixed:"left"}}),a("el-table-column",{attrs:{type:"selection",align:"center",width:"30"}}),a("el-table-column",{attrs:{prop:"name",label:"名称",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",{staticClass:"link-type",on:{click:function(t){return e.handleEdit(n)}}},[e._v(e._s(n.name))])]}}])}),a("el-table-column",{attrs:{prop:"remark",label:"备注",align:"center"}}),a("el-table-column",{attrs:{prop:"createdAt",label:"创建时间",align:"center",width:"200"}}),a("el-table-column",{attrs:{prop:"updatedAt",label:"更新时间",align:"center",width:"200"}}),a("el-table-column",{attrs:{label:"操作",width:"150",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),a("warning-confirm-button",{attrs:{closed:e.handleRefresh},on:{confirm:function(a){e.handleDelete(t.row,a)}}},[e._v("删除")])]}}])})],1)]],2),a("role-form-dialog",{ref:"formDialog",attrs:{"form-id":e.formId},on:{"save-success":e.handleRefresh},model:{value:e.dialogVisible,callback:function(t){e.dialogVisible=t},expression:"dialogVisible"}})],1)},r=[],i=a("1da1"),o=(a("96cf"),a("b0c0"),a("d81d"),a("2ef0")),l=a.n(o),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,width:"50%","close-on-click-modal":!1,"append-to-body":!0,center:!0,visible:e.visible},on:{"update:visible":function(t){e.visible=t},open:e.open,close:e.close,closed:e.closed}},[a("el-form",{ref:"form",attrs:{"label-position":"right",model:e.form,rules:e.rules}},[a("el-row",[a("el-col",[a("el-form-item",{attrs:{label:"名称","label-width":e.labelWidth,prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1)],1),a("el-form-item",{attrs:{label:"备注","label-width":e.labelWidth,prop:"remark"}},[a("el-input",{attrs:{autocomplete:"off",type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"菜单权限","label-width":e.labelWidth,prop:"powerMenu"}},[a("el-tree",{ref:"treeMenu",staticClass:"role-form-dialog-tree-container",attrs:{"node-key":"id","show-checkbox":!0,"highlight-current":!0,"expand-on-click-node":!1,"default-expand-all":!0,data:e.menus,props:{children:"children",label:"label"}}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"操作权限","label-width":e.labelWidth,prop:"powerOperation"}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("el-button",{attrs:{size:"mini"},on:{click:e.close}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary",loading:e.saving},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)},c=[],u=a("2909"),d=(a("159b"),a("99af"),a("dde5")),f=a("7ec7"),p={components:{},mixins:[f["a"]],model:{prop:"dialogVisible",event:"close"},props:{dialogVisible:{type:Boolean,required:!0},formId:{type:String,default:"-1"}},data:function(){return{labelWidth:"100px",defaultForm:null,form:{id:"",name:"",remark:"",powerMenus:[],powerOperations:[]},rules:{name:[{required:!0,message:"必填",trigger:"blur"}]},loading:!1,saving:!1,menus:[],operations:[]}},computed:{visible:{get:function(){return this.dialogVisible},set:function(){this.$emit("close",!1)}},title:function(){return"-1"===this.form.id?"添加角色":"编辑角色"}},created:function(){this.defaultForm=l.a.cloneDeep(this.form)},destroyed:function(){this.defaultForm=null},methods:{open:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.init();case 2:if("-1"!==e.form.id){t.next=4;break}return t.abrupt("return");case 4:return t.next=6,e.setData();case 6:case"end":return t.stop()}}),t)})))()},init:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.form.id=e.formId,t.next=4,d["k"].getMenuList();case 4:a=t.sent,n=a.data.data,e.menus=e.filterMenuToTree(n,null),t.next=14;break;case 9:t.prev=9,t.t0=t["catch"](0),console.error("role.getMenuList-error:",t.t0),r=t.t0&&t.t0.data.message||"发生了一些未知的错误，请重试！",e.$message.error(r);case 14:case"end":return t.stop()}}),t,null,[[0,9]])})))()},setData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d["n"].getRole({id:e.form.id});case 3:a=t.sent,n=a.data.data,r=n.name,i=n.remark,o=n.systemPowers,e.form.name=r,e.form.remark=i,s=l.a.map(o,"systemMenu"),s&&s.length>0&&s.forEach((function(t){var a=e.$refs.treeMenu.getNode(t.id);console.log(a),a&&a.isLeaf&&e.$refs.treeMenu.setChecked(a,!0)})),t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](0),console.error("role.getRole-error:",t.t0),c=t.t0&&t.t0.data.message||"发生了一些未知的错误，请重试！",e.$message.error(c);case 17:case"end":return t.stop()}}),t,null,[[0,12]])})))()},close:function(){this.visible=!1,this.saving=!1,this.loading=!1,this.clearValidate()},closed:function(){this.form=l.a.cloneDeep(this.defaultForm)},done:function(){this.saving=!1},validate:function(e){this.$refs.form&&this.$refs.form.validate(e)},resetFields:function(){this.$refs.form&&this.$refs.form.resetFields()},clearValidate:function(e){this.$refs.form&&this.$refs.form.clearValidate(e)},submit:function(){var e=this;this.form.powerMenus=this.getTreeMenuCheckedKeys(),this.$refs.form.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var n,r,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=26;break}if(e.saving=!0,n=l.a.cloneDeep(e.form),r=null,t.prev=4,"-1"!==n.id){t.next=11;break}return t.next=8,d["n"].createRole(n);case 8:r=t.sent,t.next=14;break;case 11:return t.next=13,d["n"].updateRole(n);case 13:r=t.sent;case 14:i=r.data.data,console.log(i),e.$emit("save-success"),e.close(),t.next=26;break;case 20:t.prev=20,t.t0=t["catch"](4),console.error("role.submitRole-error:",t.t0),e.done(),o=t.t0&&t.t0.data.message||"发生了一些未知的错误，请重试！",e.$message.error(o);case 26:case"end":return t.stop()}}),t,null,[[4,20]])})));return function(e){return t.apply(this,arguments)}}())},getTreeMenuCheckedKeys:function(){var e=this.$refs.treeMenu.getCheckedKeys(),t=this.$refs.treeMenu.getHalfCheckedKeys();return[].concat(Object(u["a"])(e),Object(u["a"])(t))}}},m=p,h=(a("5ea9"),a("2877")),g=Object(h["a"])(m,s,c,!1,null,"916468ae",null),b=g.exports,v=a("fe2b"),y=a("fbbc"),w=a("333d"),k={name:"SystemRole",components:{TableLayout:y["a"],Pagination:w["a"],WarningConfirmButton:v["a"],roleFormDialog:b},data:function(){return{tableData:[],tableLoading:!1,tablePagination:{total:0,pageSize:10,currentPage:1},tableSearchParams:{name:""},tablePaginationDefault:null,tableSearchParamsDefault:null,tableMultipleSelection:[],dialogVisible:!1,formId:"-1"}},created:function(){this.loadTableData(),this.tablePaginationDefault=l.a.cloneDeep(this.tablePagination),this.tableSearchParamsDefault=l.a.cloneDeep(this.tableSearchParams)},destroyed:function(){this.tablePaginationDefault=null,this.tableSearchParamsDefault=null},methods:{loadTableData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.tableLoading=!0,a=e.tablePagination.currentPage,n=e.tablePagination.pageSize,r=e.tableSearchParams.name,t.prev=4,t.next=7,d["n"].getRoleListByPage({page:a,limit:n,name:r});case 7:i=t.sent,o=i.data.data,e.tableData=o.list,e.tablePagination.total=o.pagination.total,e.tableLoading=!1,t.next=20;break;case 14:t.prev=14,t.t0=t["catch"](4),console.error("role.getRoleListByPage-error:",t.t0),e.tableLoading=!1,l=t.t0&&t.t0.data.message||"发生了一些未知的错误，请重试！",e.$message.error(l);case 20:case"end":return t.stop()}}),t,null,[[4,14]])})))()},handleSelectionChange:function(e){this.tableMultipleSelection=e},handleRefresh:function(){this.tablePagination=l.a.cloneDeep(this.tablePaginationDefault),this.tableSearchParams=l.a.cloneDeep(this.tableSearchParamsDefault),this.loadTableData()},handleAdd:function(){this.formId="-1",this.dialogVisible=!0},handleEdit:function(e){this.formId=e.id,this.dialogVisible=!0},handleDelete:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.done,i=t.close,n.prev=1,n.next=4,d["n"].deleteRole({ids:[e.id]});case 4:i(),n.next=13;break;case 7:n.prev=7,n.t0=n["catch"](1),console.error("role.deleteRole-error:",n.t0),r(),o=n.t0&&n.t0.data.message||"发生了一些未知的错误，请重试！",a.$message.error(o);case 13:case"end":return n.stop()}}),n,null,[[1,7]])})))()},handleBulkDelete:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,r,i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.done,r=e.close,a.prev=1,i=l.a.map(t.tableMultipleSelection,"id"),a.next=5,d["n"].deleteRole({ids:i});case 5:r(),a.next=14;break;case 8:a.prev=8,a.t0=a["catch"](1),console.error("role.deleteRole-error:",a.t0),n(),o=a.t0&&a.t0.data.message||"发生了一些未知的错误，请重试！",t.$message.error(o);case 14:case"end":return a.stop()}}),a,null,[[1,8]])})))()}}},x=k,S=(a("b181"),Object(h["a"])(x,n,r,!1,null,"1fe39ad6",null));t["default"]=S.exports},fbbc:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{style:{border:"none",margin:"20px"}},[a("el-container",{class:{"fixed-height":!e.wrap}},[e.$slots.asside?a("el-aside",{attrs:{width:e.assideWidth}},[e._t("asside")],2):e._e(),a("el-container",[a("el-main",[a("div",{staticClass:"table-container"},[a("div",{staticClass:"table-layout-header"},[a("div",{staticClass:"left"},[e._t("headerLeft")],2),a("div",{staticClass:"right"},[e._t("headerRight")],2)]),a("div",{staticClass:"table-layout-content",class:{"fixed-table-height":!e.wrap}},[e._t("default")],2),e.$slots.pagination?a("div",{staticClass:"table-layout-pagination"},[e._t("pagination")],2):e._e()])])],1)],1)],1)},r=[],i={name:"TableLayout",props:{assideWidth:{type:String,default:"200px"},wrap:{type:Boolean,default:!0}}},o=i,l=(a("ce8d"),a("2877")),s=Object(l["a"])(o,n,r,!1,null,"549c5738",null);t["a"]=s.exports},fe2b:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-button",{attrs:{size:e.size,type:e.buttonType,disabled:e.disabled},on:{click:function(t){return t.stopPropagation(),e._handleClick.apply(null,arguments)}}},[e._t("default")],2)},r=[],i={name:"WarningConfirmButton",props:{content:{type:String,default:"此操作无法恢复，是否继续？"},title:{type:String,default:"警告"},confirmButtonText:{type:String,default:"确定"},cancelButtonText:{type:String,default:"取消"},iconType:{type:String,default:"warning",validator:function(e){return-1!==["success","info","warning","error"].indexOf(e)}},size:{type:String,default:"mini"},buttonType:{type:String,default:"text"},disabled:{type:Boolean,default:!1},closed:{type:Function,default:function(){return function(){}}},cancel:{type:Function,default:function(){return function(){}}}},data:function(){return{loading:!1}},methods:{_handleClick:function(){var e=this;this.$confirm(this.content,this.title,{confirmButtonText:this.confirmButtonText,cancelButtonText:this.cancelButtonText,type:this.iconType,beforeClose:function(t,a,n){"confirm"===t?(a.confirmButtonLoading=!0,e.$emit("confirm",{close:function(){a.confirmButtonLoading=!1,n()},done:function(){console.log(111),a.confirmButtonLoading=!1}})):(a.confirmButtonLoading=!1,n())}}).then((function(t){console.log(222),e.closed()})).catch((function(t){e.cancel()}))}}},o=i,l=a("2877"),s=Object(l["a"])(o,n,r,!1,null,null,null);t["a"]=s.exports}}]);