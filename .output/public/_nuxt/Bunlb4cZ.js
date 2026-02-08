import{_ as T,ad as U,r as k,c,o as d,a as l,l as h,t as u,n as y,F as E,j as W}from"./C0Gp0dND.js";const M={class:"uploaded-image"},H={class:"form-group"},R={class:"file-upload-area"},$=["id","accept","multiple"],A=["for"],N={class:"upload-content"},O={class:"upload-text"},V={key:0,class:"uploaded-files"},K=["onClick"],P=["src","alt"],D={key:2,class:"preview-overlay"},G={class:"file-info"},q={class:"file-name"},J={class:"file-size"},Q=["onClick"],X={key:1,class:"additional-hint"},Y={__name:"UploadImage",props:{inputId:{type:String,default:"image-upload"},label:{type:String,default:"参考图片 (可选)"},uploadIcon:{type:String,default:"fas fa-cloud-upload-alt"},uploadText:{type:String,default:"点击上传图片"},uploadHint:{type:String,default:"支持 .jfif, .jpeg, .jpg, .png, .webp (最多5张)"},accept:{type:String,default:".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.webp"},multiple:{type:Boolean,default:!0},maxFiles:{type:Number,default:5},maxFileSize:{type:Number,default:10*1024*1024},additionalHint:{type:String,default:""},themeColor:{type:String,default:"#6366f1"}},emits:["update:files","file-added","file-removed"],setup(n,{expose:F,emit:_}){U(t=>({v6008fe80:n.themeColor}));const o=n,p=_,f=k(null),s=k([]),w=t=>{const a=Array.from(t.target.files);a.length>0&&C(a)},C=t=>{const a=[];for(const e of t){if(s.value.length+a.length>=o.maxFiles){alert(`最多只能上传 ${o.maxFiles} 个文件`);break}if(e.size>o.maxFileSize){alert(`文件 ${e.name} 大小不能超过 ${x(o.maxFileSize)}`);continue}if(!j(e)){alert(`文件 ${e.name} 格式不支持`);continue}a.push(e)}if(a.length>0){o.multiple?s.value.push(...a):s.value=a;const e=o.multiple?[...s.value]:s.value.length?[s.value[0]]:[];p("update:files",e),p("file-added",a)}},j=t=>o.accept.split(",").map(e=>e.trim()).some(e=>{if(e.startsWith(".")){const i=e.toLowerCase();return t.name.toLowerCase().endsWith(i)}else if(e.endsWith("/*")){const i=e.slice(0,-2);return t.type.startsWith(i)}return t.type===e}),m=t=>t.type.startsWith("image/"),L=t=>URL.createObjectURL(t),I=t=>t.type.startsWith("image/")?"fas fa-image":t.type.startsWith("video/")?"fas fa-video":t.type.startsWith("audio/")?"fas fa-file-audio":"fas fa-file",S=t=>{const a=s.value[t];s.value.splice(t,1);const e=o.multiple?[...s.value]:s.value.length?[s.value[0]]:[];p("update:files",e),p("file-removed",a)},z=()=>{s.value=[],f.value&&(f.value.value=""),p("update:files",[])},x=t=>{if(t===0)return"0 Bytes";const a=1024,e=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,i)).toFixed(2))+" "+e[i]},B=t=>{const a=URL.createObjectURL(t),e=document.createElement("div");e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;const i=document.createElement("img");i.src=a,i.style.cssText=`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  `;const r=document.createElement("div");r.style.cssText=`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: #333;
  `,r.innerHTML="×",e.appendChild(i),e.appendChild(r),document.body.appendChild(e);const g=()=>{document.body.removeChild(e),URL.revokeObjectURL(a)};e.addEventListener("click",g),r.addEventListener("click",v=>{v.stopPropagation(),g()});const b=v=>{v.key==="Escape"&&(g(),document.removeEventListener("keydown",b))};document.addEventListener("keydown",b)};return F({clearFiles:z,triggerUpload:()=>{var t;return(t=f.value)==null?void 0:t.click()}}),(t,a)=>(d(),c("div",M,[l("div",H,[l("label",null,u(n.label),1),l("div",R,[l("input",{id:n.inputId,ref_key:"fileInput",ref:f,type:"file",onChange:w,accept:n.accept,multiple:n.multiple,class:"file-input"},null,40,$),l("label",{for:n.inputId,class:"file-upload-label"},[l("div",N,[l("i",{class:y(n.uploadIcon)},null,2),l("div",O,[l("span",null,u(n.uploadText),1),l("small",null,u(n.uploadHint),1)])])],8,A)]),s.value.length>0?(d(),c("div",V,[(d(!0),c(E,null,W(s.value,(e,i)=>(d(),c("div",{key:i,class:"file-item"},[l("div",{class:y(["file-preview",{clickable:m(e)}]),onClick:r=>m(e)?B(e):null},[m(e)?(d(),c("img",{key:0,src:L(e),alt:e.name,class:"preview-image"},null,8,P)):(d(),c("i",{key:1,class:y([I(e),"file-icon"])},null,2)),m(e)?(d(),c("div",D,[...a[0]||(a[0]=[l("i",{class:"fas fa-eye"},null,-1)])])):h("",!0)],10,K),l("div",G,[l("span",q,u(e.name),1),l("span",J,u(x(e.size)),1)]),l("button",{type:"button",onClick:r=>S(i),class:"remove-file"},[...a[1]||(a[1]=[l("i",{class:"fas fa-times"},null,-1)])],8,Q)]))),128))])):h("",!0),n.additionalHint?(d(),c("div",X,u(n.additionalHint),1)):h("",!0)])]))}},ee=T(Y,[["__scopeId","data-v-3fbc44ea"]]);export{ee as U};
