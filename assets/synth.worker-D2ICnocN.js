const Op=Symbol("Comlink.proxy"),rw=Symbol("Comlink.endpoint"),aw=Symbol("Comlink.releaseProxy"),ia=Symbol("Comlink.finalizer"),mr=Symbol("Comlink.thrown"),Rp=e=>typeof e=="object"&&e!==null||typeof e=="function",sw={canHandle:e=>Rp(e)&&e[Op],serialize(e){const{port1:t,port2:n}=new MessageChannel;return Rs(e,t),[n,[n]]},deserialize(e){return e.start(),lw(e)}},iw={canHandle:e=>Rp(e)&&mr in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},Bp=new Map([["proxy",sw],["throw",iw]]);function ow(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function Rs(e,t=globalThis,n=["*"]){t.addEventListener("message",function r(a){if(!a||!a.data)return;if(!ow(n,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:s,type:i,path:o}=Object.assign({path:[]},a.data),l=(a.data.argumentList||[]).map(Lt);let d;try{const p=o.slice(0,-1).reduce((m,y)=>m[y],e),h=o.reduce((m,y)=>m[y],e);switch(i){case"GET":d=h;break;case"SET":p[o.slice(-1)[0]]=Lt(a.data.value),d=!0;break;case"APPLY":d=h.apply(p,l);break;case"CONSTRUCT":{const m=new h(...l);d=fw(m)}break;case"ENDPOINT":{const{port1:m,port2:y}=new MessageChannel;Rs(e,y),d=hw(m,[m])}break;case"RELEASE":d=void 0;break;default:return}}catch(p){d={value:p,[mr]:0}}Promise.resolve(d).catch(p=>({value:p,[mr]:0})).then(p=>{const[h,m]=br(p);t.postMessage(Object.assign(Object.assign({},h),{id:s}),m),i==="RELEASE"&&(t.removeEventListener("message",r),Np(t),ia in e&&typeof e[ia]=="function"&&e[ia]())}).catch(p=>{const[h,m]=br({value:new TypeError("Unserializable return value"),[mr]:0});t.postMessage(Object.assign(Object.assign({},h),{id:s}),m)})}),t.start&&t.start()}function uw(e){return e.constructor.name==="MessagePort"}function Np(e){uw(e)&&e.close()}function lw(e,t){const n=new Map;return e.addEventListener("message",function(a){const{data:s}=a;if(!s||!s.id)return;const i=n.get(s.id);if(i)try{i(s)}finally{n.delete(s.id)}}),ps(e,n,[],t)}function er(e){if(e)throw new Error("Proxy has been released and is not useable")}function Mp(e){return nn(e,new Map,{type:"RELEASE"}).then(()=>{Np(e)})}const wr=new WeakMap,_r="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(wr.get(e)||0)-1;wr.set(e,t),t===0&&Mp(e)});function dw(e,t){const n=(wr.get(t)||0)+1;wr.set(t,n),_r&&_r.register(e,t,e)}function cw(e){_r&&_r.unregister(e)}function ps(e,t,n=[],r=function(){}){let a=!1;const s=new Proxy(r,{get(i,o){if(er(a),o===aw)return()=>{cw(s),Mp(e),t.clear(),a=!0};if(o==="then"){if(n.length===0)return{then:()=>s};const l=nn(e,t,{type:"GET",path:n.map(d=>d.toString())}).then(Lt);return l.then.bind(l)}return ps(e,t,[...n,o])},set(i,o,l){er(a);const[d,p]=br(l);return nn(e,t,{type:"SET",path:[...n,o].map(h=>h.toString()),value:d},p).then(Lt)},apply(i,o,l){er(a);const d=n[n.length-1];if(d===rw)return nn(e,t,{type:"ENDPOINT"}).then(Lt);if(d==="bind")return ps(e,t,n.slice(0,-1));const[p,h]=du(l);return nn(e,t,{type:"APPLY",path:n.map(m=>m.toString()),argumentList:p},h).then(Lt)},construct(i,o){er(a);const[l,d]=du(o);return nn(e,t,{type:"CONSTRUCT",path:n.map(p=>p.toString()),argumentList:l},d).then(Lt)}});return dw(s,e),s}function pw(e){return Array.prototype.concat.apply([],e)}function du(e){const t=e.map(br);return[t.map(n=>n[0]),pw(t.map(n=>n[1]))]}const Dp=new WeakMap;function hw(e,t){return Dp.set(e,t),e}function fw(e){return Object.assign(e,{[Op]:!0})}function br(e){for(const[t,n]of Bp)if(n.canHandle(e)){const[r,a]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},a]}return[{type:"RAW",value:e},Dp.get(e)||[]]}function Lt(e){switch(e.type){case"HANDLER":return Bp.get(e.name).deserialize(e.value);case"RAW":return e.value}}function nn(e,t,n,r){return new Promise(a=>{const s=mw();t.set(s,a),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),r)})}function mw(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Bs=Object.defineProperty,gw=Object.getOwnPropertyDescriptor,yw=Object.getOwnPropertyNames,ww=Object.prototype.hasOwnProperty,_w=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t)=>()=>(e&&(t=e(e=0)),t),dn=(e,t)=>{for(var n in t)Bs(e,n,{get:t[n],enumerable:!0})},bw=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of yw(t))!ww.call(e,a)&&a!==n&&Bs(e,a,{get:()=>t[a],enumerable:!(r=gw(t,a))||r.enumerable});return e},Nn=e=>bw(Bs({},"__esModule",{value:!0}),e),gn,xt,rn,cu,Pp,Up=L(()=>{gn=new Map,xt=[],rn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=gn.get(e);if(r===void 0)gn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let a=xt.indexOf(e);a!==-1&&xt.splice(a,1);for(let s=0;s<xt.length;s++)if(gn.get(xt[s]).priority<=n){xt.splice(s,0,e);return}xt.push(e)}return}throw new TypeError("not a valid backend")},cu=async e=>{let t=gn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Pp=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?xt:n,a,s=[],i=new Set;for(let l of r){let d=await cu(l);typeof d=="string"?s.push({name:l,err:d}):(a||(a=d),a===d&&i.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of s)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>i.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),vw=L(()=>{Up()}),Lp,$w=L(()=>{Lp="1.27.0"}),oa,Ce,Vp=L(()=>{$w(),oa="warning",Ce={wasm:{},webgl:{},webgpu:{},versions:{common:Lp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);oa=e}},get logLevel(){return oa}},Object.defineProperty(Ce,"logLevel",{enumerable:!0})}),be,xw=L(()=>{Vp(),be=Ce}),qp,Wp,kw=L(()=>{qp=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let i=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let p=s*a,h=0,m=p,y=p*2,w=-1;i==="RGBA"?(h=0,m=p,y=p*2,w=p*3):i==="RGB"?(h=0,m=p,y=p*2):i==="RBG"&&(h=0,y=p,m=p*2);for(let _=0;_<s;_++)for(let k=0;k<a;k++){let $=(e.data[h++]-d[0])*l[0],b=(e.data[m++]-d[1])*l[1],E=(e.data[y++]-d[2])*l[2],S=w===-1?255:(e.data[w++]-d[3])*l[3];r.fillStyle="rgba("+$+","+b+","+E+","+S+")",r.fillRect(k,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Wp=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let a,s,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],i=e.dims[3]):(a=e.dims[3],s=e.dims[2],i=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let h=s*a;if(t!==void 0&&(t.format!==void 0&&i===4&&t.format!=="RGBA"||i===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,y=0,w=1,_=2,k=3,$=0,b=h,E=h*2,S=-1;o==="RGBA"?($=0,b=h,E=h*2,S=h*3):o==="RGB"?($=0,b=h,E=h*2):o==="RBG"&&($=0,E=h,b=h*2),r=n.createImageData(a,s);for(let I=0;I<s*a;y+=m,w+=m,_+=m,k+=m,I++)r.data[y]=(e.data[$++]-p[0])*d[0],r.data[w]=(e.data[b++]-p[1])*d[1],r.data[_]=(e.data[E++]-p[2])*d[2],r.data[k]=S===-1?255:(e.data[S++]-p[3])*d[3]}else throw new Error("Can not access image data");return r}}),tr,Fp,Gp,Hp,jp,Kp,Sw=L(()=>{Ns(),tr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,a=t.norm??{mean:255,bias:0},s,i;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?i=[a.bias,a.bias,a.bias,a.bias]:i=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*r,p=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),h=4,m=0,y=1,w=2,_=3,k=0,$=d,b=d*2,E=-1;o==="RGB"&&(h=3,m=0,y=1,w=2,_=-1),l==="RGBA"?E=d*3:l==="RBG"?(k=0,b=d,$=d*2):l==="BGR"&&(b=0,$=d,k=d*2);for(let S=0;S<d;S++,m+=h,w+=h,y+=h,_+=h)p[k++]=(e[m]+i[0])/s[0],p[$++]=(e[y]+i[1])/s[1],p[b++]=(e[w]+i[2])/s[2],E!==-1&&_!==-1&&(p[E++]=(e[_]+i[3])/s[3]);return l==="RGBA"?new Le("float32",p,[1,4,n,r]):new Le("float32",p,[1,3,n,r])},Fp=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",i,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(n){let p=l();p.width=e.width,p.height=e.height;let h=d(p);if(h!=null){let m=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=m,o.width=y}else o.tensorFormat="RGBA",o.height=m,o.width=y;h.drawImage(e,0,0),i=h.getImageData(0,0,y,m).data}else throw new Error("Can not access image data")}else if(r){let p,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,h=t.resizedWidth):(p=e.height,h=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=p,o.width=h,t!==void 0){let m=l();m.width=h,m.height=p;let y=d(m);if(y!=null)y.putImageData(e,0,0),i=y.getImageData(0,0,h,p).data;else throw new Error("Can not access image data")}else i=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=l();p.width=e.width,p.height=e.height;let h=d(p);if(h!=null){let m=e.height,y=e.width;return h.drawImage(e,0,0,y,m),i=h.getImageData(0,0,y,m).data,o.height=m,o.width=y,tr(i,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((p,h)=>{let m=l(),y=d(m);if(!e||!y)return h();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{m.width=w.width,m.height=w.height,y.drawImage(w,0,0,m.width,m.height);let _=y.getImageData(0,0,m.width,m.height);o.height=m.height,o.width=m.width,p(tr(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(i!==void 0)return tr(i,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Gp=(e,t)=>{let{width:n,height:r,download:a,dispose:s}=t,i=[1,r,n,4];return new Le({location:"texture",type:"float32",texture:e,dims:i,download:a,dispose:s})},Hp=(e,t)=>{let{dataType:n,dims:r,download:a,dispose:s}=t;return new Le({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:a,dispose:s})},jp=(e,t)=>{let{dataType:n,dims:r,download:a,dispose:s}=t;return new Le({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:a,dispose:s})},Kp=(e,t,n)=>new Le({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),Vt,In,ua,Xp,Ew=L(()=>{Vt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),In=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ua=!1,Xp=()=>{if(!ua){ua=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(Vt.set("int64",BigInt64Array),In.set(BigInt64Array,"int64")),t&&(Vt.set("uint64",BigUint64Array),In.set(BigUint64Array,"uint64")),r?(Vt.set("float16",n),In.set(n,"float16")):Vt.set("float16",Uint16Array)}}}),Yp,Qp,Tw=L(()=>{Ns(),Yp=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Qp=(e,t)=>{switch(e.location){case"cpu":return new Le(e.type,e.data,t);case"cpu-pinned":return new Le({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Le({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Le({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Le({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Le,Ns=L(()=>{kw(),Sw(),Ew(),Tw(),Le=class{constructor(e,t,n){Xp();let r,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,a=e.dims,e.location){case"cpu-pinned":{let i=Vt.get(r);if(!i)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof i))throw new TypeError(`buffer should be of type ${i.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let i,o;if(typeof e=="string")if(r=e,o=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");i=t}else{let l=Vt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?i=l.from(t,BigInt):i=l.from(t)}else if(t instanceof l)i=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")i=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)i=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",i=e;else if(l==="boolean")r="bool",i=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",i=Uint8Array.from(e);else{let l=In.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,i=e}if(o===void 0)o=[i.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=i,this.dataLocation="cpu"}let s=Yp(a);if(this.cpuData&&s!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=a,this.size=s}static async fromImage(e,t){return Fp(e,t)}static fromTexture(e,t){return Gp(e,t)}static fromGpuBuffer(e,t){return Hp(e,t)}static fromMLTensor(e,t){return jp(e,t)}static fromPinnedBuffer(e,t,n){return Kp(e,t,n)}toDataURL(e){return qp(this,e)}toImageData(e){return Wp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Qp(this,e)}}}),Ge,Zp=L(()=>{Ns(),Ge=Le}),vr,la,ct,tt,Gt,Ht,Jp=L(()=>{Vp(),vr=(e,t)=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeStamp(`${e}::ORT::${t}`)},la=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),vr("CPU",s);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},ct=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||la("BEGIN",e)},tt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||la("END",e)},Gt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.time(`ORT::${e}`)},Ht=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeEnd(`ORT::${e}`)}}),eh,Iw=L(()=>{Up(),Zp(),Jp(),eh=class th{constructor(t){this.handler=t}async run(t,n,r){ct(),Gt("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let i=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");i=!1;for(let d of n){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,p=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(p.indexOf(h)!==-1){let m=n[h];(m===null||m instanceof Ge)&&(d=!0,i=!1,a[h]=m)}if(d){if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else s=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(i)for(let d of this.outputNames)a[d]=null;let o=await this.handler.run(t,a,s),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let p=o[d];p instanceof Ge?l[d]=p:l[d]=new Ge(p.type,p.data,p.dims)}return Ht("InferenceSession.run"),tt(),l}async release(){return this.handler.dispose()}static async create(t,n,r,a){ct(),Gt("InferenceSession.create");let s,i={};if(typeof t=="string"){if(s=t,typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,h=0,m=t.byteLength;if(typeof n=="object"&&n!==null)i=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(m=t.byteLength-h,typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||h+m>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-h}].`);if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(p,h,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await Pp(i),d=await o.createInferenceSessionHandler(s,l);return Ht("InferenceSession.create"),tt(),new th(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ms,Cw=L(()=>{Iw(),Ms=eh}),Aw=L(()=>{}),zw=L(()=>{}),Ow=L(()=>{}),Rw=L(()=>{}),Bw={};dn(Bw,{InferenceSession:()=>Ms,TRACE:()=>vr,TRACE_EVENT_BEGIN:()=>Gt,TRACE_EVENT_END:()=>Ht,TRACE_FUNC_BEGIN:()=>ct,TRACE_FUNC_END:()=>tt,Tensor:()=>Ge,env:()=>be,registerBackend:()=>rn});var He=L(()=>{vw(),xw(),Cw(),Zp(),Aw(),zw(),Jp(),Ow(),Rw()}),Ds=L(()=>{}),nh={};dn(nh,{default:()=>rh});var da,ca,rh,Nw=L(()=>{lg(),Yt(),Ps(),da="ort-wasm-proxy-worker",ca=globalThis.self?.name===da,ca&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Us(n.wasm).then(()=>{ni(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:a}=n;ri(a,r).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:r}=n,a=Ir(r);postMessage({type:t,out:a});break}case"create":{let{model:r,options:a}=n;ai(r,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":si(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:a,inputs:s,outputIndices:i,options:o}=n;ii(r,a,s,i,new Array(i.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},ui([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":oi(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}}),rh=ca?null:e=>new Worker(e??Ue,{type:"module",name:da})}),ah={};dn(ah,{default:()=>sh});async function pu(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,a=r&&self.name?.startsWith("em-pthread");t.mountExternalData=(u,c)=>{u.startsWith("./")&&(u=u.substring(2)),(t.Xc||(t.Xc=new Map)).set(u,c)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=u=>async(...c)=>{try{if(t.Yc)throw Error("Session already started");let g=t.Yc={Kd:c[0],errors:[]},f=await u(...c);if(t.Yc!==g)throw Error("Session mismatch");t.dd?.flush();let v=g.errors;if(0<v.length){let T=await Promise.all(v);if(T=T.filter(A=>A),0<T.length)throw Error(T.join(`
`))}return f}finally{t.Yc=null}};t.jsepInit=(u,c)=>{if(u==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=c;let g=t.dd;t.jsepRegisterBuffer=(f,v,T,A)=>g.registerBuffer(f,v,T,A),t.jsepGetBuffer=f=>g.getBuffer(f),t.jsepCreateDownloader=(f,v,T)=>g.createDownloader(f,v,T),t.jsepOnCreateSession=f=>{g.onCreateSession(f)},t.jsepOnReleaseSession=f=>{g.onReleaseSession(f)},t.jsepOnRunStart=f=>g.onRunStart(f),t.Id=(f,v)=>{g.upload(f,v)}}else if(u==="webnn"){let g=c[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=f=>g.onRunStart(f),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=f=>{g.onReleaseSession(f)},t.webnnCreateMLTensorDownloader=(f,v)=>g.createMLTensorDownloader(f,v),t.webnnRegisterMLTensor=(f,v,T,A)=>g.registerMLTensor(f,v,T,A),t.webnnCreateMLContext=f=>g.createMLContext(f),t.webnnRegisterMLConstant=(f,v,T,A,B,V)=>g.registerMLConstant(f,v,T,A,B,t.Xc,V),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let i=()=>{let u=c=>(...g)=>{let f=st;return g=c(...g),st!=f?new Promise((v,T)=>{jr={resolve:v,reject:T}}):g};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=u(t[c])})(),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),i=void 0};t.asyncInit=()=>{i?.()};var o,l,d=(u,c)=>{throw c},p=import.meta.url,h="";if(n||r){try{h=new URL(".",p).href}catch{}r&&(l=u=>{var c=new XMLHttpRequest;return c.open("GET",u,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),o=async u=>{if(z(u))return new Promise((g,f)=>{var v=new XMLHttpRequest;v.open("GET",u,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?g(v.response):f(v.status)},v.onerror=f,v.send(null)});var c=await fetch(u,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var m,y,w,_,k,$,b=console.log.bind(console),E=console.error.bind(console),S=b,I=E,C=!1,z=u=>u.startsWith("file://");function x(){_t.buffer!=U.buffer&&Z()}if(a){let u=function(c){try{var g=c.data,f=g.Sc;if(f==="load"){let v=[];self.onmessage=T=>v.push(T),$=()=>{postMessage({Sc:"loaded"});for(let T of v)u(T);self.onmessage=u};for(let T of g.xd)t[T]&&!t[T].proxy||(t[T]=(...A)=>{postMessage({Sc:"callHandler",wd:T,args:A})},T=="print"&&(S=t[T]),T=="printErr"&&(I=t[T]));_t=g.Od,Z(),y=g.Pd,ze(),Jn()}else if(f==="run"){(function(v){var T=(x(),D)[v+52>>>2>>>0];v=(x(),D)[v+56>>>2>>>0],bo(T,T-v),oe(T)})(g.Rc),Zr(g.Rc,0,0,1,0,0),bi(),Fr(g.Rc),M||(fo(),M=!0);try{Xg(g.Md,g.bd)}catch(v){if(v!="unwind")throw v}}else g.target!=="setimmediate"&&(f==="checkMailbox"?M&&Hn():f&&(I(`worker: received unknown command ${f}`),I(g)))}catch(v){throw mo(),v}};var M=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=u}var U,Y,G,j,R,D,F,J,ee,ne,se,P=!1;function Z(){var u=_t.buffer;t.HEAP8=U=new Int8Array(u),G=new Int16Array(u),t.HEAPU8=Y=new Uint8Array(u),j=new Uint16Array(u),t.HEAP32=R=new Int32Array(u),t.HEAPU32=D=new Uint32Array(u),F=new Float32Array(u),J=new Float64Array(u),ee=new BigInt64Array(u),ne=new BigUint64Array(u)}function Q(){P=!0,a?$():ht.sb()}function W(u){throw I(u="Aborted("+u+")"),C=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),k?.(u),u}function Te(){return{a:{ma:w0,gb:y0,g:Yg,J:Qg,f:Zg,o:Jg,h:ey,ha:ty,b:ny,T:ry,Ha:Ei,n:ay,$:Ai,Xa:zi,Da:Oi,Fa:Ri,Ya:Bi,Va:Ni,Oa:Mi,Ua:Di,ka:Pi,Ea:Ui,Ba:Li,Wa:Vi,Ca:qi,bb:sy,ea:iy,wa:oy,ua:ly,da:cy,O:py,H:hy,va:fy,_:vy,xa:$y,Ra:xy,za:Sy,Ia:Ey,sa:Ty,fa:Iy,Qa:Fr,_a:Cy,R:Ry,r:Py,c:qr,hb:Uy,y:Ly,M:Vy,D:qy,l:Wy,s:Yi,ib:Fy,I:Gy,S:Hy,j:jy,u:Ky,q:Xy,k:Yy,La:Qy,Ma:Zy,Na:Jy,Ja:eo,Ka:to,ta:no,db:t0,ab:r0,v:a0,aa:s0,ga:i0,$a:n0,W:o0,Za:u0,Aa:l0,F:e0,U:d0,la:Qn,ya:p0,fb:c0,eb:h0,Sa:io,Ta:oo,Ga:Dr,V:uo,ja:lo,Pa:co,ia:po,kb:ew,na:X0,lb:J0,oa:K0,G:U0,e:$0,t:b0,w:_0,B:O0,mb:G0,K:M0,x:S0,pa:H0,Y:Y0,ba:F0,nb:W0,ob:q0,P:R0,qa:V0,pb:L0,N:D0,Z:j0,d:v0,A:k0,m:x0,jb:tw,p:T0,z:I0,C:E0,E:C0,L:B0,qb:P0,Q:Q0,ca:N0,X:Z0,rb:z0,ra:A0,i:m0,a:_t,cb:Mr}}}async function ze(){function u(f,v){var T=ht=f.exports;f={};for(let[A,B]of Object.entries(T))typeof B=="function"?(T=Ay(B),f[A]=T):f[A]=B;return ht=f,ht=(function(){var A=ht,B=q=>ie=>q(ie)>>>0,V=q=>()=>q()>>>0;return(A=Object.assign({},A)).tb=B(A.tb),A.Xb=V(A.Xb),A.Zb=B(A.Zb),A.lc=B(A.lc),A.mc=V(A.mc),A.qc=B(A.qc),A})(),wi.push(ht._b),ho=(f=ht).tb,fo=f.ub,t._OrtInit=f.vb,t._OrtGetLastError=f.wb,t._OrtCreateSessionOptions=f.xb,t._OrtAppendExecutionProvider=f.yb,t._OrtAddFreeDimensionOverride=f.zb,t._OrtAddSessionConfigEntry=f.Ab,t._OrtReleaseSessionOptions=f.Bb,t._OrtCreateSession=f.Cb,t._OrtReleaseSession=f.Db,t._OrtGetInputOutputCount=f.Eb,t._OrtGetInputOutputMetadata=f.Fb,t._OrtFree=f.Gb,t._OrtCreateTensor=f.Hb,t._OrtGetTensorData=f.Ib,t._OrtReleaseTensor=f.Jb,t._OrtCreateRunOptions=f.Kb,t._OrtAddRunConfigEntry=f.Lb,t._OrtReleaseRunOptions=f.Mb,t._OrtCreateBinding=f.Nb,t._OrtBindInput=f.Ob,t._OrtBindOutput=f.Pb,t._OrtClearBoundOutputs=f.Qb,t._OrtReleaseBinding=f.Rb,t._OrtRunWithBinding=f.Sb,t._OrtRun=f.Tb,t._OrtEndProfiling=f.Ub,t._JsepOutput=f.Vb,t._JsepGetNodeName=f.Wb,Zn=f.Xb,it=t._free=f.Yb,fn=t._malloc=f.Zb,Zr=f.ac,mo=f.bc,go=f.cc,yo=f.dc,Jr=f.ec,wo=f.fc,_o=f.gc,le=f.hc,mn=f.ic,bo=f.jc,oe=f.kc,ea=f.lc,ue=f.mc,vo=f.nc,ta=f.oc,$o=f.pc,xo=f.qc,ko=f.rc,na=f.sc,So=f.tc,Eo=f.uc,To=f.vc,Io=f.wc,Co=f.xc,Ao=f.yc,zo=f.zc,Oo=f.Ac,Ro=f.Bc,Bo=f.Cc,No=f.Dc,Mo=f.Ec,Do=f.Fc,Po=f.Gc,Uo=f.Hc,Lo=f.Ic,Vo=f.Jc,qo=f.Kc,Wo=f.Lc,Fo=f.Mc,Go=f.Nc,Ho=f.Pc,jo=f.Qc,Ko=f.$c,Xo=f.ad,Yo=f.fd,Qo=f.jd,Zo=f.kd,Jo=f.ld,eu=f.md,tu=f.nd,nu=f.od,ru=f.pd,au=f.qd,su=f.vd,iu=f.Td,ou=f.Ud,uu=f.Vd,lu=f.Wd,y=v,ht}var c,g=Te();return t.instantiateWasm?new Promise(f=>{t.instantiateWasm(g,(v,T)=>{f(u(v,T))})}):a?u(new WebAssembly.Instance(y,Te()),y):(se??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm",import.meta.url).href,import.meta.url).href,c=await(async function(f){var v=se;if(!m&&!z(v))try{var T=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,f)}catch(A){I(`wasm streaming compile failed: ${A}`),I("falling back to ArrayBuffer instantiation")}return(async function(A,B){try{var V=await(async function(q){if(!m)try{var ie=await o(q);return new Uint8Array(ie)}catch{}if(q==se&&m)q=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";q=l(q)}return q})(A);return await WebAssembly.instantiate(V,B)}catch(q){I(`failed to asynchronously prepare wasm: ${q}`),W(q)}})(v,f)})(g),u(c.instance,c.module))}class $e{name="ExitStatus";constructor(c){this.message=`Program terminated with exit(${c})`,this.status=c}}var Oe=u=>{u.terminate(),u.onmessage=()=>{}},ge=[],ve=0,Be=null,Vn=u=>{wt.length==0&&($i(),vi(wt[0]));var c=wt.pop();if(!c)return 6;pn.push(c),Ot[u.Rc]=c,c.Rc=u.Rc;var g={Sc:"run",Md:u.Ld,bd:u.bd,Rc:u.Rc};return c.postMessage(g,u.rd),0},rt=0,xe=(u,c,...g)=>{var f,v=16*g.length,T=ue(),A=ea(v),B=A>>>3;for(f of g)typeof f=="bigint"?((x(),ee)[B++>>>0]=1n,(x(),ee)[B++>>>0]=f):((x(),ee)[B++>>>0]=0n,(x(),J)[B++>>>0]=f);return u=go(u,0,v,A,c),oe(T),u};function Mr(u){if(a)return xe(0,1,u);if(w=u,!(0<rt)){for(var c of pn)Oe(c);for(c of wt)Oe(c);wt=[],pn=[],Ot={},C=!0}d(0,new $e(u))}function yi(u){if(a)return xe(1,0,u);Dr(u)}var Dr=u=>{if(w=u,a)throw yi(u),"unwind";Mr(u)},wt=[],pn=[],wi=[],Ot={},_i=u=>{var c=u.Rc;delete Ot[c],wt.push(u),pn.splice(pn.indexOf(u),1),u.Rc=0,yo(c)};function bi(){wi.forEach(u=>u())}var vi=u=>new Promise(c=>{u.onmessage=v=>{var T=v.data;if(v=T.Sc,T.Zc&&T.Zc!=Zn()){var A=Ot[T.Zc];A?A.postMessage(T,T.rd):I(`Internal error! Worker sent a message "${v}" to target pthread ${T.Zc}, but that thread no longer exists!`)}else v==="checkMailbox"?Hn():v==="spawnThread"?Vn(T):v==="cleanupThread"?Gn(()=>{_i(Ot[T.Nd])}):v==="loaded"?(u.loaded=!0,c(u)):T.target==="setimmediate"?u.postMessage(T):v==="uncaughtException"?u.onerror(T.error):v==="callHandler"?t[T.wd](...T.args):v&&I(`worker sent an unknown command ${v}`)},u.onerror=v=>{throw I(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var g,f=[];for(g of[])t.propertyIsEnumerable(g)&&f.push(g);u.postMessage({Sc:"load",xd:f,Od:_t,Pd:y})});function $i(){var u=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});wt.push(u)}var _t,Xg=(u,c)=>{rt=0,u=na(u,c),0<rt?w=u:Jr(u)},qn=[],Wn=0;function Yg(u){var c=new Pr(u>>>=0);return(x(),U)[c.Tc+12>>>0]==0&&(xi(c,!0),Wn--),ki(c,!1),qn.push(c),xo(u)}var Zt=0,Qg=()=>{le(0,0);var u=qn.pop();vo(u.cd),Zt=0};function xi(u,c){c=c?1:0,(x(),U)[u.Tc+12>>>0]=c}function ki(u,c){c=c?1:0,(x(),U)[u.Tc+13>>>0]=c}class Pr{constructor(c){this.cd=c,this.Tc=c-24}}var Ur=u=>{var c=Zt;if(!c)return mn(0),0;var g=new Pr(c);(x(),D)[g.Tc+16>>>2>>>0]=c;var f=(x(),D)[g.Tc+4>>>2>>>0];if(!f)return mn(0),c;for(var v of u){if(v===0||v===f)break;if($o(v,f,g.Tc+16))return mn(v),c}return mn(f),c};function Zg(){return Ur([])}function Jg(u){return Ur([u>>>0])}function ey(u,c,g,f){return Ur([u>>>0,c>>>0,g>>>0,f>>>0])}var ty=()=>{var u=qn.pop();u||W("no exception to throw");var c=u.cd;throw(x(),U)[u.Tc+13>>>0]==0&&(qn.push(u),ki(u,!0),xi(u,!1),Wn++),ta(c),Zt=c};function ny(u,c,g){var f=new Pr(u>>>=0);throw c>>>=0,g>>>=0,(x(),D)[f.Tc+16>>>2>>>0]=0,(x(),D)[f.Tc+4>>>2>>>0]=c,(x(),D)[f.Tc+8>>>2>>>0]=g,ta(u),Wn++,Zt=u}var ry=()=>Wn;function Si(u,c,g,f){return a?xe(2,1,u,c,g,f):Ei(u,c,g,f)}function Ei(u,c,g,f){if(u>>>=0,c>>>=0,g>>>=0,f>>>=0,!globalThis.SharedArrayBuffer)return 6;var v=[];return a&&v.length===0?Si(u,c,g,f):(u={Ld:g,Rc:u,bd:f,rd:v},a?(u.Sc="spawnThread",postMessage(u,v),0):Vn(u))}function ay(u){throw Zt||=u>>>0,Zt}var Ti=globalThis.TextDecoder&&new TextDecoder,Ii=(u,c,g,f)=>{if(g=c+g,f)return g;for(;u[c]&&!(c>=g);)++c;return c},Ci=(u,c=0,g,f)=>{if(16<(g=Ii(u,c>>>=0,g,f))-c&&u.buffer&&Ti)return Ti.decode(u.buffer instanceof ArrayBuffer?u.subarray(c,g):u.slice(c,g));for(f="";c<g;){var v=u[c++];if(128&v){var T=63&u[c++];if((224&v)==192)f+=String.fromCharCode((31&v)<<6|T);else{var A=63&u[c++];65536>(v=(240&v)==224?(15&v)<<12|T<<6|A:(7&v)<<18|T<<12|A<<6|63&u[c++])?f+=String.fromCharCode(v):(v-=65536,f+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else f+=String.fromCharCode(v)}return f},Ee=(u,c,g)=>(u>>>=0)?Ci((x(),Y),u,c,g):"";function Ai(u,c,g){return a?xe(3,1,u,c,g):0}function zi(u,c){if(a)return xe(4,1,u,c)}function Oi(u,c){if(a)return xe(5,1,u,c)}function Ri(u,c,g){if(a)return xe(6,1,u,c,g)}function Bi(u,c,g){return a?xe(7,1,u,c,g):0}function Ni(u,c){if(a)return xe(8,1,u,c)}function Mi(u,c,g){if(a)return xe(9,1,u,c,g)}function Di(u,c,g,f){if(a)return xe(10,1,u,c,g,f)}function Pi(u,c,g,f){if(a)return xe(11,1,u,c,g,f)}function Ui(u,c,g,f){if(a)return xe(12,1,u,c,g,f)}function Li(u){if(a)return xe(13,1,u)}function Vi(u,c){if(a)return xe(14,1,u,c)}function qi(u,c,g){if(a)return xe(15,1,u,c,g)}var sy=()=>W(""),at=u=>{u>>>=0;for(var c="";;){var g=(x(),Y)[u++>>>0];if(!g)return c;c+=String.fromCharCode(g)}},Lr={},Vr={},Jt=class extends Error{constructor(u){super(u),this.name="BindingError"}};function pt(u,c,g={}){return(function(f,v,T={}){var A=v.name;if(!f)throw new Jt(`type "${A}" must have a positive integer typeid pointer`);if(Vr.hasOwnProperty(f)){if(T.yd)return;throw new Jt(`Cannot register type '${A}' twice`)}Vr[f]=v,Lr.hasOwnProperty(f)&&(v=Lr[f],delete Lr[f],v.forEach(B=>B()))})(u,c,g)}var Wi=(u,c,g)=>{switch(c){case 1:return g?f=>(x(),U)[f>>>0]:f=>(x(),Y)[f>>>0];case 2:return g?f=>(x(),G)[f>>>1>>>0]:f=>(x(),j)[f>>>1>>>0];case 4:return g?f=>(x(),R)[f>>>2>>>0]:f=>(x(),D)[f>>>2>>>0];case 8:return g?f=>(x(),ee)[f>>>3>>>0]:f=>(x(),ne)[f>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${u}`)}};function iy(u,c,g,f,v){u>>>=0,g>>>=0,c=at(c>>>0);let T=A=>A;if(f=f===0n){let A=8*g;T=B=>BigInt.asUintN(A,B),v=T(v)}pt(u,{name:c,Oc:T,Vc:(A,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:Wi(c,g,!f),Wc:null})}function oy(u,c,g,f){pt(u>>>=0,{name:c=at(c>>>0),Oc:function(v){return!!v},Vc:function(v,T){return T?g:f},Uc:function(v){return this.Oc((x(),Y)[v>>>0])},Wc:null})}var Fi=[],Rt=[0,1,,1,null,1,!0,1,!1,1];function qr(u){9<(u>>>=0)&&--Rt[u+1]===0&&(Rt[u]=void 0,Fi.push(u))}var We=u=>{if(!u)throw new Jt(`Cannot use deleted val. handle = ${u}`);return Rt[u]},je=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Fi.pop()||Rt.length;return Rt[c]=u,Rt[c+1]=1,c}};function Wr(u){return this.Oc((x(),D)[u>>>2>>>0])}var uy={name:"emscripten::val",Oc:u=>{var c=We(u);return qr(u),c},Vc:(u,c)=>je(c),Uc:Wr,Wc:null};function ly(u){return pt(u>>>0,uy)}var dy=(u,c)=>{switch(c){case 4:return function(g){return this.Oc((x(),F)[g>>>2>>>0])};case 8:return function(g){return this.Oc((x(),J)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${u}`)}};function cy(u,c,g){g>>>=0,pt(u>>>=0,{name:c=at(c>>>0),Oc:f=>f,Vc:(f,v)=>v,Uc:dy(c,g),Wc:null})}function py(u,c,g,f,v){u>>>=0,g>>>=0,c=at(c>>>0);let T=B=>B;if(f===0){var A=32-8*g;T=B=>B<<A>>>A,v=T(v)}pt(u,{name:c,Oc:T,Vc:(B,V)=>V,Uc:Wi(c,g,f!==0),Wc:null})}function hy(u,c,g){function f(T){var A=(x(),D)[T>>>2>>>0];return T=(x(),D)[T+4>>>2>>>0],new v((x(),U).buffer,T,A)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];pt(u>>>=0,{name:g=at(g>>>0),Oc:f,Uc:f},{yd:!0})}var bt=(u,c,g)=>{var f=(x(),Y);if(c>>>=0,0<g){var v=c;g=c+g-1;for(var T=0;T<u.length;++T){var A=u.codePointAt(T);if(127>=A){if(c>=g)break;f[c++>>>0]=A}else if(2047>=A){if(c+1>=g)break;f[c++>>>0]=192|A>>6,f[c++>>>0]=128|63&A}else if(65535>=A){if(c+2>=g)break;f[c++>>>0]=224|A>>12,f[c++>>>0]=128|A>>6&63,f[c++>>>0]=128|63&A}else{if(c+3>=g)break;f[c++>>>0]=240|A>>18,f[c++>>>0]=128|A>>12&63,f[c++>>>0]=128|A>>6&63,f[c++>>>0]=128|63&A,T++}}f[c>>>0]=0,u=c-v}else u=0;return u},Fn=u=>{for(var c=0,g=0;g<u.length;++g){var f=u.charCodeAt(g);127>=f?c++:2047>=f?c+=2:55296<=f&&57343>=f?(c+=4,++g):c+=3}return c};function fy(u,c){pt(u>>>=0,{name:c=at(c>>>0),Oc(g){var f=(x(),D)[g>>>2>>>0];return f=Ee(g+4,f,!0),it(g),f},Vc(g,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var v=typeof f=="string";if(!(v||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1))throw new Jt("Cannot pass non-string to std::string");var T=v?Fn(f):f.length,A=fn(4+T+1),B=A+4;return(x(),D)[A>>>2>>>0]=T,v?bt(f,B,T+1):(x(),Y).set(f,B>>>0),g!==null&&g.push(it,A),A},Uc:Wr,Wc(g){it(g)}})}var Gi=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,my=(u,c,g)=>{if(u>>>=1,16<(c=Ii((x(),j),u,c/2,g))-u&&Gi)return Gi.decode((x(),j).slice(u,c));for(g="";u<c;++u){var f=(x(),j)[u>>>0];g+=String.fromCharCode(f)}return g},gy=(u,c,g)=>{if(g??=2147483647,2>g)return 0;var f=c;g=(g-=2)<2*u.length?g/2:u.length;for(var v=0;v<g;++v){var T=u.charCodeAt(v);(x(),G)[c>>>1>>>0]=T,c+=2}return(x(),G)[c>>>1>>>0]=0,c-f},yy=u=>2*u.length,wy=(u,c,g)=>{var f="";u>>>=2;for(var v=0;!(v>=c/4);v++){var T=(x(),D)[u+v>>>0];if(!T&&!g)break;f+=String.fromCodePoint(T)}return f},_y=(u,c,g)=>{if(c>>>=0,g??=2147483647,4>g)return 0;var f=c;g=f+g-4;for(var v=0;v<u.length;++v){var T=u.codePointAt(v);if(65535<T&&v++,(x(),R)[c>>>2>>>0]=T,(c+=4)+4>g)break}return(x(),R)[c>>>2>>>0]=0,c-f},by=u=>{for(var c=0,g=0;g<u.length;++g)65535<u.codePointAt(g)&&g++,c+=4;return c};function vy(u,c,g){if(u>>>=0,c>>>=0,g=at(g>>>=0),c===2)var f=my,v=gy,T=yy;else f=wy,v=_y,T=by;pt(u,{name:g,Oc:A=>{var B=(x(),D)[A>>>2>>>0];return B=f(A+4,B*c,!0),it(A),B},Vc:(A,B)=>{if(typeof B!="string")throw new Jt(`Cannot pass non-string to C++ string type ${g}`);var V=T(B),q=fn(4+V+c);return(x(),D)[q>>>2>>>0]=V/c,v(B,q+4,V+c),A!==null&&A.push(it,q),q},Uc:Wr,Wc(A){it(A)}})}function $y(u,c){pt(u>>>=0,{zd:!0,name:c=at(c>>>0),Oc:()=>{},Vc:()=>{}})}function xy(u){Zr(u>>>0,!r,1,!n,131072,!1),bi()}var Gn=u=>{if(!C)try{if(u(),!(0<rt))try{a?Zn()&&Jr(w):Dr(w)}catch(c){c instanceof $e||c=="unwind"||d(0,c)}}catch(c){c instanceof $e||c=="unwind"||d(0,c)}},ky=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Fr(u){u>>>=0,ky||(Atomics.waitAsync((x(),R),u>>>2,u).value.then(Hn),u+=128,Atomics.store((x(),R),u>>>2,1))}var Hn=()=>Gn(()=>{var u=Zn();u&&(Fr(u),_o())});function Sy(u,c){(u>>>=0)==c>>>0?setTimeout(Hn):a?postMessage({Zc:u,Sc:"checkMailbox"}):(u=Ot[u])&&u.postMessage({Sc:"checkMailbox"})}var Gr=[];function Ey(u,c,g,f,v){for(c>>>=0,v>>>=0,Gr.length=0,g=v>>>3,f=v+f>>>3;g<f;){var T;T=(x(),ee)[g++>>>0]?(x(),ee)[g++>>>0]:(x(),J)[g++>>>0],Gr.push(T)}return(c?ra[c]:g0[u])(...Gr)}var Ty=()=>{rt=0};function Iy(u){u>>>=0,a?postMessage({Sc:"cleanupThread",Nd:u}):_i(Ot[u])}function Cy(u){}var jn=u=>{try{u()}catch(c){W(c)}};function Ay(u){var c=(...g)=>{Kn.push(u);try{return u(...g)}finally{C||(Kn.pop(),st&&vt===1&&Kn.length===0&&(vt=0,rt+=1,jn(ou),typeof Fibers<"u"&&Fibers.Zd()))}};return Ki.set(u,c),c}var vt=0,st=null,Hi=0,Kn=[],Hr=new Map,ji=new Map,Ki=new Map,zy=0,jr=null,Oy=[],Xi=u=>(function(c){if(!C){if(vt===0){var g=!1,f=!1;c((v=0)=>{if(!C&&(Hi=v,g=!0,f)){vt=2,jn(()=>uu(st)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),v=!1;try{var T=(function(){var V=(x(),R)[st+8>>>2>>>0];return V=ji.get(V),V=Ki.get(V),--rt,V()})()}catch(V){T=V,v=!0}var A=!1;if(!st){var B=jr;B&&(jr=null,(v?B.reject:B.resolve)(T),A=!0)}if(v&&!A)throw T}}),f=!0,g||(vt=1,st=(function(){var v=fn(65548),T=v+12;if((x(),D)[v>>>2>>>0]=T,(x(),D)[v+4>>>2>>>0]=T+65536,T=Kn[0],!Hr.has(T)){var A=zy++;Hr.set(T,A),ji.set(A,T)}return T=Hr.get(T),(x(),R)[v+8>>>2>>>0]=T,v})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),jn(()=>iu(st)))}else vt===2?(vt=0,jn(lu),it(st),st=null,Oy.forEach(Gn)):W(`invalid state: ${vt}`);return Hi}})(c=>{u().then(c)});function Ry(u){return u>>>=0,Xi(async()=>{var c=await We(u);return je(c)})}var Kr=[],By=u=>{var c=Kr.length;return Kr.push(u),c},Ny=(u,c)=>{for(var g=Array(u),f=0;f<u;++f){var v=f,T=(x(),D)[c+4*f>>>2>>>0],A=Vr[T];if(A===void 0)throw u=`parameter ${f}`,T=ho(T),c=at(T),it(T),new Jt(`${u} has unknown type ${c}`);g[v]=A}return g},My=(u,c,g)=>{var f=[];return u=u(f,g),f.length&&((x(),D)[c>>>2>>>0]=je(f)),u},Dy={},Xn=u=>{var c=Dy[u];return c===void 0?at(u):c};function Py(u,c,g){var[f,...v]=Ny(u,c>>>0);c=f.Vc.bind(f);var T=v.map(V=>V.Uc.bind(V));u--;var A={toValue:We};switch(u=T.map((V,q)=>{var ie=`argFromPtr${q}`;return A[ie]=V,`${ie}(args${q?"+"+8*q:""})`}),g){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:A.getStringOrSymbol=Xn,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${u})`,f.zd||(A.toReturnWire=c,A.emval_returnValue=My,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,g=new Function(Object.keys(A),B)(...Object.values(A)),B=`methodCaller<(${v.map(V=>V.name)}) => ${f.name}>`,By(Object.defineProperty(g,"name",{value:B}))}function Uy(u,c){return c>>>=0,(u=We(u>>>0))==We(c)}function Ly(u){return(u>>>=0)?(u=Xn(u),je(globalThis[u])):je(globalThis)}function Vy(u){return u=Xn(u>>>0),je(t[u])}function qy(u,c){return c>>>=0,u=We(u>>>0),c=We(c),je(u[c])}function Wy(u){9<(u>>>=0)&&(Rt[u+1]+=1)}function Yi(u,c,g,f,v){return Kr[u>>>0](c>>>0,g>>>0,f>>>0,v>>>0)}function Fy(u,c,g,f,v){return Yi(u>>>0,c>>>0,g>>>0,f>>>0,v>>>0)}function Gy(){return je([])}function Hy(u){u=We(u>>>0);for(var c=Array(u.length),g=0;g<u.length;g++)c[g]=u[g];return je(c)}function jy(u){return je(Xn(u>>>0))}function Ky(){return je({})}function Xy(u){for(var c=We(u>>>=0);c.length;){var g=c.pop();c.pop()(g)}qr(u)}function Yy(u,c,g){c>>>=0,g>>>=0,u=We(u>>>0),c=We(c),g=We(g),u[c]=g}function Qy(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),(x(),R)[c>>>2>>>0]=u.getUTCSeconds(),(x(),R)[c+4>>>2>>>0]=u.getUTCMinutes(),(x(),R)[c+8>>>2>>>0]=u.getUTCHours(),(x(),R)[c+12>>>2>>>0]=u.getUTCDate(),(x(),R)[c+16>>>2>>>0]=u.getUTCMonth(),(x(),R)[c+20>>>2>>>0]=u.getUTCFullYear()-1900,(x(),R)[c+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),R)[c+28>>>2>>>0]=u}var Qi=u=>u%4==0&&(u%100!=0||u%400==0),Zi=[0,31,60,91,121,152,182,213,244,274,305,335],Ji=[0,31,59,90,120,151,181,212,243,273,304,334];function Zy(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),(x(),R)[c>>>2>>>0]=u.getSeconds(),(x(),R)[c+4>>>2>>>0]=u.getMinutes(),(x(),R)[c+8>>>2>>>0]=u.getHours(),(x(),R)[c+12>>>2>>>0]=u.getDate(),(x(),R)[c+16>>>2>>>0]=u.getMonth(),(x(),R)[c+20>>>2>>>0]=u.getFullYear()-1900,(x(),R)[c+24>>>2>>>0]=u.getDay();var g=(Qi(u.getFullYear())?Zi:Ji)[u.getMonth()]+u.getDate()-1|0;(x(),R)[c+28>>>2>>>0]=g,(x(),R)[c+36>>>2>>>0]=-60*u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset();var f=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(g!=f&&u.getTimezoneOffset()==Math.min(f,g)),(x(),R)[c+32>>>2>>>0]=u}function Jy(u){u>>>=0;var c=new Date((x(),R)[u+20>>>2>>>0]+1900,(x(),R)[u+16>>>2>>>0],(x(),R)[u+12>>>2>>>0],(x(),R)[u+8>>>2>>>0],(x(),R)[u+4>>>2>>>0],(x(),R)[u>>>2>>>0],0),g=(x(),R)[u+32>>>2>>>0],f=c.getTimezoneOffset(),v=new Date(c.getFullYear(),6,1).getTimezoneOffset(),T=new Date(c.getFullYear(),0,1).getTimezoneOffset(),A=Math.min(T,v);return 0>g?(x(),R)[u+32>>>2>>>0]=+(v!=T&&A==f):0<g!=(A==f)&&(v=Math.max(T,v),c.setTime(c.getTime()+6e4*((0<g?A:v)-f))),(x(),R)[u+24>>>2>>>0]=c.getDay(),g=(Qi(c.getFullYear())?Zi:Ji)[c.getMonth()]+c.getDate()-1|0,(x(),R)[u+28>>>2>>>0]=g,(x(),R)[u>>>2>>>0]=c.getSeconds(),(x(),R)[u+4>>>2>>>0]=c.getMinutes(),(x(),R)[u+8>>>2>>>0]=c.getHours(),(x(),R)[u+12>>>2>>>0]=c.getDate(),(x(),R)[u+16>>>2>>>0]=c.getMonth(),(x(),R)[u+20>>>2>>>0]=c.getYear(),u=c.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function eo(u,c,g,f,v,T,A){return a?xe(16,1,u,c,g,f,v,T,A):-52}function to(u,c,g,f,v,T){if(a)return xe(17,1,u,c,g,f,v,T)}var hn={},e0=()=>performance.timeOrigin+performance.now();function no(u,c){if(a)return xe(18,1,u,c);if(hn[u]&&(clearTimeout(hn[u].id),delete hn[u]),!c)return 0;var g=setTimeout(()=>{delete hn[u],Gn(()=>wo(u,performance.timeOrigin+performance.now()))},c);return hn[u]={id:g,Yd:c},0}function t0(u,c,g,f){u>>>=0,c>>>=0,g>>>=0,f>>>=0;var v=new Date().getFullYear(),T=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var A=Math.max(T,v);(x(),D)[u>>>2>>>0]=60*A,(x(),R)[c>>>2>>>0]=+(T!=v),u=(c=B=>{var V=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(V/60)).padStart(2,"0")}${String(V%60).padStart(2,"0")}`})(T),c=c(v),v<T?(bt(u,g,17),bt(c,f,17)):(bt(u,f,17),bt(c,g,17))}var n0=()=>Date.now();function r0(u,c,g){return g>>>=0,0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),u=Math.round(1e6*u),(x(),ee)[g>>>3>>>0]=BigInt(u),0):28}var Xr=[],ro=(u,c)=>{Xr.length=0;for(var g;g=(x(),Y)[u++>>>0];){var f=g!=105;c+=(f&=g!=112)&&c%8?4:0,Xr.push(g==112?(x(),D)[c>>>2>>>0]:g==106?(x(),ee)[c>>>3>>>0]:g==105?(x(),R)[c>>>2>>>0]:(x(),J)[c>>>3>>>0]),c+=f?8:4}return Xr};function a0(u,c,g){return u>>>=0,c=ro(c>>>0,g>>>0),ra[u](...c)}function s0(u,c,g){return u>>>=0,c=ro(c>>>0,g>>>0),ra[u](...c)}var i0=()=>{};function o0(u,c){return I(Ee(u>>>0,c>>>0))}var u0=()=>{throw rt+=1,"unwind"};function l0(){return 4294901760}var d0=()=>navigator.hardwareConcurrency,Bt={},Yn=u=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+c[1]:0},ao=u=>{for(var c of u)(u=Yn(c))&&(Bt[u]=c)};function c0(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),ao(u),Bt.gd=Yn(u[3]),Bt.Jd=u,Bt.gd}function Qn(u){if(!(u=Bt[u>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(u))u=c[1];else{if(!(c=/^(.+?)@/.exec(u)))return 0;u=c[1]}it(Qn.hd??0),c=Fn(u)+1;var g=fn(c);return g&&bt(u,g,c),Qn.hd=g,Qn.hd}function p0(u){u>>>=0;var c=(x(),Y).length;if(u<=c||4294901760<u)return!1;for(var g=1;4>=g;g*=2){var f=c*(1+.2/g);f=Math.min(f,u+100663296);e:{f=(Math.min(4294901760,65536*Math.ceil(Math.max(u,f)/65536))-_t.buffer.byteLength+65535)/65536|0;try{_t.grow(f),Z();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}function h0(u,c,g){if(u>>>=0,c>>>=0,Bt.gd==u)var f=Bt.Jd;else(f=Error().stack.toString().split(`
`))[0]=="Error"&&f.shift(),ao(f);for(var v=3;f[v]&&Yn(f[v])!=u;)++v;for(u=0;u<g&&f[u+v];++u)(x(),R)[c+4*u>>>2>>>0]=Yn(f[u+v]);return u}var Yr,Qr={},so=()=>{if(!Yr){var u,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in Qr)Qr[u]===void 0?delete c[u]:c[u]=Qr[u];var g=[];for(u in c)g.push(`${u}=${c[u]}`);Yr=g}return Yr};function io(u,c){if(a)return xe(19,1,u,c);u>>>=0,c>>>=0;var g,f=0,v=0;for(g of so()){var T=c+f;(x(),D)[u+v>>>2>>>0]=T,f+=bt(g,T,1/0)+1,v+=4}return 0}function oo(u,c){if(a)return xe(20,1,u,c);u>>>=0,c>>>=0;var g=so();for(var f of((x(),D)[u>>>2>>>0]=g.length,u=0,g))u+=Fn(f)+1;return(x(),D)[c>>>2>>>0]=u,0}function uo(u){return a?xe(21,1,u):52}function lo(u,c,g,f){return a?xe(22,1,u,c,g,f):52}function co(u,c,g,f){return a?xe(23,1,u,c,g,f):70}var f0=[null,[],[]];function po(u,c,g,f){if(a)return xe(24,1,u,c,g,f);c>>>=0,g>>>=0,f>>>=0;for(var v=0,T=0;T<g;T++){var A=(x(),D)[c>>>2>>>0],B=(x(),D)[c+4>>>2>>>0];c+=8;for(var V=0;V<B;V++){var q=u,ie=(x(),Y)[A+V>>>0],pe=f0[q];ie===0||ie===10?((q===1?S:I)(Ci(pe)),pe.length=0):pe.push(ie)}v+=B}return(x(),D)[f>>>2>>>0]=v,0}function m0(u){return u>>>0}a||(function(){for(var u=t.numThreads-1;u--;)$i();ge.push(async()=>{var c=(async function(){if(!a)return Promise.all(wt.map(vi))})();ve++,await c,--ve==0&&Be&&(c=Be,Be=null,c())})})(),a||(_t=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Z()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>ue(),t.stackRestore=u=>oe(u),t.stackAlloc=u=>ea(u),t.setValue=function(u,c,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":(x(),U)[u>>>0]=c;break;case"i16":(x(),G)[u>>>1>>>0]=c;break;case"i32":(x(),R)[u>>>2>>>0]=c;break;case"i64":(x(),ee)[u>>>3>>>0]=BigInt(c);break;case"float":(x(),F)[u>>>2>>>0]=c;break;case"double":(x(),J)[u>>>3>>>0]=c;break;case"*":(x(),D)[u>>>2>>>0]=c;break;default:W(`invalid type for setValue: ${g}`)}},t.getValue=function(u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return(x(),U)[u>>>0];case"i16":return(x(),G)[u>>>1>>>0];case"i32":return(x(),R)[u>>>2>>>0];case"i64":return(x(),ee)[u>>>3>>>0];case"float":return(x(),F)[u>>>2>>>0];case"double":return(x(),J)[u>>>3>>>0];case"*":return(x(),D)[u>>>2>>>0];default:W(`invalid type for getValue: ${c}`)}},t.UTF8ToString=Ee,t.stringToUTF8=bt,t.lengthBytesUTF8=Fn;var ho,fo,Zn,it,fn,Zr,mo,go,yo,Jr,wo,_o,le,mn,bo,oe,ea,ue,vo,ta,$o,xo,ko,na,So,Eo,To,Io,Co,Ao,zo,Oo,Ro,Bo,No,Mo,Do,Po,Uo,Lo,Vo,qo,Wo,Fo,Go,Ho,jo,Ko,Xo,Yo,Qo,Zo,Jo,eu,tu,nu,ru,au,su,iu,ou,uu,lu,ht,g0=[Mr,yi,Si,Ai,zi,Oi,Ri,Bi,Ni,Mi,Di,Pi,Ui,Li,Vi,qi,eo,to,no,io,oo,uo,lo,co,po],ra={1003524:(u,c,g,f,v)=>{if(t===void 0||!t.Xc)return 1;if((u=Ee(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.Xc.get(u)))return 2;if(c=Number(c>>>0),g=Number(g>>>0),f=Number(f>>>0),c+g>u.byteLength)return 3;try{let T=u.subarray(c,c+g);switch(v){case 0:(x(),Y).set(T,f>>>0);break;case 1:t.Qd?t.Qd(f,T):t.Id(f,T);break;default:return 4}return 0}catch{return 4}},1004348:(u,c,g)=>{t.td(u,(x(),Y).subarray(c>>>0,c+g>>>0))},1004412:()=>t.Sd(),1004454:u=>{t.sd(u)},1004491:()=>{t.Bd()},1004522:()=>{t.Cd()},1004551:()=>{t.Gd()},1004576:u=>t.Ad(u),1004609:u=>t.Ed(u),1004641:(u,c,g)=>{t.ed(Number(u),Number(c),Number(g),!0)},1004704:(u,c,g)=>{t.ed(Number(u),Number(c),Number(g))},1004761:()=>typeof wasmOffsetConverter<"u",1004818:u=>{t.$b("Abs",u,void 0)},1004869:u=>{t.$b("Neg",u,void 0)},1004920:u=>{t.$b("Floor",u,void 0)},1004973:u=>{t.$b("Ceil",u,void 0)},1005025:u=>{t.$b("Reciprocal",u,void 0)},1005083:u=>{t.$b("Sqrt",u,void 0)},1005135:u=>{t.$b("Exp",u,void 0)},1005186:u=>{t.$b("Erf",u,void 0)},1005237:u=>{t.$b("Sigmoid",u,void 0)},1005292:(u,c,g)=>{t.$b("HardSigmoid",u,{alpha:c,beta:g})},1005371:u=>{t.$b("Log",u,void 0)},1005422:u=>{t.$b("Sin",u,void 0)},1005473:u=>{t.$b("Cos",u,void 0)},1005524:u=>{t.$b("Tan",u,void 0)},1005575:u=>{t.$b("Asin",u,void 0)},1005627:u=>{t.$b("Acos",u,void 0)},1005679:u=>{t.$b("Atan",u,void 0)},1005731:u=>{t.$b("Sinh",u,void 0)},1005783:u=>{t.$b("Cosh",u,void 0)},1005835:u=>{t.$b("Asinh",u,void 0)},1005888:u=>{t.$b("Acosh",u,void 0)},1005941:u=>{t.$b("Atanh",u,void 0)},1005994:u=>{t.$b("Tanh",u,void 0)},1006046:u=>{t.$b("Not",u,void 0)},1006097:(u,c,g)=>{t.$b("Clip",u,{min:c,max:g})},1006166:u=>{t.$b("Clip",u,void 0)},1006218:(u,c)=>{t.$b("Elu",u,{alpha:c})},1006276:u=>{t.$b("Gelu",u,void 0)},1006328:u=>{t.$b("Relu",u,void 0)},1006380:(u,c)=>{t.$b("LeakyRelu",u,{alpha:c})},1006444:(u,c)=>{t.$b("ThresholdedRelu",u,{alpha:c})},1006514:(u,c)=>{t.$b("Cast",u,{to:c})},1006572:u=>{t.$b("Add",u,void 0)},1006623:u=>{t.$b("Sub",u,void 0)},1006674:u=>{t.$b("Mul",u,void 0)},1006725:u=>{t.$b("Div",u,void 0)},1006776:u=>{t.$b("Pow",u,void 0)},1006827:u=>{t.$b("Equal",u,void 0)},1006880:u=>{t.$b("Greater",u,void 0)},1006935:u=>{t.$b("GreaterOrEqual",u,void 0)},1006997:u=>{t.$b("Less",u,void 0)},1007049:u=>{t.$b("LessOrEqual",u,void 0)},1007108:(u,c,g,f,v)=>{t.$b("ReduceMean",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1007283:(u,c,g,f,v)=>{t.$b("ReduceMax",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1007457:(u,c,g,f,v)=>{t.$b("ReduceMin",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1007631:(u,c,g,f,v)=>{t.$b("ReduceProd",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1007806:(u,c,g,f,v)=>{t.$b("ReduceSum",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1007980:(u,c,g,f,v)=>{t.$b("ReduceL1",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1008153:(u,c,g,f,v)=>{t.$b("ReduceL2",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1008326:(u,c,g,f,v)=>{t.$b("ReduceLogSum",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1008503:(u,c,g,f,v)=>{t.$b("ReduceSumSquare",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1008683:(u,c,g,f,v)=>{t.$b("ReduceLogSumExp",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1008863:u=>{t.$b("Where",u,void 0)},1008916:(u,c,g)=>{t.$b("Transpose",u,{perm:c?Array.from((x(),R).subarray(Number(c)>>>0,Number(g)>>>0)):[]})},1009040:(u,c,g,f)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Ee(g),format:f?"NHWC":"NCHW"})},1009173:(u,c,g,f)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Ee(g),format:f?"NHWC":"NCHW"})},1009306:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e,$t)=>{t.$b("ConvTranspose",u,{format:V?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[v],pads:[T,A],strides:[B],wIsConst:()=>!!(x(),U)[q>>>0],outputPadding:ie?Array.from((x(),R).subarray(Number(ie)>>>0,Number(pe)>>>0)):[],outputShape:ye?Array.from((x(),R).subarray(Number(ye)>>>0,Number(_e)>>>0)):[],activation:Ee($t)})},1009739:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("ConvTranspose",u,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from((x(),R).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((x(),R).subarray(Number(T)>>>0,(Number(T)>>>0)+4>>>0)),strides:Array.from((x(),R).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),U)[V>>>0],outputPadding:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[],activation:Ee(_e)})},1010400:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e,$t)=>{t.$b("ConvTranspose",u,{format:V?"NHWC":"NCHW",autoPad:c,dilations:[g],group:f,kernelShape:[v],pads:[T,A],strides:[B],wIsConst:()=>!!(x(),U)[q>>>0],outputPadding:ie?Array.from((x(),R).subarray(Number(ie)>>>0,Number(pe)>>>0)):[],outputShape:ye?Array.from((x(),R).subarray(Number(ye)>>>0,Number(_e)>>>0)):[],activation:Ee($t)})},1010833:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("ConvTranspose",u,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from((x(),R).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:f,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((x(),R).subarray(Number(T)>>>0,(Number(T)>>>0)+4>>>0)),strides:Array.from((x(),R).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),U)[V>>>0],outputPadding:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[],activation:Ee(_e)})},1011494:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1011585:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("AveragePool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:v,dilations:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[],kernel_shape:B?Array.from((x(),R).subarray(Number(B)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1012064:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1012155:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("AveragePool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:v,dilations:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[],kernel_shape:B?Array.from((x(),R).subarray(Number(B)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1012634:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1012721:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("MaxPool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:v,dilations:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[],kernel_shape:B?Array.from((x(),R).subarray(Number(B)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1013196:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1013283:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e)=>{t.$b("MaxPool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:f,storage_order:v,dilations:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[],kernel_shape:B?Array.from((x(),R).subarray(Number(B)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1013758:(u,c,g,f,v)=>{t.$b("Gemm",u,{alpha:c,beta:g,transA:f,transB:v})},1013862:u=>{t.$b("MatMul",u,void 0)},1013916:(u,c,g,f)=>{t.$b("ArgMax",u,{keepDims:!!c,selectLastIndex:!!g,axis:f})},1014024:(u,c,g,f)=>{t.$b("ArgMin",u,{keepDims:!!c,selectLastIndex:!!g,axis:f})},1014132:(u,c)=>{t.$b("Softmax",u,{axis:c})},1014195:(u,c)=>{t.$b("Concat",u,{axis:c})},1014255:(u,c,g,f,v)=>{t.$b("Split",u,{axis:c,numOutputs:g,splitSizes:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1014411:u=>{t.$b("Expand",u,void 0)},1014465:(u,c)=>{t.$b("Gather",u,{axis:Number(c)})},1014536:(u,c)=>{t.$b("GatherElements",u,{axis:Number(c)})},1014615:(u,c)=>{t.$b("GatherND",u,{batch_dims:Number(c)})},1014694:(u,c,g,f,v,T,A,B,V,q,ie)=>{t.$b("Resize",u,{antialias:c,axes:g?Array.from((x(),R).subarray(Number(g)>>>0,Number(f)>>>0)):[],coordinateTransformMode:Ee(v),cubicCoeffA:T,excludeOutside:A,extrapolationValue:B,keepAspectRatioPolicy:Ee(V),mode:Ee(q),nearestMode:Ee(ie)})},1015056:(u,c,g,f,v,T,A)=>{t.$b("Slice",u,{starts:c?Array.from((x(),R).subarray(Number(c)>>>0,Number(g)>>>0)):[],ends:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[],axes:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[]})},1015320:u=>{t.$b("Tile",u,void 0)},1015372:(u,c,g)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:g?"NHWC":"NCHW"})},1015486:(u,c,g)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:g?"NHWC":"NCHW"})},1015600:u=>{t.$b("Range",u,void 0)},1015653:(u,c)=>{t.$b("Einsum",u,{equation:Ee(c)})},1015734:(u,c,g,f,v)=>{t.$b("Pad",u,{mode:c,value:g,pads:f?Array.from((x(),R).subarray(Number(f)>>>0,Number(v)>>>0)):[]})},1015877:(u,c,g,f,v,T)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:g,spatial:!!v,trainingMode:!!f,format:T?"NHWC":"NCHW"})},1016046:(u,c,g,f,v,T)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:g,spatial:!!v,trainingMode:!!f,format:T?"NHWC":"NCHW"})},1016215:(u,c,g)=>{t.$b("CumSum",u,{exclusive:Number(c),reverse:Number(g)})},1016312:(u,c,g)=>{t.$b("DequantizeLinear",u,{axis:c,blockSize:g})},1016402:(u,c,g,f,v)=>{t.$b("GridSample",u,{align_corners:c,mode:Ee(g),padding_mode:Ee(f),format:v?"NHWC":"NCHW"})},1016572:(u,c,g,f,v)=>{t.$b("GridSample",u,{align_corners:c,mode:Ee(g),padding_mode:Ee(f),format:v?"NHWC":"NCHW"})},1016742:(u,c)=>{t.$b("ScatterND",u,{reduction:Ee(c)})},1016827:(u,c,g,f,v,T,A,B,V)=>{t.$b("Attention",u,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:v,doRotary:T,qkvHiddenSizes:A?Array.from((x(),R).subarray(Number(B)>>>0,Number(B)+A>>>0)):[],pastPresentShareBuffer:!!V})},1017099:u=>{t.$b("BiasAdd",u,void 0)},1017154:u=>{t.$b("BiasSplitGelu",u,void 0)},1017215:u=>{t.$b("FastGelu",u,void 0)},1017271:(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e,$t,aa)=>{t.$b("Conv",u,{format:pe?"NHWC":"NCHW",auto_pad:c,dilations:g?Array.from((x(),R).subarray(Number(g)>>>0,Number(f)>>>0)):[],group:v,kernel_shape:T?Array.from((x(),R).subarray(Number(T)>>>0,Number(A)>>>0)):[],pads:B?Array.from((x(),R).subarray(Number(B)>>>0,Number(V)>>>0)):[],strides:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(ie)>>>0)):[],w_is_const:()=>!!(x(),U)[Number(ye)>>>0],activation:Ee(_e),activation_params:$t?Array.from((x(),F).subarray(Number($t)>>>0,Number(aa)>>>0)):[]})},1017855:u=>{t.$b("Gelu",u,void 0)},1017907:(u,c,g,f,v,T,A,B,V)=>{t.$b("GroupQueryAttention",u,{numHeads:c,kvNumHeads:g,scale:f,softcap:v,doRotary:T,rotaryInterleaved:A,smoothSoftmax:B,localWindowSize:V})},1018124:(u,c,g,f)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:g,simplified:!!f})},1018235:(u,c,g,f)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:g,simplified:!!f})},1018346:(u,c,g,f,v,T)=>{t.$b("MatMulNBits",u,{k:c,n:g,accuracyLevel:f,bits:v,blockSize:T})},1018473:(u,c,g,f,v,T)=>{t.$b("MultiHeadAttention",u,{numHeads:c,isUnidirectional:g,maskFilterValue:f,scale:v,doRotary:T})},1018632:(u,c)=>{t.$b("QuickGelu",u,{alpha:c})},1018696:(u,c,g,f,v)=>{t.$b("RotaryEmbedding",u,{interleaved:!!c,numHeads:g,rotaryEmbeddingDim:f,scale:v})},1018835:(u,c,g)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!g})},1018937:(u,c,g)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!g})},1019039:(u,c,g,f)=>{t.$b("GatherBlockQuantized",u,{gatherAxis:c,quantizeAxis:g,blockSize:f})},1019160:u=>{t.Fd(u)},1019194:(u,c)=>t.Hd(Number(u),Number(c),t.Yc.Kd,t.Yc.errors)};function y0(u,c,g){return Xi(async()=>{await t.Dd(Number(u),Number(c),Number(g))})}function w0(){return typeof wasmOffsetConverter<"u"}function _0(u,c,g,f){var v=ue();try{return Oo(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function b0(u,c,g){var f=ue();try{return Io(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;le(1,0)}}function v0(u){var c=ue();try{So(u)}catch(g){if(oe(c),g!==g+0)throw g;le(1,0)}}function $0(u,c){var g=ue();try{return na(u,c)}catch(f){if(oe(g),f!==f+0)throw f;le(1,0)}}function x0(u,c,g){var f=ue();try{ko(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;le(1,0)}}function k0(u,c){var g=ue();try{Ro(u,c)}catch(f){if(oe(g),f!==f+0)throw f;le(1,0)}}function S0(u,c,g,f,v,T,A){var B=ue();try{return Ao(u,c,g,f,v,T,A)}catch(V){if(oe(B),V!==V+0)throw V;le(1,0)}}function E0(u,c,g,f,v,T){var A=ue();try{Eo(u,c,g,f,v,T)}catch(B){if(oe(A),B!==B+0)throw B;le(1,0)}}function T0(u,c,g,f){var v=ue();try{zo(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function I0(u,c,g,f,v){var T=ue();try{To(u,c,g,f,v)}catch(A){if(oe(T),A!==A+0)throw A;le(1,0)}}function C0(u,c,g,f,v,T,A){var B=ue();try{No(u,c,g,f,v,T,A)}catch(V){if(oe(B),V!==V+0)throw V;le(1,0)}}function A0(u,c,g,f,v,T,A){var B=ue();try{Mo(u,c,g,f,v,T,A)}catch(V){if(oe(B),V!==V+0)throw V;le(1,0)}}function z0(u,c,g,f,v,T,A,B){var V=ue();try{Lo(u,c,g,f,v,T,A,B)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function O0(u,c,g,f,v){var T=ue();try{return Bo(u,c,g,f,v)}catch(A){if(oe(T),A!==A+0)throw A;le(1,0)}}function R0(u,c,g){var f=ue();try{return Vo(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;le(1,0)}}function B0(u,c,g,f,v,T,A,B){var V=ue();try{qo(u,c,g,f,v,T,A,B)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function N0(u,c,g,f,v,T,A,B,V,q,ie,pe){var ye=ue();try{Do(u,c,g,f,v,T,A,B,V,q,ie,pe)}catch(_e){if(oe(ye),_e!==_e+0)throw _e;le(1,0)}}function M0(u,c,g,f,v,T){var A=ue();try{return Po(u,c,g,f,v,T)}catch(B){if(oe(A),B!==B+0)throw B;le(1,0)}}function D0(u,c,g){var f=ue();try{return Wo(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;return le(1,0),0n}}function P0(u,c,g,f,v,T,A,B,V){var q=ue();try{Co(u,c,g,f,v,T,A,B,V)}catch(ie){if(oe(q),ie!==ie+0)throw ie;le(1,0)}}function U0(u){var c=ue();try{return Fo(u)}catch(g){if(oe(c),g!==g+0)throw g;le(1,0)}}function L0(u,c){var g=ue();try{return su(u,c)}catch(f){if(oe(g),f!==f+0)throw f;return le(1,0),0n}}function V0(u){var c=ue();try{return Go(u)}catch(g){if(oe(c),g!==g+0)throw g;return le(1,0),0n}}function q0(u,c,g,f){var v=ue();try{return Qo(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function W0(u,c,g,f,v){var T=ue();try{return Zo(u,c,g,f,v)}catch(A){if(oe(T),A!==A+0)throw A;le(1,0)}}function F0(u,c,g,f,v,T){var A=ue();try{return Jo(u,c,g,f,v,T)}catch(B){if(oe(A),B!==B+0)throw B;le(1,0)}}function G0(u,c,g,f,v,T){var A=ue();try{return eu(u,c,g,f,v,T)}catch(B){if(oe(A),B!==B+0)throw B;le(1,0)}}function H0(u,c,g,f,v,T,A,B){var V=ue();try{return Uo(u,c,g,f,v,T,A,B)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function j0(u,c,g,f,v){var T=ue();try{return tu(u,c,g,f,v)}catch(A){if(oe(T),A!==A+0)throw A;return le(1,0),0n}}function K0(u,c,g,f){var v=ue();try{return nu(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function X0(u,c,g,f){var v=ue();try{return ru(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function Y0(u,c,g,f,v,T,A,B,V,q,ie,pe){var ye=ue();try{return au(u,c,g,f,v,T,A,B,V,q,ie,pe)}catch(_e){if(oe(ye),_e!==_e+0)throw _e;le(1,0)}}function Q0(u,c,g,f,v,T,A,B,V,q,ie){var pe=ue();try{Xo(u,c,g,f,v,T,A,B,V,q,ie)}catch(ye){if(oe(pe),ye!==ye+0)throw ye;le(1,0)}}function Z0(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e,$t,aa){var nw=ue();try{Yo(u,c,g,f,v,T,A,B,V,q,ie,pe,ye,_e,$t,aa)}catch(sa){if(oe(nw),sa!==sa+0)throw sa;le(1,0)}}function J0(u,c,g){var f=ue();try{return Ho(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;le(1,0)}}function ew(u,c,g){var f=ue();try{return jo(u,c,g)}catch(v){if(oe(f),v!==v+0)throw v;le(1,0)}}function tw(u,c,g,f){var v=ue();try{Ko(u,c,g,f)}catch(T){if(oe(v),T!==T+0)throw T;le(1,0)}}function Jn(){if(0<ve)Be=Jn;else if(a)_?.(t),Q();else{for(var u=ge;0<u.length;)u.shift()(t);0<ve?Be=Jn:(t.calledRun=!0,C||(Q(),_?.(t)))}}return a||(ht=await ze(),Jn()),t.PTR_SIZE=4,P?t:new Promise((u,c)=>{_=u,k=c})}var sh,hu,Mw=L(()=>{sh=pu,hu=globalThis.self?.name?.startsWith("em-pthread"),hu&&pu()}),pa,hs,fu,Ue,ih,nr,mu,gu,ha,yu,fa,oh,ma,uh,Ps=L(()=>{Ds(),pa=typeof location>"u"?void 0:location.origin,hs=import.meta.url>"file:"&&import.meta.url<"file;",fu=()=>{{if(hs){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,pa).href}return import.meta.url}},Ue=fu(),ih=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},nr=(e,t)=>{try{let n=t??Ue;return(n?new URL(e,n):new URL(e)).origin===pa}catch{return!1}},mu=(e,t)=>{let n=t??Ue;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},gu=(e,t)=>`${t??"./"}${e}`,ha=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},yu=async e=>(await import(e)).default,fa=(Nw(),Nn(nh)).default,oh=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(nr(Ue))return[void 0,fa()];let e=await ha(Ue);return[e,fa(e)]},ma=(Mw(),Nn(ah)).default,uh=async(e,t,n,r)=>{let a=ma&&!(e||t);if(a)if(Ue)a=nr(Ue)||r&&!n;else if(r&&!n)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,ma];{let s="ort-wasm-simd-threaded.jsep.mjs",i=e??mu(s,t),o=n&&i&&!nr(i,t),l=o?await ha(i):i??gu(s,t);return[o?l:void 0,await yu(l)]}}}),ga,rr,yn,ya,wu,_u,bu,Us,we,Yt=L(()=>{Ps(),rr=!1,yn=!1,ya=!1,wu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},_u=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},bu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Us=async e=>{if(rr)return Promise.resolve();if(yn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ya)throw new Error("previous call to 'initializeWebAssembly()' failed.");yn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!bu())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!_u())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=wu();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,i=a?.mjs,o=i?.href??i,l=a?.wasm,d=l?.href??l,p=e.wasmBinary,[h,m]=await uh(o,s,n>1,!!p||!!d),y=!1,w=[];if(t>0&&w.push(new Promise(_=>{setTimeout(()=>{y=!0,_()},t)})),w.push(new Promise((_,k)=>{let $={numThreads:n};if(p)$.wasmBinary=p,$.locateFile=b=>b;else if(d||s)$.locateFile=b=>d??s+b;else if(o&&o.indexOf("blob:")!==0)$.locateFile=b=>new URL(b,o).href;else if(h){let b=ih();b&&($.locateFile=E=>b+E)}m($).then(b=>{yn=!1,rr=!0,ga=b,_(),h&&URL.revokeObjectURL(h)},b=>{yn=!1,ya=!0,k(b)})})),await Promise.race(w),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},we=()=>{if(rr&&ga)return ga;throw new Error("WebAssembly is not initialized yet.")}}),et,$r,me,Ls=L(()=>{Yt(),et=(e,t)=>{let n=we(),r=n.lengthBytesUTF8(e)+1,a=n._malloc(r);return n.stringToUTF8(e,a,r),t.push(a),a},$r=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([a,s])=>{let i=t?t+a:a;if(typeof s=="object")$r(s,i+".",n,r);else if(typeof s=="string"||typeof s=="number")r(i,s.toString());else if(typeof s=="boolean")r(i,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},me=e=>{let t=we(),n=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetLastError(a,a+r);let s=Number(t.getValue(a,r===4?"i32":"i64")),i=t.getValue(a+r,"*"),o=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),lh,Dw=L(()=>{Yt(),Ls(),lh=e=>{let t=we(),n=0,r=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=et(e.tag,r)),n=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),n===0&&me("Can't create run options."),e?.extra!==void 0&&$r(e.extra,"",new WeakSet,(i,o)=>{let l=et(i,r),d=et(o,r);t._OrtAddRunConfigEntry(n,l,d)!==0&&me(`Can't set a run config entry: ${i} - ${o}.`)}),[n,r]}catch(s){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(i=>t._free(i)),s}}}),vu,$u,xu,Nt,ku,dh,Pw=L(()=>{Yt(),Ls(),vu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},$u=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},xu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Nt=(e,t,n,r)=>{let a=et(t,r),s=et(n,r);we()._OrtAddSessionConfigEntry(e,a,s)!==0&&me(`Can't set a session config entry: ${t} - ${n}.`)},ku=async(e,t,n)=>{let r=t.executionProviders;for(let a of r){let s=typeof a=="string"?a:a.name,i=[];switch(s){case"webnn":if(s="WEBNN",Nt(e,"session.disable_quant_qdq","1",n),Nt(e,"session.disable_qdq_constant_folding","1",n),typeof a!="string"){let h=a?.deviceType;h&&Nt(e,"deviceType",h,n)}break;case"webgpu":if(s="JS",typeof a!="string"){let h=a;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);Nt(e,"preferredLayout",h.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=et(s,n),l=i.length,d=0,p=0;if(l>0){d=we()._malloc(l*we().PTR_SIZE),n.push(d),p=we()._malloc(l*we().PTR_SIZE),n.push(p);for(let h=0;h<l;h++)we().setValue(d+h*we().PTR_SIZE,i[h][0],"*"),we().setValue(p+h*we().PTR_SIZE,i[h][1],"*")}await we()._OrtAppendExecutionProvider(e,o,d,p,l)!==0&&me(`Can't append execution provider: ${s}.`)}},dh=async e=>{let t=we(),n=0,r=[],a=e||{};xu(a);try{let s=vu(a.graphOptimizationLevel??"all"),i=$u(a.executionMode??"sequential"),o=typeof a.logId=="string"?et(a.logId,r):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let p=typeof a.optimizedModelFilePath=="string"?et(a.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,i,!!a.enableProfiling,0,o,l,d,p),n===0&&me("Can't create session options."),a.executionProviders&&await ku(n,a,r),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Nt(n,"enableGraphCapture",a.enableGraphCapture.toString(),r)}if(a.freeDimensionOverrides)for(let[h,m]of Object.entries(a.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let y=et(h,r);t._OrtAddFreeDimensionOverride(n,y,m)!==0&&me(`Can't set a free dimension override: ${h} - ${m}.`)}return a.extra!==void 0&&$r(a.extra,"",new WeakSet,(h,m)=>{Nt(n,h,m,r)}),[n,r]}catch(s){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&me("Can't release session options."),r.forEach(i=>t._free(i)),s}}}),qt,mt,Wt,Or,xr,Vs,qs,fs,te=L(()=>{qt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},mt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return n>0?Math.ceil(r*n):void 0},Or=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},xr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",qs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",fs=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ws,ch=L(()=>{Ds(),Ws=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let l=Math.ceil(r/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let i=0;for(;;){let{done:o,value:l}=await a.read();if(o)break;let d=l.byteLength;new Uint8Array(s,i,d).set(l),i+=d}return new Uint8Array(s,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Su,Eu,Tu,Iu,Fs,Cu,de,yt=L(()=>{te(),Su=["V","I","W","E","F"],Eu=(e,t)=>{console.log(`[${Su[e]},${new Date().toISOString()}]${t}`)},Fs=(e,t)=>{Tu=e,Iu=t},Cu=(e,t)=>{let n=xr(e),r=xr(Tu);n>=r&&Eu(n,typeof t=="function"?t():t)},de=(...e)=>{Iu&&Cu(...e)}}),Au,sn,O,kr,ph,hh,fh,re=L(()=>{Au=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},sn=class{static calcShape(e,t,n=!1){let r=e.length,a=t.length;if(r===0)return t;if(a===0)return e;let s=Math.max(e.length,t.length),i=new Array(s);if(n){if(r<2||a<2)return;let o=Au.calcMatMulShape([e[r-2],e[r-1]],[t[a-2],t[a-1]]);if(o===void 0)return;[i[s-2],i[s-1]]=o}for(let o=n?3:1;o<=s;o++){let l=r-o<0?1:e[r-o],d=a-o<0?1:t[a-o];if(l!==d&&l>1&&d>1)return;let p=Math.max(l,d);if(l&&d)i[s-o]=Math.max(l,d);else{if(p>1)return;i[s-o]=0}}return i}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let a=1;a<=n;a++)if(e[n-a]!==1&&e[n-a]!==t[r-a])return!1;return!0}},O=class gr{static size(t){return gr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let a=new Array(r),s=r-1;for(;s>=0;){if(t[s]%n===0){a[s]=t[s]/n;break}if(n%t[s]!==0)throw new Error("cannot convert shape");a[s]=1,n/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return gr.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return gr.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let a=1;for(let s=n;s<r;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let a=n-3;a>=0;--a)r[a]=r[a+1]*t[a+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((a,s)=>a+n[s]+n[s+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,a)=>r===n[a])}},kr=class Cn{static adjustPoolAttributes(t,n,r,a,s,i){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<n.length-2;o++)o>=r.length?r.push(n[o+2]):r[o]=n[o+2];for(let o=0;o<r.length;o++)if(o<a.length){if(a[o]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let o=0;o<r.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<r.length*2;o++)if(o<i.length){if(i[o]<0)throw new Error("pad should be greater than or equal to 1")}else i.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(i[o]>=r[o]||i[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,a,s,i,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)Cn.adjustPadAndReturnShape(t[l+(i?1:2)],n[l],r[l],a[l],s,l,l+t.length-2,o)}}static computePoolOutputShape(t,n,r,a,s,i,o){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return Cn.computeShapeHelper(t,n,l,r,a,s,i,o),l}static computeConvOutputShape(t,n,r,a,s,i,o){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return Cn.computeShapeHelper(!1,t,l,r,a,s,i,o),l}static computeShapeHelper(t,n,r,a,s,i,o,l){if(t)for(let d=0;d<n.length-2;d++)r.push(1);else for(let d=0;d<n.length-2;d++)r.push(Cn.adjustPadAndReturnShape(n[d+2],a[d],s[d],i[d],o,d,d+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,a,s,i,o,l){let d=r*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[i]=0,s[o]=0,Math.floor((t-d)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+n-1)/n-1)*n+a-t;return s[i]=Math.floor(l==="SAME_LOWER"?(p+1)/2:p/2),s[o]=p-s[i],Math.floor((t+p-a)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[i]+s[o]-d)/n+1)}},ph=class{static getShapeOfGemmResult(e,t,n,r,a){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,i,o;t?(s=e[1],i=e[0]):(s=e[0],i=e[1]);let l=-1;if(r?(o=n[0],l=1):(o=n[1],l=0),n[l]!==i)throw new Error("dimension mismatch");if(s<=0||o<=0||i<=0)throw new Error("invalid shape specified");if(a&&!sn.isValidBroadcast(a,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,i]}},hh=-34028234663852886e22,fh=34028234663852886e22}),Gs,mh=L(()=>{te(),Gs=(e,t)=>new(Or(t))(e)}),wa,ms,_a,zu,ba,Ou,va,$a,xa,Ru,gh,Uw=L(()=>{te(),yt(),wa=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ms=(e,t)=>{if(t==="int32")return e;let n=wa.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let a=e.byteLength/r,s=new(Or(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let i=new Int32Array(a);for(let o=0;o<a;o++){let l=s[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");i[o]=Number(l)}return new Uint8Array(i.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let i=Int32Array.from(s,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},_a=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let a=BigInt64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(r.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(r.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(r,Number);return new Uint8Array(a.buffer)}case"uint8":{if(r.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(r,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},zu=1,ba=()=>zu++,Ou=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),va=(e,t)=>{let n=wa.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,a)=>r*a)*n/8):0},$a=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:a,shape:s,fallbackDataType:i}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=a,this.tensorShape=s,this.fallbackDataType=i}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return va(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=_a(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,a)=>r===n[a])}setIsDataConverted(e){this.isDataConverted=e}},xa=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let a=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),i;if(!s?.input.dataTypes.includes(t)){if(i=Ou.get(t),!i||s?.input.dataTypes.includes(i))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${i}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==va(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,o,!0,!0,i),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ms(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?_a(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ru=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ba();return this.tensorTrackersById.set(e,new xa(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,a){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,n,r,a)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let a=this.getMLContext(e),s=ba(),i=new $a({sessionId:e,context:a,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(s,new xa(this,i)),this.externalTensors.add(i),s}async getCachedTensor(e,t,n,r,a,s,i){let o=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(o,t,n)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${i?`fallbackDataType: ${i},`:""} shape: ${n}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${i?`fallbackDataType: ${i},`:""} shape: ${n}}`);let l=await o.createTensor({dataType:i??t,shape:n,dimensions:n,usage:r,writable:a,readable:s});return new $a({sessionId:e,context:o,tensor:l,dataType:t,shape:n,fallbackDataType:i})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},gh=(...e)=>new Ru(...e)}),wn,Bu,yh,Lw=L(()=>{te(),Yt(),mh(),Uw(),yt(),wn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Bu=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((a,s)=>a===r[s]&&e[a]===t[a])},yh=class{constructor(e){this.tensorManager=gh(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Fs(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>Bu(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(a=>a.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,a){let s=wn.get(n);if(!s)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,r,a)}async createTemporaryTensor(e,t,n){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=wn.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,r,n,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!we().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Gs(n,t)}}registerMLTensor(e,t,n,r){let a=wn.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);let s=this.tensorManager.registerTensor(e,t,a,r);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,n,r,a,s,i=!1){if(!s)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=s.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+n).buffer,p;switch(a.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=typeof Float16Array<"u"?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":if(i){let h=ms(new Uint8Array(d),"int64");p=new Int32Array(h.buffer),a.dataType="int32"}else p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${i?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(a,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=wn.get(qt(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!a?.input.dataTypes.includes(r):!!a?.output.dataTypes.includes(r)}flush(){}}}),Hs=L(()=>{}),ka,ar,sr,Nu,Mu,Sa,gs,Du,wh,Vw=L(()=>{yt(),Hs(),ka=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ar=[],sr=e=>Math.ceil(Number(e)/16)*16,Nu=e=>{for(let t=0;t<ar.length;t++){let n=ar[t];if(e<=n)return n}return Math.ceil(e/16)*16},Mu=1,Sa=()=>Mu++,gs=async(e,t,n,r)=>{let a=sr(n),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let i=e.getCommandEncoder();e.endComputePass(),i.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(o,0,n)),l}else return new Uint8Array(o.slice(0,n))}finally{s.destroy()}},Du=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ka)ar.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,a=t.byteLength,s=sr(a),i=this.storageCache.get(e);if(!i)throw new Error("gpu data for uploading does not exist");if(Number(i.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${i.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,a)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,i.gpuData.buffer,0,s),this.backend.device.queue.submit([d.finish()]),o.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=sr(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,a)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Sa();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Nu(e),r,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let o=(a?this.freeBuffers:this.freeUniformBuffers).get(n);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let i={id:Sa(),type:0,buffer:r};return this.storageCache.set(i.id,{gpuData:i,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${i.id}`),i}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await gs(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ka.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},wh=(...e)=>new Du(...e)}),Pu,fe,Se=L(()=>{Pu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Pu(e)}),on,ir,Ie,Re,X,ke,ys,an,Ct,K,_n,N,H,_h,js,Uu,bh,ae=L(()=>{te(),re(),on=64,ir=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ie=(e,t=1)=>{let n=ir(e,t);return typeof n=="string"?n:n[0]},Re=(e,t=1)=>{let n=ir(e,t);return typeof n=="string"?n:n[1]},X=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:O.computeStrides(n)})}),t},ke=e=>e%4===0?4:e%2===0?2:1,ys=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,an=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Ct=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,_n=(e,t,n,r,a)=>{let s=typeof n=="number",i=s?n:n.length,o=[...new Array(i).keys()],l=i<2?"u32":i<=4?`vec${i}<u32>`:`array<u32, ${i}>`,d=ir(t,a),p=typeof d=="string"?d:d[1],h=typeof d=="string"?d:d[0],m={indices:l,value:p,storage:h,tensor:t},y=P=>typeof P=="string"?P:`${P}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=s?"uniforms.":"",k=`${_}${e}_shape`,$=`${_}${e}_strides`,b="";for(let P=0;P<i-1;P++)b+=`
    let dim${P} = current / ${K($,P,i)};
    let rest${P} = current % ${K($,P,i)};
    indices[${P}] = dim${P};
    current = rest${P};
    `;b+=`indices[${i-1}] = current;`;let E=i<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=P=>(w.offsetToIndices=!0,i<2?P:`o2i_${e}(${P})`),I=[];if(i>=2)for(let P=i-1;P>=0;P--)I.push(`${K($,P,i)} * (indices[${P}])`);let C=i<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,z=P=>(w.indicesToOffset=!0,i<2?P:`i2o_${e}(${P})`),x=(...P)=>i===0?"0u":`${m.indices}(${P.map(y).join(",")})`,M=(P,Z)=>i<2?`${P}`:`${K(P,Z,i)}`,U=(P,Z,Q)=>i<2?`${P}=${Q};`:`${K(P,Z,i)}=${Q};`,Y={},G=(P,Z)=>{w.broadcastedIndicesToOffset=!0;let Q=`${Z.name}broadcastedIndicesTo${e}Offset`;if(Q in Y)return`${Q}(${P})`;let W=[];for(let Te=i-1;Te>=0;Te--){let ze=Z.indicesGet("outputIndices",Te+Z.rank-i);W.push(`${M($,Te)} * (${ze} % ${M(k,Te)})`)}return Y[Q]=`fn ${Q}(outputIndices: ${Z.type.indices}) -> u32 {
             return ${W.length>0?W.join("+"):"0u"};
           }`,`${Q}(${P})`},j=(P,Z)=>(()=>{if(m.storage===m.value)return`${e}[${P}]=${Z};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${P}]=vec2<u32>(u32(${Z}), select(0u, 0xFFFFFFFFu, ${Z} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${P}]=vec2<u32>(u32(${Z}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${P}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Z}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),R=P=>(()=>{if(m.storage===m.value)return`${e}[${P}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${P}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${P}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${P}] & 0xFFu), bool(${e}[${P}] & 0xFF00u), bool(${e}[${P}] & 0xFF0000u), bool(${e}[${P}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),D=i<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${p} {
    return ${R(`i2o_${e}(indices)`)};
  }`,F=i<2?"":(()=>{let P=o.map(Q=>`d${Q}: u32`).join(", "),Z=o.map(Q=>`d${Q}`).join(", ");return`
  fn get_${e}(${P}) -> ${p} {
    return get_${e}ByIndices(${x(Z)});
  }`})(),J=(...P)=>{if(P.length!==i)throw new Error(`indices length must be ${i}`);let Z=P.map(y).join(",");return i===0?R("0u"):i===1?R(Z[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${Z})`)},ee=P=>i<2?R(P):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${P})`),ne=i<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${p}) {
    ${j(`i2o_${e}(indices)`,"value")}
  }`,se=i<2?"":(()=>{let P=o.map(Q=>`d${Q}: u32`).join(", "),Z=o.map(Q=>`d${Q}`).join(", ");return`
  fn set_${e}(${P}, value: ${p}) {
    set_${e}ByIndices(${x(Z)}, value);
  }`})();return{impl:()=>{let P=[],Z=!1;return w.offsetToIndices&&(P.push(E),Z=!0),w.indicesToOffset&&(P.push(C),Z=!0),w.broadcastedIndicesToOffset&&(Object.values(Y).forEach(Q=>P.push(Q)),Z=!0),w.set&&(P.push(se),Z=!0),w.setByIndices&&(P.push(ne),Z=!0),w.get&&(P.push(F),Z=!0),w.getByIndices&&(P.push(D),Z=!0),!s&&Z&&P.unshift(`const ${k} = ${m.indices}(${n.join(",")});`,`const ${$} = ${m.indices}(${O.computeStrides(n).join(",")});`),P.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:z,broadcastedIndicesToOffset:G,indices:x,indicesGet:M,indicesSet:U,set:(...P)=>{if(P.length!==i+1)throw new Error(`indices length must be ${i}`);let Z=P[i];if(typeof Z!="string")throw new Error("value must be string");let Q=P.slice(0,i).map(y).join(",");return i===0?j("0u",Z):i===1?j(Q[0],Z):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${Q}, ${Z})`)},setByOffset:j,setByIndices:(P,Z)=>i<2?j(P,Z):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${P}, ${Z});`),get:J,getByOffset:R,getByIndices:ee,usage:r,name:e,strides:$,shape:k,rank:i}},N=(e,t,n,r=1)=>_n(e,t,n,"input",r),H=(e,t,n,r=1)=>_n(e,t,n,"output",r),_h=(e,t,n)=>_n(e,t,n,"atomicOutput",1),js=(e,t,n,r=1)=>_n(e,t,n,"internal",r),Uu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=on){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,i=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${s}) {
    ${i}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let a=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},bh=(e,t)=>new Uu(e,t)}),Lu,Ea,Vu,qu,Wu,Fu,qe,vh,$h,zt=L(()=>{te(),re(),Se(),ae(),Lu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ea=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Vu=(e,t)=>O.sortBasedOnPerm(e,Ea(e.length,t)),qu=(e,t,n,r)=>{let a=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let s=0;s<t;++s)a+=`a[${e[s]}]=i[${s}];`;return a+="return a;}"},Wu=(e,t)=>{let n=[],r=[];for(let a=0;a<e.length;++a)e[a]!==1&&n.push(e[a]),e[t[a]]!==1&&r.push(t[a]);return{newShape:n,newPerm:r}},Fu=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},qe=(e,t)=>{let n=e.dataType,r=e.dims.length,a=Ea(r,t),s=Vu(e.dims,a),i=e.dims,o=s,l=r<2||Fu(a,e.dims),d;if(l)return d=w=>{let _=N("input",n,i,4),k=H("output",n,o,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,k)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=O.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:d};let{newShape:p,newPerm:h}=Wu(e.dims,a),m=O.areEqual(h,[2,3,1]),y=O.areEqual(h,[3,1,2]);if(p.length===2||m||y){i=m?[p[0],p[1]*p[2]]:y?[p[0]*p[1],p[2]]:p,o=[i[1],i[0]];let w=16;return d=_=>{let k=N("a",n,i.length),$=H("output",n,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(k,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${w+1}>, ${w}>;
  ${_.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${k.getByIndices(`${k.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/w),y:Math.ceil(o[0]/w)},programUniforms:[{type:12,data:_},...X(i,o)]}},getShaderSource:d}}return d=w=>{let _=N("a",n,i.length),k=H("output",n,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,k)}

  ${qu(a,r,_,k)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=O.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...X(i,o)]}},getShaderSource:d}},vh=(e,t)=>{Lu(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},$h=e=>fe({perm:e.perm})}),Gu,Hu,ju,Ku,Xu,Yu,Qu,Zu,Ju,el,Ke,xh,kh,Sh,Eh,Th,Ih,Ch,Ah,zh,Oh,qw=L(()=>{te(),re(),ae(),Ks(),zt(),Gu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Hu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ju={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ku={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Xu=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Yu=(e,t)=>{let n=[],r=e.length;for(let s=0;s<r;s++)t.indexOf(s)===-1&&n.push(e[s]);let a=t.map(s=>e[s]);return[n,a]},Qu=(e,t)=>{let n=e.length+t.length,r=[],a=0;for(let s=0;s<n;s++)t.indexOf(s)===-1?r.push(e[a++]):r.push(1);return r},Zu=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Ju=(e,t)=>{let n=[];if(!Zu(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},el=(e,t,n,r,a,s,i)=>{let o=n[0].dims,l=O.size(s),d=O.size(i),p=N("_A",n[0].dataType,o),h=H("output",a,s),m=64;l===1&&(m=256);let y=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,w=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(p,h)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ju[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${Gu[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Hu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${Ku[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},Ke=(e,t,n,r)=>{let a=e.inputs.length===1?n:ws(e.inputs,n),s=a.axes;s.length===0&&!a.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,w)=>w));let i=O.normalizeAxes(s,e.inputs[0].dims.length),o=i,l=e.inputs[0],d=Ju(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute(qe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=Xu(o.length,l.dims.length));let[p,h]=Yu(l.dims,o),m=p;a.keepDims&&(m=Qu(p,i)),e.compute(el(t,a.cacheKey,[l],r,e.inputs[0].dataType,m,h),{inputs:[l]})},xh=(e,t)=>{Ke(e,"ReduceMeanShared",t,"mean")},kh=(e,t)=>{Ke(e,"ReduceL1Shared",t,"l1")},Sh=(e,t)=>{Ke(e,"ReduceL2Shared",t,"l2")},Eh=(e,t)=>{Ke(e,"ReduceLogSumExpShared",t,"logSumExp")},Th=(e,t)=>{Ke(e,"ReduceMaxShared",t,"max")},Ih=(e,t)=>{Ke(e,"ReduceMinShared",t,"min")},Ch=(e,t)=>{Ke(e,"ReduceProdShared",t,"prod")},Ah=(e,t)=>{Ke(e,"ReduceSumShared",t,"sum")},zh=(e,t)=>{Ke(e,"ReduceSumSquareShared",t,"sumSquare")},Oh=(e,t)=>{Ke(e,"ReduceLogSumShared",t,"logSum")}}),Xe,tl,Sr,ws,Ye,nl,rl,al,sl,il,ol,ul,ll,dl,cl,Qe,Rh,Bh,Nh,Mh,Dh,Ph,Uh,Lh,Vh,qh,Ks=L(()=>{te(),re(),Se(),ae(),qw(),Xe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},tl=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Sr=(e,t,n,r,a,s,i=!1,o=!1)=>{let l=[],d=n[0].dims,p=d.length,h=O.normalizeAxes(a,p),m=!o&&h.length===0;d.forEach((_,k)=>{m||h.indexOf(k)>=0?i&&l.push(1):l.push(_)});let y=l.length,w=O.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let k=[],$=N("_A",n[0].dataType,p),b=H("output",s,y),E=r($,b,h),S=E[2];for(let I=0,C=0;I<p;I++)m||h.indexOf(I)>=0?(i&&C++,S=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${E[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${S}
                }`):(k.push(`${$.indicesSet("input_indices",I,b.indicesGet("output_indices",C))};`),C++);return`

        ${_.registerUniform("output_size","u32").declareVariables($,b)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${k.join(`
`)}
          ${E[0]}       // init ops for reduce max/min
          ${E[1]}
          ${S}
          ${E[3]}
          ${E.length===4?b.setByOffset("global_idx","value"):E.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...X(d,l)]})}},ws=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),fe({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ye=(e,t,n,r)=>{let a=e.inputs,s=a.length===1?n:ws(a,n);e.compute(Sr(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&s.axes.length===0?tl:r,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},nl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},rl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},al=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},sl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},il=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMax",t,(n,r,a)=>{let s=[];for(let i=0;i<n.rank;i++)(a.indexOf(i)>=0||a.length===0)&&s.push(n.indicesSet("input_indices",i,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},ol=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMean",t,(n,r,a)=>{let s=1;for(let i=0;i<n.rank;i++)(a.indexOf(i)>=0||a.length===0)&&(s*=e.inputs[0].dims[i]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${s});`]})},ul=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMin",t,(n,r,a)=>{let s=[];for(let i=0;i<n.rank;i++)(a.indexOf(i)>=0||a.length===0)&&s.push(`input_indices[${i}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},ll=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},dl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},cl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Qe=(e,t,n)=>{if(t.length===0)return n;let r=1,a=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?r*=e[s]:a*=e[s];return a<32&&r>1024},Rh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ol(e,t):xh(e,t)},Bh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rl(e,t):kh(e,t)},Nh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?al(e,t):Sh(e,t)},Mh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sl(e,t):Eh(e,t)},Dh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?il(e,t):Th(e,t)},Ph=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ul(e,t):Ih(e,t)},Uh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ll(e,t):Ch(e,t)},Lh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dl(e,t):Ah(e,t)},Vh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cl(e,t):zh(e,t)},qh=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nl(e,t):Oh(e,t)}}),Ta,Wh,Fh,_s,Ww=L(()=>{te(),Se(),Ks(),Ta=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Wh=(e,t)=>{Ta(e.inputs);let n=(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(`input_indices[${o}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Sr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Fh=(e,t)=>{Ta(e.inputs);let n=(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(`input_indices[${o}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Sr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},_s=e=>fe(e)}),pl,or,hl,fl,ml,Mn,gl,Gh,Xs=L(()=>{te(),re(),Hs(),ae(),pl=(e,t)=>{let n=e[0],r=e[1],a=e[2],s=e[3],i=e[4],o=e[5];if(i&&o)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],d=n.dims[1],p=n.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=a.dims[0]/3,m=h,y=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let E of t.qkvHiddenSizes)if(E%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let w=d;if(h!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==h+m+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(i){if(m!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(i.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(i.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(i.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(i.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(i.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=i.dims[3])}let k=w+_,$=-1,b=0;if(s)throw new Error("Mask not supported");if(i)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:w,totalSequenceLength:k,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:h,vHiddenSize:y,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},or=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,hl=(e,t,n,r,a,s,i,o)=>{let l=ke(i?1:s),d=64,p=s/l;p<d&&(d=32);let h=Math.ceil(s/l/d),m=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:p},{type:12,data:h}],y=Ie(e.dataType,l),w=Re(1,l),_=["type"];i&&_.push("type"),o&&_.push("type");let k=$=>{let b=H("x",e.dataType,e.dims,l),E=[b],S=i?N("seq_lens",i.dataType,i.dims):void 0;S&&E.push(S);let I=o?N("total_sequence_length_input",o.dataType,o.dims):void 0;I&&E.push(I);let C=Re(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(z).declareVariables(...E)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${or(S,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${i?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${i?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${l}`,inputDependencies:_},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*n},programUniforms:m})}},fl=(e,t,n,r,a,s,i,o,l)=>{let d=i+s.kvSequenceLength,p=[s.batchSize,s.numHeads,s.sequenceLength,d],h=e>1&&r,m=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=h?[s.batchSize,m,d,s.headSize]:void 0,w=s.nReps?s.nReps:1,_=s.scale===0?1/Math.sqrt(s.headSize):s.scale,k=ke(s.headSize),$=s.headSize/k,b=12,E={x:Math.ceil(d/b),y:Math.ceil(s.sequenceLength/b),z:s.batchSize*s.numHeads},S=[{type:12,data:s.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:_},{type:12,data:i},{type:12,data:s.kvSequenceLength},{type:12,data:w}],I=h&&r&&O.size(r.dims)>0,C=["type","type"];I&&C.push("type"),a&&C.push("type"),o&&C.push("type"),l&&C.push("type");let z=[{dims:p,dataType:t.dataType,gpuDataType:0}];h&&z.push({dims:y,dataType:t.dataType,gpuDataType:0});let x=M=>{let U=N("q",t.dataType,t.dims,k),Y=N("key",n.dataType,n.dims,k),G=[U,Y];if(I){let ne=N("past_key",r.dataType,r.dims,k);G.push(ne)}a&&G.push(N("attention_bias",a.dataType,a.dims));let j=o?N("seq_lens",o.dataType,o.dims):void 0;j&&G.push(j);let R=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;R&&G.push(R);let D=H("output",t.dataType,p),F=[D];h&&F.push(H("present_key",t.dataType,y,k));let J=Re(1,k),ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${U.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${U.type.storage}, ${b*b}>;
  ${M.registerUniforms(ee).declareVariables(...G,...F)}
  ${M.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${or(j,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${D.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${a!==void 0};${r!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:z,dispatchGroup:E,programUniforms:S}),getShaderSource:x}},ml=(e,t,n,r,a,s,i=void 0,o=void 0)=>{let l=s+a.kvSequenceLength,d=a.nReps?a.nReps:1,p=a.vHiddenSize*d,h=e>1&&r,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=h?[a.batchSize,m,l,a.headSize]:void 0,w=[a.batchSize,a.sequenceLength,p],_=12,k={x:Math.ceil(a.vHeadSize/_),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},$=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:p},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:d}],b=h&&r&&O.size(r.dims)>0,E=["type","type"];b&&E.push("type"),i&&E.push("type"),o&&E.push("type");let S=[{dims:w,dataType:t.dataType,gpuDataType:0}];h&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=C=>{let z=N("probs",t.dataType,t.dims),x=N("v",n.dataType,n.dims),M=[z,x];b&&M.push(N("past_value",r.dataType,r.dims));let U=i?N("seq_lens",i.dataType,i.dims):void 0;i&&M.push(U);let Y=o?N("total_sequence_length_input",o.dataType,o.dims):void 0;o&&M.push(Y);let G=[H("output",t.dataType,w)];h&&G.push(H("present_value",t.dataType,y));let j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${z.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${z.type.value}, ${_*_}>;
  ${C.registerUniforms(j).declareVariables(...M,...G)}
  ${C.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${or(U,Y,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:S,dispatchGroup:k,programUniforms:$}),getShaderSource:I}},Mn=(e,t,n,r,a,s,i,o,l,d,p=void 0,h=void 0)=>{let m=Math.min(e.outputCount,1+(i?1:0)+(o?1:0)),y=m>1?i:void 0,w=m>1?o:void 0,_=m>1?d.pastSequenceLength:0,k=_+d.kvSequenceLength,$=l&&O.size(l.dims)>0?l:void 0,b=[t,n];y&&O.size(y.dims)>0&&b.push(y),$&&b.push($),p&&b.push(p),h&&b.push(h);let E=e.compute(fl(m,t,n,y,$,d,_,p,h),{inputs:b,outputs:m>1?[-1,1]:[-1]})[0];e.compute(hl(E,d.batchSize,d.numHeads,_,d.sequenceLength,k,p,h),{inputs:p&&h?[E,p,h]:[E],outputs:[]});let S=[E,r];w&&O.size(w.dims)>0&&S.push(w),p&&S.push(p),h&&S.push(h),e.compute(ml(m,E,r,w,d,_,p,h),{inputs:S,outputs:m>1?[0,2]:[0]})},gl=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,a=t.inputHiddenSize,s=t.headSize,i=12,o={x:Math.ceil(t.headSize/i),y:Math.ceil(t.sequenceLength/i),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=h=>{let m=H("output_q",l[0].dataType,n),y=H("output_k",l[0].dataType,n),w=H("output_v",l[0].dataType,n),_=N("input",l[0].dataType,l[0].dims),k=N("weight",l[1].dataType,l[1].dims),$=N("bias",l[2].dataType,l[2].dims),b=_.type.storage,E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${i}u;
  var<workgroup> tileInput: array<${b}, ${i*i}>;
  var<workgroup> tileWeightQ: array<${b}, ${i*i}>;
  var<workgroup> tileWeightK: array<${b}, ${i*i}>;
  var<workgroup> tileWeightV: array<${b}, ${i*i}>;
  ${h.registerUniforms(E).declareVariables(_,k,$,m,y,w)}
  ${h.mainStart([i,i,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},Gh=(e,t)=>{let n=pl(e.inputs,t),[r,a,s]=gl(e,n);return Mn(e,r,a,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),yl,wl,_l,Hh,Fw=L(()=>{He(),te(),re(),Se(),ae(),yl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,a,s)=>{let i=a.length;if(i!==r.length)throw new Error(`${s}: num dimensions != ${i}`);a.forEach((o,l)=>{if(o!==r[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},wl=(e,t)=>{let{epsilon:n,spatial:r,format:a}=t,s=e[0].dims,i=r?ke(s[s.length-1]):1,o=a==="NHWC"&&s.length>1?i:1,l=O.size(s)/i,d=r,p=d?s.length:s,h=N("x",e[0].dataType,e[0].dims,i),m=N("scale",e[1].dataType,e[1].dims,o),y=N("bias",e[2].dataType,e[2].dims,o),w=N("inputMean",e[3].dataType,e[3].dims,o),_=N("inputVar",e[4].dataType,e[4].dims,o),k=H("y",e[0].dataType,p,i),$=()=>{let E="";if(r)E=`let cOffset = ${s.length===1?"0u":a==="NHWC"?`outputIndices[${s.length-1}] / ${i}`:"outputIndices[1]"};`;else if(a==="NCHW")E=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{E=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let S=1;S<m.rank;S++)E+=`cIndices[${S}] = outputIndices[${S}];`;E+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return E},b=E=>`
  const epsilon = ${n};
  ${E.registerUniform("outputSize","u32").declareVariables(h,m,y,w,_,k)}
  ${E.mainStart()}
  ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${i}`)};
    ${$()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${i}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...X(s)]:[{type:12,data:l}]})}},_l=e=>fe(e),Hh=(e,t)=>{let{inputs:n,outputCount:r}=e,a=_l({...t,outputCount:r});if(be.webgpu.validateInputContent&&yl(n,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(wl(n,a))}}),bl,vl,jh,Gw=L(()=>{re(),ae(),bl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},vl=e=>{let t=e[0].dims,n=e[0].dims[2],r=O.size(t)/4,a=e[0].dataType,s=N("input",a,t,4),i=N("bias",a,[n],4),o=N("residual",a,t,4),l=H("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(s,i,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${s.getByOffset("global_idx")}
      + ${i.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},jh=e=>{bl(e.inputs),e.compute(vl(e.inputs))}}),$l,he,Kh,Xh,Yh,Qh,Zh,Jh,ef,tf,nf,xl,rf,af,sf,of,An,uf,yr,lf,df,cf,pf,hf,ff,mf,gf,yf,wf,_f,bf,vf,$f,xf,kf,Ia,Sf,bs,vs,Ef,Tf,If,kl,Sl,Cf,Ys=L(()=>{te(),re(),Se(),ae(),$l=(e,t,n,r,a,s,i)=>{let o=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let d=N("inputData",n,[o],4),p=H("outputData",r,[o],4),h=[{name:"vec_size",type:"u32"}];return i&&h.push(...i),`
      ${e.registerUniforms(h).declareVariables(d,p)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},he=(e,t,n,r,a,s=e.dataType,i,o)=>{let l=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return i&&l.push(...i),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>$l(d,O.size(e.dims),e.dataType,s,n,r,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(O.size(d[0].dims)/64/4)},programUniforms:l})}},Kh=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},Xh=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},Yh=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},Qh=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},Zh=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},Jh=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},ef=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},tf=e=>fe(e),nf=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},xl=e=>{let t,n,r=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:n})},rf=(e,t)=>{let n=t||xl(e.inputs),r=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},af=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},sf=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},of=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},An=e=>fe(e),uf=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},yr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,lf=e=>{let t=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,yr(t)))},df=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},cf=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},pf=e=>{let t=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,yr(t)))},hf=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},ff=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},mf=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},gf=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},yf=e=>{let t=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},wf=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},_f=e=>fe(e),bf=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},vf=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},$f=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},xf=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},kf=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},Ia=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Sf=e=>{e.compute(he(e.inputs[0],"Tanh",Ia))},bs=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ia("v")};
}
`,vs=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ef=e=>{let t=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",vs,bs(t),void 0,e.inputs[0].dataType))},Tf=(e,t)=>{let n=Re(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},If=e=>{e.compute(he(e.inputs[0],"Log","log"))},kl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Sl=e=>`quick_gelu_impl(${e})`,Cf=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",Sl,kl(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),El,Tl,Af,Hw=L(()=>{re(),ae(),Ys(),El=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Tl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=N("input",e[0].dataType,e[0].dims,4),r=N("bias",e[0].dataType,[e[0].dims[2]],4),a=H("output",e[0].dataType,t,4),s=O.size(t)/4,i=Ie(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(n,r,a)}

  ${yr(i)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Af=e=>{El(e.inputs),e.compute(Tl(e.inputs))}}),Il,Cl,Ze,zf,Of,Rf,Bf,Nf,Mf,Df,Pf,Uf,Lf,jw=L(()=>{te(),re(),ae(),Il=(e,t,n,r,a,s,i,o,l,d,p,h)=>{let m,y;typeof o=="string"?m=y=(b,E)=>`${o}((${b}),(${E}))`:typeof o=="function"?m=y=o:(m=o.scalar,y=o.vector);let w=H("outputData",p,r.length,4),_=N("aData",l,t.length,4),k=N("bData",d,n.length,4),$;if(a)if(s){let b=O.size(t)===1,E=O.size(n)===1,S=t.length>0&&t[t.length-1]%4===0,I=n.length>0&&n[n.length-1]%4===0;b||E?$=w.setByOffset("global_idx",y(b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),E?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):$=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",y(i||S?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,i||I?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=w.setByOffset("global_idx",y(_.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(E,S,I="")=>{let C=`aData[indexA${S}][componentA${S}]`,z=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${w.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${_.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let offsetB${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${E}[${S}] = ${I}(${m(C,z)});
          `};p===9?$=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,k,w)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Cl=(e,t,n,r,a,s,i=n.dataType)=>{let o=n.dims.map(Number),l=r.dims.map(Number),d=!O.areEqual(o,l),p=o,h=O.size(o),m=!1,y=!1,w=[d];if(d){let _=sn.calcShape(o,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");p=_.slice(),h=O.size(p);let k=O.size(o)===1,$=O.size(l)===1,b=o.length>0&&o[o.length-1]%4===0,E=l.length>0&&l[l.length-1]%4===0;w.push(k),w.push($),w.push(b),w.push(E);let S=1;for(let I=1;I<p.length;I++){let C=o[o.length-I],z=l[l.length-I];if(C===z)S*=C;else break}S%4===0?(y=!0,m=!0):(k||$||b||E)&&(m=!0)}else m=!0;return w.push(m),{name:e,shaderCache:{hint:t+w.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Il(_,o,l,p,m,d,y,a,n.dataType,r.dataType,i,s),getRunData:()=>({outputs:[{dims:p,dataType:i}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(p)/4)},...X(o,l,p)]})}},Ze=(e,t,n,r,a,s)=>{e.compute(Cl(t,a??"",e.inputs[0],e.inputs[1],n,r,s))},zf=e=>{Ze(e,"Add",(t,n)=>`${t}+${n}`)},Of=e=>{Ze(e,"Div",(t,n)=>`${t}/${n}`)},Rf=e=>{Ze(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Bf=e=>{Ze(e,"Mul",(t,n)=>`${t}*${n}`)},Nf=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Mf=e=>{Ze(e,"Sub",(t,n)=>`${t}-${n}`)},Df=e=>{Ze(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Pf=e=>{Ze(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Uf=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Lf=e=>{Ze(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Al,zl,Ol,Rl,Vf,qf,Kw=L(()=>{te(),re(),Se(),ae(),Al=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],a=r.dataType,s=r.dims.length;e.forEach((i,o)=>{if(o!==n){if(i.dataType!==a)throw new Error("input tensors should be one type");if(i.dims.length!==s)throw new Error("input tensors should have the same shape");i.dims.forEach((l,d)=>{if(d!==t&&l!==r.dims[d])throw new Error("non concat dimensions must match")})}})},zl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ol=(e,t)=>{let n=e.length,r=[];for(let a=0;a<n;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));n===1?r.push(s):a===0?r.push(`if (inputIndex == ${a}u) { ${s} }`):a===n-1?r.push(`else { ${s} }`):r.push(`else if (inputIndex == ${a}) { ${s} }`)}return r.join(`
`)},Rl=(e,t,n,r)=>{let a=O.size(n),s=new Array(e.length),i=new Array(e.length),o=0,l=[],d=[],p=[{type:12,data:a}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],s[_]=o,d.push(e[_].dims.length),i[_]=N(`input${_}`,r,d[_]),l.push("rank"),p.push({type:12,data:s[_]});for(let _=0;_<e.length;++_)p.push(...X(e[_].dims));p.push(...X(n));let h=H("output",r,n.length),m=h.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),w=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)_.registerUniform(`sizeInConcatAxis${k}`,"u32");return _.declareVariables(...i,h)})()}

  ${zl(s.length,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ol(i,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:w}},Vf=(e,t)=>{let n=e.inputs,r=n[0].dims,a=O.normalizeAxis(t.axis,r.length);Al(n,a);let s=r.slice();s[a]=n.reduce((o,l)=>o+(l.dims.length>a?l.dims[a]:0),0);let i=n.filter(o=>O.size(o.dims)>0);e.compute(Rl(i,a,s,n[0].dataType),{inputs:i})},qf=e=>fe({axis:e.axis})}),jt,Kt,Xt,Qs,Qt=L(()=>{te(),re(),jt=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Kt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Xt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Qs=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[hh,fh];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ae,Wf,Zs=L(()=>{Ae=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Wf=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Ff,Xw=L(()=>{Ff=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Rn,Js,ei=L(()=>{te(),re(),ae(),Qt(),Rn=(e,t,n,r,a)=>{let s=r-n;return`
      ${Array.from({length:n}).map((i,o)=>`
      if (${K(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,K(a,o+s,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Js=(e,t,n,r,a=!1,s)=>{let i=e[0].dims,o=e[1].dims,l=i[i.length-2],d=o[o.length-1],p=i[i.length-1],h=ke(d),m=ke(p),y=ke(l),w=O.size(n)/h/y,_=e.length>2,k=r?r.slice(0,-2):n.slice(0,-2),$=[O.size(k),l,d],b=[{type:12,data:w},{type:12,data:l},{type:12,data:d},{type:12,data:p}];Kt(t,b),b.push(...X(k,i,o)),_&&b.push(...X(e[2].dims)),b.push(...X($));let E=S=>{let I=js("batch_dims",e[0].dataType,k.length),C=N("a",e[0].dataType,i.length,m),z=N("b",e[1].dataType,o.length,h),x=H("output",e[0].dataType,$.length,h),M=Ie(x.type.tensor),U=jt(t,x.type.value,M),Y=[C,z],G="";if(_){let D=a?h:1;Y.push(N("bias",e[2].dataType,e[2].dims.length,D)),G=`${a?`value += bias[col / ${D}];`:`value += ${x.type.value}(bias[row + i]);`}`}let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Xt(t,j);let R=()=>{let D=`var a_data: ${C.type.value};`;for(let F=0;F<m;F++)D+=`
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${h}];`;for(let F=0;F<y;F++){D+=`a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${m}];`;for(let J=0;J<m;J++)D+=`
            values[${F}] = fma(${z.type.value}(a_data${m===1?"":`[${J}]`}), b_data${J}, values[${F}]);
`}return D};return`
  ${S.registerUniforms(j).registerInternalVariables(I).declareVariables(...Y,x)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${Rn("a_indices",C,C.rank-2,I.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${Rn("b_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${R()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${G}
      ${U}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${m};${y};${a}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:b}),getShaderSource:E}}}),Bl,Nl,$s,Ca,Ml,xs,Dl,Er,ti=L(()=>{te(),re(),ae(),Qt(),ei(),Zs(),Bl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Nl=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,$s=(e,t,n="f32",r,a=!1,s=32,i=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=a?l:s,h=a?s:l,m=p/t[0],y=s/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&p%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${n}>, ${p/m}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${i?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${i?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${i?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Bl(a,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Nl(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ca=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Ml=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",xs=(e,t,n="f32",r,a=!1,s=32,i=!1,o=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],h=a?d:s,m=a?s:d;if(!(m%t[1]===0&&h%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=m/t[1],w=h/t[0],_=s/t[1],k=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ca(a,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ca(a,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Ml(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${p}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${i?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${i?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${i?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Dl=(e,t,n,r,a=!1)=>{let[s,i,o,l]=r,d=Ie(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ae(e,d)} {
      var value = ${Ae(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${i.type.indices};
        ${Rn("aIndices",i,i.rank-2,s.rank,"batchIndices")}
        ${i.indicesSet("aIndices",i.rank-2,"u32(row)")}
        ${i.indicesSet("aIndices",i.rank-1,"u32(colIn)")}
        value = ${i.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ae(e,d)} {
      var value = ${Ae(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Rn("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ae(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ae(e,d)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Er=(e,t,n,r,a=!1,s)=>{let i=e[0].dims,o=e[1].dims,l=i.slice(0,-2),d=o.slice(0,-2),p=r?r.slice(0,-2):n.slice(0,-2),h=O.size(p),m=i[i.length-2],y=i[i.length-1],w=o[o.length-1],_=y%4===0&&w%4===0,k=m<=8?[4,1,1]:[4,4,1],$=[8,8,1],b=[Math.ceil(w/$[0]/k[0]),Math.ceil(m/$[1]/k[1]),Math.ceil(h/$[2]/k[2])],E=_?4:1,S=[...l,m,y/E],I=S.length,C=[...d,y,w/E],z=C.length,x=[h,m,w/E],M=[{type:6,data:m},{type:6,data:w},{type:6,data:y}];Kt(t,M),M.push(...X(p,S,C));let U=["rank","rank"],Y=e.length>2;Y&&(M.push(...X(e[2].dims)),U.push("rank")),M.push(...X(x));let G=j=>{let R=p.length,D=js("batchDims",e[0].dataType,R,1),F=Ie(e[0].dataType),J=N("a",e[0].dataType,I,E),ee=N("b",e[1].dataType,z,E),ne=H("result",e[0].dataType,x.length,E),se=[J,ee];if(Y){let Te=a?E:1;se.push(N("bias",e[2].dataType,e[2].dims.length,Te))}let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Xt(t,P);let Z=Ie(ne.type.tensor),Q=jt(t,ne.type.value,Z),W=Dl(E,Y,Q,[D,J,ee,ne],a);return`
  ${j.registerUniforms(P).registerInternalVariables(D).declareVariables(...se,ne)}
  ${W}
  ${_?$s(k,$,F,D):xs(k,$,F,D)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${_};${a}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:M}),getShaderSource:G}}}),Pl,Gf,Yw=L(()=>{te(),yt(),ae(),Qt(),Zs(),Xw(),ti(),Pl=(e,t,n,r,a=!1,s,i=4,o=4,l=4,d="f32")=>{let p=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},h=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=e?"row":"col",$=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ae(i,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(i)}
    }
    return resData;`,E=e?t&&r?`
    let col = colIn * ${i};
    ${b}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${Ae(i,d)}(0.0);`:r&&n?`
    let col = colIn * ${i};
    ${b}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${Ae(i,d)}(0.0);`,S=e?r&&n?h(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(o)}
    }
    return ${Ae(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(o)}
    }
    return ${Ae(o,d)}(0.0);`,I=Ae(l,d),C=Ae(e?i:o,d),z=Ae(e?o:i,d),x=jt(s,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?E:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?S:E}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${Wf(a)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gf=(e,t,n,r,a,s,i,o,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],h=n[0],m=d?n[2]:n[3],y=d?n[1]:n[2],w=d?n[3]:n[1],_=d&&(p%4===0||p%3===0)&&w%4===0,k=d?w:m*y,$=d?m*y:w,b=[8,8,1],E=r<=8?[4,1,1]:[4,4,1],S=[Math.ceil(k/b[0]/E[0]),Math.ceil($/b[1]/E[1]),Math.ceil(h/b[2]/E[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let I=_?d&&p%4!==0?3:4:1,C=b[1]*E[1],z=b[0]*E[0],x=Math.max(b[0]*I,b[1]),M=r%C===0,U=a%z===0,Y=s%x===0,G=_?[I,4,4]:[1,1,1],j=[{type:6,data:r},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Kt(t,j),j.push(...X(e[0].dims,e[1].dims));let R=["rank","rank"];i&&(j.push(...X(e[2].dims)),R.push("rank")),j.push(...X(n));let D=F=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Xt(t,J);let ee=_?4:1,ne=Ie(e[0].dataType),se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${_?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,P=N("x",e[0].dataType,e[0].dims.length,I===3?1:I),Z=N("w",e[1].dataType,e[1].dims.length,ee),Q=[P,Z],W=H("result",e[0].dataType,n.length,ee);if(i){let Te=N("bias",e[2].dataType,e[2].dims.length,ee);Q.push(Te),se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${ne}>`:ne} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Ff("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(J).declareVariables(...Q,W)}
        ${se}
        ${Pl(d,M,U,Y,i,t,G[0],G[1],G[2],ne)}
        ${_?$s(E,b,ne,void 0,!d,x):xs(E,b,ne,void 0,!d,x,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${M};${U};${Y};${C};${z};${x}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:j}),getShaderSource:D}}}),Ul,Aa,bn,Ll,za,Vl,Hf,jf,Qw=L(()=>{te(),yt(),re(),ae(),Qt(),Zs(),Ul=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Aa=e=>typeof e=="number"?[e,e,e]:e,bn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ll=(e,t,n,r=1)=>{let a=bn(t,r);return Math.floor((e[0]*(n-1)-n+a)/2)},za=(e,t,n,r,a)=>{a==null&&(a=Ll(e,t[0],r[0]));let s=[0,0,0,n];for(let i=0;i<3;i++)e[i]+2*a>=t[i]&&(s[i]=Math.trunc((e[i]-t[i]+2*a)/r[i]+1));return s},Vl=(e,t,n,r,a,s,i,o,l,d)=>{let p,h,m,y;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=za([t,n,r,1],[o,l,d],1,[a,s,i],e);h=w[0],m=w[1],y=w[2]}else if(Array.isArray(e)){if(!e.every((_,k,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=za([t,n,r,1],[o,l,d],1,[a,s,i],e[0]);h=w[0],m=w[1],y=w[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/a),m=Math.ceil(n/s),y=Math.ceil(r/i);let w=(h-1)*a+o-t,_=(m-1)*s+l-n,k=(y-1)*i+d-r,$=Math.floor(w/2),b=w-$,E=Math.floor(_/2),S=_-E,I=Math.floor(k/2),C=k-I;p={top:E,bottom:S,left:I,right:C,front:$,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:h,outHeight:m,outWidth:y}},Hf=(e,t,n,r,a,s=!1,i="channelsLast")=>{let o,l,d,p,h;if(i==="channelsLast")[o,l,d,p,h]=e;else if(i==="channelsFirst")[o,h,l,d,p]=e;else throw new Error(`Unknown dataFormat ${i}`);let[m,,y,w,_]=t,[k,$,b]=Aa(n),[E,S,I]=Aa(r),C=bn(y,E),z=bn(w,S),x=bn(_,I),{padInfo:M,outDepth:U,outHeight:Y,outWidth:G}=Vl(a,l,d,p,k,$,b,C,z,x),j=s?m*h:m,R=[0,0,0,0,0];return i==="channelsFirst"?R=[o,j,U,Y,G]:i==="channelsLast"&&(R=[o,U,Y,G,j]),{batchSize:o,dataFormat:i,inDepth:l,inHeight:d,inWidth:p,inChannels:h,outDepth:U,outHeight:Y,outWidth:G,outChannels:j,padInfo:M,strideDepth:k,strideHeight:$,strideWidth:b,filterDepth:y,filterHeight:w,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:z,effectiveFilterWidth:x,dilationDepth:E,dilationHeight:S,dilationWidth:I,inShape:e,outShape:R,filterShape:t}},jf=(e,t,n,r,a,s)=>{let i=s==="channelsLast";i?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],l={x:n.map((k,$)=>$)},d=[Math.ceil(Ul(l.x.map(k=>n[k]))/o[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=1,h=O.size(n),m=[{type:12,data:h},{type:12,data:r},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Kt(t,m),m.push(...X(e[0].dims,e[1].dims));let y=["rank","rank"],w=e.length===3;w&&(m.push(...X(e[2].dims)),y.push("rank")),m.push(...X(n));let _=k=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Xt(t,$);let b=1,E=Ie(e[0].dataType),S=N("x",e[0].dataType,e[0].dims.length,p),I=N("W",e[1].dataType,e[1].dims.length,b),C=[S,I],z=H("result",e[0].dataType,n.length,b),x="";if(w){let Y=N("bias",e[2].dataType,e[2].dims.length,b);C.push(Y),x+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${E} {
          return bias[${i?K("coords",4,5):K("coords",1,5)}];
        }`}let M=Ae(p,E),U=jt(t,M,E);return`
            ${x}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${k.registerUniforms($).declareVariables(...C,z)}
          ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,S.rank)};
              let d2 = ${i?K("coords",S.rank-1,S.rank):K("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${i?K("coords",1,S.rank):K("coords",2,S.rank)},
              ${i?K("coords",2,S.rank):K("coords",3,S.rank)},
              ${i?K("coords",3,S.rank):K("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${i?K("uniforms.x_shape",1,S.rank):K("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${i?K("uniforms.x_shape",2,S.rank):K("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${i?K("uniforms.x_shape",3,S.rank):K("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${i?K("uniforms.x_shape",4,S.rank):K("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${i?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${i?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${i?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${i?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${U}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${i};${p};${w}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:_}}}),Kf,Xf,Zw=L(()=>{te(),re(),ae(),Qt(),Kf=(e,t,n,r)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",i=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?n[3]:n[1],p=d/t.group,h=l&&p>=4?ke(d):1,m=O.size(n)/h,y=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Kt(t,y),y.push(...X(i,[o[0],o[1],o[2],o[3]/h]));let w=a?["rank","rank","rank"]:["rank","rank"];y.push(...X([n[0],n[1],n[2],n[3]/h]));let _=k=>{let $=H("output",e[0].dataType,n.length,h),b=Ie($.type.tensor),E=jt(t,$.type.value,b),S=N("x",e[0].dataType,i.length),I=N("w",e[1].dataType,o.length,h),C=[S,I];a&&C.push(N("b",e[2].dataType,e[2].dims,h));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Xt(t,z);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(z).declareVariables(...C,$)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${x}
    ${s}
    ${E}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:_}},Xf=(e,t,n,r)=>{let a=e.length>2,s=ke(n[3]),i=ke(n[2]),o=O.size(n)/s/i,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],p=[n[0],n[1],n[2],n[3]/s],h=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Kt(t,h),h.push(...X(l,d,p));let m=(i-1)*t.strides[1]+d[1],y=w=>{let _=H("output",e[0].dataType,p.length,s),k=Ie(_.type.tensor),$=jt(t,_.type.value,k),b=N("x",e[0].dataType,l.length,s),E=N("w",e[1].dataType,d.length,s),S=[b,E];a&&S.push(N("b",e[2].dataType,e[2].dims,s));let I=a?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Xt(t,C),`
  ${w.registerUniforms(C).declareVariables(...S,_)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${i}u;
    let col = (index1 % width1) * ${i}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${m}>;
    var values: array<${_.type.value}, ${i}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${E.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${i}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${i}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${i};${m};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:h}),getShaderSource:y}}}),ql,ur,Wl,lr,ks,Oa,Fl,Gl,Ss,Jw=L(()=>{re(),Yw(),Qw(),ti(),Zw(),Qt(),ei(),zt(),ql=(e,t,n,r,a,s)=>{let i=e[0],o=e.slice(s?1:2,s?3:4),l=o.length,d=t[0],p=t.slice(2).map((m,y)=>m+(m-1)*(n[y]-1)),h=o.map((m,y)=>m+r[y]+r[y+l]).map((m,y)=>Math.floor((m-p[y]+a[y])/a[y]));return h.splice(0,0,i),h.splice(s?3:1,0,d),h},ur=[2,3,1,0],Wl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},lr=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let s=2;s<t[1].dims.length;++s)n[s-2]===0&&(n[s-2]=t[1].dims[s]);let r=e.pads.slice();kr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:n,pads:r}),a},ks=e=>{let t=Qs(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,i=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:r,format:n,dilations:a,group:s,kernelShape:i,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Oa=(e,t,n,r)=>{let a=n.format==="NHWC",s=ql(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,a);if(n.group!==1){let C=[t[0]];if(a){let z=e.kernelCustomData.wT??e.compute(qe(t[1],ur),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),C.push(z)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Xf(C,n,s,r),{inputs:C}):e.compute(Kf(C,n,s,r),{inputs:C});return}let i=t.length===3,o=t[0].dims[a?1:2],l=t[0].dims[a?2:3],d=t[0].dims[a?3:1],p=t[1].dims[2],h=t[1].dims[3],m=s[a?1:2],y=s[a?2:3],w=s[a?3:1],_=a&&p===o&&h===l&&n.pads[0]===0&&n.pads[1]===0;if(_||p===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let C=s[0],z,x,M,U=[];if(a){let j=e.kernelCustomData.wT??e.compute(qe(t[1],ur),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=j),_){let R=o*l*d;z=t[0].reshape([1,C,R]),x=j.reshape([1,R,w]),M=[1,C,w]}else z=t[0].reshape([C,o*l,d]),x=j.reshape([1,d,w]),M=[C,m*y,w];U.push(z),U.push(x)}else z=t[0].reshape([C,d,o*l]),x=t[1].reshape([1,w,d]),M=[C,w,m*y],U.push(x),U.push(z);i&&U.push(t[2]);let Y=M[2],G=U[0].dims[U[0].dims.length-1];Y<8&&G<8?e.compute(Js(U,n,s,M,a,r),{inputs:U}):e.compute(Er(U,n,s,M,a,r),{inputs:U});return}let k=!0,$=e.kernelCustomData.wT??e.compute(qe(t[1],ur),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let b=[t[0],$];i&&b.push(t[2]);let E=a?m*y:w,S=a?w:m*y,I=p*h*d;e.compute(Gf(b,n,s,E,S,I,i,k,r),{inputs:b})},Fl=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),i=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=lr({...t,pads:a,strides:s,dilations:i,kernelShape:o},r);Oa(e,r,l,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Gl=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",a=lr(n,t),s=n.autoPad==="NOTSET"?n.pads:n.autoPad,i=Hf(t[0].dims,t[1].dims,n.strides,n.dilations,s,!1,r);e.compute(jf(t,a,i.outShape,[i.filterDepth,i.filterHeight,i.filterWidth],[i.padInfo.front,i.padInfo.top,i.padInfo.left],r))},Ss=(e,t)=>{if(Wl(e.inputs,t),e.inputs[0].dims.length===3)Fl(e,t);else if(e.inputs[0].dims.length===5)Gl(e,e.inputs,t);else{let n=lr(t,e.inputs);Oa(e,e.inputs,n)}}}),Yf,e_=L(()=>{te(),yt(),re(),ae(),Yf=(e,t,n)=>{let r=e.length>2,a=t.outputShape,s=t.format==="NHWC",i=t.group,o=e[1].dims,l=o[2]/i,d=o[3],p=s?ke(l):1,h=s&&d===1&&l>=4,m=h?Math.floor(l/4)*4:Math.floor(l/p)*p,y=l-m,w=s?ke(d):1,_=s?d===1?p:w:1,k=O.size(a)/w,$=[Math.ceil(k/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let b=["rank","rank"],E=[t.strides[0],t.strides[1]],S=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],I=[t.dilations[0],t.dilations[1]],C=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],z=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:k},{type:12,data:E},{type:12,data:S},{type:12,data:I},{type:12,data:C},{type:6,data:z},{type:12,data:m},{type:12,data:l},{type:12,data:d},...X(e[0].dims,e[1].dims)];r&&(x.push(...X(e[2].dims)),b.push("rank")),x.push(...X(a));let M=U=>{let Y=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:E.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Ie(e[0].dataType),j=s?1:2,R=s?2:3,D=s?3:1,F=N("W",e[1].dataType,e[1].dims.length,_),J=N("Dy",e[0].dataType,e[0].dims.length,p),ee=[J,F];r&&ee.push(N("bias",e[2].dataType,[a[D]].length,w));let ne=H("result",e[0].dataType,a.length,w),se=()=>{let Q="";if(h)p===4?Q+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${F.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${G}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${G}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}, ${F.getByOffset("w_offset + 2u")}, ${F.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Q+=`
                  let xValue = ${s?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):J.get("batch","inputChannel","idyR","idyC")};
        `,p===1)Q+=`
          let w_offset = ${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${F.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let W=0;W<p;W++)Q+=`
            let wValue${W} = ${F.getByOffset(`${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${W}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${W}] * wValue${W};`;return Q},P=()=>{if(y===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let Q="";if(p===1){Q+="dotProd = dotProd";for(let W=0;W<y;W++)Q+=`
            + ${J.getByOffset(`x_offset + ${W}`)} * ${F.getByOffset(`w_offset + ${W}`)}`;Q+=";"}else if(p===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);Q+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${F.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Q},Z=`
            let outputIndices = ${ne.offsetToIndices(`global_idx * ${w}`)};
            let batch = ${ne.indicesGet("outputIndices",0)};
            let d1 = ${ne.indicesGet("outputIndices",D)};
            let r = ${ne.indicesGet("outputIndices",j)};
            let c = ${ne.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ne.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${G}(dyRCorner) + ${G}(wR)) / ${G}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${j}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${G}(dyCCorner) + ${G}(wC)) / ${G}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${F.indicesToOffset(`${F.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:p}) {
                  ${se()}
                  inputChannel = inputChannel + ${h?4:p};
                }
                ${P()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${w}]`:""};
            ${ne.setByOffset("global_idx","value")};
          `;return`
    ${U.registerUniforms(Y).declareVariables(...ee,ne)}
      ${U.mainStart()}
      ${U.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Z}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${_}${w}${h}${y}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:n?n(a):a,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:M}}}),Hl,jl,Kl,Ra,Qf,Xl,Ba,Yl,Zf,t_=L(()=>{e_(),Qt(),zt(),Hl=(e,t,n,r,a,s)=>(e-1)*t+n+(r-1)*a+1-s,jl=(e,t,n,r,a)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=s,n[a]=e-s):t==="SAME_LOWER"&&(n[r]=e-s,n[a]=s)},Kl=(e,t,n,r,a,s,i,o,l,d)=>{let p=e.length-2,h=d.length===0;l.length<p&&l.push(...Array(p-l.length).fill(0));let m=e[0],y=t[o?3:1]*a;for(let w=0,_=e.length-p-(o?1:0);w<p;++w,++_){let k=e[_],$=h?k*i[w]:d[w],b=Hl(k,i[w],s[w],t[_],n[w],$);jl(b,r,s,w,w+p),h&&d.push(i[w]*(k-1)+l[w]+(t[_]-1)*n[w]+1-s[w]-s[w+p])}d.splice(0,0,m),d.splice(o?3:1,0,y)},Ra=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,m)=>h*m,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),i=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let d=e.strides.slice();if(d.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;d=new Array(h).fill(1)}Kl(o,n,l,e.autoPad,e.group,a,d,r,i,s);let p=Object.assign({},e);return Object.assign(p,{kernelShape:n,pads:a,outputPadding:i,outputShape:s,dilations:l,strides:d}),p},Qf=e=>{let t=Qs(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group??1,i=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),p=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:a,group:s,kernelShape:i,outputPadding:p,outputShape:h,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Xl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((i,o)=>i+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((i,o)=>i+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((i,o)=>i+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((i,o)=>i+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ba=(e,t,n,r)=>{let a=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];t.length===3&&s.push(t[2]),e.compute(Yf(s,n,r),{inputs:s})},Yl=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let i=t.strides;(i.length===0||i[0]===0)&&(i=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],i=[1].concat(i),s=[1].concat(s),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let d=Ra({...t,pads:o,strides:i,dilations:s,kernelShape:a,outputPadding:l},r);Ba(e,r,d,p=>n?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Zf=(e,t)=>{if(Xl(e.inputs,t),e.inputs[0].dims.length===3)Yl(e,t);else{let n=Ra(t,e.inputs);Ba(e,e.inputs,n)}}}),Ql,Jf,em,n_=L(()=>{te(),re(),Se(),ae(),Ql=(e,t,n,r)=>{let a=O.size(t),s=t.length,i=N("input",e,s),o=H("output",e,s),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=O.normalizeAxis(l,s),p=h=>{let m=` i32(${i.indicesGet("inputIndices","uniforms.axis")}) `,y=K("uniforms.input_shape","uniforms.axis",s),w=r.reverse?m+(r.exclusive?" + 1":""):"0",_=r.reverse?y:m+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(i,o)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${i.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${i.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...X(t,t)]}),getShaderSource:p}},Jf=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,a=e.inputs[1];e.compute(Ql(r,n,a,t),{inputs:[0]})},em=e=>{let t=e.exclusive===1,n=e.reverse===1;return fe({exclusive:t,reverse:n})}}),Zl,Jl,ed,tm,nm,r_=L(()=>{te(),re(),Se(),ae(),Zl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Jl=(e,t,n,r)=>{let a=[];a.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let s=0;s<t;++s)a.push(n.indicesSet("a",e[s],`i[${s}]`));return a.push("return a;}"),a.join(`
`)},ed=(e,t)=>{let n,r,a,s,i,o,l=t.format==="NHWC",d=t.blocksize,p=t.mode==="DCR";l?([n,r,a,s]=e.dims,i=p?[n,r,a,d,d,s/d**2]:[n,r,a,s/d**2,d,d],o=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,a,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],i=p?[n,d,d,s/d**2,r,a]:[n,s/d**2,d,d,r,a],o=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(i),m=h.dims.length,y=e.dataType,w=N("a",y,m),_=H("output",y,m),k=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,_)}

  ${Jl(o,m,w,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let b=l?[n,r*d,a*d,s/d**2]:[n,s/d**2,r*d,a*d],E=O.size(b),S=h.dims,I=O.sortBasedOnPerm(S,o);return{outputs:[{dims:b,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},...X(S,I)]}},getShaderSource:k}},tm=(e,t)=>{Zl(e.inputs),e.compute(ed(e.inputs[0],t))},nm=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),dr,vn,Na,td,nd,rd,ad,Ma,sd,rm,am,a_=L(()=>{te(),re(),Se(),ae(),dr="[a-zA-Z]|\\.\\.\\.",vn="("+dr+")+",Na="^"+vn+"$",td="("+vn+",)*"+vn,nd="^"+td+"$",rd=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},ad=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(nd)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,s)=>{let i=e[s].dims.slice();if(!a.match(RegExp(Na)))throw new Error("Invalid LHS term");let o=this.processTerm(a,!0,i,s);this.lhs.push(o)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(vn)))throw new Error("Invalid RHS");r.match(RegExp(dr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let a=n.length,s=!1,i=[],o=0;if(!e.match(RegExp(Na))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(dr,"g")),d=new rd(r);return l?.forEach((p,h)=>{if(p==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let m=a-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(i=n.slice(o,o+m),this.hasEllipsis){if(this.ellipsisDims.length!==i.length||this.ellipsisDims.toString()!==i.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=i;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<i.length;y++){let w=String.fromCharCode(48+y);d.addSymbol(w,h+y),this.addSymbol(w,n[o++],r)}}else d.addSymbol(p,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,n[o++],r)}),d}},Ma=e=>e+"_max",sd=(e,t,n,r)=>{let a=e.map(d=>d.length).map((d,p)=>N(`input${p}`,t,d)),s=O.size(r),i=H("output",t,r.length),o=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let p=[],h="var prod = 1.0;",m="var sum = 0.0;",y="sum += prod;",w=[],_=[],k=[],$=[],b=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((S,I)=>{if(n.rhs.symbolToIndices.has(I)){let C=n.rhs.symbolToIndices.get(I)?.[0];C!==void 0&&n.lhs.forEach((z,x)=>{if(S.inputIndices.includes(x)){let M=z.symbolToIndices.get(I);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(U=>{p.push(`${a[x].indicesSet(`input${x}Indices`,U,i.indicesGet("outputIndices",C))}`)})}})}else n.lhs.forEach((C,z)=>{if(S.inputIndices.includes(z)){let x=C.symbolToIndices.get(I);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(M=>{w.push(`${a[z].indicesSet(`input${z}Indices`,M,`${I}`)}`)}),$.push(`prod *= ${a[z].getByIndices(`input${z}Indices`)};`)}}),_.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Ma(I)}; ${I}++) {`),k.push("}")});let E=b?[...p,`let sum = ${a.map((S,I)=>S.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...p,m,..._,...w,h,...$,y,...k];return`
            ${d.registerUniforms(o.map(S=>({name:`${Ma(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,i)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${i.offsetToIndices("global_idx")};
            ${a.map((S,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${E.join(`
`)};
            ${i.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(h=>n.symbolToInfo.has(h)).map(h=>({type:12,data:n.symbolToInfo.get(h)?.dimValue||0}));d.push({type:12,data:s});let p=e.map((h,m)=>[...X(h)]).reduce((h,m)=>h.concat(m),d);return p.push(...X(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}},getShaderSource:l}},rm=(e,t)=>{let n=new ad(e.inputs,t.equation),r=n.outputDims,a=e.inputs.map((s,i)=>s.dims);e.compute(sd(a,e.inputs[0].dataType,n,r))},am=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),id,Da,od,ud,sm,s_=L(()=>{te(),re(),ae(),id=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,a=t.length<n.length?0:t.length-n.length;for(;r<n.length&&a<t.length;++r,++a)if(n[r]!==t[a]&&n[r]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Da=(e,t)=>{let n=e.length-t.length,r=[];for(let a=0;a<n;++a)r.push(e[a]);for(let a=0;a<t.length;++a)r.push(t[a]===1?e[a+n]:t[a]);return r},od=(e,t)=>e.length>t.length?Da(e,t):Da(t,e),ud=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=od(t,n),a=e[0].dataType,s=a===9||O.size(t)===1,i=a===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(O.size(r)/o),d=h=>{let m=N("input",a,t.length,i),y=H("output",a,r.length,o),w;if(a===9){let _=(k,$,b="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${m.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${k}[${$}] = ${b}(${m.getByOffset(`index${$}`)}[component${$}]);
        `;w=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${m.getByOffset(`inputOffset / ${i}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(m,y)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},p=[{type:12,data:l},...X(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${i}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p})}},sm=e=>{id(e.inputs),e.compute(ud(e.inputs),{inputs:[0]})}}),ld,im,i_=L(()=>{te(),re(),ae(),Ys(),ld=e=>{let t=e[0].dataType,n=O.size(e[0].dims),r=O.size(e[1].dims),a=r%4===0,s=i=>{let o=N("x",t,[1],4),l=N("bias",t,[1],4),d=H("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,m=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${i.registerUniforms(p).declareVariables(o,l,d)}

    ${bs(Re(t))}

    ${i.mainStart(on)}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",vs("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:i=>({outputs:[{dims:i[0].dims,dataType:i[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/on/4)}})}},im=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Ef(e):e.compute(ld(e.inputs))}}),dd,cd,om,um,o_=L(()=>{te(),re(),Se(),ae(),dd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},cd=(e,t)=>{let n=e[0].dims,r=e[1].dims,a=n.length,s=O.normalizeAxis(t.axis,a),i=n.slice(0);i.splice(s,1,...r);let o=n[s],l=e[0].dataType===9?4:1,d=Math.ceil(O.size(i)/l),p=[{type:12,data:d},{type:6,data:o},{type:12,data:s},...X(e[0].dims,e[1].dims,i)],h=m=>{let y=N("data",e[0].dataType,e[0].dims.length,l),w=N("inputIndices",e[1].dataType,e[1].dims.length),_=H("output",e[0].dataType,i.length,l),k=b=>{let E=r.length,S=`var indicesIndices${b}  = ${w.type.indices}(0);`;for(let I=0;I<E;I++)S+=`${E>1?`indicesIndices${b}[${I}]`:`indicesIndices${b}`} = ${i.length>1?`outputIndices${b}[uniforms.axis + ${I}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${w.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${y.type.indices};
        `;for(let I=0,C=0;I<a;I++)I===s?(S+=`${a>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = u32(idx${b});`,C+=E):(S+=`${a>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = ${i.length>1?`outputIndices${b}[${C}]`:`outputIndices${b}`};`,C++);return S},$;if(e[0].dataType===9){let b=(E,S,I="")=>`
          let outputIndices${S} = ${_.offsetToIndices(`outputOffset + ${S}u`)};
          ${k(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${E}[${S}] = ${I}(${y.getByOffset(`index${S}`)}[component${S}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${y.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,w,_)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:h}},om=e=>fe({axis:e.axis}),um=(e,t)=>{let n=e.inputs;dd(n),e.compute(cd(e.inputs,t))}}),pd,lm,dm,u_=L(()=>{te(),re(),ae(),pd=(e,t,n,r,a,s,i,o,l)=>{let d=[{type:12,data:s},{type:12,data:r},{type:12,data:a},{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:12,data:l}],p=[s];d.push(...X(t.dims,p));let h=m=>{let y=N("indices_data",t.dataType,t.dims.length),w=H("input_slice_offsets_data",12,1,1),_=[y,w],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(k).declareVariables(..._)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},lm=(e,t)=>{let n=e.inputs,r=n[0].dims,a=n[0].dataType,s=n[1].dims,i=s[s.length-1],o=O.sizeToDimension(s,s.length-1),l=O.sizeFromDimension(r,t.batchDims+i),d=O.sizeToDimension(r,t.batchDims),p=O.sizeFromDimension(r,t.batchDims),h=o/d,m=new Array(i),y=l;for(let S=0;S<i;++S)m[i-1-S]=y,y*=r[t.batchDims+i-1-S];let w=pd(e,n[1],m,t.batchDims,r,o,h,p,i),_=t.batchDims+i;if(_>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=s.slice(0,-1).concat(r.slice(_)),$=O.size(k),b=[{type:12,data:$},{type:12,data:l},...X(n[0].dims,w.dims,k)],E=S=>{let I=N("data",n[0].dataType,n[0].dims.length),C=N("slice_offsets",12,w.dims.length),z=H("output",n[0].dataType,k.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,C,z)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:a}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:b}),getShaderSource:E},{inputs:[n[0],w]})},dm=e=>({batchDims:e.batch_dims,cacheKey:""})}),hd,fd,cm,pm,l_=L(()=>{te(),re(),Se(),ae(),hd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,a=e[0],s=e[2],i=e.length===4?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((o,l)=>l===n?Math.ceil(o/r)===s.dims[l]:o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(i){if(i.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(i.dims.length!==s.dims.length||!i.dims.map((o,l)=>o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},fd=(e,t)=>{let n=e[0].dims,r=e[1].dims,a=n.length,s=O.normalizeAxis(t.gatherAxis,a),i=O.normalizeAxis(t.quantizeAxis,a),o=n.slice(0);o.splice(s,1,...r);let l=O.size(o),d=e[2].dataType,p=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:i},{type:12,data:s},{type:12,data:t.blockSize},...X(...e.map((y,w)=>y.dims),o)],m=y=>{let w=N("data",e[0].dataType,e[0].dims.length),_=N("inputIndices",e[1].dataType,e[1].dims.length),k=N("scales",e[2].dataType,e[2].dims.length),$=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=H("output",d,o.length),E=[w,_,k];$&&E.push($);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...E,b)}
        ${y.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[s]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${k.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${k.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${k.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Re(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,w)=>w!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,w)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:m}},cm=(e,t)=>{let n=e.inputs;hd(n,t),e.compute(fd(e.inputs,t))},pm=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),md,gd,hm,fm,d_=L(()=>{te(),re(),Se(),ae(),md=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},gd=(e,t)=>{let n=e[0].dims,r=e[0].dataType,a=n.length,s=e[1].dims,i=e[1].dataType,o=O.normalizeAxis(t.axis,a),l=n[o],d=s.slice(0),p=O.size(d),h=N("input",r,a),m=N("indicesInput",i,s.length),y=H("output",r,d.length),w=[{type:12,data:p},{type:6,data:l},{type:12,data:o}];return w.push(...X(n,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:w}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,y)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},hm=e=>fe({axis:e.axis}),fm=(e,t)=>{let n=e.inputs;md(n),e.compute(gd(e.inputs,t))}}),yd,wd,mm,gm,c_=L(()=>{te(),re(),ae(),yd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},wd=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[a,s,i]=ph.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[a,s];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(s/l),p=Math.ceil(a/l),h=!0,m=O.size(o),y=[{type:12,data:h?d:m},{type:12,data:a},{type:12,data:s},{type:12,data:i},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(y.push(...X(e[2].dims)),w.push("rank")),y.push(...X(o));let _=$=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let E=t.alpha===1?"":"value *= uniforms.alpha;",S=N("a",e[0].dataType,e[0].dims),I=N("b",e[1].dataType,e[1].dims),C=S.type.value,z=null,x=[S,I];e.length===3&&(z=N("c",e[2].dataType,e[2].dims.length),x.push(z));let M=H("output",e[0].dataType,o.length);x.push(M);let U=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(U).declareVariables(...x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${E}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${C}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=$=>{let b=N("a",e[0].dataType,e[0].dims),E=N("b",e[1].dataType,e[1].dims),S=null,I=[b,E];e.length===3&&(S=N("c",e[2].dataType,e[2].dims.length),I.push(S));let C=H("output",e[0].dataType,o.length);I.push(C);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",M="";t.transA&&t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let U=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${E.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${U}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:y}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:_}},mm=e=>{let t=e.transA,n=e.transB,r=e.alpha,a=e.beta;return{transA:t,transB:n,alpha:r,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},gm=(e,t)=>{yd(e.inputs),e.compute(wd(e.inputs,t))}}),ot,ft,Mt,Dt,_d,bd,vd,$d,xd,kd,Sd,Ed,ym,wm,p_=L(()=>{te(),re(),Se(),ae(),[ot,ft,Mt,Dt]=[0,1,2,3],_d=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},bd=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,vd=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,$d=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,xd=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,kd=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${ot}] = batch;
     indices[${ft}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Mt}] = u32(r);
            indices[${Dt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Mt}] = u32(clamp(r, 0, H - 1));
          indices[${Dt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Mt}] = gs_reflect(r, border[1], border[3]);
          indices[${Dt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Sd=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ot}], indices[${ft}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ot}], indices[${ft}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ot}], indices[${ft}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Ed=(e,t)=>{let n=N("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=N("grid",e[1].dataType,r.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ot,ft,Mt,Dt]=[0,3,1,2]);let i=H("output",e[0].dataType,s.length),o=n.type.value,l=O.size(s),d=[{type:12,data:l},...X(e[0].dims,r,s)],p=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,a,i)}
  ${bd}
  ${vd(o)}
  ${$d(t)}
  ${xd(t)}
  ${kd(n,o,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Mt}]);
      let W_in = i32(uniforms.x_shape[${Dt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${i.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ot}], indices[${Mt}], indices[${Dt}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Sd(i,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let m=O.size(s);return{outputs:[{dims:s,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:p}},ym=(e,t)=>{_d(e.inputs),e.compute(Ed(e.inputs,t))},wm=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ne,Td,_m,Pa,Id,zn,bm,vm=L(()=>{te(),re(),Se(),Hs(),Xs(),ae(),zt(),Ne=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Td=(e,t)=>{let n=e[0],r=Ne(e,1),a=Ne(e,2),s=Ne(e,3),i=Ne(e,4),o=Ne(e,5),l=Ne(e,6),d=Ne(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=n.dims[0],h=n.dims[1],m=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],y=h,w=0,_=0,k=Math.floor(m/t.numHeads);if(l&&d&&O.size(l.dims)&&O.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=l.dims[2],_=l.dims[2]}else if(l&&O.size(l.dims)||d&&O.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(r&&O.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(s&&O.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=w+y,E=0;if(i&&O.size(i.dims)>0){E=8;let z=i.dims;throw z.length===1?z[0]===p?E=1:z[0]===3*p+2&&(E=3):z.length===2&&z[0]===p&&z[1]===b&&(E=5),E===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,I=m;if(a&&O.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],S=!0}}let C=!1;if(i&&O.size(i.dims)>0)throw new Error("Key padding mask is not supported");if(o&&O.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==p||o.dims[1]!==t.numHeads||o.dims[2]!==h||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:h,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:b,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:k,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:E,scale:t.scale,broadcastResPosBias:C,passPastInKv:S,qkvFormat:$}},_m=e=>fe({...e}),Pa=fe({perm:[0,2,1,3]}),Id=(e,t,n,r,a,s,i)=>{let o=[r,a,s],l=O.size(o),d=[{type:12,data:l},{type:12,data:i},{type:12,data:s}],p=h=>{let m=H("qkv_with_bias",t.dataType,o),y=N("qkv",t.dataType,o),w=N("bias",n.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(y,w,m)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,n],outputs:[-1]})[0]},zn=(e,t,n,r,a,s,i,o)=>{let l=s;if(i&&O.size(i.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Id(e,s,i,t,r,n*a,o),l=l.reshape([t,r,n,a]),n===1||r===1?l:e.compute(qe(l,Pa.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,r,n,a])),n===1||r===1?l:e.compute(qe(l,Pa.perm),{inputs:[l],outputs:[-1]})[0]},bm=(e,t)=>{let n=Td(e.inputs,t),r=e.inputs[0],a=Ne(e.inputs,1),s=Ne(e.inputs,2),i=Ne(e.inputs,3),o=Ne(e.inputs,4),l=Ne(e.inputs,5),d=Ne(e.inputs,6),p=Ne(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let h=a&&s&&a.dims.length===4&&s.dims.length===4,m=zn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,i,0);if(h)return Mn(e,m,a,s,o,void 0,d,p,l,n);if(!a||!s)throw new Error("key and value must be provided");let y=zn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,a,i,n.hiddenSize),w=zn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,s,i,2*n.hiddenSize);Mn(e,m,y,w,o,void 0,d,p,l,n)}}),Cd,Ad,zd,Od,Es,$m,xm,km=L(()=>{te(),re(),Se(),ae(),Cd=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ad=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>n.push(Number(a))),r=n.length),fe({numOutputs:r,axis:t.axis,splitSizes:n})},zd=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Od=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let a=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(a):r===0?n.push(`if (output_number == ${r}u) { ${a} }`):r===t-1?n.push(`else { ${a} }`):n.push(`else if (output_number == ${r}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Es=(e,t)=>{let n=e[0].dims,r=O.size(n),a=e[0].dataType,s=O.normalizeAxis(t.axis,n.length),i=new Array(t.numOutputs),o=N("input",a,n.length),l=new Array(t.numOutputs),d=[],p=[],h=0,m=[{type:12,data:r}];for(let w=0;w<t.numOutputs;w++){h+=t.splitSizes[w],l[w]=h;let _=n.slice();_[s]=t.splitSizes[w],p.push(_),i[w]=H(`output${w}`,a,_.length),d.push({dims:p[w],dataType:e[0].dataType})}m.push({type:12,data:l},...X(n,...p));let y=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...i)}
  ${zd(l.length)}
  ${Od(i)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}},$m=(e,t)=>{Cd(e.inputs);let n=e.inputs.length===1?t:Ad(e.inputs,t);e.compute(Es(e.inputs,n),{inputs:[0]})},xm=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:t,numOutputs:r,splitSizes:n})}}),Rd,Tr,Sm,Em=L(()=>{te(),re(),Se(),ae(),Rd=(e,t)=>{let[n,r,a,s]=e,{numHeads:i,rotaryEmbeddingDim:o}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!O.areEqual(r.dims,[])&&!O.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!O.areEqual(a.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&i===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],d=n.dims[n.dims.length-2],p=a.dims[0],h=O.sizeFromDimension(n.dims,1)/d,m=o===0?a.dims[1]*2:h/i;if(o>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(d>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==a.dims[1]&&o/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`)},Tr=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:a,scale:s}=t,i=e[0].dims[0],o=O.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,p=e[2].dims[1],h=a===0?p*2:d/r,m=new Array(i,l,d/h,h-p),y=O.computeStrides(m),w=[{type:1,data:s},{type:12,data:m},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[o,d,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,h,l*h,1]}):[],...X(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=k=>{let $=N("input",e[0].dataType,e[0].dims.length),b=N("position_ids",e[1].dataType,e[1].dims.length),E=N("cos_cache",e[2].dataType,e[2].dims.length),S=N("sin_cache",e[3].dataType,e[3].dims.length),I=H("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${k.declareVariables($,b,E,S,I)}

        ${k.mainStart(on)}
          let half_rotary_emb_dim = uniforms.${E.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",H("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${$.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(m)/on)},programUniforms:w})}},Sm=(e,t)=>{Rd(e.inputs,t),e.compute(Tr(e.inputs,t))}}),Bd,Nd,Ua,Md,Tm,h_=L(()=>{Se(),te(),Xs(),vm(),km(),zt(),Em(),ae(),Bd=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],a=e[2],s=e[3],i=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=n.dims[0],d=n.dims[1],p=n.dims.length===3?o?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=d,m=0,y=!r||r.dims.length===0,w=Math.floor(y?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);y&&(p=w*t.numHeads);let _=s&&s.dims.length!==0,k=i&&i.dims.length!==0;if(_&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&k){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(i.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=s.dims[2]}else if(_||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let b=0,E=!1,S=t.kvNumHeads?w*t.kvNumHeads:p;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(h!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=a.dims[2]}else{if(h!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=a.dims[1]*a.dims[3],E=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=I.dims.reduce((z,x)=>z*x,1);if(C!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${C}.`);for(let z=0;z<I.dims.length;z++)if(I.dims[z]!==1&&I.dims[z]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${z}] = ${I.dims[z]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:S,headSize:w,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:E,qkvFormat:$}},Nd=fe({perm:[0,2,1,3]}),Ua=(e,t,n)=>{let r=t,a=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,a,n.headSize]),r=e.compute(qe(r,Nd.perm),{inputs:[r],outputs:[-1]})[0]),r},Md=(e,t,n,r)=>{let a=7,s=["type","type"],i=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=p=>{let h=N("seq_lens",n.dataType,n.dims),m=N("total_seq_lens",r.dataType,r.dims),y=H("pos_ids",a,i),w=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(w).declareVariables(h,m,y)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},Tm=(e,t)=>{let n=Bd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,i=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=fe({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,p*n.headSize,p*n.headSize]}),[m,y,w]=!a&&!s?e.compute(Es([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,a,s],_,k;if(t.doRotary){let S=e.compute(Md(n.batchSize,n.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],I=e.inputs[7],C=e.inputs[8],z=fe({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[m,S,I,C],M=[-1];_=e.compute(Tr(x,z),{inputs:x,outputs:M})[0],x.splice(0,1,y);let U=fe({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});k=e.compute(Tr(x,U),{inputs:x,outputs:M})[0]}let $=zn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:m,void 0,0),b=Ua(e,t.doRotary?k:y,n),E=Ua(e,w,n);Mn(e,$,b,E,void 0,void 0,i,o,void 0,n,l,d)}}),La,Dd,Pd,Im,f_=L(()=>{te(),re(),zt(),ae(),La=(e,t,n,r,a,s,i,o)=>{let l=ke(s),d=l===1?"f32":`vec${l}f`,p=l===1?"vec2f":`mat2x${l}f`,h=a*i,m=64;h===1&&(m=256);let y=[a,i,s/l],w=[a,i,2],_=["rank","type","type"],k=[];k.push(...X(y,w));let $=b=>{let E=N("x",t.dataType,3,l),S=N("scale",n.dataType,n.dims),I=N("bias",r.dataType,r.dims),C=H("output",1,3,2),z=[E,S,I,C];return`
  var<workgroup> workgroup_shared : array<${p}, ${m}>;
  const workgroup_size = ${m}u;
  ${b.declareVariables(...z)}
  ${b.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${E.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ct("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ct("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:h},programUniforms:k}),getShaderSource:$},{inputs:[t,n,r],outputs:[-1]})[0]},Dd=(e,t,n)=>{let r=t[0].dims,a=r,s=2,i=r[0],o=r[1],l=O.sizeFromDimension(r,s),d=ke(l),p=O.size(a)/d,h=La(e,t[0],t[1],t[2],i,l,o,n.epsilon),m=[i,o,l/d],y=[i,o],w=["type","none"],_=k=>{let $=N("x",t[0].dataType,m.length,d),b=N("scale_shift",1,y.length,2),E=H("output",t[0].dataType,m.length,d),S=[$,b,E];return`
  ${k.registerUniform("output_size","u32").declareVariables(...S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${E.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${E.type.value}(scale_shift.x) + ${E.type.value}(scale_shift.y);
      ${E.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...X(m,y,m)]}),getShaderSource:_},{inputs:[t[0],h]})},Pd=(e,t,n)=>{let r=t[0].dims,a=r,s=r[0],i=r[r.length-1],o=O.sizeFromDimension(r,1)/i,l=ke(i),d=O.size(a)/l,p=[{type:12,data:o},{type:12,data:Math.floor(i/l)}],h=["type","type"],m=!1,y=[0,r.length-1];for(let $=0;$<r.length-2;$++)m=m||r[$+1]!==1,y.push($+1);m=m&&r[r.length-1]!==1;let w=m?e.compute(qe(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},($,b)=>r[y[b]])),_=La(e,w,t[1],t[2],s,o,i,n.epsilon),k=$=>{let b=Ie(t[0].dataType),E=l===1?"vec2f":`mat${l}x2f`,S=z=>{let x=z===0?"x":"y",M=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${b}(${M}(scale.${x}))`;case 2:return`vec2<${b}>(${M}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${b}>(${M}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=N("input",t[0].dataType,t[0].dims,l),C=H("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${E}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:k},{inputs:[t[0],_]})},Im=(e,t)=>{t.format==="NHWC"?Pd(e,e.inputs,t):Dd(e,e.inputs,t)}}),Ud,Ld,Cm,m_=L(()=>{te(),re(),ae(),Ud=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Ld=(e,t,n)=>{let r=t.simplified,a=e[0].dims,s=e[1],i=!r&&e[2],o=a,l=O.normalizeAxis(t.axis,a.length),d=O.sizeToDimension(a,l),p=O.sizeFromDimension(a,l),h=O.size(s.dims),m=i?O.size(i.dims):0;if(h!==p||i&&m!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${m}`);let y=[];for(let I=0;I<a.length;++I)I<l?y.push(a[I]):y.push(1);let w=ke(p),_=["type","type"],k=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/w)},{type:1,data:t.epsilon}];i&&_.push("type");let $=n>1,b=n>2,E=I=>{let C=Ie(e[0].dataType),z=[N("x",e[0].dataType,e[0].dims,w),N("scale",s.dataType,s.dims,w)];i&&z.push(N("bias",i.dataType,i.dims,w)),z.push(H("output",e[0].dataType,o,w)),$&&z.push(H("mean_data_output",1,y)),b&&z.push(H("inv_std_output",1,y));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(x).declareVariables(...z)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ys("f32",w)};
    var mean_square_vector = ${ys("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${an(C,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ct("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ct("mean_square_vector",w)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${an(C,w,"x[j + offset]")};
      let f32scale = ${an(C,w,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${i?`+ ${an(C,w,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:o,dataType:e[0].dataType}];return $&&S.push({dims:y,dataType:1}),b&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${n};${r}`,inputDependencies:_},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:k}),getShaderSource:E}},Cm=(e,t)=>{Ud(e.inputs),e.compute(Ld(e.inputs,t,e.outputCount))}}),Vd,Am,g_=L(()=>{re(),ei(),ti(),Vd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Am=e=>{Vd(e.inputs);let t=sn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Js(e.inputs,{activation:""},t));else{let a=t[t.length-2],s=O.size(e.inputs[0].dims.slice(0,-2)),i=O.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&a===1&&i===1){let o=e.inputs[0].reshape([1,s,r]),l=e.inputs[1].reshape([1,r,n]),d=[1,s,n],p=[o,l];e.compute(Er(p,{activation:""},t,d),{inputs:p})}else e.compute(Er(e.inputs,{activation:""},t))}}}),qd,Wd,Fd,zm,Om,y_=L(()=>{te(),re(),Se(),ae(),qd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,i=e[1];if(!O.areEqual(i.dims,[t.n,a,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(O.size(o)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(O.size(l)!==d)throw new Error("zeroPoints input size error.")}},Wd=(e,t)=>{let n=e[0].dims,r=n.length,a=n[r-2],s=t.k,i=t.n,o=n.slice(0,r-2),l=O.size(o),d=e[1].dims[2]/4,p=e[0].dataType,h=ke(t.k),m=ke(d),y=ke(i),w=o.concat([a,i]),_=a>1&&i/y%2===0?2:1,k=O.size(w)/y/_,$=64,b=[],E=[l,a,s/h],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,d/m),b.push(...X(E)),b.push(...X(S)),b.push(...X(e[2].dims)),e.length===4&&b.push(...X(O.convertShape(e[3].dims)));let I=[l,a,i/y];b.push(...X(I));let C=z=>{let x=E.length,M=N("a",e[0].dataType,x,h),U=N("b",12,S.length,m),Y=N("scales",e[2].dataType,e[2].dims.length),G=[M,U,Y],j=e.length===4?N("zero_points",12,e[3].dims.length):void 0;j&&G.push(j);let R=I.length,D=H("output",e[0].dataType,R,y),F=Ie(e[0].dataType),J=(()=>{switch(h){case 1:return`array<${F}, 8>`;case 2:return`mat4x2<${F}>`;case 4:return`mat2x4<${F}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ee=Math.floor(32/t.bits),ne=Math.floor(ee/8),se=()=>{let Q="";for(let W=0;W<ne;W++){let Te=W*t.bits*4,ze=Te+t.bits;Q+=`
          // reuse a data (pass ${W})
            var input_offset${W>0?W:""} = ${W===0?M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${W>0?W:""}: ${J};
            for (var j${W>0?W:""}: u32 = 0; j${W>0?W:""} < ${8/h}; j${W>0?W:""}++) {
              a_data${W>0?W:""}[j${W>0?W:""}] = ${M.getByOffset(`input_offset${W>0?W:""}`)};
              input_offset${W>0?W:""}++;
            }
          `;for(let $e=0;$e<y*_;$e++)Q+=`
            b_value = ${m===1?`b${$e}_data`:`b${$e}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${W*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Te}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${ze}u) & b_mask);`}
            b_quantized_values = ${J}(${Array.from({length:4},(Oe,ge)=>`${F}(b_value_lower[${ge}]), ${F}(b_value_upper[${ge}])`).join(", ")});
            b_dequantized_values = ${h===1?`${J}(${Array.from({length:8},(Oe,ge)=>`(b_quantized_values[${ge}] - ${j?`zero_point${$e}`:"zero_point"}) * scale${$e}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${j?`zero_point${$e}`:"zero_point"}`).join(",")})) * scale${$e};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor($e/y)}]${y>1?`[${$e%y}]`:""} += ${Array.from({length:8/h},(Oe,ge)=>`${h===1?`a_data${W>0?W:""}[${ge}] * b_dequantized_values[${ge}]`:`dot(a_data${W>0?W:""}[${ge}], b_dequantized_values[${ge}])`}`).join(" + ")};
          `}return Q},P=()=>{let Q=`
            var col_index = col * ${y};
            ${j?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${F}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let W=0;W<y*_;W++)Q+=`
            let scale${W} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${j?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${F}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Q},Z=()=>{let Q=`col_index = col * ${y};`;for(let W=0;W<y*_;W++)Q+=`
            let b${W}_data = ${U.getByIndices(`${U.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Q+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,Q};return`
        var<workgroup> workgroup_shared: array<${D.type.value}, ${_*$}>;
        ${z.declareVariables(...G,D)}
        ${z.mainStart([$,1,1])}
          let output_indices = ${D.offsetToIndices(`(global_idx / ${$}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${P()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${Z()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${se()}
                word_offset += ${ee/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${D.type.value} = ${D.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${D.setByIndices(`${D.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${m};${y};${_};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:p}],dispatchGroup:{x:k},programUniforms:b}),getShaderSource:C}},Fd=(e,t)=>{let n=e[0].dims,r=n.length,a=n[r-2],s=t.k,i=t.n,o=n.slice(0,r-2),l=O.size(o),d=e[1].dims[2]/4,p=e[0].dataType,h=ke(t.k),m=ke(d),y=o.concat([a,i]),w=128,_=i%8===0?8:i%4===0?4:1,k=w/_,$=Math.floor(32/t.bits),b=k*m*$,E=b/h,S=b/t.blockSize,I=O.size(y)/_,C=[],z=[l,a,s/h],x=O.convertShape(e[1].dims).slice();x.splice(-1,1,d/m),C.push(...X(z)),C.push(...X(x)),C.push(...X(e[2].dims)),e.length===4&&C.push(...X(O.convertShape(e[3].dims)));let M=[l,a,i];C.push(...X(M));let U=Y=>{let G=z.length,j=N("a",e[0].dataType,G,h),R=N("b",12,x.length,m),D=N("scales",e[2].dataType,e[2].dims.length),F=[j,R,D],J=e.length===4?N("zero_points",12,e[3].dims.length):void 0;J&&F.push(J);let ee=M.length,ne=H("output",e[0].dataType,ee),se=Ie(e[0].dataType),P=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${j.type.value}, ${E}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${k}>, ${_}>;
        ${Y.declareVariables(...F,ne)}
        ${Y.mainStart([k,_,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${E};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${E}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${j.getByIndices(`${j.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${j.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${se}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${se}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${D.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let Z=Math.floor($/8),Q="";for(let W=0;W<Z;W++){let Te=W*t.bits*4,ze=Te+t.bits;Q+=`
              ${P()}
              {${t.bits===2?`
                let half_word = b_value >> ${W*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Te}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${ze}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${se}>(${Array.from({length:4},($e,Oe)=>`${se}(b_value_lower[${Oe}]), ${se}(b_value_upper[${Oe}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${se}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,Oe)=>`${`dot(a_data${Oe}, b_dequantized_values[${Oe}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return Q})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${k}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${m};${k};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:p}],dispatchGroup:{x:I},programUniforms:C}),getShaderSource:U}},zm=(e,t)=>{qd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Fd(e.inputs,t)):e.compute(Wd(e.inputs,t))},Om=e=>fe(e)}),Gd,Hd,jd,Kd,Xd,Yd,Qd,Zd,Rm,w_=L(()=>{te(),re(),ae(),Gd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Hd=(e,t,n)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
            k = i32(${e.indicesGet("indices",a)}) - ${K("uniforms.pads",a,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},jd=(e,t,n)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${K("uniforms.pads",a,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Kd=(e,t,n)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${K("uniforms.pads",a,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",a,t)})) {
                  k = i32(${K("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Xd=(e,t,n)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${K("uniforms.pads",a,n)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",a,t)})) {
                  k -= i32(${K("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Yd=(e,t,n)=>{switch(n.mode){case 0:return Hd(e,t,n.pads.length);case 1:return jd(e,t,n.pads.length);case 2:return Kd(e,t,n.pads.length);case 3:return Xd(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Qd=(e,t)=>{let n=O.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,a=O.size(n),s=[{type:12,data:a},{type:6,data:t.pads}],i=e.length>=3&&e[2].data;t.mode===0&&s.push({type:i?e[2].dataType:1,data:t.value}),s.push(...X(e[0].dims,n));let o=["rank"],l=d=>{let p=H("output",e[0].dataType,n.length),h=N("x",e[0].dataType,r.length),m=h.type.value,y=Yd(p,r.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:i?m:"f32"}),`
            ${d.registerUniforms(w).declareVariables(h,p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${i}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:s}),getShaderSource:l}},Zd=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)s[Number(o[l])]=Number(n[l]),s[Number(o[l])+a]=Number(n[l+o.length])}else n.forEach((o,l)=>s[Number(l)]=Number(o));let i=[];return s.forEach(o=>i.push(o)),{mode:t.mode,value:r,pads:i}}else return t},Rm=(e,t)=>{Gd(e.inputs);let n=Zd(e.inputs,t);e.compute(Qd(e.inputs,n),{inputs:[0]})}}),$n,Va,qa,Wa,Fa,Jd,ec,Ga,Ha,Bm,Nm,ja,Mm,Dm,Ka,Pm,Um,Lm,Vm,__=L(()=>{He(),te(),re(),ae(),$n=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Va=(e,t,n)=>{let r=t.format==="NHWC",a=e.dims.slice();r&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),i=t.kernelShape.slice(),o=t.strides.slice(),l=s?t.dilations.slice():[],d=t.pads.slice();kr.adjustPoolAttributes(n,a,i,o,l,d);let p=kr.computePoolOutputShape(n,a,o,l,i,d,t.autoPad),h=Object.assign({},t);s?Object.assign(h,{kernelShape:i,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:i,strides:o,pads:d,cacheKey:t.cacheKey});let m=p.slice();return m.push(m.splice(1,1)[0]),[h,r?m:p]},qa=(e,t)=>{let n=t.format==="NHWC",r=O.size(e),a=O.size(t.kernelShape),s=[{type:12,data:r},{type:12,data:a}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],h=!!(d+p);s.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:p}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];m=!!(_+k),s.push({type:12,data:y},{type:12,data:w},{type:12,data:_},{type:12,data:k}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,i,!0,h,m]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=O.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,p)=>d+p);return[s,i,!!l,!1,!1]}},Wa=(e,t,n,r,a,s,i,o,l,d,p,h)=>{let m=a.format==="NHWC",y=t.type.value,w=H("output",t.type.tensor,r);if(a.kernelShape.length<=2){let _="",k="",$="",b=n-(m?2:1);if(p?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,a.kernelShape.length===2){let E=n-(m?3:2);h?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${E}] < 0 || xIndices[${E}] >= uniforms.x_shape[${E}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${y}(${o});
              var pad = 0;
              ${k}
              ${_}
              ${$}
              ${i}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=a.kernelShape.length,k=a.pads.length,$="";return d?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${y}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${K("uniforms.pads","j - 2u",k)};
                  ${$}
              }
              ${i}

              output[global_idx] = value;
            }`}},Fa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Jd=e=>`${Fa(e)};${e.countIncludePad}`,ec=e=>`${Fa(e)};${e.storageOrder};${e.dilations}`,Ga=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ha=(e,t,n,r)=>{let[a,s]=Va(t,r,n),i=N("x",t.dataType,t.dims.length),o=i.type.value,l="value += x_val;",d="";a.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[p,h,m,y,w]=qa(s,a);p.push(...X(t.dims,s));let _=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${m};${y};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(s)/64)},programUniforms:p}),getShaderSource:k=>Wa(k,i,t.dims.length,s.length,a,l,d,0,h,m,y,w)}},Bm=e=>{let t=e.count_include_pad!==0,n=Ga(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Jd(r)}},Nm=(e,t)=>{$n(e.inputs),e.compute(Ha("AveragePool",e.inputs[0],!1,t))},ja={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Mm=e=>{let t=e.format;return{format:t,...ja,cacheKey:t}},Dm=(e,t)=>{$n(e.inputs),e.compute(Ha("GlobalAveragePool",e.inputs[0],!0,t))},Ka=(e,t,n,r)=>{let[a,s]=Va(t,r,n),i=`
      value = max(x_val, value);
    `,o="",l=N("x",t.dataType,t.dims.length),d=["rank"],[p,h,m,y,w]=qa(s,a);return p.push(...X(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${m};${y};${w}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(s)/64)},programUniforms:p}),getShaderSource:_=>Wa(_,l,t.dims.length,s.length,a,i,o,t.dataType===10?-65504:-1e5,h,m,y,w)}},Pm=(e,t)=>{$n(e.inputs),e.compute(Ka("MaxPool",e.inputs[0],!1,t))},Um=e=>{let t=e.storage_order,n=e.dilations,r=Ga(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:n,...r,cacheKey:""};return{...a,cacheKey:ec(a)}},Lm=e=>{let t=e.format;return{format:t,...ja,cacheKey:t}},Vm=(e,t)=>{$n(e.inputs),e.compute(Ka("GlobalMaxPool",e.inputs[0],!0,t))}}),tc,nc,qm,Wm,b_=L(()=>{te(),re(),Se(),ae(),tc=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,s)=>s===t.axis||a===e[0].dims[s]).reduce((a,s)=>a&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},nc=(e,t)=>{let n=O.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,a=r===3,s=e[0].dims,i=e[1].dataType,o=O.size(s),l=r===3||r===2,d=l?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,h=e.length>2?e[2]:void 0,m=h?l?[Math.ceil(O.size(h.dims)/4)]:h.dims:void 0,y=p.length===0||p.length===1&&p[0]===1,w=y===!1&&p.length===1,_=ke(o),k=y&&(!l||_===4),$=k?_:1,b=k&&!l?_:1,E=N("input",l?12:r,d.length,b),S=N("scale",i,p.length),I=h?N("zero_point",l?12:r,m.length):void 0,C=H("output",i,s.length,$),z=[E,S];I&&z.push(I);let x=[d,p];h&&x.push(m);let M=[{type:12,data:o/$},{type:12,data:n},{type:12,data:t.blockSize},...X(...x,s)],U=Y=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Y.registerUniforms(G).declareVariables(...z,C)}
      ${Y.mainStart()}
          ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${E.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${E.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${S.getByOffset("0")}`:w?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:w?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":E.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:U,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/$/64),y:1,z:1},programUniforms:M})}},qm=(e,t)=>{tc(e.inputs,t),e.compute(nc(e.inputs,t))},Wm=e=>fe({axis:e.axis,blockSize:e.blockSize})}),rc,ac,Fm,v_=L(()=>{He(),te(),ae(),rc=(e,t,n)=>{let r=e===t,a=e<t&&n<0,s=e>t&&n>0;if(r||a||s)throw new Error("Range these inputs' contents are invalid.")},ac=(e,t,n,r)=>{let a=Math.abs(Math.ceil((t-e)/n)),s=[a],i=a,o=[{type:12,data:i},{type:r,data:e},{type:r,data:n},...X(s)],l=d=>{let p=H("output",r,s.length),h=p.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${d.registerUniforms(m).declareVariables(p)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:o})}},Fm=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&rc(t,n,r),e.compute(ac(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),sc,ic,Gm,Hm,$_=L(()=>{te(),re(),Se(),ae(),sc=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${a}bitcast<${r}>(oldValue) + (${n})${s}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${a}max(bitcast<f32>(oldValue), (${n}))${s}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${a}min(bitcast<${r}>(oldValue), (${n}))${s}`;case"mul":return`${a}(bitcast<${r}>(oldValue) * (${n}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ic=(e,t)=>{let n=e[0].dims,r=e[1].dims,a=n,s=1,i=Math.ceil(O.sizeToDimension(r,r.length-1)/s),o=r[r.length-1],l=O.sizeFromDimension(n,o),d=[{type:12,data:i},{type:12,data:o},{type:12,data:l},...X(e[1].dims,e[2].dims,a)],p=h=>{let m=N("indices",e[1].dataType,e[1].dims.length),y=N("updates",e[2].dataType,e[2].dims.length,s),w=t.reduction!=="none"&&t.reduction!==""?_h("output",e[0].dataType,a.length):H("output",e[0].dataType,a.length,s);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,y,w)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${sc(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:p}},Gm=e=>fe({reduction:e.reduction}),Hm=(e,t)=>{e.compute(ic(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),oc,uc,lc,Xa,dc,cc,pc,hc,fc,mc,gc,yc,Ya,wc,_c,bc,vc,$c,jm,Km,x_=L(()=>{te(),re(),Se(),ae(),oc=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},uc=(e,t,n)=>{t.every(a=>a>=0&&a<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((a,s)=>r[a]=e[s]),r},lc=(e,t,n,r,a,s)=>{let[i,o,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(i>0&&e.length>i&&e[i].dims.length>0)e[i].getFloat32Array().forEach(p=>s.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(p=>r.push(p)),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");oc(r,t),t.axes.length>0&&uc(r,t.axes,d).forEach((p,h)=>r[h]=p)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(p=>a.push(Number(p))),a.length!==0&&a.length!==d&&n>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof a<"u"&&r.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Xa=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,dc=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Xa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Xa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",cc=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",pc=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),a=e.length===0?r:e.slice();return t.length>0?(t.forEach((s,i)=>{r[s]=a[i],r[i+n]=a[t.length+i]}),r):a},hc=(e,t,n,r)=>{let a=[];if(n.length>0)if(r.length>0){if(e.forEach(s=>a.push(s)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((s,i)=>a[s]=n[i])}else n.forEach(s=>a.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((s,i)=>Math.round(s*t[i]))}return a},fc=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return n.axes.length>0?(n.axes.forEach(s=>t[s]=r),n.axes.forEach(s=>a[s]=Math.round(e[s]*t[s]))):(t.fill(r,0,t.length),a.forEach((s,i)=>a[i]=Math.round(s*t[i]))),a},mc=(e,t,n,r,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",r)};
        var roi_low = ${K("uniforms.roi","i",a)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,gc=(e,t,n,r,a,s,i)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",s)};
          var roi_hi = ${K("uniforms.roi",`i + ${n.length}`,s)};
          var input_shape_i = ${K("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${i} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,yc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ya=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",wc=(e,t,n,r,a)=>{let[s,i,o,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",i,`max(0, min(row, ${n[i]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${n[o]} - 1))`)};
      ${Ya(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${i}];
      var col:${d} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${n[i]} - 1) || col < 0 || col > (${n[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${n[i]} - 1));
      col = max(0, min(col, ${n[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},_c=(e,t,n,r,a,s,i,o,l,d)=>{let p=n.length===2,[h,m]=p?[0,1]:[2,3],y=e.type.value,w=_=>{let k=_===h?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[_]},
        ${r[_]}, ${n[_]}, ${s[_]}, ${s[_]} + ${n.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${n[_]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${y} = originalIdx + ${y}(i);
          if (${k} < 0 || ${k} >= ${n[_]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${k} = max(0, min(${k}, ${n[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${k})`)};
          data[i + 1] = ${_===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(h)};
    ${w(m)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${i} * onePlusAbsS - 5 * ${i}) * onePlusAbsS + 8 * ${i}) * onePlusAbsS - 4 * ${i};
    coeffs[1] = ((${i} + 2) * absS - (${i} + 3)) * absS * absS + 1;
    coeffs[2] = ((${i} + 2) * oneMinusAbsS - (${i} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${i} * twoMinusAbsS - 5 * ${i}) * twoMinusAbsS + 8 * ${i}) * twoMinusAbsS - 4 * ${i};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},bc=(e,t,n,r,a)=>{let[s,i,o,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",i,`max(0, min(depth, ${n[i]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Ya(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${i}];
      var height:${p} = originalIndices[${o}];
      var width:${p} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${n[i]} - 1) || height < 0 || height > (${n[o]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${n[i]} - 1));
      height = max(0, min(height, ${n[o]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},vc=(e,t,n,r,a,s)=>{let i=e.dims,o=pc(s,t.axes,i.length),l=hc(i,r,a,t.axes),d=r.slice();r.length===0&&(d=i.map((b,E)=>b===0?1:l[E]/b),t.keepAspectRatioPolicy!=="stretch"&&(l=fc(i,d,t)));let p=H("output",e.dataType,l.length),h=N("input",e.dataType,i.length),m=O.size(l),y=i.length===l.length&&i.every((b,E)=>b===l[E]),w=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,k=h.type.value,$=b=>`
      ${y?"":`
      ${dc(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${yc(h,i)};
              ${cc(t.nearestMode,n,k)};
              ${gc(h,p,i,l,d.length,o.length,w)};
              `;case"linear":return`
              ${mc(p,i,l,d.length,o.length)};
              ${(()=>{if(i.length===2||i.length===4)return`${wc(h,p,i,w,_)}`;if(i.length===3||i.length===5)return`${bc(h,p,i,w,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(i.length===2||i.length===4)return`${_c(h,p,i,l,d,o,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(h,p)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${i.length===2||i.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${o.length>0?o:""}|${y}|${t.mode==="nearest"?i.length:i}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:o},...X(i,l)]})}},$c=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},jm=(e,t)=>{let n=[],r=[],a=[],s=$c(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");lc(e.inputs,t,s,n,r,a),e.compute(vc(e.inputs[0],t,s,n,r,a),{inputs:[0]})},Km=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,a=e.cubicCoeffA,s=e.excludeOutside!==0,i=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:a,excludeOutside:s,extrapolationValue:i,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),xc,kc,Xm,k_=L(()=>{te(),re(),ae(),xc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let i=e[3];if(i.dims.length!==1)throw new Error("Beta must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let i=e[4];if(i.dims.length!==1)throw new Error("Bias must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},kc=(e,t,n,r)=>{let a=t.simplified,s=e[0].dims,i=O.size(s),o=s,l=i,d=s.slice(-1)[0],p=r?s.slice(0,-1).concat(1):[],h=!a&&e.length>3,m=e.length>4,y=r&&n>1,w=r&&n>2,_=n>3,k=64,$=ke(d),b=[{type:12,data:l},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],E=I=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[N("x",e[0].dataType,e[0].dims,$),N("skip",e[1].dataType,e[1].dims,$),N("gamma",e[2].dataType,e[2].dims,$)];h&&z.push(N("beta",e[3].dataType,e[3].dims,$)),m&&z.push(N("bias",e[4].dataType,e[4].dims,$)),z.push(H("output",e[0].dataType,o,$)),y&&z.push(H("mean_output",1,p)),w&&z.push(H("inv_std_output",1,p)),_&&z.push(H("input_skip_bias_sum",e[0].dataType,o,$));let x=Ie(e[0].dataType),M=Ie(1,$);return`

      ${I.registerUniforms(C).declareVariables(...z)}
      var<workgroup> sum_shared : array<${M}, ${k}>;
      var<workgroup> sum_squared_shared : array<${M}, ${k}>;

      ${I.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${an(x,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Ct("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ct("square_sum",$)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:o,dataType:e[0].dataType}];return n>1&&S.push({dims:p,dataType:1}),n>2&&S.push({dims:p,dataType:1}),n>3&&S.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${w};${_}`,inputDependencies:e.map((I,C)=>"type")},getShaderSource:E,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:b})}},Xm=(e,t)=>{xc(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(kc(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Sc,xn,Ec,Qa,Tc,Ic,Ym,Qm,S_=L(()=>{te(),re(),Se(),ae(),Sc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},xn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},Ec=(e,t)=>{if(e.length>1){let n=xn(e,1),r=xn(e,2),a=xn(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),fe({starts:n,ends:r,axes:a})}else return t},Qa=(e,t,n,r,a)=>{let s=e;return e<0&&(s+=n[r[t]]),a[t]<0?Math.max(0,Math.min(s,n[r[t]]-1)):Math.max(0,Math.min(s,n[r[t]]))},Tc=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",n.length)};
            let steps_i = ${K("uniforms.steps","i",n.length)};
            let signs_i = ${K("uniforms.signs","i",n.length)};
            let starts_i = ${K("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Ic=(e,t)=>{let n=e[0].dims,r=O.size(n),a=t.axes.length>0?O.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],s=xn(e,4);s.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(a.length).fill(1));let i=t.starts.map(($,b)=>Qa($,b,n,a,s)),o=t.ends.map(($,b)=>Qa($,b,n,a,s));if(a.length!==i.length||a.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==n.length)for(let $=0;$<n.length;++$)a.includes($)||(i.splice($,0,0),o.splice($,0,n[$]),s.splice($,0,1));let l=s.map($=>Math.sign($));s.forEach(($,b,E)=>{if($<0){let S=(o[b]-i[b])/$,I=i[b],C=I+S*s[b];i[b]=C,o[b]=I,E[b]=-$}});let d=n.slice(0);a.forEach(($,b)=>{d[$]=Math.ceil((o[$]-i[$])/s[$])});let p={dims:d,dataType:e[0].dataType},h=H("output",e[0].dataType,d.length),m=N("input",e[0].dataType,e[0].dims.length),y=O.size(d),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:i.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],_=[{type:12,data:y},{type:12,data:i},{type:6,data:l},{type:12,data:s},...X(e[0].dims,d)],k=$=>`
      ${$.registerUniforms(w).declareVariables(m,h)}
        ${Tc(m,h,n)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${i.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:_})}},Ym=(e,t)=>{Sc(e.inputs,t);let n=Ec(e.inputs,t);e.compute(Ic(e.inputs,n),{inputs:[0]})},Qm=e=>{let t=e.starts,n=e.ends,r=e.axes;return fe({starts:t,ends:n,axes:r})}}),Cc,Ac,Zm,Jm,E_=L(()=>{te(),re(),Se(),zt(),ae(),Cc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Ac=(e,t)=>{let n=e.inputs[0],r=n.dims,a=O.size(r),s=r.length,i=O.normalizeAxis(t.axis,s),o=i<r.length-1,l,d=[];o?(d=Array.from({length:s},(z,x)=>x),d[i]=s-1,d[s-1]=i,l=e.compute(qe(n,d),{inputs:[n],outputs:[-1]})[0]):l=n;let p=l.dims,h=p[s-1],m=a/h,y=ke(h),w=h/y,_=64;m===1&&(_=256);let k=(z,x)=>x===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:x===2?`max(${z}.x, ${z}.y)`:x===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=N("x",l.dataType,l.dims,y),b=H("result",l.dataType,l.dims,y),E=$.type.value,S=Ie(l.dataType)==="f32"?`var threadMax = ${E}(-3.4028234663852886e+38f);`:`var threadMax = ${E}(-65504.0h);`,I=z=>`
      var<workgroup> rowMaxShared : ${E};
      var<workgroup> rowSumShared : ${E};
      var<workgroup> threadShared : array<${E}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${E} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${E}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables($,b)}
      ${z.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${E}(${k("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${E}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${E}(${Ct("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${E}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${y};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:w}]}),getShaderSource:I},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(qe(C,d),{inputs:[C]})},Zm=(e,t)=>{Cc(e.inputs),Ac(e,t)},Jm=e=>fe({axis:e.axis})}),Za,zc,Oc,Rc,eg,T_=L(()=>{te(),re(),ae(),Za=e=>Array.from(e.getBigInt64Array(),Number),zc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Za(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Oc=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Rc=(e,t)=>{let n=e[0].dims,r=t??Za(e[1]),a=Oc(n,r),s=O.size(a),i=e[0].dataType,o=N("input",i,n.length),l=H("output",i,a.length),d=p=>`
      const inputShape = ${o.indices(...n)};
      ${p.registerUniform("output_size","u32").declareVariables(o,l)}
      ${p.mainStart()}
      ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...X(e[0].dims,a)]}),getShaderSource:d}},eg=e=>{zc(e.inputs),e.compute(Rc(e.inputs),{inputs:[0]})}}),Bc,Nc,tg,I_=L(()=>{te(),re(),ae(),Bc=(e,t,n,r,a)=>{let s=H("output_data",a,n.length,4),i=N("a_data",t[1].dataType,t[1].dims.length,4),o=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),d,p=(h,m,y)=>`select(${m}, ${h}, ${y})`;if(!r)d=s.setByOffset("global_idx",p(i.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(m,y,w="")=>{let _=`a_data[index_a${y}][component_a${y}]`,k=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${i.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${m}[${y}] = ${w}(${p(_,k,$)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,i,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Nc=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,a=e[1].dataType,s=!(O.areEqual(t,n)&&O.areEqual(n,r)),i=t,o=O.size(t);if(s){let d=sn.calcShape(sn.calcShape(t,n,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");i=d,o=O.size(i)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Bc(d,e,i,s,a),getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...X(r,t,n,i)]})}},tg=e=>{e.compute(Nc(e.inputs))}}),ng,C_=L(()=>{Ww(),Xs(),Fw(),Gw(),Hw(),jw(),Kw(),Jw(),t_(),n_(),r_(),a_(),s_(),i_(),o_(),u_(),l_(),d_(),c_(),p_(),h_(),f_(),m_(),g_(),y_(),vm(),w_(),__(),b_(),v_(),$_(),Ks(),x_(),Em(),k_(),S_(),E_(),km(),T_(),zt(),Ys(),I_(),ng=new Map([["Abs",[Kh]],["Acos",[Xh]],["Acosh",[Yh]],["Add",[zf]],["ArgMax",[Fh,_s]],["ArgMin",[Wh,_s]],["Asin",[Qh]],["Asinh",[Zh]],["Atan",[Jh]],["Atanh",[ef]],["Attention",[Gh]],["AveragePool",[Nm,Bm]],["BatchNormalization",[Hh]],["BiasAdd",[jh]],["BiasSplitGelu",[Af]],["Cast",[nf,tf]],["Ceil",[af]],["Clip",[rf]],["Concat",[Vf,qf]],["Conv",[Ss,ks]],["ConvTranspose",[Zf,Qf]],["Cos",[sf]],["Cosh",[of]],["CumSum",[Jf,em]],["DepthToSpace",[tm,nm]],["DequantizeLinear",[qm,Wm]],["Div",[Of]],["Einsum",[rm,am]],["Elu",[uf,An]],["Equal",[Rf]],["Erf",[lf]],["Exp",[df]],["Expand",[sm]],["FastGelu",[im]],["Floor",[cf]],["FusedConv",[Ss,ks]],["Gather",[um,om]],["GatherElements",[fm,hm]],["GatherBlockQuantized",[cm,pm]],["GatherND",[lm,dm]],["Gelu",[pf]],["Gemm",[gm,mm]],["GlobalAveragePool",[Dm,Mm]],["GlobalMaxPool",[Vm,Lm]],["Greater",[Df]],["GreaterOrEqual",[Uf]],["GridSample",[ym,wm]],["GroupQueryAttention",[Tm]],["HardSigmoid",[bf,_f]],["InstanceNormalization",[Im]],["LayerNormalization",[Cm]],["LeakyRelu",[hf,An]],["Less",[Pf]],["LessOrEqual",[Lf]],["Log",[If]],["MatMul",[Am]],["MatMulNBits",[zm,Om]],["MaxPool",[Pm,Um]],["Mul",[Bf]],["MultiHeadAttention",[bm,_m]],["Neg",[mf]],["Not",[ff]],["Pad",[Rm]],["Pow",[Nf]],["QuickGelu",[Cf,An]],["Range",[Fm]],["Reciprocal",[gf]],["ReduceMin",[Ph]],["ReduceMean",[Rh]],["ReduceMax",[Dh]],["ReduceSum",[Lh]],["ReduceProd",[Uh]],["ReduceL1",[Bh]],["ReduceL2",[Nh]],["ReduceLogSum",[qh]],["ReduceLogSumExp",[Mh]],["ReduceSumSquare",[Vh]],["Relu",[yf]],["Resize",[jm,Km]],["RotaryEmbedding",[Sm]],["ScatterND",[Hm,Gm]],["Sigmoid",[wf]],["Sin",[vf]],["Sinh",[$f]],["Slice",[Ym,Qm]],["SkipLayerNormalization",[Xm]],["Split",[$m,xm]],["Sqrt",[xf]],["Softmax",[Zm,Jm]],["Sub",[Mf]],["Tan",[kf]],["Tanh",[Sf]],["ThresholdedRelu",[Tf,An]],["Tile",[eg]],["Transpose",[vh,$h]],["Where",[tg]]])}),rg,A_=L(()=>{He(),yt(),ae(),rg=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,a){ct(e.programInfo.name);let s=this.backend.device,i=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of n)o.push({binding:o.length,resource:{buffer:d.buffer}});a&&o.push({binding:o.length,resource:a});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}i.setPipeline(e.computePipeline),i.setBindGroup(0,l),i.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),tt(e.programInfo.name)}dispose(){}build(e,t){ct(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{n.features.has(d.feature)&&r.push(`enable ${d.extension};`)});let a=bh(t,this.backend.device.limits),s=e.getShaderSource(a),i=`${r.join(`
`)}
${a.additionalImplementations}
${s}`,o=n.createShaderModule({code:i,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${i}`);let l=n.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return tt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&n<=a&&r<=a)return[t,n,r];let s=t*n*r,i=Math.ceil(Math.sqrt(s));if(i>a){if(i=Math.ceil(Math.cbrt(s)),i>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[i,i,i]}else return[i,i,1]}}}),ag={};dn(ag,{WebGpuBackend:()=>sg});var Mc,Dc,Pc,sg,z_=L(()=>{He(),te(),yt(),mh(),Vw(),C_(),A_(),Mc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let a=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${a}`);break}case"rank":{let s=e[r].dims.length;n.push(`${a};${s}`);break}case"dims":{let s=e[r].dims.join(",");n.push(`${a};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Dc=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Mc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Pc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},sg=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},a=o=>t.features.has(o)&&n.push(o)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(r);let s=t,i=t.info??(typeof s.requestAdapterInfo=="function"?await s.requestAdapterInfo():void 0);this.adapterInfo=new Pc(i),this.gpuDataManager=wh(this),this.programManager=new rg(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Fs(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ct(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let r=0;r<t.length/2;r++){let a=n[r],s=a.kernelId,i=this.kernels.get(s),o=i.kernelType,l=i.kernelName,d=a.programName,p=a.inputTensorViews,h=a.outputTensorViews,m=t[r*2],y=t[r*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let w=Number(m-this.queryTimeBase),_=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(_))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(k=>({dims:k.dims,dataType:mt(k.dataType)})),outputsMetadata:h.map(k=>({dims:k.dims,dataType:mt(k.dataType)})),kernelId:s,kernelType:o,kernelName:l,programName:d,startTime:w,endTime:_});else{let k="";p.forEach((b,E)=>{k+=`input[${E}]: [${b.dims}] | ${mt(b.dataType)}, `});let $="";h.forEach((b,E)=>{$+=`output[${E}]: [${b.dims}] | ${mt(b.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${l}|${d}" ${k}${$}start time: ${w} ns, execution time: ${_-w} ns`)}vr("GPU",`${d}::${m}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),tt()}run(e,t,n,r,a,s){ct(e.name);let i=[];for(let b=0;b<t.length;++b){let E=t[b].data;if(E===0)continue;let S=this.gpuDataManager.get(E);if(!S)throw new Error(`no GPU data for input: ${E}`);i.push(S)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=n.length===0?o.map((b,E)=>E):n;if(p.length!==o.length)throw new Error(`Output size ${p.length} must be equal to ${o.length}.`);let h=[],m=[];for(let b=0;b<o.length;++b){if(!Number.isInteger(p[b])||p[b]<-3||p[b]>=s)throw new Error(`Invalid output index: ${p[b]}`);if(p[b]===-3)continue;let E=p[b]===-1,S=p[b]===-2,I=E||S?a(o[b].dataType,o[b].dims):r(p[b],o[b].dataType,o[b].dims);if(h.push(I),I.data===0)continue;let C=this.gpuDataManager.get(I.data);if(!C)throw new Error(`no GPU data for output: ${I.data}`);if(E&&this.temporaryData.push(C),S){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(C)}m.push(C)}if(i.length!==t.length||m.length!==h.length){if(m.length===0)return tt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let b=0,E=[];d.forEach(z=>{let x=typeof z.data=="number"?[z.data]:z.data;if(x.length===0)return;let M=z.type===10?2:4,U,Y;z.type===10?(Y=x.length>4?16:x.length>2?8:x.length*M,U=x.length>4?16:M*x.length):(Y=x.length<=2?x.length*M:16,U=16),b=Math.ceil(b/Y)*Y,E.push(b);let G=z.type===10?8:4;b+=x.length>4?Math.ceil(x.length/G)*U:x.length*M});let S=16;b=Math.ceil(b/S)*S;let I=new ArrayBuffer(b);d.forEach((z,x)=>{let M=E[x],U=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(I,M,U.length).set(U);else if(z.type===12)new Uint32Array(I,M,U.length).set(U);else if(z.type===10)new Uint16Array(I,M,U.length).set(U);else if(z.type===1)new Float32Array(I,M,U.length).set(U);else throw new Error(`Unsupported uniform type: ${mt(z.type)}`)});let C=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,I,0,b),this.gpuDataManager.release(C.id),y={offset:0,size:b,buffer:C.buffer}}let w=this.programManager.normalizeDispatchGroupSize(l),_=w[1]===1&&w[2]===1,k=Dc(e,t,_),$=this.programManager.getArtifact(k);if($||($=this.programManager.build(e,w),this.programManager.setArtifact(k,$),de("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let b=0;b<d.length;b++){let E=d[b],S=E.type,I=typeof E.data=="number"?1:E.data.length,[C,z]=$.uniformVariablesInfo[b];if(S!==C||I!==z)throw new Error(`Uniform variable ${b} mismatch: expect type ${C} with size ${z}, got type ${S} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run($,i,m,w,y),tt(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let a=ng.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:r,kernelEntry:a[0],attributes:[a[1],n]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let a=r.kernelType,s=r.kernelName,i=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),i(t,o[1]),0}catch(d){return n.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${d}`)),1}finally{l&&n.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),i=this.gpuDataManager.registerExternalBuffer(n,r,s);return a.set(t,[i,n]),i}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await gs(this,e,t);return Gs(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let a=this.getComputePassEncoder(),s=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),ig={};dn(ig,{init:()=>og});var cr,Uc,og,O_=L(()=>{te(),yt(),re(),Lw(),cr=class ug{constructor(t,n,r,a){this.module=t,this.dataType=n,this.data=r,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new ug(this.module,this.dataType,this.data,t)}},Uc=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,a=n/e.PTR_SIZE,s=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*a++,s));let i=Number(e.getValue(r*a++,s));this.outputCount=Number(e.getValue(r*a++,s)),this.customDataOffset=Number(e.getValue(r*a++,"*")),this.customDataSize=Number(e.getValue(r*a++,s));let o=[];for(let l=0;l<i;l++){let d=Number(e.getValue(r*a++,s)),p=Number(e.getValue(r*a++,"*")),h=Number(e.getValue(r*a++,s)),m=[];for(let y=0;y<h;y++)m.push(Number(e.getValue(r*a++,s)));o.push(new cr(e,d,p,m))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(i=>typeof i=="number"?this.inputs[i]:i)??this.inputs,r=t?.outputs??[],a=(i,o,l)=>new cr(this.module,o,this.output(i,l),l),s=(i,o)=>{let l=Wt(i,o);if(!l)throw new Error(`Unsupported data type: ${i}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new cr(this.module,i,d,o)};return this.backend.run(e,n,r,a,s,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,a=r===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*r);this.module.setValue(s,t.length,a);for(let i=0;i<t.length;i++)this.module.setValue(s+r*(i+1),t[i],a);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},og=async(e,t,n,r)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(z_(),Nn(ag)).WebGpuBackend,i=new s;await i.initialize(n,r),a("webgpu",[i,o=>i.alloc(Number(o)),o=>i.free(o),(o,l,d,p=!1)=>{if(p)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(o),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let h=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));i.upload(Number(l),h)}},async(o,l,d)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await i.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>i.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>i.releaseKernel(o),(o,l,d,p)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let h=new Uc(t,i,Number(l));return i.computeKernel(Number(o),h,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let s=new yh(n);a("webnn",[s,()=>s.reserveTensorId(),i=>s.releaseTensorId(i),async(i,o,l,d,p)=>s.ensureTensor(i,o,l,d,p),(i,o)=>{s.uploadTensor(i,o)},async(i,o)=>s.downloadTensor(i,o),(i,o)=>s.registerMLContext(i,o),!!n.trace])}}}),Lc,ni,ri,kt,Vc,Ja,Ir,ai,si,es,ii,oi,ui,lg=L(()=>{He(),Dw(),Pw(),te(),Yt(),Ls(),ch(),Lc=(e,t)=>{we()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},ni=async e=>{Lc(e.wasm.numThreads,xr(e.logLevel))},ri=async(e,t)=>{we().asyncInit?.();let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(O_(),Nn(ig)).init;t==="webgpu"&&await r("webgpu",we(),e,n),t==="webnn"&&await r("webnn",we(),e)}},kt=new Map,Vc=e=>{let t=we(),n=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,a,a+r)!==0&&me("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+r,s))]}finally{t.stackRestore(n)}},Ja=(e,t)=>{let n=we(),r=n.stackSave(),a=0;try{let s=n.PTR_SIZE,i=n.stackAlloc(2*s);n._OrtGetInputOutputMetadata(e,t,i,i+s)!==0&&me("Can't get session input/output metadata.");let o=Number(n.getValue(i,"*"));a=Number(n.getValue(i+s,"*"));let l=n.HEAP32[a/4];if(l===0)return[o,0];let d=n.HEAPU32[a/4+1],p=[];for(let h=0;h<d;h++){let m=Number(n.getValue(a+8+h*s,"*"));p.push(m!==0?n.UTF8ToString(m):Number(n.getValue(a+8+(h+d)*s,"*")))}return[o,l,p]}finally{n.stackRestore(r),a!==0&&n._OrtFree(a)}},Ir=e=>{let t=we(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},ai=async(e,t)=>{let n,r,a=we();Array.isArray(e)?[n,r]=e:e.buffer===a.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Ir(e);let s=0,i=0,o=0,l=[],d=[],p=[];try{if([i,l]=await dh(t),t?.externalData&&a.mountExternalData){let S=[];for(let I of t.externalData){let C=typeof I=="string"?I:I.path;S.push(Ws(typeof I=="string"?I:I.data).then(z=>{a.mountExternalData(C,z)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof S!="string"){let I=S,C=I?.context,z=I?.gpuDevice,x=I?.deviceType,M=I?.powerPreference;C?a.currentContext=C:z?a.currentContext=await a.webnnCreateMLContext(z):a.currentContext=await a.webnnCreateMLContext({deviceType:x,powerPreference:M})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(n,r,i),a.webgpuOnCreateSession?.(s),s===0&&me("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[h,m]=Vc(s),y=!!t?.enableGraphCapture,w=[],_=[],k=[],$=[],b=[];for(let S=0;S<h;S++){let[I,C,z]=Ja(s,S);I===0&&me("Can't get an input name."),d.push(I);let x=a.UTF8ToString(I);w.push(x),k.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:mt(C),shape:z})}for(let S=0;S<m;S++){let[I,C,z]=Ja(s,S+h);I===0&&me("Can't get an output name."),p.push(I);let x=a.UTF8ToString(I);_.push(x),$.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:mt(C),shape:z});{if(y&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let M=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",U=a.webnnIsGraphOutput;if(M==="cpu"&&U&&U(s,x)){b.push("ml-tensor-cpu-output");continue}if(M!=="cpu"&&M!=="cpu-pinned"&&M!=="gpu-buffer"&&M!=="ml-tensor")throw new Error(`Not supported preferred output location: ${M}.`);if(y&&M!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${M}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(M)}}let E=null;return b.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(o=a._OrtCreateBinding(s),o===0&&me("Can't create IO binding."),E={handle:o,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>fs(S))}),kt.set(s,[s,d,p,E,y,!1]),[s,w,_,k,$]}catch(h){throw d.forEach(m=>a._OrtFree(m)),p.forEach(m=>a._OrtFree(m)),o!==0&&a._OrtReleaseBinding(o)!==0&&me("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&me("Can't release session."),h}finally{a._free(n),i!==0&&a._OrtReleaseSessionOptions(i)!==0&&me("Can't release session options."),l.forEach(h=>a._free(h)),a.unmountExternalData?.()}},si=e=>{let t=we(),n=kt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,a,s,i,o]=n;i&&(o&&t._OrtClearBoundOutputs(i.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(i.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&me("Can't release session."),kt.delete(e)},es=async(e,t,n,r,a,s,i=!1)=>{if(!e){t.push(0);return}let o=we(),l=o.PTR_SIZE,d=e[0],p=e[1],h=e[3],m=h,y,w;if(d==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let $=e[2].gpuBuffer;w=Wt(qt(d),p);{let b=o.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=b(r,s,$,w)}}else if(h==="ml-tensor"){let $=e[2].mlTensor;w=Wt(qt(d),p);let b=o.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=b(r,$,qt(d),p)}else{let $=e[2];if(Array.isArray($)){w=l*$.length,y=o._malloc(w),n.push(y);for(let b=0;b<$.length;b++){if(typeof $[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);o.setValue(y+b*l,et($[b],n),"*")}}else{let b=o.webnnIsGraphInput,E=o.webnnIsGraphOutput;if(d!=="string"&&b&&E){let S=o.UTF8ToString(a);if(b(r,S)||E(r,S)){let I=qt(d);w=Wt(I,p),m="ml-tensor";let C=o.webnnCreateTemporaryTensor,z=o.webnnUploadTensor;if(!C||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await C(r,I,p);z(x,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=x}else w=$.byteLength,y=o._malloc(w),n.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,w),y)}else w=$.byteLength,y=o._malloc(w),n.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,w),y)}}let _=o.stackSave(),k=o.stackAlloc(4*p.length);try{p.forEach((b,E)=>o.setValue(k+E*l,b,l===4?"i32":"i64"));let $=o._OrtCreateTensor(qt(d),y,w,k,p.length,fs(m));$===0&&me(`Can't create tensor for input/output. session=${r}, index=${s}.`),t.push($)}finally{o.stackRestore(_)}},ii=async(e,t,n,r,a,s)=>{let i=we(),o=i.PTR_SIZE,l=kt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],h=l[2],m=l[3],y=l[4],w=l[5],_=t.length,k=r.length,$=0,b=[],E=[],S=[],I=[],C=[],z=i.stackSave(),x=i.stackAlloc(_*o),M=i.stackAlloc(_*o),U=i.stackAlloc(k*o),Y=i.stackAlloc(k*o);try{[$,b]=lh(s),Gt("wasm prepareInputOutputTensor");for(let D=0;D<_;D++)await es(n[D],E,I,e,p[t[D]],t[D],y);for(let D=0;D<k;D++)await es(a[D],S,I,e,h[r[D]],_+r[D],y);Ht("wasm prepareInputOutputTensor");for(let D=0;D<_;D++)i.setValue(x+D*o,E[D],"*"),i.setValue(M+D*o,p[t[D]],"*");for(let D=0;D<k;D++)i.setValue(U+D*o,S[D],"*"),i.setValue(Y+D*o,h[r[D]],"*");if(m&&!w){let{handle:D,outputPreferredLocations:F,outputPreferredLocationsEncoded:J}=m;if(p.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${p.length}).`);Gt("wasm bindInputsOutputs");for(let ee=0;ee<_;ee++){let ne=t[ee];await i._OrtBindInput(D,p[ne],E[ee])!==0&&me(`Can't bind input[${ee}] for session=${e}.`)}for(let ee=0;ee<k;ee++){let ne=r[ee];a[ee]?.[3]?(C.push(S[ee]),i._OrtBindOutput(D,h[ne],S[ee],0)!==0&&me(`Can't bind pre-allocated output[${ee}] for session=${e}.`)):i._OrtBindOutput(D,h[ne],0,J[ne])!==0&&me(`Can't bind output[${ee}] to ${F[ee]} for session=${e}.`)}Ht("wasm bindInputsOutputs"),kt.set(e,[d,p,h,m,y,!0])}i.jsepOnRunStart?.(d),i.webnnOnRunStart?.(d);let G;m?G=await i._OrtRunWithBinding(d,m.handle,k,U,$):G=await i._OrtRun(d,M,x,_,Y,k,U,$),G!==0&&me("failed to call OrtRun().");let j=[],R=[];Gt("wasm ProcessOutputTensor");for(let D=0;D<k;D++){let F=Number(i.getValue(U+D*o,"*"));if(F===S[D]||C.includes(S[D])){j.push(a[D]),F!==S[D]&&i._OrtReleaseTensor(F)!==0&&me("Can't release tensor.");continue}let J=i.stackSave(),ee=i.stackAlloc(4*o),ne=!1,se,P=0;try{i._OrtGetTensorData(F,ee,ee+o,ee+2*o,ee+3*o)!==0&&me(`Can't access output tensor data on index ${D}.`);let Z=o===4?"i32":"i64",Q=Number(i.getValue(ee,Z));P=i.getValue(ee+o,"*");let W=i.getValue(ee+o*2,"*"),Te=Number(i.getValue(ee+o*3,Z)),ze=[];for(let ge=0;ge<Te;ge++)ze.push(Number(i.getValue(W+ge*o,Z)));i._OrtFree(W)!==0&&me("Can't free memory for tensor dims.");let $e=ze.reduce((ge,ve)=>ge*ve,1);se=mt(Q);let Oe=m?.outputPreferredLocations[r[D]];if(se==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ge=[];for(let ve=0;ve<$e;ve++){let Be=i.getValue(P+ve*o,"*"),Vn=i.getValue(P+(ve+1)*o,"*"),rt=ve===$e-1?void 0:Vn-Be;ge.push(i.UTF8ToString(Be,rt))}j.push([se,ze,ge,"cpu"])}else if(Oe==="gpu-buffer"&&$e>0){let ge=i.jsepGetBuffer;if(!ge)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ve=ge(P),Be=Wt(Q,$e);if(Be===void 0||!Vs(se))throw new Error(`Unsupported data type: ${se}`);ne=!0,j.push([se,ze,{gpuBuffer:ve,download:i.jsepCreateDownloader(ve,Be,se),dispose:()=>{i._OrtReleaseTensor(F)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&$e>0){let ge=i.webnnEnsureTensor,ve=i.webnnIsGraphInputOutputTypeSupported;if(!ge||!ve)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Wt(Q,$e)===void 0||!qs(se))throw new Error(`Unsupported data type: ${se}`);if(!ve(e,se,!1))throw new Error(`preferredLocation "ml-tensor" for ${se} output is not supported by current WebNN Context.`);let Be=await ge(e,P,Q,ze,!1);ne=!0,j.push([se,ze,{mlTensor:Be,download:i.webnnCreateMLTensorDownloader(P,se),dispose:()=>{i.webnnReleaseTensorId(P),i._OrtReleaseTensor(F)}},"ml-tensor"])}else if(Oe==="ml-tensor-cpu-output"&&$e>0){let ge=i.webnnCreateMLTensorDownloader(P,se)(),ve=j.length;ne=!0,R.push((async()=>{let Be=[ve,await ge];return i.webnnReleaseTensorId(P),i._OrtReleaseTensor(F),Be})()),j.push([se,ze,[],"cpu"])}else{let ge=Or(se),ve=new ge($e);new Uint8Array(ve.buffer,ve.byteOffset,ve.byteLength).set(i.HEAPU8.subarray(P,P+ve.byteLength)),j.push([se,ze,ve,"cpu"])}}finally{i.stackRestore(J),se==="string"&&P&&i._free(P),ne||i._OrtReleaseTensor(F)}}m&&!y&&(i._OrtClearBoundOutputs(m.handle)!==0&&me("Can't clear bound outputs."),kt.set(e,[d,p,h,m,y,!1]));for(let[D,F]of await Promise.all(R))j[D][2]=F;return Ht("wasm ProcessOutputTensor"),j}finally{i.webnnOnRunEnd?.(d),i.stackRestore(z),E.forEach(G=>i._OrtReleaseTensor(G)),S.forEach(G=>i._OrtReleaseTensor(G)),I.forEach(G=>i._free(G)),$!==0&&i._OrtReleaseRunOptions($),b.forEach(G=>i._free(G))}},oi=e=>{let t=we(),n=kt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],a=t._OrtEndProfiling(r);a===0&&me("Can't get an profile file name."),t._OrtFree(a)},ui=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),St,Fe,en,kn,Sn,pr,ts,hr,Pt,Ut,qc,dg,cg,pg,hg,fg,mg,gg,yg=L(()=>{He(),lg(),Yt(),Ps(),St=()=>!!be.wasm.proxy&&typeof document<"u",en=!1,kn=!1,Sn=!1,hr=new Map,Pt=(e,t)=>{let n=hr.get(e);n?n.push(t):hr.set(e,[t])},Ut=()=>{if(en||!kn||Sn||!Fe)throw new Error("worker not ready")},qc=e=>{switch(e.data.type){case"init-wasm":en=!1,e.data.err?(Sn=!0,ts[1](e.data.err)):(kn=!0,ts[0]()),pr&&(URL.revokeObjectURL(pr),pr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=hr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},dg=async()=>{if(!kn){if(en)throw new Error("multiple calls to 'initWasm()' detected.");if(Sn)throw new Error("previous call to 'initWasm()' failed.");if(en=!0,St())return new Promise((e,t)=>{Fe?.terminate(),oh().then(([n,r])=>{try{Fe=r,Fe.onerror=s=>t(s),Fe.onmessage=qc,ts=[e,t];let a={type:"init-wasm",in:be};!a.in.wasm.wasmPaths&&(n||hs)&&(a.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm",import.meta.url).href,import.meta.url).href}),Fe.postMessage(a),pr=n}catch(a){t(a)}},t)});try{await Us(be.wasm),await ni(be),kn=!0}catch(e){throw Sn=!0,e}finally{en=!1}}},cg=async e=>{if(St())return Ut(),new Promise((t,n)=>{Pt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:be}};Fe.postMessage(r)});await ri(be,e)},pg=async e=>St()?(Ut(),new Promise((t,n)=>{Pt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Fe.postMessage(r,[e.buffer])})):Ir(e),hg=async(e,t)=>{if(St()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ut(),new Promise((n,r)=>{Pt("create",[n,r]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Fe.postMessage(a,s)})}else return ai(e,t)},fg=async e=>{if(St())return Ut(),new Promise((t,n)=>{Pt("release",[t,n]);let r={type:"release",in:e};Fe.postMessage(r)});si(e)},mg=async(e,t,n,r,a,s)=>{if(St()){if(n.some(i=>i[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(i=>i))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ut(),new Promise((i,o)=>{Pt("run",[i,o]);let l=n,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:s}};Fe.postMessage(d,ui(l))})}else return ii(e,t,n,r,a,s)},gg=async e=>{if(St())return Ut(),new Promise((t,n)=>{Pt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Fe.postMessage(r)});oi(e)}}),ns,Wc,wg,R_=L(()=>{He(),yg(),te(),Ds(),ch(),ns=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Wc=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vs(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:a}=e[2];return Ge.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:a})}case"ml-tensor":{let t=e[0];if(!qs(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:a}=e[2];return Ge.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},wg=class{async fetchModelAndCopyToWasmMemory(e){return pg(await Ws(e))}async loadModel(e,t){ct();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await hg(n,t),tt()}async dispose(){return fg(this.sessionId)}async run(e,t,n){ct();let r=[],a=[];Object.entries(e).forEach(h=>{let m=h[0],y=h[1],w=this.inputNames.indexOf(m);if(w===-1)throw new Error(`invalid input '${m}'`);r.push(y),a.push(w)});let s=[],i=[];Object.entries(t).forEach(h=>{let m=h[0],y=h[1],w=this.outputNames.indexOf(m);if(w===-1)throw new Error(`invalid output '${m}'`);s.push(y),i.push(w)});let o=r.map((h,m)=>ns(h,()=>`input "${this.inputNames[a[m]]}"`)),l=s.map((h,m)=>h?ns(h,()=>`output "${this.outputNames[i[m]]}"`):null),d=await mg(this.sessionId,a,o,i,l,n),p={};for(let h=0;h<d.length;h++)p[this.outputNames[i[h]]]=s[h]??Wc(d[h]);return tt(),p}startProfiling(){}endProfiling(){gg(this.sessionId)}}}),_g={};dn(_g,{OnnxruntimeWebAssemblyBackend:()=>Is,initializeFlags:()=>Ts,wasmBackend:()=>bg});var Ts,Is,bg,B_=L(()=>{He(),yg(),R_(),Ts=()=>{(typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0);let e=be.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),be.wasm.simd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let t=typeof navigator>"u"?_w("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Is=class{async init(e){Ts(),await dg(),await cg(e)}async createInferenceSessionHandler(e,t){let n=new wg;return await n.loadModel(e,t),n}},bg=new Is});He();He();He();var N_="1.27.0";{let e=(B_(),Nn(_g)).wasmBackend;rn("webgpu",e,5),rn("webnn",e,5),rn("cpu",e,10),rn("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:N_,enumerable:!0});const vg="fetch-cache",M_=()=>typeof caches<"u"?caches:void 0,D_=e=>{console.warn(`fetch-cache: キャッシュ ${e.op} に失敗したため network へ縮退します (${e.url})`,e.error)},P_=e=>{const t=e.headers.get("content-length");if(t===null)return;const n=Number(t);return Number.isFinite(n)&&n>=0?n:void 0},U_=async(e,t)=>{const n=P_(e),r=e.body;if(r===null){const d=new Uint8Array(await e.arrayBuffer());return t?.({loaded:d.length,total:n}),d}const a=[];let s=0;const i=r.getReader();for(;;){const{done:d,value:p}=await i.read();if(d)break;a.push(p),s+=p.length,t?.({loaded:s,total:n})}const o=new Uint8Array(s);let l=0;for(const d of a)o.set(d,l),l+=d.length;return o},Cs=async(e,t)=>(await t.validate?.(e),t.decode===void 0?e:await t.decode(e)),rs=new Map,as=(e,t)=>n=>{try{e(n)}catch(r){console.warn(`fetch-cache: onProgress リスナーが throw しました（通知のみ中断・取得は続行） (${t})`,r)}},Fc=async(e,t,n)=>{const r=t.fetch??globalThis.fetch,a=t.cacheName??vg,s=t.onCacheError??D_,i=t.cache??!0?t.caches??M_():void 0;let o;if(i!==void 0)try{o=await i.open(a)}catch(h){s({op:"open",url:e,error:h})}if(o!==void 0){let h;try{const m=await o.match(e);h=m===void 0?void 0:new Uint8Array(await m.arrayBuffer())}catch(m){s({op:"match",url:e,error:m})}if(h!==void 0)try{return{raw:h,decoded:await Cs(h,t)}}catch{try{await o.delete(e)}catch(m){s({op:"delete",url:e,error:m})}}}const l=await r(e,t.init);if(!l.ok)throw await l.body?.cancel().catch(()=>{}),new Error(`fetch-cache: HTTP ${l.status} ${l.statusText} (${e})`);const d=await U_(l,n),p=await Cs(d,t);if(o!==void 0)try{await o.put(e,new Response(d))}catch(h){s({op:"put",url:e,error:h})}return{raw:d,decoded:p}},$g=async(e,t={})=>{const n=typeof e=="string"?e:e.href,r=(t.init?.method??"GET").toUpperCase();if((t.cache??!0)&&r!=="GET")throw new Error(`fetch-cache: GET 以外（${r}）はキャッシュできません（Cache API の制約）。cache: false を指定してください (${n})`);if(t.cache===!1){const{decoded:h}=await Fc(n,t,t.onProgress===void 0?void 0:as(t.onProgress,n));return h}const a=`${t.cacheName??vg}\0${n}`,s=rs.get(a);if(s!==void 0){if(t.onProgress!==void 0){const m=as(t.onProgress,n);s.listeners.add(m),s.state.last!==void 0&&m(s.state.last)}const{raw:h}=await s.promise;return await Cs(h,t)}const i=new Set;t.onProgress!==void 0&&i.add(as(t.onProgress,n));const o={},d=Fc(n,t,h=>{o.last=h;for(const m of i)m(h)}).finally(()=>{rs.delete(a)});rs.set(a,{promise:d,listeners:i,state:o});const{decoded:p}=await d;return p},xg="https://huggingface.co",L_="fetch-cache-hf",V_={model:"",dataset:"datasets/",space:"spaces/"},q_={model:"models",dataset:"datasets",space:"spaces"},kg=e=>/^[0-9a-f]{40}$/.test(e),W_=e=>e.split("/").map(encodeURIComponent).join("/"),F_=e=>{const t=e.hubUrl??xg,n=e.kind??"model",r=e.revision??"main";return`${t}/${V_[n]}${e.repo}/resolve/${encodeURIComponent(r)}/${W_(e.path)}`},li=async(e,t={})=>{const n=e.revision??"main";if(kg(n))return n;const r=e.hubUrl??xg,a=e.kind??"model",s=`${r}/api/${q_[a]}/${e.repo}/revision/${encodeURIComponent(n)}`,o=await(t.fetch??globalThis.fetch)(s,t.init);if(!o.ok)throw await o.body?.cancel().catch(()=>{}),new Error(`fetch-cache: HTTP ${o.status} ${o.statusText} (${s})`);const l=await o.json();if(typeof l.sha!="string"||l.sha==="")throw new Error(`fetch-cache: revision 解決応答に sha が無い (${s})`);return l.sha},G_=async e=>{if(typeof crypto>"u"||crypto.subtle===void 0)throw new Error("fetch-cache: crypto.subtle が利用できないため sha256 検証ができません");const t=await crypto.subtle.digest("SHA-256",new Uint8Array(e));return Array.from(new Uint8Array(t),n=>n.toString(16).padStart(2,"0")).join("")},H_=e=>{if(!(e.expectedBytes===void 0&&e.sha256===void 0&&e.validate===void 0))return async t=>{if(e.expectedBytes!==void 0&&t.length!==e.expectedBytes)throw new Error(`fetch-cache: ${e.path} のバイト数不一致: ${t.length} != ${e.expectedBytes}`);if(e.sha256!==void 0){const n=await G_(t);if(n!==e.sha256)throw new Error(`fetch-cache: ${e.path} の SHA-256 不一致: ${n} != ${e.sha256}`)}await e.validate?.(t)}},j_=(e,t,n,r)=>{const a=F_({...e,revision:t,path:n.path}),s=r.onProgress;return $g(a,{cache:!0,cacheName:r.cacheName??L_,validate:H_(n),decode:n.decode,onProgress:s===void 0?void 0:i=>s({...i,path:n.path}),onCacheError:r.onCacheError,init:r.init,fetch:r.fetch,caches:r.caches})},K_=e=>typeof e=="string"?{path:e}:e,X_=async(e,t,n={})=>{const r=await li(e,{fetch:n.fetch,init:n.init}),a=Object.keys(t),s=await Promise.all(a.map(async i=>[i,await j_(e,r,K_(t[i]),n)]));return Object.fromEntries(s)},Y_=e=>{if(e.length!==4)throw new Error(`4cc は4文字: ${e}`);return(e.charCodeAt(0)|e.charCodeAt(1)<<8|e.charCodeAt(2)<<16|e.charCodeAt(3)<<24)>>>0},Q_=Y_("JTD1"),Gc=1,ss=16,Hc=16,jc=8;class Sg{buffer;sections;constructor(t){this.buffer=t;const n=new DataView(t);if(t.byteLength<ss)throw new Error("JTD1: ヘッダが短すぎる");if(n.getUint32(0,!0)!==Q_)throw new Error("JTD1: magic 不一致");const r=n.getUint32(4,!0);if(r!==Gc)throw new Error(`JTD1: formatVersion ${r} は非対応（期待: ${Gc}）`);const a=n.getUint32(8,!0);if(ss+a*Hc>t.byteLength)throw new Error(`JTD1: sectionCount ${a} がファイルサイズに対して過大`);this.sections=new Map;for(let s=0;s<a;s++){const i=ss+s*Hc,o=String.fromCharCode(n.getUint8(i),n.getUint8(i+1),n.getUint8(i+2),n.getUint8(i+3)),l=n.getUint32(i+4,!0),d=n.getUint32(i+8,!0),p=n.getUint32(i+12,!0);if(d%jc!==0)throw new Error(`JTD1: セクション ${o} が ${jc}B 境界にない`);if(d+p>t.byteLength)throw new Error(`JTD1: セクション ${o} がファイル末尾を超える`);this.sections.set(o,{encoding:l,offset:d,length:p})}}section(t){const n=this.sections.get(t);if(!n)throw new Error(`JTD1: セクション ${t} が存在しない`);return n}has(t){return this.sections.has(t)}}const Z_=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})(),J_=e=>{let t=4294967295;for(let n=0;n<e.length;n++)t=Z_[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0},Eg=e=>J_(e).toString(16).padStart(8,"0"),En=e=>(e=e-(e>>>1&1431655765),e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24),ut=8;class Kc{words;bitLength;blockRank1;totalOnes;constructor(t,n){if(n>t.length*32)throw new Error(`bitLength ${n} が words の容量を超えている`);const r=n&31;if(r!==0&&n>0&&t[n-1>>>5]>>>r)throw new Error("ビット長を超えた位置に 1 が立っている（書き手のバグ）");this.words=t,this.bitLength=n;const a=Math.ceil(t.length/ut)+1;this.blockRank1=new Uint32Array(a);let s=0;for(let i=0;i*ut<t.length;i++){this.blockRank1[i]=s;const o=Math.min((i+1)*ut,t.length);for(let l=i*ut;l<o;l++)s+=En(t[l])}this.blockRank1[this.blockRank1.length-1]=s,this.totalOnes=s}get(t){return(this.words[t>>>5]>>>(t&31)&1)===1}rank1(t){if(t<=0)return 0;if(t>=this.bitLength)return this.totalOnes;const n=t>>>5,r=n/ut|0;let a=this.blockRank1[r];for(let i=r*ut;i<n;i++)a+=En(this.words[i]);const s=t&31;return s!==0&&(a+=En(this.words[n]&(1<<s)-1)),a}rank0(t){const n=Math.min(Math.max(t,0),this.bitLength);return n-this.rank1(n)}get ones(){return this.totalOnes}select1(t){if(t<=0||t>this.totalOnes)return-1;let n=0,r=this.blockRank1.length-1;for(;n+1<r;){const s=n+r>>>1;this.blockRank1[s]<t?n=s:r=s}let a=t-this.blockRank1[n];for(let s=n*ut;s<this.words.length;s++){const i=En(this.words[s]);if(a>i){a-=i;continue}return s*32+Xc(this.words[s],a)}return-1}select0(t){if(t<=0||t>this.bitLength-this.totalOnes)return-1;let n=0,r=this.blockRank1.length-1;for(;n+1<r;){const s=n+r>>>1;s*ut*32-this.blockRank1[s]<t?n=s:r=s}let a=t-(n*ut*32-this.blockRank1[n]);for(let s=n*ut;s<this.words.length;s++){const i=32-En(this.words[s]);if(a>i){a-=i;continue}return s*32+Xc(~this.words[s]>>>0,a)}return-1}}const Xc=(e,t)=>{let n=e;for(let r=1;r<t;r++)n&=n-1;return 31-Math.clz32(n&-n)};class eb{nodeCount;surfaceCount;lbs;labels;terminal;constructor(t,n,r,a,s){if(n.length!==a)throw new Error(`labels 長 ${n.length} != nodeCount ${a}`);if(r.ones!==s)throw new Error(`terminal の 1 の数 ${r.ones} != surfaceCount ${s}`);this.lbs=t,this.labels=n,this.terminal=r,this.nodeCount=a,this.surfaceCount=s}blockStart(t){return t===0?0:this.lbs.select0(t)+1}child(t,n){const r=this.blockStart(t),s=this.lbs.select0(t+1)-r;if(s<=0)return-1;const i=this.lbs.rank1(r)+1;let o=0,l=s-1;for(;o<=l;){const d=o+l>>>1,p=this.labels[i+d];if(p===n)return i+d;p<n?o=d+1:l=d-1}return-1}surfaceIdAt(t){return this.terminal.get(t)?this.terminal.rank1(t+1)-1:-1}commonPrefixSearch(t,n,r){let a=0;for(let s=n;s<t.length;s++){if(a=this.child(a,t.charCodeAt(s)),a<0)return;const i=this.surfaceIdAt(a);i>=0&&r(i,s+1)}}exactMatch(t){let n=0;for(let r=0;r<t.length;r++)if(n=this.child(n,t.charCodeAt(r)),n<0)return-1;return this.surfaceIdAt(n)}}const tb={u32:4,u16:2,i16:2,u8:1},nb=(e,t)=>{for(const a of e.header)if(!(a in t))throw new Error(`スカラ ${a} が未指定`);let n=e.header.length*4;const r=[];for(const a of e.arrays){const s=tb[a.type];n=Math.ceil(n/s)*s;const i=a.length(t);if(!Number.isInteger(i)||i<0)throw new Error(`配列 ${a.name} の要素数が不正: ${i}`);r.push({name:a.name,type:a.type,byteOffset:n,elemCount:i}),n+=i*s}return{fields:r,totalBytes:n}},rb={header:["nodeCount","surfaceCount","lbsBitLength","lbsWordCount","terminalBitLength","terminalWordCount"],arrays:[{name:"lbsWords",type:"u32",length:e=>e.lbsWordCount},{name:"terminalWords",type:"u32",length:e=>e.terminalWordCount},{name:"labels",type:"u16",length:e=>e.nodeCount}]},ab={header:["surfaceCount","entryCount","unitCount"],arrays:[{name:"entryIndex",type:"u32",length:e=>e.surfaceCount+1},{name:"unitIndex",type:"u32",length:e=>e.entryCount+1},{name:"unitPronOffset",type:"u32",length:e=>e.unitCount},{name:"leftId",type:"u16",length:e=>e.entryCount},{name:"rightId",type:"u16",length:e=>e.entryCount},{name:"cost",type:"i16",length:e=>e.entryCount},{name:"posId",type:"u16",length:e=>e.entryCount},{name:"chainRuleId",type:"u8",length:e=>e.entryCount},{name:"unitAccType",type:"u8",length:e=>e.unitCount},{name:"unitSurfLen",type:"u8",length:e=>e.unitCount},{name:"unitPronLen",type:"u8",length:e=>e.unitCount}]},sb={header:["poolLength"],arrays:[{name:"pool",type:"u16",length:e=>e.poolLength}]},ib={header:["rightSize","leftSize"],arrays:[{name:"data",type:"i16",length:e=>e.rightSize*e.leftSize}]},ob={header:["catCount"],arrays:[{name:"catTable",type:"u8",length:e=>e.catCount*4},{name:"catsPacked",type:"u16",length:()=>65536}]},ub={header:["catCount","recordCount"],arrays:[{name:"catIndex",type:"u32",length:e=>e.catCount+1},{name:"leftId",type:"u16",length:e=>e.recordCount},{name:"rightId",type:"u16",length:e=>e.recordCount},{name:"cost",type:"i16",length:e=>e.recordCount},{name:"posId",type:"u16",length:e=>e.recordCount}]},tn=(e,t,n,r)=>{if(n<r.header.length*4)throw new Error(`セクション実長 ${n} がヘッダ ${r.header.length*4}B より短い`);const a=new DataView(e,t,n),s={};r.header.forEach((l,d)=>{s[l]=a.getUint32(d*4,!0)});const i=nb(r,s);if(i.totalBytes!==n)throw new Error(`セクション実長 ${n} がレイアウト要求 ${i.totalBytes} と一致しない`);const o={};for(const l of i.fields){const d=t+l.byteOffset;switch(l.type){case"u32":o[l.name]=new Uint32Array(e,d,l.elemCount);break;case"u16":o[l.name]=new Uint16Array(e,d,l.elemCount);break;case"i16":o[l.name]=new Int16Array(e,d,l.elemCount);break;case"u8":o[l.name]=new Uint8Array(e,d,l.elemCount);break}}return{scalars:s,arrays:o}},Ln=(e,t,n,r)=>{const a=r===null?"null":Array.isArray(r)?"array":typeof r;throw new Error(`${e} 検証失敗: ${t} は ${n} であること（実際: ${a}）`)},lb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),As=(e,t,n)=>lb(t)?t:Ln(e,n,"オブジェクト",t),Et=(e,t,n)=>typeof t=="string"?t:Ln(e,n,"string",t),db=(e,t,n)=>typeof t=="number"&&Number.isInteger(t)?t:Ln(e,n,"整数",t),is=(e,t,n)=>Array.isArray(t)?t.map((r,a)=>Et(e,r,`${n}[${a}]`)):Ln(e,n,"配列",t),Yc=(e,t,n,r)=>{const a=As(e,t,n),s={};for(const[i,o]of Object.entries(a))s[i]=r(o,`${n}.${i}`);return s},cb=["CHAR","CONN","LEXI","READ","TRIE","UNKD"],Qc=6,pb=e=>{const t="META",n=As(t,e,"(root)"),r=As(t,n.source,"source"),a=Array.isArray(n.posTable)?n.posTable.map((i,o)=>{const l=is(t,i,`posTable[${o}]`);if(l.length!==Qc)throw new Error(`${t} 検証失敗: posTable[${o}] は ${Qc} 列であること（実際: ${l.length} 列）`);return l}):Ln(t,"posTable","配列",n.posTable),s=Yc(t,n.checksums,"checksums",(i,o)=>Et(t,i,o));for(const i of cb)if(s[i]===void 0)throw new Error(`${t} 検証失敗: checksums に ${i} が無い（CRC 検証が黙って抜ける）`);return{dictName:Et(t,n.dictName,"dictName"),source:{repo:Et(t,r.repo,"source.repo"),tag:Et(t,r.tag,"source.tag")},builderVersion:Et(t,n.builderVersion,"builderVersion"),buildDate:Et(t,n.buildDate,"buildDate"),counts:Yc(t,n.counts,"counts",(i,o)=>db(t,i,o)),posTable:a,chainRuleTable:is(t,n.chainRuleTable,"chainRuleTable"),charCategories:is(t,n.charCategories,"charCategories"),checksums:s,license:Et(t,n.license,"license")}};class di{trie;entryIndex;unitIndex;leftId;rightId;cost;posId;chainRuleId;unitAccType;unitSurfLen;unitPronLen;unitPronOffset;readPool;connData;connLeftSize;charCategories;charCatsPacked;defaultCategoryId;unkCatIndex;unkLeftId;unkRightId;unkCost;unkPosId;meta;constructor(t){this.trie=t.trie,this.entryIndex=t.lexi.entryIndex,this.unitIndex=t.lexi.unitIndex,this.leftId=t.lexi.leftId,this.rightId=t.lexi.rightId,this.cost=t.lexi.cost,this.posId=t.lexi.posId,this.chainRuleId=t.lexi.chainRuleId,this.unitAccType=t.lexi.unitAccType,this.unitSurfLen=t.lexi.unitSurfLen,this.unitPronLen=t.lexi.unitPronLen,this.unitPronOffset=t.lexi.unitPronOffset,this.readPool=t.readPool,this.connData=t.connData,this.connLeftSize=t.connLeftSize,this.charCategories=t.charCategories,this.charCatsPacked=t.charCatsPacked;const n=t.charCategories.findIndex(r=>r.name==="DEFAULT");if(n<0)throw new Error("DEFAULT カテゴリが辞書にない");this.defaultCategoryId=n,this.unkCatIndex=t.unk.catIndex,this.unkLeftId=t.unk.leftId,this.unkRightId=t.unk.rightId,this.unkCost=t.unk.cost,this.unkPosId=t.unk.posId,this.meta=t.meta}static load(t,n){const r=new Sg(t),a=r.section("META"),s=pb(JSON.parse(new TextDecoder().decode(new Uint8Array(t,a.offset,a.length))));if(n?.verifyChecksums!==!1)for(const[I,C]of Object.entries(s.checksums)){const z=r.section(I),x=Eg(new Uint8Array(t,z.offset,z.length));if(x!==C)throw new Error(`セクション ${I} のCRC不一致: ${x} != ${C}`)}const i=r.section("TRIE"),o=tn(t,i.offset,i.length,rb),l=new eb(new Kc(o.arrays.lbsWords,o.scalars.lbsBitLength),o.arrays.labels,new Kc(o.arrays.terminalWords,o.scalars.terminalBitLength),o.scalars.nodeCount,o.scalars.surfaceCount),d=r.section("LEXI"),p=tn(t,d.offset,d.length,ab),h=r.section("READ"),m=tn(t,h.offset,h.length,sb),y=r.section("CONN"),w=tn(t,y.offset,y.length,ib),_=r.section("CHAR"),k=tn(t,_.offset,_.length,ob),$=k.arrays.catTable,b=s.charCategories.map((I,C)=>({name:I,invoke:$[C*4]===1,group:$[C*4+1]===1,length:$[C*4+2]})),E=r.section("UNKD"),S=tn(t,E.offset,E.length,ub);return new di({trie:l,lexi:p.arrays,readPool:m.arrays.pool,connData:w.arrays.data,connLeftSize:w.scalars.leftSize,charCategories:b,charCatsPacked:k.arrays.catsPacked,unk:S.arrays,meta:s})}connectionCost(t,n){return this.connData[t*this.connLeftSize+n]}unitPron(t){const n=this.unitPronOffset[t],r=this.unitPronLen[t];let a="";for(let s=0;s<r;s++){const i=this.readPool[n+s];i!==8217&&(a+=String.fromCharCode(i))}return a}unitPronRaw(t){const n=this.unitPronOffset[t],r=this.unitPronLen[t];let a="";for(let s=0;s<r;s++)a+=String.fromCharCode(this.readPool[n+s]);return a}charCategoriesOf(t,n){if(t>65535)return n[0]=this.defaultCategoryId,1;const r=this.charCatsPacked[t];let a=0;for(let s=0;s<16;s+=4){const i=r>>s&15;if(i===0)break;n[a++]=i-1}return a}}const hb="ab847217c833593c3aec9875b9bfa6ff9789dc29",fb="https://huggingface.co/datasets/hdae/yomi-dict/resolve/{revision}/naist-jdic.jtd.gz",mb="hdae/yomi-dict",gb="yomi-dict",yb=e=>{const n=new Uint8Array(e).buffer,r=new Sg(n),a=r.section("META"),s=JSON.parse(new TextDecoder().decode(new Uint8Array(n,a.offset,a.length)));if(s.checksums===void 0)throw new Error("JTD1: META に checksums が無い（破損の可能性）");for(const[i,o]of Object.entries(s.checksums)){const l=r.section(i),d=Eg(new Uint8Array(n,l.offset,l.length));if(d!==o)throw new Error(`JTD1: セクション ${i} のCRC不一致: ${d} != ${o}（破損）`)}},wb=e=>e.length>=2&&e[0]===31&&e[1]===139,_b=async e=>{const t=new Response(new Uint8Array(e)).body;if(t===null)throw new Error("辞書解凍失敗: gzip ストリームが空");const n=t.pipeThrough(new DecompressionStream("gzip"));return new Uint8Array(await new Response(n).arrayBuffer())},bb=async e=>{const t=wb(e)?await _b(e):new Uint8Array(e);return yb(t),t},vb=async e=>{const t=e.revision??hb,n=e.url===void 0?await li({repo:mb,kind:"dataset",revision:t}):t,r=(e.url??fb).replace(/\{revision\}/g,n),a=await $g(r,{cacheName:e.cacheName??gb,cache:kg(n),decode:bb,onProgress:e.onProgress});return a.buffer instanceof ArrayBuffer?a.buffer:new Uint8Array(a).buffer},$b=async(e={})=>{const t=await vb(e);return di.load(t,{verifyChecksums:!1})},Zc=(e,t)=>{let n=0,r=e.length-1;for(;n<=r;){const a=n+r>>1,[s,i]=e[a];if(t<s)r=a-1;else if(t>i)n=a+1;else return!0}return!1};class ci{#e;#t;#n;constructor(t,n,r){this.#e=t,this.#t=n,this.#n=r}static fromVocabText(t,n,r){const a=new Map,s=t.split(/\r?\n/);let i=0;for(const o of s){if(o===""&&i===s.length-1)break;a.set(o,i),i++}return new ci(a,n,r)}tokenize(t){let n="";for(const s of t){const i=s.codePointAt(0);Zc(this.#t.removed,i)||(n+=Zc(this.#t.spaced,i)?" ":s)}const r=n.normalize("NFKC"),a=[];for(const s of r)s!==" "&&a.push(s);return a}#r(t){return this.#e.get(t)??this.#n.unkId}encode(t){const n=this.tokenize(t),r=[this.#n.clsId];for(const a of n)r.push(this.#r(a));return r.push(this.#n.sepId),r}}const xb=(e,t)=>{if(t<=0)throw new Error(`distributePhone: n_word must be >= 1, got ${t}`);const n=new Array(t).fill(0);for(let r=0;r<e;r++){let a=0;for(let s=1;s<t;s++)n[s]<n[a]&&(a=s);n[a]++}return n},kb=(e,t,n)=>{const r=[1];let a=0;for(const o of e){const l=t.tokenize(o.surface).length;if(l<=0)throw new Error(`buildBaseWord2ph: 語 surface が 0 トークンに正規化された: ${JSON.stringify(o.surface)}`);a+=l;for(const d of xb(o.phones.length,l))r.push(d)}r.push(1);const s=a+2;if(r.length!==s)throw new Error(`buildBaseWord2ph invariant broken: word2ph.length(${r.length}) !== Σtokenize(surface)+2(${s})`);const i=r.reduce((o,l)=>o+l,0);if(i!==n)throw new Error(`buildBaseWord2ph invariant broken: sum(word2ph)(${i}) !== givenPhoneLen(${n})`);return r},Sb=["_","AA","E","EE","En","N","OO","V","a","a:","aa","ae","ah","ai","an","ang","ao","aw","ay","b","by","c","ch","d","dh","dy","e","e:","eh","ei","en","eng","er","ey","f","g","gy","h","hh","hy","i","i0","i:","ia","ian","iang","iao","ie","ih","in","ing","iong","ir","iu","iy","j","jh","k","ky","l","m","my","n","ng","ny","o","o:","ong","ou","ow","oy","p","py","q","r","ry","s","sh","t","th","ts","ty","u","u:","ua","uai","uan","uang","uh","ui","un","uo","uw","v","van","ve","vn","w","x","y","z","zh","zy","!","?","…",",",".","'","-","SP","UNK"],Eb=6,Tb=1,Ib=new Map(Sb.map((e,t)=>[e,t])),Cb=e=>e.map(t=>{const n=Ib.get(t);if(n===void 0)throw new Error(`SYMBOLS に無い音素 ${JSON.stringify(t)} が phones に含まれる（ID 化不能）。 入力の音素記号と JP-Extra モデルの記号表の齟齬を疑う。`);return n}),Tg=new Map([[32,12288],[165,65509],[92,65509],[45,8722],[126,12316],[96,8216],[34,8221],[39,8217],[65377,12290],[65378,12300],[65379,12301],[65380,12289],[65381,12539]]);{const e="ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン";for(let t=0;t<e.length;t++)Tg.set(65382+t,e.charCodeAt(t))}const Ab=new Set([12441,12443,65438]),zb=new Set([12442,12444,65439]),Ig=e=>{const t=new Map;for(let n=0;n<e.length;n+=2)t.set(e.charCodeAt(n),e.charCodeAt(n+1));return t},Ob=Ig("カガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドハバヒビフブヘベホボウヴワヷヰヸヱヹヲヺヽヾかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどはばひびふぶへべほぼうゔ"),Rb=Ig("ハパヒピフプヘペホポはぱひぴふぷへぺほぽ"),Cg=e=>{let t="",n=-1;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);const s=Tg.get(a);s!==void 0?a=s:a>32&&a<127&&(a+=65248);const i=Ab.has(a),o=zb.has(a);if(i||o){const l=n>=0?i?Ob.get(n):Rb.get(n):void 0;l!==void 0?t+=String.fromCharCode(l):n>=0&&(t+=String.fromCharCode(n)),n=-1}else n>=0&&(t+=String.fromCharCode(n)),n=a}return n>=0&&(t+=String.fromCharCode(n)),t},Bb=e=>{const t=[];let n=0;for(let r=0;r<e.length;r++){const a=e.charCodeAt(r);(a===10||a===9||a===12290||a===12289)&&(t.push({start:n,end:r+1}),n=r+1)}return n<e.length&&t.push({start:n,end:e.length}),t},Nb=[{key:"いぇ",expansion:[{kana:"イェ",consonant:"y",vowel:"e"}]},{key:"うぃ",expansion:[{kana:"ウィ",consonant:"w",vowel:"i"}]},{key:"うぇ",expansion:[{kana:"ウェ",consonant:"w",vowel:"e"}]},{key:"うぉ",expansion:[{kana:"ウォ",consonant:"w",vowel:"o"}]},{key:"きぇ",expansion:[{kana:"キェ",consonant:"ky",vowel:"e"}]},{key:"きゃ",expansion:[{kana:"キャ",consonant:"ky",vowel:"a"}]},{key:"きゅ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"}]},{key:"きょ",expansion:[{kana:"キョ",consonant:"ky",vowel:"o"}]},{key:"ぎぇ",expansion:[{kana:"ギェ",consonant:"gy",vowel:"e"}]},{key:"ぎゃ",expansion:[{kana:"ギャ",consonant:"gy",vowel:"a"}]},{key:"ぎゅ",expansion:[{kana:"ギュ",consonant:"gy",vowel:"u"}]},{key:"ぎょ",expansion:[{kana:"ギョ",consonant:"gy",vowel:"o"}]},{key:"しぇ",expansion:[{kana:"シェ",consonant:"sh",vowel:"e"}]},{key:"しゃ",expansion:[{kana:"シャ",consonant:"sh",vowel:"a"}]},{key:"しゅ",expansion:[{kana:"シュ",consonant:"sh",vowel:"u"}]},{key:"しょ",expansion:[{kana:"ショ",consonant:"sh",vowel:"o"}]},{key:"じぇ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"}]},{key:"じゃ",expansion:[{kana:"ジャ",consonant:"j",vowel:"a"}]},{key:"じゅ",expansion:[{kana:"ジュ",consonant:"j",vowel:"u"}]},{key:"じょ",expansion:[{kana:"ジョ",consonant:"j",vowel:"o"}]},{key:"すぃ",expansion:[{kana:"スィ",consonant:"s",vowel:"i"}]},{key:"ずぃ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"}]},{key:"ちぇ",expansion:[{kana:"チェ",consonant:"ch",vowel:"e"}]},{key:"ちゃ",expansion:[{kana:"チャ",consonant:"ch",vowel:"a"}]},{key:"ちゅ",expansion:[{kana:"チュ",consonant:"ch",vowel:"u"}]},{key:"ちょ",expansion:[{kana:"チョ",consonant:"ch",vowel:"o"}]},{key:"つぁ",expansion:[{kana:"ツァ",consonant:"ts",vowel:"a"}]},{key:"つぃ",expansion:[{kana:"ツィ",consonant:"ts",vowel:"i"}]},{key:"つぇ",expansion:[{kana:"ツェ",consonant:"ts",vowel:"e"}]},{key:"つぉ",expansion:[{kana:"ツォ",consonant:"ts",vowel:"o"}]},{key:"てぃ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"}]},{key:"てゃ",expansion:[{kana:"テャ",consonant:"ty",vowel:"a"}]},{key:"てゅ",expansion:[{kana:"テュ",consonant:"ty",vowel:"u"}]},{key:"てょ",expansion:[{kana:"テョ",consonant:"ty",vowel:"o"}]},{key:"でぃ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"}]},{key:"でゃ",expansion:[{kana:"デャ",consonant:"dy",vowel:"a"}]},{key:"でゅ",expansion:[{kana:"デュ",consonant:"dy",vowel:"u"}]},{key:"でょ",expansion:[{kana:"デョ",consonant:"dy",vowel:"o"}]},{key:"とぅ",expansion:[{kana:"トゥ",consonant:"t",vowel:"u"}]},{key:"どぅ",expansion:[{kana:"ドゥ",consonant:"d",vowel:"u"}]},{key:"にぇ",expansion:[{kana:"ニェ",consonant:"ny",vowel:"e"}]},{key:"にゃ",expansion:[{kana:"ニャ",consonant:"ny",vowel:"a"}]},{key:"にゅ",expansion:[{kana:"ニュ",consonant:"ny",vowel:"u"}]},{key:"にょ",expansion:[{kana:"ニョ",consonant:"ny",vowel:"o"}]},{key:"ひぇ",expansion:[{kana:"ヒェ",consonant:"hy",vowel:"e"}]},{key:"ひゃ",expansion:[{kana:"ヒャ",consonant:"hy",vowel:"a"}]},{key:"ひゅ",expansion:[{kana:"ヒュ",consonant:"hy",vowel:"u"}]},{key:"ひょ",expansion:[{kana:"ヒョ",consonant:"hy",vowel:"o"}]},{key:"びぇ",expansion:[{kana:"ビェ",consonant:"by",vowel:"e"}]},{key:"びゃ",expansion:[{kana:"ビャ",consonant:"by",vowel:"a"}]},{key:"びゅ",expansion:[{kana:"ビュ",consonant:"by",vowel:"u"}]},{key:"びょ",expansion:[{kana:"ビョ",consonant:"by",vowel:"o"}]},{key:"ぴぇ",expansion:[{kana:"ピェ",consonant:"py",vowel:"e"}]},{key:"ぴゃ",expansion:[{kana:"ピャ",consonant:"py",vowel:"a"}]},{key:"ぴゅ",expansion:[{kana:"ピュ",consonant:"py",vowel:"u"}]},{key:"ぴょ",expansion:[{kana:"ピョ",consonant:"py",vowel:"o"}]},{key:"ふぁ",expansion:[{kana:"ファ",consonant:"f",vowel:"a"}]},{key:"ふぃ",expansion:[{kana:"フィ",consonant:"f",vowel:"i"}]},{key:"ふぇ",expansion:[{kana:"フェ",consonant:"f",vowel:"e"}]},{key:"ふぉ",expansion:[{kana:"フォ",consonant:"f",vowel:"o"}]},{key:"みぇ",expansion:[{kana:"ミェ",consonant:"my",vowel:"e"}]},{key:"みゃ",expansion:[{kana:"ミャ",consonant:"my",vowel:"a"}]},{key:"みゅ",expansion:[{kana:"ミュ",consonant:"my",vowel:"u"}]},{key:"みょ",expansion:[{kana:"ミョ",consonant:"my",vowel:"o"}]},{key:"りぇ",expansion:[{kana:"リェ",consonant:"ry",vowel:"e"}]},{key:"りゃ",expansion:[{kana:"リャ",consonant:"ry",vowel:"a"}]},{key:"りゅ",expansion:[{kana:"リュ",consonant:"ry",vowel:"u"}]},{key:"りょ",expansion:[{kana:"リョ",consonant:"ry",vowel:"o"}]},{key:"ゔぁ",expansion:[{kana:"ヴァ",consonant:"v",vowel:"a"}]},{key:"ゔぃ",expansion:[{kana:"ヴィ",consonant:"v",vowel:"i"}]},{key:"ゔぇ",expansion:[{kana:"ヴェ",consonant:"v",vowel:"e"}]},{key:"ゔぉ",expansion:[{kana:"ヴォ",consonant:"v",vowel:"o"}]},{key:"ゔゃ",expansion:[{kana:"ヴャ",consonant:"by",vowel:"a"}]},{key:"ゔゅ",expansion:[{kana:"ヴュ",consonant:"by",vowel:"u"}]},{key:"ゔょ",expansion:[{kana:"ヴョ",consonant:"by",vowel:"o"}]},{key:"イェ",expansion:[{kana:"イェ",consonant:"y",vowel:"e"}]},{key:"ウィ",expansion:[{kana:"ウィ",consonant:"w",vowel:"i"}]},{key:"ウェ",expansion:[{kana:"ウェ",consonant:"w",vowel:"e"}]},{key:"ウォ",expansion:[{kana:"ウォ",consonant:"w",vowel:"o"}]},{key:"キェ",expansion:[{kana:"キェ",consonant:"ky",vowel:"e"}]},{key:"キャ",expansion:[{kana:"キャ",consonant:"ky",vowel:"a"}]},{key:"キュ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"}]},{key:"キョ",expansion:[{kana:"キョ",consonant:"ky",vowel:"o"}]},{key:"ギェ",expansion:[{kana:"ギェ",consonant:"gy",vowel:"e"}]},{key:"ギャ",expansion:[{kana:"ギャ",consonant:"gy",vowel:"a"}]},{key:"ギュ",expansion:[{kana:"ギュ",consonant:"gy",vowel:"u"}]},{key:"ギョ",expansion:[{kana:"ギョ",consonant:"gy",vowel:"o"}]},{key:"クヮ",expansion:[{kana:"クヮ",consonant:"kw",vowel:"a"}]},{key:"グヮ",expansion:[{kana:"グヮ",consonant:"gw",vowel:"a"}]},{key:"シェ",expansion:[{kana:"シェ",consonant:"sh",vowel:"e"}]},{key:"シャ",expansion:[{kana:"シャ",consonant:"sh",vowel:"a"}]},{key:"シュ",expansion:[{kana:"シュ",consonant:"sh",vowel:"u"}]},{key:"ショ",expansion:[{kana:"ショ",consonant:"sh",vowel:"o"}]},{key:"ジェ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"}]},{key:"ジャ",expansion:[{kana:"ジャ",consonant:"j",vowel:"a"}]},{key:"ジュ",expansion:[{kana:"ジュ",consonant:"j",vowel:"u"}]},{key:"ジョ",expansion:[{kana:"ジョ",consonant:"j",vowel:"o"}]},{key:"スィ",expansion:[{kana:"スィ",consonant:"s",vowel:"i"}]},{key:"ズィ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"}]},{key:"チェ",expansion:[{kana:"チェ",consonant:"ch",vowel:"e"}]},{key:"チャ",expansion:[{kana:"チャ",consonant:"ch",vowel:"a"}]},{key:"チュ",expansion:[{kana:"チュ",consonant:"ch",vowel:"u"}]},{key:"チョ",expansion:[{kana:"チョ",consonant:"ch",vowel:"o"}]},{key:"ツァ",expansion:[{kana:"ツァ",consonant:"ts",vowel:"a"}]},{key:"ツィ",expansion:[{kana:"ツィ",consonant:"ts",vowel:"i"}]},{key:"ツェ",expansion:[{kana:"ツェ",consonant:"ts",vowel:"e"}]},{key:"ツォ",expansion:[{kana:"ツォ",consonant:"ts",vowel:"o"}]},{key:"ティ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"}]},{key:"テャ",expansion:[{kana:"テャ",consonant:"ty",vowel:"a"}]},{key:"テュ",expansion:[{kana:"テュ",consonant:"ty",vowel:"u"}]},{key:"テョ",expansion:[{kana:"テョ",consonant:"ty",vowel:"o"}]},{key:"ディ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"}]},{key:"デャ",expansion:[{kana:"デャ",consonant:"dy",vowel:"a"}]},{key:"デュ",expansion:[{kana:"デュ",consonant:"dy",vowel:"u"}]},{key:"デョ",expansion:[{kana:"デョ",consonant:"dy",vowel:"o"}]},{key:"トゥ",expansion:[{kana:"トゥ",consonant:"t",vowel:"u"}]},{key:"ドゥ",expansion:[{kana:"ドゥ",consonant:"d",vowel:"u"}]},{key:"ニェ",expansion:[{kana:"ニェ",consonant:"ny",vowel:"e"}]},{key:"ニャ",expansion:[{kana:"ニャ",consonant:"ny",vowel:"a"}]},{key:"ニュ",expansion:[{kana:"ニュ",consonant:"ny",vowel:"u"}]},{key:"ニョ",expansion:[{kana:"ニョ",consonant:"ny",vowel:"o"}]},{key:"ヒェ",expansion:[{kana:"ヒェ",consonant:"hy",vowel:"e"}]},{key:"ヒャ",expansion:[{kana:"ヒャ",consonant:"hy",vowel:"a"}]},{key:"ヒュ",expansion:[{kana:"ヒュ",consonant:"hy",vowel:"u"}]},{key:"ヒョ",expansion:[{kana:"ヒョ",consonant:"hy",vowel:"o"}]},{key:"ビェ",expansion:[{kana:"ビェ",consonant:"by",vowel:"e"}]},{key:"ビャ",expansion:[{kana:"ビャ",consonant:"by",vowel:"a"}]},{key:"ビュ",expansion:[{kana:"ビュ",consonant:"by",vowel:"u"}]},{key:"ビョ",expansion:[{kana:"ビョ",consonant:"by",vowel:"o"}]},{key:"ピェ",expansion:[{kana:"ピェ",consonant:"py",vowel:"e"}]},{key:"ピャ",expansion:[{kana:"ピャ",consonant:"py",vowel:"a"}]},{key:"ピュ",expansion:[{kana:"ピュ",consonant:"py",vowel:"u"}]},{key:"ピョ",expansion:[{kana:"ピョ",consonant:"py",vowel:"o"}]},{key:"ファ",expansion:[{kana:"ファ",consonant:"f",vowel:"a"}]},{key:"フィ",expansion:[{kana:"フィ",consonant:"f",vowel:"i"}]},{key:"フェ",expansion:[{kana:"フェ",consonant:"f",vowel:"e"}]},{key:"フォ",expansion:[{kana:"フォ",consonant:"f",vowel:"o"}]},{key:"ミェ",expansion:[{kana:"ミェ",consonant:"my",vowel:"e"}]},{key:"ミャ",expansion:[{kana:"ミャ",consonant:"my",vowel:"a"}]},{key:"ミュ",expansion:[{kana:"ミュ",consonant:"my",vowel:"u"}]},{key:"ミョ",expansion:[{kana:"ミョ",consonant:"my",vowel:"o"}]},{key:"リェ",expansion:[{kana:"リェ",consonant:"ry",vowel:"e"}]},{key:"リャ",expansion:[{kana:"リャ",consonant:"ry",vowel:"a"}]},{key:"リュ",expansion:[{kana:"リュ",consonant:"ry",vowel:"u"}]},{key:"リョ",expansion:[{kana:"リョ",consonant:"ry",vowel:"o"}]},{key:"ヴァ",expansion:[{kana:"ヴァ",consonant:"v",vowel:"a"}]},{key:"ヴィ",expansion:[{kana:"ヴィ",consonant:"v",vowel:"i"}]},{key:"ヴェ",expansion:[{kana:"ヴェ",consonant:"v",vowel:"e"}]},{key:"ヴォ",expansion:[{kana:"ヴォ",consonant:"v",vowel:"o"}]},{key:"ヴャ",expansion:[{kana:"ヴャ",consonant:"by",vowel:"a"}]},{key:"ヴュ",expansion:[{kana:"ヴュ",consonant:"by",vowel:"u"}]},{key:"ヴョ",expansion:[{kana:"ヴョ",consonant:"by",vowel:"o"}]}],Mb=[{key:"ぁ",expansion:[{kana:"ァ",consonant:null,vowel:"a"}]},{key:"あ",expansion:[{kana:"ア",consonant:null,vowel:"a"}]},{key:"ぃ",expansion:[{kana:"ィ",consonant:null,vowel:"i"}]},{key:"い",expansion:[{kana:"イ",consonant:null,vowel:"i"}]},{key:"ぅ",expansion:[{kana:"ゥ",consonant:null,vowel:"u"}]},{key:"う",expansion:[{kana:"ウ",consonant:null,vowel:"u"}]},{key:"ぇ",expansion:[{kana:"ェ",consonant:null,vowel:"e"}]},{key:"え",expansion:[{kana:"エ",consonant:null,vowel:"e"}]},{key:"ぉ",expansion:[{kana:"ォ",consonant:null,vowel:"o"}]},{key:"お",expansion:[{kana:"オ",consonant:null,vowel:"o"}]},{key:"か",expansion:[{kana:"カ",consonant:"k",vowel:"a"}]},{key:"が",expansion:[{kana:"ガ",consonant:"g",vowel:"a"}]},{key:"き",expansion:[{kana:"キ",consonant:"k",vowel:"i"}]},{key:"ぎ",expansion:[{kana:"ギ",consonant:"g",vowel:"i"}]},{key:"く",expansion:[{kana:"ク",consonant:"k",vowel:"u"}]},{key:"ぐ",expansion:[{kana:"グ",consonant:"g",vowel:"u"}]},{key:"け",expansion:[{kana:"ケ",consonant:"k",vowel:"e"}]},{key:"げ",expansion:[{kana:"ゲ",consonant:"g",vowel:"e"}]},{key:"こ",expansion:[{kana:"コ",consonant:"k",vowel:"o"}]},{key:"ご",expansion:[{kana:"ゴ",consonant:"g",vowel:"o"}]},{key:"さ",expansion:[{kana:"サ",consonant:"s",vowel:"a"}]},{key:"ざ",expansion:[{kana:"ザ",consonant:"z",vowel:"a"}]},{key:"し",expansion:[{kana:"シ",consonant:"sh",vowel:"i"}]},{key:"じ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"}]},{key:"す",expansion:[{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ず",expansion:[{kana:"ズ",consonant:"z",vowel:"u"}]},{key:"せ",expansion:[{kana:"セ",consonant:"s",vowel:"e"}]},{key:"ぜ",expansion:[{kana:"ゼ",consonant:"z",vowel:"e"}]},{key:"そ",expansion:[{kana:"ソ",consonant:"s",vowel:"o"}]},{key:"ぞ",expansion:[{kana:"ゾ",consonant:"z",vowel:"o"}]},{key:"た",expansion:[{kana:"タ",consonant:"t",vowel:"a"}]},{key:"だ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"}]},{key:"ち",expansion:[{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ぢ",expansion:[{kana:"ヂ",consonant:"j",vowel:"i"}]},{key:"っ",expansion:[{kana:"ッ",consonant:"cl",vowel:"cl"}]},{key:"つ",expansion:[{kana:"ツ",consonant:"ts",vowel:"u"}]},{key:"づ",expansion:[{kana:"ヅ",consonant:"z",vowel:"u"}]},{key:"て",expansion:[{kana:"テ",consonant:"t",vowel:"e"}]},{key:"で",expansion:[{kana:"デ",consonant:"d",vowel:"e"}]},{key:"と",expansion:[{kana:"ト",consonant:"t",vowel:"o"}]},{key:"ど",expansion:[{kana:"ド",consonant:"d",vowel:"o"}]},{key:"な",expansion:[{kana:"ナ",consonant:"n",vowel:"a"}]},{key:"に",expansion:[{kana:"ニ",consonant:"n",vowel:"i"}]},{key:"ぬ",expansion:[{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ね",expansion:[{kana:"ネ",consonant:"n",vowel:"e"}]},{key:"の",expansion:[{kana:"ノ",consonant:"n",vowel:"o"}]},{key:"は",expansion:[{kana:"ハ",consonant:"h",vowel:"a"}]},{key:"ば",expansion:[{kana:"バ",consonant:"b",vowel:"a"}]},{key:"ぱ",expansion:[{kana:"パ",consonant:"p",vowel:"a"}]},{key:"ひ",expansion:[{kana:"ヒ",consonant:"h",vowel:"i"}]},{key:"び",expansion:[{kana:"ビ",consonant:"b",vowel:"i"}]},{key:"ぴ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"}]},{key:"ふ",expansion:[{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ぶ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"}]},{key:"ぷ",expansion:[{kana:"プ",consonant:"p",vowel:"u"}]},{key:"へ",expansion:[{kana:"ヘ",consonant:"h",vowel:"e"}]},{key:"べ",expansion:[{kana:"ベ",consonant:"b",vowel:"e"}]},{key:"ぺ",expansion:[{kana:"ペ",consonant:"p",vowel:"e"}]},{key:"ほ",expansion:[{kana:"ホ",consonant:"h",vowel:"o"}]},{key:"ぼ",expansion:[{kana:"ボ",consonant:"b",vowel:"o"}]},{key:"ぽ",expansion:[{kana:"ポ",consonant:"p",vowel:"o"}]},{key:"ま",expansion:[{kana:"マ",consonant:"m",vowel:"a"}]},{key:"み",expansion:[{kana:"ミ",consonant:"m",vowel:"i"}]},{key:"む",expansion:[{kana:"ム",consonant:"m",vowel:"u"}]},{key:"め",expansion:[{kana:"メ",consonant:"m",vowel:"e"}]},{key:"も",expansion:[{kana:"モ",consonant:"m",vowel:"o"}]},{key:"ゃ",expansion:[{kana:"ャ",consonant:"y",vowel:"a"}]},{key:"や",expansion:[{kana:"ヤ",consonant:"y",vowel:"a"}]},{key:"ゅ",expansion:[{kana:"ュ",consonant:"y",vowel:"u"}]},{key:"ゆ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"}]},{key:"ょ",expansion:[{kana:"ョ",consonant:"y",vowel:"o"}]},{key:"よ",expansion:[{kana:"ヨ",consonant:"y",vowel:"o"}]},{key:"ら",expansion:[{kana:"ラ",consonant:"r",vowel:"a"}]},{key:"り",expansion:[{kana:"リ",consonant:"r",vowel:"i"}]},{key:"る",expansion:[{kana:"ル",consonant:"r",vowel:"u"}]},{key:"れ",expansion:[{kana:"レ",consonant:"r",vowel:"e"}]},{key:"ろ",expansion:[{kana:"ロ",consonant:"r",vowel:"o"}]},{key:"わ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"}]},{key:"ゐ",expansion:[{kana:"ヰ",consonant:null,vowel:"i"}]},{key:"ゑ",expansion:[{kana:"ヱ",consonant:null,vowel:"e"}]},{key:"を",expansion:[{kana:"ヲ",consonant:null,vowel:"o"}]},{key:"ん",expansion:[{kana:"ン",consonant:"N",vowel:"N"}]},{key:"ゔ",expansion:[{kana:"ヴ",consonant:"v",vowel:"u"}]},{key:"ァ",expansion:[{kana:"ァ",consonant:null,vowel:"a"}]},{key:"ア",expansion:[{kana:"ア",consonant:null,vowel:"a"}]},{key:"ィ",expansion:[{kana:"ィ",consonant:null,vowel:"i"}]},{key:"イ",expansion:[{kana:"イ",consonant:null,vowel:"i"}]},{key:"ゥ",expansion:[{kana:"ゥ",consonant:null,vowel:"u"}]},{key:"ウ",expansion:[{kana:"ウ",consonant:null,vowel:"u"}]},{key:"ェ",expansion:[{kana:"ェ",consonant:null,vowel:"e"}]},{key:"エ",expansion:[{kana:"エ",consonant:null,vowel:"e"}]},{key:"ォ",expansion:[{kana:"ォ",consonant:null,vowel:"o"}]},{key:"オ",expansion:[{kana:"オ",consonant:null,vowel:"o"}]},{key:"カ",expansion:[{kana:"カ",consonant:"k",vowel:"a"}]},{key:"ガ",expansion:[{kana:"ガ",consonant:"g",vowel:"a"}]},{key:"キ",expansion:[{kana:"キ",consonant:"k",vowel:"i"}]},{key:"ギ",expansion:[{kana:"ギ",consonant:"g",vowel:"i"}]},{key:"ク",expansion:[{kana:"ク",consonant:"k",vowel:"u"}]},{key:"グ",expansion:[{kana:"グ",consonant:"g",vowel:"u"}]},{key:"ケ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"}]},{key:"ゲ",expansion:[{kana:"ゲ",consonant:"g",vowel:"e"}]},{key:"コ",expansion:[{kana:"コ",consonant:"k",vowel:"o"}]},{key:"ゴ",expansion:[{kana:"ゴ",consonant:"g",vowel:"o"}]},{key:"サ",expansion:[{kana:"サ",consonant:"s",vowel:"a"}]},{key:"ザ",expansion:[{kana:"ザ",consonant:"z",vowel:"a"}]},{key:"シ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"}]},{key:"ジ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"}]},{key:"ス",expansion:[{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ズ",expansion:[{kana:"ズ",consonant:"z",vowel:"u"}]},{key:"セ",expansion:[{kana:"セ",consonant:"s",vowel:"e"}]},{key:"ゼ",expansion:[{kana:"ゼ",consonant:"z",vowel:"e"}]},{key:"ソ",expansion:[{kana:"ソ",consonant:"s",vowel:"o"}]},{key:"ゾ",expansion:[{kana:"ゾ",consonant:"z",vowel:"o"}]},{key:"タ",expansion:[{kana:"タ",consonant:"t",vowel:"a"}]},{key:"ダ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"}]},{key:"チ",expansion:[{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ヂ",expansion:[{kana:"ヂ",consonant:"j",vowel:"i"}]},{key:"ッ",expansion:[{kana:"ッ",consonant:"cl",vowel:"cl"}]},{key:"ツ",expansion:[{kana:"ツ",consonant:"ts",vowel:"u"}]},{key:"ヅ",expansion:[{kana:"ヅ",consonant:"z",vowel:"u"}]},{key:"テ",expansion:[{kana:"テ",consonant:"t",vowel:"e"}]},{key:"デ",expansion:[{kana:"デ",consonant:"d",vowel:"e"}]},{key:"ト",expansion:[{kana:"ト",consonant:"t",vowel:"o"}]},{key:"ド",expansion:[{kana:"ド",consonant:"d",vowel:"o"}]},{key:"ナ",expansion:[{kana:"ナ",consonant:"n",vowel:"a"}]},{key:"ニ",expansion:[{kana:"ニ",consonant:"n",vowel:"i"}]},{key:"ヌ",expansion:[{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ネ",expansion:[{kana:"ネ",consonant:"n",vowel:"e"}]},{key:"ノ",expansion:[{kana:"ノ",consonant:"n",vowel:"o"}]},{key:"ハ",expansion:[{kana:"ハ",consonant:"h",vowel:"a"}]},{key:"バ",expansion:[{kana:"バ",consonant:"b",vowel:"a"}]},{key:"パ",expansion:[{kana:"パ",consonant:"p",vowel:"a"}]},{key:"ヒ",expansion:[{kana:"ヒ",consonant:"h",vowel:"i"}]},{key:"ビ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"}]},{key:"ピ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"}]},{key:"フ",expansion:[{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ブ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"}]},{key:"プ",expansion:[{kana:"プ",consonant:"p",vowel:"u"}]},{key:"ヘ",expansion:[{kana:"ヘ",consonant:"h",vowel:"e"}]},{key:"ベ",expansion:[{kana:"ベ",consonant:"b",vowel:"e"}]},{key:"ペ",expansion:[{kana:"ペ",consonant:"p",vowel:"e"}]},{key:"ホ",expansion:[{kana:"ホ",consonant:"h",vowel:"o"}]},{key:"ボ",expansion:[{kana:"ボ",consonant:"b",vowel:"o"}]},{key:"ポ",expansion:[{kana:"ポ",consonant:"p",vowel:"o"}]},{key:"マ",expansion:[{kana:"マ",consonant:"m",vowel:"a"}]},{key:"ミ",expansion:[{kana:"ミ",consonant:"m",vowel:"i"}]},{key:"ム",expansion:[{kana:"ム",consonant:"m",vowel:"u"}]},{key:"メ",expansion:[{kana:"メ",consonant:"m",vowel:"e"}]},{key:"モ",expansion:[{kana:"モ",consonant:"m",vowel:"o"}]},{key:"ャ",expansion:[{kana:"ャ",consonant:"y",vowel:"a"}]},{key:"ヤ",expansion:[{kana:"ヤ",consonant:"y",vowel:"a"}]},{key:"ュ",expansion:[{kana:"ュ",consonant:"y",vowel:"u"}]},{key:"ユ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"}]},{key:"ョ",expansion:[{kana:"ョ",consonant:"y",vowel:"o"}]},{key:"ヨ",expansion:[{kana:"ヨ",consonant:"y",vowel:"o"}]},{key:"ラ",expansion:[{kana:"ラ",consonant:"r",vowel:"a"}]},{key:"リ",expansion:[{kana:"リ",consonant:"r",vowel:"i"}]},{key:"ル",expansion:[{kana:"ル",consonant:"r",vowel:"u"}]},{key:"レ",expansion:[{kana:"レ",consonant:"r",vowel:"e"}]},{key:"ロ",expansion:[{kana:"ロ",consonant:"r",vowel:"o"}]},{key:"ヮ",expansion:[{kana:"ヮ",consonant:"w",vowel:"a"}]},{key:"ワ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"}]},{key:"ヰ",expansion:[{kana:"ヰ",consonant:null,vowel:"i"}]},{key:"ヱ",expansion:[{kana:"ヱ",consonant:null,vowel:"e"}]},{key:"ヲ",expansion:[{kana:"ヲ",consonant:null,vowel:"o"}]},{key:"ン",expansion:[{kana:"ン",consonant:"N",vowel:"N"}]},{key:"ヴ",expansion:[{kana:"ヴ",consonant:"v",vowel:"u"}]},{key:"ヵ",expansion:[{kana:"ヵ",consonant:"k",vowel:"a"}]},{key:"ヶ",expansion:[{kana:"ヶ",consonant:"k",vowel:"e"}]},{key:"ー",expansion:[{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ａ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｂ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｃ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｄ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｅ",expansion:[{kana:"イ",consonant:null,vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｆ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"フ",consonant:"f",vowel:"u"}]},{key:"Ｇ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｈ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"イ",consonant:null,vowel:"i"},{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"Ｉ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｊ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｋ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｌ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"Ｍ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ム",consonant:"m",vowel:"u"}]},{key:"Ｎ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"Ｏ",expansion:[{kana:"オ",consonant:null,vowel:"o"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｐ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｑ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｒ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"ー",consonant:"-",vowel:"long"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"Ｓ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"Ｔ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｕ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｖ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｗ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"},{kana:"ブ",consonant:"b",vowel:"u"},{kana:"リュ",consonant:"ry",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｘ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ッ",consonant:"cl",vowel:"cl"},{kana:"ク",consonant:"k",vowel:"u"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"Ｙ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｚ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ａ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｂ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｃ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｄ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｅ",expansion:[{kana:"イ",consonant:null,vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｆ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ｇ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｈ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"イ",consonant:null,vowel:"i"},{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ｉ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｊ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｋ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｌ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"ｍ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ム",consonant:"m",vowel:"u"}]},{key:"ｎ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ｏ",expansion:[{kana:"オ",consonant:null,vowel:"o"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｐ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｑ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｒ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"ー",consonant:"-",vowel:"long"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"ｓ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ｔ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｕ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｖ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｗ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"},{kana:"ブ",consonant:"b",vowel:"u"},{kana:"リュ",consonant:"ry",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｘ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ッ",consonant:"cl",vowel:"cl"},{kana:"ク",consonant:"k",vowel:"u"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ｙ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｚ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]}],zs=new Map(Nb.map(e=>[e.key,e.expansion])),Ag=new Map(Mb.map(e=>[e.key,e.expansion])),Db=e=>zs.has(e)||Ag.has(e),Jc="？",Pb="、",ep="’",Ub=e=>{if(e===Jc)return[{start:0,end:e.length,moras:[{kana:Jc,consonant:null,vowel:"",pseudo:"question"}],devoiced:[]}];const t=[];let n=0,r=[],a=[],s=0;const i=d=>{r.length!==0&&(t.push({start:n,end:d,moras:r,devoiced:a}),r=[],a=[],n=d)},o=(d,p)=>{t.push({start:d,end:p,moras:[{kana:Pb,consonant:null,vowel:"",pseudo:"touten"}],devoiced:[]})};let l=0;for(;l<e.length;){const d=e.length-l>=2?e.slice(l,l+2):void 0,p=(d!==void 0?zs.get(d):void 0)??Ag.get(e[l]);if(p===void 0){l+=1;continue}const h=d!==void 0&&zs.has(d)?2:1;s!==l&&(i(s),o(n,l),n=l);const m=e[l+h]===ep;if(m)for(let y=0;y<p.length;y++)a.push(r.length+y);r.push(...p),s=l+h+(m?ep.length:0),l=s}return i(s),s!==e.length&&o(s,e.length),t},cn=e=>Ub(e),tp=(e,t)=>{const n=e.charCodeAt(t);if(n>=55296&&n<=56319&&t+1<e.length){const r=e.charCodeAt(t+1);if(r>=56320&&r<=57343)return 2}return 1},Lb=(e,t,n)=>{const r=t.length;if(r===0)return[];const a=[],s=Array.from({length:r+1},()=>[]),i=[],o=[],l=_=>{let k=1/0,$=-2;if(_.start===0)k=e.connectionCost(0,_.leftId),$=-1;else for(const E of s[_.start]){const S=i[E]+e.connectionCost(a[E].rightId,_.leftId);S<k&&(k=S,$=E)}if($===-2)throw new Error("到達不能位置へのノード追加（内部不変条件違反）");const b=a.length;a.push(_),i.push(k+_.wordCost),o.push($),s[_.end].push(b)},d=[0,0,0,0];let p=-1,h=0;for(;h<r;){const _=tp(t,h);if(h>0&&s[h].length===0){h+=_;continue}let k=!1;if(e.trie.commonPrefixSearch(t,h,($,b)=>{const E=e.entryIndex[$],S=e.entryIndex[$+1];for(let I=E;I<S;I++)l({start:h,end:b,entryIdx:I,unkIdx:-1,overlayIdx:-1,leftId:e.leftId[I],rightId:e.rightId[I],wordCost:e.cost[I]}),k=!0}),n!==void 0&&n.lookup(t,h,($,b)=>{const E=n.entries[$];l({start:h,end:b,entryIdx:-1,unkIdx:-1,overlayIdx:$,leftId:E.leftId,rightId:E.rightId,wordCost:E.cost}),k=!0}),p<=h){const $=_===2?t.codePointAt(h):t.charCodeAt(h),b=e.charCategoriesOf($,d);for(let E=0;E<b;E++){const S=d[E],I=e.charCategories[S];if(!I.invoke&&k)continue;let C=h+_;if(I.group){const M=[0,0,0,0];let U=C;for(;U<r;){const Y=tp(t,U),G=Y===2?t.codePointAt(U):t.charCodeAt(U),j=e.charCategoriesOf(G,M);if(E<j&&M[E]===S)U+=Y;else break}C=U}const z=e.unkCatIndex[S],x=e.unkCatIndex[S+1];for(let M=z;M<x;M++)l({start:h,end:C,entryIdx:-1,unkIdx:M,overlayIdx:-1,leftId:e.unkLeftId[M],rightId:e.unkRightId[M],wordCost:e.unkCost[M]});x>z&&(p=C)}}h+=_}let m=-1,y=1/0;for(const _ of s[r]){const k=i[_]+e.connectionCost(a[_].rightId,0);k<y&&(y=k,m=_)}if(m<0)throw new Error(`経路が存在しない（内部不変条件違反）: ${t.slice(0,30)}`);const w=[];for(let _=m;_>=0;_=o[_])w.push(a[_]);return w.reverse()},Vb=255,qb=(e,t,n)=>{const r=Cg(t),a=e.charCategories.findIndex(d=>d.name==="SPACE"),s=[0,0,0,0],i=d=>{if(a<0)return!1;for(const p of d){const h=e.charCategoriesOf(p.codePointAt(0),s);let m=!1;for(let y=0;y<h;y++)s[y]===a&&(m=!0);if(!m)return!1}return d.length>0},o=[];for(const d of Bb(r))for(const p of Lb(e,r.slice(d.start,d.end),n))i(r.slice(p.start+d.start,p.end+d.start))||o.push({...p,start:p.start+d.start,end:p.end+d.start});const l=[];for(const d of o){if(d.overlayIdx>=0&&n!==void 0){const k=n.entries[d.overlayIdx];l.push({surface:r.slice(d.start,d.end),start:d.start,end:d.end,pos:k.pos,pron:k.reading.replaceAll("’",""),pronRaw:k.reading,accType:k.accentType,chainRule:k.chainRule==="*"?void 0:k.chainRule,isUnknown:!1});continue}if(d.entryIdx<0){l.push({surface:r.slice(d.start,d.end),start:d.start,end:d.end,pos:e.meta.posTable[e.unkPosId[d.unkIdx]],isUnknown:!0});continue}const p=d.entryIdx,h=e.unitIndex[p],m=e.unitIndex[p+1],y=e.meta.posTable[e.posId[p]],w=e.meta.chainRuleTable[e.chainRuleId[p]];let _=d.start;for(let k=h;k<m;k++){const $=e.unitSurfLen[k];if($===0&&k!==m-1)throw new Error(`辞書破損: 非最終ユニットの surfLen=0（表層 ${r.slice(d.start,d.end)}）`);const b=$===0?d.end:_+$,E=e.unitAccType[k];l.push({surface:r.slice(_,b),start:_,end:b,pos:y,pron:e.unitPron(k),pronRaw:e.unitPronRaw(k),accType:E===Vb?void 0:E,chainRule:w==="*"?void 0:w,chainFlag:k===h?void 0:!1,isUnknown:!1}),_=b}if(_!==d.end)throw new Error(`辞書破損: ユニット分割がノード表層を被覆しない（表層 ${r.slice(d.start,d.end)}, 到達 ${_-d.start}/${d.end-d.start}）`)}return l},Wb=/^(?:(?<pos>名詞|形容詞|助詞|特殊助動詞|動詞)%)?(?<accent>[FC][1-5]|P1|P2|P6|P14)?(?:@(?<add>[-0-9]+))?$/,np=new Map,zg=e=>{const t=np.get(e);if(t!==void 0)return t;const n=Fb(e);return np.set(e,n),n},Fb=e=>{if(e===""||e==="*")return null;const t={};for(const n of e.split("/")){const r=Wb.exec(n);if(!r||!r.groups)continue;const a={accentType:r.groups.accent??"none",addType:r.groups.add!==void 0?Number(r.groups.add):0};switch(r.groups.pos){case"動詞":t.doushi=a;break;case"助詞":t.joshi=a;break;case"形容詞":t.keiyoushi=a;break;case"名詞":t.meishi=a;break;case"特殊助動詞":break;default:t.default=a;break}}return t},Gb=(e,t)=>{const n=t[0];return(n==="動詞"||n==="助動詞"?e.doushi:n==="助詞"?e.joshi:n==="形容詞"?e.keiyoushi:n==="名詞"?e.meishi:void 0)??e.default},dt=e=>{let t=0;for(const n of e.moras)n.spec.pseudo||t++;return t},Hb=e=>e.moras.length===1&&e.moras[0].spec.pseudo==="touten",Tt=(e,t)=>{const n=new Set(t);return e.map((r,a)=>({spec:r,voiced:!n.has(a)}))},jb=e=>{const t=[];for(const n of e){if(n.isUnknown||n.pronRaw===void 0){t.push({surface:n.surface,pos:[...n.pos],moras:[],pronOrig:"",accent:0,chainRule:null,chainFlag:void 0,isUnknown:!0});continue}const r=n.pronRaw==="*"?[]:cn(n.pronRaw);if(r.length>1)throw new Error(`辞書発音列が単一rangeでない: ${n.surface} / ${n.pronRaw}`);const a=r[0];t.push({surface:n.surface,pos:[...n.pos],moras:a===void 0?[]:Tt(a.moras,a.devoiced),pronOrig:a===void 0?"":a.moras.map(s=>s.kana).join(""),accent:n.accType??0,chainRule:n.chainRule!==void 0?zg(n.chainRule):null,chainFlag:n.chainFlag,isUnknown:!1})}return t},Je=e=>e[0]==="名詞",Ft=e=>e[0]==="動詞",fr=e=>e[0]==="形容詞",On=e=>e[0]==="助詞",gt=e=>e[0]==="助動詞",Os=e=>e[0]==="記号",Og=e=>e[0]==="フィラー",Kb=e=>e[0]==="接頭詞",rp=e=>e[0]==="副詞",ap=e=>e[0]==="接続詞",sp=e=>e[0]==="連体詞",ip=e=>(e[0]==="名詞"||e[0]==="動詞"||e[0]==="形容詞")&&e[1]==="接尾",op=e=>e[0]==="名詞"&&e[1]==="形容動詞語幹",up=e=>e[0]==="名詞"&&e[1]==="副詞可能",Xb=e=>e[0]==="動詞"&&e[1]==="非自立",os=e=>e[0]==="形容詞"&&e[1]==="非自立",Yb=e=>e[0]==="助詞"&&e[1]==="接続助詞",Qb=e=>e[0]==="名詞"&&e[1]==="固有名詞"&&e[2]==="人名"&&e[3]==="姓",Zb=e=>e[0]==="名詞"&&e[1]==="固有名詞"&&e[2]==="人名"&&e[3]==="名",De=e=>(e[0]==="名詞"||e[0]==="記号")&&e[1]==="数",us=e=>e[5].startsWith("連用"),Jb=e=>{if(e[0]!=="記号"){if(e[0]==="名詞"&&e[1]==="数"){e[0]="記号";return}if((e[0]==="副詞"||e[0]==="名詞")&&e[1]==="一般"){e[0]="記号",e[1]="一般";return}e[0]="記号",e[1]="*"}},ev=e=>{let t=[];for(const n of e){if(dt(n)!==0){t.push(n);continue}const r=cn(n.surface);for(const a of r){const i={surface:n.surface.slice(a.start,a.end),pos:[...n.pos],moras:Tt(a.moras,a.devoiced),pronOrig:a.moras.map(l=>l.kana).join(""),accent:0,chainRule:n.chainRule,chainFlag:n.chainFlag,isUnknown:n.isUnknown};dt(i)===0?i.moras.length===1&&i.moras[0].spec.pseudo==="touten"&&Jb(i.pos):i.pos=["フィラー","*","*","*",i.pos[4],i.pos[5]],i.moras.length>0&&t.push(i)}}t=t.filter(n=>n.moras.length>0);{let n;const r=[];for(const a of t){if(Og(a.pos)&&Db(a.surface)){if(n!==void 0){n.surface+=a.surface,n.moras.push(...a.moras);continue}n=a}else n=void 0;r.push(a)}t=r}for(let n=0;n+1<t.length;n++){const r=t[n],a=t[n+1];a.moras.length===1&&a.moras[0].spec.kana==="ウ"&&!a.moras[0].spec.pseudo&&gt(a.pos)&&(Ft(r.pos)||gt(r.pos))&&dt(r)>0&&(a.moras=Tt([tv],[]),a.accent=0),gt(r.pos)&&a.surface==="？"&&(r.surface==="です"?(r.moras=Tt(lp("デス"),[]),r.accent=1):r.surface==="ます"&&(r.moras=Tt(lp("マス"),[]),r.accent=1))}return t},tv={kana:"ー",consonant:"-",vowel:"long"},lp=e=>{const t=cn(e);if(t.length!==1||t[0].start!==0||t[0].end!==e.length)throw new Error(`内部エラー: ${e} がモーラ分割できない`);return t[0].moras},nv={Chi:"チ",Fu:"フ",Go:"ゴ",Ha:"ハ",Hi:"ヒ",Hya:"ヒャ",I:"イ",Ju:"ジュ",Ku:"ク",Long:"ー",Ni:"ニ",Re:"レ",Ro:"ロ",Shi:"シ",Ta:"タ",To:"ト",Xtsu:"ッ",Yo:"ヨ"},ce=(e,t)=>{let n="";for(const r of e){const a=nv[r];if(a===void 0)throw new Error(`未登録の MoraEnum: ${r}`);n+=a}return{kana:n,accent:t}},rv=new Set(["年","円","年間","年生","年代","年度","年版","年余","年来","えん"]),av=new Map([["四",ce(["Yo"],0)]]),sv=new Set(["人","人月","人前","人組"]),iv=new Map([["四",ce(["Yo"],0)],["七",ce(["Shi","Chi"],1)]]),ov=new Set(["時","時間","時限","時半"]),uv=new Map([["四",ce(["Yo"],0)],["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),lv=new Set(["日","日間"]),dv=new Map([["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),cv=new Set(["月"]),pv=new Map([["四",ce(["Shi"],0)],["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),hv=new Set([]),fv=new Map([["六",ce(["Ro","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),mv=new Set(["個","階","分","発","本","鉢","口","切れ","箱","か月","か国","か所","か条","か村","か年","カ月","カ国","カ寺","カ所","カ条","カ村","カ店","カ年","ケ月","ケ国","ケ所","ケ条","ケ村","ケ年","ヵ月","ヵ国","ヵ所","ヵ条","ヵ村","ヵ年","ヶ月","ヶ国","ヶ所","ヶ条","ヶ村","ヶ年","個月","個口","個国","個条","個年","箇月","箇国","箇所","箇条","箇年","かけ","くだり","けた","価","課","画","回","回忌","回生","回戦","回線","回分","海里","カイリ","浬","角","株","冠","巻","缶","貫","貫目","間","基","期","期生","機","気圧","季","騎","客","脚","球","級","橋","局","曲","極","重ね","斤","金","句","区","躯","計","桁","ケタ","校","港","項","組","件","軒","言","戸","湖","光年","石","ぴき","ぺん","波","派","敗","杯","拍","泊","版","犯","班","匹","疋","筆","俵","票","品","分間","分目","片","篇","編","辺","遍","歩","報","方","法","本立て","頭身"]),gv=new Map([["一",ce(["I","Xtsu"],1)],["六",ce(["Ro","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),yv=new Set(["．","・","才","頭","着","足","尺","坪","通り","センチ","シーシー","ＣＣ","ｃｃ","ｃｍ","サイクル","サンチーム","シーズン","シート","シリング","シンガポールドル","スイスフラン","スウェーデンクローネ","スクレ","セット","セント","ソル","ゾーン","糎","竿","差","差し","歳","歳児","作","冊","刷","皿","棹","艘","子","視","式","失","室","射","社","勺","種","首","周","周忌","周年","州","週","週間","集","宿","所","勝","升","床","章","色","食","親等","進","進数","品","すじ","そう","そろい","筋","数","寸","世","隻","席","石","節","戦","線","選","銭","層","相","揃","たび","つかみ","つがい","つぶ","つまみ","つ折","つ折り","とおり","とき","ところ","とせ","玉","月","手","束","続き","体","対","卓","樽","反","丁","丁目","鳥","通","掴み","艇","滴","店","転","点","斗","棟","盗","灯","等","等席","等地","等分","答","得","噸","粒","種類","歳馬","世紀","車種"]),wv=new Map([["一",ce(["I","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)]]),_v=new Set(["キロ","カロリー","ｃａｌ","ｋｂ","ｋｇ","ｋｌ","ｋｍ","ｋｔ","ｋｗ","ｋグラム","ｋバイト","ｋヘルツ","ｋメートル","ｋリットル","ｋワット","カナダドル","カラット","ガロン","キュリー","キロカロリー","キログラム","キロトン","キロバイト","キロヘルツ","キロメートル","キロリットル","キロワット","キロワット時","クラス","クローナ","クローネ","グァラニ","ケース","コース","粁"]),bv=new Map([["六",ce(["Ro","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),vv=new Set(["トン","ｔ","タル","テラ","トライ"]),$v=new Map([["一",ce(["I","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)]]),xv=new Set(["房","柱","％","ポンド","ｐａ","ｐｐｍ","パーセント","パーミル","パスカル","パック","パット","ピーピーエム","ピコ","ページ","頁","ペア","ペセタ","ペソ","ペニー","ペニヒ","ペンス","ポイント","振り","針","袋","張り","平米","平方キロ","平方キロメートル","平方センチメートル","平方メートル","品目"]),kv=new Map([["十",ce(["Ju","Xtsu"],1)]]),Sv=[{keys:rv,table:av},{keys:sv,table:iv},{keys:ov,table:uv},{keys:lv,table:dv},{keys:cv,table:pv},{keys:hv,table:fv},{keys:mv,table:gv},{keys:yv,table:wv},{keys:_v,table:bv},{keys:vv,table:$v},{keys:xv,table:kv}],Ev=new Set(["分","版","敗","発","拍","鉢","波","派","泊","犯","班","品","分間","分目","片","篇","編","辺","遍","歩","報","方"]),Tv=new Map([["一","semivoiced"],["三","semivoiced"],["四","semivoiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","semivoiced"],["万","semivoiced"],["何","semivoiced"]]),Iv=new Set(["本","匹","疋","票","俵","箱","本立て","杯","針","柱"]),Cv=new Map([["一","semivoiced"],["三","voiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","voiced"],["万","voiced"],["何","voiced"]]),Av=new Set([]),zv=new Map([["三","voiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","voiced"],["万","voiced"],["何","voiced"]]),Ov=new Set(["軒","石","足","尺","かけ","重ね","件","勺"]),Rv=new Map([["三","voiced"],["千","voiced"],["万","voiced"]]),Bv=new Set(["階"]),Nv=new Map([["三","voiced"]]),Mv=[{keys:Ev,table:Tv},{keys:Iv,table:Cv},{keys:Av,table:zv},{keys:Ov,table:Rv},{keys:Bv,table:Nv}],Dv=[{surface:"棟",prons:new Set(["ムネ"])},{surface:"かけ",prons:new Set(["カケ"])},{surface:"くだり",prons:new Set(["クダリ"])},{surface:"けた",prons:new Set(["ケタ"])},{surface:"すじ",prons:new Set(["スジ"])},{surface:"そろい",prons:new Set(["ソロイ"])},{surface:"たび",prons:new Set(["タビ"])},{surface:"つかみ",prons:new Set(["ツカミ"])},{surface:"つがい",prons:new Set(["ツガイ"])},{surface:"つまみ",prons:new Set(["ツマミ"])},{surface:"とおり",prons:new Set(["トーリ"])},{surface:"ところ",prons:new Set(["トコロ"])},{surface:"とせ",prons:new Set(["トセ"])},{surface:"まわり",prons:new Set(["マワリ"])},{surface:"シーズン",prons:new Set(["シーズン"])},{surface:"セット",prons:new Set(["セット"])},{surface:"握り",prons:new Set(["ニギリ"])},{surface:"回り",prons:new Set(["マワリ"])},{surface:"株",prons:new Set(["カブ"])},{surface:"竿",prons:new Set(["サオ"])},{surface:"筋",prons:new Set(["スジ"])},{surface:"桁",prons:new Set(["ケタ"])},{surface:"ケタ",prons:new Set(["ケタ"])},{surface:"月",prons:new Set(["ツキ"])},{surface:"言",prons:new Set(["コト"])},{surface:"口",prons:new Set(["クチ"])},{surface:"差し",prons:new Set(["サシ"])},{surface:"皿",prons:new Set(["サラ"])},{surface:"山",prons:new Set(["ヤマ"])},{surface:"勺",prons:new Set(["シャク"])},{surface:"尺",prons:new Set(["シャク"])},{surface:"重ね",prons:new Set(["カサネ","ガサネ"])},{surface:"振り",prons:new Set(["フリ"])},{surface:"針",prons:new Set(["ハリ"])},{surface:"切れ",prons:new Set(["キレ"])},{surface:"束",prons:new Set(["タバ"])},{surface:"続き",prons:new Set(["ツヅキ"])},{surface:"揃",prons:new Set(["ソロイ"])},{surface:"袋",prons:new Set(["フクロ"])},{surface:"柱",prons:new Set(["ハシラ"])},{surface:"張り",prons:new Set(["ハリ"])},{surface:"通り",prons:new Set(["トーリ"])},{surface:"掴み",prons:new Set(["ツカミ"])},{surface:"坪",prons:new Set(["ツボ"])},{surface:"箱",prons:new Set(["ハコ"])},{surface:"鉢",prons:new Set(["ハチ"])},{surface:"晩",prons:new Set(["バン"])},{surface:"品",prons:new Set(["シナ"])},{surface:"瓶",prons:new Set(["ビン"])},{surface:"分け",prons:new Set(["ワケ"])},{surface:"幕",prons:new Set(["マク"])},{surface:"夜",prons:new Set(["ヤ","ヨ"])},{surface:"粒",prons:new Set(["ツブ"])},{surface:"枠",prons:new Set(["ワク"])},{surface:"棹",prons:new Set(["サオ"])},{surface:"つ折",prons:new Set(["ツオリ"])},{surface:"つ折り",prons:new Set(["ツオリ"])},{surface:"つぶ",prons:new Set(["ツブ"])},{surface:"とき",prons:new Set(["トキ"])}],Pv=new Map([["一",ce(["Hi","To"],0)],["二",ce(["Fu","Ta"],0)]]),dp=new Set(["一","二","三","四","五","六","七","八","九","何","幾","数"]),cp=new Set(["十","百","千","万","億","兆","京","垓","𥝱","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数"]),Uv=new Set(["百","千"]),Lv=new Map([["三","voiced"],["六","semivoiced"],["八","semivoiced"],["何","voiced"]]),Vv=new Set(["百"]),qv=new Map([["六",ce(["Ro","Xtsu"],0)],["八",ce(["Ha","Xtsu"],0)]]),Wv=new Set(["千","兆"]),Fv=new Map([["一",ce(["I","Xtsu"],0)],["八",ce(["Ha","Xtsu"],0)],["十",ce(["Ju","Xtsu"],1)]]),Gv=[{keys:Vv,table:qv},{keys:Wv,table:Fv}],Hv=[{keys:Uv,table:Lv}],jv=new Set(["人"]),Kv=new Map([["一","一人,名詞,副詞可能,*,*,*,*,一人,ヒトリ,ヒトリ,2/3,*"],["二","二人,名詞,副詞可能,*,*,*,*,二人,フタリ,フタリ,3/3,*"]]),Xv=new Set(["日"]),Yv=new Map([["一","一日,名詞,副詞可能,*,*,*,*,一日,イチニチ,イチニチ,4/4,*"],["二","二日,名詞,副詞可能,*,*,*,*,二日,フツカ,フツカ,0/3,*"],["三","三日,名詞,副詞可能,*,*,*,*,三日,ミッカ,ミッカ,0/3,*"],["四","四日,名詞,副詞可能,*,*,*,*,四日,ヨッカ,ヨッカ,0/3,*"],["五","五日,名詞,副詞可能,*,*,*,*,五日,イツカ,イツカ,0/3,*"],["六","六日,名詞,副詞可能,*,*,*,*,六日,ムイカ,ムイカ,0/3,*"],["七","七日,名詞,副詞可能,*,*,*,*,七日,ナノカ,ナノカ,0/3,*"],["八","八日,名詞,副詞可能,*,*,*,*,八日,ヨウカ,ヨーカ,0/3,*"],["九","九日,名詞,副詞可能,*,*,*,*,九日,ココノカ,ココノカ,0/4,*"],["十","十日,名詞,副詞可能,*,*,*,*,十日,トウカ,トーカ,0/3,*"]]),Qv=new Set(["日間"]),Zv=new Map([["一","一日間,名詞,副詞可能,*,*,*,*,一日間,イチニチカン,イチニチカン,4/6,*"],["二","二日間,名詞,副詞可能,*,*,*,*,二日,フツカカン,フツカカン,3/5,*"],["三","三日間,名詞,副詞可能,*,*,*,*,三日,ミッカカン,ミッカカン,3/5,*"],["四","四日間,名詞,副詞可能,*,*,*,*,四日,ヨッカカン,ヨッカカン,3/5,*"],["五","五日間,名詞,副詞可能,*,*,*,*,五日,イツカカン,イツカカン,3/5,*"],["六","六日間,名詞,副詞可能,*,*,*,*,六日,ムイカカン,ムイカカン,3/5,*"],["七","七日間,名詞,副詞可能,*,*,*,*,七日,ナノカカン,ナノカカン,3/5,*"],["八","八日間,名詞,副詞可能,*,*,*,*,八日,ヨウカカン,ヨーカカン,3/5,*"],["九","九日間,名詞,副詞可能,*,*,*,*,九日,ココノカカン,ココノカカン,4/6,*"],["十","十日間,名詞,副詞可能,*,*,*,*,十日,トウカカン,トーカカン,3/5,*"]]),Jv=[{keys:jv,table:Kv},{keys:Xv,table:Yv},{keys:Qv,table:Zv}],e1=new Map([["０","０,名詞,数,*,*,*,*,０,ゼロ,ゼロ,1/2,C3"],["１","１,名詞,数,*,*,*,*,１,イチ,イチ,2/2,C3"],["２","２,名詞,数,*,*,*,*,２,ニ,ニ,1/1,C3"],["３","３,名詞,数,*,*,*,*,３,サン,サン,0/2,C3"],["４","４,名詞,数,*,*,*,*,４,ヨン,ヨン,1/2,C1"],["５","５,名詞,数,*,*,*,*,５,ゴ,ゴ,1/1,C3"],["６","６,名詞,数,*,*,*,*,６,ロク,ロク,2/2,C3"],["７","７,名詞,数,*,*,*,*,７,ナナ,ナナ,1/2,C3"],["８","８,名詞,数,*,*,*,*,８,ハチ,ハチ,2/2,C3"],["９","９,名詞,数,*,*,*,*,９,キュウ,キュー,1/2,C3"]]),t1=new Map([["○","〇"],["１","一"],["２","二"],["３","三"],["４","四"],["５","五"],["６","六"],["７","七"],["８","八"],["９","九"],["一","一"],["二","二"],["三","三"],["四","四"],["五","五"],["六","六"],["七","七"],["八","八"],["九","九"],["いち","一"],["に","二"],["さん","三"],["よん","四"],["ご","五"],["ろく","六"],["なな","七"],["はち","八"],["きゅう","九"],["〇","〇"],["０","０"],["壱","一"],["弐","二"],["貳","二"],["ニ","二"],["参","三"],["し","四"],["しち","七"],["く","九"]]),pp=["","十,名詞,数,*,*,*,*,十,ジュウ,ジュー,1/2,*","百,名詞,数,*,*,*,*,百,ヒャク,ヒャク,2/2,*","千,名詞,数,*,*,*,*,千,セン,セン,1/2,*"],hp=["","万,名詞,数,*,*,*,*,万,マン,マン,1/2,*","億,名詞,数,*,*,*,*,億,オク,オク,1/2,*","兆,名詞,数,*,*,*,*,兆,チョウ,チョー,1/2,C3","京,名詞,数,*,*,*,*,京,ケイ,ケー,1/2,*","垓,名詞,数,*,*,*,*,垓,ガイ,ガイ,1/2,*","𥝱,名詞,数,*,*,*,*,𥝱,ジョ,ジョ,1/1,*","穣,名詞,数,*,*,*,*,穣,ジョウ,ジョー,1/2,*","溝,名詞,数,*,*,*,*,溝,コウ,コウ,1/2,*","澗,名詞,数,*,*,*,*,澗,カン,カン,1/2,*","正,名詞,数,*,*,*,*,正,セイ,セー,1/2,*","載,名詞,数,*,*,*,*,載,サイ,サイ,1/2,*","極,名詞,数,*,*,*,*,極,ゴク,ゴク,1/2,*","恒河沙,名詞,数,*,*,*,*,恒河沙,ゴウガシャ,ゴウガシャ,1/4,*","阿僧祇,名詞,数,*,*,*,*,阿僧祇,アソウギ,アソーギ,2/4,*","那由他,名詞,数,*,*,*,*,那由他,ナユタ,ナユタ,1/3,*","不可思議,名詞,数,*,*,*,*,不可思議,フカシギ,フカシギ,2/4,*","無量大数,名詞,数,*,*,*,*,無量大数,ムリョウタイスウ,ムリョータイスー,6/7,*"],n1=new Map([["カ","ガ"],["キ","ギ"],["ク","グ"],["ケ","ゲ"],["コ","ゴ"],["キャ","ギャ"],["キュ","ギュ"],["キョ","ギョ"],["キェ","ギェ"],["サ","ザ"],["シ","ジ"],["ス","ズ"],["セ","ゼ"],["ソ","ゾ"],["スィ","ズィ"],["シャ","ジャ"],["シュ","ジュ"],["ショ","ジョ"],["シェ","ジェ"],["タ","ダ"],["チ","ヂ"],["ツ","ヅ"],["テ","デ"],["ト","ド"],["テャ","デャ"],["ティ","ディ"],["テュ","デュ"],["トゥ","ドゥ"],["テョ","デョ"],["ハ","バ"],["ヒ","ビ"],["フ","ブ"],["ヘ","ベ"],["ホ","ボ"],["ヒャ","ビャ"],["ヒュ","ビュ"],["ヒェ","ビェ"],["ヒョ","ビョ"]]),r1=new Map([["ハ","パ"],["ヒ","ピ"],["フ","プ"],["ヘ","ペ"],["ホ","ポ"],["ヒャ","ピャ"],["ヒュ","ピュ"],["ヒェ","ピェ"],["ヒョ","ピョ"]]),Me=e=>{const t=e.split(",");if(t.length<12||t.length>13)throw new Error(`ルール行の列数が不正: ${e}`);const n=t[9],r=t[10].split("/")[0],a=r==="*"||r===""?0:Number(r);if(!Number.isInteger(a))throw new Error(`ルール行の核が不正: ${e}`);const s=n==="*"?[]:cn(n);if(s.length>1)throw new Error(`ルール行の発音が単一rangeでない: ${e}`);const i=t[12]==="1"?!0:t[12]==="0"?!1:void 0;return{surface:t[0],pos:[t[1],t[2],t[3],t[4],t[5],t[6]],moras:s.length===1?Tt(s[0].moras,s[0].devoiced):[],pronOrig:s.length===1?s[0].moras.map(o=>o.kana).join(""):"",accent:a,chainRule:zg(t[11]??"*"),chainFlag:i,isUnknown:!1}},Pe=e=>{e.surface="",e.moras=[],e.pronOrig="",e.accent=0,e.chainRule=null,e.chainFlag=void 0,e.pos=["*","*","*","*","*","*"]},It=(e,t,n)=>{const r=cn(t);if(r.length!==1)throw new Error(`内部エラー: ${t} がモーラ分割できない`);e.moras=Tt(r[0].moras,r[0].devoiced),e.accent=n},fp=new Set(["―","−","‐","—","－"]),mp=e=>e==="．"||e==="・",a1=e=>e.pos[0]==="接頭詞"&&e.pos[1]==="数接続",gp=e=>e.pos[0]==="名詞"&&e.pos[1]==="副詞可能",yp=e=>e.pos[0]==="名詞"&&e.pos[1]==="接尾"&&e.pos[2]==="助数詞",s1=(e,t,n)=>{let r=0;if(t>0){const a=e[t-1];a1(a)?r+=2:(gp(a)||yp(a))&&(r+=1);const s=t>1?e[t-2]:void 0,i=s!==void 0&&De(s.pos);mp(a.surface)?i&&(r-=5):(fp.has(a.surface)||a.surface==="（"&&i||a.surface==="）"||a.surface==="番号")&&(r-=2),s!==void 0&&s.surface==="番号"&&(r-=2)}if(n+1<e.length){const a=e[n+1];if((gp(a)||yp(a))&&(r+=2),fp.has(a.surface))r-=2;else if(a.surface==="（")r-=2;else if(a.surface==="）"){const s=e[n+2];s!==void 0&&De(s.pos)&&(r-=2)}else a.surface==="番号"?r-=2:mp(a.surface)&&(r+=4)}return r},i1=e=>{switch(e){case"一":return{kind:"digit",value:1};case"二":return{kind:"digit",value:2};case"三":return{kind:"digit",value:3};case"四":return{kind:"digit",value:4};case"五":return{kind:"digit",value:5};case"六":return{kind:"digit",value:6};case"七":return{kind:"digit",value:7};case"八":return{kind:"digit",value:8};case"九":return{kind:"digit",value:9};case"〇":case"０":return{kind:"digit",value:0};case"，":return{kind:"comma"};default:return}},o1=e=>{const t=[];let n=0,r=[],a=!1;const s=()=>{for(;r.length>0&&r[r.length-1].kind!=="digit";)r.pop();r.length>0&&t.push(...l1(n,r)),r=[]};e.forEach((i,o)=>{!a&&r.length>0&&s();const l=i1(i.surface);if(l===void 0){a=!1;return}if(!a)if(l.kind==="digit")n=o,a=!0;else return;r.push(l)}),s();for(const i of t)i.isNumericalReading===void 0&&(i.isNumericalReading=s1(e,i.start,i.end)>=0);return t},wp=e=>e.length>0&&e[0].kind==="digit"&&e[0].value===0,u1=e=>{let t=0;for(let n=0;n<e.length;n++){const r=e[e.length-1-n],a=n%4===3;if(r.kind==="digit"&&a)return!1;if(r.kind==="comma"){if(!a)return!1;t++}}return t>0},l1=(e,t)=>{const n=(i,o,l)=>{if(!(o.length<=1))return{start:i,end:i+o.length-1,digits:o.flatMap(d=>d.kind==="digit"?[d.value]:[]),isNumericalReading:wp(o)?!1:l}};if(!wp(t)&&u1(t)){const i=n(e,t,!0);return i?[i]:[]}const r=[];let a=e,s=[];for(const i of t.concat([{kind:"comma"}]))if(i.kind==="comma"){const o=n(a,s,void 0);o&&r.push(o),a+=s.length+1,s=[]}else s.push(i);return r},d1=(e,t)=>{for(let n=0;n<t.digits.length;n++){const r=e[t.start+n];switch(t.digits[n]){case 0:It(r,"ゼロ",1);break;case 2:It(r,"ニー",1);break;case 5:It(r,"ゴー",1);break}r.chainRule=null,n%2===0?(r.chainFlag=!1,n!==t.digits.length-1&&(r.accent=3)):r.chainFlag=!0}},c1=(e,t)=>{let n=0;for(let s=t.end;s>=t.start;s--)e[s].surface==="，"&&(e.splice(s,1),n++);if(t.digits.length>hp.length*4)return-n;let r=!1,a=0;for(let s=0;s<t.digits.length;s++){const i=t.digits[s],o=t.start+s+a,l=t.digits.length-s-1;i===0?Pe(e[o]):r=!0,l%4===0?(r&&l>0&&(e.splice(o+1,0,Me(hp[l/4])),a++),r=!1):i===1?e[o]=Me(pp[l%4]):i!==0&&(e.splice(o+1,0,Me(pp[l%4])),a++)}return a-n},p1=e=>{for(let r=0;r<e.length;r++){const a=e[r];if(!Hb(a)||!De(a.pos))continue;const s=[];let i=!0;for(const o of a.surface){const l=e1.get(o);if(l===void 0){i=!1;break}s.push(Me(l))}i&&s.length>0&&(e.splice(r,1,...s),r+=s.length-1)}for(const r of e)if(r.surface!=="*"&&De(r.pos)){const a=t1.get(r.surface);a!==void 0&&(r.surface=a)}const t=o1(e);let n=0;for(const r of t)r.start+=n,r.end+=n,r.isNumericalReading===!0?n+=c1(e,r):d1(e,r);return e.filter(r=>r.moras.length>0)},h1=e=>e==="．"||e==="・",f1=e=>e.pos[0]==="名詞"&&e.pos[1]==="副詞可能",m1=e=>e.pos[0]==="名詞"&&e.pos[1]==="接尾"&&e.pos[2]==="助数詞",_p=e=>f1(e)||m1(e),Tn=(e,t,n)=>{for(const{keys:r,table:a}of e)if(r.has(t))return a.get(n)},ls=(e,t)=>It(e,t.kana,t.accent),bp=(e,t)=>{const n=e.moras[0];if(n===void 0||n.spec.pseudo)return;const a=(t==="voiced"?n1:r1).get(n.spec.kana);if(a===void 0)return;const s=cn(a);if(s.length!==1||s[0].moras.length!==1)throw new Error(`内部エラー: 濁音化結果 ${a} が1モーラでない`);e.moras[0]=Tt(s[0].moras,n.voiced?[]:[0])[0]},g1="．,名詞,接尾,助数詞,*,*,*,．,テン,テン,0/2,*,-1",y1="一日,名詞,副詞可能,*,*,*,*,一日,ツイタチ,ツイタチ,4/4,*",w1="十四日,名詞,副詞可能,*,*,*,*,十四日,ジュウヨッカ,ジューヨッカ,1/5,*",_1="十四日間,名詞,副詞可能,*,*,*,*,十四日間,ジュウヨッカカン,ジューヨッカカン,5/7,*",vp="二十,名詞,副詞可能,*,*,*,*,二十,ニジュウ,ニジュー,1/3,*",b1="四日,名詞,副詞可能,*,*,*,*,四日,ヨッカ,ヨッカ,0/3,*,0",v1="四日間,名詞,副詞可能,*,*,*,*,四日間,ヨッカカン,ヨッカカン,3/5,*,0",$1="二十日,名詞,副詞可能,*,*,*,*,二十日,ハツカ,ハツカ,0/3,*",x1="二十日間,名詞,副詞可能,*,*,*,*,二十日間,ハツカカン,ハツカカン,3/5,*",k1=e=>{{let t="disabled";for(let n=1;n+1<e.length;n++){const[r,a,s]=[e[n-1],e[n],e[n+1]];if(t==="ifMeishi"){t="skipping";continue}if(t==="skipping"){if(a.pos[0]==="名詞")continue;t="disabled";continue}if(a.surface!==""&&r.surface!==""&&h1(a.surface)&&De(r.pos)&&De(s.pos)){switch(e[n]=Me(g1),e[n].chainFlag=!0,r.surface){case"〇":case"０":It(r,"レー",1);break;case"二":It(r,"ニー",1);break;case"五":It(r,"ゴー",1);break;case"六":It(r,"ロク",1);break}t="ifMeishi"}}}for(let t=1;t<e.length;t++){const[n,r]=[e[t-1],e[t]];if(!De(n.pos)||!_p(r))continue;const a=Tn(Sv,r.surface,n.surface);a!==void 0&&ls(n,a);const s=Tn(Mv,r.surface,n.surface);s!==void 0&&bp(r,s),n.chainFlag=!1,r.chainFlag=!0}for(let t=1;t<e.length;t++){const[n,r]=[e[t-1],e[t]];if(!De(n.pos))continue;De(r.pos)&&r.surface!==""&&(dp.has(n.surface)&&cp.has(r.surface)?(n.chainFlag=!1,r.chainFlag=!0):cp.has(n.surface)&&dp.has(r.surface)&&(r.chainFlag=!1));const a=Tn(Gv,r.surface,n.surface);a!==void 0&&ls(n,a);const s=Tn(Hv,r.surface,n.surface);s!==void 0&&bp(r,s)}for(let t=0;t+1<e.length;t++){const n=t>0?e[t-1]:void 0,[r,a]=[e[t],e[t+1]];if(a.surface===""||!De(r.pos)||n!==void 0&&!Os(n.pos)&&De(n.pos)||!_p(a))continue;if(Dv.find(o=>o.surface===a.surface&&o.prons.has(a.pronOrig))!==void 0){const o=Pv.get(r.surface);o!==void 0&&ls(r,o)}const i=Tn(Jv,a.surface,r.surface);i!==void 0&&(n!==void 0&&n.surface.includes("月")&&r.surface==="一"&&a.surface==="日"?e[t]=Me(y1):e[t]=Me(i),Pe(a))}if(e.length>2)for(let t=0;t+2<e.length;t++){const n=t>0?e[t-1]:void 0;if(n!==void 0&&De(n.pos))continue;const[r,a,s]=[e[t],e[t+1],e[t+2]],i=e[t+3],o=[r.surface,a.surface,s.surface,i?.surface];o[0]==="十"&&o[1]==="四"&&o[2]==="日"?(e[t]=Me(w1),Pe(a),Pe(s)):o[0]==="十"&&o[1]==="四"&&o[2]==="日間"?(e[t]=Me(_1),Pe(a),Pe(s)):o[0]==="二"&&o[1]==="十"&&o[2]==="四"&&o[3]==="日"?(e[t]=Me(vp),e[t+1]=Me(b1),Pe(s),Pe(i)):o[0]==="二"&&o[1]==="十"&&o[2]==="四"&&o[3]==="日間"?(e[t]=Me(vp),e[t+1]=Me(v1),Pe(s),Pe(i)):o[0]==="二"&&o[1]==="十"&&o[2]==="日"?(e[t]=Me($1),Pe(a),Pe(s)):o[0]==="二"&&o[1]==="十"&&o[2]==="日間"&&(e[t]=Me(x1),Pe(a),Pe(s))}return e.filter(t=>t.moras.length>0)},S1=e=>{for(let t=1;t<e.length;t++)e[t].chainFlag===void 0&&(e[t].chainFlag=E1(e[t-1],e[t]))},E1=(e,t)=>{const n=e.pos,r=t.pos;return ip(r)?!0:Je(n)&&Zb(r)||Qb(n)&&Je(r)||Kb(r)||Os(n)||Os(r)||Je(n)&&Ft(r)||Je(n)&&fr(r)||Je(n)&&op(r)?!1:Ft(n)&&Xb(r)&&us(n)||Ft(n)&&os(r)&&us(n)||fr(n)&&os(r)&&us(n)||Yb(n)&&os(r)&&(e.surface==="て"||e.surface==="で")?!0:ip(n)&&Je(r)?!1:(gt(n)||On(n))&&(gt(r)||On(r))?!0:gt(n)||On(n)?!1:gt(r)||On(r)?!0:up(n)||up(r)||rp(n)||ap(n)||sp(n)||rp(r)||ap(r)||sp(r)||Ft(n)&&(fr(r)||Je(r))||op(n)&&Je(r)||fr(n)&&Je(r)?!1:(Je(n)&&Je(r),!0)},T1=e=>{if(e.length===0)return;let t=0,n=0;for(let r=0;r<e.length;r++){const a=e[r],s=r>0?e[r-1]:void 0,i=r+1<e.length?e[r+1]:void 0;let o,l,d;r===0||a.chainFlag!==!0?(t=r,n=0,a.surface==="十"&&i!==void 0&&De(i.pos)&&(d=0)):s!==void 0&&(o=I1(a,s,e[t],n),De(s.pos)&&De(a.pos)&&(l=C1(s,a,i))),n+=dt(a),o!==void 0&&(e[t].accent=o),l!==void 0&&(e[r-1].accent=l),d!==void 0&&(a.accent=d)}},I1=(e,t,n,r)=>{const a=e.accent,s=n.accent,i=e.chainRule!==null?Gb(e.chainRule,t.pos):void 0;if(i===void 0)return s;const o=()=>Math.max(0,r+i.addType);switch(i.accentType){case"F1":return s;case"F2":return s===0?o():s;case"F3":return s!==0?o():s;case"F4":return o();case"F5":return 0;case"C1":return r+a;case"C2":return r+1;case"C3":return r;case"C4":return 0;case"C5":return s;case"P1":return s===0?0:r+a;case"P2":return s===0?0:r+a;case"P6":return 0;case"P14":return s!==0?r+a:s;default:return s}},C1=(e,t,n)=>{const r=e.surface,a=t.surface,s=n?.surface,i=["一","二","三","四","五","六","七","八","九"];if(a==="十")return["五","六","八"].includes(r)&&s!==void 0&&i.includes(s)?0:1;if(a==="百")return r==="七"?2:["三","四","九","何"].includes(r)?1:dt(e)+dt(t);if(a==="千"||a==="万")return dt(e)+1;if(a==="億")return["一","六","七","八","幾"].includes(r)?2:1;if(a==="兆")return["六","七"].includes(r)?2:1},$p=new Set(["k","ky","s","sh","t","ty","ch","ts","h","f","hy","p","py"]),A1=e=>{const t=[];let n=0,r=0;e.forEach((a,s)=>{a.chainFlag!==!0&&(n=0,r=a.accent);for(const i of a.moras)t.push({mora:i,nodeIndex:s,pos:a.pos,flag:i.voiced?void 0:!1,midx:n,atype:r}),n++});for(let a=0;a<t.length;a++){const s=t[a],i=t[a+1],o=t[a+2];if(i!==void 0&&o!==void 0){const l=s.nodeIndex===i.nodeIndex&&i.nodeIndex!==o.nodeIndex,d=Ft(i.pos)||gt(i.pos)||i.pos[0]==="感動詞",p=(s.mora.spec.kana==="マ"||s.mora.spec.kana==="デ")&&i.mora.spec.kana==="ス"&&!i.mora.spec.pseudo&&!s.mora.spec.pseudo;l&&d&&p&&(i.flag=o.mora.spec.pseudo==="question"||o.mora.spec.vowel==="long")}if(i!==void 0){const l=s.flag!==!1&&i.flag===void 0&&(o===void 0||o.flag!==!1),d=Ft(i.pos)||gt(i.pos)||On(i.pos),p=i.mora.spec.kana==="シ"&&!i.mora.spec.pseudo&&s.nodeIndex!==i.nodeIndex&&(o===void 0||o.nodeIndex!==i.nodeIndex);l&&d&&p&&(i.atype===i.midx+1?i.flag=!0:i.flag=xp(i.mora,o?.mora),i.flag===!1&&(s.flag??=!0,o!==void 0&&(o.flag??=!0)))}s.flag===void 0&&(Og(s.pos)||i?.flag===!1||s.atype===s.midx+1?s.flag=!0:s.flag=xp(s.mora,i?.mora)),s.flag===!1&&i!==void 0&&(i.flag??=!0),s.mora.voiced=s.flag??!0}},xp=(e,t)=>{if(t===void 0)return!0;const n=e.spec.consonant,r=e.spec.vowel,a=t.spec.consonant;if(!(r!=="i"&&r!=="u"))return n==="s"&&(a==="s"||a==="sh")||(n==="f"||n==="h")&&(a==="f"||a==="h"||a==="hy")?!0:!(n!==null&&a!==null&&$p.has(n)&&$p.has(a))},z1=(e,t,n)=>{const r=qb(e,t,n);let a=ev(jb(r));return a=p1(a),a=k1(a),S1(a),T1(a),A1(a),a},Rg=e=>e.vowel==="cl"?["q"]:e.vowel==="N"?["N"]:e.consonant!==void 0?[e.consonant,e.vowel]:[e.vowel],O1=(e,t)=>{const n=[];let r=t;for(const a of e.moras){if(a.spec.pseudo)continue;const s=a.spec.vowel==="long"?r??"o":a.spec.vowel,i=a.spec.consonant==="-"||a.spec.vowel==="N"||a.spec.vowel==="cl";n.push({kana:a.spec.kana,consonant:i?void 0:a.spec.consonant??void 0,vowel:s,devoiced:a.voiced?void 0:!0}),r=s}return n},R1=new Map([["、",","],["，",","],["。","."],["．","."],["！","!"],["？","?"],["…","…"],["’","'"],["−","-"],["－","-"]]),Bg=e=>{const t=[];for(const n of e){const r=R1.get(n);r!==void 0&&t.push({surface:n,punct:r})}return t},Ng=e=>{const t=[];for(const n of e){if(dt(n)===0){if(t.length===0)continue;const s=t[t.length-1],i=N1(n);i!==void 0&&(s.pauseAfter=i),s.punctuations.push(...Bg(n.surface));continue}(n.chainFlag!==!0||t.length===0)&&t.push({words:[],accentNucleus:n.accent,pauseAfter:"none",punctuations:[]});const r=t[t.length-1],a=r.words.at(-1)?.moras.at(-1)?.vowel;r.words.push({node:n,moras:O1(n,a)})}return t.length>0&&(t[t.length-1].pauseAfter="long"),t},Mg=e=>{const t=[];for(const n of e){if(dt(n)>0)break;t.push(...Bg(n.surface))}return t},B1=(e,t)=>{const n=Ng(t).map(r=>({moras:r.words.flatMap(a=>a.moras),accentNucleus:r.accentNucleus,pauseAfter:r.pauseAfter,punctuations:r.punctuations.map(a=>a.punct)}));return{normalizedText:e,accentPhrases:n,leadingPunctuations:Mg(t).map(r=>r.punct)}},N1=e=>{if(e.pos[0]==="記号"){if(e.pos[1]==="読点")return"short";if(e.pos[1]==="句点")return"long"}},M1=e=>{const t=[],n=r=>t.push({surface:r.surface,phones:[r.punct]});for(const r of Mg(e))n(r);for(const r of Ng(e)){for(const a of r.words)t.push({surface:a.node.surface,phones:a.moras.flatMap(Rg)});for(const a of r.punctuations)n(a)}return t},D1=(e,t,n)=>{const r=z1(e,t,n);return{result:B1(Cg(t),r),words:M1(r)}},P1=(e,t)=>{if(e===0)return Array.from({length:t},(r,a)=>a===0?0:1);const n=Math.min(e,t);return n===1?Array.from({length:t},(r,a)=>a===0?1:0):Array.from({length:t},(r,a)=>a>=1&&a+1<=n?1:0)},U1=e=>{const t=["_"],n=[0];for(const r of e.leadingPunctuations)t.push(r),n.push(0);for(const r of e.accentPhrases){const a=P1(r.accentNucleus,r.moras.length);for(let s=0;s<r.moras.length;s++){const i=a[s];for(const o of Rg(r.moras[s]))t.push(o),n.push(i)}for(const s of r.punctuations)t.push(s),n.push(0)}if(t.push("_"),n.push(0),t.length!==n.length)throw new Error(`phone_tone invariant broken: phones.length(${t.length}) !== tones.length(${n.length})`);return{phones:t,tones:n}},L1=new Set(["!","?","…",",",".","'","-"]),V1=e=>e.phones.length===1&&L1.has(e.phones[0]),q1=e=>e.map(t=>V1(t)?t.phones[0]:t.surface).join(""),nt=(e,t)=>{if(e===null||typeof e!="object"||Array.isArray(e))throw new Error(`${t} がオブジェクトでない`);return e},Ve=(e,t)=>{if(typeof e!="string")throw new Error(`${t} が文字列でない`);return e},un=(e,t)=>e==null?void 0:Ve(e,t),At=(e,t)=>{if(typeof e!="number"||!Number.isFinite(e))throw new Error(`${t} が有限数でない`);return e},Cr=(e,t)=>e==null?void 0:At(e,t),ln=(e,t)=>{if(!Array.isArray(e))throw new Error(`${t} が配列でない`);return e},Dg=(e,t)=>e==null?void 0:ln(e,t).map((n,r)=>Ve(n,`${t}[${r}]`)),kp=(e,t)=>{if(e==null)return;const n=nt(e,t),r={};for(const[a,s]of Object.entries(n))r[a]=At(s,`${t}.${a}`);return r},Sp="hdae/deberta-v2-large-japanese-char-wwm-onnx-int4-rtn-b256",Ep="3c6921bf67ee5f64a285f49df8636c1036b81881",W1="sbv2-web-deberta",F1={model:{path:"model.onnx",expectedBytes:240576205,sha256:"79002e00ea11bb41be2cd0d77e2a2608930cd8b502937101da31739fc6dabf96"},vocab:{path:"vocab.txt",expectedBytes:88151,sha256:"902cbd7e218aaf23a72955533293ceac12fcc4e010ad98c0c14757b94ce7abb6"},cleanRanges:{path:"clean_ranges.json",expectedBytes:585,sha256:"81655f8443715f05e198d1b915f3b0a884e6795008f9a8331c900477159faae2"},meta:{path:"meta.json",expectedBytes:662,sha256:"05d4082e7b47589384587a2585d951b5f56c1c25e478e27f8fd66861e8524c6c"}},G1={model:"model.onnx",vocab:"vocab.txt",cleanRanges:"clean_ranges.json",meta:"meta.json"},Pg=(e,t)=>{try{return JSON.parse(e)}catch(n){throw new Error(`getDeberta: ${t} が JSON として読めない`,{cause:n})}},H1=e=>{const t=nt(Pg(e,"clean_ranges.json"),"clean_ranges"),n=(r,a)=>ln(r,a).map((s,i)=>{const o=ln(s,`${a}[${i}]`);if(o.length!==2)throw new Error(`${a}[${i}] が [start, end] でない`);return[At(o[0],`${a}[${i}][0]`),At(o[1],`${a}[${i}][1]`)]});return{removed:n(t.removed,"clean_ranges.removed"),spaced:n(t.spaced,"clean_ranges.spaced")}},j1=e=>{const t=nt(Pg(e,"meta.json"),"meta"),n=nt(t.special_tokens,"meta.special_tokens"),r=a=>At(nt(n[a],`meta.special_tokens.${a}`).id,`meta.special_tokens.${a}.id`);return{clsId:r("cls"),sepId:r("sep"),unkId:r("unk")}},K1=(e,t,n)=>ci.fromVocabText(e,H1(t),j1(n)),X1=async(e={})=>{const t=await li({repo:Sp,revision:e.revision??Ep}),r=await X_({repo:Sp,revision:t},t===Ep?F1:G1,{cacheName:e.cacheName??W1,onProgress:e.onProgress}),a=new TextDecoder;return{tokenizer:K1(a.decode(r.vocab),a.decode(r.cleanRanges),a.decode(r.meta)),bertOnnxBytes:r.model,revision:t}},Tp=[147,78,85,77,80,89],Y1=e=>{for(let E=0;E<Tp.length;E++)if(e[E]!==Tp[E])throw new Error("npy: マジック '\\x93NUMPY' が一致しない（.npy でない）");const t=e[6],n=new DataView(e.buffer,e.byteOffset,e.byteLength);let r,a;if(t===1)r=n.getUint16(8,!0),a=10;else if(t===2||t===3)r=n.getUint32(8,!0),a=12;else throw new Error(`npy: 未対応バージョン major=${t}`);const s=e.subarray(a,a+r),i=new TextDecoder("latin1").decode(s),o=i.match(/'descr'\s*:\s*'([^']+)'/),l=i.match(/'fortran_order'\s*:\s*(True|False)/),d=i.match(/'shape'\s*:\s*\(([^)]*)\)/);if(!o||!l||!d)throw new Error(`npy: ヘッダを解釈できない: ${JSON.stringify(i)}`);const p=o[1];if(p!=="<f4")throw new Error(`npy: dtype '${p}' は未対応（'<f4' little-endian float32 のみ）`);if(l[1]==="True")throw new Error("npy: fortran_order=True は未対応（C-contiguous のみ）");const h=d[1].split(",").map(E=>E.trim()).filter(E=>E.length>0).map(E=>Number.parseInt(E,10));if(h.length!==2||h.some(E=>!Number.isInteger(E)||E<0))throw new Error(`npy: shape ${JSON.stringify(h)} は 2 次元でない（[rows, cols] を期待）`);const[m,y]=h,w=a+r,_=m*y*4,k=e.byteLength-w;if(k<_)throw new Error(`npy: データ長不足 available=${k} < expected=${_}（shape=${m}x${y}）`);const $=new Float32Array(m*y),b=new DataView(e.buffer,e.byteOffset+w,_);for(let E=0;E<$.length;E++)$[E]=b.getFloat32(E*4,!0);return{rows:m,cols:y,data:$}},Dn=(e,t)=>{let n=0,r=0,a=t;for(;;){if(a>=e.length)throw new Error("aivmx_meta: varint がバッファ末尾で途切れた");const s=e[a];if(a+=1,r+=(s&127)*2**n,(s&128)===0)break;if(n+=7,n>63)throw new Error("aivmx_meta: varint が長すぎる（壊れた protobuf）")}return[r,a]},Ug=(e,t)=>{const[n,r]=Dn(e,t);return[n,r,r+n]},Q1=e=>{const t=Rr(e,"aivm_style_vectors");if(t===void 0)throw new Error("aivmx_meta: metadata_props に 'aivm_style_vectors' が無い（aivmx でない/破損を疑う）");return t$(t)},Z1=e=>{const t=nt(e,"hyper_parameters"),n=nt(t.data,"hyper_parameters.data");return{modelName:un(t.model_name,"hyper_parameters.model_name"),version:un(t.version,"hyper_parameters.version"),samplingRate:At(n.sampling_rate,"hyper_parameters.data.sampling_rate"),nSpeakers:Cr(n.n_speakers,"hyper_parameters.data.n_speakers"),spk2id:kp(n.spk2id,"hyper_parameters.data.spk2id"),numStyles:Cr(n.num_styles,"hyper_parameters.data.num_styles"),style2id:kp(n.style2id,"hyper_parameters.data.style2id"),raw:e}},J1=e=>{const t=Rr(e,"aivm_hyper_parameters");return{hyperParameters:t===void 0?void 0:Z1(Lg(t,"aivm_hyper_parameters")),styleVectorsNpy:Q1(e)}},Lg=(e,t)=>{try{return JSON.parse(e)}catch(n){throw new Error(`aivmx_meta: metadata_props の '${t}' が JSON として読めない`,{cause:n})}},Rr=(e,t)=>{const n=new TextDecoder("utf-8");let r=0;for(;r<e.length;){const[a,s]=Dn(e,r),i=a>>3,o=a&7;if(r=s,o===0)[,r]=Dn(e,r);else if(o===2){const[,l,d]=Ug(e,r);if(i===14){const p=e.subarray(l,d),h=e$(p,n);if(h.key===t)return h.value}r=d}else if(o===5)r+=4;else if(o===1)r+=8;else throw new Error(`aivmx_meta: 未対応 wire type ${o}（field ${i}）`)}},e$=(e,t)=>{let n="",r="",a=0;for(;a<e.length;){const[s,i]=Dn(e,a),o=s>>3,l=s&7;if(a=i,l===2){const[,d,p]=Ug(e,a),h=t.decode(e.subarray(d,p));o===1?n=h:o===2&&(r=h),a=p}else if(l===0)[,a]=Dn(e,a);else throw new Error(`aivmx_meta: StringStringEntry の未対応 wire ${l}`)}return{key:n,value:r}},t$=e=>{const t=atob(e.replace(/\s/g,"")),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n},n$=(e,t)=>{const n=nt(e,t);return{audio:Ve(n.audio,`${t}.audio`),transcript:Ve(n.transcript,`${t}.transcript`)}},r$=(e,t,n)=>{const r=nt(e,t);return{name:Ve(r.name,`${t}.name`),...n?{}:{icon:un(r.icon,`${t}.icon`)},localId:At(r.local_id,`${t}.local_id`),voiceSamples:n?[]:ln(r.voice_samples??[],`${t}.voice_samples`).map((a,s)=>n$(a,`${t}.voice_samples[${s}]`))}},a$=(e,t,n)=>{const r=nt(e,t),a=ln(r.styles,`${t}.styles`);if(a.length===0)throw new Error(`${t}.styles が空（AIVM 1.0 は 1 スタイル以上必須）`);return{name:Ve(r.name,`${t}.name`),...n?{}:{icon:un(r.icon,`${t}.icon`)},supportedLanguages:Dg(r.supported_languages,`${t}.supported_languages`)??[],uuid:Ve(r.uuid,`${t}.uuid`),localId:At(r.local_id,`${t}.local_id`),styles:a.map((s,i)=>r$(s,`${t}.styles[${i}]`,n))}},s$=(e,t={})=>{const n=t.stripAssets??!0,r=nt(e,"manifest"),a=ln(r.speakers,"manifest.speakers");if(a.length===0)throw new Error("manifest.speakers が空（AIVM 1.0 は 1 話者以上必須）");return{manifestVersion:Ve(r.manifest_version,"manifest.manifest_version"),name:Ve(r.name,"manifest.name"),description:un(r.description,"manifest.description"),creators:Dg(r.creators,"manifest.creators"),license:un(r.license,"manifest.license"),modelArchitecture:Ve(r.model_architecture,"manifest.model_architecture"),modelFormat:Ve(r.model_format,"manifest.model_format"),trainingEpochs:Cr(r.training_epochs,"manifest.training_epochs"),trainingSteps:Cr(r.training_steps,"manifest.training_steps"),uuid:Ve(r.uuid,"manifest.uuid"),version:Ve(r.version,"manifest.version"),speakers:a.map((s,i)=>a$(s,`manifest.speakers[${i}]`,n))}},i$=(e,t={})=>{const n=Rr(e,"aivm_manifest");if(n===void 0)throw new Error("aivm_manifest: metadata_props に 'aivm_manifest' が無い（aivmx でない/破損を疑う）");return s$(Lg(n,"aivm_manifest"),t)},Vg=1024,ds=(e,t)=>{const n=new Array(e.length*2+1).fill(t);for(let r=0;r<e.length;r++)n[r*2+1]=e[r];return n},o$=(e,t)=>{if(e.length!==t.length)throw new Error(`phonesTonesToModelIds: phones(${e.length}) と tones(${t.length}) の長さが不一致`);const n=Cb(e),r=t.map(s=>s+Eb),a=n.map(()=>Tb);return{phoneIds:ds(n,0),toneIds:ds(r,0),languageIds:ds(a,0)}},u$=e=>{if(e.length===0)throw new Error("addBlankWord2ph: base word2ph が空（両端 [1] 番兵が欠落）");const t=e.map(n=>n*2);return t[0]+=1,t},l$=(e,t,n)=>{if(t<=0||e.length%t!==0)throw new Error(`tileBertToPhoneLevel: hidden 長 ${e.length} が seqLen ${t} で割り切れない（矩形でない）`);const r=e.length/t;if(n.length!==t)throw new Error(`tileBertToPhoneLevel: DeBERTa トークン数 ${t} != word2ph 長 ${n.length}（文字トークナイズと word2ph の齟齬を疑う）`);let a=0;for(const o of n)a+=o;const s=new Float32Array(r*a);let i=0;for(let o=0;o<t;o++){const l=n[o],d=o*r;for(let p=0;p<l;p++){const h=i+p;for(let m=0;m<r;m++)s[m*a+h]=e[d+m]}i+=l}return{data:s,length:a}},d$=(e,t,n)=>{const{rows:r,cols:a,data:s}=e;if(a!==256)throw new Error(`styleVector: style 行列の列数が 256 でない: ${a}`);if(!(Number.isInteger(t)&&t>=0&&t<r))throw new Error(`styleVector: styleId ${t} が範囲外（0..${r-1} の整数を期待）`);if(!Number.isFinite(n))throw new Error(`styleVector: weight が有限数でない: ${n}`);const i=new Float32Array(a);for(let d=0;d<r;d++){const p=d*a;for(let h=0;h<a;h++)i[h]+=s[p+h]}for(let d=0;d<a;d++)i[d]/=r;const o=t*a,l=new Float32Array(a);for(let d=0;d<a;d++)l[d]=i[d]+(s[o+d]-i[d])*n;return l},c$=e=>{const t=Y1(e);if(t.cols!==256)throw new Error(`style_vectors の shape が想定外: [${t.rows}, ${t.cols}]（[N, 256] を期待）`);return t},p$={lengthScale:1,sdpRatio:.2,noiseScale:.6,noiseScaleW:.8},Ip=(e,t)=>{const n={...e,...t};for(const[r,a]of Object.entries(n))if(!Number.isFinite(a))throw new Error(`mergeScalars: ${r} が有限数でない: ${a}`);return n},Ar="output",Cp=(e,t,n)=>{if(!Number.isFinite(e)||e<=0)throw new Error(`silence: sampleRate が不正: ${e}`);if(!Number.isFinite(t)||t<0)throw new Error(`silence: ${n} が不正（0 以上の有限秒数を期待): ${t}`);return Math.round(e*t)},h$=(e,t,n)=>{const r=Cp(t,n.preSec??0,"preSec"),a=Cp(t,n.postSec??0,"postSec");if(r===0&&a===0)return e;const s=new Float32Array(r+e.length+a);return s.set(e,r),s};class Br{#e;#t;#n;#r=null;#a=new Set;constructor(t){this.#e=t.backend,this.#t=t.session,this.#n=t.session.inputNames,this.tokenizer=t.tokenizer}static async create(t,n){const r=await t.createSession(n.bertOnnxBytes,n.sessionOptions);return new Br({backend:t,session:r,tokenizer:n.tokenizer})}get isReleased(){return this.#r!==null}extract(t,n,r){if(this.#r!==null)throw new Error("DebertaExtractor: release() 後に extract が呼ばれた");return this.#u(this.#i(t,n,r))}async#i(t,n,r){const a=u$(n),s=this.tokenizer.encode(t),i=s.length,o=this.#e.int64(BigInt64Array.from(s,BigInt),[1,i]),l=this.#e.int64(BigInt64Array.from(new Array(i).fill(1),BigInt),[1,i]),d={};for(const k of this.#n)if(k==="input_ids")d[k]=o;else if(k==="attention_mask")d[k]=l;else throw new Error(`DebertaExtractor: DeBERTa の想定外入力 '${k}'（input_ids/attention_mask のみ対応）`);const h=(await this.#t.run(d,[Ar]))[Ar],m=h.dims;if(m.length!==2||m[1]!==Vg)throw new Error(`DebertaExtractor: DeBERTa 出力 shape が想定外 [${m.join(",")}]（[seq_len, 1024] を期待）`);if(h.type!=="float32")throw new Error(`DebertaExtractor: DeBERTa 出力 dtype が想定外 '${h.type}'（float32 を期待）`);const y=h.data;if(m[0]!==a.length)throw new Error(`DebertaExtractor: DeBERTa トークン数 ${m[0]} != word2ph 長 ${a.length}（bertText=${JSON.stringify(t)}）。文字トークナイズと word2ph の齟齬を疑う。`);const{data:w,length:_}=l$(y,m[0],a);if(_!==r)throw new Error(`DebertaExtractor: bert 展開長 ${_} != 音素列長 ${r}（word2ph 調整と add_blank の齟齬）`);return w}async#u(t){this.#a.add(t);try{return await t}finally{this.#a.delete(t)}}release(){return this.#r??=this.#s(),this.#r}async#s(){for(;this.#a.size>0;)await Promise.allSettled([...this.#a]);await this.#t.release()}}const f$=e=>{if(e.deberta!==void 0){if(e.bertOnnxBytes!==void 0||e.tokenizer!==void 0)throw new Error("Sbv2Adapter: deberta と bertOnnxBytes/tokenizer は同時指定できない（BERT セッションの所有者が曖昧になる）");if(e.deberta.isReleased)throw new Error("Sbv2Adapter: release() 済みの DebertaExtractor は使えない");return{kind:"shared",deberta:e.deberta}}if(e.bertOnnxBytes===void 0||e.tokenizer===void 0)throw new Error("Sbv2Adapter: BERT の供給が必要（bertOnnxBytes + tokenizer、または生成済みの deberta）");return{kind:"own",bertOnnxBytes:e.bertOnnxBytes,tokenizer:e.tokenizer}};class Pn{constructor(t){this.needsBert=!0,this.#l=null,this.#o=new Set,this.#e=t.backend,this.#t=t.acoustic,this.#n=t.acoustic.inputNames,this.#r=t.deberta,this.#a=t.ownsDeberta,this.#i=t.styleMatrix,this.sampleRate=t.sampleRate,this.#u=t.scalars,this.#s=t.hyperParameters}get numStyles(){return this.#i.rows}get hyperParameters(){return this.#s}get numSpeakers(){return this.#s?.nSpeakers}get spk2id(){return this.#s?.spk2id}#e;#t;#n;#r;#a;#i;#u;#s;#l;#o;static async fromOnnx(t,n){const r=f$(n),a=c$(n.styleVectorsNpy),s=await t.createSession(n.acousticOnnxBytes,n.sessionOptions);let i;if(r.kind==="own")try{i=await Br.create(t,{bertOnnxBytes:r.bertOnnxBytes,tokenizer:r.tokenizer,sessionOptions:n.sessionOptions})}catch(o){throw await s.release().catch(()=>{}),o}else i=r.deberta;return new Pn({backend:t,acoustic:s,deberta:i,ownsDeberta:r.kind==="own",styleMatrix:a,sampleRate:n.sampleRate,scalars:Ip(p$,n.scalars),hyperParameters:n.hyperParameters})}static async fromAivmx(t,n){const{aivmxBytes:r,metadata:a,sampleRate:s,scalars:i,sessionOptions:o,...l}=n,d=a??J1(r),p=s??d.hyperParameters?.samplingRate;if(p===void 0)throw new Error("Sbv2Adapter: sampleRate を決められない（aivmx に aivm_hyper_parameters が無い。sampleRate を明示指定するか、hyper_parameters 入りの aivmx を使う）");return await Pn.fromOnnx(t,{...l,acousticOnnxBytes:r,styleVectorsNpy:d.styleVectorsNpy,sampleRate:p,scalars:i,hyperParameters:d.hyperParameters,sessionOptions:o})}#d(t){if(this.#l!==null)throw new Error(`Sbv2Adapter: release() 後に ${t} が呼ばれた`)}async#c(t){this.#o.add(t);try{return await t}finally{this.#o.delete(t)}}buildAcousticFeeds(t){return this.#d("buildAcousticFeeds"),this.#c(this.#p(t))}async#p(t){const{phoneIds:n,toneIds:r,languageIds:a}=o$(t.phones,t.tones),s=n.length,i=await this.#r.extract(t.bertText,t.baseWord2ph,s),o=d$(this.#i,t.styleId,t.styleWeight);return{xTst:BigInt64Array.from(n,BigInt),xTstLengths:BigInt64Array.from([s],BigInt),sid:BigInt64Array.from([t.speakerId],BigInt),tones:BigInt64Array.from(r,BigInt),language:BigInt64Array.from(a,BigInt),bert:i,styleVec:o,seqLen:s,scalars:Ip(this.#u,t.scalars)}}synthesize(t){return this.#d("synthesize"),this.#c(this.#h(t))}async#h(t){const n=await this.#p(t),r=n.seqLen,a={x_tst:this.#e.int64(n.xTst,[1,r]),x_tst_lengths:this.#e.int64(n.xTstLengths,[1]),sid:this.#e.int64(n.sid,[1]),tones:this.#e.int64(n.tones,[1,r]),language:this.#e.int64(n.language,[1,r]),bert:this.#e.float32(n.bert,[1,Vg,r]),style_vec:this.#e.float32(n.styleVec,[1,256]),length_scale:this.#e.float32(Float32Array.from([n.scalars.lengthScale]),[]),sdp_ratio:this.#e.float32(Float32Array.from([n.scalars.sdpRatio]),[]),noise_scale:this.#e.float32(Float32Array.from([n.scalars.noiseScale]),[]),noise_scale_w:this.#e.float32(Float32Array.from([n.scalars.noiseScaleW]),[])},s={},i=[];for(const d of this.#n){const p=a[d];p===void 0?i.push(d):s[d]=p}if(i.length>0)throw new Error(`Sbv2Adapter: aivmx 入力名 ${JSON.stringify(i)} に対応テンソルが無い（グラフ入力=${JSON.stringify(this.#n)}）`);const l=(await this.#t.run(s,[Ar]))[Ar];if(l.type!=="float32")throw new Error(`Sbv2Adapter: 音響出力 dtype が想定外 '${l.type}'（float32 を期待）`);return l.data}release(){return this.#l??=this.#f(),this.#l}async#f(){for(;this.#o.size>0;)await Promise.allSettled([...this.#o]);const t=[this.#t.release()];this.#a&&t.push(this.#r.release());const r=(await Promise.allSettled(t)).find(a=>a.status==="rejected");if(r!==void 0)throw r.reason}}const m$=async(e,t,n,r,a={})=>{const{result:s,words:i}=D1(t,e,a.overlay),{phones:o,tones:l}=U1(s),d=q1(i),p=kb(i,n,o.length),h=await r.synthesize({phones:o,tones:l,bertText:d,baseWord2ph:p,styleId:a.styleId??0,styleWeight:a.styleWeight??1,speakerId:a.speakerId??0,scalars:a.scalars});return h$(h,r.sampleRate,{preSec:a.preSilenceSec,postSec:a.postSilenceSec})},g$=(e,t)=>{const n=e.length,r=2,a=n*r,s=new ArrayBuffer(44+a),i=new DataView(s),o=(l,d)=>{for(let p=0;p<d.length;p++)i.setUint8(l+p,d.charCodeAt(p))};o(0,"RIFF"),i.setUint32(4,36+a,!0),o(8,"WAVE"),o(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,t,!0),i.setUint32(28,t*r,!0),i.setUint16(32,r,!0),i.setUint16(34,16,!0),o(36,"data"),i.setUint32(40,a,!0);for(let l=0;l<n;l++){const d=Math.max(-1,Math.min(1,e[l]));i.setInt16(44+l*r,Math.round(d*32767),!0)}return new Uint8Array(s)},cs={int64:(e,t)=>new Ge("int64",e,t),float32:(e,t)=>new Ge("float32",e,t),createSession:(e,t)=>Ms.create(e,t)};class y${static createFromAivmx(t){return Pn.fromAivmx(cs,t)}static createFromOnnx(t){return Pn.fromOnnx(cs,t)}static createDeberta(t){return Br.create(cs,t)}}class Bn{constructor(){this._vector=new Float32Array,this._position=0,this._frameCount=0}get vector(){return this._vector}get position(){return this._position}get startIndex(){return this._position*2}get frameCount(){return this._frameCount}get endIndex(){return(this._position+this._frameCount)*2}clear(){this._vector.fill(0),this._position=0,this._frameCount=0}put(t){this._frameCount+=t}putSamples(t,n,r=0){n=n||0;const a=n*2;r>=0||(r=(t.length-a)/2);const s=r*2;this.ensureCapacity(r+this._frameCount);const i=this.endIndex;this.vector.set(t.subarray(a,a+s),i),this._frameCount+=r}putBuffer(t,n,r=0){n=n||0,r>=0||(r=t.frameCount-n),this.putSamples(t.vector,t.position+n,r)}receive(t){(!(t>=0)||t>this._frameCount)&&(t=this.frameCount),this._frameCount-=t,this._position+=t}receiveSamples(t,n=0){const r=n*2,a=this.startIndex;t.set(this._vector.subarray(a,a+r)),this.receive(n)}extract(t,n=0,r=0){const a=this.startIndex+n*2,s=r*2;t.set(this._vector.subarray(a,a+s))}ensureCapacity(t=0){const n=parseInt(t*2);if(this._vector.length<n){const r=new Float32Array(n);r.set(this._vector.subarray(this.startIndex,this.endIndex)),this._vector=r,this._position=0}else this.rewind()}ensureAdditionalCapacity(t=0){this.ensureCapacity(this._frameCount+t)}rewind(){this._position>0&&(this._vector.set(this._vector.subarray(this.startIndex,this.endIndex)),this._position=0)}}class qg{constructor(t){t?(this._inputBuffer=new Bn,this._outputBuffer=new Bn):this._inputBuffer=this._outputBuffer=null}get inputBuffer(){return this._inputBuffer}set inputBuffer(t){this._inputBuffer=t}get outputBuffer(){return this._outputBuffer}set outputBuffer(t){this._outputBuffer=t}clear(){this._inputBuffer.clear(),this._outputBuffer.clear()}}class pi extends qg{constructor(t){super(t),this.reset(),this._rate=1}set rate(t){this._rate=t}reset(){this.slopeCount=0,this.prevSampleL=0,this.prevSampleR=0}clear(){super.clear(),this.reset()}clone(){const t=new pi;return t.rate=this._rate,t}process(){const t=this._inputBuffer.frameCount;this._outputBuffer.ensureAdditionalCapacity(t/this._rate+1);const n=this.transpose(t);this._inputBuffer.receive(),this._outputBuffer.put(n)}transpose(t=0){if(t===0)return 0;const n=this._inputBuffer.vector,r=this._inputBuffer.startIndex,a=this._outputBuffer.vector,s=this._outputBuffer.endIndex;let i=0,o=0;for(;this.slopeCount<1;)a[s+2*o]=(1-this.slopeCount)*this.prevSampleL+this.slopeCount*n[r],a[s+2*o+1]=(1-this.slopeCount)*this.prevSampleR+this.slopeCount*n[r+1],o=o+1,this.slopeCount+=this._rate;if(this.slopeCount-=1,t!==1)e:for(;;){for(;this.slopeCount>1;)if(this.slopeCount-=1,i=i+1,i>=t-1)break e;const l=r+2*i;a[s+2*o]=(1-this.slopeCount)*n[l]+this.slopeCount*n[l+2],a[s+2*o+1]=(1-this.slopeCount)*n[l+1]+this.slopeCount*n[l+3],o=o+1,this.slopeCount+=this._rate}return this.prevSampleL=n[r+2*t-2],this.prevSampleR=n[r+2*t-1],o}}class w${constructor(t){this._pipe=t}get pipe(){return this._pipe}get inputBuffer(){return this._pipe.inputBuffer}get outputBuffer(){return this._pipe.outputBuffer}fillInputBuffer(){throw new Error("fillInputBuffer() not overridden")}fillOutputBuffer(t=0){for(;this.outputBuffer.frameCount<t;){const n=16384-this.inputBuffer.frameCount;if(this.fillInputBuffer(n),this.inputBuffer.frameCount<8192*2)break;this._pipe.process()}}clear(){this._pipe.clear()}}const _$=function(){};class b$ extends w${constructor(t,n,r=_$){super(n),this.callback=r,this.sourceSound=t,this.historyBufferSize=22050,this._sourcePosition=0,this.outputBufferPosition=0,this._position=0}get position(){return this._position}set position(t){if(t>this._position)throw new RangeError("New position may not be greater than current position");const n=this.outputBufferPosition-(this._position-t);if(n<0)throw new RangeError("New position falls outside of history buffer");this.outputBufferPosition=n,this._position=t}get sourcePosition(){return this._sourcePosition}set sourcePosition(t){this.clear(),this._sourcePosition=t}onEnd(){this.callback()}fillInputBuffer(t=0){const n=new Float32Array(t*2),r=this.sourceSound.extract(n,t,this._sourcePosition);this._sourcePosition+=r,this.inputBuffer.putSamples(n,0,r)}extract(t,n=0){this.fillOutputBuffer(this.outputBufferPosition+n);const r=Math.min(n,this.outputBuffer.frameCount-this.outputBufferPosition);this.outputBuffer.extract(t,this.outputBufferPosition,r);const a=this.outputBufferPosition+r;return this.outputBufferPosition=Math.min(this.historyBufferSize,a),this.outputBuffer.receive(Math.max(a-this.historyBufferSize,0)),this._position+=r,r}handleSampleData(t){this.extract(t.data,4096)}clear(){super.clear(),this.outputBufferPosition=0}}const v$=0,$$=v$,x$=0,k$=x$,S$=8,Ap=[[124,186,248,310,372,434,496,558,620,682,744,806,868,930,992,1054,1116,1178,1240,1302,1364,1426,1488,0],[-100,-75,-50,-25,25,50,75,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[-20,-15,-10,-5,5,10,15,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[-4,-3,-2,-1,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],Nr=.25,Wg=4,hi=125,Fg=50,Gg=(Fg-hi)/(Wg-Nr),E$=hi-Gg*Nr,fi=25,Hg=15,jg=(Hg-fi)/(Wg-Nr),T$=fi-jg*Nr;class mi extends qg{constructor(t){super(t),this._quickSeek=!0,this.midBufferDirty=!1,this.midBuffer=null,this.overlapLength=0,this.autoSeqSetting=!0,this.autoSeekSetting=!0,this._tempo=1,this.setParameters(44100,$$,k$,S$)}clear(){super.clear(),this.clearMidBuffer()}clearMidBuffer(){this.midBufferDirty=!1,this.midBuffer=null,this.refMidBuffer&&this.refMidBuffer.fill(0),this.skipFract=0}setParameters(t,n,r,a){t>0&&(this.sampleRate=t),a>0&&(this.overlapMs=a),n>0?(this.sequenceMs=n,this.autoSeqSetting=!1):this.autoSeqSetting=!0,r>0?(this.seekWindowMs=r,this.autoSeekSetting=!1):this.autoSeekSetting=!0,this.calculateSequenceParameters(),this.calculateOverlapLength(this.overlapMs),this.tempo=this._tempo}set tempo(t){let n;this._tempo=t,this.calculateSequenceParameters(),this.nominalSkip=this._tempo*(this.seekWindowLength-this.overlapLength),this.skipFract=0,n=Math.floor(this.nominalSkip+.5),this.sampleReq=Math.max(n+this.overlapLength,this.seekWindowLength)+this.seekLength}get tempo(){return this._tempo}get inputChunkSize(){return this.sampleReq}get outputChunkSize(){return this.overlapLength+Math.max(0,this.seekWindowLength-2*this.overlapLength)}calculateOverlapLength(t=0){let n;n=this.sampleRate*t/1e3,n=n<16?16:n,n-=n%8,this.overlapLength=n,this.refMidBuffer=new Float32Array(this.overlapLength*2),this.midBuffer=new Float32Array(this.overlapLength*2)}checkLimits(t,n,r){return t<n?n:t>r?r:t}calculateSequenceParameters(){let t,n;this.autoSeqSetting&&(t=E$+Gg*this._tempo,t=this.checkLimits(t,Fg,hi),this.sequenceMs=Math.floor(t+.5)),this.autoSeekSetting&&(n=T$+jg*this._tempo,n=this.checkLimits(n,Hg,fi),this.seekWindowMs=Math.floor(n+.5)),this.seekWindowLength=Math.floor(this.sampleRate*this.sequenceMs/1e3),this.seekLength=Math.floor(this.sampleRate*this.seekWindowMs/1e3)}set quickSeek(t){this._quickSeek=t}clone(){const t=new mi;return t.tempo=this._tempo,t.setParameters(this.sampleRate,this.sequenceMs,this.seekWindowMs,this.overlapMs),t}seekBestOverlapPosition(){return this._quickSeek?this.seekBestOverlapPositionStereoQuick():this.seekBestOverlapPositionStereo()}seekBestOverlapPositionStereo(){let t,n,r,a=0;for(this.preCalculateCorrelationReferenceStereo(),t=0,n=Number.MIN_VALUE;a<this.seekLength;a=a+1)r=this.calculateCrossCorrelationStereo(2*a,this.refMidBuffer),r>n&&(n=r,t=a);return t}seekBestOverlapPositionStereoQuick(){let t,n,r,a=0,s,i;for(this.preCalculateCorrelationReferenceStereo(),n=Number.MIN_VALUE,t=0,s=0,i=0;a<4;a=a+1){let o=0;for(;Ap[a][o]&&(i=s+Ap[a][o],!(i>=this.seekLength));)r=this.calculateCrossCorrelationStereo(2*i,this.refMidBuffer),r>n&&(n=r,t=i),o=o+1;s=t}return t}preCalculateCorrelationReferenceStereo(){let t=0,n,r;for(;t<this.overlapLength;t=t+1)r=t*(this.overlapLength-t),n=t*2,this.refMidBuffer[n]=this.midBuffer[n]*r,this.refMidBuffer[n+1]=this.midBuffer[n+1]*r}calculateCrossCorrelationStereo(t,n){const r=this._inputBuffer.vector;t+=this._inputBuffer.startIndex;let a=0,s=2;const i=2*this.overlapLength;let o;for(;s<i;s=s+2)o=s+t,a+=r[o]*n[s]+r[o+1]*n[s+1];return a}overlap(t){this.overlapStereo(2*t)}overlapStereo(t){const n=this._inputBuffer.vector;t+=this._inputBuffer.startIndex;const r=this._outputBuffer.vector,a=this._outputBuffer.endIndex;let s=0,i,o;const l=1/this.overlapLength;let d,p,h;for(;s<this.overlapLength;s=s+1)o=(this.overlapLength-s)*l,d=s*l,i=2*s,p=i+t,h=i+a,r[h+0]=n[p+0]*d+this.midBuffer[i+0]*o,r[h+1]=n[p+1]*d+this.midBuffer[i+1]*o}process(){let t,n,r;if(this.midBuffer===null){if(this._inputBuffer.frameCount<this.overlapLength)return;this.midBuffer=new Float32Array(this.overlapLength*2),this._inputBuffer.receiveSamples(this.midBuffer,this.overlapLength)}for(;this._inputBuffer.frameCount>=this.sampleReq;){t=this.seekBestOverlapPosition(),this._outputBuffer.ensureAdditionalCapacity(this.overlapLength),this.overlap(Math.floor(t)),this._outputBuffer.put(this.overlapLength),n=this.seekWindowLength-2*this.overlapLength,n>0&&this._outputBuffer.putBuffer(this._inputBuffer,t+this.overlapLength,n);const a=this._inputBuffer.startIndex+2*(t+this.seekWindowLength-this.overlapLength);this.midBuffer.set(this._inputBuffer.vector.subarray(a,a+2*this.overlapLength)),this.skipFract+=this.nominalSkip,r=Math.floor(this.skipFract),this.skipFract-=r,this._inputBuffer.receive(r)}}}const zp=function(e,t){return(e>t?e-t:t-e)>1e-10};class gi{constructor(){this.transposer=new pi(!1),this.stretch=new mi(!1),this._inputBuffer=new Bn,this._intermediateBuffer=new Bn,this._outputBuffer=new Bn,this._rate=0,this._tempo=0,this.virtualPitch=1,this.virtualRate=1,this.virtualTempo=1,this.calculateEffectiveRateAndTempo()}clear(){this.transposer.clear(),this.stretch.clear()}clone(){const t=new gi;return t.rate=this.rate,t.tempo=this.tempo,t}get rate(){return this._rate}set rate(t){this.virtualRate=t,this.calculateEffectiveRateAndTempo()}set rateChange(t){this._rate=1+.01*t}get tempo(){return this._tempo}set tempo(t){this.virtualTempo=t,this.calculateEffectiveRateAndTempo()}set tempoChange(t){this.tempo=1+.01*t}set pitch(t){this.virtualPitch=t,this.calculateEffectiveRateAndTempo()}set pitchOctaves(t){this.pitch=Math.exp(.69314718056*t),this.calculateEffectiveRateAndTempo()}set pitchSemitones(t){this.pitchOctaves=t/12}get inputBuffer(){return this._inputBuffer}get outputBuffer(){return this._outputBuffer}calculateEffectiveRateAndTempo(){const t=this._tempo,n=this._rate;this._tempo=this.virtualTempo/this.virtualPitch,this._rate=this.virtualRate*this.virtualPitch,zp(this._tempo,t)&&(this.stretch.tempo=this._tempo),zp(this._rate,n)&&(this.transposer.rate=this._rate),this._rate>1?this._outputBuffer!=this.transposer.outputBuffer&&(this.stretch.inputBuffer=this._inputBuffer,this.stretch.outputBuffer=this._intermediateBuffer,this.transposer.inputBuffer=this._intermediateBuffer,this.transposer.outputBuffer=this._outputBuffer):this._outputBuffer!=this.stretch.outputBuffer&&(this.transposer.inputBuffer=this._inputBuffer,this.transposer.outputBuffer=this._intermediateBuffer,this.stretch.inputBuffer=this._intermediateBuffer,this.stretch.outputBuffer=this._outputBuffer)}process(){this._rate>1?(this.stretch.process(),this.transposer.process()):(this.transposer.process(),this.stretch.process())}}class I${constructor(t){this.samples=t}samples;extract(t,n=0,r=0){const a=Math.max(0,Math.min(n,this.samples.length-r));for(let s=0;s<a;s++){const i=this.samples[r+s];t[s*2]=i,t[s*2+1]=i}return a}}function C$(e,t,n){if(n===1||e.length===0)return e;const r=new Float32Array(e.length+t);r.set(e);const a=new gi;a.pitch=n,t!==44100&&a.stretch.setParameters(t,0,0,8);const s=new b$(new I$(r),a),i=[],o=new Float32Array(4096*2);let l=0;const d=Math.ceil(e.length*2/4096)+16;for(let y=0;y<d&&l<e.length;y++){const w=s.extract(o,4096);if(w===0)break;const _=new Float32Array(w);for(let k=0;k<w;k++)_[k]=o[k*2];i.push(_),l+=w}const p=Math.min(l,e.length),h=new Float32Array(p);let m=0;for(const y of i){const w=Math.min(y.length,p-m);if(w<=0)break;h.set(y.subarray(0,w),m),m+=w}return h}let lt=null,Un=null,zr=null;const Kg=async()=>{await lt?.release(),lt=null,Un=null,zr=null},A$=async(e,t)=>{const n=await fetch(e);if(!n.ok)throw new Error(`音響モデルの取得に失敗しました (HTTP ${n.status}): ${e}`);const r=Number(n.headers.get("content-length"))||void 0;if(!n.body){const d=await n.arrayBuffer();return t?.({stage:"acoustic-download",loaded:d.byteLength,total:r}),new Uint8Array(d)}const a=n.body.getReader(),s=[];let i=0;for(;;){const{done:d,value:p}=await a.read();if(d)break;s.push(p),i+=p.byteLength,t?.({stage:"acoustic-download",loaded:i,total:r})}const o=new Uint8Array(i);let l=0;for(const d of s)o.set(d,l),l+=d.byteLength;return o},z$=async(e,t)=>{const n=performance.now();await Kg(),be.wasm.wasmPaths=e.ortWasmBaseUrl,e.provider==="webgpu"&&await import("./ort.webgpu.bundle.min-DN3xwqwH.js");const r=await A$(e.aivmxUrl,t);t?.({stage:"deberta",loaded:0,total:void 0});const a=await X1({onProgress:o=>{o.path==="model.onnx"&&t?.({stage:"deberta",loaded:o.loaded,total:o.total})}});Un=a.tokenizer;const s=a.bertOnnxBytes;t?.({stage:"dictionary"}),zr=await $b(),t?.({stage:"acoustic"});const i=Rr(r,"aivm_manifest")===void 0?void 0:i$(r,{stripAssets:!1});return lt=await y$.createFromAivmx({aivmxBytes:r,bertOnnxBytes:s,tokenizer:Un,sessionOptions:{executionProviders:[e.provider]}}),{provider:e.provider,elapsedMs:Math.round(performance.now()-n),sampleRate:lt.sampleRate,numStyles:lt.numStyles,manifest:i}},O$=async e=>{if(!lt||!Un||!zr)throw new Error("モデルが読み込まれていません。");const t=performance.now(),n=await m$(e.text,zr,Un,lt,{styleId:e.styleId,styleWeight:e.styleWeight,speakerId:e.speakerId}),r=e.pitch!==void 0&&e.pitch!==1?C$(n,lt.sampleRate,e.pitch):n;return{wavBytes:g$(r,lt.sampleRate),elapsedMs:Math.round(performance.now()-t),samples:r.length,sampleRate:lt.sampleRate}};var R$=Object.freeze({__proto__:null,load:z$,release:Kg,synthesize:O$});Rs(R$);
