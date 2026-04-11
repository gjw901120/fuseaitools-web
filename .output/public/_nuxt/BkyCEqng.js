import{_ as E,af as U,q as W,r as F,c,o as d,a as s,l as y,t as u,n as x,F as M,k as H}from"./DclqX5_S.js";const R={class:"uploaded-image"},$={class:"form-group"},A={class:"file-upload-area"},N=["id","accept","multiple"],O=["for"],V={class:"upload-content"},K={class:"upload-text"},P={key:0,class:"uploaded-files"},q=["onClick"],D=["src","alt"],G={key:2,class:"preview-overlay"},Y={class:"file-info"},J={class:"file-name"},Q={class:"file-size"},X=["onClick"],Z={key:1,class:"additional-hint"},ee={__name:"UploadImage",props:{inputId:{type:String,default:"image-upload"},label:{type:String,default:"参考图片 (可选)"},uploadIcon:{type:String,default:"fas fa-cloud-upload-alt"},uploadText:{type:String,default:"Click to upload image"},uploadHint:{type:String,default:"Supports .jfif, .jpeg, .jpg, .png, .webp (max 5 images)"},accept:{type:String,default:".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.webp"},multiple:{type:Boolean,default:!0},maxFiles:{type:Number,default:5},maxFileSize:{type:Number,default:10*1024*1024},additionalHint:{type:String,default:""},themeColor:{type:String,default:"#6366f1"}},emits:["update:files","file-added","file-removed"],setup(n,{expose:_,emit:w}){U(t=>({v2edcb2a4:n.themeColor}));const{showError:g}=W(),o=n,p=w,f=F(null),l=F([]),C=t=>{const a=Array.from(t.target.files);a.length>0&&j(a)},j=t=>{const a=[];for(const e of t){if(l.value.length+a.length>=o.maxFiles){g(`You can upload at most ${o.maxFiles} file(s)`);break}if(e.size>o.maxFileSize){g(`File ${e.name} size must not exceed ${b(o.maxFileSize)}`);continue}if(!L(e)){g(`File format of ${e.name} is not supported`);continue}a.push(e)}if(a.length>0){o.multiple?l.value.push(...a):l.value=a;const e=o.multiple?[...l.value]:l.value.length?[l.value[0]]:[];p("update:files",e),p("file-added",a)}},L=t=>o.accept.split(",").map(e=>e.trim()).some(e=>{if(e.startsWith(".")){const i=e.toLowerCase();return t.name.toLowerCase().endsWith(i)}else if(e.endsWith("/*")){const i=e.slice(0,-2);return t.type.startsWith(i)}return t.type===e}),m=t=>t.type.startsWith("image/"),S=t=>URL.createObjectURL(t),I=t=>t.type.startsWith("image/")?"fas fa-image":t.type.startsWith("video/")?"fas fa-video":t.type.startsWith("audio/")?"fas fa-file-audio":"fas fa-file",z=t=>{const a=l.value[t];l.value.splice(t,1);const e=o.multiple?[...l.value]:l.value.length?[l.value[0]]:[];p("update:files",e),p("file-removed",a)},T=()=>{l.value=[],f.value&&(f.value.value=""),p("update:files",[])},b=t=>{if(t===0)return"0 Bytes";const a=1024,e=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(t)/Math.log(a));return parseFloat((t/Math.pow(a,i)).toFixed(2))+" "+e[i]},B=t=>{const a=URL.createObjectURL(t),e=document.createElement("div");e.style.cssText=`
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
  `,r.innerHTML="×",e.appendChild(i),e.appendChild(r),document.body.appendChild(e);const h=()=>{document.body.removeChild(e),URL.revokeObjectURL(a)};e.addEventListener("click",h),r.addEventListener("click",v=>{v.stopPropagation(),h()});const k=v=>{v.key==="Escape"&&(h(),document.removeEventListener("keydown",k))};document.addEventListener("keydown",k)};return _({clearFiles:T,triggerUpload:()=>{var t;return(t=f.value)==null?void 0:t.click()}}),(t,a)=>(d(),c("div",R,[s("div",$,[s("label",null,u(n.label),1),s("div",A,[s("input",{id:n.inputId,ref_key:"fileInput",ref:f,type:"file",onChange:C,accept:n.accept,multiple:n.multiple,class:"file-input"},null,40,N),s("label",{for:n.inputId,class:"file-upload-label"},[s("div",V,[s("i",{class:x(n.uploadIcon)},null,2),s("div",K,[s("span",null,u(n.uploadText),1),s("small",null,u(n.uploadHint),1)])])],8,O)]),l.value.length>0?(d(),c("div",P,[(d(!0),c(M,null,H(l.value,(e,i)=>(d(),c("div",{key:i,class:"file-item"},[s("div",{class:x(["file-preview",{clickable:m(e)}]),onClick:r=>m(e)?B(e):null},[m(e)?(d(),c("img",{key:0,src:S(e),alt:e.name,class:"preview-image"},null,8,D)):(d(),c("i",{key:1,class:x([I(e),"file-icon"])},null,2)),m(e)?(d(),c("div",G,[...a[0]||(a[0]=[s("i",{class:"fas fa-eye"},null,-1)])])):y("",!0)],10,q),s("div",Y,[s("span",J,u(e.name),1),s("span",Q,u(b(e.size)),1)]),s("button",{type:"button",onClick:r=>z(i),class:"remove-file"},[...a[1]||(a[1]=[s("i",{class:"fas fa-times"},null,-1)])],8,X)]))),128))])):y("",!0),n.additionalHint?(d(),c("div",Z,u(n.additionalHint),1)):y("",!0)])]))}},ae=E(ee,[["__scopeId","data-v-70ea66ed"]]);export{ae as U};
