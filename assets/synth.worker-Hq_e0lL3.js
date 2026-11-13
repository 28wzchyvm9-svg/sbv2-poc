const xp=Symbol("Comlink.proxy"),q0=Symbol("Comlink.endpoint"),W0=Symbol("Comlink.releaseProxy"),rr=Symbol("Comlink.finalizer"),ha=Symbol("Comlink.thrown"),kp=e=>typeof e=="object"&&e!==null||typeof e=="function",F0={canHandle:e=>kp(e)&&e[xp],serialize(e){const{port1:t,port2:n}=new MessageChannel;return zi(e,t),[n,[n]]},deserialize(e){return e.start(),K0(e)}},G0={canHandle:e=>kp(e)&&ha in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},Sp=new Map([["proxy",F0],["throw",G0]]);function H0(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function zi(e,t=globalThis,n=["*"]){t.addEventListener("message",function a(r){if(!r||!r.data)return;if(!H0(n,r.origin)){console.warn(`Invalid origin '${r.origin}' for comlink proxy`);return}const{id:i,type:s,path:o}=Object.assign({path:[]},r.data),l=(r.data.argumentList||[]).map(Lt);let d;try{const p=o.slice(0,-1).reduce((m,y)=>m[y],e),f=o.reduce((m,y)=>m[y],e);switch(s){case"GET":d=f;break;case"SET":p[o.slice(-1)[0]]=Lt(r.data.value),d=!0;break;case"APPLY":d=f.apply(p,l);break;case"CONSTRUCT":{const m=new f(...l);d=Q0(m)}break;case"ENDPOINT":{const{port1:m,port2:y}=new MessageChannel;zi(e,y),d=J0(m,[m])}break;case"RELEASE":d=void 0;break;default:return}}catch(p){d={value:p,[ha]:0}}Promise.resolve(d).catch(p=>({value:p,[ha]:0})).then(p=>{const[f,m]=_a(p);t.postMessage(Object.assign(Object.assign({},f),{id:i}),m),s==="RELEASE"&&(t.removeEventListener("message",a),Tp(t),rr in e&&typeof e[rr]=="function"&&e[rr]())}).catch(p=>{const[f,m]=_a({value:new TypeError("Unserializable return value"),[ha]:0});t.postMessage(Object.assign(Object.assign({},f),{id:i}),m)})}),t.start&&t.start()}function j0(e){return e.constructor.name==="MessagePort"}function Tp(e){j0(e)&&e.close()}function K0(e,t){const n=new Map;return e.addEventListener("message",function(r){const{data:i}=r;if(!i||!i.id)return;const s=n.get(i.id);if(s)try{s(i)}finally{n.delete(i.id)}}),di(e,n,[],t)}function Qn(e){if(e)throw new Error("Proxy has been released and is not useable")}function Ep(e){return nn(e,new Map,{type:"RELEASE"}).then(()=>{Tp(e)})}const ya=new WeakMap,wa="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(ya.get(e)||0)-1;ya.set(e,t),t===0&&Ep(e)});function X0(e,t){const n=(ya.get(t)||0)+1;ya.set(t,n),wa&&wa.register(e,t,e)}function Y0(e){wa&&wa.unregister(e)}function di(e,t,n=[],a=function(){}){let r=!1;const i=new Proxy(a,{get(s,o){if(Qn(r),o===W0)return()=>{Y0(i),Ep(e),t.clear(),r=!0};if(o==="then"){if(n.length===0)return{then:()=>i};const l=nn(e,t,{type:"GET",path:n.map(d=>d.toString())}).then(Lt);return l.then.bind(l)}return di(e,t,[...n,o])},set(s,o,l){Qn(r);const[d,p]=_a(l);return nn(e,t,{type:"SET",path:[...n,o].map(f=>f.toString()),value:d},p).then(Lt)},apply(s,o,l){Qn(r);const d=n[n.length-1];if(d===q0)return nn(e,t,{type:"ENDPOINT"}).then(Lt);if(d==="bind")return di(e,t,n.slice(0,-1));const[p,f]=au(l);return nn(e,t,{type:"APPLY",path:n.map(m=>m.toString()),argumentList:p},f).then(Lt)},construct(s,o){Qn(r);const[l,d]=au(o);return nn(e,t,{type:"CONSTRUCT",path:n.map(p=>p.toString()),argumentList:l},d).then(Lt)}});return X0(i,e),i}function Z0(e){return Array.prototype.concat.apply([],e)}function au(e){const t=e.map(_a);return[t.map(n=>n[0]),Z0(t.map(n=>n[1]))]}const Ip=new WeakMap;function J0(e,t){return Ip.set(e,t),e}function Q0(e){return Object.assign(e,{[xp]:!0})}function _a(e){for(const[t,n]of Sp)if(n.canHandle(e)){const[a,r]=n.serialize(e);return[{type:"HANDLER",name:t,value:a},r]}return[{type:"RAW",value:e},Ip.get(e)||[]]}function Lt(e){switch(e.type){case"HANDLER":return Sp.get(e.name).deserialize(e.value);case"RAW":return e.value}}function nn(e,t,n,a){return new Promise(r=>{const i=ew();t.set(i,r),e.start&&e.start(),e.postMessage(Object.assign({id:i},n),a)})}function ew(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Oi=Object.defineProperty,tw=Object.getOwnPropertyDescriptor,nw=Object.getOwnPropertyNames,aw=Object.prototype.hasOwnProperty,rw=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t)=>()=>(e&&(t=e(e=0)),t),dn=(e,t)=>{for(var n in t)Oi(e,n,{get:t[n],enumerable:!0})},iw=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of nw(t))!aw.call(e,r)&&r!==n&&Oi(e,r,{get:()=>t[r],enumerable:!(a=tw(t,r))||a.enumerable});return e},Nn=e=>iw(Oi({},"__esModule",{value:!0}),e),gn,xt,an,ru,Cp,Ap=L(()=>{gn=new Map,xt=[],an=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=gn.get(e);if(a===void 0)gn.set(e,{backend:t,priority:n});else{if(a.priority>n)return;if(a.priority===n&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let r=xt.indexOf(e);r!==-1&&xt.splice(r,1);for(let i=0;i<xt.length;i++)if(gn.get(xt[i]).priority<=n){xt.splice(i,0,e);return}xt.push(e)}return}throw new TypeError("not a valid backend")},ru=async e=>{let t=gn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return n||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Cp=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),a=n.length===0?xt:n,r,i=[],s=new Set;for(let l of a){let d=await ru(l);typeof d=="string"?i.push({name:l,err:d}):(r||(r=d),r===d&&s.add(l))}if(!r)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of i)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[r,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),sw=L(()=>{Ap()}),zp,ow=L(()=>{zp="1.27.0"}),ir,Ce,Op=L(()=>{ow(),ir="warning",Ce={wasm:{},webgl:{},webgpu:{},versions:{common:zp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ir=e}},get logLevel(){return ir}},Object.defineProperty(Ce,"logLevel",{enumerable:!0})}),be,uw=L(()=>{Op(),be=Ce}),Rp,Np,lw=L(()=>{Rp=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let a=n.getContext("2d");if(a!=null){let r,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=e.dims[2],i=e.dims[3]):(r=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let p=i*r,f=0,m=p,y=p*2,w=-1;s==="RGBA"?(f=0,m=p,y=p*2,w=p*3):s==="RGB"?(f=0,m=p,y=p*2):s==="RBG"&&(f=0,y=p,m=p*2);for(let _=0;_<i;_++)for(let k=0;k<r;k++){let $=(e.data[f++]-d[0])*l[0],b=(e.data[m++]-d[1])*l[1],T=(e.data[y++]-d[2])*l[2],S=w===-1?255:(e.data[w++]-d[3])*l[3];a.fillStyle="rgba("+$+","+b+","+T+","+S+")",a.fillRect(k,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Np=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(n!=null){let r,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=e.dims[2],i=e.dims[1],s=e.dims[3]):(r=e.dims[3],i=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let f=i*r;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,y=0,w=1,_=2,k=3,$=0,b=f,T=f*2,S=-1;o==="RGBA"?($=0,b=f,T=f*2,S=f*3):o==="RGB"?($=0,b=f,T=f*2):o==="RBG"&&($=0,T=f,b=f*2),a=n.createImageData(r,i);for(let I=0;I<i*r;y+=m,w+=m,_+=m,k+=m,I++)a.data[y]=(e.data[$++]-p[0])*d[0],a.data[w]=(e.data[b++]-p[1])*d[1],a.data[_]=(e.data[T++]-p[2])*d[2],a.data[k]=S===-1?255:(e.data[S++]-p[3])*d[3]}else throw new Error("Can not access image data");return a}}),ea,Bp,Mp,Dp,Up,Pp,dw=L(()=>{Ri(),ea=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:a}=t,r=t.norm??{mean:255,bias:0},i,s;typeof r.mean=="number"?i=[r.mean,r.mean,r.mean,r.mean]:i=[r.mean[0],r.mean[1],r.mean[2],r.mean[3]??255],typeof r.bias=="number"?s=[r.bias,r.bias,r.bias,r.bias]:s=[r.bias[0],r.bias[1],r.bias[2],r.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*a,p=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,m=0,y=1,w=2,_=3,k=0,$=d,b=d*2,T=-1;o==="RGB"&&(f=3,m=0,y=1,w=2,_=-1),l==="RGBA"?T=d*3:l==="RBG"?(k=0,b=d,$=d*2):l==="BGR"&&(b=0,$=d,k=d*2);for(let S=0;S<d;S++,m+=f,w+=f,y+=f,_+=f)p[k++]=(e[m]+s[0])/i[0],p[$++]=(e[y]+s[1])/i[1],p[b++]=(e[w]+s[2])/i[2],T!==-1&&_!==-1&&(p[T++]=(e[_]+s[3])/i[3]);return l==="RGBA"?new Le("float32",p,[1,4,n,a]):new Le("float32",p,[1,3,n,a])},Bp=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,r=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(n){let p=l();p.width=e.width,p.height=e.height;let f=d(p);if(f!=null){let m=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=m,o.width=y}else o.tensorFormat="RGBA",o.height=m,o.width=y;f.drawImage(e,0,0),s=f.getImageData(0,0,y,m).data}else throw new Error("Can not access image data")}else if(a){let p,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,f=t.resizedWidth):(p=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=p,o.width=f,t!==void 0){let m=l();m.width=f,m.height=p;let y=d(m);if(y!=null)y.putImageData(e,0,0),s=y.getImageData(0,0,f,p).data;else throw new Error("Can not access image data")}else s=e.data}else if(r){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=l();p.width=e.width,p.height=e.height;let f=d(p);if(f!=null){let m=e.height,y=e.width;return f.drawImage(e,0,0,y,m),s=f.getImageData(0,0,y,m).data,o.height=m,o.width=y,ea(s,o)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,f)=>{let m=l(),y=d(m);if(!e||!y)return f();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{m.width=w.width,m.height=w.height,y.drawImage(w,0,0,m.width,m.height);let _=y.getImageData(0,0,m.width,m.height);o.height=m.height,o.width=m.width,p(ea(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return ea(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Mp=(e,t)=>{let{width:n,height:a,download:r,dispose:i}=t,s=[1,a,n,4];return new Le({location:"texture",type:"float32",texture:e,dims:s,download:r,dispose:i})},Dp=(e,t)=>{let{dataType:n,dims:a,download:r,dispose:i}=t;return new Le({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:a,download:r,dispose:i})},Up=(e,t)=>{let{dataType:n,dims:a,download:r,dispose:i}=t;return new Le({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:a,download:r,dispose:i})},Pp=(e,t,n)=>new Le({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),Vt,In,sr,Lp,cw=L(()=>{Vt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),In=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),sr=!1,Lp=()=>{if(!sr){sr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,a=typeof n<"u"&&n.from;e&&(Vt.set("int64",BigInt64Array),In.set(BigInt64Array,"int64")),t&&(Vt.set("uint64",BigUint64Array),In.set(BigUint64Array,"uint64")),a?(Vt.set("float16",n),In.set(n,"float16")):Vt.set("float16",Uint16Array)}}}),Vp,qp,pw=L(()=>{Ri(),Vp=e=>{let t=1;for(let n=0;n<e.length;n++){let a=e[n];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${n}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${a}`);t*=a}return t},qp=(e,t)=>{switch(e.location){case"cpu":return new Le(e.type,e.data,t);case"cpu-pinned":return new Le({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Le({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Le({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Le({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Le,Ri=L(()=>{lw(),dw(),cw(),pw(),Le=class{constructor(e,t,n){Lp();let a,r;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,r=e.dims,e.location){case"cpu-pinned":{let s=Vt.get(a);if(!s)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint64"&&a!=="int8"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(a=e,o=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Vt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${a} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")a="string",s=e;else if(l==="boolean")a="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",s=Uint8Array.from(e);else{let l=In.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=l,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");r=o,this.cpuData=s,this.dataLocation="cpu"}let i=Vp(r);if(this.cpuData&&i!==this.cpuData.length&&!((a==="uint4"||a==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=r,this.size=i}static async fromImage(e,t){return Bp(e,t)}static fromTexture(e,t){return Mp(e,t)}static fromGpuBuffer(e,t){return Dp(e,t)}static fromMLTensor(e,t){return Up(e,t)}static fromPinnedBuffer(e,t,n){return Pp(e,t,n)}toDataURL(e){return Rp(this,e)}toImageData(e){return Np(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return qp(this,e)}}}),Ge,Wp=L(()=>{Ri(),Ge=Le}),ba,or,dt,tt,Gt,Ht,Fp=L(()=>{Op(),ba=(e,t)=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeStamp(`${e}::ORT::${t}`)},or=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let r=0;r<n.length;r++){if(a&&!n[r].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[r].trim().split(" ")[1]}`;t&&(i+=`::${t}`),ba("CPU",i);return}n[r].includes("TRACE_FUNC")&&(a=!0)}},dt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||or("BEGIN",e)},tt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||or("END",e)},Gt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.time(`ORT::${e}`)},Ht=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeEnd(`ORT::${e}`)}}),Gp,fw=L(()=>{Ap(),Wp(),Fp(),Gp=class Hp{constructor(t){this.handler=t}async run(t,n,a){dt(),Gt("InferenceSession.run");let r={},i={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of n){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);r[d]=null}if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,p=Object.getOwnPropertyNames(n);for(let f of this.outputNames)if(p.indexOf(f)!==-1){let m=n[f];(m===null||m instanceof Ge)&&(d=!0,s=!1,r[f]=m)}if(d){if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)r[d]=null;let o=await this.handler.run(t,r,i),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let p=o[d];p instanceof Ge?l[d]=p:l[d]=new Ge(p.type,p.data,p.dims)}return Ht("InferenceSession.run"),tt(),l}async release(){return this.handler.dispose()}static async create(t,n,a,r){dt(),Gt("InferenceSession.create");let i,s={};if(typeof t=="string"){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,f=0,m=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(m=t.byteLength-f,typeof a=="number"){if(m=a,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||f+m>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-f}].`);if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,f,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await Cp(s),d=await o.createInferenceSessionHandler(i,l);return Ht("InferenceSession.create"),tt(),new Hp(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ni,hw=L(()=>{fw(),Ni=Gp}),mw=L(()=>{}),gw=L(()=>{}),yw=L(()=>{}),ww=L(()=>{}),_w={};dn(_w,{InferenceSession:()=>Ni,TRACE:()=>ba,TRACE_EVENT_BEGIN:()=>Gt,TRACE_EVENT_END:()=>Ht,TRACE_FUNC_BEGIN:()=>dt,TRACE_FUNC_END:()=>tt,Tensor:()=>Ge,env:()=>be,registerBackend:()=>an});var He=L(()=>{sw(),uw(),hw(),Wp(),mw(),gw(),Fp(),yw(),ww()}),Bi=L(()=>{}),jp={};dn(jp,{default:()=>Kp});var ur,lr,Kp,bw=L(()=>{eg(),Yt(),Mi(),ur="ort-wasm-proxy-worker",lr=globalThis.self?.name===ur,lr&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Di(n.wasm).then(()=>{es(n).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})})},a=>{postMessage({type:t,err:a})});break;case"init-ep":{let{epName:a,env:r}=n;ts(r,a).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:a}=n,r=Ea(a);postMessage({type:t,out:r});break}case"create":{let{model:a,options:r}=n;ns(a,r).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":as(n),postMessage({type:t});break;case"run":{let{sessionId:a,inputIndices:r,inputs:i,outputIndices:s,options:o}=n;rs(a,r,i,s,new Array(s.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},ss([...i,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":is(n),postMessage({type:t});break;default:}}catch(a){postMessage({type:t,err:a})}}),Kp=lr?null:e=>new Worker(e??Pe,{type:"module",name:ur})}),Xp={};dn(Xp,{default:()=>Yp});async function iu(e={}){var t=e,n=!!globalThis.window,a=!!globalThis.WorkerGlobalScope,r=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(u,c)=>{u.startsWith("./")&&(u=u.substring(2)),(t.Xc||(t.Xc=new Map)).set(u,c)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let i=u=>async(...c)=>{try{if(t.Yc)throw Error("Session already started");let g=t.Yc={Kd:c[0],errors:[]},h=await u(...c);if(t.Yc!==g)throw Error("Session mismatch");t.dd?.flush();let v=g.errors;if(0<v.length){let E=await Promise.all(v);if(E=E.filter(A=>A),0<E.length)throw Error(E.join(`
`))}return h}finally{t.Yc=null}};t.jsepInit=(u,c)=>{if(u==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=c;let g=t.dd;t.jsepRegisterBuffer=(h,v,E,A)=>g.registerBuffer(h,v,E,A),t.jsepGetBuffer=h=>g.getBuffer(h),t.jsepCreateDownloader=(h,v,E)=>g.createDownloader(h,v,E),t.jsepOnCreateSession=h=>{g.onCreateSession(h)},t.jsepOnReleaseSession=h=>{g.onReleaseSession(h)},t.jsepOnRunStart=h=>g.onRunStart(h),t.Id=(h,v)=>{g.upload(h,v)}}else if(u==="webnn"){let g=c[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=h=>g.onRunStart(h),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=h=>{g.onReleaseSession(h)},t.webnnCreateMLTensorDownloader=(h,v)=>g.createMLTensorDownloader(h,v),t.webnnRegisterMLTensor=(h,v,E,A)=>g.registerMLTensor(h,v,E,A),t.webnnCreateMLContext=h=>g.createMLContext(h),t.webnnRegisterMLConstant=(h,v,E,A,N,V)=>g.registerMLConstant(h,v,E,A,N,t.Xc,V),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let s=()=>{let u=c=>(...g)=>{let h=it;return g=c(...g),it!=h?new Promise((v,E)=>{Ga={resolve:v,reject:E}}):g};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=u(t[c])})(),i!==void 0&&(t._OrtRun=i(t._OrtRun),t._OrtRunWithBinding=i(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var o,l,d=(u,c)=>{throw c},p=import.meta.url,f="";if(n||a){try{f=new URL(".",p).href}catch{}a&&(l=u=>{var c=new XMLHttpRequest;return c.open("GET",u,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),o=async u=>{if(z(u))return new Promise((g,h)=>{var v=new XMLHttpRequest;v.open("GET",u,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?g(v.response):h(v.status)},v.onerror=h,v.send(null)});var c=await fetch(u,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var m,y,w,_,k,$,b=console.log.bind(console),T=console.error.bind(console),S=b,I=T,C=!1,z=u=>u.startsWith("file://");function x(){_t.buffer!=P.buffer&&J()}if(r){let u=function(c){try{var g=c.data,h=g.Sc;if(h==="load"){let v=[];self.onmessage=E=>v.push(E),$=()=>{postMessage({Sc:"loaded"});for(let E of v)u(E);self.onmessage=u};for(let E of g.xd)t[E]&&!t[E].proxy||(t[E]=(...A)=>{postMessage({Sc:"callHandler",wd:E,args:A})},E=="print"&&(S=t[E]),E=="printErr"&&(I=t[E]));_t=g.Od,J(),y=g.Pd,ze(),Jn()}else if(h==="run"){(function(v){var E=(x(),D)[v+52>>>2>>>0];v=(x(),D)[v+56>>>2>>>0],fo(E,E-v),oe(E)})(g.Rc),Ya(g.Rc,0,0,1,0,0),fs(),qa(g.Rc),M||(so(),M=!0);try{Ng(g.Md,g.bd)}catch(v){if(v!="unwind")throw v}}else g.target!=="setimmediate"&&(h==="checkMailbox"?M&&Gn():h&&(I(`worker: received unknown command ${h}`),I(g)))}catch(v){throw oo(),v}};var M=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=u}var P,Y,G,j,R,D,F,Q,ee,ne,ie,U=!1;function J(){var u=_t.buffer;t.HEAP8=P=new Int8Array(u),G=new Int16Array(u),t.HEAPU8=Y=new Uint8Array(u),j=new Uint16Array(u),t.HEAP32=R=new Int32Array(u),t.HEAPU32=D=new Uint32Array(u),F=new Float32Array(u),Q=new Float64Array(u),ee=new BigInt64Array(u),ne=new BigUint64Array(u)}function Z(){U=!0,r?$():pt.sb()}function W(u){throw I(u="Aborted("+u+")"),C=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),k?.(u),u}function Ee(){return{a:{ma:a0,gb:n0,g:Bg,J:Mg,f:Dg,o:Ug,h:Pg,ha:Lg,b:Vg,T:qg,Ha:_s,n:Wg,$:xs,Xa:ks,Da:Ss,Fa:Ts,Ya:Es,Va:Is,Oa:Cs,Ua:As,ka:zs,Ea:Os,Ba:Rs,Wa:Ns,Ca:Bs,bb:Fg,ea:Gg,wa:Hg,ua:Kg,da:Yg,O:Zg,H:Jg,va:Qg,_:sy,xa:oy,Ra:uy,za:dy,Ia:cy,sa:py,fa:fy,Qa:qa,_a:hy,R:wy,r:xy,c:La,hb:ky,y:Sy,M:Ty,D:Ey,l:Iy,s:Ws,ib:Cy,I:Ay,S:zy,j:Oy,u:Ry,q:Ny,k:By,La:My,Ma:Dy,Na:Uy,Ja:js,Ka:Ks,ta:Xs,db:Ly,ab:qy,v:Wy,aa:Fy,ga:Gy,$a:Vy,W:Hy,Za:jy,Aa:Ky,F:Py,U:Xy,la:Yn,ya:Zy,fb:Yy,eb:Jy,Sa:Qs,Ta:eo,Ga:Ba,V:to,ja:no,Pa:ao,ia:ro,kb:P0,na:N0,lb:U0,oa:R0,G:k0,e:o0,t:i0,w:r0,B:y0,mb:A0,K:v0,x:d0,pa:z0,Y:B0,ba:C0,nb:I0,ob:E0,P:w0,qa:T0,pb:S0,N:$0,Z:O0,d:s0,A:l0,m:u0,jb:L0,p:p0,z:f0,C:c0,E:h0,L:_0,qb:x0,Q:M0,ca:b0,X:D0,rb:g0,ra:m0,i:e0,a:_t,cb:Na}}}async function ze(){function u(h,v){var E=pt=h.exports;h={};for(let[A,N]of Object.entries(E))typeof N=="function"?(E=my(N),h[A]=E):h[A]=N;return pt=h,pt=(function(){var A=pt,N=q=>se=>q(se)>>>0,V=q=>()=>q()>>>0;return(A=Object.assign({},A)).tb=N(A.tb),A.Xb=V(A.Xb),A.Zb=N(A.Zb),A.lc=N(A.lc),A.mc=V(A.mc),A.qc=N(A.qc),A})(),cs.push(pt._b),io=(h=pt).tb,so=h.ub,t._OrtInit=h.vb,t._OrtGetLastError=h.wb,t._OrtCreateSessionOptions=h.xb,t._OrtAppendExecutionProvider=h.yb,t._OrtAddFreeDimensionOverride=h.zb,t._OrtAddSessionConfigEntry=h.Ab,t._OrtReleaseSessionOptions=h.Bb,t._OrtCreateSession=h.Cb,t._OrtReleaseSession=h.Db,t._OrtGetInputOutputCount=h.Eb,t._OrtGetInputOutputMetadata=h.Fb,t._OrtFree=h.Gb,t._OrtCreateTensor=h.Hb,t._OrtGetTensorData=h.Ib,t._OrtReleaseTensor=h.Jb,t._OrtCreateRunOptions=h.Kb,t._OrtAddRunConfigEntry=h.Lb,t._OrtReleaseRunOptions=h.Mb,t._OrtCreateBinding=h.Nb,t._OrtBindInput=h.Ob,t._OrtBindOutput=h.Pb,t._OrtClearBoundOutputs=h.Qb,t._OrtReleaseBinding=h.Rb,t._OrtRunWithBinding=h.Sb,t._OrtRun=h.Tb,t._OrtEndProfiling=h.Ub,t._JsepOutput=h.Vb,t._JsepGetNodeName=h.Wb,Zn=h.Xb,st=t._free=h.Yb,hn=t._malloc=h.Zb,Ya=h.ac,oo=h.bc,uo=h.cc,lo=h.dc,Za=h.ec,co=h.fc,po=h.gc,le=h.hc,mn=h.ic,fo=h.jc,oe=h.kc,Ja=h.lc,ue=h.mc,ho=h.nc,Qa=h.oc,mo=h.pc,go=h.qc,yo=h.rc,er=h.sc,wo=h.tc,_o=h.uc,bo=h.vc,vo=h.wc,$o=h.xc,xo=h.yc,ko=h.zc,So=h.Ac,To=h.Bc,Eo=h.Cc,Io=h.Dc,Co=h.Ec,Ao=h.Fc,zo=h.Gc,Oo=h.Hc,Ro=h.Ic,No=h.Jc,Bo=h.Kc,Mo=h.Lc,Do=h.Mc,Uo=h.Nc,Po=h.Pc,Lo=h.Qc,Vo=h.$c,qo=h.ad,Wo=h.fd,Fo=h.jd,Go=h.kd,Ho=h.ld,jo=h.md,Ko=h.nd,Xo=h.od,Yo=h.pd,Zo=h.qd,Jo=h.vd,Qo=h.Td,eu=h.Ud,tu=h.Vd,nu=h.Wd,y=v,pt}var c,g=Ee();return t.instantiateWasm?new Promise(h=>{t.instantiateWasm(g,(v,E)=>{h(u(v,E))})}):r?u(new WebAssembly.Instance(y,Ee()),y):(ie??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm",import.meta.url).href,import.meta.url).href,c=await(async function(h){var v=ie;if(!m&&!z(v))try{var E=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,h)}catch(A){I(`wasm streaming compile failed: ${A}`),I("falling back to ArrayBuffer instantiation")}return(async function(A,N){try{var V=await(async function(q){if(!m)try{var se=await o(q);return new Uint8Array(se)}catch{}if(q==ie&&m)q=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";q=l(q)}return q})(A);return await WebAssembly.instantiate(V,N)}catch(q){I(`failed to asynchronously prepare wasm: ${q}`),W(q)}})(v,h)})(g),u(c.instance,c.module))}class $e{name="ExitStatus";constructor(c){this.message=`Program terminated with exit(${c})`,this.status=c}}var Oe=u=>{u.terminate(),u.onmessage=()=>{}},ge=[],ve=0,Ne=null,Ln=u=>{wt.length==0&&(ms(),hs(wt[0]));var c=wt.pop();if(!c)return 6;pn.push(c),Ot[u.Rc]=c,c.Rc=u.Rc;var g={Sc:"run",Md:u.Ld,bd:u.bd,Rc:u.Rc};return c.postMessage(g,u.rd),0},at=0,xe=(u,c,...g)=>{var h,v=16*g.length,E=ue(),A=Ja(v),N=A>>>3;for(h of g)typeof h=="bigint"?((x(),ee)[N++>>>0]=1n,(x(),ee)[N++>>>0]=h):((x(),ee)[N++>>>0]=0n,(x(),Q)[N++>>>0]=h);return u=uo(u,0,v,A,c),oe(E),u};function Na(u){if(r)return xe(0,1,u);if(w=u,!(0<at)){for(var c of pn)Oe(c);for(c of wt)Oe(c);wt=[],pn=[],Ot={},C=!0}d(0,new $e(u))}function ds(u){if(r)return xe(1,0,u);Ba(u)}var Ba=u=>{if(w=u,r)throw ds(u),"unwind";Na(u)},wt=[],pn=[],cs=[],Ot={},ps=u=>{var c=u.Rc;delete Ot[c],wt.push(u),pn.splice(pn.indexOf(u),1),u.Rc=0,lo(c)};function fs(){cs.forEach(u=>u())}var hs=u=>new Promise(c=>{u.onmessage=v=>{var E=v.data;if(v=E.Sc,E.Zc&&E.Zc!=Zn()){var A=Ot[E.Zc];A?A.postMessage(E,E.rd):I(`Internal error! Worker sent a message "${v}" to target pthread ${E.Zc}, but that thread no longer exists!`)}else v==="checkMailbox"?Gn():v==="spawnThread"?Ln(E):v==="cleanupThread"?Fn(()=>{ps(Ot[E.Nd])}):v==="loaded"?(u.loaded=!0,c(u)):E.target==="setimmediate"?u.postMessage(E):v==="uncaughtException"?u.onerror(E.error):v==="callHandler"?t[E.wd](...E.args):v&&I(`worker sent an unknown command ${v}`)},u.onerror=v=>{throw I(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var g,h=[];for(g of[])t.propertyIsEnumerable(g)&&h.push(g);u.postMessage({Sc:"load",xd:h,Od:_t,Pd:y})});function ms(){var u=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});wt.push(u)}var _t,Ng=(u,c)=>{at=0,u=er(u,c),0<at?w=u:Za(u)},Vn=[],qn=0;function Bg(u){var c=new Ma(u>>>=0);return(x(),P)[c.Tc+12>>>0]==0&&(gs(c,!0),qn--),ys(c,!1),Vn.push(c),go(u)}var Jt=0,Mg=()=>{le(0,0);var u=Vn.pop();ho(u.cd),Jt=0};function gs(u,c){c=c?1:0,(x(),P)[u.Tc+12>>>0]=c}function ys(u,c){c=c?1:0,(x(),P)[u.Tc+13>>>0]=c}class Ma{constructor(c){this.cd=c,this.Tc=c-24}}var Da=u=>{var c=Jt;if(!c)return mn(0),0;var g=new Ma(c);(x(),D)[g.Tc+16>>>2>>>0]=c;var h=(x(),D)[g.Tc+4>>>2>>>0];if(!h)return mn(0),c;for(var v of u){if(v===0||v===h)break;if(mo(v,h,g.Tc+16))return mn(v),c}return mn(h),c};function Dg(){return Da([])}function Ug(u){return Da([u>>>0])}function Pg(u,c,g,h){return Da([u>>>0,c>>>0,g>>>0,h>>>0])}var Lg=()=>{var u=Vn.pop();u||W("no exception to throw");var c=u.cd;throw(x(),P)[u.Tc+13>>>0]==0&&(Vn.push(u),ys(u,!0),gs(u,!1),qn++),Qa(c),Jt=c};function Vg(u,c,g){var h=new Ma(u>>>=0);throw c>>>=0,g>>>=0,(x(),D)[h.Tc+16>>>2>>>0]=0,(x(),D)[h.Tc+4>>>2>>>0]=c,(x(),D)[h.Tc+8>>>2>>>0]=g,Qa(u),qn++,Jt=u}var qg=()=>qn;function ws(u,c,g,h){return r?xe(2,1,u,c,g,h):_s(u,c,g,h)}function _s(u,c,g,h){if(u>>>=0,c>>>=0,g>>>=0,h>>>=0,!globalThis.SharedArrayBuffer)return 6;var v=[];return r&&v.length===0?ws(u,c,g,h):(u={Ld:g,Rc:u,bd:h,rd:v},r?(u.Sc="spawnThread",postMessage(u,v),0):Ln(u))}function Wg(u){throw Jt||=u>>>0,Jt}var bs=globalThis.TextDecoder&&new TextDecoder,vs=(u,c,g,h)=>{if(g=c+g,h)return g;for(;u[c]&&!(c>=g);)++c;return c},$s=(u,c=0,g,h)=>{if(16<(g=vs(u,c>>>=0,g,h))-c&&u.buffer&&bs)return bs.decode(u.buffer instanceof ArrayBuffer?u.subarray(c,g):u.slice(c,g));for(h="";c<g;){var v=u[c++];if(128&v){var E=63&u[c++];if((224&v)==192)h+=String.fromCharCode((31&v)<<6|E);else{var A=63&u[c++];65536>(v=(240&v)==224?(15&v)<<12|E<<6|A:(7&v)<<18|E<<12|A<<6|63&u[c++])?h+=String.fromCharCode(v):(v-=65536,h+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else h+=String.fromCharCode(v)}return h},Te=(u,c,g)=>(u>>>=0)?$s((x(),Y),u,c,g):"";function xs(u,c,g){return r?xe(3,1,u,c,g):0}function ks(u,c){if(r)return xe(4,1,u,c)}function Ss(u,c){if(r)return xe(5,1,u,c)}function Ts(u,c,g){if(r)return xe(6,1,u,c,g)}function Es(u,c,g){return r?xe(7,1,u,c,g):0}function Is(u,c){if(r)return xe(8,1,u,c)}function Cs(u,c,g){if(r)return xe(9,1,u,c,g)}function As(u,c,g,h){if(r)return xe(10,1,u,c,g,h)}function zs(u,c,g,h){if(r)return xe(11,1,u,c,g,h)}function Os(u,c,g,h){if(r)return xe(12,1,u,c,g,h)}function Rs(u){if(r)return xe(13,1,u)}function Ns(u,c){if(r)return xe(14,1,u,c)}function Bs(u,c,g){if(r)return xe(15,1,u,c,g)}var Fg=()=>W(""),rt=u=>{u>>>=0;for(var c="";;){var g=(x(),Y)[u++>>>0];if(!g)return c;c+=String.fromCharCode(g)}},Ua={},Pa={},Qt=class extends Error{constructor(u){super(u),this.name="BindingError"}};function ct(u,c,g={}){return(function(h,v,E={}){var A=v.name;if(!h)throw new Qt(`type "${A}" must have a positive integer typeid pointer`);if(Pa.hasOwnProperty(h)){if(E.yd)return;throw new Qt(`Cannot register type '${A}' twice`)}Pa[h]=v,Ua.hasOwnProperty(h)&&(v=Ua[h],delete Ua[h],v.forEach(N=>N()))})(u,c,g)}var Ms=(u,c,g)=>{switch(c){case 1:return g?h=>(x(),P)[h>>>0]:h=>(x(),Y)[h>>>0];case 2:return g?h=>(x(),G)[h>>>1>>>0]:h=>(x(),j)[h>>>1>>>0];case 4:return g?h=>(x(),R)[h>>>2>>>0]:h=>(x(),D)[h>>>2>>>0];case 8:return g?h=>(x(),ee)[h>>>3>>>0]:h=>(x(),ne)[h>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${u}`)}};function Gg(u,c,g,h,v){u>>>=0,g>>>=0,c=rt(c>>>0);let E=A=>A;if(h=h===0n){let A=8*g;E=N=>BigInt.asUintN(A,N),v=E(v)}ct(u,{name:c,Oc:E,Vc:(A,N)=>(typeof N=="number"&&(N=BigInt(N)),N),Uc:Ms(c,g,!h),Wc:null})}function Hg(u,c,g,h){ct(u>>>=0,{name:c=rt(c>>>0),Oc:function(v){return!!v},Vc:function(v,E){return E?g:h},Uc:function(v){return this.Oc((x(),Y)[v>>>0])},Wc:null})}var Ds=[],Rt=[0,1,,1,null,1,!0,1,!1,1];function La(u){9<(u>>>=0)&&--Rt[u+1]===0&&(Rt[u]=void 0,Ds.push(u))}var We=u=>{if(!u)throw new Qt(`Cannot use deleted val. handle = ${u}`);return Rt[u]},je=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Ds.pop()||Rt.length;return Rt[c]=u,Rt[c+1]=1,c}};function Va(u){return this.Oc((x(),D)[u>>>2>>>0])}var jg={name:"emscripten::val",Oc:u=>{var c=We(u);return La(u),c},Vc:(u,c)=>je(c),Uc:Va,Wc:null};function Kg(u){return ct(u>>>0,jg)}var Xg=(u,c)=>{switch(c){case 4:return function(g){return this.Oc((x(),F)[g>>>2>>>0])};case 8:return function(g){return this.Oc((x(),Q)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${u}`)}};function Yg(u,c,g){g>>>=0,ct(u>>>=0,{name:c=rt(c>>>0),Oc:h=>h,Vc:(h,v)=>v,Uc:Xg(c,g),Wc:null})}function Zg(u,c,g,h,v){u>>>=0,g>>>=0,c=rt(c>>>0);let E=N=>N;if(h===0){var A=32-8*g;E=N=>N<<A>>>A,v=E(v)}ct(u,{name:c,Oc:E,Vc:(N,V)=>V,Uc:Ms(c,g,h!==0),Wc:null})}function Jg(u,c,g){function h(E){var A=(x(),D)[E>>>2>>>0];return E=(x(),D)[E+4>>>2>>>0],new v((x(),P).buffer,E,A)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];ct(u>>>=0,{name:g=rt(g>>>0),Oc:h,Uc:h},{yd:!0})}var bt=(u,c,g)=>{var h=(x(),Y);if(c>>>=0,0<g){var v=c;g=c+g-1;for(var E=0;E<u.length;++E){var A=u.codePointAt(E);if(127>=A){if(c>=g)break;h[c++>>>0]=A}else if(2047>=A){if(c+1>=g)break;h[c++>>>0]=192|A>>6,h[c++>>>0]=128|63&A}else if(65535>=A){if(c+2>=g)break;h[c++>>>0]=224|A>>12,h[c++>>>0]=128|A>>6&63,h[c++>>>0]=128|63&A}else{if(c+3>=g)break;h[c++>>>0]=240|A>>18,h[c++>>>0]=128|A>>12&63,h[c++>>>0]=128|A>>6&63,h[c++>>>0]=128|63&A,E++}}h[c>>>0]=0,u=c-v}else u=0;return u},Wn=u=>{for(var c=0,g=0;g<u.length;++g){var h=u.charCodeAt(g);127>=h?c++:2047>=h?c+=2:55296<=h&&57343>=h?(c+=4,++g):c+=3}return c};function Qg(u,c){ct(u>>>=0,{name:c=rt(c>>>0),Oc(g){var h=(x(),D)[g>>>2>>>0];return h=Te(g+4,h,!0),st(g),h},Vc(g,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var v=typeof h=="string";if(!(v||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new Qt("Cannot pass non-string to std::string");var E=v?Wn(h):h.length,A=hn(4+E+1),N=A+4;return(x(),D)[A>>>2>>>0]=E,v?bt(h,N,E+1):(x(),Y).set(h,N>>>0),g!==null&&g.push(st,A),A},Uc:Va,Wc(g){st(g)}})}var Us=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,ey=(u,c,g)=>{if(u>>>=1,16<(c=vs((x(),j),u,c/2,g))-u&&Us)return Us.decode((x(),j).slice(u,c));for(g="";u<c;++u){var h=(x(),j)[u>>>0];g+=String.fromCharCode(h)}return g},ty=(u,c,g)=>{if(g??=2147483647,2>g)return 0;var h=c;g=(g-=2)<2*u.length?g/2:u.length;for(var v=0;v<g;++v){var E=u.charCodeAt(v);(x(),G)[c>>>1>>>0]=E,c+=2}return(x(),G)[c>>>1>>>0]=0,c-h},ny=u=>2*u.length,ay=(u,c,g)=>{var h="";u>>>=2;for(var v=0;!(v>=c/4);v++){var E=(x(),D)[u+v>>>0];if(!E&&!g)break;h+=String.fromCodePoint(E)}return h},ry=(u,c,g)=>{if(c>>>=0,g??=2147483647,4>g)return 0;var h=c;g=h+g-4;for(var v=0;v<u.length;++v){var E=u.codePointAt(v);if(65535<E&&v++,(x(),R)[c>>>2>>>0]=E,(c+=4)+4>g)break}return(x(),R)[c>>>2>>>0]=0,c-h},iy=u=>{for(var c=0,g=0;g<u.length;++g)65535<u.codePointAt(g)&&g++,c+=4;return c};function sy(u,c,g){if(u>>>=0,c>>>=0,g=rt(g>>>=0),c===2)var h=ey,v=ty,E=ny;else h=ay,v=ry,E=iy;ct(u,{name:g,Oc:A=>{var N=(x(),D)[A>>>2>>>0];return N=h(A+4,N*c,!0),st(A),N},Vc:(A,N)=>{if(typeof N!="string")throw new Qt(`Cannot pass non-string to C++ string type ${g}`);var V=E(N),q=hn(4+V+c);return(x(),D)[q>>>2>>>0]=V/c,v(N,q+4,V+c),A!==null&&A.push(st,q),q},Uc:Va,Wc(A){st(A)}})}function oy(u,c){ct(u>>>=0,{zd:!0,name:c=rt(c>>>0),Oc:()=>{},Vc:()=>{}})}function uy(u){Ya(u>>>0,!a,1,!n,131072,!1),fs()}var Fn=u=>{if(!C)try{if(u(),!(0<at))try{r?Zn()&&Za(w):Ba(w)}catch(c){c instanceof $e||c=="unwind"||d(0,c)}}catch(c){c instanceof $e||c=="unwind"||d(0,c)}},ly=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function qa(u){u>>>=0,ly||(Atomics.waitAsync((x(),R),u>>>2,u).value.then(Gn),u+=128,Atomics.store((x(),R),u>>>2,1))}var Gn=()=>Fn(()=>{var u=Zn();u&&(qa(u),po())});function dy(u,c){(u>>>=0)==c>>>0?setTimeout(Gn):r?postMessage({Zc:u,Sc:"checkMailbox"}):(u=Ot[u])&&u.postMessage({Sc:"checkMailbox"})}var Wa=[];function cy(u,c,g,h,v){for(c>>>=0,v>>>=0,Wa.length=0,g=v>>>3,h=v+h>>>3;g<h;){var E;E=(x(),ee)[g++>>>0]?(x(),ee)[g++>>>0]:(x(),Q)[g++>>>0],Wa.push(E)}return(c?tr[c]:t0[u])(...Wa)}var py=()=>{at=0};function fy(u){u>>>=0,r?postMessage({Sc:"cleanupThread",Nd:u}):ps(Ot[u])}function hy(u){}var Hn=u=>{try{u()}catch(c){W(c)}};function my(u){var c=(...g)=>{jn.push(u);try{return u(...g)}finally{C||(jn.pop(),it&&vt===1&&jn.length===0&&(vt=0,at+=1,Hn(eu),typeof Fibers<"u"&&Fibers.Zd()))}};return Vs.set(u,c),c}var vt=0,it=null,Ps=0,jn=[],Fa=new Map,Ls=new Map,Vs=new Map,gy=0,Ga=null,yy=[],qs=u=>(function(c){if(!C){if(vt===0){var g=!1,h=!1;c((v=0)=>{if(!C&&(Ps=v,g=!0,h)){vt=2,Hn(()=>tu(it)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),v=!1;try{var E=(function(){var V=(x(),R)[it+8>>>2>>>0];return V=Ls.get(V),V=Vs.get(V),--at,V()})()}catch(V){E=V,v=!0}var A=!1;if(!it){var N=Ga;N&&(Ga=null,(v?N.reject:N.resolve)(E),A=!0)}if(v&&!A)throw E}}),h=!0,g||(vt=1,it=(function(){var v=hn(65548),E=v+12;if((x(),D)[v>>>2>>>0]=E,(x(),D)[v+4>>>2>>>0]=E+65536,E=jn[0],!Fa.has(E)){var A=gy++;Fa.set(E,A),Ls.set(A,E)}return E=Fa.get(E),(x(),R)[v+8>>>2>>>0]=E,v})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Hn(()=>Qo(it)))}else vt===2?(vt=0,Hn(nu),st(it),it=null,yy.forEach(Fn)):W(`invalid state: ${vt}`);return Ps}})(c=>{u().then(c)});function wy(u){return u>>>=0,qs(async()=>{var c=await We(u);return je(c)})}var Ha=[],_y=u=>{var c=Ha.length;return Ha.push(u),c},by=(u,c)=>{for(var g=Array(u),h=0;h<u;++h){var v=h,E=(x(),D)[c+4*h>>>2>>>0],A=Pa[E];if(A===void 0)throw u=`parameter ${h}`,E=io(E),c=rt(E),st(E),new Qt(`${u} has unknown type ${c}`);g[v]=A}return g},vy=(u,c,g)=>{var h=[];return u=u(h,g),h.length&&((x(),D)[c>>>2>>>0]=je(h)),u},$y={},Kn=u=>{var c=$y[u];return c===void 0?rt(u):c};function xy(u,c,g){var[h,...v]=by(u,c>>>0);c=h.Vc.bind(h);var E=v.map(V=>V.Uc.bind(V));u--;var A={toValue:We};switch(u=E.map((V,q)=>{var se=`argFromPtr${q}`;return A[se]=V,`${se}(args${q?"+"+8*q:""})`}),g){case 0:var N="toValue(handle)";break;case 2:N="new (toValue(handle))";break;case 3:N="";break;case 1:A.getStringOrSymbol=Kn,N="toValue(handle)[getStringOrSymbol(methodName)]"}return N+=`(${u})`,h.zd||(A.toReturnWire=c,A.emval_returnValue=vy,N=`return emval_returnValue(toReturnWire, destructorsRef, ${N})`),N=`return function (handle, methodName, destructorsRef, args) {
  ${N}
  }`,g=new Function(Object.keys(A),N)(...Object.values(A)),N=`methodCaller<(${v.map(V=>V.name)}) => ${h.name}>`,_y(Object.defineProperty(g,"name",{value:N}))}function ky(u,c){return c>>>=0,(u=We(u>>>0))==We(c)}function Sy(u){return(u>>>=0)?(u=Kn(u),je(globalThis[u])):je(globalThis)}function Ty(u){return u=Kn(u>>>0),je(t[u])}function Ey(u,c){return c>>>=0,u=We(u>>>0),c=We(c),je(u[c])}function Iy(u){9<(u>>>=0)&&(Rt[u+1]+=1)}function Ws(u,c,g,h,v){return Ha[u>>>0](c>>>0,g>>>0,h>>>0,v>>>0)}function Cy(u,c,g,h,v){return Ws(u>>>0,c>>>0,g>>>0,h>>>0,v>>>0)}function Ay(){return je([])}function zy(u){u=We(u>>>0);for(var c=Array(u.length),g=0;g<u.length;g++)c[g]=u[g];return je(c)}function Oy(u){return je(Kn(u>>>0))}function Ry(){return je({})}function Ny(u){for(var c=We(u>>>=0);c.length;){var g=c.pop();c.pop()(g)}La(u)}function By(u,c,g){c>>>=0,g>>>=0,u=We(u>>>0),c=We(c),g=We(g),u[c]=g}function My(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),(x(),R)[c>>>2>>>0]=u.getUTCSeconds(),(x(),R)[c+4>>>2>>>0]=u.getUTCMinutes(),(x(),R)[c+8>>>2>>>0]=u.getUTCHours(),(x(),R)[c+12>>>2>>>0]=u.getUTCDate(),(x(),R)[c+16>>>2>>>0]=u.getUTCMonth(),(x(),R)[c+20>>>2>>>0]=u.getUTCFullYear()-1900,(x(),R)[c+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),R)[c+28>>>2>>>0]=u}var Fs=u=>u%4==0&&(u%100!=0||u%400==0),Gs=[0,31,60,91,121,152,182,213,244,274,305,335],Hs=[0,31,59,90,120,151,181,212,243,273,304,334];function Dy(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),(x(),R)[c>>>2>>>0]=u.getSeconds(),(x(),R)[c+4>>>2>>>0]=u.getMinutes(),(x(),R)[c+8>>>2>>>0]=u.getHours(),(x(),R)[c+12>>>2>>>0]=u.getDate(),(x(),R)[c+16>>>2>>>0]=u.getMonth(),(x(),R)[c+20>>>2>>>0]=u.getFullYear()-1900,(x(),R)[c+24>>>2>>>0]=u.getDay();var g=(Fs(u.getFullYear())?Gs:Hs)[u.getMonth()]+u.getDate()-1|0;(x(),R)[c+28>>>2>>>0]=g,(x(),R)[c+36>>>2>>>0]=-60*u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset();var h=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(g!=h&&u.getTimezoneOffset()==Math.min(h,g)),(x(),R)[c+32>>>2>>>0]=u}function Uy(u){u>>>=0;var c=new Date((x(),R)[u+20>>>2>>>0]+1900,(x(),R)[u+16>>>2>>>0],(x(),R)[u+12>>>2>>>0],(x(),R)[u+8>>>2>>>0],(x(),R)[u+4>>>2>>>0],(x(),R)[u>>>2>>>0],0),g=(x(),R)[u+32>>>2>>>0],h=c.getTimezoneOffset(),v=new Date(c.getFullYear(),6,1).getTimezoneOffset(),E=new Date(c.getFullYear(),0,1).getTimezoneOffset(),A=Math.min(E,v);return 0>g?(x(),R)[u+32>>>2>>>0]=+(v!=E&&A==h):0<g!=(A==h)&&(v=Math.max(E,v),c.setTime(c.getTime()+6e4*((0<g?A:v)-h))),(x(),R)[u+24>>>2>>>0]=c.getDay(),g=(Fs(c.getFullYear())?Gs:Hs)[c.getMonth()]+c.getDate()-1|0,(x(),R)[u+28>>>2>>>0]=g,(x(),R)[u>>>2>>>0]=c.getSeconds(),(x(),R)[u+4>>>2>>>0]=c.getMinutes(),(x(),R)[u+8>>>2>>>0]=c.getHours(),(x(),R)[u+12>>>2>>>0]=c.getDate(),(x(),R)[u+16>>>2>>>0]=c.getMonth(),(x(),R)[u+20>>>2>>>0]=c.getYear(),u=c.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function js(u,c,g,h,v,E,A){return r?xe(16,1,u,c,g,h,v,E,A):-52}function Ks(u,c,g,h,v,E){if(r)return xe(17,1,u,c,g,h,v,E)}var fn={},Py=()=>performance.timeOrigin+performance.now();function Xs(u,c){if(r)return xe(18,1,u,c);if(fn[u]&&(clearTimeout(fn[u].id),delete fn[u]),!c)return 0;var g=setTimeout(()=>{delete fn[u],Fn(()=>co(u,performance.timeOrigin+performance.now()))},c);return fn[u]={id:g,Yd:c},0}function Ly(u,c,g,h){u>>>=0,c>>>=0,g>>>=0,h>>>=0;var v=new Date().getFullYear(),E=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var A=Math.max(E,v);(x(),D)[u>>>2>>>0]=60*A,(x(),R)[c>>>2>>>0]=+(E!=v),u=(c=N=>{var V=Math.abs(N);return`UTC${0<=N?"-":"+"}${String(Math.floor(V/60)).padStart(2,"0")}${String(V%60).padStart(2,"0")}`})(E),c=c(v),v<E?(bt(u,g,17),bt(c,h,17)):(bt(u,h,17),bt(c,g,17))}var Vy=()=>Date.now();function qy(u,c,g){return g>>>=0,0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),u=Math.round(1e6*u),(x(),ee)[g>>>3>>>0]=BigInt(u),0):28}var ja=[],Ys=(u,c)=>{ja.length=0;for(var g;g=(x(),Y)[u++>>>0];){var h=g!=105;c+=(h&=g!=112)&&c%8?4:0,ja.push(g==112?(x(),D)[c>>>2>>>0]:g==106?(x(),ee)[c>>>3>>>0]:g==105?(x(),R)[c>>>2>>>0]:(x(),Q)[c>>>3>>>0]),c+=h?8:4}return ja};function Wy(u,c,g){return u>>>=0,c=Ys(c>>>0,g>>>0),tr[u](...c)}function Fy(u,c,g){return u>>>=0,c=Ys(c>>>0,g>>>0),tr[u](...c)}var Gy=()=>{};function Hy(u,c){return I(Te(u>>>0,c>>>0))}var jy=()=>{throw at+=1,"unwind"};function Ky(){return 4294901760}var Xy=()=>navigator.hardwareConcurrency,Nt={},Xn=u=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+c[1]:0},Zs=u=>{for(var c of u)(u=Xn(c))&&(Nt[u]=c)};function Yy(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),Zs(u),Nt.gd=Xn(u[3]),Nt.Jd=u,Nt.gd}function Yn(u){if(!(u=Nt[u>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(u))u=c[1];else{if(!(c=/^(.+?)@/.exec(u)))return 0;u=c[1]}st(Yn.hd??0),c=Wn(u)+1;var g=hn(c);return g&&bt(u,g,c),Yn.hd=g,Yn.hd}function Zy(u){u>>>=0;var c=(x(),Y).length;if(u<=c||4294901760<u)return!1;for(var g=1;4>=g;g*=2){var h=c*(1+.2/g);h=Math.min(h,u+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(u,h)/65536))-_t.buffer.byteLength+65535)/65536|0;try{_t.grow(h),J();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}function Jy(u,c,g){if(u>>>=0,c>>>=0,Nt.gd==u)var h=Nt.Jd;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),Zs(h);for(var v=3;h[v]&&Xn(h[v])!=u;)++v;for(u=0;u<g&&h[u+v];++u)(x(),R)[c+4*u>>>2>>>0]=Xn(h[u+v]);return u}var Ka,Xa={},Js=()=>{if(!Ka){var u,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in Xa)Xa[u]===void 0?delete c[u]:c[u]=Xa[u];var g=[];for(u in c)g.push(`${u}=${c[u]}`);Ka=g}return Ka};function Qs(u,c){if(r)return xe(19,1,u,c);u>>>=0,c>>>=0;var g,h=0,v=0;for(g of Js()){var E=c+h;(x(),D)[u+v>>>2>>>0]=E,h+=bt(g,E,1/0)+1,v+=4}return 0}function eo(u,c){if(r)return xe(20,1,u,c);u>>>=0,c>>>=0;var g=Js();for(var h of((x(),D)[u>>>2>>>0]=g.length,u=0,g))u+=Wn(h)+1;return(x(),D)[c>>>2>>>0]=u,0}function to(u){return r?xe(21,1,u):52}function no(u,c,g,h){return r?xe(22,1,u,c,g,h):52}function ao(u,c,g,h){return r?xe(23,1,u,c,g,h):70}var Qy=[null,[],[]];function ro(u,c,g,h){if(r)return xe(24,1,u,c,g,h);c>>>=0,g>>>=0,h>>>=0;for(var v=0,E=0;E<g;E++){var A=(x(),D)[c>>>2>>>0],N=(x(),D)[c+4>>>2>>>0];c+=8;for(var V=0;V<N;V++){var q=u,se=(x(),Y)[A+V>>>0],pe=Qy[q];se===0||se===10?((q===1?S:I)($s(pe)),pe.length=0):pe.push(se)}v+=N}return(x(),D)[h>>>2>>>0]=v,0}function e0(u){return u>>>0}r||(function(){for(var u=t.numThreads-1;u--;)ms();ge.push(async()=>{var c=(async function(){if(!r)return Promise.all(wt.map(hs))})();ve++,await c,--ve==0&&Ne&&(c=Ne,Ne=null,c())})})(),r||(_t=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),J()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>ue(),t.stackRestore=u=>oe(u),t.stackAlloc=u=>Ja(u),t.setValue=function(u,c,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":(x(),P)[u>>>0]=c;break;case"i16":(x(),G)[u>>>1>>>0]=c;break;case"i32":(x(),R)[u>>>2>>>0]=c;break;case"i64":(x(),ee)[u>>>3>>>0]=BigInt(c);break;case"float":(x(),F)[u>>>2>>>0]=c;break;case"double":(x(),Q)[u>>>3>>>0]=c;break;case"*":(x(),D)[u>>>2>>>0]=c;break;default:W(`invalid type for setValue: ${g}`)}},t.getValue=function(u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return(x(),P)[u>>>0];case"i16":return(x(),G)[u>>>1>>>0];case"i32":return(x(),R)[u>>>2>>>0];case"i64":return(x(),ee)[u>>>3>>>0];case"float":return(x(),F)[u>>>2>>>0];case"double":return(x(),Q)[u>>>3>>>0];case"*":return(x(),D)[u>>>2>>>0];default:W(`invalid type for getValue: ${c}`)}},t.UTF8ToString=Te,t.stringToUTF8=bt,t.lengthBytesUTF8=Wn;var io,so,Zn,st,hn,Ya,oo,uo,lo,Za,co,po,le,mn,fo,oe,Ja,ue,ho,Qa,mo,go,yo,er,wo,_o,bo,vo,$o,xo,ko,So,To,Eo,Io,Co,Ao,zo,Oo,Ro,No,Bo,Mo,Do,Uo,Po,Lo,Vo,qo,Wo,Fo,Go,Ho,jo,Ko,Xo,Yo,Zo,Jo,Qo,eu,tu,nu,pt,t0=[Na,ds,ws,xs,ks,Ss,Ts,Es,Is,Cs,As,zs,Os,Rs,Ns,Bs,js,Ks,Xs,Qs,eo,to,no,ao,ro],tr={1003524:(u,c,g,h,v)=>{if(t===void 0||!t.Xc)return 1;if((u=Te(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.Xc.get(u)))return 2;if(c=Number(c>>>0),g=Number(g>>>0),h=Number(h>>>0),c+g>u.byteLength)return 3;try{let E=u.subarray(c,c+g);switch(v){case 0:(x(),Y).set(E,h>>>0);break;case 1:t.Qd?t.Qd(h,E):t.Id(h,E);break;default:return 4}return 0}catch{return 4}},1004348:(u,c,g)=>{t.td(u,(x(),Y).subarray(c>>>0,c+g>>>0))},1004412:()=>t.Sd(),1004454:u=>{t.sd(u)},1004491:()=>{t.Bd()},1004522:()=>{t.Cd()},1004551:()=>{t.Gd()},1004576:u=>t.Ad(u),1004609:u=>t.Ed(u),1004641:(u,c,g)=>{t.ed(Number(u),Number(c),Number(g),!0)},1004704:(u,c,g)=>{t.ed(Number(u),Number(c),Number(g))},1004761:()=>typeof wasmOffsetConverter<"u",1004818:u=>{t.$b("Abs",u,void 0)},1004869:u=>{t.$b("Neg",u,void 0)},1004920:u=>{t.$b("Floor",u,void 0)},1004973:u=>{t.$b("Ceil",u,void 0)},1005025:u=>{t.$b("Reciprocal",u,void 0)},1005083:u=>{t.$b("Sqrt",u,void 0)},1005135:u=>{t.$b("Exp",u,void 0)},1005186:u=>{t.$b("Erf",u,void 0)},1005237:u=>{t.$b("Sigmoid",u,void 0)},1005292:(u,c,g)=>{t.$b("HardSigmoid",u,{alpha:c,beta:g})},1005371:u=>{t.$b("Log",u,void 0)},1005422:u=>{t.$b("Sin",u,void 0)},1005473:u=>{t.$b("Cos",u,void 0)},1005524:u=>{t.$b("Tan",u,void 0)},1005575:u=>{t.$b("Asin",u,void 0)},1005627:u=>{t.$b("Acos",u,void 0)},1005679:u=>{t.$b("Atan",u,void 0)},1005731:u=>{t.$b("Sinh",u,void 0)},1005783:u=>{t.$b("Cosh",u,void 0)},1005835:u=>{t.$b("Asinh",u,void 0)},1005888:u=>{t.$b("Acosh",u,void 0)},1005941:u=>{t.$b("Atanh",u,void 0)},1005994:u=>{t.$b("Tanh",u,void 0)},1006046:u=>{t.$b("Not",u,void 0)},1006097:(u,c,g)=>{t.$b("Clip",u,{min:c,max:g})},1006166:u=>{t.$b("Clip",u,void 0)},1006218:(u,c)=>{t.$b("Elu",u,{alpha:c})},1006276:u=>{t.$b("Gelu",u,void 0)},1006328:u=>{t.$b("Relu",u,void 0)},1006380:(u,c)=>{t.$b("LeakyRelu",u,{alpha:c})},1006444:(u,c)=>{t.$b("ThresholdedRelu",u,{alpha:c})},1006514:(u,c)=>{t.$b("Cast",u,{to:c})},1006572:u=>{t.$b("Add",u,void 0)},1006623:u=>{t.$b("Sub",u,void 0)},1006674:u=>{t.$b("Mul",u,void 0)},1006725:u=>{t.$b("Div",u,void 0)},1006776:u=>{t.$b("Pow",u,void 0)},1006827:u=>{t.$b("Equal",u,void 0)},1006880:u=>{t.$b("Greater",u,void 0)},1006935:u=>{t.$b("GreaterOrEqual",u,void 0)},1006997:u=>{t.$b("Less",u,void 0)},1007049:u=>{t.$b("LessOrEqual",u,void 0)},1007108:(u,c,g,h,v)=>{t.$b("ReduceMean",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1007283:(u,c,g,h,v)=>{t.$b("ReduceMax",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1007457:(u,c,g,h,v)=>{t.$b("ReduceMin",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1007631:(u,c,g,h,v)=>{t.$b("ReduceProd",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1007806:(u,c,g,h,v)=>{t.$b("ReduceSum",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1007980:(u,c,g,h,v)=>{t.$b("ReduceL1",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1008153:(u,c,g,h,v)=>{t.$b("ReduceL2",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1008326:(u,c,g,h,v)=>{t.$b("ReduceLogSum",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1008503:(u,c,g,h,v)=>{t.$b("ReduceSumSquare",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1008683:(u,c,g,h,v)=>{t.$b("ReduceLogSumExp",u,{keepDims:!!c,noopWithEmptyAxes:!!g,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1008863:u=>{t.$b("Where",u,void 0)},1008916:(u,c,g)=>{t.$b("Transpose",u,{perm:c?Array.from((x(),R).subarray(Number(c)>>>0,Number(g)>>>0)):[]})},1009040:(u,c,g,h)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Te(g),format:h?"NHWC":"NCHW"})},1009173:(u,c,g,h)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Te(g),format:h?"NHWC":"NCHW"})},1009306:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e,$t)=>{t.$b("ConvTranspose",u,{format:V?"NHWC":"NCHW",autoPad:c,dilations:[g],group:h,kernelShape:[v],pads:[E,A],strides:[N],wIsConst:()=>!!(x(),P)[q>>>0],outputPadding:se?Array.from((x(),R).subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:ye?Array.from((x(),R).subarray(Number(ye)>>>0,Number(_e)>>>0)):[],activation:Te($t)})},1009739:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("ConvTranspose",u,{format:N?"NHWC":"NCHW",autoPad:c,dilations:Array.from((x(),R).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:h,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((x(),R).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),R).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),P)[V>>>0],outputPadding:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[],activation:Te(_e)})},1010400:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e,$t)=>{t.$b("ConvTranspose",u,{format:V?"NHWC":"NCHW",autoPad:c,dilations:[g],group:h,kernelShape:[v],pads:[E,A],strides:[N],wIsConst:()=>!!(x(),P)[q>>>0],outputPadding:se?Array.from((x(),R).subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:ye?Array.from((x(),R).subarray(Number(ye)>>>0,Number(_e)>>>0)):[],activation:Te($t)})},1010833:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("ConvTranspose",u,{format:N?"NHWC":"NCHW",autoPad:c,dilations:Array.from((x(),R).subarray(Number(g)>>>0,(Number(g)>>>0)+2>>>0)),group:h,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,(Number(v)>>>0)+2>>>0)),pads:Array.from((x(),R).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((x(),R).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),P)[V>>>0],outputPadding:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[],activation:Te(_e)})},1011494:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1011585:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("AveragePool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:N?Array.from((x(),R).subarray(Number(N)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1012064:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1012155:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("AveragePool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:N?Array.from((x(),R).subarray(Number(N)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1012634:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1012721:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("MaxPool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:N?Array.from((x(),R).subarray(Number(N)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1013196:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1013283:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e)=>{t.$b("MaxPool",u,{format:_e?"NHWC":"NCHW",auto_pad:c,ceil_mode:g,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:N?Array.from((x(),R).subarray(Number(N)>>>0,Number(V)>>>0)):[],pads:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(ye)>>>0)):[]})},1013758:(u,c,g,h,v)=>{t.$b("Gemm",u,{alpha:c,beta:g,transA:h,transB:v})},1013862:u=>{t.$b("MatMul",u,void 0)},1013916:(u,c,g,h)=>{t.$b("ArgMax",u,{keepDims:!!c,selectLastIndex:!!g,axis:h})},1014024:(u,c,g,h)=>{t.$b("ArgMin",u,{keepDims:!!c,selectLastIndex:!!g,axis:h})},1014132:(u,c)=>{t.$b("Softmax",u,{axis:c})},1014195:(u,c)=>{t.$b("Concat",u,{axis:c})},1014255:(u,c,g,h,v)=>{t.$b("Split",u,{axis:c,numOutputs:g,splitSizes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1014411:u=>{t.$b("Expand",u,void 0)},1014465:(u,c)=>{t.$b("Gather",u,{axis:Number(c)})},1014536:(u,c)=>{t.$b("GatherElements",u,{axis:Number(c)})},1014615:(u,c)=>{t.$b("GatherND",u,{batch_dims:Number(c)})},1014694:(u,c,g,h,v,E,A,N,V,q,se)=>{t.$b("Resize",u,{antialias:c,axes:g?Array.from((x(),R).subarray(Number(g)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Te(v),cubicCoeffA:E,excludeOutside:A,extrapolationValue:N,keepAspectRatioPolicy:Te(V),mode:Te(q),nearestMode:Te(se)})},1015056:(u,c,g,h,v,E,A)=>{t.$b("Slice",u,{starts:c?Array.from((x(),R).subarray(Number(c)>>>0,Number(g)>>>0)):[],ends:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[],axes:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[]})},1015320:u=>{t.$b("Tile",u,void 0)},1015372:(u,c,g)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:g?"NHWC":"NCHW"})},1015486:(u,c,g)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:g?"NHWC":"NCHW"})},1015600:u=>{t.$b("Range",u,void 0)},1015653:(u,c)=>{t.$b("Einsum",u,{equation:Te(c)})},1015734:(u,c,g,h,v)=>{t.$b("Pad",u,{mode:c,value:g,pads:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},1015877:(u,c,g,h,v,E)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:g,spatial:!!v,trainingMode:!!h,format:E?"NHWC":"NCHW"})},1016046:(u,c,g,h,v,E)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:g,spatial:!!v,trainingMode:!!h,format:E?"NHWC":"NCHW"})},1016215:(u,c,g)=>{t.$b("CumSum",u,{exclusive:Number(c),reverse:Number(g)})},1016312:(u,c,g)=>{t.$b("DequantizeLinear",u,{axis:c,blockSize:g})},1016402:(u,c,g,h,v)=>{t.$b("GridSample",u,{align_corners:c,mode:Te(g),padding_mode:Te(h),format:v?"NHWC":"NCHW"})},1016572:(u,c,g,h,v)=>{t.$b("GridSample",u,{align_corners:c,mode:Te(g),padding_mode:Te(h),format:v?"NHWC":"NCHW"})},1016742:(u,c)=>{t.$b("ScatterND",u,{reduction:Te(c)})},1016827:(u,c,g,h,v,E,A,N,V)=>{t.$b("Attention",u,{numHeads:c,isUnidirectional:g,maskFilterValue:h,scale:v,doRotary:E,qkvHiddenSizes:A?Array.from((x(),R).subarray(Number(N)>>>0,Number(N)+A>>>0)):[],pastPresentShareBuffer:!!V})},1017099:u=>{t.$b("BiasAdd",u,void 0)},1017154:u=>{t.$b("BiasSplitGelu",u,void 0)},1017215:u=>{t.$b("FastGelu",u,void 0)},1017271:(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e,$t,nr)=>{t.$b("Conv",u,{format:pe?"NHWC":"NCHW",auto_pad:c,dilations:g?Array.from((x(),R).subarray(Number(g)>>>0,Number(h)>>>0)):[],group:v,kernel_shape:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(A)>>>0)):[],pads:N?Array.from((x(),R).subarray(Number(N)>>>0,Number(V)>>>0)):[],strides:q?Array.from((x(),R).subarray(Number(q)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!(x(),P)[Number(ye)>>>0],activation:Te(_e),activation_params:$t?Array.from((x(),F).subarray(Number($t)>>>0,Number(nr)>>>0)):[]})},1017855:u=>{t.$b("Gelu",u,void 0)},1017907:(u,c,g,h,v,E,A,N,V)=>{t.$b("GroupQueryAttention",u,{numHeads:c,kvNumHeads:g,scale:h,softcap:v,doRotary:E,rotaryInterleaved:A,smoothSoftmax:N,localWindowSize:V})},1018124:(u,c,g,h)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:g,simplified:!!h})},1018235:(u,c,g,h)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:g,simplified:!!h})},1018346:(u,c,g,h,v,E)=>{t.$b("MatMulNBits",u,{k:c,n:g,accuracyLevel:h,bits:v,blockSize:E})},1018473:(u,c,g,h,v,E)=>{t.$b("MultiHeadAttention",u,{numHeads:c,isUnidirectional:g,maskFilterValue:h,scale:v,doRotary:E})},1018632:(u,c)=>{t.$b("QuickGelu",u,{alpha:c})},1018696:(u,c,g,h,v)=>{t.$b("RotaryEmbedding",u,{interleaved:!!c,numHeads:g,rotaryEmbeddingDim:h,scale:v})},1018835:(u,c,g)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!g})},1018937:(u,c,g)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!g})},1019039:(u,c,g,h)=>{t.$b("GatherBlockQuantized",u,{gatherAxis:c,quantizeAxis:g,blockSize:h})},1019160:u=>{t.Fd(u)},1019194:(u,c)=>t.Hd(Number(u),Number(c),t.Yc.Kd,t.Yc.errors)};function n0(u,c,g){return qs(async()=>{await t.Dd(Number(u),Number(c),Number(g))})}function a0(){return typeof wasmOffsetConverter<"u"}function r0(u,c,g,h){var v=ue();try{return So(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function i0(u,c,g){var h=ue();try{return vo(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;le(1,0)}}function s0(u){var c=ue();try{wo(u)}catch(g){if(oe(c),g!==g+0)throw g;le(1,0)}}function o0(u,c){var g=ue();try{return er(u,c)}catch(h){if(oe(g),h!==h+0)throw h;le(1,0)}}function u0(u,c,g){var h=ue();try{yo(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;le(1,0)}}function l0(u,c){var g=ue();try{To(u,c)}catch(h){if(oe(g),h!==h+0)throw h;le(1,0)}}function d0(u,c,g,h,v,E,A){var N=ue();try{return xo(u,c,g,h,v,E,A)}catch(V){if(oe(N),V!==V+0)throw V;le(1,0)}}function c0(u,c,g,h,v,E){var A=ue();try{_o(u,c,g,h,v,E)}catch(N){if(oe(A),N!==N+0)throw N;le(1,0)}}function p0(u,c,g,h){var v=ue();try{ko(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function f0(u,c,g,h,v){var E=ue();try{bo(u,c,g,h,v)}catch(A){if(oe(E),A!==A+0)throw A;le(1,0)}}function h0(u,c,g,h,v,E,A){var N=ue();try{Io(u,c,g,h,v,E,A)}catch(V){if(oe(N),V!==V+0)throw V;le(1,0)}}function m0(u,c,g,h,v,E,A){var N=ue();try{Co(u,c,g,h,v,E,A)}catch(V){if(oe(N),V!==V+0)throw V;le(1,0)}}function g0(u,c,g,h,v,E,A,N){var V=ue();try{Ro(u,c,g,h,v,E,A,N)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function y0(u,c,g,h,v){var E=ue();try{return Eo(u,c,g,h,v)}catch(A){if(oe(E),A!==A+0)throw A;le(1,0)}}function w0(u,c,g){var h=ue();try{return No(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;le(1,0)}}function _0(u,c,g,h,v,E,A,N){var V=ue();try{Bo(u,c,g,h,v,E,A,N)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function b0(u,c,g,h,v,E,A,N,V,q,se,pe){var ye=ue();try{Ao(u,c,g,h,v,E,A,N,V,q,se,pe)}catch(_e){if(oe(ye),_e!==_e+0)throw _e;le(1,0)}}function v0(u,c,g,h,v,E){var A=ue();try{return zo(u,c,g,h,v,E)}catch(N){if(oe(A),N!==N+0)throw N;le(1,0)}}function $0(u,c,g){var h=ue();try{return Mo(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;return le(1,0),0n}}function x0(u,c,g,h,v,E,A,N,V){var q=ue();try{$o(u,c,g,h,v,E,A,N,V)}catch(se){if(oe(q),se!==se+0)throw se;le(1,0)}}function k0(u){var c=ue();try{return Do(u)}catch(g){if(oe(c),g!==g+0)throw g;le(1,0)}}function S0(u,c){var g=ue();try{return Jo(u,c)}catch(h){if(oe(g),h!==h+0)throw h;return le(1,0),0n}}function T0(u){var c=ue();try{return Uo(u)}catch(g){if(oe(c),g!==g+0)throw g;return le(1,0),0n}}function E0(u,c,g,h){var v=ue();try{return Fo(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function I0(u,c,g,h,v){var E=ue();try{return Go(u,c,g,h,v)}catch(A){if(oe(E),A!==A+0)throw A;le(1,0)}}function C0(u,c,g,h,v,E){var A=ue();try{return Ho(u,c,g,h,v,E)}catch(N){if(oe(A),N!==N+0)throw N;le(1,0)}}function A0(u,c,g,h,v,E){var A=ue();try{return jo(u,c,g,h,v,E)}catch(N){if(oe(A),N!==N+0)throw N;le(1,0)}}function z0(u,c,g,h,v,E,A,N){var V=ue();try{return Oo(u,c,g,h,v,E,A,N)}catch(q){if(oe(V),q!==q+0)throw q;le(1,0)}}function O0(u,c,g,h,v){var E=ue();try{return Ko(u,c,g,h,v)}catch(A){if(oe(E),A!==A+0)throw A;return le(1,0),0n}}function R0(u,c,g,h){var v=ue();try{return Xo(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function N0(u,c,g,h){var v=ue();try{return Yo(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function B0(u,c,g,h,v,E,A,N,V,q,se,pe){var ye=ue();try{return Zo(u,c,g,h,v,E,A,N,V,q,se,pe)}catch(_e){if(oe(ye),_e!==_e+0)throw _e;le(1,0)}}function M0(u,c,g,h,v,E,A,N,V,q,se){var pe=ue();try{qo(u,c,g,h,v,E,A,N,V,q,se)}catch(ye){if(oe(pe),ye!==ye+0)throw ye;le(1,0)}}function D0(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e,$t,nr){var V0=ue();try{Wo(u,c,g,h,v,E,A,N,V,q,se,pe,ye,_e,$t,nr)}catch(ar){if(oe(V0),ar!==ar+0)throw ar;le(1,0)}}function U0(u,c,g){var h=ue();try{return Po(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;le(1,0)}}function P0(u,c,g){var h=ue();try{return Lo(u,c,g)}catch(v){if(oe(h),v!==v+0)throw v;le(1,0)}}function L0(u,c,g,h){var v=ue();try{Vo(u,c,g,h)}catch(E){if(oe(v),E!==E+0)throw E;le(1,0)}}function Jn(){if(0<ve)Ne=Jn;else if(r)_?.(t),Z();else{for(var u=ge;0<u.length;)u.shift()(t);0<ve?Ne=Jn:(t.calledRun=!0,C||(Z(),_?.(t)))}}return r||(pt=await ze(),Jn()),t.PTR_SIZE=4,U?t:new Promise((u,c)=>{_=u,k=c})}var Yp,su,vw=L(()=>{Yp=iu,su=globalThis.self?.name?.startsWith("em-pthread"),su&&iu()}),dr,ci,ou,Pe,Zp,ta,uu,lu,cr,du,pr,Jp,fr,Qp,Mi=L(()=>{Bi(),dr=typeof location>"u"?void 0:location.origin,ci=import.meta.url>"file:"&&import.meta.url<"file;",ou=()=>{{if(ci){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,dr).href}return import.meta.url}},Pe=ou(),Zp=()=>{if(Pe&&!Pe.startsWith("blob:"))return Pe.substring(0,Pe.lastIndexOf("/")+1)},ta=(e,t)=>{try{let n=t??Pe;return(n?new URL(e,n):new URL(e)).origin===dr}catch{return!1}},uu=(e,t)=>{let n=t??Pe;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},lu=(e,t)=>`${t??"./"}${e}`,cr=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},du=async e=>(await import(e)).default,pr=(bw(),Nn(jp)).default,Jp=async()=>{if(!Pe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(ta(Pe))return[void 0,pr()];let e=await cr(Pe);return[e,pr(e)]},fr=(vw(),Nn(Xp)).default,Qp=async(e,t,n,a)=>{let r=fr&&!(e||t);if(r)if(Pe)r=ta(Pe)||a&&!n;else if(a&&!n)r=!0;else throw new Error("cannot determine the script source URL.");if(r)return[void 0,fr];{let i="ort-wasm-simd-threaded.jsep.mjs",s=e??uu(i,t),o=n&&s&&!ta(s,t),l=o?await cr(s):s??lu(i,t);return[o?l:void 0,await du(l)]}}}),hr,na,yn,mr,cu,pu,fu,Di,we,Yt=L(()=>{Mi(),na=!1,yn=!1,mr=!1,cu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},pu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},fu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Di=async e=>{if(na)return Promise.resolve();if(yn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(mr)throw new Error("previous call to 'initializeWebAssembly()' failed.");yn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!fu())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!pu())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let a=cu();n>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let r=e.wasmPaths,i=typeof r=="string"?r:void 0,s=r?.mjs,o=s?.href??s,l=r?.wasm,d=l?.href??l,p=e.wasmBinary,[f,m]=await Qp(o,i,n>1,!!p||!!d),y=!1,w=[];if(t>0&&w.push(new Promise(_=>{setTimeout(()=>{y=!0,_()},t)})),w.push(new Promise((_,k)=>{let $={numThreads:n};if(p)$.wasmBinary=p,$.locateFile=b=>b;else if(d||i)$.locateFile=b=>d??i+b;else if(o&&o.indexOf("blob:")!==0)$.locateFile=b=>new URL(b,o).href;else if(f){let b=Zp();b&&($.locateFile=T=>b+T)}m($).then(b=>{yn=!1,na=!0,hr=b,_(),f&&URL.revokeObjectURL(f)},b=>{yn=!1,mr=!0,k(b)})})),await Promise.race(w),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},we=()=>{if(na&&hr)return hr;throw new Error("WebAssembly is not initialized yet.")}}),et,va,me,Ui=L(()=>{Yt(),et=(e,t)=>{let n=we(),a=n.lengthBytesUTF8(e)+1,r=n._malloc(a);return n.stringToUTF8(e,r,a),t.push(r),r},va=(e,t,n,a)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([r,i])=>{let s=t?t+r:r;if(typeof i=="object")va(i,s+".",n,a);else if(typeof i=="string"||typeof i=="number")a(s,i.toString());else if(typeof i=="boolean")a(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},me=e=>{let t=we(),n=t.stackSave();try{let a=t.PTR_SIZE,r=t.stackAlloc(2*a);t._OrtGetLastError(r,r+a);let i=Number(t.getValue(r,a===4?"i32":"i64")),s=t.getValue(r+a,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),ef,$w=L(()=>{Yt(),Ui(),ef=e=>{let t=we(),n=0,a=[],r=e||{};try{if(e?.logSeverityLevel===void 0)r.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)r.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(r.terminate=!1);let i=0;return e?.tag!==void 0&&(i=et(e.tag,a)),n=t._OrtCreateRunOptions(r.logSeverityLevel,r.logVerbosityLevel,!!r.terminate,i),n===0&&me("Can't create run options."),e?.extra!==void 0&&va(e.extra,"",new WeakSet,(s,o)=>{let l=et(s,a),d=et(o,a);t._OrtAddRunConfigEntry(n,l,d)!==0&&me(`Can't set a run config entry: ${s} - ${o}.`)}),[n,a]}catch(i){throw n!==0&&t._OrtReleaseRunOptions(n),a.forEach(s=>t._free(s)),i}}}),hu,mu,gu,Bt,yu,tf,xw=L(()=>{Yt(),Ui(),hu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},mu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},gu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Bt=(e,t,n,a)=>{let r=et(t,a),i=et(n,a);we()._OrtAddSessionConfigEntry(e,r,i)!==0&&me(`Can't set a session config entry: ${t} - ${n}.`)},yu=async(e,t,n)=>{let a=t.executionProviders;for(let r of a){let i=typeof r=="string"?r:r.name,s=[];switch(i){case"webnn":if(i="WEBNN",Bt(e,"session.disable_quant_qdq","1",n),Bt(e,"session.disable_qdq_constant_folding","1",n),typeof r!="string"){let f=r?.deviceType;f&&Bt(e,"deviceType",f,n)}break;case"webgpu":if(i="JS",typeof r!="string"){let f=r;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Bt(e,"preferredLayout",f.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let o=et(i,n),l=s.length,d=0,p=0;if(l>0){d=we()._malloc(l*we().PTR_SIZE),n.push(d),p=we()._malloc(l*we().PTR_SIZE),n.push(p);for(let f=0;f<l;f++)we().setValue(d+f*we().PTR_SIZE,s[f][0],"*"),we().setValue(p+f*we().PTR_SIZE,s[f][1],"*")}await we()._OrtAppendExecutionProvider(e,o,d,p,l)!==0&&me(`Can't append execution provider: ${i}.`)}},tf=async e=>{let t=we(),n=0,a=[],r=e||{};gu(r);try{let i=hu(r.graphOptimizationLevel??"all"),s=mu(r.executionMode??"sequential"),o=typeof r.logId=="string"?et(r.logId,a):0,l=r.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=r.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let p=typeof r.optimizedModelFilePath=="string"?et(r.optimizedModelFilePath,a):0;if(n=t._OrtCreateSessionOptions(i,!!r.enableCpuMemArena,!!r.enableMemPattern,s,!!r.enableProfiling,0,o,l,d,p),n===0&&me("Can't create session options."),r.executionProviders&&await yu(n,r,a),r.enableGraphCapture!==void 0){if(typeof r.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);Bt(n,"enableGraphCapture",r.enableGraphCapture.toString(),a)}if(r.freeDimensionOverrides)for(let[f,m]of Object.entries(r.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let y=et(f,a);t._OrtAddFreeDimensionOverride(n,y,m)!==0&&me(`Can't set a free dimension override: ${f} - ${m}.`)}return r.extra!==void 0&&va(r.extra,"",new WeakSet,(f,m)=>{Bt(n,f,m,a)}),[n,a]}catch(i){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&me("Can't release session options."),a.forEach(s=>t._free(s)),i}}}),qt,ht,Wt,za,$a,Pi,Li,pi,te=L(()=>{qt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ht=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a=typeof t=="number"?t:t.reduce((r,i)=>r*i,1);return n>0?Math.ceil(a*n):void 0},za=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},$a=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Pi=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Li=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",pi=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Vi,nf=L(()=>{Bi(),Vi=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),a=n?parseInt(n,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let r=t.body.getReader(),i;try{i=new ArrayBuffer(a)}catch(o){if(o instanceof RangeError){let l=Math.ceil(a/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let s=0;for(;;){let{done:o,value:l}=await r.read();if(o)break;let d=l.byteLength;new Uint8Array(i,s,d).set(l),s+=d}return new Uint8Array(i,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),wu,_u,bu,vu,qi,$u,de,yt=L(()=>{te(),wu=["V","I","W","E","F"],_u=(e,t)=>{console.log(`[${wu[e]},${new Date().toISOString()}]${t}`)},qi=(e,t)=>{bu=e,vu=t},$u=(e,t)=>{let n=$a(e),a=$a(bu);n>=a&&_u(n,typeof t=="function"?t():t)},de=(...e)=>{vu&&$u(...e)}}),xu,sn,O,xa,af,rf,sf,ae=L(()=>{xu=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},sn=class{static calcShape(e,t,n=!1){let a=e.length,r=t.length;if(a===0)return t;if(r===0)return e;let i=Math.max(e.length,t.length),s=new Array(i);if(n){if(a<2||r<2)return;let o=xu.calcMatMulShape([e[a-2],e[a-1]],[t[r-2],t[r-1]]);if(o===void 0)return;[s[i-2],s[i-1]]=o}for(let o=n?3:1;o<=i;o++){let l=a-o<0?1:e[a-o],d=r-o<0?1:t[r-o];if(l!==d&&l>1&&d>1)return;let p=Math.max(l,d);if(l&&d)s[i-o]=Math.max(l,d);else{if(p>1)return;s[i-o]=0}}return s}static isValidBroadcast(e,t){let n=e.length,a=t.length;if(n>a)return!1;for(let r=1;r<=n;r++)if(e[n-r]!==1&&e[n-r]!==t[a-r])return!1;return!0}},O=class ma{static size(t){return ma.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let a=t.length;if(a===0)return[];let r=new Array(a),i=a-1;for(;i>=0;){if(t[i]%n===0){r[i]=t[i]/n;break}if(n%t[i]!==0)throw new Error("cannot convert shape");r[i]=1,n/=t[i],i--}for(i--;i>=0;i--)r[i]=t[i];return r}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ma.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ma.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,a){let r=1;for(let i=n;i<a;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");r*=Number(t[i])}return r}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let a=new Array(n);a[n-1]=1,a[n-2]=t[n-1];for(let r=n-3;r>=0;--r)a[r]=a[r+1]*t[r+1];return a}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(a=>this.normalizeAxis(a,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(a=>t[a]):t.slice().reverse()}static padShape(t,n){let a=t.length;return t.map((r,i)=>r+n[i]+n[i+a])}static areEqual(t,n){return t.length!==n.length?!1:t.every((a,r)=>a===n[r])}},xa=class Cn{static adjustPoolAttributes(t,n,a,r,i,s){if(!t&&a.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<n.length-2;o++)o>=a.length?a.push(n[o+2]):a[o]=n[o+2];for(let o=0;o<a.length;o++)if(o<r.length){if(r[o]<0)throw new Error("strides should be greater than or equal to 1")}else r.push(1);for(let o=0;o<a.length;o++)if(o<i.length){if(i[o]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let o=0;o<a.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<a.length;o++){if(a[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=a[o]||s[o+a.length]>=a[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,a,r,i,s,o){if(o){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)Cn.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],a[l],r[l],i,l,l+t.length-2,o)}}static computePoolOutputShape(t,n,a,r,i,s,o){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return Cn.computeShapeHelper(t,n,l,a,r,i,s,o),l}static computeConvOutputShape(t,n,a,r,i,s,o){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return Cn.computeShapeHelper(!1,t,l,a,r,i,s,o),l}static computeShapeHelper(t,n,a,r,i,s,o,l){if(t)for(let d=0;d<n.length-2;d++)a.push(1);else for(let d=0;d<n.length-2;d++)a.push(Cn.adjustPadAndReturnShape(n[d+2],r[d],i[d],s[d],o,d,d+n.length-2,l))}static adjustPadAndReturnShape(t,n,a,r,i,s,o,l){let d=a*(r-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[s]=0,i[o]=0,Math.floor((t-d)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+n-1)/n-1)*n+r-t;return i[s]=Math.floor(l==="SAME_LOWER"?(p+1)/2:p/2),i[o]=p-i[s],Math.floor((t+p-r)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[o]-d)/n+1)}},af=class{static getShapeOfGemmResult(e,t,n,a,r){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let i,s,o;t?(i=e[1],s=e[0]):(i=e[0],s=e[1]);let l=-1;if(a?(o=n[0],l=1):(o=n[1],l=0),n[l]!==s)throw new Error("dimension mismatch");if(i<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(r&&!sn.isValidBroadcast(r,[i,o]))throw new Error("gemm: invalid bias shape for broadcast");return[i,o,s]}},rf=-34028234663852886e22,sf=34028234663852886e22}),Wi,of=L(()=>{te(),Wi=(e,t)=>new(za(t))(e)}),gr,fi,yr,ku,wr,Su,_r,br,vr,Tu,uf,kw=L(()=>{te(),yt(),gr=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),fi=(e,t)=>{if(t==="int32")return e;let n=gr.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let a=n/8;if(e.byteLength%a!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let r=e.byteLength/a,i=new(za(t))(e.buffer,e.byteOffset,r);switch(t){case"int64":case"uint64":{let s=new Int32Array(r);for(let o=0;o<r;o++){let l=i[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&i.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(i,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},yr=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,a=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let r=BigInt64Array.from(a,BigInt);return new Uint8Array(r.buffer)}case"uint64":{if(a.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let r=BigUint64Array.from(a,BigInt);return new Uint8Array(r.buffer)}case"int8":{if(a.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let r=Int8Array.from(a,Number);return new Uint8Array(r.buffer)}case"uint8":{if(a.some(r=>r<0||r>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number)}case"uint32":{if(a.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let r=Uint32Array.from(a,Number);return new Uint8Array(r.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},ku=1,wr=()=>ku++,Su=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),_r=(e,t)=>{let n=gr.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((a,r)=>a*r)*n/8):0},br=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:a,dataType:r,shape:i,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=a,this.dataType=r,this.tensorShape=i,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return _r(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=yr(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((a,r)=>a===n[r])}setIsDataConverted(e){this.isDataConverted=e}},vr=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,a){let r=this.tensorManager.getMLContext(e),i=this.tensorManager.getMLOpSupportLimits(e),s;if(!i?.input.dataTypes.includes(t)){if(s=Su.get(t),!s||i?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(r,t,n))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==_r(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,o,!0,!0,s),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=fi(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?yr(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Tu=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=wr();return this.tensorTrackersById.set(e,new vr(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,a,r){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${a}, copyOld: ${r}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(e,n,a,r)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,a){let r=this.getMLContext(e),i=wr(),s=new br({sessionId:e,context:r,tensor:t,dataType:n,shape:a});return this.tensorTrackersById.set(i,new vr(this,s)),this.externalTensors.add(s),i}async getCachedTensor(e,t,n,a,r,i,s){let o=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(o,t,n)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}}`);let l=await o.createTensor({dataType:s??t,shape:n,dimensions:n,usage:a,writable:r,readable:i});return new br({sessionId:e,context:o,tensor:l,dataType:t,shape:n,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},uf=(...e)=>new Tu(...e)}),wn,Eu,lf,Sw=L(()=>{te(),Yt(),of(),kw(),yt(),wn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Eu=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),a=Object.keys(t).sort();return n.length===a.length&&n.every((r,i)=>r===a[i]&&e[r]===t[r])},lf=class{constructor(e){this.tensorManager=uf(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,qi(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(a=>a.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let a=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:a}),a}}else if(e===void 0){let n=this.mlContextCache.findIndex(a=>a.options===void 0&&a.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let t=this.mlContextCache.findIndex(n=>Eu(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let a=this.mlContextCache.findIndex(r=>r.mlContext===t);a!==-1&&this.mlContextCache.splice(a,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,a,r){let i=wn.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,i,a,r)}async createTemporaryTensor(e,t,n){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let a=wn.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);let r=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,r,a,n,!1);let i=this.temporarySessionTensorIds.get(e);return i?i.push(r):this.temporarySessionTensorIds.set(e,[r]),r}uploadTensor(e,t){if(!we().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Wi(n,t)}}registerMLTensor(e,t,n,a){let r=wn.get(n);if(!r)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(e,t,r,a);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${r}, dimensions: ${a}} -> {tensorId: ${i}}`),i}registerMLConstant(e,t,n,a,r,i,s=!1){if(!i)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=i.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+n).buffer,p;switch(r.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=typeof Float16Array<"u"?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":if(s){let f=fi(new Uint8Array(d),"int64");p=new Int32Array(f.buffer),r.dataType="int32"}else p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${r.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${r.dataType}, shape: ${r.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),a.constant(r,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let a=wn.get(qt(t)),r=this.mlOpSupportLimitsBySessionId.get(e);return typeof a>"u"?!1:n?!!r?.input.dataTypes.includes(a):!!r?.output.dataTypes.includes(a)}flush(){}}}),Fi=L(()=>{}),$r,aa,ra,Iu,Cu,xr,hi,Au,df,Tw=L(()=>{yt(),Fi(),$r=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),aa=[],ra=e=>Math.ceil(Number(e)/16)*16,Iu=e=>{for(let t=0;t<aa.length;t++){let n=aa[t];if(e<=n)return n}return Math.ceil(e/16)*16},Cu=1,xr=()=>Cu++,hi=async(e,t,n,a)=>{let r=ra(n),i=e.device.createBuffer({size:r,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,r),e.flush(),await i.mapAsync(GPUMapMode.READ);let o=i.getMappedRange();if(a){let l=a();return l.set(new Uint8Array(o,0,n)),l}else return new Uint8Array(o.slice(0,n))}finally{i.destroy()}},Au=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of $r)aa.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,a=t.byteOffset,r=t.byteLength,i=ra(r),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==r)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${r}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,a,r)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,s.gpuData.buffer,0,i),this.backend.device.queue.submit([d.finish()]),o.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let r=ra(n.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(n.gpuData.buffer,0,a.gpuData.buffer,0,r)}registerExternalBuffer(e,t,n){let a;if(n){if(a=n[0],e===n[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=xr();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Iu(e),a,r=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(r||i){let o=(r?this.freeBuffers:this.freeUniformBuffers).get(n);o?o.length>0?a=o.pop():a=this.backend.device.createBuffer({size:n,usage:t}):a=this.backend.device.createBuffer({size:n,usage:t})}else a=this.backend.device.createBuffer({size:n,usage:t});let s={id:xr(),type:0,buffer:a};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await hi(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=$r.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},df=(...e)=>new Au(...e)}),zu,he,Se=L(()=>{zu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new zu(e)}),on,ia,Ie,Re,X,ke,mi,rn,Ct,K,_n,B,H,cf,Gi,Ou,pf,re=L(()=>{te(),ae(),on=64,ia=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ie=(e,t=1)=>{let n=ia(e,t);return typeof n=="string"?n:n[0]},Re=(e,t=1)=>{let n=ia(e,t);return typeof n=="string"?n:n[1]},X=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:O.computeStrides(n)})}),t},ke=e=>e%4===0?4:e%2===0?2:1,mi=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,rn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Ct=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,a)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,_n=(e,t,n,a,r)=>{let i=typeof n=="number",s=i?n:n.length,o=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=ia(t,r),p=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],m={indices:l,value:p,storage:f,tensor:t},y=U=>typeof U=="string"?U:`${U}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",k=`${_}${e}_shape`,$=`${_}${e}_strides`,b="";for(let U=0;U<s-1;U++)b+=`
    let dim${U} = current / ${K($,U,s)};
    let rest${U} = current % ${K($,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;b+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=U=>(w.offsetToIndices=!0,s<2?U:`o2i_${e}(${U})`),I=[];if(s>=2)for(let U=s-1;U>=0;U--)I.push(`${K($,U,s)} * (indices[${U}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,z=U=>(w.indicesToOffset=!0,s<2?U:`i2o_${e}(${U})`),x=(...U)=>s===0?"0u":`${m.indices}(${U.map(y).join(",")})`,M=(U,J)=>s<2?`${U}`:`${K(U,J,s)}`,P=(U,J,Z)=>s<2?`${U}=${Z};`:`${K(U,J,s)}=${Z};`,Y={},G=(U,J)=>{w.broadcastedIndicesToOffset=!0;let Z=`${J.name}broadcastedIndicesTo${e}Offset`;if(Z in Y)return`${Z}(${U})`;let W=[];for(let Ee=s-1;Ee>=0;Ee--){let ze=J.indicesGet("outputIndices",Ee+J.rank-s);W.push(`${M($,Ee)} * (${ze} % ${M(k,Ee)})`)}return Y[Z]=`fn ${Z}(outputIndices: ${J.type.indices}) -> u32 {
             return ${W.length>0?W.join("+"):"0u"};
           }`,`${Z}(${U})`},j=(U,J)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${J};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${J}), select(0u, 0xFFFFFFFFu, ${J} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${J}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${J}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),R=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),D=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${p} {
    return ${R(`i2o_${e}(indices)`)};
  }`,F=s<2?"":(()=>{let U=o.map(Z=>`d${Z}: u32`).join(", "),J=o.map(Z=>`d${Z}`).join(", ");return`
  fn get_${e}(${U}) -> ${p} {
    return get_${e}ByIndices(${x(J)});
  }`})(),Q=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let J=U.map(y).join(",");return s===0?R("0u"):s===1?R(J[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${J})`)},ee=U=>s<2?R(U):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${U})`),ne=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${p}) {
    ${j(`i2o_${e}(indices)`,"value")}
  }`,ie=s<2?"":(()=>{let U=o.map(Z=>`d${Z}: u32`).join(", "),J=o.map(Z=>`d${Z}`).join(", ");return`
  fn set_${e}(${U}, value: ${p}) {
    set_${e}ByIndices(${x(J)}, value);
  }`})();return{impl:()=>{let U=[],J=!1;return w.offsetToIndices&&(U.push(T),J=!0),w.indicesToOffset&&(U.push(C),J=!0),w.broadcastedIndicesToOffset&&(Object.values(Y).forEach(Z=>U.push(Z)),J=!0),w.set&&(U.push(ie),J=!0),w.setByIndices&&(U.push(ne),J=!0),w.get&&(U.push(F),J=!0),w.getByIndices&&(U.push(D),J=!0),!i&&J&&U.unshift(`const ${k} = ${m.indices}(${n.join(",")});`,`const ${$} = ${m.indices}(${O.computeStrides(n).join(",")});`),U.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:z,broadcastedIndicesToOffset:G,indices:x,indicesGet:M,indicesSet:P,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let J=U[s];if(typeof J!="string")throw new Error("value must be string");let Z=U.slice(0,s).map(y).join(",");return s===0?j("0u",J):s===1?j(Z[0],J):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${Z}, ${J})`)},setByOffset:j,setByIndices:(U,J)=>s<2?j(U,J):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${J});`),get:Q,getByOffset:R,getByIndices:ee,usage:a,name:e,strides:$,shape:k,rank:s}},B=(e,t,n,a=1)=>_n(e,t,n,"input",a),H=(e,t,n,a=1)=>_n(e,t,n,"output",a),cf=(e,t,n)=>_n(e,t,n,"atomicOutput",1),Gi=(e,t,n,a=1)=>_n(e,t,n,"internal",a),Ou=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=on){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let r=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=r?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=r?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${a})
  fn main(${i}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",a=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:a}of this.uniforms)if(a&&a>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(a/4)}>`);else{let r=a==null||a===1?n:`vec${a}<${n}>`;e.push(`${t}:${r}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},pf=(e,t)=>new Ou(e,t)}),Ru,kr,Nu,Bu,Mu,Du,qe,ff,hf,zt=L(()=>{te(),ae(),Se(),re(),Ru=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},kr=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Nu=(e,t)=>O.sortBasedOnPerm(e,kr(e.length,t)),Bu=(e,t,n,a)=>{let r=`fn perm(i: ${a.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<t;++i)r+=`a[${e[i]}]=i[${i}];`;return r+="return a;}"},Mu=(e,t)=>{let n=[],a=[];for(let r=0;r<e.length;++r)e[r]!==1&&n.push(e[r]),e[t[r]]!==1&&a.push(t[r]);return{newShape:n,newPerm:a}},Du=(e,t)=>{let n=0;for(let a=0;a<e.length;++a)if(t[e[a]]!==1){if(e[a]<n)return!1;n=e[a]}return!0},qe=(e,t)=>{let n=e.dataType,a=e.dims.length,r=kr(a,t),i=Nu(e.dims,r),s=e.dims,o=i,l=a<2||Du(r,e.dims),d;if(l)return d=w=>{let _=B("input",n,s,4),k=H("output",n,o,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,k)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:d};let{newShape:p,newPerm:f}=Mu(e.dims,r),m=O.areEqual(f,[2,3,1]),y=O.areEqual(f,[3,1,2]);if(p.length===2||m||y){s=m?[p[0],p[1]*p[2]]:y?[p[0]*p[1],p[2]]:p,o=[s[1],s[0]];let w=16;return d=_=>{let k=B("a",n,s.length),$=H("output",n,o.length);return`
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/w),y:Math.ceil(o[0]/w)},programUniforms:[{type:12,data:_},...X(s,o)]}},getShaderSource:d}}return d=w=>{let _=B("a",n,s.length),k=H("output",n,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,k)}

  ${Bu(r,a,_,k)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...X(s,o)]}},getShaderSource:d}},ff=(e,t)=>{Ru(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},hf=e=>he({perm:e.perm})}),Uu,Pu,Lu,Vu,qu,Wu,Fu,Gu,Hu,ju,Ke,mf,gf,yf,wf,_f,bf,vf,$f,xf,kf,Ew=L(()=>{te(),ae(),re(),Hi(),zt(),Uu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Pu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Lu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Vu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qu=(e,t)=>{let n=[];for(let a=t-e;a<t;++a)n.push(a);return n},Wu=(e,t)=>{let n=[],a=e.length;for(let i=0;i<a;i++)t.indexOf(i)===-1&&n.push(e[i]);let r=t.map(i=>e[i]);return[n,r]},Fu=(e,t)=>{let n=e.length+t.length,a=[],r=0;for(let i=0;i<n;i++)t.indexOf(i)===-1?a.push(e[r++]):a.push(1);return a},Gu=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Hu=(e,t)=>{let n=[];if(!Gu(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&n.push(a);e.forEach(a=>n.push(a))}return n},ju=(e,t,n,a,r,i,s)=>{let o=n[0].dims,l=O.size(i),d=O.size(s),p=B("_A",n[0].dataType,o),f=H("output",r,i),m=64;l===1&&(m=256);let y=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,w=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(p,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Lu[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${Uu[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Pu[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${a==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Vu[a]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},Ke=(e,t,n,a)=>{let r=e.inputs.length===1?n:gi(e.inputs,n),i=r.axes;i.length===0&&!r.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((y,w)=>w));let s=O.normalizeAxes(i,e.inputs[0].dims.length),o=s,l=e.inputs[0],d=Hu(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute(qe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=qu(o.length,l.dims.length));let[p,f]=Wu(l.dims,o),m=p;r.keepDims&&(m=Fu(p,s)),e.compute(ju(t,r.cacheKey,[l],a,e.inputs[0].dataType,m,f),{inputs:[l]})},mf=(e,t)=>{Ke(e,"ReduceMeanShared",t,"mean")},gf=(e,t)=>{Ke(e,"ReduceL1Shared",t,"l1")},yf=(e,t)=>{Ke(e,"ReduceL2Shared",t,"l2")},wf=(e,t)=>{Ke(e,"ReduceLogSumExpShared",t,"logSumExp")},_f=(e,t)=>{Ke(e,"ReduceMaxShared",t,"max")},bf=(e,t)=>{Ke(e,"ReduceMinShared",t,"min")},vf=(e,t)=>{Ke(e,"ReduceProdShared",t,"prod")},$f=(e,t)=>{Ke(e,"ReduceSumShared",t,"sum")},xf=(e,t)=>{Ke(e,"ReduceSumSquareShared",t,"sumSquare")},kf=(e,t)=>{Ke(e,"ReduceLogSumShared",t,"logSum")}}),Xe,Ku,ka,gi,Ye,Xu,Yu,Zu,Ju,Qu,el,tl,nl,al,rl,Ze,Sf,Tf,Ef,If,Cf,Af,zf,Of,Rf,Nf,Hi=L(()=>{te(),ae(),Se(),re(),Ew(),Xe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Ku=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ka=(e,t,n,a,r,i,s=!1,o=!1)=>{let l=[],d=n[0].dims,p=d.length,f=O.normalizeAxes(r,p),m=!o&&f.length===0;d.forEach((_,k)=>{m||f.indexOf(k)>=0?s&&l.push(1):l.push(_)});let y=l.length,w=O.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let k=[],$=B("_A",n[0].dataType,p),b=H("output",i,y),T=a($,b,f),S=T[2];for(let I=0,C=0;I<p;I++)m||f.indexOf(I)>=0?(s&&C++,S=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
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
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${S}
          ${T[3]}
          ${T.length===4?b.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...X(d,l)]})}},gi=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>n.push(Number(a))),he({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ye=(e,t,n,a)=>{let r=e.inputs,i=r.length===1?n:gi(r,n);e.compute(ka(t,{hint:i.cacheKey,inputDependencies:["rank"]},[r[0]],i.noopWithEmptyAxes&&i.axes.length===0?Ku:a,i.axes,r[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Xu=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceLogSum",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Yu=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceL1",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Zu=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceL2",t,(n,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Ju=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceLogSumExp",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Qu=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMax",t,(n,a,r)=>{let i=[];for(let s=0;s<n.rank;s++)(r.indexOf(s)>=0||r.length===0)&&i.push(n.indicesSet("input_indices",s,0));return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},el=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMean",t,(n,a,r)=>{let i=1;for(let s=0;s<n.rank;s++)(r.indexOf(s)>=0||r.length===0)&&(i*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${i});`]})},tl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceMin",t,(n,a,r)=>{let i=[];for(let s=0;s<n.rank;s++)(r.indexOf(s)>=0||r.length===0)&&i.push(`input_indices[${s}] = 0;`);return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},nl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceProd",t,(n,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},al=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceSum",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},rl=(e,t)=>{Xe(e.inputs),Ye(e,"ReduceSumSquare",t,(n,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Ze=(e,t,n)=>{if(t.length===0)return n;let a=1,r=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?a*=e[i]:r*=e[i];return r<32&&a>1024},Sf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?el(e,t):mf(e,t)},Tf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yu(e,t):gf(e,t)},Ef=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zu(e,t):yf(e,t)},If=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ju(e,t):wf(e,t)},Cf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qu(e,t):_f(e,t)},Af=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tl(e,t):bf(e,t)},zf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nl(e,t):vf(e,t)},Of=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?al(e,t):$f(e,t)},Rf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rl(e,t):xf(e,t)},Nf=(e,t)=>{Ze(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xu(e,t):kf(e,t)}}),Sr,Bf,Mf,yi,Iw=L(()=>{te(),Se(),Hi(),Sr=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Bf=(e,t)=>{Sr(e.inputs);let n=(a,r,i)=>{let s=[];for(let o=0;o<a.rank;o++)(i.indexOf(o)>=0||i.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};e.compute(ka("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Mf=(e,t)=>{Sr(e.inputs);let n=(a,r,i)=>{let s=[];for(let o=0;o<a.rank;o++)(i.indexOf(o)>=0||i.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};e.compute(ka("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},yi=e=>he(e)}),il,sa,sl,ol,ul,Bn,ll,Df,ji=L(()=>{te(),ae(),Fi(),re(),il=(e,t)=>{let n=e[0],a=e[1],r=e[2],i=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],d=n.dims[1],p=n.dims[2];if(r.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(r.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=r.dims[0]/3,m=f,y=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let w=d;if(f!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(r.dims[0]!==f+m+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(s){if(m!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=s.dims[3])}let k=w+_,$=-1,b=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:w,totalSequenceLength:k,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},sa=(e,t,n)=>t&&e?`
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
    `,sl=(e,t,n,a,r,i,s,o)=>{let l=ke(s?1:i),d=64,p=i/l;p<d&&(d=32);let f=Math.ceil(i/l/d),m=[{type:12,data:t},{type:12,data:n},{type:12,data:a},{type:12,data:r},{type:12,data:p},{type:12,data:f}],y=Ie(e.dataType,l),w=Re(1,l),_=["type"];s&&_.push("type"),o&&_.push("type");let k=$=>{let b=H("x",e.dataType,e.dims,l),T=[b],S=s?B("seq_lens",s.dataType,s.dims):void 0;S&&T.push(S);let I=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;I&&T.push(I);let C=Re(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(z).declareVariables(...T)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${sa(S,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${l}`,inputDependencies:_},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:r,z:t*n},programUniforms:m})}},ol=(e,t,n,a,r,i,s,o,l)=>{let d=s+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,d],f=e>1&&a,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,y=f?[i.batchSize,m,d,i.headSize]:void 0,w=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,k=ke(i.headSize),$=i.headSize/k,b=12,T={x:Math.ceil(d/b),y:Math.ceil(i.sequenceLength/b),z:i.batchSize*i.numHeads},S=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:w}],I=f&&a&&O.size(a.dims)>0,C=["type","type"];I&&C.push("type"),r&&C.push("type"),o&&C.push("type"),l&&C.push("type");let z=[{dims:p,dataType:t.dataType,gpuDataType:0}];f&&z.push({dims:y,dataType:t.dataType,gpuDataType:0});let x=M=>{let P=B("q",t.dataType,t.dims,k),Y=B("key",n.dataType,n.dims,k),G=[P,Y];if(I){let ne=B("past_key",a.dataType,a.dims,k);G.push(ne)}r&&G.push(B("attention_bias",r.dataType,r.dims));let j=o?B("seq_lens",o.dataType,o.dims):void 0;j&&G.push(j);let R=l?B("total_sequence_length_input",l.dataType,l.dims):void 0;R&&G.push(R);let D=H("output",t.dataType,p),F=[D];f&&F.push(H("present_key",t.dataType,y,k));let Q=Re(1,k),ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${P.type.storage}, ${b*b}>;
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
    ${sa(j,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Q}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${D.type.value} (sum * uniforms.alpha) + ${r?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${r!==void 0};${a!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:S}),getShaderSource:x}},ul=(e,t,n,a,r,i,s=void 0,o=void 0)=>{let l=i+r.kvSequenceLength,d=r.nReps?r.nReps:1,p=r.vHiddenSize*d,f=e>1&&a,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,y=f?[r.batchSize,m,l,r.headSize]:void 0,w=[r.batchSize,r.sequenceLength,p],_=12,k={x:Math.ceil(r.vHeadSize/_),y:Math.ceil(r.sequenceLength/_),z:r.batchSize*r.numHeads},$=[{type:12,data:r.sequenceLength},{type:12,data:l},{type:12,data:r.vHeadSize},{type:12,data:r.numHeads},{type:12,data:r.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:r.kvSequenceLength},{type:12,data:d}],b=f&&a&&O.size(a.dims)>0,T=["type","type"];b&&T.push("type"),s&&T.push("type"),o&&T.push("type");let S=[{dims:w,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=C=>{let z=B("probs",t.dataType,t.dims),x=B("v",n.dataType,n.dims),M=[z,x];b&&M.push(B("past_value",a.dataType,a.dims));let P=s?B("seq_lens",s.dataType,s.dims):void 0;s&&M.push(P);let Y=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;o&&M.push(Y);let G=[H("output",t.dataType,w)];f&&G.push(H("present_value",t.dataType,y));let j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
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
   ${sa(P,Y,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:S,dispatchGroup:k,programUniforms:$}),getShaderSource:I}},Bn=(e,t,n,a,r,i,s,o,l,d,p=void 0,f=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),y=m>1?s:void 0,w=m>1?o:void 0,_=m>1?d.pastSequenceLength:0,k=_+d.kvSequenceLength,$=l&&O.size(l.dims)>0?l:void 0,b=[t,n];y&&O.size(y.dims)>0&&b.push(y),$&&b.push($),p&&b.push(p),f&&b.push(f);let T=e.compute(ol(m,t,n,y,$,d,_,p,f),{inputs:b,outputs:m>1?[-1,1]:[-1]})[0];e.compute(sl(T,d.batchSize,d.numHeads,_,d.sequenceLength,k,p,f),{inputs:p&&f?[T,p,f]:[T],outputs:[]});let S=[T,a];w&&O.size(w.dims)>0&&S.push(w),p&&S.push(p),f&&S.push(f),e.compute(ul(m,T,a,w,d,_,p,f),{inputs:S,outputs:m>1?[0,2]:[0]})},ll=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,r=t.inputHiddenSize,i=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=f=>{let m=H("output_q",l[0].dataType,n),y=H("output_k",l[0].dataType,n),w=H("output_v",l[0].dataType,n),_=B("input",l[0].dataType,l[0].dims),k=B("weight",l[1].dataType,l[1].dims),$=B("bias",l[2].dataType,l[2].dims),b=_.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${f.registerUniforms(T).declareVariables(_,k,$,m,y,w)}
  ${f.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},Df=(e,t)=>{let n=il(e.inputs,t),[a,r,i]=ll(e,n);return Bn(e,a,r,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),dl,cl,pl,Uf,Cw=L(()=>{He(),te(),ae(),Se(),re(),dl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(a,r,i)=>{let s=r.length;if(s!==a.length)throw new Error(`${i}: num dimensions != ${s}`);r.forEach((o,l)=>{if(o!==a[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,a,"Invalid input scale"),n(e[2].dims,a,"Invalid input B"),n(e[3].dims,a,"Invalid input mean"),n(e[4].dims,a,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},cl=(e,t)=>{let{epsilon:n,spatial:a,format:r}=t,i=e[0].dims,s=a?ke(i[i.length-1]):1,o=r==="NHWC"&&i.length>1?s:1,l=O.size(i)/s,d=a,p=d?i.length:i,f=B("x",e[0].dataType,e[0].dims,s),m=B("scale",e[1].dataType,e[1].dims,o),y=B("bias",e[2].dataType,e[2].dims,o),w=B("inputMean",e[3].dataType,e[3].dims,o),_=B("inputVar",e[4].dataType,e[4].dims,o),k=H("y",e[0].dataType,p,s),$=()=>{let T="";if(a)T=`let cOffset = ${i.length===1?"0u":r==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(r==="NCHW")T=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let S=1;S<m.rank;S++)T+=`cIndices[${S}] = outputIndices[${S}];`;T+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return T},b=T=>`
  const epsilon = ${n};
  ${T.registerUniform("outputSize","u32").declareVariables(f,m,y,w,_,k)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...X(i)]:[{type:12,data:l}]})}},pl=e=>he(e),Uf=(e,t)=>{let{inputs:n,outputCount:a}=e,r=pl({...t,outputCount:a});if(be.webgpu.validateInputContent&&dl(n,r),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(cl(n,r))}}),fl,hl,Pf,Aw=L(()=>{ae(),re(),fl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},hl=e=>{let t=e[0].dims,n=e[0].dims[2],a=O.size(t)/4,r=e[0].dataType,i=B("input",r,t,4),s=B("bias",r,[n],4),o=B("residual",r,t,4),l=H("output",r,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(i,s,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Pf=e=>{fl(e.inputs),e.compute(hl(e.inputs))}}),ml,fe,Lf,Vf,qf,Wf,Ff,Gf,Hf,jf,Kf,gl,Xf,Yf,Zf,Jf,An,Qf,ga,eh,th,nh,ah,rh,ih,sh,oh,uh,lh,dh,ch,ph,fh,hh,mh,Tr,gh,wi,_i,yh,wh,_h,yl,wl,bh,Ki=L(()=>{te(),ae(),Se(),re(),ml=(e,t,n,a,r,i,s)=>{let o=Math.ceil(t/4),l="";typeof r=="string"?l=`${r}(a)`:l=r("a");let d=B("inputData",n,[o],4),p=H("outputData",a,[o],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(d,p)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},fe=(e,t,n,a,r,i=e.dataType,s,o)=>{let l=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:r,inputDependencies:["type"]},getShaderSource:d=>ml(d,O.size(e.dims),e.dataType,i,n,a,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(O.size(d[0].dims)/64/4)},programUniforms:l})}},Lf=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Vf=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},qf=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Wf=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Ff=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Gf=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},Hf=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},jf=e=>he(e),Kf=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},gl=e=>{let t,n,a=e.length>=2&&e[1].data!==0,r=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=a?e[1].getFloat32Array()[0]:-34028234663852886e22,n=r?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=a?e[1].getUint16Array()[0]:64511,n=r?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:n})},Xf=(e,t)=>{let n=t||gl(e.inputs),a=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",r=>`clamp(${r}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},Yf=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},Zf=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},Jf=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},An=e=>he(e),Qf=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ga=(e="f32")=>`
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
}`,eh=e=>{let t=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,ga(t)))},th=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},nh=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},ah=e=>{let t=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,ga(t)))},rh=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},ih=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},sh=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},oh=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},uh=e=>{let t=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},lh=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},dh=e=>he(e),ch=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",a=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${a} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},ph=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},fh=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},hh=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},mh=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},Tr=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,gh=e=>{e.compute(fe(e.inputs[0],"Tanh",Tr))},wi=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Tr("v")};
}
`,_i=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,yh=e=>{let t=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",_i,wi(t),void 0,e.inputs[0].dataType))},wh=(e,t)=>{let n=Re(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${n}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},_h=e=>{e.compute(fe(e.inputs[0],"Log","log"))},yl=(e,t)=>`
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
`,wl=e=>`quick_gelu_impl(${e})`,bh=(e,t)=>{let n=Re(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",wl,yl(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),_l,bl,vh,zw=L(()=>{ae(),re(),Ki(),_l=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},bl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=B("input",e[0].dataType,e[0].dims,4),a=B("bias",e[0].dataType,[e[0].dims[2]],4),r=H("output",e[0].dataType,t,4),i=O.size(t)/4,s=Ie(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(n,a,r)}

  ${ga(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${r.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},vh=e=>{_l(e.inputs),e.compute(bl(e.inputs))}}),vl,$l,Je,$h,xh,kh,Sh,Th,Eh,Ih,Ch,Ah,zh,Ow=L(()=>{te(),ae(),re(),vl=(e,t,n,a,r,i,s,o,l,d,p,f)=>{let m,y;typeof o=="string"?m=y=(b,T)=>`${o}((${b}),(${T}))`:typeof o=="function"?m=y=o:(m=o.scalar,y=o.vector);let w=H("outputData",p,a.length,4),_=B("aData",l,t.length,4),k=B("bData",d,n.length,4),$;if(r)if(i){let b=O.size(t)===1,T=O.size(n)===1,S=t.length>0&&t[t.length-1]%4===0,I=n.length>0&&n[n.length-1]%4===0;b||T?$=w.setByOffset("global_idx",y(b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),T?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):$=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",y(s||S?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=w.setByOffset("global_idx",y(_.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(T,S,I="")=>{let C=`aData[indexA${S}][componentA${S}]`,z=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${w.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${_.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let offsetB${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${T}[${S}] = ${I}(${m(C,z)});
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

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},$l=(e,t,n,a,r,i,s=n.dataType)=>{let o=n.dims.map(Number),l=a.dims.map(Number),d=!O.areEqual(o,l),p=o,f=O.size(o),m=!1,y=!1,w=[d];if(d){let _=sn.calcShape(o,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");p=_.slice(),f=O.size(p);let k=O.size(o)===1,$=O.size(l)===1,b=o.length>0&&o[o.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;w.push(k),w.push($),w.push(b),w.push(T);let S=1;for(let I=1;I<p.length;I++){let C=o[o.length-I],z=l[l.length-I];if(C===z)S*=C;else break}S%4===0?(y=!0,m=!0):(k||$||b||T)&&(m=!0)}else m=!0;return w.push(m),{name:e,shaderCache:{hint:t+w.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>vl(_,o,l,p,m,d,y,r,n.dataType,a.dataType,s,i),getRunData:()=>({outputs:[{dims:p,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(p)/4)},...X(o,l,p)]})}},Je=(e,t,n,a,r,i)=>{e.compute($l(t,r??"",e.inputs[0],e.inputs[1],n,a,i))},$h=e=>{Je(e,"Add",(t,n)=>`${t}+${n}`)},xh=e=>{Je(e,"Div",(t,n)=>`${t}/${n}`)},kh=e=>{Je(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Sh=e=>{Je(e,"Mul",(t,n)=>`${t}*${n}`)},Th=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Je(e,"Pow",{scalar:(n,a)=>`pow_custom(${n},${a})`,vector:(n,a)=>`pow_vector_custom(${n},${a})`},`
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
      `)},Eh=e=>{Je(e,"Sub",(t,n)=>`${t}-${n}`)},Ih=e=>{Je(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Ch=e=>{Je(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Ah=e=>{Je(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},zh=e=>{Je(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),xl,kl,Sl,Tl,Oh,Rh,Rw=L(()=>{te(),ae(),Se(),re(),xl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,a=e[n],r=a.dataType,i=a.dims.length;e.forEach((s,o)=>{if(o!==n){if(s.dataType!==r)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==a.dims[d])throw new Error("non concat dimensions must match")})}})},kl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Sl=(e,t)=>{let n=e.length,a=[];for(let r=0;r<n;++r){let i=t.setByOffset("global_idx",e[r].getByIndices("indices"));n===1?a.push(i):r===0?a.push(`if (inputIndex == ${r}u) { ${i} }`):r===n-1?a.push(`else { ${i} }`):a.push(`else if (inputIndex == ${r}) { ${i} }`)}return a.join(`
`)},Tl=(e,t,n,a)=>{let r=O.size(n),i=new Array(e.length),s=new Array(e.length),o=0,l=[],d=[],p=[{type:12,data:r}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],i[_]=o,d.push(e[_].dims.length),s[_]=B(`input${_}`,a,d[_]),l.push("rank"),p.push({type:12,data:i[_]});for(let _=0;_<e.length;++_)p.push(...X(e[_].dims));p.push(...X(n));let f=H("output",a,n.length),m=f.indicesGet("indices",t),y=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),w=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)_.registerUniform(`sizeInConcatAxis${k}`,"u32");return _.declareVariables(...s,f)})()}

  ${kl(i.length,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${y});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Sl(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p}),getShaderSource:w}},Oh=(e,t)=>{let n=e.inputs,a=n[0].dims,r=O.normalizeAxis(t.axis,a.length);xl(n,r);let i=a.slice();i[r]=n.reduce((o,l)=>o+(l.dims.length>r?l.dims[r]:0),0);let s=n.filter(o=>O.size(o.dims)>0);e.compute(Tl(s,r,i,n[0].dataType),{inputs:s})},Rh=e=>he({axis:e.axis})}),jt,Kt,Xt,Xi,Zt=L(()=>{te(),ae(),jt=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Kt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Xt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Xi=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,a]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:a}}else if(t==="Clip"){let[n,a]=e?.activation_params||[rf,sf];return{activation:t,clipMax:a,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ae,Nh,Yi=L(()=>{Ae=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Nh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Bh,Nw=L(()=>{Bh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Rn,Zi,Ji=L(()=>{te(),ae(),re(),Zt(),Rn=(e,t,n,a,r)=>{let i=a-n;return`
      ${Array.from({length:n}).map((s,o)=>`
      if (${K(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,K(r,o+i,a))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Zi=(e,t,n,a,r=!1,i)=>{let s=e[0].dims,o=e[1].dims,l=s[s.length-2],d=o[o.length-1],p=s[s.length-1],f=ke(d),m=ke(p),y=ke(l),w=O.size(n)/f/y,_=e.length>2,k=a?a.slice(0,-2):n.slice(0,-2),$=[O.size(k),l,d],b=[{type:12,data:w},{type:12,data:l},{type:12,data:d},{type:12,data:p}];Kt(t,b),b.push(...X(k,s,o)),_&&b.push(...X(e[2].dims)),b.push(...X($));let T=S=>{let I=Gi("batch_dims",e[0].dataType,k.length),C=B("a",e[0].dataType,s.length,m),z=B("b",e[1].dataType,o.length,f),x=H("output",e[0].dataType,$.length,f),M=Ie(x.type.tensor),P=jt(t,x.type.value,M),Y=[C,z],G="";if(_){let D=r?f:1;Y.push(B("bias",e[2].dataType,e[2].dims.length,D)),G=`${r?`value += bias[col / ${D}];`:`value += ${x.type.value}(bias[row + i]);`}`}let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Xt(t,j);let R=()=>{let D=`var a_data: ${C.type.value};`;for(let F=0;F<m;F++)D+=`
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${f}];`;for(let F=0;F<y;F++){D+=`a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${m}];`;for(let Q=0;Q<m;Q++)D+=`
            values[${F}] = fma(${z.type.value}(a_data${m===1?"":`[${Q}]`}), b_data${Q}, values[${F}]);
`}return D};return`
  ${S.registerUniforms(j).registerInternalVariables(I).declareVariables(...Y,x)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
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
      ${P}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${m};${y};${r}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:b}),getShaderSource:T}}}),El,Il,bi,Er,Cl,vi,Al,Sa,Qi=L(()=>{te(),ae(),re(),Zt(),Ji(),Yi(),El=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Il=(e,t)=>e?`
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
        }`,bi=(e,t,n="f32",a,r=!1,i=32,s=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=r?l:i,f=r?i:l,m=p/t[0],y=i/t[1];if(!((r&&m===4&&e[1]===4||!r&&(m===3||m===4))&&p%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${r} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${n}>, ${p/m}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(o/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${El(r,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Il(r,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Er=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Cl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",vi=(e,t,n="f32",a,r=!1,i=32,s=!1,o=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],f=r?d:i,m=r?i:d;if(!(m%t[1]===0&&f%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let y=m/t[1],w=f/t[0],_=i/t[1],k=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Er(r,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
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
          let ACached = ${r?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
      ${Er(r,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
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
      ${Cl(r)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${f}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${p}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Al=(e,t,n,a,r=!1)=>{let[i,s,o,l]=a,d=Ie(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ae(e,d)} {
      var value = ${Ae(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Rn("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ae(e,d)} {
      var value = ${Ae(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Rn("bIndices",o,o.rank-2,i.rank,"batchIndices")}
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
        ${t?`value = value + ${r?"bias[colIn]":`${Ae(e,d)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Sa=(e,t,n,a,r=!1,i)=>{let s=e[0].dims,o=e[1].dims,l=s.slice(0,-2),d=o.slice(0,-2),p=a?a.slice(0,-2):n.slice(0,-2),f=O.size(p),m=s[s.length-2],y=s[s.length-1],w=o[o.length-1],_=y%4===0&&w%4===0,k=m<=8?[4,1,1]:[4,4,1],$=[8,8,1],b=[Math.ceil(w/$[0]/k[0]),Math.ceil(m/$[1]/k[1]),Math.ceil(f/$[2]/k[2])],T=_?4:1,S=[...l,m,y/T],I=S.length,C=[...d,y,w/T],z=C.length,x=[f,m,w/T],M=[{type:6,data:m},{type:6,data:w},{type:6,data:y}];Kt(t,M),M.push(...X(p,S,C));let P=["rank","rank"],Y=e.length>2;Y&&(M.push(...X(e[2].dims)),P.push("rank")),M.push(...X(x));let G=j=>{let R=p.length,D=Gi("batchDims",e[0].dataType,R,1),F=Ie(e[0].dataType),Q=B("a",e[0].dataType,I,T),ee=B("b",e[1].dataType,z,T),ne=H("result",e[0].dataType,x.length,T),ie=[Q,ee];if(Y){let Ee=r?T:1;ie.push(B("bias",e[2].dataType,e[2].dims.length,Ee))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Xt(t,U);let J=Ie(ne.type.tensor),Z=jt(t,ne.type.value,J),W=Al(T,Y,Z,[D,Q,ee,ne],r);return`
  ${j.registerUniforms(U).registerInternalVariables(D).declareVariables(...ie,ne)}
  ${W}
  ${_?bi(k,$,F,D):vi(k,$,F,D)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${_};${r}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:M}),getShaderSource:G}}}),zl,Mh,Bw=L(()=>{te(),yt(),re(),Zt(),Yi(),Nw(),Qi(),zl=(e,t,n,a,r=!1,i,s=4,o=4,l=4,d="f32")=>{let p=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},f=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},m=e?`
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
    var resData = ${Ae(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(s)}
    }
    return resData;`,T=e?t&&a?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${Ae(s,d)}(0.0);`:a&&n?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${Ae(s,d)}(0.0);`,S=e?a&&n?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${Ae(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${Ae(o,d)}(0.0);`,I=Ae(l,d),C=Ae(e?s:o,d),z=Ae(e?o:s,d),x=jt(i,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?S:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${Nh(r)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Mh=(e,t,n,a,r,i,s,o,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],f=n[0],m=d?n[2]:n[3],y=d?n[1]:n[2],w=d?n[3]:n[1],_=d&&(p%4===0||p%3===0)&&w%4===0,k=d?w:m*y,$=d?m*y:w,b=[8,8,1],T=a<=8?[4,1,1]:[4,4,1],S=[Math.ceil(k/b[0]/T[0]),Math.ceil($/b[1]/T[1]),Math.ceil(f/b[2]/T[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let I=_?d&&p%4!==0?3:4:1,C=b[1]*T[1],z=b[0]*T[0],x=Math.max(b[0]*I,b[1]),M=a%C===0,P=r%z===0,Y=i%x===0,G=_?[I,4,4]:[1,1,1],j=[{type:6,data:a},{type:6,data:r},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Kt(t,j),j.push(...X(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(j.push(...X(e[2].dims)),R.push("rank")),j.push(...X(n));let D=F=>{let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Xt(t,Q);let ee=_?4:1,ne=Ie(e[0].dataType),ie=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${_?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,U=B("x",e[0].dataType,e[0].dims.length,I===3?1:I),J=B("w",e[1].dataType,e[1].dims.length,ee),Z=[U,J],W=H("result",e[0].dataType,n.length,ee);if(s){let Ee=B("bias",e[2].dataType,e[2].dims.length,ee);Z.push(Ee),ie+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${ne}>`:ne} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Bh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(Q).declareVariables(...Z,W)}
        ${ie}
        ${zl(d,M,P,Y,s,t,G[0],G[1],G[2],ne)}
        ${_?bi(T,b,ne,void 0,!d,x):vi(T,b,ne,void 0,!d,x,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${M};${P};${Y};${C};${z};${x}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:j}),getShaderSource:D}}}),Ol,Ir,bn,Rl,Cr,Nl,Dh,Uh,Mw=L(()=>{te(),yt(),ae(),re(),Zt(),Yi(),Ol=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ir=e=>typeof e=="number"?[e,e,e]:e,bn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Rl=(e,t,n,a=1)=>{let r=bn(t,a);return Math.floor((e[0]*(n-1)-n+r)/2)},Cr=(e,t,n,a,r)=>{r==null&&(r=Rl(e,t[0],a[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*r>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*r)/a[s]+1));return i},Nl=(e,t,n,a,r,i,s,o,l,d)=>{let p,f,m,y;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=Cr([t,n,a,1],[o,l,d],1,[r,i,s],e);f=w[0],m=w[1],y=w[2]}else if(Array.isArray(e)){if(!e.every((_,k,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=Cr([t,n,a,1],[o,l,d],1,[r,i,s],e[0]);f=w[0],m=w[1],y=w[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/r),m=Math.ceil(n/i),y=Math.ceil(a/s);let w=(f-1)*r+o-t,_=(m-1)*i+l-n,k=(y-1)*s+d-a,$=Math.floor(w/2),b=w-$,T=Math.floor(_/2),S=_-T,I=Math.floor(k/2),C=k-I;p={top:T,bottom:S,left:I,right:C,front:$,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:f,outHeight:m,outWidth:y}},Dh=(e,t,n,a,r,i=!1,s="channelsLast")=>{let o,l,d,p,f;if(s==="channelsLast")[o,l,d,p,f]=e;else if(s==="channelsFirst")[o,f,l,d,p]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,y,w,_]=t,[k,$,b]=Ir(n),[T,S,I]=Ir(a),C=bn(y,T),z=bn(w,S),x=bn(_,I),{padInfo:M,outDepth:P,outHeight:Y,outWidth:G}=Nl(r,l,d,p,k,$,b,C,z,x),j=i?m*f:m,R=[0,0,0,0,0];return s==="channelsFirst"?R=[o,j,P,Y,G]:s==="channelsLast"&&(R=[o,P,Y,G,j]),{batchSize:o,dataFormat:s,inDepth:l,inHeight:d,inWidth:p,inChannels:f,outDepth:P,outHeight:Y,outWidth:G,outChannels:j,padInfo:M,strideDepth:k,strideHeight:$,strideWidth:b,filterDepth:y,filterHeight:w,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:z,effectiveFilterWidth:x,dilationDepth:T,dilationHeight:S,dilationWidth:I,inShape:e,outShape:R,filterShape:t}},Uh=(e,t,n,a,r,i)=>{let s=i==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],l={x:n.map((k,$)=>$)},d=[Math.ceil(Ol(l.x.map(k=>n[k]))/o[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=1,f=O.size(n),m=[{type:12,data:f},{type:12,data:a},{type:12,data:r},{type:12,data:t.strides},{type:12,data:t.dilations}];Kt(t,m),m.push(...X(e[0].dims,e[1].dims));let y=["rank","rank"],w=e.length===3;w&&(m.push(...X(e[2].dims)),y.push("rank")),m.push(...X(n));let _=k=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:r.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Xt(t,$);let b=1,T=Ie(e[0].dataType),S=B("x",e[0].dataType,e[0].dims.length,p),I=B("W",e[1].dataType,e[1].dims.length,b),C=[S,I],z=H("result",e[0].dataType,n.length,b),x="";if(w){let Y=B("bias",e[2].dataType,e[2].dims.length,b);C.push(Y),x+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${T} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}];
        }`}let M=Ae(p,T),P=jt(t,M,T);return`
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
              let d2 = ${s?K("coords",S.rank-1,S.rank):K("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,S.rank):K("coords",2,S.rank)},
              ${s?K("coords",2,S.rank):K("coords",3,S.rank)},
              ${s?K("coords",3,S.rank):K("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,S.rank):K("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,S.rank):K("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,S.rank):K("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,S.rank):K("uniforms.x_shape",1,S.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${P}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${w}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:_}}}),Ph,Lh,Dw=L(()=>{te(),ae(),re(),Zt(),Ph=(e,t,n,a)=>{let r=e.length>2,i=r?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?n[3]:n[1],p=d/t.group,f=l&&p>=4?ke(d):1,m=O.size(n)/f,y=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Kt(t,y),y.push(...X(s,[o[0],o[1],o[2],o[3]/f]));let w=r?["rank","rank","rank"]:["rank","rank"];y.push(...X([n[0],n[1],n[2],n[3]/f]));let _=k=>{let $=H("output",e[0].dataType,n.length,f),b=Ie($.type.tensor),T=jt(t,$.type.value,b),S=B("x",e[0].dataType,s.length),I=B("w",e[1].dataType,o.length,f),C=[S,I];r&&C.push(B("b",e[2].dataType,e[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Xt(t,z);let x=l?`
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
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${x}
    ${i}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:_}},Lh=(e,t,n,a)=>{let r=e.length>2,i=ke(n[3]),s=ke(n[2]),o=O.size(n)/i/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],p=[n[0],n[1],n[2],n[3]/i],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Kt(t,f),f.push(...X(l,d,p));let m=(s-1)*t.strides[1]+d[1],y=w=>{let _=H("output",e[0].dataType,p.length,i),k=Ie(_.type.tensor),$=jt(t,_.type.value,k),b=B("x",e[0].dataType,l.length,i),T=B("w",e[1].dataType,d.length,i),S=[b,T];r&&S.push(B("b",e[2].dataType,e[2].dims,i));let I=r?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Xt(t,C),`
  ${w.registerUniforms(C).declareVariables(...S,_)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${m}>;
    var values: array<${_.type.value}, ${s}>;
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
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${s};${m};${d[0]};${d[1]}`,inputDependencies:r?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:y}}}),Bl,oa,Ml,ua,$i,Ar,Dl,Ul,xi,Uw=L(()=>{ae(),Bw(),Mw(),Qi(),Dw(),Zt(),Ji(),zt(),Bl=(e,t,n,a,r,i)=>{let s=e[0],o=e.slice(i?1:2,i?3:4),l=o.length,d=t[0],p=t.slice(2).map((m,y)=>m+(m-1)*(n[y]-1)),f=o.map((m,y)=>m+a[y]+a[y+l]).map((m,y)=>Math.floor((m-p[y]+r[y])/r[y]));return f.splice(0,0,s),f.splice(i?3:1,0,d),f},oa=[2,3,1,0],Ml=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw new Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw new Error(`strides should be ${r}D`);if(t.pads.length!==r*2)throw new Error(`pads should be ${r*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},ua=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let i=2;i<t[1].dims.length;++i)n[i-2]===0&&(n[i-2]=t[1].dims[i]);let a=e.pads.slice();xa.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,a,e.format==="NHWC",e.autoPad);let r=Object.assign({},e);return Object.assign(r,{kernelShape:n,pads:a}),r},$i=e=>{let t=Xi(e),n=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],r=e.dilations,i=e.group,s=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:a,format:n,dilations:r,group:i,kernelShape:s,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Ar=(e,t,n,a)=>{let r=n.format==="NHWC",i=Bl(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,r);if(n.group!==1){let C=[t[0]];if(r){let z=e.kernelCustomData.wT??e.compute(qe(t[1],oa),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),C.push(z)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&r&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Lh(C,n,i,a),{inputs:C}):e.compute(Ph(C,n,i,a),{inputs:C});return}let s=t.length===3,o=t[0].dims[r?1:2],l=t[0].dims[r?2:3],d=t[0].dims[r?3:1],p=t[1].dims[2],f=t[1].dims[3],m=i[r?1:2],y=i[r?2:3],w=i[r?3:1],_=r&&p===o&&f===l&&n.pads[0]===0&&n.pads[1]===0;if(_||p===1&&f===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let C=i[0],z,x,M,P=[];if(r){let j=e.kernelCustomData.wT??e.compute(qe(t[1],oa),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=j),_){let R=o*l*d;z=t[0].reshape([1,C,R]),x=j.reshape([1,R,w]),M=[1,C,w]}else z=t[0].reshape([C,o*l,d]),x=j.reshape([1,d,w]),M=[C,m*y,w];P.push(z),P.push(x)}else z=t[0].reshape([C,d,o*l]),x=t[1].reshape([1,w,d]),M=[C,w,m*y],P.push(x),P.push(z);s&&P.push(t[2]);let Y=M[2],G=P[0].dims[P[0].dims.length-1];Y<8&&G<8?e.compute(Zi(P,n,i,M,r,a),{inputs:P}):e.compute(Sa(P,n,i,M,r,a),{inputs:P});return}let k=!0,$=e.kernelCustomData.wT??e.compute(qe(t[1],oa),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let b=[t[0],$];s&&b.push(t[2]);let T=r?m*y:w,S=r?w:m*y,I=p*f*d;e.compute(Mh(b,n,i,T,S,I,s,k,a),{inputs:b})},Dl=(e,t)=>{let n=t.format==="NHWC",a=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let r=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=ua({...t,pads:r,strides:i,dilations:s,kernelShape:o},a);Ar(e,a,l,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Ul=(e,t,n)=>{let a=n.format==="NHWC"?"channelsLast":"channelsFirst",r=ua(n,t),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Dh(t[0].dims,t[1].dims,n.strides,n.dilations,i,!1,a);e.compute(Uh(t,r,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],a))},xi=(e,t)=>{if(Ml(e.inputs,t),e.inputs[0].dims.length===3)Dl(e,t);else if(e.inputs[0].dims.length===5)Ul(e,e.inputs,t);else{let n=ua(t,e.inputs);Ar(e,e.inputs,n)}}}),Vh,Pw=L(()=>{te(),yt(),ae(),re(),Vh=(e,t,n)=>{let a=e.length>2,r=t.outputShape,i=t.format==="NHWC",s=t.group,o=e[1].dims,l=o[2]/s,d=o[3],p=i?ke(l):1,f=i&&d===1&&l>=4,m=f?Math.floor(l/4)*4:Math.floor(l/p)*p,y=l-m,w=i?ke(d):1,_=i?d===1?p:w:1,k=O.size(r)/w,$=[Math.ceil(k/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let b=["rank","rank"],T=[t.strides[0],t.strides[1]],S=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],I=[t.dilations[0],t.dilations[1]],C=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],z=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:k},{type:12,data:T},{type:12,data:S},{type:12,data:I},{type:12,data:C},{type:6,data:z},{type:12,data:m},{type:12,data:l},{type:12,data:d},...X(e[0].dims,e[1].dims)];a&&(x.push(...X(e[2].dims)),b.push("rank")),x.push(...X(r));let M=P=>{let Y=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Ie(e[0].dataType),j=i?1:2,R=i?2:3,D=i?3:1,F=B("W",e[1].dataType,e[1].dims.length,_),Q=B("Dy",e[0].dataType,e[0].dims.length,p),ee=[Q,F];a&&ee.push(B("bias",e[2].dataType,[r[D]].length,w));let ne=H("result",e[0].dataType,r.length,w),ie=()=>{let Z="";if(f)p===4?Z+=`
        let xValue = ${Q.getByOffset("x_offset")};
        let wValue = ${F.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?Z+=`
          dotProd = dotProd + dot(vec4<${G}>(${Q.getByOffset("x_offset")}, ${Q.getByOffset("x_offset + 1u")}), vec4<${G}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(Z+=`
          dotProd = dotProd + dot(vec4<${G}>(${Q.getByOffset("x_offset")}, ${Q.getByOffset("x_offset + 1u")}, ${Q.getByOffset("x_offset + 2u")}, ${Q.getByOffset("x_offset + 3u")}), vec4<${G}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}, ${F.getByOffset("w_offset + 2u")}, ${F.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Z+=`
                  let xValue = ${i?Q.getByOffset(`${Q.indicesToOffset(`${Q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):Q.get("batch","inputChannel","idyR","idyC")};
        `,p===1)Z+=`
          let w_offset = ${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${F.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let W=0;W<p;W++)Z+=`
            let wValue${W} = ${F.getByOffset(`${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${W}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${W}] * wValue${W};`;return Z},U=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let Z="";if(p===1){Z+="dotProd = dotProd";for(let W=0;W<y;W++)Z+=`
            + ${Q.getByOffset(`x_offset + ${W}`)} * ${F.getByOffset(`w_offset + ${W}`)}`;Z+=";"}else if(p===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);Z+=`
          let xValue = ${Q.getByOffset("x_offset")};
          let wValue = ${F.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Z},J=`
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
                ${f?`
                var x_offset = ${Q.indicesToOffset(`${Q.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${F.indicesToOffset(`${F.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:p}) {
                  ${ie()}
                  inputChannel = inputChannel + ${f?4:p};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${w}]`:""};
            ${ne.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(Y).declareVariables(...ee,ne)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${J}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${_}${w}${f}${y}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:M}}}),Pl,Ll,Vl,zr,qh,ql,Or,Wl,Wh,Lw=L(()=>{Pw(),Zt(),zt(),Pl=(e,t,n,a,r,i)=>(e-1)*t+n+(a-1)*r+1-i,Ll=(e,t,n,a,r)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(n[a]=i,n[r]=e-i):t==="SAME_LOWER"&&(n[a]=e-i,n[r]=i)},Vl=(e,t,n,a,r,i,s,o,l,d)=>{let p=e.length-2,f=d.length===0;l.length<p&&l.push(...Array(p-l.length).fill(0));let m=e[0],y=t[o?3:1]*r;for(let w=0,_=e.length-p-(o?1:0);w<p;++w,++_){let k=e[_],$=f?k*s[w]:d[w],b=Pl(k,s[w],i[w],t[_],n[w],$);Ll(b,a,i,w,w+p),f&&d.push(s[w]*(k-1)+l[w]+(t[_]-1)*n[w]+1-i[w]-i[w+p])}d.splice(0,0,m),d.splice(o?3:1,0,y)},zr=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,m)=>f*m,1)===0){n.length=0;for(let f=2;f<t[1].dims.length;++f)n.push(t[1].dims[f])}let a=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(a?3:1,0,t[1].dims[1]);let r=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}Vl(o,n,l,e.autoPad,e.group,r,d,a,s,i);let p=Object.assign({},e);return Object.assign(p,{kernelShape:n,pads:r,outputPadding:s,outputShape:i,dilations:l,strides:d}),p},qh=e=>{let t=Xi(e),n=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],r=e.dilations,i=e.group??1,s=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),p=e.outputPadding,f=e.outputShape;return{autoPad:a,format:n,dilations:r,group:i,kernelShape:s,outputPadding:p,outputShape:f,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},ql=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==r))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Or=(e,t,n,a)=>{let r=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r);let i=[t[0],r];t.length===3&&i.push(t[2]),e.compute(Vh(i,n,a),{inputs:i})},Wl=(e,t)=>{let n=t.format==="NHWC",a=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let r=t.kernelShape;(r.length===0||r[0]===0)&&(r=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),i=[1].concat(i),r=[1].concat(r);let l=t.outputPadding;l=[0].concat(l);let d=zr({...t,pads:o,strides:s,dilations:i,kernelShape:r,outputPadding:l},a);Or(e,a,d,p=>n?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Wh=(e,t)=>{if(ql(e.inputs,t),e.inputs[0].dims.length===3)Wl(e,t);else{let n=zr(t,e.inputs);Or(e,e.inputs,n)}}}),Fl,Fh,Gh,Vw=L(()=>{te(),ae(),Se(),re(),Fl=(e,t,n,a)=>{let r=O.size(t),i=t.length,s=B("input",e,i),o=H("output",e,i),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=O.normalizeAxis(l,i),p=f=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,y=K("uniforms.input_shape","uniforms.axis",i),w=a.reverse?m+(a.exclusive?" + 1":""):"0",_=a.reverse?y:m+(a.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},{type:12,data:d},...X(t,t)]}),getShaderSource:p}},Fh=(e,t)=>{let n=e.inputs[0].dims,a=e.inputs[0].dataType,r=e.inputs[1];e.compute(Fl(a,n,r,t),{inputs:[0]})},Gh=e=>{let t=e.exclusive===1,n=e.reverse===1;return he({exclusive:t,reverse:n})}}),Gl,Hl,jl,Hh,jh,qw=L(()=>{te(),ae(),Se(),re(),Gl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Hl=(e,t,n,a)=>{let r=[];r.push(`fn perm(i: ${a.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)r.push(n.indicesSet("a",e[i],`i[${i}]`));return r.push("return a;}"),r.join(`
`)},jl=(e,t)=>{let n,a,r,i,s,o,l=t.format==="NHWC",d=t.blocksize,p=t.mode==="DCR";l?([n,a,r,i]=e.dims,s=p?[n,a,r,d,d,i/d**2]:[n,a,r,i/d**2,d,d],o=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,a,r,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=p?[n,d,d,i/d**2,a,r]:[n,i/d**2,d,d,a,r],o=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),m=f.dims.length,y=e.dataType,w=B("a",y,m),_=H("output",y,m),k=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,_)}

  ${Hl(o,m,w,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let b=l?[n,a*d,r*d,i/d**2]:[n,i/d**2,a*d,r*d],T=O.size(b),S=f.dims,I=O.sortBasedOnPerm(S,o);return{outputs:[{dims:b,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...X(S,I)]}},getShaderSource:k}},Hh=(e,t)=>{Gl(e.inputs),e.compute(jl(e.inputs[0],t))},jh=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),la,vn,Rr,Kl,Xl,Yl,Zl,Nr,Jl,Kh,Xh,Ww=L(()=>{te(),ae(),Se(),re(),la="[a-zA-Z]|\\.\\.\\.",vn="("+la+")+",Rr="^"+vn+"$",Kl="("+vn+",)*"+vn,Xl="^"+Kl+"$",Yl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Zl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,a]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(Xl)))throw new Error("Invalid LHS term");if(n.split(",").forEach((r,i)=>{let s=e[i].dims.slice();if(!r.match(RegExp(Rr)))throw new Error("Invalid LHS term");let o=this.processTerm(r,!0,s,i);this.lhs.push(o)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([r,i])=>i.count===1||r==="...").map(([r])=>r).join("");else if(!a.match(RegExp(vn)))throw new Error("Invalid RHS");a.match(RegExp(la,"g"))?.forEach(r=>{if(r==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let i=this.symbolToInfo.get(r);if(i===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(i.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,n){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(n)}else a={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,a)}processTerm(e,t,n,a=-1){let r=n.length,i=!1,s=[],o=0;if(!e.match(RegExp(Rr))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(la,"g")),d=new Yl(a);return l?.forEach((p,f)=>{if(p==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let m=r-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=n.slice(o,o+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let w=String.fromCharCode(48+y);d.addSymbol(w,f+y),this.addSymbol(w,n[o++],a)}}else d.addSymbol(p,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,n[o++],a)}),d}},Nr=e=>e+"_max",Jl=(e,t,n,a)=>{let r=e.map(d=>d.length).map((d,p)=>B(`input${p}`,t,d)),i=O.size(a),s=H("output",t,a.length),o=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let p=[],f="var prod = 1.0;",m="var sum = 0.0;",y="sum += prod;",w=[],_=[],k=[],$=[],b=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((S,I)=>{if(n.rhs.symbolToIndices.has(I)){let C=n.rhs.symbolToIndices.get(I)?.[0];C!==void 0&&n.lhs.forEach((z,x)=>{if(S.inputIndices.includes(x)){let M=z.symbolToIndices.get(I);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(P=>{p.push(`${r[x].indicesSet(`input${x}Indices`,P,s.indicesGet("outputIndices",C))}`)})}})}else n.lhs.forEach((C,z)=>{if(S.inputIndices.includes(z)){let x=C.symbolToIndices.get(I);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(M=>{w.push(`${r[z].indicesSet(`input${z}Indices`,M,`${I}`)}`)}),$.push(`prod *= ${r[z].getByIndices(`input${z}Indices`)};`)}}),_.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Nr(I)}; ${I}++) {`),k.push("}")});let T=b?[...p,`let sum = ${r.map((S,I)=>S.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...p,m,..._,...w,f,...$,y,...k];return`
            ${d.registerUniforms(o.map(S=>({name:`${Nr(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...r,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${r.map((S,I)=>`var input${I}Indices: ${r[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>n.symbolToInfo.has(f)).map(f=>({type:12,data:n.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:i});let p=e.map((f,m)=>[...X(f)]).reduce((f,m)=>f.concat(m),d);return p.push(...X(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}},getShaderSource:l}},Kh=(e,t)=>{let n=new Zl(e.inputs,t.equation),a=n.outputDims,r=e.inputs.map((i,s)=>i.dims);e.compute(Jl(r,e.inputs[0].dataType,n,a))},Xh=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),Ql,Br,ed,td,Yh,Fw=L(()=>{te(),ae(),re(),Ql=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),a=n.length<t.length?0:n.length-t.length,r=t.length<n.length?0:t.length-n.length;for(;a<n.length&&r<t.length;++a,++r)if(n[a]!==t[r]&&n[a]!==1&&t[r]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Br=(e,t)=>{let n=e.length-t.length,a=[];for(let r=0;r<n;++r)a.push(e[r]);for(let r=0;r<t.length;++r)a.push(t[r]===1?e[r+n]:t[r]);return a},ed=(e,t)=>e.length>t.length?Br(e,t):Br(t,e),td=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),a=ed(t,n),r=e[0].dataType,i=r===9||O.size(t)===1,s=r===9||t.length>0&&t[t.length-1]%4===0?4:1,o=i||a.length>0&&a[a.length-1]%4===0?4:1,l=Math.ceil(O.size(a)/o),d=f=>{let m=B("input",r,t.length,s),y=H("output",r,a.length,o),w;if(r===9){let _=(k,$,b="")=>`
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
        let data = ${y.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(m,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},p=[{type:12,data:l},...X(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p})}},Yh=e=>{Ql(e.inputs),e.compute(td(e.inputs),{inputs:[0]})}}),nd,Zh,Gw=L(()=>{te(),ae(),re(),Ki(),nd=e=>{let t=e[0].dataType,n=O.size(e[0].dims),a=O.size(e[1].dims),r=a%4===0,i=s=>{let o=B("x",t,[1],4),l=B("bias",t,[1],4),d=H("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,m=r?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(p).declareVariables(o,l,d)}

    ${wi(Re(t))}

    ${s.mainStart(on)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",_i("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${r}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(n/on/4)}})}},Zh=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?yh(e):e.compute(nd(e.inputs))}}),ad,rd,Jh,Qh,Hw=L(()=>{te(),ae(),Se(),re(),ad=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},rd=(e,t)=>{let n=e[0].dims,a=e[1].dims,r=n.length,i=O.normalizeAxis(t.axis,r),s=n.slice(0);s.splice(i,1,...a);let o=n[i],l=e[0].dataType===9?4:1,d=Math.ceil(O.size(s)/l),p=[{type:12,data:d},{type:6,data:o},{type:12,data:i},...X(e[0].dims,e[1].dims,s)],f=m=>{let y=B("data",e[0].dataType,e[0].dims.length,l),w=B("inputIndices",e[1].dataType,e[1].dims.length),_=H("output",e[0].dataType,s.length,l),k=b=>{let T=a.length,S=`var indicesIndices${b}  = ${w.type.indices}(0);`;for(let I=0;I<T;I++)S+=`${T>1?`indicesIndices${b}[${I}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${I}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${w.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${y.type.indices};
        `;for(let I=0,C=0;I<r;I++)I===i?(S+=`${r>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = u32(idx${b});`,C+=T):(S+=`${r>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${C}]`:`outputIndices${b}`};`,C++);return S},$;if(e[0].dataType===9){let b=(T,S,I="")=>`
          let outputIndices${S} = ${_.offsetToIndices(`outputOffset + ${S}u`)};
          ${k(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${T}[${S}] = ${I}(${y.getByOffset(`index${S}`)}[component${S}]);
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
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:f}},Jh=e=>he({axis:e.axis}),Qh=(e,t)=>{let n=e.inputs;ad(n),e.compute(rd(e.inputs,t))}}),id,em,tm,jw=L(()=>{te(),ae(),re(),id=(e,t,n,a,r,i,s,o,l)=>{let d=[{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:12,data:l}],p=[i];d.push(...X(t.dims,p));let f=m=>{let y=B("indices_data",t.dataType,t.dims.length),w=H("input_slice_offsets_data",12,1,1),_=[y,w],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:r.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
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
        ${r.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${r.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},em=(e,t)=>{let n=e.inputs,a=n[0].dims,r=n[0].dataType,i=n[1].dims,s=i[i.length-1],o=O.sizeToDimension(i,i.length-1),l=O.sizeFromDimension(a,t.batchDims+s),d=O.sizeToDimension(a,t.batchDims),p=O.sizeFromDimension(a,t.batchDims),f=o/d,m=new Array(s),y=l;for(let S=0;S<s;++S)m[s-1-S]=y,y*=a[t.batchDims+s-1-S];let w=id(e,n[1],m,t.batchDims,a,o,f,p,s),_=t.batchDims+s;if(_>a.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=i.slice(0,-1).concat(a.slice(_)),$=O.size(k),b=[{type:12,data:$},{type:12,data:l},...X(n[0].dims,w.dims,k)],T=S=>{let I=B("data",n[0].dataType,n[0].dims.length),C=B("slice_offsets",12,w.dims.length),z=H("output",n[0].dataType,k.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,C,z)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:r}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:b}),getShaderSource:T},{inputs:[n[0],w]})},tm=e=>({batchDims:e.batch_dims,cacheKey:""})}),sd,od,nm,am,Kw=L(()=>{te(),ae(),Se(),re(),sd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),a=t.blockSize,r=e[0],i=e[2],s=e.length===4?e[3]:void 0;if(i.dims.length!==r.dims.length||!r.dims.map((o,l)=>l===n?Math.ceil(o/a)===i.dims[l]:o===i.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==r.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((o,l)=>o===i.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},od=(e,t)=>{let n=e[0].dims,a=e[1].dims,r=n.length,i=O.normalizeAxis(t.gatherAxis,r),s=O.normalizeAxis(t.quantizeAxis,r),o=n.slice(0);o.splice(i,1,...a);let l=O.size(o),d=e[2].dataType,p=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:s},{type:12,data:i},{type:12,data:t.blockSize},...X(...e.map((y,w)=>y.dims),o)],m=y=>{let w=B("data",e[0].dataType,e[0].dims.length),_=B("inputIndices",e[1].dataType,e[1].dims.length),k=B("scales",e[2].dataType,e[2].dims.length),$=e.length>3?B("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=H("output",d,o.length),T=[w,_,k];$&&T.push($);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...T,b)}
        ${y.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
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
          index_from_indices += ${n[i]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${a.length} - 1`)};
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
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,w)=>w!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,w)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:m}},nm=(e,t)=>{let n=e.inputs;sd(n,t),e.compute(od(e.inputs,t))},am=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),ud,ld,rm,im,Xw=L(()=>{te(),ae(),Se(),re(),ud=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ld=(e,t)=>{let n=e[0].dims,a=e[0].dataType,r=n.length,i=e[1].dims,s=e[1].dataType,o=O.normalizeAxis(t.axis,r),l=n[o],d=i.slice(0),p=O.size(d),f=B("input",a,r),m=B("indicesInput",s,i.length),y=H("output",a,d.length),w=[{type:12,data:p},{type:6,data:l},{type:12,data:o}];return w.push(...X(n,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:w}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,y)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},rm=e=>he({axis:e.axis}),im=(e,t)=>{let n=e.inputs;ud(n),e.compute(ld(e.inputs,t))}}),dd,cd,sm,om,Yw=L(()=>{te(),ae(),re(),dd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},cd=(e,t)=>{let n=e[0].dims.slice(),a=e[1].dims.slice(),[r,i,s]=af.getShapeOfGemmResult(n,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),o=[r,i];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(i/l),p=Math.ceil(r/l),f=!0,m=O.size(o),y=[{type:12,data:f?d:m},{type:12,data:r},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(y.push(...X(e[2].dims)),w.push("rank")),y.push(...X(o));let _=$=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",S=B("a",e[0].dataType,e[0].dims),I=B("b",e[1].dataType,e[1].dims),C=S.type.value,z=null,x=[S,I];e.length===3&&(z=B("c",e[2].dataType,e[2].dims.length),x.push(z));let M=H("output",e[0].dataType,o.length);x.push(M);let P=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(P).declareVariables(...x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${C}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=$=>{let b=B("a",e[0].dataType,e[0].dims),T=B("b",e[1].dataType,e[1].dims),S=null,I=[b,T];e.length===3&&(S=B("c",e[2].dataType,e[2].dims.length),I.push(S));let C=H("output",e[0].dataType,o.length);I.push(C);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",M="";t.transA&&t.transB?(M=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let P=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
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

    ${P}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:y}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:_}},sm=e=>{let t=e.transA,n=e.transB,a=e.alpha,r=e.beta;return{transA:t,transB:n,alpha:a,beta:r,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},om=(e,t)=>{dd(e.inputs),e.compute(cd(e.inputs,t))}}),ot,ft,Mt,Dt,pd,fd,hd,md,gd,yd,wd,_d,um,lm,Zw=L(()=>{te(),ae(),Se(),re(),[ot,ft,Mt,Dt]=[0,1,2,3],pd=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},fd=`
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
`,hd=e=>`
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
`,md=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,gd=e=>`
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
`,yd=(e,t,n)=>`
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
`,wd=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
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
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,_d=(e,t)=>{let n=B("x",e[0].dataType,e[0].dims.length),a=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],r=B("grid",e[1].dataType,a.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ot,ft,Mt,Dt]=[0,3,1,2]);let s=H("output",e[0].dataType,i.length),o=n.type.value,l=O.size(i),d=[{type:12,data:l},...X(e[0].dims,a,i)],p=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(n,r,s)}
  ${fd}
  ${hd(o)}
  ${md(t)}
  ${gd(t)}
  ${yd(n,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ot}], indices[${Mt}], indices[${Dt}]);
      let nxy = ${r.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${wd(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let m=O.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:p}},um=(e,t)=>{pd(e.inputs),e.compute(_d(e.inputs,t))},lm=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,bd,dm,Mr,vd,zn,cm,pm=L(()=>{te(),ae(),Se(),Fi(),ji(),re(),zt(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,bd=(e,t)=>{let n=e[0],a=Be(e,1),r=Be(e,2),i=Be(e,3),s=Be(e,4),o=Be(e,5),l=Be(e,6),d=Be(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=n.dims[0],f=n.dims[1],m=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],y=f,w=0,_=0,k=Math.floor(m/t.numHeads);if(l&&d&&O.size(l.dims)&&O.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=l.dims[2],_=l.dims[2]}else if(l&&O.size(l.dims)||d&&O.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(a&&O.size(a.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(r)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=a.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&O.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(a&&a.dims.length===5&&a.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=w+y,T=0;if(s&&O.size(s.dims)>0){T=8;let z=s.dims;throw z.length===1?z[0]===p?T=1:z[0]===3*p+2&&(T=3):z.length===2&&z[0]===p&&z[1]===b&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,I=m;if(r&&O.size(r.dims)>0){if(r.dims.length!==3&&r.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(r.dims.length===3){if(y!==r.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=r.dims[2]}else{if(y!==r.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=r.dims[1]*r.dims[3],S=!0}}let C=!1;if(s&&O.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&O.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==p||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:f,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:b,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:k,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:S,qkvFormat:$}},dm=e=>he({...e}),Mr=he({perm:[0,2,1,3]}),vd=(e,t,n,a,r,i,s)=>{let o=[a,r,i],l=O.size(o),d=[{type:12,data:l},{type:12,data:s},{type:12,data:i}],p=f=>{let m=H("qkv_with_bias",t.dataType,o),y=B("qkv",t.dataType,o),w=B("bias",n.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(y,w,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,n],outputs:[-1]})[0]},zn=(e,t,n,a,r,i,s,o)=>{let l=i;if(s&&O.size(s.dims)>0){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=vd(e,i,s,t,a,n*r,o),l=l.reshape([t,a,n,r]),n===1||a===1?l:e.compute(qe(l,Mr.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,a,n,r])),n===1||a===1?l:e.compute(qe(l,Mr.perm),{inputs:[l],outputs:[-1]})[0]},cm=(e,t)=>{let n=bd(e.inputs,t),a=e.inputs[0],r=Be(e.inputs,1),i=Be(e.inputs,2),s=Be(e.inputs,3),o=Be(e.inputs,4),l=Be(e.inputs,5),d=Be(e.inputs,6),p=Be(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if(r?.dims.length===5)throw new Error("Packed KV is not implemented");let f=r&&i&&r.dims.length===4&&i.dims.length===4,m=zn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,a,s,0);if(f)return Bn(e,m,r,i,o,void 0,d,p,l,n);if(!r||!i)throw new Error("key and value must be provided");let y=zn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,r,s,n.hiddenSize),w=zn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Bn(e,m,y,w,o,void 0,d,p,l,n)}}),$d,xd,kd,Sd,ki,fm,hm,mm=L(()=>{te(),ae(),Se(),re(),$d=e=>{if(!e||e.length<1)throw new Error("too few inputs")},xd=(e,t)=>{let n=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),a=n.length),he({numOutputs:a,axis:t.axis,splitSizes:n})},kd=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Sd=e=>{let t=e.length,n=[];for(let a=0;a<t;++a){let r=e[a].setByIndices("indices","input[global_idx]");t===1?n.push(r):a===0?n.push(`if (output_number == ${a}u) { ${r} }`):a===t-1?n.push(`else { ${r} }`):n.push(`else if (output_number == ${a}) { ${r} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},ki=(e,t)=>{let n=e[0].dims,a=O.size(n),r=e[0].dataType,i=O.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),o=B("input",r,n.length),l=new Array(t.numOutputs),d=[],p=[],f=0,m=[{type:12,data:a}];for(let w=0;w<t.numOutputs;w++){f+=t.splitSizes[w],l[w]=f;let _=n.slice();_[i]=t.splitSizes[w],p.push(_),s[w]=H(`output${w}`,r,_.length),d.push({dims:p[w],dataType:e[0].dataType})}m.push({type:12,data:l},...X(n,...p));let y=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...s)}
  ${kd(l.length)}
  ${Sd(s)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:m})}},fm=(e,t)=>{$d(e.inputs);let n=e.inputs.length===1?t:xd(e.inputs,t);e.compute(ki(e.inputs,n),{inputs:[0]})},hm=e=>{let t=e.axis,n=e.splitSizes,a=e.numOutputs<0?n.length:e.numOutputs;if(a!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:a,splitSizes:n})}}),Td,Ta,gm,ym=L(()=>{te(),ae(),Se(),re(),Td=(e,t)=>{let[n,a,r,i]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!O.areEqual(a.dims,[])&&!O.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(r.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!O.areEqual(r.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],d=n.dims[n.dims.length-2],p=r.dims[0],f=O.sizeFromDimension(n.dims,1)/d,m=o===0?r.dims[1]*2:f/s;if(o>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(l!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(d>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==r.dims[1]&&o/2!==r.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${r.dims[1]}`)},Ta=(e,t)=>{let{interleaved:n,numHeads:a,rotaryEmbeddingDim:r,scale:i}=t,s=e[0].dims[0],o=O.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,p=e[2].dims[1],f=r===0?p*2:d/a,m=new Array(s,l,d/f,f-p),y=O.computeStrides(m),w=[{type:1,data:i},{type:12,data:m},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,l*f,1]}):[],...X(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=k=>{let $=B("input",e[0].dataType,e[0].dims.length),b=B("position_ids",e[1].dataType,e[1].dims.length),T=B("cos_cache",e[2].dataType,e[2].dims.length),S=B("sin_cache",e[3].dataType,e[3].dims.length),I=H("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${k.declareVariables($,b,T,S,I)}

        ${k.mainStart(on)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
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
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(m)/on)},programUniforms:w})}},gm=(e,t)=>{Td(e.inputs,t),e.compute(Ta(e.inputs,t))}}),Ed,Id,Dr,Cd,wm,Jw=L(()=>{Se(),te(),ji(),pm(),mm(),zt(),ym(),re(),Ed=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],a=e[1],r=e[2],i=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=n.dims[0],d=n.dims[1],p=n.dims.length===3?o?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],f=d,m=0,y=!a||a.dims.length===0,w=Math.floor(y?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);y&&(p=w*t.numHeads);let _=i&&i.dims.length!==0,k=s&&s.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===l&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&k){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=i.dims[2]}else if(_||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(a&&a.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(n.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(r)throw new Error('Expect "value" be none when "key" has packed kv format.');f=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=a.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let b=0,T=!1,S=t.kvNumHeads?w*t.kvNumHeads:p;if(r&&r.dims.length>0){if(r.dims.length!==3&&r.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(r.dims.length===3){if(f!==r.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=r.dims[2]}else{if(f!==r.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=r.dims[1]*r.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=I.dims.reduce((z,x)=>z*x,1);if(C!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${C}.`);for(let z=0;z<I.dims.length;z++)if(I.dims[z]!==1&&I.dims[z]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${z}] = ${I.dims[z]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:S,headSize:w,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Id=he({perm:[0,2,1,3]}),Dr=(e,t,n)=>{let a=t,r=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(a=t.reshape([n.batchSize,n.kvSequenceLength,r,n.headSize]),a=e.compute(qe(a,Id.perm),{inputs:[a],outputs:[-1]})[0]),a},Cd=(e,t,n,a)=>{let r=7,i=["type","type"],s=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=p=>{let f=B("seq_lens",n.dataType,n.dims),m=B("total_seq_lens",a.dataType,a.dims),y=H("pos_ids",r,s),w=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(w).declareVariables(f,m,y)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},wm=(e,t)=>{let n=Ed(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let a=e.inputs[0],r=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=he({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,p*n.headSize,p*n.headSize]}),[m,y,w]=!r&&!i?e.compute(ki([a],f),{inputs:[a],outputs:[-1,-1,-1]}):[a,r,i],_,k;if(t.doRotary){let S=e.compute(Cd(n.batchSize,n.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],I=e.inputs[7],C=e.inputs[8],z=he({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[m,S,I,C],M=[-1];_=e.compute(Ta(x,z),{inputs:x,outputs:M})[0],x.splice(0,1,y);let P=he({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});k=e.compute(Ta(x,P),{inputs:x,outputs:M})[0]}let $=zn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:m,void 0,0),b=Dr(e,t.doRotary?k:y,n),T=Dr(e,w,n);Bn(e,$,b,T,void 0,void 0,s,o,void 0,n,l,d)}}),Ur,Ad,zd,_m,Qw=L(()=>{te(),ae(),zt(),re(),Ur=(e,t,n,a,r,i,s,o)=>{let l=ke(i),d=l===1?"f32":`vec${l}f`,p=l===1?"vec2f":`mat2x${l}f`,f=r*s,m=64;f===1&&(m=256);let y=[r,s,i/l],w=[r,s,2],_=["rank","type","type"],k=[];k.push(...X(y,w));let $=b=>{let T=B("x",t.dataType,3,l),S=B("scale",n.dataType,n.dims),I=B("bias",a.dataType,a.dims),C=H("output",1,3,2),z=[T,S,I,C];return`
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
      let value = ${d}(${T.get("batch","channel","h")});
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
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:f},programUniforms:k}),getShaderSource:$},{inputs:[t,n,a],outputs:[-1]})[0]},Ad=(e,t,n)=>{let a=t[0].dims,r=a,i=2,s=a[0],o=a[1],l=O.sizeFromDimension(a,i),d=ke(l),p=O.size(r)/d,f=Ur(e,t[0],t[1],t[2],s,l,o,n.epsilon),m=[s,o,l/d],y=[s,o],w=["type","none"],_=k=>{let $=B("x",t[0].dataType,m.length,d),b=B("scale_shift",1,y.length,2),T=H("output",t[0].dataType,m.length,d),S=[$,b,T];return`
  ${k.registerUniform("output_size","u32").declareVariables(...S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...X(m,y,m)]}),getShaderSource:_},{inputs:[t[0],f]})},zd=(e,t,n)=>{let a=t[0].dims,r=a,i=a[0],s=a[a.length-1],o=O.sizeFromDimension(a,1)/s,l=ke(s),d=O.size(r)/l,p=[{type:12,data:o},{type:12,data:Math.floor(s/l)}],f=["type","type"],m=!1,y=[0,a.length-1];for(let $=0;$<a.length-2;$++)m=m||a[$+1]!==1,y.push($+1);m=m&&a[a.length-1]!==1;let w=m?e.compute(qe(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},($,b)=>a[y[b]])),_=Ur(e,w,t[1],t[2],i,o,s,n.epsilon),k=$=>{let b=Ie(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,S=z=>{let x=z===0?"x":"y",M=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${b}(${M}(scale.${x}))`;case 2:return`vec2<${b}>(${M}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${b}>(${M}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=B("input",t[0].dataType,t[0].dims,l),C=H("output",t[0].dataType,r,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:k},{inputs:[t[0],_]})},_m=(e,t)=>{t.format==="NHWC"?zd(e,e.inputs,t):Ad(e,e.inputs,t)}}),Od,Rd,bm,e_=L(()=>{te(),ae(),re(),Od=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Rd=(e,t,n)=>{let a=t.simplified,r=e[0].dims,i=e[1],s=!a&&e[2],o=r,l=O.normalizeAxis(t.axis,r.length),d=O.sizeToDimension(r,l),p=O.sizeFromDimension(r,l),f=O.size(i.dims),m=s?O.size(s.dims):0;if(f!==p||s&&m!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${m}`);let y=[];for(let I=0;I<r.length;++I)I<l?y.push(r[I]):y.push(1);let w=ke(p),_=["type","type"],k=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/w)},{type:1,data:t.epsilon}];s&&_.push("type");let $=n>1,b=n>2,T=I=>{let C=Ie(e[0].dataType),z=[B("x",e[0].dataType,e[0].dims,w),B("scale",i.dataType,i.dims,w)];s&&z.push(B("bias",s.dataType,s.dims,w)),z.push(H("output",e[0].dataType,o,w)),$&&z.push(H("mean_data_output",1,y)),b&&z.push(H("inv_std_output",1,y));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(x).declareVariables(...z)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${mi("f32",w)};
    var mean_square_vector = ${mi("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${rn(C,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ct("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ct("mean_square_vector",w)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${rn(C,w,"x[j + offset]")};
      let f32scale = ${rn(C,w,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${rn(C,w,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:o,dataType:e[0].dataType}];return $&&S.push({dims:y,dataType:1}),b&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${n};${a}`,inputDependencies:_},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:k}),getShaderSource:T}},bm=(e,t)=>{Od(e.inputs),e.compute(Rd(e.inputs,t,e.outputCount))}}),Nd,vm,t_=L(()=>{ae(),Ji(),Qi(),Nd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},vm=e=>{Nd(e.inputs);let t=sn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&a<8)e.compute(Zi(e.inputs,{activation:""},t));else{let r=t[t.length-2],i=O.size(e.inputs[0].dims.slice(0,-2)),s=O.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&r===1&&s===1){let o=e.inputs[0].reshape([1,i,a]),l=e.inputs[1].reshape([1,a,n]),d=[1,i,n],p=[o,l];e.compute(Sa(p,{activation:""},t,d),{inputs:p})}else e.compute(Sa(e.inputs,{activation:""},t))}}}),Bd,Md,Dd,$m,xm,n_=L(()=>{te(),ae(),Se(),re(),Bd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],a=n.dims.length;if(n.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let r=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!O.areEqual(s.dims,[t.n,r,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(O.size(o)!==t.n*r)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?r:Math.floor((r*t.bits+7)/8));if(O.size(l)!==d)throw new Error("zeroPoints input size error.")}},Md=(e,t)=>{let n=e[0].dims,a=n.length,r=n[a-2],i=t.k,s=t.n,o=n.slice(0,a-2),l=O.size(o),d=e[1].dims[2]/4,p=e[0].dataType,f=ke(t.k),m=ke(d),y=ke(s),w=o.concat([r,s]),_=r>1&&s/y%2===0?2:1,k=O.size(w)/y/_,$=64,b=[],T=[l,r,i/f],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,d/m),b.push(...X(T)),b.push(...X(S)),b.push(...X(e[2].dims)),e.length===4&&b.push(...X(O.convertShape(e[3].dims)));let I=[l,r,s/y];b.push(...X(I));let C=z=>{let x=T.length,M=B("a",e[0].dataType,x,f),P=B("b",12,S.length,m),Y=B("scales",e[2].dataType,e[2].dims.length),G=[M,P,Y],j=e.length===4?B("zero_points",12,e[3].dims.length):void 0;j&&G.push(j);let R=I.length,D=H("output",e[0].dataType,R,y),F=Ie(e[0].dataType),Q=(()=>{switch(f){case 1:return`array<${F}, 8>`;case 2:return`mat4x2<${F}>`;case 4:return`mat2x4<${F}>`;default:throw new Error(`${f}-component is not supported.`)}})(),ee=Math.floor(32/t.bits),ne=Math.floor(ee/8),ie=()=>{let Z="";for(let W=0;W<ne;W++){let Ee=W*t.bits*4,ze=Ee+t.bits;Z+=`
          // reuse a data (pass ${W})
            var input_offset${W>0?W:""} = ${W===0?M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${W>0?W:""}: ${Q};
            for (var j${W>0?W:""}: u32 = 0; j${W>0?W:""} < ${8/f}; j${W>0?W:""}++) {
              a_data${W>0?W:""}[j${W>0?W:""}] = ${M.getByOffset(`input_offset${W>0?W:""}`)};
              input_offset${W>0?W:""}++;
            }
          `;for(let $e=0;$e<y*_;$e++)Z+=`
            b_value = ${m===1?`b${$e}_data`:`b${$e}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${W*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Ee}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${ze}u) & b_mask);`}
            b_quantized_values = ${Q}(${Array.from({length:4},(Oe,ge)=>`${F}(b_value_lower[${ge}]), ${F}(b_value_upper[${ge}])`).join(", ")});
            b_dequantized_values = ${f===1?`${Q}(${Array.from({length:8},(Oe,ge)=>`(b_quantized_values[${ge}] - ${j?`zero_point${$e}`:"zero_point"}) * scale${$e}`).join(", ")});`:`(b_quantized_values - ${Q}(${Array(8).fill(`${j?`zero_point${$e}`:"zero_point"}`).join(",")})) * scale${$e};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor($e/y)}]${y>1?`[${$e%y}]`:""} += ${Array.from({length:8/f},(Oe,ge)=>`${f===1?`a_data${W>0?W:""}[${ge}] * b_dequantized_values[${ge}]`:`dot(a_data${W>0?W:""}[${ge}], b_dequantized_values[${ge}])`}`).join(" + ")};
          `}return Z},U=()=>{let Z=`
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
            `;for(let W=0;W<y*_;W++)Z+=`
            let scale${W} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${j?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${F}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Z},J=()=>{let Z=`col_index = col * ${y};`;for(let W=0;W<y*_;W++)Z+=`
            let b${W}_data = ${P.getByIndices(`${P.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Z+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Q};
            var b_dequantized_values: ${Q};`,Z};return`
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
            var word_offset: u32 = block * ${t.blockSize/f};
            ${U()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${J()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${ie()}
                word_offset += ${ee/f};
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
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${m};${y};${_};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:p}],dispatchGroup:{x:k},programUniforms:b}),getShaderSource:C}},Dd=(e,t)=>{let n=e[0].dims,a=n.length,r=n[a-2],i=t.k,s=t.n,o=n.slice(0,a-2),l=O.size(o),d=e[1].dims[2]/4,p=e[0].dataType,f=ke(t.k),m=ke(d),y=o.concat([r,s]),w=128,_=s%8===0?8:s%4===0?4:1,k=w/_,$=Math.floor(32/t.bits),b=k*m*$,T=b/f,S=b/t.blockSize,I=O.size(y)/_,C=[],z=[l,r,i/f],x=O.convertShape(e[1].dims).slice();x.splice(-1,1,d/m),C.push(...X(z)),C.push(...X(x)),C.push(...X(e[2].dims)),e.length===4&&C.push(...X(O.convertShape(e[3].dims)));let M=[l,r,s];C.push(...X(M));let P=Y=>{let G=z.length,j=B("a",e[0].dataType,G,f),R=B("b",12,x.length,m),D=B("scales",e[2].dataType,e[2].dims.length),F=[j,R,D],Q=e.length===4?B("zero_points",12,e[3].dims.length):void 0;Q&&F.push(Q);let ee=M.length,ne=H("output",e[0].dataType,ee),ie=Ie(e[0].dataType),U=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${j.type.value}, ${T}>;
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
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
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
            ${Q?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ie}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${D.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let J=Math.floor($/8),Z="";for(let W=0;W<J;W++){let Ee=W*t.bits*4,ze=Ee+t.bits;Z+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${W*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Ee}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${ze}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},($e,Oe)=>`${ie}(b_value_lower[${Oe}]), ${ie}(b_value_upper[${Oe}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,Oe)=>`${`dot(a_data${Oe}, b_dequantized_values[${Oe}])`}`).join(" + ")};
              }
              word_offset += ${8/f};`}return Z})()}
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
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${m};${k};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:p}],dispatchGroup:{x:I},programUniforms:C}),getShaderSource:P}},$m=(e,t)=>{Bd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Dd(e.inputs,t)):e.compute(Md(e.inputs,t))},xm=e=>he(e)}),Ud,Pd,Ld,Vd,qd,Wd,Fd,Gd,km,a_=L(()=>{te(),ae(),re(),Ud=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Pd=(e,t,n)=>{let a="";for(let r=t-1;r>=0;--r)a+=`
            k = i32(${e.indicesGet("indices",r)}) - ${K("uniforms.pads",r,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",r,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",r,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},Ld=(e,t,n)=>{let a="";for(let r=t-1;r>=0;--r)a+=`
                k = i32(${e.indicesGet("indices",r)}) - ${K("uniforms.pads",r,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",r,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",r,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",r,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Vd=(e,t,n)=>{let a="";for(let r=t-1;r>=0;--r)a+=`
                k = i32(${e.indicesGet("indices",r)}) - ${K("uniforms.pads",r,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",r,t)})) {
                  k = i32(${K("uniforms.x_shape",r,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",r,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},qd=(e,t,n)=>{let a="";for(let r=t-1;r>=0;--r)a+=`
                k = i32(${e.indicesGet("indices",r)}) - ${K("uniforms.pads",r,n)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",r,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",r,t)})) {
                  k -= i32(${K("uniforms.x_shape",r,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",r,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Wd=(e,t,n)=>{switch(n.mode){case 0:return Pd(e,t,n.pads.length);case 1:return Ld(e,t,n.pads.length);case 2:return Vd(e,t,n.pads.length);case 3:return qd(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Fd=(e,t)=>{let n=O.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,r=O.size(n),i=[{type:12,data:r},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&i.push({type:s?e[2].dataType:1,data:t.value}),i.push(...X(e[0].dims,n));let o=["rank"],l=d=>{let p=H("output",e[0].dataType,n.length),f=B("x",e[0].dataType,a.length),m=f.type.value,y=Wd(p,a.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(w).declareVariables(f,p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:i}),getShaderSource:l}},Gd=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,r=e[0].dims.length,i=new Int32Array(2*r).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)i[Number(o[l])]=Number(n[l]),i[Number(o[l])+r]=Number(n[l+o.length])}else n.forEach((o,l)=>i[Number(l)]=Number(o));let s=[];return i.forEach(o=>s.push(o)),{mode:t.mode,value:a,pads:s}}else return t},km=(e,t)=>{Ud(e.inputs);let n=Gd(e.inputs,t);e.compute(Fd(e.inputs,n),{inputs:[0]})}}),$n,Pr,Lr,Vr,qr,Hd,jd,Wr,Fr,Sm,Tm,Gr,Em,Im,Hr,Cm,Am,zm,Om,r_=L(()=>{He(),te(),ae(),re(),$n=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Pr=(e,t,n)=>{let a=t.format==="NHWC",r=e.dims.slice();a&&r.splice(1,0,r.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),l=i?t.dilations.slice():[],d=t.pads.slice();xa.adjustPoolAttributes(n,r,s,o,l,d);let p=xa.computePoolOutputShape(n,r,o,l,s,d,t.autoPad),f=Object.assign({},t);i?Object.assign(f,{kernelShape:s,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let m=p.slice();return m.push(m.splice(1,1)[0]),[f,a?m:p]},Lr=(e,t)=>{let n=t.format==="NHWC",a=O.size(e),r=O.size(t.kernelShape),i=[{type:12,data:a},{type:12,data:r}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],f=!!(d+p);i.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:p}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];m=!!(_+k),i.push({type:12,data:y},{type:12,data:w},{type:12,data:_},{type:12,data:k}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,f,m]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=O.computeStrides(t.kernelShape);i.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,p)=>d+p);return[i,s,!!l,!1,!1]}},Vr=(e,t,n,a,r,i,s,o,l,d,p,f)=>{let m=r.format==="NHWC",y=t.type.value,w=H("output",t.type.tensor,a);if(r.kernelShape.length<=2){let _="",k="",$="",b=n-(m?2:1);if(p?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,r.kernelShape.length===2){let T=n-(m?3:2);f?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
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
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=r.kernelShape.length,k=r.pads.length,$="";return d?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
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
              ${s}

              output[global_idx] = value;
            }`}},qr=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Hd=e=>`${qr(e)};${e.countIncludePad}`,jd=e=>`${qr(e)};${e.storageOrder};${e.dilations}`,Wr=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Fr=(e,t,n,a)=>{let[r,i]=Pr(t,a,n),s=B("x",t.dataType,t.dims.length),o=s.type.value,l="value += x_val;",d="";r.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[p,f,m,y,w]=Lr(i,r);p.push(...X(t.dims,i));let _=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${m};${y};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:p}),getShaderSource:k=>Vr(k,s,t.dims.length,i.length,r,l,d,0,f,m,y,w)}},Sm=e=>{let t=e.count_include_pad!==0,n=Wr(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:t,...n,cacheKey:""};return{...a,cacheKey:Hd(a)}},Tm=(e,t)=>{$n(e.inputs),e.compute(Fr("AveragePool",e.inputs[0],!1,t))},Gr={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Em=e=>{let t=e.format;return{format:t,...Gr,cacheKey:t}},Im=(e,t)=>{$n(e.inputs),e.compute(Fr("GlobalAveragePool",e.inputs[0],!0,t))},Hr=(e,t,n,a)=>{let[r,i]=Pr(t,a,n),s=`
      value = max(x_val, value);
    `,o="",l=B("x",t.dataType,t.dims.length),d=["rank"],[p,f,m,y,w]=Lr(i,r);return p.push(...X(t.dims,i)),{name:e,shaderCache:{hint:`${a.cacheKey};${m};${y};${w}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:p}),getShaderSource:_=>Vr(_,l,t.dims.length,i.length,r,s,o,t.dataType===10?-65504:-1e5,f,m,y,w)}},Cm=(e,t)=>{$n(e.inputs),e.compute(Hr("MaxPool",e.inputs[0],!1,t))},Am=e=>{let t=e.storage_order,n=e.dilations,a=Wr(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let r={storageOrder:t,dilations:n,...a,cacheKey:""};return{...r,cacheKey:jd(r)}},zm=e=>{let t=e.format;return{format:t,...Gr,cacheKey:t}},Om=(e,t)=>{$n(e.inputs),e.compute(Hr("GlobalMaxPool",e.inputs[0],!0,t))}}),Kd,Xd,Rm,Nm,i_=L(()=>{te(),ae(),Se(),re(),Kd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,a)=>n===e[2].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((r,i)=>i===t.axis||r===e[0].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],a=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/a)||t.blockSize>Math.ceil(n/(a-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Xd=(e,t)=>{let n=O.normalizeAxis(t.axis,e[0].dims.length),a=e[0].dataType,r=a===3,i=e[0].dims,s=e[1].dataType,o=O.size(i),l=a===3||a===2,d=l?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,f=e.length>2?e[2]:void 0,m=f?l?[Math.ceil(O.size(f.dims)/4)]:f.dims:void 0,y=p.length===0||p.length===1&&p[0]===1,w=y===!1&&p.length===1,_=ke(o),k=y&&(!l||_===4),$=k?_:1,b=k&&!l?_:1,T=B("input",l?12:a,d.length,b),S=B("scale",s,p.length),I=f?B("zero_point",l?12:a,m.length):void 0,C=H("output",s,i.length,$),z=[T,S];I&&z.push(I);let x=[d,p];f&&x.push(m);let M=[{type:12,data:o/$},{type:12,data:n},{type:12,data:t.blockSize},...X(...x,i)],P=Y=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Y.registerUniforms(G).declareVariables(...z,C)}
      ${Y.mainStart()}
          ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${r?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

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
                let zero_point_vec =  ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:w?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${r?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?r?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(o/$/64),y:1,z:1},programUniforms:M})}},Rm=(e,t)=>{Kd(e.inputs,t),e.compute(Xd(e.inputs,t))},Nm=e=>he({axis:e.axis,blockSize:e.blockSize})}),Yd,Zd,Bm,s_=L(()=>{He(),te(),re(),Yd=(e,t,n)=>{let a=e===t,r=e<t&&n<0,i=e>t&&n>0;if(a||r||i)throw new Error("Range these inputs' contents are invalid.")},Zd=(e,t,n,a)=>{let r=Math.abs(Math.ceil((t-e)/n)),i=[r],s=r,o=[{type:12,data:s},{type:a,data:e},{type:a,data:n},...X(i)],l=d=>{let p=H("output",a,i.length),f=p.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(m).declareVariables(p)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Bm=e=>{let t=0,n=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&Yd(t,n,a),e.compute(Zd(t,n,a,e.inputs[0].dataType),{inputs:[]})}}),Jd,Qd,Mm,Dm,o_=L(()=>{te(),ae(),Se(),re(),Jd=(e,t,n,a)=>{if(e!=="none"&&a!=="i32"&&a!=="u32"&&a!=="f32")throw new Error(`Input ${a} is not supported with reduction ${e}.`);let r=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return a==="i32"||a==="u32"?`atomicAdd(&${t}, bitcast<${a}>(${n}));`:`
              ${r}bitcast<${a}>(oldValue) + (${n})${i}`;case"max":return a==="i32"||a==="u32"?`atomicMax(&${t}, bitcast<${a}>(${n}));`:`
                ${r}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return a==="i32"||a==="u32"?`atomicMin(&${t}, bitcast<${a}>(${n}));`:`${r}min(bitcast<${a}>(oldValue), (${n}))${i}`;case"mul":return`${r}(bitcast<${a}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Qd=(e,t)=>{let n=e[0].dims,a=e[1].dims,r=n,i=1,s=Math.ceil(O.sizeToDimension(a,a.length-1)/i),o=a[a.length-1],l=O.sizeFromDimension(n,o),d=[{type:12,data:s},{type:12,data:o},{type:12,data:l},...X(e[1].dims,e[2].dims,r)],p=f=>{let m=B("indices",e[1].dataType,e[1].dims.length),y=B("updates",e[2].dataType,e[2].dims.length,i),w=t.reduction!=="none"&&t.reduction!==""?cf("output",e[0].dataType,r.length):H("output",e[0].dataType,r.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,y,w)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${Jd(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:p}},Mm=e=>he({reduction:e.reduction}),Dm=(e,t)=>{e.compute(Qd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ec,tc,nc,jr,ac,rc,ic,sc,oc,uc,lc,dc,Kr,cc,pc,fc,hc,mc,Um,Pm,u_=L(()=>{te(),ae(),Se(),re(),ec=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},tc=(e,t,n)=>{t.every(r=>r>=0&&r<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(n).fill(1);return t.forEach((r,i)=>a[r]=e[i]),a},nc=(e,t,n,a,r,i)=>{let[s,o,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(p=>i.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(p=>a.push(p)),a.length!==0&&a.length!==d&&n>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");ec(a,t),t.axes.length>0&&tc(a,t.axes,d).forEach((p,f)=>a[f]=p)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(p=>r.push(Number(p))),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof r<"u"&&a.length>0&&r.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},jr=(e,t,n,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${a}(big / (${n}));
  let fract = ${a}(big % (${n})) / ${a}(${n});
  return whole + fract;
`,ac=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${jr("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${jr("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",rc=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ic=(e,t,n)=>{let a=new Array(n).fill(0).concat(new Array(n).fill(1)),r=e.length===0?a:e.slice();return t.length>0?(t.forEach((i,s)=>{a[i]=r[s],a[s+n]=r[t.length+s]}),a):r},sc=(e,t,n,a)=>{let r=[];if(n.length>0)if(a.length>0){if(e.forEach(i=>r.push(i)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((i,s)=>r[i]=n[s])}else n.forEach(i=>r.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");r=e.map((i,s)=>Math.round(i*t[s]))}return r},oc=(e,t,n)=>{let a=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let r=e.slice();return n.axes.length>0?(n.axes.forEach(i=>t[i]=a),n.axes.forEach(i=>r[i]=Math.round(e[i]*t[i]))):(t.fill(a,0,t.length),r.forEach((i,s)=>r[s]=Math.round(i*t[s]))),r},uc=(e,t,n,a,r)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",a)};
        var roi_low = ${K("uniforms.roi","i",r)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,r)};
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
    }`,lc=(e,t,n,a,r,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",r)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",i)};
          var roi_hi = ${K("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${K("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,dc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Kr=(e,t,n,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",cc=(e,t,n,a,r)=>{let[i,s,o,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${n[o]} - 1))`)};
      ${Kr(e,l,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${a?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[o]} - 1)) {
        return ${r};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${i}])`:"0"};
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
    }`},pc=(e,t,n,a,r,i,s,o,l,d)=>{let p=n.length===2,[f,m]=p?[0,1]:[2,3],y=e.type.value,w=_=>{let k=_===f?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${r[_]},
        ${a[_]}, ${n[_]}, ${i[_]}, ${i[_]} + ${n.length});
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
          data[i + 1] = ${_===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(f)};
    ${w(m)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
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
    `},fc=(e,t,n,a,r)=>{let[i,s,o,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Kr(e,d,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${o}];
      var width:${p} = originalIndices[${l}];
      ${a?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[o]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${r};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[o]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${i}])`:"0"};

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
    }`},hc=(e,t,n,a,r,i)=>{let s=e.dims,o=ic(i,t.axes,s.length),l=sc(s,a,r,t.axes),d=a.slice();a.length===0&&(d=s.map((b,T)=>b===0?1:l[T]/b),t.keepAspectRatioPolicy!=="stretch"&&(l=oc(s,d,t)));let p=H("output",e.dataType,l.length),f=B("input",e.dataType,s.length),m=O.size(l),y=s.length===l.length&&s.every((b,T)=>b===l[T]),w=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,k=f.type.value,$=b=>`
      ${y?"":`
      ${ac(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${dc(f,s)};
              ${rc(t.nearestMode,n,k)};
              ${lc(f,p,s,l,d.length,o.length,w)};
              `;case"linear":return`
              ${uc(p,s,l,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${cc(f,p,s,w,_)}`;if(s.length===3||s.length===5)return`${fc(f,p,s,w,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${pc(f,p,s,l,d,o,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,p)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${r.length>0?r:""}|${o.length>0?o:""}|${y}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:o},...X(s,l)]})}},mc=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Um=(e,t)=>{let n=[],a=[],r=[],i=mc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");nc(e.inputs,t,i,n,a,r),e.compute(hc(e.inputs[0],t,i,n,a,r),{inputs:[0]})},Pm=e=>{let t=e.antialias,n=e.axes,a=e.coordinateTransformMode,r=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:n,coordinateTransformMode:a,cubicCoeffA:r,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),gc,yc,Lm,l_=L(()=>{te(),ae(),re(),gc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],a=e[2];if(t.dataType!==n.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let r=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==r)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==r)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==r)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==r)throw new Error("Bias must have the same hidden size as input")}},yc=(e,t,n,a)=>{let r=t.simplified,i=e[0].dims,s=O.size(i),o=i,l=s,d=i.slice(-1)[0],p=a?i.slice(0,-1).concat(1):[],f=!r&&e.length>3,m=e.length>4,y=a&&n>1,w=a&&n>2,_=n>3,k=64,$=ke(d),b=[{type:12,data:l},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],T=I=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[B("x",e[0].dataType,e[0].dims,$),B("skip",e[1].dataType,e[1].dims,$),B("gamma",e[2].dataType,e[2].dims,$)];f&&z.push(B("beta",e[3].dataType,e[3].dims,$)),m&&z.push(B("bias",e[4].dataType,e[4].dims,$)),z.push(H("output",e[0].dataType,o,$)),y&&z.push(H("mean_output",1,p)),w&&z.push(H("inv_std_output",1,p)),_&&z.push(H("input_skip_bias_sum",e[0].dataType,o,$));let x=Ie(e[0].dataType),M=Ie(1,$);return`

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
          let f32_value = ${rn(x,$,"value")};
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
        let inv_std_dev = inverseSqrt(${Ct("square_sum",$)} / f32(uniforms.hidden_size) ${r?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${r?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:o,dataType:e[0].dataType}];return n>1&&S.push({dims:p,dataType:1}),n>2&&S.push({dims:p,dataType:1}),n>3&&S.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${w};${_}`,inputDependencies:e.map((I,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:b})}},Lm=(e,t)=>{gc(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(yc(e.inputs,t,e.outputCount,!1),{outputs:n})}}),wc,xn,_c,Xr,bc,vc,Vm,qm,d_=L(()=>{te(),ae(),Se(),re(),wc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},xn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>n.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>n.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},_c=(e,t)=>{if(e.length>1){let n=xn(e,1),a=xn(e,2),r=xn(e,3);return r.length===0&&(r=[...Array(e[0].dims.length).keys()]),he({starts:n,ends:a,axes:r})}else return t},Xr=(e,t,n,a,r)=>{let i=e;return e<0&&(i+=n[a[t]]),r[t]<0?Math.max(0,Math.min(i,n[a[t]]-1)):Math.max(0,Math.min(i,n[a[t]]))},bc=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,vc=(e,t)=>{let n=e[0].dims,a=O.size(n),r=t.axes.length>0?O.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],i=xn(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(r.length).fill(1));let s=t.starts.map(($,b)=>Xr($,b,n,r,i)),o=t.ends.map(($,b)=>Xr($,b,n,r,i));if(r.length!==s.length||r.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(r.length!==n.length)for(let $=0;$<n.length;++$)r.includes($)||(s.splice($,0,0),o.splice($,0,n[$]),i.splice($,0,1));let l=i.map($=>Math.sign($));i.forEach(($,b,T)=>{if($<0){let S=(o[b]-s[b])/$,I=s[b],C=I+S*i[b];s[b]=C,o[b]=I,T[b]=-$}});let d=n.slice(0);r.forEach(($,b)=>{d[$]=Math.ceil((o[$]-s[$])/i[$])});let p={dims:d,dataType:e[0].dataType},f=H("output",e[0].dataType,d.length),m=B("input",e[0].dataType,e[0].dims.length),y=O.size(d),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:y},{type:12,data:s},{type:6,data:l},{type:12,data:i},...X(e[0].dims,d)],k=$=>`
      ${$.registerUniforms(w).declareVariables(m,f)}
        ${bc(m,f,n)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:_})}},Vm=(e,t)=>{wc(e.inputs,t);let n=_c(e.inputs,t);e.compute(vc(e.inputs,n),{inputs:[0]})},qm=e=>{let t=e.starts,n=e.ends,a=e.axes;return he({starts:t,ends:n,axes:a})}}),$c,xc,Wm,Fm,c_=L(()=>{te(),ae(),Se(),zt(),re(),$c=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},xc=(e,t)=>{let n=e.inputs[0],a=n.dims,r=O.size(a),i=a.length,s=O.normalizeAxis(t.axis,i),o=s<a.length-1,l,d=[];o?(d=Array.from({length:i},(z,x)=>x),d[s]=i-1,d[i-1]=s,l=e.compute(qe(n,d),{inputs:[n],outputs:[-1]})[0]):l=n;let p=l.dims,f=p[i-1],m=r/f,y=ke(f),w=f/y,_=64;m===1&&(_=256);let k=(z,x)=>x===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:x===2?`max(${z}.x, ${z}.y)`:x===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=B("x",l.dataType,l.dims,y),b=H("result",l.dataType,l.dims,y),T=$.type.value,S=Ie(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,I=z=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
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
          rowMaxShared = ${T}(${k("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
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
          rowSumShared = ${T}(${Ct("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${y};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:w}]}),getShaderSource:I},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(qe(C,d),{inputs:[C]})},Wm=(e,t)=>{$c(e.inputs),xc(e,t)},Fm=e=>he({axis:e.axis})}),Yr,kc,Sc,Tc,Gm,p_=L(()=>{te(),ae(),re(),Yr=e=>Array.from(e.getBigInt64Array(),Number),kc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Yr(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Sc=(e,t)=>{let n=[];for(let a=0;a<e.length;++a)n.push(e[a]*t[a]);return n},Tc=(e,t)=>{let n=e[0].dims,a=t??Yr(e[1]),r=Sc(n,a),i=O.size(r),s=e[0].dataType,o=B("input",s,n.length),l=H("output",s,r.length),d=p=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...X(e[0].dims,r)]}),getShaderSource:d}},Gm=e=>{kc(e.inputs),e.compute(Tc(e.inputs),{inputs:[0]})}}),Ec,Ic,Hm,f_=L(()=>{te(),ae(),re(),Ec=(e,t,n,a,r)=>{let i=H("output_data",r,n.length,4),s=B("a_data",t[1].dataType,t[1].dims.length,4),o=B("b_data",t[2].dataType,t[2].dims.length,4),l=B("c_data",t[0].dataType,t[0].dims.length,4),d,p=(f,m,y)=>`select(${m}, ${f}, ${y})`;if(!a)d=i.setByOffset("global_idx",p(s.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(m,y,w="")=>{let _=`a_data[index_a${y}][component_a${y}]`,k=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${i.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let offset_b${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${m}[${y}] = ${w}(${p(_,k,$)});
          `};r===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,o,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ic=e=>{let t=e[1].dims,n=e[2].dims,a=e[0].dims,r=e[1].dataType,i=!(O.areEqual(t,n)&&O.areEqual(n,a)),s=t,o=O.size(t);if(i){let d=sn.calcShape(sn.calcShape(t,n,!1),a,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=O.size(s)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Ec(d,e,s,i,r),getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...X(a,t,n,s)]})}},Hm=e=>{e.compute(Ic(e.inputs))}}),jm,h_=L(()=>{Iw(),ji(),Cw(),Aw(),zw(),Ow(),Rw(),Uw(),Lw(),Vw(),qw(),Ww(),Fw(),Gw(),Hw(),jw(),Kw(),Xw(),Yw(),Zw(),Jw(),Qw(),e_(),t_(),n_(),pm(),a_(),r_(),i_(),s_(),o_(),Hi(),u_(),ym(),l_(),d_(),c_(),mm(),p_(),zt(),Ki(),f_(),jm=new Map([["Abs",[Lf]],["Acos",[Vf]],["Acosh",[qf]],["Add",[$h]],["ArgMax",[Mf,yi]],["ArgMin",[Bf,yi]],["Asin",[Wf]],["Asinh",[Ff]],["Atan",[Gf]],["Atanh",[Hf]],["Attention",[Df]],["AveragePool",[Tm,Sm]],["BatchNormalization",[Uf]],["BiasAdd",[Pf]],["BiasSplitGelu",[vh]],["Cast",[Kf,jf]],["Ceil",[Yf]],["Clip",[Xf]],["Concat",[Oh,Rh]],["Conv",[xi,$i]],["ConvTranspose",[Wh,qh]],["Cos",[Zf]],["Cosh",[Jf]],["CumSum",[Fh,Gh]],["DepthToSpace",[Hh,jh]],["DequantizeLinear",[Rm,Nm]],["Div",[xh]],["Einsum",[Kh,Xh]],["Elu",[Qf,An]],["Equal",[kh]],["Erf",[eh]],["Exp",[th]],["Expand",[Yh]],["FastGelu",[Zh]],["Floor",[nh]],["FusedConv",[xi,$i]],["Gather",[Qh,Jh]],["GatherElements",[im,rm]],["GatherBlockQuantized",[nm,am]],["GatherND",[em,tm]],["Gelu",[ah]],["Gemm",[om,sm]],["GlobalAveragePool",[Im,Em]],["GlobalMaxPool",[Om,zm]],["Greater",[Ih]],["GreaterOrEqual",[Ah]],["GridSample",[um,lm]],["GroupQueryAttention",[wm]],["HardSigmoid",[ch,dh]],["InstanceNormalization",[_m]],["LayerNormalization",[bm]],["LeakyRelu",[rh,An]],["Less",[Ch]],["LessOrEqual",[zh]],["Log",[_h]],["MatMul",[vm]],["MatMulNBits",[$m,xm]],["MaxPool",[Cm,Am]],["Mul",[Sh]],["MultiHeadAttention",[cm,dm]],["Neg",[sh]],["Not",[ih]],["Pad",[km]],["Pow",[Th]],["QuickGelu",[bh,An]],["Range",[Bm]],["Reciprocal",[oh]],["ReduceMin",[Af]],["ReduceMean",[Sf]],["ReduceMax",[Cf]],["ReduceSum",[Of]],["ReduceProd",[zf]],["ReduceL1",[Tf]],["ReduceL2",[Ef]],["ReduceLogSum",[Nf]],["ReduceLogSumExp",[If]],["ReduceSumSquare",[Rf]],["Relu",[uh]],["Resize",[Um,Pm]],["RotaryEmbedding",[gm]],["ScatterND",[Dm,Mm]],["Sigmoid",[lh]],["Sin",[ph]],["Sinh",[fh]],["Slice",[Vm,qm]],["SkipLayerNormalization",[Lm]],["Split",[fm,hm]],["Sqrt",[hh]],["Softmax",[Wm,Fm]],["Sub",[Eh]],["Tan",[mh]],["Tanh",[gh]],["ThresholdedRelu",[wh,An]],["Tile",[Gm]],["Transpose",[ff,hf]],["Where",[Hm]]])}),Km,m_=L(()=>{He(),yt(),re(),Km=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,a,r){dt(e.programInfo.name);let i=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of n)o.push({binding:o.length,resource:{buffer:d.buffer}});r&&o.push({binding:o.length,resource:r});let l=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),tt(e.programInfo.name)}dispose(){}build(e,t){dt(e.name);let n=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{n.features.has(d.feature)&&a.push(`enable ${d.extension};`)});let r=pf(t,this.backend.device.limits),i=e.getShaderSource(r),s=`${a.join(`
`)}
${r.additionalImplementations}
${i}`,o=n.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=n.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return tt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:r.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,r=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=r&&n<=r&&a<=r)return[t,n,a];let i=t*n*a,s=Math.ceil(Math.sqrt(i));if(s>r){if(s=Math.ceil(Math.cbrt(i)),s>r)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Xm={};dn(Xm,{WebGpuBackend:()=>Ym});var Cc,Ac,zc,Ym,g_=L(()=>{He(),te(),yt(),of(),Tw(),h_(),m_(),Cc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let a=0;a<e.length;++a){let r=e[a].dataType;switch(t[a]){case"none":{n.push("");break}case"type":{n.push(`${r}`);break}case"rank":{let i=e[a].dims.length;n.push(`${r};${i}`);break}case"dims":{let i=e[a].dims.join(",");n.push(`${r};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return n.join("|")},Ac=(e,t,n)=>{let a=e.name;return e.shaderCache?.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+n+`:${Cc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,a},zc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ym=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},r=o=>t.features.has(o)&&n.push(o)&&!0;r("chromium-experimental-timestamp-query-inside-passes")||r("timestamp-query"),r("shader-f16"),r("subgroups"),this.device=await t.requestDevice(a);let i=t,s=t.info??(typeof i.requestAdapterInfo=="function"?await i.requestAdapterInfo():void 0);this.adapterInfo=new zc(s),this.gpuDataManager=df(this),this.programManager=new Km(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,qi(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;dt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let r=n[a],i=r.kernelId,s=this.kernels.get(i),o=s.kernelType,l=s.kernelName,d=r.programName,p=r.inputTensorViews,f=r.outputTensorViews,m=t[a*2],y=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let w=Number(m-this.queryTimeBase),_=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(_))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(k=>({dims:k.dims,dataType:ht(k.dataType)})),outputsMetadata:f.map(k=>({dims:k.dims,dataType:ht(k.dataType)})),kernelId:i,kernelType:o,kernelName:l,programName:d,startTime:w,endTime:_});else{let k="";p.forEach((b,T)=>{k+=`input[${T}]: [${b.dims}] | ${ht(b.dataType)}, `});let $="";f.forEach((b,T)=>{$+=`output[${T}]: [${b.dims}] | ${ht(b.dataType)}, `}),console.log(`[profiling] kernel "${i}|${o}|${l}|${d}" ${k}${$}start time: ${w} ns, execution time: ${_-w} ns`)}ba("GPU",`${d}::${m}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),tt()}run(e,t,n,a,r,i){dt(e.name);let s=[];for(let b=0;b<t.length;++b){let T=t[b].data;if(T===0)continue;let S=this.gpuDataManager.get(T);if(!S)throw new Error(`no GPU data for input: ${T}`);s.push(S)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=n.length===0?o.map((b,T)=>T):n;if(p.length!==o.length)throw new Error(`Output size ${p.length} must be equal to ${o.length}.`);let f=[],m=[];for(let b=0;b<o.length;++b){if(!Number.isInteger(p[b])||p[b]<-3||p[b]>=i)throw new Error(`Invalid output index: ${p[b]}`);if(p[b]===-3)continue;let T=p[b]===-1,S=p[b]===-2,I=T||S?r(o[b].dataType,o[b].dims):a(p[b],o[b].dataType,o[b].dims);if(f.push(I),I.data===0)continue;let C=this.gpuDataManager.get(I.data);if(!C)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(C),S){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(C)}m.push(C)}if(s.length!==t.length||m.length!==f.length){if(m.length===0)return tt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let b=0,T=[];d.forEach(z=>{let x=typeof z.data=="number"?[z.data]:z.data;if(x.length===0)return;let M=z.type===10?2:4,P,Y;z.type===10?(Y=x.length>4?16:x.length>2?8:x.length*M,P=x.length>4?16:M*x.length):(Y=x.length<=2?x.length*M:16,P=16),b=Math.ceil(b/Y)*Y,T.push(b);let G=z.type===10?8:4;b+=x.length>4?Math.ceil(x.length/G)*P:x.length*M});let S=16;b=Math.ceil(b/S)*S;let I=new ArrayBuffer(b);d.forEach((z,x)=>{let M=T[x],P=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(I,M,P.length).set(P);else if(z.type===12)new Uint32Array(I,M,P.length).set(P);else if(z.type===10)new Uint16Array(I,M,P.length).set(P);else if(z.type===1)new Float32Array(I,M,P.length).set(P);else throw new Error(`Unsupported uniform type: ${ht(z.type)}`)});let C=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,I,0,b),this.gpuDataManager.release(C.id),y={offset:0,size:b,buffer:C.buffer}}let w=this.programManager.normalizeDispatchGroupSize(l),_=w[1]===1&&w[2]===1,k=Ac(e,t,_),$=this.programManager.getArtifact(k);if($||($=this.programManager.build(e,w),this.programManager.setArtifact(k,$),de("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let b=0;b<d.length;b++){let T=d[b],S=T.type,I=typeof T.data=="number"?1:T.data.length,[C,z]=$.uniformVariablesInfo[b];if(S!==C||I!==z)throw new Error(`Uniform variable ${b} mismatch: expect type ${C} with size ${z}, got type ${S} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run($,s,m,w,y),tt(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,a){let r=jm.get(e);if(!r)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:a,kernelEntry:r[0],attributes:[r[1],n]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let r=a.kernelType,i=a.kernelName,s=a.kernelEntry,o=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${r}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${r}] ${i}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return n.push(Promise.resolve(`[WebGPU] Kernel "[${r}] ${i}" failed. ${d}`)),1}finally{l&&n.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${r}] ${i}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,a){let r=this.sessionExternalDataMapping.get(e);r||(r=new Map,this.sessionExternalDataMapping.set(e,r));let i=r.get(t),s=this.gpuDataManager.registerExternalBuffer(n,a,i);return r.set(t,[s,n]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let a=await hi(this,e,t);return Wi(a.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let a=0;a<n;a++){let r=this.getComputePassEncoder(),i=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),r.setPipeline(i.computePipeline),r.setBindGroup(0,i.bindGroup),r.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Zm={};dn(Zm,{init:()=>Jm});var da,Oc,Jm,y_=L(()=>{te(),yt(),ae(),Sw(),da=class Qm{constructor(t,n,a,r){this.module=t,this.dataType=n,this.data=a,this.dims=r}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new Qm(this.module,this.dataType,this.data,t)}},Oc=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let a=e.PTR_SIZE,r=n/e.PTR_SIZE,i=a===4?"i32":"i64";this.opKernelContext=Number(e.getValue(a*r++,i));let s=Number(e.getValue(a*r++,i));this.outputCount=Number(e.getValue(a*r++,i)),this.customDataOffset=Number(e.getValue(a*r++,"*")),this.customDataSize=Number(e.getValue(a*r++,i));let o=[];for(let l=0;l<s;l++){let d=Number(e.getValue(a*r++,i)),p=Number(e.getValue(a*r++,"*")),f=Number(e.getValue(a*r++,i)),m=[];for(let y=0;y<f;y++)m.push(Number(e.getValue(a*r++,i)));o.push(new da(e,d,p,m))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,a=t?.outputs??[],r=(s,o,l)=>new da(this.module,o,this.output(s,l),l),i=(s,o)=>{let l=Wt(s,o);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new da(this.module,s,d,o)};return this.backend.run(e,n,a,r,i,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let a=this.module.PTR_SIZE,r=a===4?"i32":"i64",i=this.module.stackAlloc((1+t.length)*a);this.module.setValue(i,t.length,r);for(let s=0;s<t.length;s++)this.module.setValue(i+a*(s+1),t[s],r);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(n)}}},Jm=async(e,t,n,a)=>{let r=t.jsepInit;if(!r)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=(g_(),Nn(Xm)).WebGpuBackend,s=new i;await s.initialize(n,a),r("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,l,d,p=!1)=>{if(p)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(o),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(l),f)}},async(o,l,d)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>s.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>s.releaseKernel(o),(o,l,d,p)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let f=new Oc(t,s,Number(l));return s.computeKernel(Number(o),f,p)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let i=new lf(n);r("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,o,l,d,p)=>i.ensureTensor(s,o,l,d,p),(s,o)=>{i.uploadTensor(s,o)},async(s,o)=>i.downloadTensor(s,o),(s,o)=>i.registerMLContext(s,o),!!n.trace])}}}),Rc,es,ts,kt,Nc,Zr,Ea,ns,as,Jr,rs,is,ss,eg=L(()=>{He(),$w(),xw(),te(),Yt(),Ui(),nf(),Rc=(e,t)=>{we()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},es=async e=>{Rc(e.wasm.numThreads,$a(e.logLevel))},ts=async(e,t)=>{we().asyncInit?.();let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let r=e.webgpu.forceFallbackAdapter;if(r!==void 0&&typeof r!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:r}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(y_(),Nn(Zm)).init;t==="webgpu"&&await a("webgpu",we(),e,n),t==="webnn"&&await a("webnn",we(),e)}},kt=new Map,Nc=e=>{let t=we(),n=t.stackSave();try{let a=t.PTR_SIZE,r=t.stackAlloc(2*a);t._OrtGetInputOutputCount(e,r,r+a)!==0&&me("Can't get session input/output count.");let i=a===4?"i32":"i64";return[Number(t.getValue(r,i)),Number(t.getValue(r+a,i))]}finally{t.stackRestore(n)}},Zr=(e,t)=>{let n=we(),a=n.stackSave(),r=0;try{let i=n.PTR_SIZE,s=n.stackAlloc(2*i);n._OrtGetInputOutputMetadata(e,t,s,s+i)!==0&&me("Can't get session input/output metadata.");let o=Number(n.getValue(s,"*"));r=Number(n.getValue(s+i,"*"));let l=n.HEAP32[r/4];if(l===0)return[o,0];let d=n.HEAPU32[r/4+1],p=[];for(let f=0;f<d;f++){let m=Number(n.getValue(r+8+f*i,"*"));p.push(m!==0?n.UTF8ToString(m):Number(n.getValue(r+8+(f+d)*i,"*")))}return[o,l,p]}finally{n.stackRestore(a),r!==0&&n._OrtFree(r)}},Ea=e=>{let t=we(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},ns=async(e,t)=>{let n,a,r=we();Array.isArray(e)?[n,a]=e:e.buffer===r.HEAPU8.buffer?[n,a]=[e.byteOffset,e.byteLength]:[n,a]=Ea(e);let i=0,s=0,o=0,l=[],d=[],p=[];try{if([s,l]=await tf(t),t?.externalData&&r.mountExternalData){let S=[];for(let I of t.externalData){let C=typeof I=="string"?I:I.path;S.push(Vi(typeof I=="string"?I:I.data).then(z=>{r.mountExternalData(C,z)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(r.shouldTransferToMLTensor=!1,typeof S!="string"){let I=S,C=I?.context,z=I?.gpuDevice,x=I?.deviceType,M=I?.powerPreference;C?r.currentContext=C:z?r.currentContext=await r.webnnCreateMLContext(z):r.currentContext=await r.webnnCreateMLContext({deviceType:x,powerPreference:M})}else r.currentContext=await r.webnnCreateMLContext();break}i=await r._OrtCreateSession(n,a,s),r.webgpuOnCreateSession?.(i),i===0&&me("Can't create a session."),r.jsepOnCreateSession?.(),r.currentContext&&(r.webnnRegisterMLContext(i,r.currentContext),r.currentContext=void 0,r.shouldTransferToMLTensor=!0);let[f,m]=Nc(i),y=!!t?.enableGraphCapture,w=[],_=[],k=[],$=[],b=[];for(let S=0;S<f;S++){let[I,C,z]=Zr(i,S);I===0&&me("Can't get an input name."),d.push(I);let x=r.UTF8ToString(I);w.push(x),k.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ht(C),shape:z})}for(let S=0;S<m;S++){let[I,C,z]=Zr(i,S+f);I===0&&me("Can't get an output name."),p.push(I);let x=r.UTF8ToString(I);_.push(x),$.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ht(C),shape:z});{if(y&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let M=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",P=r.webnnIsGraphOutput;if(M==="cpu"&&P&&P(i,x)){b.push("ml-tensor-cpu-output");continue}if(M!=="cpu"&&M!=="cpu-pinned"&&M!=="gpu-buffer"&&M!=="ml-tensor")throw new Error(`Not supported preferred output location: ${M}.`);if(y&&M!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${M}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(M)}}let T=null;return b.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(o=r._OrtCreateBinding(i),o===0&&me("Can't create IO binding."),T={handle:o,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>pi(S))}),kt.set(i,[i,d,p,T,y,!1]),[i,w,_,k,$]}catch(f){throw d.forEach(m=>r._OrtFree(m)),p.forEach(m=>r._OrtFree(m)),o!==0&&r._OrtReleaseBinding(o)!==0&&me("Can't release IO binding."),i!==0&&r._OrtReleaseSession(i)!==0&&me("Can't release session."),f}finally{r._free(n),s!==0&&r._OrtReleaseSessionOptions(s)!==0&&me("Can't release session options."),l.forEach(f=>r._free(f)),r.unmountExternalData?.()}},as=e=>{let t=we(),n=kt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,r,i,s,o]=n;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),r.forEach(l=>t._OrtFree(l)),i.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(a)!==0&&me("Can't release session."),kt.delete(e)},Jr=async(e,t,n,a,r,i,s=!1)=>{if(!e){t.push(0);return}let o=we(),l=o.PTR_SIZE,d=e[0],p=e[1],f=e[3],m=f,y,w;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;w=Wt(qt(d),p);{let b=o.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=b(a,i,$,w)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;w=Wt(qt(d),p);let b=o.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=b(a,$,qt(d),p)}else{let $=e[2];if(Array.isArray($)){w=l*$.length,y=o._malloc(w),n.push(y);for(let b=0;b<$.length;b++){if(typeof $[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);o.setValue(y+b*l,et($[b],n),"*")}}else{let b=o.webnnIsGraphInput,T=o.webnnIsGraphOutput;if(d!=="string"&&b&&T){let S=o.UTF8ToString(r);if(b(a,S)||T(a,S)){let I=qt(d);w=Wt(I,p),m="ml-tensor";let C=o.webnnCreateTemporaryTensor,z=o.webnnUploadTensor;if(!C||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await C(a,I,p);z(x,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=x}else w=$.byteLength,y=o._malloc(w),n.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,w),y)}else w=$.byteLength,y=o._malloc(w),n.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,w),y)}}let _=o.stackSave(),k=o.stackAlloc(4*p.length);try{p.forEach((b,T)=>o.setValue(k+T*l,b,l===4?"i32":"i64"));let $=o._OrtCreateTensor(qt(d),y,w,k,p.length,pi(m));$===0&&me(`Can't create tensor for input/output. session=${a}, index=${i}.`),t.push($)}finally{o.stackRestore(_)}},rs=async(e,t,n,a,r,i)=>{let s=we(),o=s.PTR_SIZE,l=kt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],f=l[2],m=l[3],y=l[4],w=l[5],_=t.length,k=a.length,$=0,b=[],T=[],S=[],I=[],C=[],z=s.stackSave(),x=s.stackAlloc(_*o),M=s.stackAlloc(_*o),P=s.stackAlloc(k*o),Y=s.stackAlloc(k*o);try{[$,b]=ef(i),Gt("wasm prepareInputOutputTensor");for(let D=0;D<_;D++)await Jr(n[D],T,I,e,p[t[D]],t[D],y);for(let D=0;D<k;D++)await Jr(r[D],S,I,e,f[a[D]],_+a[D],y);Ht("wasm prepareInputOutputTensor");for(let D=0;D<_;D++)s.setValue(x+D*o,T[D],"*"),s.setValue(M+D*o,p[t[D]],"*");for(let D=0;D<k;D++)s.setValue(P+D*o,S[D],"*"),s.setValue(Y+D*o,f[a[D]],"*");if(m&&!w){let{handle:D,outputPreferredLocations:F,outputPreferredLocationsEncoded:Q}=m;if(p.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${p.length}).`);Gt("wasm bindInputsOutputs");for(let ee=0;ee<_;ee++){let ne=t[ee];await s._OrtBindInput(D,p[ne],T[ee])!==0&&me(`Can't bind input[${ee}] for session=${e}.`)}for(let ee=0;ee<k;ee++){let ne=a[ee];r[ee]?.[3]?(C.push(S[ee]),s._OrtBindOutput(D,f[ne],S[ee],0)!==0&&me(`Can't bind pre-allocated output[${ee}] for session=${e}.`)):s._OrtBindOutput(D,f[ne],0,Q[ne])!==0&&me(`Can't bind output[${ee}] to ${F[ee]} for session=${e}.`)}Ht("wasm bindInputsOutputs"),kt.set(e,[d,p,f,m,y,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d);let G;m?G=await s._OrtRunWithBinding(d,m.handle,k,P,$):G=await s._OrtRun(d,M,x,_,Y,k,P,$),G!==0&&me("failed to call OrtRun().");let j=[],R=[];Gt("wasm ProcessOutputTensor");for(let D=0;D<k;D++){let F=Number(s.getValue(P+D*o,"*"));if(F===S[D]||C.includes(S[D])){j.push(r[D]),F!==S[D]&&s._OrtReleaseTensor(F)!==0&&me("Can't release tensor.");continue}let Q=s.stackSave(),ee=s.stackAlloc(4*o),ne=!1,ie,U=0;try{s._OrtGetTensorData(F,ee,ee+o,ee+2*o,ee+3*o)!==0&&me(`Can't access output tensor data on index ${D}.`);let J=o===4?"i32":"i64",Z=Number(s.getValue(ee,J));U=s.getValue(ee+o,"*");let W=s.getValue(ee+o*2,"*"),Ee=Number(s.getValue(ee+o*3,J)),ze=[];for(let ge=0;ge<Ee;ge++)ze.push(Number(s.getValue(W+ge*o,J)));s._OrtFree(W)!==0&&me("Can't free memory for tensor dims.");let $e=ze.reduce((ge,ve)=>ge*ve,1);ie=ht(Z);let Oe=m?.outputPreferredLocations[a[D]];if(ie==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ge=[];for(let ve=0;ve<$e;ve++){let Ne=s.getValue(U+ve*o,"*"),Ln=s.getValue(U+(ve+1)*o,"*"),at=ve===$e-1?void 0:Ln-Ne;ge.push(s.UTF8ToString(Ne,at))}j.push([ie,ze,ge,"cpu"])}else if(Oe==="gpu-buffer"&&$e>0){let ge=s.jsepGetBuffer;if(!ge)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ve=ge(U),Ne=Wt(Z,$e);if(Ne===void 0||!Pi(ie))throw new Error(`Unsupported data type: ${ie}`);ne=!0,j.push([ie,ze,{gpuBuffer:ve,download:s.jsepCreateDownloader(ve,Ne,ie),dispose:()=>{s._OrtReleaseTensor(F)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&$e>0){let ge=s.webnnEnsureTensor,ve=s.webnnIsGraphInputOutputTypeSupported;if(!ge||!ve)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Wt(Z,$e)===void 0||!Li(ie))throw new Error(`Unsupported data type: ${ie}`);if(!ve(e,ie,!1))throw new Error(`preferredLocation "ml-tensor" for ${ie} output is not supported by current WebNN Context.`);let Ne=await ge(e,U,Z,ze,!1);ne=!0,j.push([ie,ze,{mlTensor:Ne,download:s.webnnCreateMLTensorDownloader(U,ie),dispose:()=>{s.webnnReleaseTensorId(U),s._OrtReleaseTensor(F)}},"ml-tensor"])}else if(Oe==="ml-tensor-cpu-output"&&$e>0){let ge=s.webnnCreateMLTensorDownloader(U,ie)(),ve=j.length;ne=!0,R.push((async()=>{let Ne=[ve,await ge];return s.webnnReleaseTensorId(U),s._OrtReleaseTensor(F),Ne})()),j.push([ie,ze,[],"cpu"])}else{let ge=za(ie),ve=new ge($e);new Uint8Array(ve.buffer,ve.byteOffset,ve.byteLength).set(s.HEAPU8.subarray(U,U+ve.byteLength)),j.push([ie,ze,ve,"cpu"])}}finally{s.stackRestore(Q),ie==="string"&&U&&s._free(U),ne||s._OrtReleaseTensor(F)}}m&&!y&&(s._OrtClearBoundOutputs(m.handle)!==0&&me("Can't clear bound outputs."),kt.set(e,[d,p,f,m,y,!1]));for(let[D,F]of await Promise.all(R))j[D][2]=F;return Ht("wasm ProcessOutputTensor"),j}finally{s.webnnOnRunEnd?.(d),s.stackRestore(z),T.forEach(G=>s._OrtReleaseTensor(G)),S.forEach(G=>s._OrtReleaseTensor(G)),I.forEach(G=>s._free(G)),$!==0&&s._OrtReleaseRunOptions($),b.forEach(G=>s._free(G))}},is=e=>{let t=we(),n=kt.get(e);if(!n)throw new Error("invalid session id");let a=n[0],r=t._OrtEndProfiling(a);r===0&&me("Can't get an profile file name."),t._OrtFree(r)},ss=e=>{let t=[];for(let n of e){let a=n[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),St,Fe,en,kn,Sn,ca,Qr,pa,Ut,Pt,Bc,tg,ng,ag,rg,ig,sg,og,ug=L(()=>{He(),eg(),Yt(),Mi(),St=()=>!!be.wasm.proxy&&typeof document<"u",en=!1,kn=!1,Sn=!1,pa=new Map,Ut=(e,t)=>{let n=pa.get(e);n?n.push(t):pa.set(e,[t])},Pt=()=>{if(en||!kn||Sn||!Fe)throw new Error("worker not ready")},Bc=e=>{switch(e.data.type){case"init-wasm":en=!1,e.data.err?(Sn=!0,Qr[1](e.data.err)):(kn=!0,Qr[0]()),ca&&(URL.revokeObjectURL(ca),ca=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=pa.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},tg=async()=>{if(!kn){if(en)throw new Error("multiple calls to 'initWasm()' detected.");if(Sn)throw new Error("previous call to 'initWasm()' failed.");if(en=!0,St())return new Promise((e,t)=>{Fe?.terminate(),Jp().then(([n,a])=>{try{Fe=a,Fe.onerror=i=>t(i),Fe.onmessage=Bc,Qr=[e,t];let r={type:"init-wasm",in:be};!r.in.wasm.wasmPaths&&(n||ci)&&(r.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm",import.meta.url).href,import.meta.url).href}),Fe.postMessage(r),ca=n}catch(r){t(r)}},t)});try{await Di(be.wasm),await es(be),kn=!0}catch(e){throw Sn=!0,e}finally{en=!1}}},ng=async e=>{if(St())return Pt(),new Promise((t,n)=>{Ut("init-ep",[t,n]);let a={type:"init-ep",in:{epName:e,env:be}};Fe.postMessage(a)});await ts(be,e)},ag=async e=>St()?(Pt(),new Promise((t,n)=>{Ut("copy-from",[t,n]);let a={type:"copy-from",in:{buffer:e}};Fe.postMessage(a,[e.buffer])})):Ea(e),rg=async(e,t)=>{if(St()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Pt(),new Promise((n,a)=>{Ut("create",[n,a]);let r={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Fe.postMessage(r,i)})}else return ns(e,t)},ig=async e=>{if(St())return Pt(),new Promise((t,n)=>{Ut("release",[t,n]);let a={type:"release",in:e};Fe.postMessage(a)});as(e)},sg=async(e,t,n,a,r,i)=>{if(St()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(r.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Pt(),new Promise((s,o)=>{Ut("run",[s,o]);let l=n,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:a,options:i}};Fe.postMessage(d,ss(l))})}else return rs(e,t,n,a,r,i)},og=async e=>{if(St())return Pt(),new Promise((t,n)=>{Ut("end-profiling",[t,n]);let a={type:"end-profiling",in:e};Fe.postMessage(a)});is(e)}}),ei,Mc,lg,w_=L(()=>{He(),ug(),te(),Bi(),nf(),ei=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Mc=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Pi(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:a,dispose:r}=e[2];return Ge.fromGpuBuffer(n,{dataType:t,dims:e[1],download:a,dispose:r})}case"ml-tensor":{let t=e[0];if(!Li(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:a,dispose:r}=e[2];return Ge.fromMLTensor(n,{dataType:t,dims:e[1],download:a,dispose:r})}default:throw new Error(`invalid data location: ${e[3]}`)}},lg=class{async fetchModelAndCopyToWasmMemory(e){return ag(await Vi(e))}async loadModel(e,t){dt();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await rg(n,t),tt()}async dispose(){return ig(this.sessionId)}async run(e,t,n){dt();let a=[],r=[];Object.entries(e).forEach(f=>{let m=f[0],y=f[1],w=this.inputNames.indexOf(m);if(w===-1)throw new Error(`invalid input '${m}'`);a.push(y),r.push(w)});let i=[],s=[];Object.entries(t).forEach(f=>{let m=f[0],y=f[1],w=this.outputNames.indexOf(m);if(w===-1)throw new Error(`invalid output '${m}'`);i.push(y),s.push(w)});let o=a.map((f,m)=>ei(f,()=>`input "${this.inputNames[r[m]]}"`)),l=i.map((f,m)=>f?ei(f,()=>`output "${this.outputNames[s[m]]}"`):null),d=await sg(this.sessionId,r,o,s,l,n),p={};for(let f=0;f<d.length;f++)p[this.outputNames[s[f]]]=i[f]??Mc(d[f]);return tt(),p}startProfiling(){}endProfiling(){og(this.sessionId)}}}),dg={};dn(dg,{OnnxruntimeWebAssemblyBackend:()=>Ti,initializeFlags:()=>Si,wasmBackend:()=>cg});var Si,Ti,cg,__=L(()=>{He(),ug(),w_(),Si=()=>{(typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0);let e=be.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),be.wasm.simd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let t=typeof navigator>"u"?rw("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ti=class{async init(e){Si(),await tg(),await ng(e)}async createInferenceSessionHandler(e,t){let n=new lg;return await n.loadModel(e,t),n}},cg=new Ti});He();He();He();var b_="1.27.0";{let e=(__(),Nn(dg)).wasmBackend;an("webgpu",e,5),an("webnn",e,5),an("cpu",e,10),an("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:b_,enumerable:!0});const pg="fetch-cache",v_=()=>typeof caches<"u"?caches:void 0,$_=e=>{console.warn(`fetch-cache: キャッシュ ${e.op} に失敗したため network へ縮退します (${e.url})`,e.error)},x_=e=>{const t=e.headers.get("content-length");if(t===null)return;const n=Number(t);return Number.isFinite(n)&&n>=0?n:void 0},k_=async(e,t)=>{const n=x_(e),a=e.body;if(a===null){const d=new Uint8Array(await e.arrayBuffer());return t?.({loaded:d.length,total:n}),d}const r=[];let i=0;const s=a.getReader();for(;;){const{done:d,value:p}=await s.read();if(d)break;r.push(p),i+=p.length,t?.({loaded:i,total:n})}const o=new Uint8Array(i);let l=0;for(const d of r)o.set(d,l),l+=d.length;return o},Ei=async(e,t)=>(await t.validate?.(e),t.decode===void 0?e:await t.decode(e)),ti=new Map,ni=(e,t)=>n=>{try{e(n)}catch(a){console.warn(`fetch-cache: onProgress リスナーが throw しました（通知のみ中断・取得は続行） (${t})`,a)}},Dc=async(e,t,n)=>{const a=t.fetch??globalThis.fetch,r=t.cacheName??pg,i=t.onCacheError??$_,s=t.cache??!0?t.caches??v_():void 0;let o;if(s!==void 0)try{o=await s.open(r)}catch(f){i({op:"open",url:e,error:f})}if(o!==void 0){let f;try{const m=await o.match(e);f=m===void 0?void 0:new Uint8Array(await m.arrayBuffer())}catch(m){i({op:"match",url:e,error:m})}if(f!==void 0)try{return{raw:f,decoded:await Ei(f,t)}}catch{try{await o.delete(e)}catch(m){i({op:"delete",url:e,error:m})}}}const l=await a(e,t.init);if(!l.ok)throw await l.body?.cancel().catch(()=>{}),new Error(`fetch-cache: HTTP ${l.status} ${l.statusText} (${e})`);const d=await k_(l,n),p=await Ei(d,t);if(o!==void 0)try{await o.put(e,new Response(d))}catch(f){i({op:"put",url:e,error:f})}return{raw:d,decoded:p}},fg=async(e,t={})=>{const n=typeof e=="string"?e:e.href,a=(t.init?.method??"GET").toUpperCase();if((t.cache??!0)&&a!=="GET")throw new Error(`fetch-cache: GET 以外（${a}）はキャッシュできません（Cache API の制約）。cache: false を指定してください (${n})`);if(t.cache===!1){const{decoded:f}=await Dc(n,t,t.onProgress===void 0?void 0:ni(t.onProgress,n));return f}const r=`${t.cacheName??pg}\0${n}`,i=ti.get(r);if(i!==void 0){if(t.onProgress!==void 0){const m=ni(t.onProgress,n);i.listeners.add(m),i.state.last!==void 0&&m(i.state.last)}const{raw:f}=await i.promise;return await Ei(f,t)}const s=new Set;t.onProgress!==void 0&&s.add(ni(t.onProgress,n));const o={},d=Dc(n,t,f=>{o.last=f;for(const m of s)m(f)}).finally(()=>{ti.delete(r)});ti.set(r,{promise:d,listeners:s,state:o});const{decoded:p}=await d;return p},hg="https://huggingface.co",S_="fetch-cache-hf",T_={model:"",dataset:"datasets/",space:"spaces/"},E_={model:"models",dataset:"datasets",space:"spaces"},mg=e=>/^[0-9a-f]{40}$/.test(e),I_=e=>e.split("/").map(encodeURIComponent).join("/"),C_=e=>{const t=e.hubUrl??hg,n=e.kind??"model",a=e.revision??"main";return`${t}/${T_[n]}${e.repo}/resolve/${encodeURIComponent(a)}/${I_(e.path)}`},os=async(e,t={})=>{const n=e.revision??"main";if(mg(n))return n;const a=e.hubUrl??hg,r=e.kind??"model",i=`${a}/api/${E_[r]}/${e.repo}/revision/${encodeURIComponent(n)}`,o=await(t.fetch??globalThis.fetch)(i,t.init);if(!o.ok)throw await o.body?.cancel().catch(()=>{}),new Error(`fetch-cache: HTTP ${o.status} ${o.statusText} (${i})`);const l=await o.json();if(typeof l.sha!="string"||l.sha==="")throw new Error(`fetch-cache: revision 解決応答に sha が無い (${i})`);return l.sha},A_=async e=>{if(typeof crypto>"u"||crypto.subtle===void 0)throw new Error("fetch-cache: crypto.subtle が利用できないため sha256 検証ができません");const t=await crypto.subtle.digest("SHA-256",new Uint8Array(e));return Array.from(new Uint8Array(t),n=>n.toString(16).padStart(2,"0")).join("")},z_=e=>{if(!(e.expectedBytes===void 0&&e.sha256===void 0&&e.validate===void 0))return async t=>{if(e.expectedBytes!==void 0&&t.length!==e.expectedBytes)throw new Error(`fetch-cache: ${e.path} のバイト数不一致: ${t.length} != ${e.expectedBytes}`);if(e.sha256!==void 0){const n=await A_(t);if(n!==e.sha256)throw new Error(`fetch-cache: ${e.path} の SHA-256 不一致: ${n} != ${e.sha256}`)}await e.validate?.(t)}},O_=(e,t,n,a)=>{const r=C_({...e,revision:t,path:n.path}),i=a.onProgress;return fg(r,{cache:!0,cacheName:a.cacheName??S_,validate:z_(n),decode:n.decode,onProgress:i===void 0?void 0:s=>i({...s,path:n.path}),onCacheError:a.onCacheError,init:a.init,fetch:a.fetch,caches:a.caches})},R_=e=>typeof e=="string"?{path:e}:e,N_=async(e,t,n={})=>{const a=await os(e,{fetch:n.fetch,init:n.init}),r=Object.keys(t),i=await Promise.all(r.map(async s=>[s,await O_(e,a,R_(t[s]),n)]));return Object.fromEntries(i)},B_=e=>{if(e.length!==4)throw new Error(`4cc は4文字: ${e}`);return(e.charCodeAt(0)|e.charCodeAt(1)<<8|e.charCodeAt(2)<<16|e.charCodeAt(3)<<24)>>>0},M_=B_("JTD1"),Uc=1,ai=16,Pc=16,Lc=8;class gg{buffer;sections;constructor(t){this.buffer=t;const n=new DataView(t);if(t.byteLength<ai)throw new Error("JTD1: ヘッダが短すぎる");if(n.getUint32(0,!0)!==M_)throw new Error("JTD1: magic 不一致");const a=n.getUint32(4,!0);if(a!==Uc)throw new Error(`JTD1: formatVersion ${a} は非対応（期待: ${Uc}）`);const r=n.getUint32(8,!0);if(ai+r*Pc>t.byteLength)throw new Error(`JTD1: sectionCount ${r} がファイルサイズに対して過大`);this.sections=new Map;for(let i=0;i<r;i++){const s=ai+i*Pc,o=String.fromCharCode(n.getUint8(s),n.getUint8(s+1),n.getUint8(s+2),n.getUint8(s+3)),l=n.getUint32(s+4,!0),d=n.getUint32(s+8,!0),p=n.getUint32(s+12,!0);if(d%Lc!==0)throw new Error(`JTD1: セクション ${o} が ${Lc}B 境界にない`);if(d+p>t.byteLength)throw new Error(`JTD1: セクション ${o} がファイル末尾を超える`);this.sections.set(o,{encoding:l,offset:d,length:p})}}section(t){const n=this.sections.get(t);if(!n)throw new Error(`JTD1: セクション ${t} が存在しない`);return n}has(t){return this.sections.has(t)}}const D_=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let a=0;a<8;a++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})(),U_=e=>{let t=4294967295;for(let n=0;n<e.length;n++)t=D_[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0},yg=e=>U_(e).toString(16).padStart(8,"0"),Tn=e=>(e=e-(e>>>1&1431655765),e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24),ut=8;class Vc{words;bitLength;blockRank1;totalOnes;constructor(t,n){if(n>t.length*32)throw new Error(`bitLength ${n} が words の容量を超えている`);const a=n&31;if(a!==0&&n>0&&t[n-1>>>5]>>>a)throw new Error("ビット長を超えた位置に 1 が立っている（書き手のバグ）");this.words=t,this.bitLength=n;const r=Math.ceil(t.length/ut)+1;this.blockRank1=new Uint32Array(r);let i=0;for(let s=0;s*ut<t.length;s++){this.blockRank1[s]=i;const o=Math.min((s+1)*ut,t.length);for(let l=s*ut;l<o;l++)i+=Tn(t[l])}this.blockRank1[this.blockRank1.length-1]=i,this.totalOnes=i}get(t){return(this.words[t>>>5]>>>(t&31)&1)===1}rank1(t){if(t<=0)return 0;if(t>=this.bitLength)return this.totalOnes;const n=t>>>5,a=n/ut|0;let r=this.blockRank1[a];for(let s=a*ut;s<n;s++)r+=Tn(this.words[s]);const i=t&31;return i!==0&&(r+=Tn(this.words[n]&(1<<i)-1)),r}rank0(t){const n=Math.min(Math.max(t,0),this.bitLength);return n-this.rank1(n)}get ones(){return this.totalOnes}select1(t){if(t<=0||t>this.totalOnes)return-1;let n=0,a=this.blockRank1.length-1;for(;n+1<a;){const i=n+a>>>1;this.blockRank1[i]<t?n=i:a=i}let r=t-this.blockRank1[n];for(let i=n*ut;i<this.words.length;i++){const s=Tn(this.words[i]);if(r>s){r-=s;continue}return i*32+qc(this.words[i],r)}return-1}select0(t){if(t<=0||t>this.bitLength-this.totalOnes)return-1;let n=0,a=this.blockRank1.length-1;for(;n+1<a;){const i=n+a>>>1;i*ut*32-this.blockRank1[i]<t?n=i:a=i}let r=t-(n*ut*32-this.blockRank1[n]);for(let i=n*ut;i<this.words.length;i++){const s=32-Tn(this.words[i]);if(r>s){r-=s;continue}return i*32+qc(~this.words[i]>>>0,r)}return-1}}const qc=(e,t)=>{let n=e;for(let a=1;a<t;a++)n&=n-1;return 31-Math.clz32(n&-n)};class P_{nodeCount;surfaceCount;lbs;labels;terminal;constructor(t,n,a,r,i){if(n.length!==r)throw new Error(`labels 長 ${n.length} != nodeCount ${r}`);if(a.ones!==i)throw new Error(`terminal の 1 の数 ${a.ones} != surfaceCount ${i}`);this.lbs=t,this.labels=n,this.terminal=a,this.nodeCount=r,this.surfaceCount=i}blockStart(t){return t===0?0:this.lbs.select0(t)+1}child(t,n){const a=this.blockStart(t),i=this.lbs.select0(t+1)-a;if(i<=0)return-1;const s=this.lbs.rank1(a)+1;let o=0,l=i-1;for(;o<=l;){const d=o+l>>>1,p=this.labels[s+d];if(p===n)return s+d;p<n?o=d+1:l=d-1}return-1}surfaceIdAt(t){return this.terminal.get(t)?this.terminal.rank1(t+1)-1:-1}commonPrefixSearch(t,n,a){let r=0;for(let i=n;i<t.length;i++){if(r=this.child(r,t.charCodeAt(i)),r<0)return;const s=this.surfaceIdAt(r);s>=0&&a(s,i+1)}}exactMatch(t){let n=0;for(let a=0;a<t.length;a++)if(n=this.child(n,t.charCodeAt(a)),n<0)return-1;return this.surfaceIdAt(n)}}const L_={u32:4,u16:2,i16:2,u8:1},V_=(e,t)=>{for(const r of e.header)if(!(r in t))throw new Error(`スカラ ${r} が未指定`);let n=e.header.length*4;const a=[];for(const r of e.arrays){const i=L_[r.type];n=Math.ceil(n/i)*i;const s=r.length(t);if(!Number.isInteger(s)||s<0)throw new Error(`配列 ${r.name} の要素数が不正: ${s}`);a.push({name:r.name,type:r.type,byteOffset:n,elemCount:s}),n+=s*i}return{fields:a,totalBytes:n}},q_={header:["nodeCount","surfaceCount","lbsBitLength","lbsWordCount","terminalBitLength","terminalWordCount"],arrays:[{name:"lbsWords",type:"u32",length:e=>e.lbsWordCount},{name:"terminalWords",type:"u32",length:e=>e.terminalWordCount},{name:"labels",type:"u16",length:e=>e.nodeCount}]},W_={header:["surfaceCount","entryCount","unitCount"],arrays:[{name:"entryIndex",type:"u32",length:e=>e.surfaceCount+1},{name:"unitIndex",type:"u32",length:e=>e.entryCount+1},{name:"unitPronOffset",type:"u32",length:e=>e.unitCount},{name:"leftId",type:"u16",length:e=>e.entryCount},{name:"rightId",type:"u16",length:e=>e.entryCount},{name:"cost",type:"i16",length:e=>e.entryCount},{name:"posId",type:"u16",length:e=>e.entryCount},{name:"chainRuleId",type:"u8",length:e=>e.entryCount},{name:"unitAccType",type:"u8",length:e=>e.unitCount},{name:"unitSurfLen",type:"u8",length:e=>e.unitCount},{name:"unitPronLen",type:"u8",length:e=>e.unitCount}]},F_={header:["poolLength"],arrays:[{name:"pool",type:"u16",length:e=>e.poolLength}]},G_={header:["rightSize","leftSize"],arrays:[{name:"data",type:"i16",length:e=>e.rightSize*e.leftSize}]},H_={header:["catCount"],arrays:[{name:"catTable",type:"u8",length:e=>e.catCount*4},{name:"catsPacked",type:"u16",length:()=>65536}]},j_={header:["catCount","recordCount"],arrays:[{name:"catIndex",type:"u32",length:e=>e.catCount+1},{name:"leftId",type:"u16",length:e=>e.recordCount},{name:"rightId",type:"u16",length:e=>e.recordCount},{name:"cost",type:"i16",length:e=>e.recordCount},{name:"posId",type:"u16",length:e=>e.recordCount}]},tn=(e,t,n,a)=>{if(n<a.header.length*4)throw new Error(`セクション実長 ${n} がヘッダ ${a.header.length*4}B より短い`);const r=new DataView(e,t,n),i={};a.header.forEach((l,d)=>{i[l]=r.getUint32(d*4,!0)});const s=V_(a,i);if(s.totalBytes!==n)throw new Error(`セクション実長 ${n} がレイアウト要求 ${s.totalBytes} と一致しない`);const o={};for(const l of s.fields){const d=t+l.byteOffset;switch(l.type){case"u32":o[l.name]=new Uint32Array(e,d,l.elemCount);break;case"u16":o[l.name]=new Uint16Array(e,d,l.elemCount);break;case"i16":o[l.name]=new Int16Array(e,d,l.elemCount);break;case"u8":o[l.name]=new Uint8Array(e,d,l.elemCount);break}}return{scalars:i,arrays:o}},Pn=(e,t,n,a)=>{const r=a===null?"null":Array.isArray(a)?"array":typeof a;throw new Error(`${e} 検証失敗: ${t} は ${n} であること（実際: ${r}）`)},K_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ii=(e,t,n)=>K_(t)?t:Pn(e,n,"オブジェクト",t),Tt=(e,t,n)=>typeof t=="string"?t:Pn(e,n,"string",t),X_=(e,t,n)=>typeof t=="number"&&Number.isInteger(t)?t:Pn(e,n,"整数",t),ri=(e,t,n)=>Array.isArray(t)?t.map((a,r)=>Tt(e,a,`${n}[${r}]`)):Pn(e,n,"配列",t),Wc=(e,t,n,a)=>{const r=Ii(e,t,n),i={};for(const[s,o]of Object.entries(r))i[s]=a(o,`${n}.${s}`);return i},Y_=["CHAR","CONN","LEXI","READ","TRIE","UNKD"],Fc=6,Z_=e=>{const t="META",n=Ii(t,e,"(root)"),a=Ii(t,n.source,"source"),r=Array.isArray(n.posTable)?n.posTable.map((s,o)=>{const l=ri(t,s,`posTable[${o}]`);if(l.length!==Fc)throw new Error(`${t} 検証失敗: posTable[${o}] は ${Fc} 列であること（実際: ${l.length} 列）`);return l}):Pn(t,"posTable","配列",n.posTable),i=Wc(t,n.checksums,"checksums",(s,o)=>Tt(t,s,o));for(const s of Y_)if(i[s]===void 0)throw new Error(`${t} 検証失敗: checksums に ${s} が無い（CRC 検証が黙って抜ける）`);return{dictName:Tt(t,n.dictName,"dictName"),source:{repo:Tt(t,a.repo,"source.repo"),tag:Tt(t,a.tag,"source.tag")},builderVersion:Tt(t,n.builderVersion,"builderVersion"),buildDate:Tt(t,n.buildDate,"buildDate"),counts:Wc(t,n.counts,"counts",(s,o)=>X_(t,s,o)),posTable:r,chainRuleTable:ri(t,n.chainRuleTable,"chainRuleTable"),charCategories:ri(t,n.charCategories,"charCategories"),checksums:i,license:Tt(t,n.license,"license")}};class us{trie;entryIndex;unitIndex;leftId;rightId;cost;posId;chainRuleId;unitAccType;unitSurfLen;unitPronLen;unitPronOffset;readPool;connData;connLeftSize;charCategories;charCatsPacked;defaultCategoryId;unkCatIndex;unkLeftId;unkRightId;unkCost;unkPosId;meta;constructor(t){this.trie=t.trie,this.entryIndex=t.lexi.entryIndex,this.unitIndex=t.lexi.unitIndex,this.leftId=t.lexi.leftId,this.rightId=t.lexi.rightId,this.cost=t.lexi.cost,this.posId=t.lexi.posId,this.chainRuleId=t.lexi.chainRuleId,this.unitAccType=t.lexi.unitAccType,this.unitSurfLen=t.lexi.unitSurfLen,this.unitPronLen=t.lexi.unitPronLen,this.unitPronOffset=t.lexi.unitPronOffset,this.readPool=t.readPool,this.connData=t.connData,this.connLeftSize=t.connLeftSize,this.charCategories=t.charCategories,this.charCatsPacked=t.charCatsPacked;const n=t.charCategories.findIndex(a=>a.name==="DEFAULT");if(n<0)throw new Error("DEFAULT カテゴリが辞書にない");this.defaultCategoryId=n,this.unkCatIndex=t.unk.catIndex,this.unkLeftId=t.unk.leftId,this.unkRightId=t.unk.rightId,this.unkCost=t.unk.cost,this.unkPosId=t.unk.posId,this.meta=t.meta}static load(t,n){const a=new gg(t),r=a.section("META"),i=Z_(JSON.parse(new TextDecoder().decode(new Uint8Array(t,r.offset,r.length))));if(n?.verifyChecksums!==!1)for(const[I,C]of Object.entries(i.checksums)){const z=a.section(I),x=yg(new Uint8Array(t,z.offset,z.length));if(x!==C)throw new Error(`セクション ${I} のCRC不一致: ${x} != ${C}`)}const s=a.section("TRIE"),o=tn(t,s.offset,s.length,q_),l=new P_(new Vc(o.arrays.lbsWords,o.scalars.lbsBitLength),o.arrays.labels,new Vc(o.arrays.terminalWords,o.scalars.terminalBitLength),o.scalars.nodeCount,o.scalars.surfaceCount),d=a.section("LEXI"),p=tn(t,d.offset,d.length,W_),f=a.section("READ"),m=tn(t,f.offset,f.length,F_),y=a.section("CONN"),w=tn(t,y.offset,y.length,G_),_=a.section("CHAR"),k=tn(t,_.offset,_.length,H_),$=k.arrays.catTable,b=i.charCategories.map((I,C)=>({name:I,invoke:$[C*4]===1,group:$[C*4+1]===1,length:$[C*4+2]})),T=a.section("UNKD"),S=tn(t,T.offset,T.length,j_);return new us({trie:l,lexi:p.arrays,readPool:m.arrays.pool,connData:w.arrays.data,connLeftSize:w.scalars.leftSize,charCategories:b,charCatsPacked:k.arrays.catsPacked,unk:S.arrays,meta:i})}connectionCost(t,n){return this.connData[t*this.connLeftSize+n]}unitPron(t){const n=this.unitPronOffset[t],a=this.unitPronLen[t];let r="";for(let i=0;i<a;i++){const s=this.readPool[n+i];s!==8217&&(r+=String.fromCharCode(s))}return r}unitPronRaw(t){const n=this.unitPronOffset[t],a=this.unitPronLen[t];let r="";for(let i=0;i<a;i++)r+=String.fromCharCode(this.readPool[n+i]);return r}charCategoriesOf(t,n){if(t>65535)return n[0]=this.defaultCategoryId,1;const a=this.charCatsPacked[t];let r=0;for(let i=0;i<16;i+=4){const s=a>>i&15;if(s===0)break;n[r++]=s-1}return r}}const J_="ab847217c833593c3aec9875b9bfa6ff9789dc29",Q_="https://huggingface.co/datasets/hdae/yomi-dict/resolve/{revision}/naist-jdic.jtd.gz",eb="hdae/yomi-dict",tb="yomi-dict",nb=e=>{const n=new Uint8Array(e).buffer,a=new gg(n),r=a.section("META"),i=JSON.parse(new TextDecoder().decode(new Uint8Array(n,r.offset,r.length)));if(i.checksums===void 0)throw new Error("JTD1: META に checksums が無い（破損の可能性）");for(const[s,o]of Object.entries(i.checksums)){const l=a.section(s),d=yg(new Uint8Array(n,l.offset,l.length));if(d!==o)throw new Error(`JTD1: セクション ${s} のCRC不一致: ${d} != ${o}（破損）`)}},ab=e=>e.length>=2&&e[0]===31&&e[1]===139,rb=async e=>{const t=new Response(new Uint8Array(e)).body;if(t===null)throw new Error("辞書解凍失敗: gzip ストリームが空");const n=t.pipeThrough(new DecompressionStream("gzip"));return new Uint8Array(await new Response(n).arrayBuffer())},ib=async e=>{const t=ab(e)?await rb(e):new Uint8Array(e);return nb(t),t},sb=async e=>{const t=e.revision??J_,n=e.url===void 0?await os({repo:eb,kind:"dataset",revision:t}):t,a=(e.url??Q_).replace(/\{revision\}/g,n),r=await fg(a,{cacheName:e.cacheName??tb,cache:mg(n),decode:ib,onProgress:e.onProgress});return r.buffer instanceof ArrayBuffer?r.buffer:new Uint8Array(r).buffer},ob=async(e={})=>{const t=await sb(e);return us.load(t,{verifyChecksums:!1})},Gc=(e,t)=>{let n=0,a=e.length-1;for(;n<=a;){const r=n+a>>1,[i,s]=e[r];if(t<i)a=r-1;else if(t>s)n=r+1;else return!0}return!1};class ls{#e;#t;#n;constructor(t,n,a){this.#e=t,this.#t=n,this.#n=a}static fromVocabText(t,n,a){const r=new Map,i=t.split(/\r?\n/);let s=0;for(const o of i){if(o===""&&s===i.length-1)break;r.set(o,s),s++}return new ls(r,n,a)}tokenize(t){let n="";for(const i of t){const s=i.codePointAt(0);Gc(this.#t.removed,s)||(n+=Gc(this.#t.spaced,s)?" ":i)}const a=n.normalize("NFKC"),r=[];for(const i of a)i!==" "&&r.push(i);return r}#a(t){return this.#e.get(t)??this.#n.unkId}encode(t){const n=this.tokenize(t),a=[this.#n.clsId];for(const r of n)a.push(this.#a(r));return a.push(this.#n.sepId),a}}const ub=(e,t)=>{if(t<=0)throw new Error(`distributePhone: n_word must be >= 1, got ${t}`);const n=new Array(t).fill(0);for(let a=0;a<e;a++){let r=0;for(let i=1;i<t;i++)n[i]<n[r]&&(r=i);n[r]++}return n},lb=(e,t,n)=>{const a=[1];let r=0;for(const o of e){const l=t.tokenize(o.surface).length;if(l<=0)throw new Error(`buildBaseWord2ph: 語 surface が 0 トークンに正規化された: ${JSON.stringify(o.surface)}`);r+=l;for(const d of ub(o.phones.length,l))a.push(d)}a.push(1);const i=r+2;if(a.length!==i)throw new Error(`buildBaseWord2ph invariant broken: word2ph.length(${a.length}) !== Σtokenize(surface)+2(${i})`);const s=a.reduce((o,l)=>o+l,0);if(s!==n)throw new Error(`buildBaseWord2ph invariant broken: sum(word2ph)(${s}) !== givenPhoneLen(${n})`);return a},db=["_","AA","E","EE","En","N","OO","V","a","a:","aa","ae","ah","ai","an","ang","ao","aw","ay","b","by","c","ch","d","dh","dy","e","e:","eh","ei","en","eng","er","ey","f","g","gy","h","hh","hy","i","i0","i:","ia","ian","iang","iao","ie","ih","in","ing","iong","ir","iu","iy","j","jh","k","ky","l","m","my","n","ng","ny","o","o:","ong","ou","ow","oy","p","py","q","r","ry","s","sh","t","th","ts","ty","u","u:","ua","uai","uan","uang","uh","ui","un","uo","uw","v","van","ve","vn","w","x","y","z","zh","zy","!","?","…",",",".","'","-","SP","UNK"],cb=6,pb=1,fb=new Map(db.map((e,t)=>[e,t])),hb=e=>e.map(t=>{const n=fb.get(t);if(n===void 0)throw new Error(`SYMBOLS に無い音素 ${JSON.stringify(t)} が phones に含まれる（ID 化不能）。 入力の音素記号と JP-Extra モデルの記号表の齟齬を疑う。`);return n}),wg=new Map([[32,12288],[165,65509],[92,65509],[45,8722],[126,12316],[96,8216],[34,8221],[39,8217],[65377,12290],[65378,12300],[65379,12301],[65380,12289],[65381,12539]]);{const e="ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン";for(let t=0;t<e.length;t++)wg.set(65382+t,e.charCodeAt(t))}const mb=new Set([12441,12443,65438]),gb=new Set([12442,12444,65439]),_g=e=>{const t=new Map;for(let n=0;n<e.length;n+=2)t.set(e.charCodeAt(n),e.charCodeAt(n+1));return t},yb=_g("カガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドハバヒビフブヘベホボウヴワヷヰヸヱヹヲヺヽヾかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどはばひびふぶへべほぼうゔ"),wb=_g("ハパヒピフプヘペホポはぱひぴふぷへぺほぽ"),bg=e=>{let t="",n=-1;for(let a=0;a<e.length;a++){let r=e.charCodeAt(a);const i=wg.get(r);i!==void 0?r=i:r>32&&r<127&&(r+=65248);const s=mb.has(r),o=gb.has(r);if(s||o){const l=n>=0?s?yb.get(n):wb.get(n):void 0;l!==void 0?t+=String.fromCharCode(l):n>=0&&(t+=String.fromCharCode(n)),n=-1}else n>=0&&(t+=String.fromCharCode(n)),n=r}return n>=0&&(t+=String.fromCharCode(n)),t},_b=e=>{const t=[];let n=0;for(let a=0;a<e.length;a++){const r=e.charCodeAt(a);(r===10||r===9||r===12290||r===12289)&&(t.push({start:n,end:a+1}),n=a+1)}return n<e.length&&t.push({start:n,end:e.length}),t},bb=[{key:"いぇ",expansion:[{kana:"イェ",consonant:"y",vowel:"e"}]},{key:"うぃ",expansion:[{kana:"ウィ",consonant:"w",vowel:"i"}]},{key:"うぇ",expansion:[{kana:"ウェ",consonant:"w",vowel:"e"}]},{key:"うぉ",expansion:[{kana:"ウォ",consonant:"w",vowel:"o"}]},{key:"きぇ",expansion:[{kana:"キェ",consonant:"ky",vowel:"e"}]},{key:"きゃ",expansion:[{kana:"キャ",consonant:"ky",vowel:"a"}]},{key:"きゅ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"}]},{key:"きょ",expansion:[{kana:"キョ",consonant:"ky",vowel:"o"}]},{key:"ぎぇ",expansion:[{kana:"ギェ",consonant:"gy",vowel:"e"}]},{key:"ぎゃ",expansion:[{kana:"ギャ",consonant:"gy",vowel:"a"}]},{key:"ぎゅ",expansion:[{kana:"ギュ",consonant:"gy",vowel:"u"}]},{key:"ぎょ",expansion:[{kana:"ギョ",consonant:"gy",vowel:"o"}]},{key:"しぇ",expansion:[{kana:"シェ",consonant:"sh",vowel:"e"}]},{key:"しゃ",expansion:[{kana:"シャ",consonant:"sh",vowel:"a"}]},{key:"しゅ",expansion:[{kana:"シュ",consonant:"sh",vowel:"u"}]},{key:"しょ",expansion:[{kana:"ショ",consonant:"sh",vowel:"o"}]},{key:"じぇ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"}]},{key:"じゃ",expansion:[{kana:"ジャ",consonant:"j",vowel:"a"}]},{key:"じゅ",expansion:[{kana:"ジュ",consonant:"j",vowel:"u"}]},{key:"じょ",expansion:[{kana:"ジョ",consonant:"j",vowel:"o"}]},{key:"すぃ",expansion:[{kana:"スィ",consonant:"s",vowel:"i"}]},{key:"ずぃ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"}]},{key:"ちぇ",expansion:[{kana:"チェ",consonant:"ch",vowel:"e"}]},{key:"ちゃ",expansion:[{kana:"チャ",consonant:"ch",vowel:"a"}]},{key:"ちゅ",expansion:[{kana:"チュ",consonant:"ch",vowel:"u"}]},{key:"ちょ",expansion:[{kana:"チョ",consonant:"ch",vowel:"o"}]},{key:"つぁ",expansion:[{kana:"ツァ",consonant:"ts",vowel:"a"}]},{key:"つぃ",expansion:[{kana:"ツィ",consonant:"ts",vowel:"i"}]},{key:"つぇ",expansion:[{kana:"ツェ",consonant:"ts",vowel:"e"}]},{key:"つぉ",expansion:[{kana:"ツォ",consonant:"ts",vowel:"o"}]},{key:"てぃ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"}]},{key:"てゃ",expansion:[{kana:"テャ",consonant:"ty",vowel:"a"}]},{key:"てゅ",expansion:[{kana:"テュ",consonant:"ty",vowel:"u"}]},{key:"てょ",expansion:[{kana:"テョ",consonant:"ty",vowel:"o"}]},{key:"でぃ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"}]},{key:"でゃ",expansion:[{kana:"デャ",consonant:"dy",vowel:"a"}]},{key:"でゅ",expansion:[{kana:"デュ",consonant:"dy",vowel:"u"}]},{key:"でょ",expansion:[{kana:"デョ",consonant:"dy",vowel:"o"}]},{key:"とぅ",expansion:[{kana:"トゥ",consonant:"t",vowel:"u"}]},{key:"どぅ",expansion:[{kana:"ドゥ",consonant:"d",vowel:"u"}]},{key:"にぇ",expansion:[{kana:"ニェ",consonant:"ny",vowel:"e"}]},{key:"にゃ",expansion:[{kana:"ニャ",consonant:"ny",vowel:"a"}]},{key:"にゅ",expansion:[{kana:"ニュ",consonant:"ny",vowel:"u"}]},{key:"にょ",expansion:[{kana:"ニョ",consonant:"ny",vowel:"o"}]},{key:"ひぇ",expansion:[{kana:"ヒェ",consonant:"hy",vowel:"e"}]},{key:"ひゃ",expansion:[{kana:"ヒャ",consonant:"hy",vowel:"a"}]},{key:"ひゅ",expansion:[{kana:"ヒュ",consonant:"hy",vowel:"u"}]},{key:"ひょ",expansion:[{kana:"ヒョ",consonant:"hy",vowel:"o"}]},{key:"びぇ",expansion:[{kana:"ビェ",consonant:"by",vowel:"e"}]},{key:"びゃ",expansion:[{kana:"ビャ",consonant:"by",vowel:"a"}]},{key:"びゅ",expansion:[{kana:"ビュ",consonant:"by",vowel:"u"}]},{key:"びょ",expansion:[{kana:"ビョ",consonant:"by",vowel:"o"}]},{key:"ぴぇ",expansion:[{kana:"ピェ",consonant:"py",vowel:"e"}]},{key:"ぴゃ",expansion:[{kana:"ピャ",consonant:"py",vowel:"a"}]},{key:"ぴゅ",expansion:[{kana:"ピュ",consonant:"py",vowel:"u"}]},{key:"ぴょ",expansion:[{kana:"ピョ",consonant:"py",vowel:"o"}]},{key:"ふぁ",expansion:[{kana:"ファ",consonant:"f",vowel:"a"}]},{key:"ふぃ",expansion:[{kana:"フィ",consonant:"f",vowel:"i"}]},{key:"ふぇ",expansion:[{kana:"フェ",consonant:"f",vowel:"e"}]},{key:"ふぉ",expansion:[{kana:"フォ",consonant:"f",vowel:"o"}]},{key:"みぇ",expansion:[{kana:"ミェ",consonant:"my",vowel:"e"}]},{key:"みゃ",expansion:[{kana:"ミャ",consonant:"my",vowel:"a"}]},{key:"みゅ",expansion:[{kana:"ミュ",consonant:"my",vowel:"u"}]},{key:"みょ",expansion:[{kana:"ミョ",consonant:"my",vowel:"o"}]},{key:"りぇ",expansion:[{kana:"リェ",consonant:"ry",vowel:"e"}]},{key:"りゃ",expansion:[{kana:"リャ",consonant:"ry",vowel:"a"}]},{key:"りゅ",expansion:[{kana:"リュ",consonant:"ry",vowel:"u"}]},{key:"りょ",expansion:[{kana:"リョ",consonant:"ry",vowel:"o"}]},{key:"ゔぁ",expansion:[{kana:"ヴァ",consonant:"v",vowel:"a"}]},{key:"ゔぃ",expansion:[{kana:"ヴィ",consonant:"v",vowel:"i"}]},{key:"ゔぇ",expansion:[{kana:"ヴェ",consonant:"v",vowel:"e"}]},{key:"ゔぉ",expansion:[{kana:"ヴォ",consonant:"v",vowel:"o"}]},{key:"ゔゃ",expansion:[{kana:"ヴャ",consonant:"by",vowel:"a"}]},{key:"ゔゅ",expansion:[{kana:"ヴュ",consonant:"by",vowel:"u"}]},{key:"ゔょ",expansion:[{kana:"ヴョ",consonant:"by",vowel:"o"}]},{key:"イェ",expansion:[{kana:"イェ",consonant:"y",vowel:"e"}]},{key:"ウィ",expansion:[{kana:"ウィ",consonant:"w",vowel:"i"}]},{key:"ウェ",expansion:[{kana:"ウェ",consonant:"w",vowel:"e"}]},{key:"ウォ",expansion:[{kana:"ウォ",consonant:"w",vowel:"o"}]},{key:"キェ",expansion:[{kana:"キェ",consonant:"ky",vowel:"e"}]},{key:"キャ",expansion:[{kana:"キャ",consonant:"ky",vowel:"a"}]},{key:"キュ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"}]},{key:"キョ",expansion:[{kana:"キョ",consonant:"ky",vowel:"o"}]},{key:"ギェ",expansion:[{kana:"ギェ",consonant:"gy",vowel:"e"}]},{key:"ギャ",expansion:[{kana:"ギャ",consonant:"gy",vowel:"a"}]},{key:"ギュ",expansion:[{kana:"ギュ",consonant:"gy",vowel:"u"}]},{key:"ギョ",expansion:[{kana:"ギョ",consonant:"gy",vowel:"o"}]},{key:"クヮ",expansion:[{kana:"クヮ",consonant:"kw",vowel:"a"}]},{key:"グヮ",expansion:[{kana:"グヮ",consonant:"gw",vowel:"a"}]},{key:"シェ",expansion:[{kana:"シェ",consonant:"sh",vowel:"e"}]},{key:"シャ",expansion:[{kana:"シャ",consonant:"sh",vowel:"a"}]},{key:"シュ",expansion:[{kana:"シュ",consonant:"sh",vowel:"u"}]},{key:"ショ",expansion:[{kana:"ショ",consonant:"sh",vowel:"o"}]},{key:"ジェ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"}]},{key:"ジャ",expansion:[{kana:"ジャ",consonant:"j",vowel:"a"}]},{key:"ジュ",expansion:[{kana:"ジュ",consonant:"j",vowel:"u"}]},{key:"ジョ",expansion:[{kana:"ジョ",consonant:"j",vowel:"o"}]},{key:"スィ",expansion:[{kana:"スィ",consonant:"s",vowel:"i"}]},{key:"ズィ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"}]},{key:"チェ",expansion:[{kana:"チェ",consonant:"ch",vowel:"e"}]},{key:"チャ",expansion:[{kana:"チャ",consonant:"ch",vowel:"a"}]},{key:"チュ",expansion:[{kana:"チュ",consonant:"ch",vowel:"u"}]},{key:"チョ",expansion:[{kana:"チョ",consonant:"ch",vowel:"o"}]},{key:"ツァ",expansion:[{kana:"ツァ",consonant:"ts",vowel:"a"}]},{key:"ツィ",expansion:[{kana:"ツィ",consonant:"ts",vowel:"i"}]},{key:"ツェ",expansion:[{kana:"ツェ",consonant:"ts",vowel:"e"}]},{key:"ツォ",expansion:[{kana:"ツォ",consonant:"ts",vowel:"o"}]},{key:"ティ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"}]},{key:"テャ",expansion:[{kana:"テャ",consonant:"ty",vowel:"a"}]},{key:"テュ",expansion:[{kana:"テュ",consonant:"ty",vowel:"u"}]},{key:"テョ",expansion:[{kana:"テョ",consonant:"ty",vowel:"o"}]},{key:"ディ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"}]},{key:"デャ",expansion:[{kana:"デャ",consonant:"dy",vowel:"a"}]},{key:"デュ",expansion:[{kana:"デュ",consonant:"dy",vowel:"u"}]},{key:"デョ",expansion:[{kana:"デョ",consonant:"dy",vowel:"o"}]},{key:"トゥ",expansion:[{kana:"トゥ",consonant:"t",vowel:"u"}]},{key:"ドゥ",expansion:[{kana:"ドゥ",consonant:"d",vowel:"u"}]},{key:"ニェ",expansion:[{kana:"ニェ",consonant:"ny",vowel:"e"}]},{key:"ニャ",expansion:[{kana:"ニャ",consonant:"ny",vowel:"a"}]},{key:"ニュ",expansion:[{kana:"ニュ",consonant:"ny",vowel:"u"}]},{key:"ニョ",expansion:[{kana:"ニョ",consonant:"ny",vowel:"o"}]},{key:"ヒェ",expansion:[{kana:"ヒェ",consonant:"hy",vowel:"e"}]},{key:"ヒャ",expansion:[{kana:"ヒャ",consonant:"hy",vowel:"a"}]},{key:"ヒュ",expansion:[{kana:"ヒュ",consonant:"hy",vowel:"u"}]},{key:"ヒョ",expansion:[{kana:"ヒョ",consonant:"hy",vowel:"o"}]},{key:"ビェ",expansion:[{kana:"ビェ",consonant:"by",vowel:"e"}]},{key:"ビャ",expansion:[{kana:"ビャ",consonant:"by",vowel:"a"}]},{key:"ビュ",expansion:[{kana:"ビュ",consonant:"by",vowel:"u"}]},{key:"ビョ",expansion:[{kana:"ビョ",consonant:"by",vowel:"o"}]},{key:"ピェ",expansion:[{kana:"ピェ",consonant:"py",vowel:"e"}]},{key:"ピャ",expansion:[{kana:"ピャ",consonant:"py",vowel:"a"}]},{key:"ピュ",expansion:[{kana:"ピュ",consonant:"py",vowel:"u"}]},{key:"ピョ",expansion:[{kana:"ピョ",consonant:"py",vowel:"o"}]},{key:"ファ",expansion:[{kana:"ファ",consonant:"f",vowel:"a"}]},{key:"フィ",expansion:[{kana:"フィ",consonant:"f",vowel:"i"}]},{key:"フェ",expansion:[{kana:"フェ",consonant:"f",vowel:"e"}]},{key:"フォ",expansion:[{kana:"フォ",consonant:"f",vowel:"o"}]},{key:"ミェ",expansion:[{kana:"ミェ",consonant:"my",vowel:"e"}]},{key:"ミャ",expansion:[{kana:"ミャ",consonant:"my",vowel:"a"}]},{key:"ミュ",expansion:[{kana:"ミュ",consonant:"my",vowel:"u"}]},{key:"ミョ",expansion:[{kana:"ミョ",consonant:"my",vowel:"o"}]},{key:"リェ",expansion:[{kana:"リェ",consonant:"ry",vowel:"e"}]},{key:"リャ",expansion:[{kana:"リャ",consonant:"ry",vowel:"a"}]},{key:"リュ",expansion:[{kana:"リュ",consonant:"ry",vowel:"u"}]},{key:"リョ",expansion:[{kana:"リョ",consonant:"ry",vowel:"o"}]},{key:"ヴァ",expansion:[{kana:"ヴァ",consonant:"v",vowel:"a"}]},{key:"ヴィ",expansion:[{kana:"ヴィ",consonant:"v",vowel:"i"}]},{key:"ヴェ",expansion:[{kana:"ヴェ",consonant:"v",vowel:"e"}]},{key:"ヴォ",expansion:[{kana:"ヴォ",consonant:"v",vowel:"o"}]},{key:"ヴャ",expansion:[{kana:"ヴャ",consonant:"by",vowel:"a"}]},{key:"ヴュ",expansion:[{kana:"ヴュ",consonant:"by",vowel:"u"}]},{key:"ヴョ",expansion:[{kana:"ヴョ",consonant:"by",vowel:"o"}]}],vb=[{key:"ぁ",expansion:[{kana:"ァ",consonant:null,vowel:"a"}]},{key:"あ",expansion:[{kana:"ア",consonant:null,vowel:"a"}]},{key:"ぃ",expansion:[{kana:"ィ",consonant:null,vowel:"i"}]},{key:"い",expansion:[{kana:"イ",consonant:null,vowel:"i"}]},{key:"ぅ",expansion:[{kana:"ゥ",consonant:null,vowel:"u"}]},{key:"う",expansion:[{kana:"ウ",consonant:null,vowel:"u"}]},{key:"ぇ",expansion:[{kana:"ェ",consonant:null,vowel:"e"}]},{key:"え",expansion:[{kana:"エ",consonant:null,vowel:"e"}]},{key:"ぉ",expansion:[{kana:"ォ",consonant:null,vowel:"o"}]},{key:"お",expansion:[{kana:"オ",consonant:null,vowel:"o"}]},{key:"か",expansion:[{kana:"カ",consonant:"k",vowel:"a"}]},{key:"が",expansion:[{kana:"ガ",consonant:"g",vowel:"a"}]},{key:"き",expansion:[{kana:"キ",consonant:"k",vowel:"i"}]},{key:"ぎ",expansion:[{kana:"ギ",consonant:"g",vowel:"i"}]},{key:"く",expansion:[{kana:"ク",consonant:"k",vowel:"u"}]},{key:"ぐ",expansion:[{kana:"グ",consonant:"g",vowel:"u"}]},{key:"け",expansion:[{kana:"ケ",consonant:"k",vowel:"e"}]},{key:"げ",expansion:[{kana:"ゲ",consonant:"g",vowel:"e"}]},{key:"こ",expansion:[{kana:"コ",consonant:"k",vowel:"o"}]},{key:"ご",expansion:[{kana:"ゴ",consonant:"g",vowel:"o"}]},{key:"さ",expansion:[{kana:"サ",consonant:"s",vowel:"a"}]},{key:"ざ",expansion:[{kana:"ザ",consonant:"z",vowel:"a"}]},{key:"し",expansion:[{kana:"シ",consonant:"sh",vowel:"i"}]},{key:"じ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"}]},{key:"す",expansion:[{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ず",expansion:[{kana:"ズ",consonant:"z",vowel:"u"}]},{key:"せ",expansion:[{kana:"セ",consonant:"s",vowel:"e"}]},{key:"ぜ",expansion:[{kana:"ゼ",consonant:"z",vowel:"e"}]},{key:"そ",expansion:[{kana:"ソ",consonant:"s",vowel:"o"}]},{key:"ぞ",expansion:[{kana:"ゾ",consonant:"z",vowel:"o"}]},{key:"た",expansion:[{kana:"タ",consonant:"t",vowel:"a"}]},{key:"だ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"}]},{key:"ち",expansion:[{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ぢ",expansion:[{kana:"ヂ",consonant:"j",vowel:"i"}]},{key:"っ",expansion:[{kana:"ッ",consonant:"cl",vowel:"cl"}]},{key:"つ",expansion:[{kana:"ツ",consonant:"ts",vowel:"u"}]},{key:"づ",expansion:[{kana:"ヅ",consonant:"z",vowel:"u"}]},{key:"て",expansion:[{kana:"テ",consonant:"t",vowel:"e"}]},{key:"で",expansion:[{kana:"デ",consonant:"d",vowel:"e"}]},{key:"と",expansion:[{kana:"ト",consonant:"t",vowel:"o"}]},{key:"ど",expansion:[{kana:"ド",consonant:"d",vowel:"o"}]},{key:"な",expansion:[{kana:"ナ",consonant:"n",vowel:"a"}]},{key:"に",expansion:[{kana:"ニ",consonant:"n",vowel:"i"}]},{key:"ぬ",expansion:[{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ね",expansion:[{kana:"ネ",consonant:"n",vowel:"e"}]},{key:"の",expansion:[{kana:"ノ",consonant:"n",vowel:"o"}]},{key:"は",expansion:[{kana:"ハ",consonant:"h",vowel:"a"}]},{key:"ば",expansion:[{kana:"バ",consonant:"b",vowel:"a"}]},{key:"ぱ",expansion:[{kana:"パ",consonant:"p",vowel:"a"}]},{key:"ひ",expansion:[{kana:"ヒ",consonant:"h",vowel:"i"}]},{key:"び",expansion:[{kana:"ビ",consonant:"b",vowel:"i"}]},{key:"ぴ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"}]},{key:"ふ",expansion:[{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ぶ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"}]},{key:"ぷ",expansion:[{kana:"プ",consonant:"p",vowel:"u"}]},{key:"へ",expansion:[{kana:"ヘ",consonant:"h",vowel:"e"}]},{key:"べ",expansion:[{kana:"ベ",consonant:"b",vowel:"e"}]},{key:"ぺ",expansion:[{kana:"ペ",consonant:"p",vowel:"e"}]},{key:"ほ",expansion:[{kana:"ホ",consonant:"h",vowel:"o"}]},{key:"ぼ",expansion:[{kana:"ボ",consonant:"b",vowel:"o"}]},{key:"ぽ",expansion:[{kana:"ポ",consonant:"p",vowel:"o"}]},{key:"ま",expansion:[{kana:"マ",consonant:"m",vowel:"a"}]},{key:"み",expansion:[{kana:"ミ",consonant:"m",vowel:"i"}]},{key:"む",expansion:[{kana:"ム",consonant:"m",vowel:"u"}]},{key:"め",expansion:[{kana:"メ",consonant:"m",vowel:"e"}]},{key:"も",expansion:[{kana:"モ",consonant:"m",vowel:"o"}]},{key:"ゃ",expansion:[{kana:"ャ",consonant:"y",vowel:"a"}]},{key:"や",expansion:[{kana:"ヤ",consonant:"y",vowel:"a"}]},{key:"ゅ",expansion:[{kana:"ュ",consonant:"y",vowel:"u"}]},{key:"ゆ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"}]},{key:"ょ",expansion:[{kana:"ョ",consonant:"y",vowel:"o"}]},{key:"よ",expansion:[{kana:"ヨ",consonant:"y",vowel:"o"}]},{key:"ら",expansion:[{kana:"ラ",consonant:"r",vowel:"a"}]},{key:"り",expansion:[{kana:"リ",consonant:"r",vowel:"i"}]},{key:"る",expansion:[{kana:"ル",consonant:"r",vowel:"u"}]},{key:"れ",expansion:[{kana:"レ",consonant:"r",vowel:"e"}]},{key:"ろ",expansion:[{kana:"ロ",consonant:"r",vowel:"o"}]},{key:"わ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"}]},{key:"ゐ",expansion:[{kana:"ヰ",consonant:null,vowel:"i"}]},{key:"ゑ",expansion:[{kana:"ヱ",consonant:null,vowel:"e"}]},{key:"を",expansion:[{kana:"ヲ",consonant:null,vowel:"o"}]},{key:"ん",expansion:[{kana:"ン",consonant:"N",vowel:"N"}]},{key:"ゔ",expansion:[{kana:"ヴ",consonant:"v",vowel:"u"}]},{key:"ァ",expansion:[{kana:"ァ",consonant:null,vowel:"a"}]},{key:"ア",expansion:[{kana:"ア",consonant:null,vowel:"a"}]},{key:"ィ",expansion:[{kana:"ィ",consonant:null,vowel:"i"}]},{key:"イ",expansion:[{kana:"イ",consonant:null,vowel:"i"}]},{key:"ゥ",expansion:[{kana:"ゥ",consonant:null,vowel:"u"}]},{key:"ウ",expansion:[{kana:"ウ",consonant:null,vowel:"u"}]},{key:"ェ",expansion:[{kana:"ェ",consonant:null,vowel:"e"}]},{key:"エ",expansion:[{kana:"エ",consonant:null,vowel:"e"}]},{key:"ォ",expansion:[{kana:"ォ",consonant:null,vowel:"o"}]},{key:"オ",expansion:[{kana:"オ",consonant:null,vowel:"o"}]},{key:"カ",expansion:[{kana:"カ",consonant:"k",vowel:"a"}]},{key:"ガ",expansion:[{kana:"ガ",consonant:"g",vowel:"a"}]},{key:"キ",expansion:[{kana:"キ",consonant:"k",vowel:"i"}]},{key:"ギ",expansion:[{kana:"ギ",consonant:"g",vowel:"i"}]},{key:"ク",expansion:[{kana:"ク",consonant:"k",vowel:"u"}]},{key:"グ",expansion:[{kana:"グ",consonant:"g",vowel:"u"}]},{key:"ケ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"}]},{key:"ゲ",expansion:[{kana:"ゲ",consonant:"g",vowel:"e"}]},{key:"コ",expansion:[{kana:"コ",consonant:"k",vowel:"o"}]},{key:"ゴ",expansion:[{kana:"ゴ",consonant:"g",vowel:"o"}]},{key:"サ",expansion:[{kana:"サ",consonant:"s",vowel:"a"}]},{key:"ザ",expansion:[{kana:"ザ",consonant:"z",vowel:"a"}]},{key:"シ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"}]},{key:"ジ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"}]},{key:"ス",expansion:[{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ズ",expansion:[{kana:"ズ",consonant:"z",vowel:"u"}]},{key:"セ",expansion:[{kana:"セ",consonant:"s",vowel:"e"}]},{key:"ゼ",expansion:[{kana:"ゼ",consonant:"z",vowel:"e"}]},{key:"ソ",expansion:[{kana:"ソ",consonant:"s",vowel:"o"}]},{key:"ゾ",expansion:[{kana:"ゾ",consonant:"z",vowel:"o"}]},{key:"タ",expansion:[{kana:"タ",consonant:"t",vowel:"a"}]},{key:"ダ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"}]},{key:"チ",expansion:[{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ヂ",expansion:[{kana:"ヂ",consonant:"j",vowel:"i"}]},{key:"ッ",expansion:[{kana:"ッ",consonant:"cl",vowel:"cl"}]},{key:"ツ",expansion:[{kana:"ツ",consonant:"ts",vowel:"u"}]},{key:"ヅ",expansion:[{kana:"ヅ",consonant:"z",vowel:"u"}]},{key:"テ",expansion:[{kana:"テ",consonant:"t",vowel:"e"}]},{key:"デ",expansion:[{kana:"デ",consonant:"d",vowel:"e"}]},{key:"ト",expansion:[{kana:"ト",consonant:"t",vowel:"o"}]},{key:"ド",expansion:[{kana:"ド",consonant:"d",vowel:"o"}]},{key:"ナ",expansion:[{kana:"ナ",consonant:"n",vowel:"a"}]},{key:"ニ",expansion:[{kana:"ニ",consonant:"n",vowel:"i"}]},{key:"ヌ",expansion:[{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ネ",expansion:[{kana:"ネ",consonant:"n",vowel:"e"}]},{key:"ノ",expansion:[{kana:"ノ",consonant:"n",vowel:"o"}]},{key:"ハ",expansion:[{kana:"ハ",consonant:"h",vowel:"a"}]},{key:"バ",expansion:[{kana:"バ",consonant:"b",vowel:"a"}]},{key:"パ",expansion:[{kana:"パ",consonant:"p",vowel:"a"}]},{key:"ヒ",expansion:[{kana:"ヒ",consonant:"h",vowel:"i"}]},{key:"ビ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"}]},{key:"ピ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"}]},{key:"フ",expansion:[{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ブ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"}]},{key:"プ",expansion:[{kana:"プ",consonant:"p",vowel:"u"}]},{key:"ヘ",expansion:[{kana:"ヘ",consonant:"h",vowel:"e"}]},{key:"ベ",expansion:[{kana:"ベ",consonant:"b",vowel:"e"}]},{key:"ペ",expansion:[{kana:"ペ",consonant:"p",vowel:"e"}]},{key:"ホ",expansion:[{kana:"ホ",consonant:"h",vowel:"o"}]},{key:"ボ",expansion:[{kana:"ボ",consonant:"b",vowel:"o"}]},{key:"ポ",expansion:[{kana:"ポ",consonant:"p",vowel:"o"}]},{key:"マ",expansion:[{kana:"マ",consonant:"m",vowel:"a"}]},{key:"ミ",expansion:[{kana:"ミ",consonant:"m",vowel:"i"}]},{key:"ム",expansion:[{kana:"ム",consonant:"m",vowel:"u"}]},{key:"メ",expansion:[{kana:"メ",consonant:"m",vowel:"e"}]},{key:"モ",expansion:[{kana:"モ",consonant:"m",vowel:"o"}]},{key:"ャ",expansion:[{kana:"ャ",consonant:"y",vowel:"a"}]},{key:"ヤ",expansion:[{kana:"ヤ",consonant:"y",vowel:"a"}]},{key:"ュ",expansion:[{kana:"ュ",consonant:"y",vowel:"u"}]},{key:"ユ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"}]},{key:"ョ",expansion:[{kana:"ョ",consonant:"y",vowel:"o"}]},{key:"ヨ",expansion:[{kana:"ヨ",consonant:"y",vowel:"o"}]},{key:"ラ",expansion:[{kana:"ラ",consonant:"r",vowel:"a"}]},{key:"リ",expansion:[{kana:"リ",consonant:"r",vowel:"i"}]},{key:"ル",expansion:[{kana:"ル",consonant:"r",vowel:"u"}]},{key:"レ",expansion:[{kana:"レ",consonant:"r",vowel:"e"}]},{key:"ロ",expansion:[{kana:"ロ",consonant:"r",vowel:"o"}]},{key:"ヮ",expansion:[{kana:"ヮ",consonant:"w",vowel:"a"}]},{key:"ワ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"}]},{key:"ヰ",expansion:[{kana:"ヰ",consonant:null,vowel:"i"}]},{key:"ヱ",expansion:[{kana:"ヱ",consonant:null,vowel:"e"}]},{key:"ヲ",expansion:[{kana:"ヲ",consonant:null,vowel:"o"}]},{key:"ン",expansion:[{kana:"ン",consonant:"N",vowel:"N"}]},{key:"ヴ",expansion:[{kana:"ヴ",consonant:"v",vowel:"u"}]},{key:"ヵ",expansion:[{kana:"ヵ",consonant:"k",vowel:"a"}]},{key:"ヶ",expansion:[{kana:"ヶ",consonant:"k",vowel:"e"}]},{key:"ー",expansion:[{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ａ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｂ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｃ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｄ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｅ",expansion:[{kana:"イ",consonant:null,vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｆ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"フ",consonant:"f",vowel:"u"}]},{key:"Ｇ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｈ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"イ",consonant:null,vowel:"i"},{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"Ｉ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｊ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｋ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｌ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"Ｍ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ム",consonant:"m",vowel:"u"}]},{key:"Ｎ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"Ｏ",expansion:[{kana:"オ",consonant:null,vowel:"o"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｐ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｑ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｒ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"ー",consonant:"-",vowel:"long"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"Ｓ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"Ｔ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｕ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｖ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｗ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"},{kana:"ブ",consonant:"b",vowel:"u"},{kana:"リュ",consonant:"ry",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"Ｘ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ッ",consonant:"cl",vowel:"cl"},{kana:"ク",consonant:"k",vowel:"u"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"Ｙ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"Ｚ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ａ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｂ",expansion:[{kana:"ビ",consonant:"b",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｃ",expansion:[{kana:"シ",consonant:"sh",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｄ",expansion:[{kana:"ディ",consonant:"d",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｅ",expansion:[{kana:"イ",consonant:null,vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｆ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"フ",consonant:"f",vowel:"u"}]},{key:"ｇ",expansion:[{kana:"ジ",consonant:"j",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｈ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"イ",consonant:null,vowel:"i"},{kana:"チ",consonant:"ch",vowel:"i"}]},{key:"ｉ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｊ",expansion:[{kana:"ジェ",consonant:"j",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｋ",expansion:[{kana:"ケ",consonant:"k",vowel:"e"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｌ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"ｍ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ム",consonant:"m",vowel:"u"}]},{key:"ｎ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ヌ",consonant:"n",vowel:"u"}]},{key:"ｏ",expansion:[{kana:"オ",consonant:null,vowel:"o"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｐ",expansion:[{kana:"ピ",consonant:"p",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｑ",expansion:[{kana:"キュ",consonant:"ky",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｒ",expansion:[{kana:"ア",consonant:null,vowel:"a"},{kana:"ー",consonant:"-",vowel:"long"},{kana:"ル",consonant:"r",vowel:"u"}]},{key:"ｓ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ｔ",expansion:[{kana:"ティ",consonant:"t",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｕ",expansion:[{kana:"ユ",consonant:"y",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｖ",expansion:[{kana:"ブ",consonant:"b",vowel:"u"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｗ",expansion:[{kana:"ダ",consonant:"d",vowel:"a"},{kana:"ブ",consonant:"b",vowel:"u"},{kana:"リュ",consonant:"ry",vowel:"u"},{kana:"ー",consonant:"-",vowel:"long"}]},{key:"ｘ",expansion:[{kana:"エ",consonant:null,vowel:"e"},{kana:"ッ",consonant:"cl",vowel:"cl"},{kana:"ク",consonant:"k",vowel:"u"},{kana:"ス",consonant:"s",vowel:"u"}]},{key:"ｙ",expansion:[{kana:"ワ",consonant:"w",vowel:"a"},{kana:"イ",consonant:null,vowel:"i"}]},{key:"ｚ",expansion:[{kana:"ズィ",consonant:"z",vowel:"i"},{kana:"ー",consonant:"-",vowel:"long"}]}],Ci=new Map(bb.map(e=>[e.key,e.expansion])),vg=new Map(vb.map(e=>[e.key,e.expansion])),$b=e=>Ci.has(e)||vg.has(e),Hc="？",xb="、",jc="’",kb=e=>{if(e===Hc)return[{start:0,end:e.length,moras:[{kana:Hc,consonant:null,vowel:"",pseudo:"question"}],devoiced:[]}];const t=[];let n=0,a=[],r=[],i=0;const s=d=>{a.length!==0&&(t.push({start:n,end:d,moras:a,devoiced:r}),a=[],r=[],n=d)},o=(d,p)=>{t.push({start:d,end:p,moras:[{kana:xb,consonant:null,vowel:"",pseudo:"touten"}],devoiced:[]})};let l=0;for(;l<e.length;){const d=e.length-l>=2?e.slice(l,l+2):void 0,p=(d!==void 0?Ci.get(d):void 0)??vg.get(e[l]);if(p===void 0){l+=1;continue}const f=d!==void 0&&Ci.has(d)?2:1;i!==l&&(s(i),o(n,l),n=l);const m=e[l+f]===jc;if(m)for(let y=0;y<p.length;y++)r.push(a.length+y);a.push(...p),i=l+f+(m?jc.length:0),l=i}return s(i),i!==e.length&&o(i,e.length),t},cn=e=>kb(e),Kc=(e,t)=>{const n=e.charCodeAt(t);if(n>=55296&&n<=56319&&t+1<e.length){const a=e.charCodeAt(t+1);if(a>=56320&&a<=57343)return 2}return 1},Sb=(e,t,n)=>{const a=t.length;if(a===0)return[];const r=[],i=Array.from({length:a+1},()=>[]),s=[],o=[],l=_=>{let k=1/0,$=-2;if(_.start===0)k=e.connectionCost(0,_.leftId),$=-1;else for(const T of i[_.start]){const S=s[T]+e.connectionCost(r[T].rightId,_.leftId);S<k&&(k=S,$=T)}if($===-2)throw new Error("到達不能位置へのノード追加（内部不変条件違反）");const b=r.length;r.push(_),s.push(k+_.wordCost),o.push($),i[_.end].push(b)},d=[0,0,0,0];let p=-1,f=0;for(;f<a;){const _=Kc(t,f);if(f>0&&i[f].length===0){f+=_;continue}let k=!1;if(e.trie.commonPrefixSearch(t,f,($,b)=>{const T=e.entryIndex[$],S=e.entryIndex[$+1];for(let I=T;I<S;I++)l({start:f,end:b,entryIdx:I,unkIdx:-1,overlayIdx:-1,leftId:e.leftId[I],rightId:e.rightId[I],wordCost:e.cost[I]}),k=!0}),n!==void 0&&n.lookup(t,f,($,b)=>{const T=n.entries[$];l({start:f,end:b,entryIdx:-1,unkIdx:-1,overlayIdx:$,leftId:T.leftId,rightId:T.rightId,wordCost:T.cost}),k=!0}),p<=f){const $=_===2?t.codePointAt(f):t.charCodeAt(f),b=e.charCategoriesOf($,d);for(let T=0;T<b;T++){const S=d[T],I=e.charCategories[S];if(!I.invoke&&k)continue;let C=f+_;if(I.group){const M=[0,0,0,0];let P=C;for(;P<a;){const Y=Kc(t,P),G=Y===2?t.codePointAt(P):t.charCodeAt(P),j=e.charCategoriesOf(G,M);if(T<j&&M[T]===S)P+=Y;else break}C=P}const z=e.unkCatIndex[S],x=e.unkCatIndex[S+1];for(let M=z;M<x;M++)l({start:f,end:C,entryIdx:-1,unkIdx:M,overlayIdx:-1,leftId:e.unkLeftId[M],rightId:e.unkRightId[M],wordCost:e.unkCost[M]});x>z&&(p=C)}}f+=_}let m=-1,y=1/0;for(const _ of i[a]){const k=s[_]+e.connectionCost(r[_].rightId,0);k<y&&(y=k,m=_)}if(m<0)throw new Error(`経路が存在しない（内部不変条件違反）: ${t.slice(0,30)}`);const w=[];for(let _=m;_>=0;_=o[_])w.push(r[_]);return w.reverse()},Tb=255,Eb=(e,t,n)=>{const a=bg(t),r=e.charCategories.findIndex(d=>d.name==="SPACE"),i=[0,0,0,0],s=d=>{if(r<0)return!1;for(const p of d){const f=e.charCategoriesOf(p.codePointAt(0),i);let m=!1;for(let y=0;y<f;y++)i[y]===r&&(m=!0);if(!m)return!1}return d.length>0},o=[];for(const d of _b(a))for(const p of Sb(e,a.slice(d.start,d.end),n))s(a.slice(p.start+d.start,p.end+d.start))||o.push({...p,start:p.start+d.start,end:p.end+d.start});const l=[];for(const d of o){if(d.overlayIdx>=0&&n!==void 0){const k=n.entries[d.overlayIdx];l.push({surface:a.slice(d.start,d.end),start:d.start,end:d.end,pos:k.pos,pron:k.reading.replaceAll("’",""),pronRaw:k.reading,accType:k.accentType,chainRule:k.chainRule==="*"?void 0:k.chainRule,isUnknown:!1});continue}if(d.entryIdx<0){l.push({surface:a.slice(d.start,d.end),start:d.start,end:d.end,pos:e.meta.posTable[e.unkPosId[d.unkIdx]],isUnknown:!0});continue}const p=d.entryIdx,f=e.unitIndex[p],m=e.unitIndex[p+1],y=e.meta.posTable[e.posId[p]],w=e.meta.chainRuleTable[e.chainRuleId[p]];let _=d.start;for(let k=f;k<m;k++){const $=e.unitSurfLen[k];if($===0&&k!==m-1)throw new Error(`辞書破損: 非最終ユニットの surfLen=0（表層 ${a.slice(d.start,d.end)}）`);const b=$===0?d.end:_+$,T=e.unitAccType[k];l.push({surface:a.slice(_,b),start:_,end:b,pos:y,pron:e.unitPron(k),pronRaw:e.unitPronRaw(k),accType:T===Tb?void 0:T,chainRule:w==="*"?void 0:w,chainFlag:k===f?void 0:!1,isUnknown:!1}),_=b}if(_!==d.end)throw new Error(`辞書破損: ユニット分割がノード表層を被覆しない（表層 ${a.slice(d.start,d.end)}, 到達 ${_-d.start}/${d.end-d.start}）`)}return l},Ib=/^(?:(?<pos>名詞|形容詞|助詞|特殊助動詞|動詞)%)?(?<accent>[FC][1-5]|P1|P2|P6|P14)?(?:@(?<add>[-0-9]+))?$/,Xc=new Map,$g=e=>{const t=Xc.get(e);if(t!==void 0)return t;const n=Cb(e);return Xc.set(e,n),n},Cb=e=>{if(e===""||e==="*")return null;const t={};for(const n of e.split("/")){const a=Ib.exec(n);if(!a||!a.groups)continue;const r={accentType:a.groups.accent??"none",addType:a.groups.add!==void 0?Number(a.groups.add):0};switch(a.groups.pos){case"動詞":t.doushi=r;break;case"助詞":t.joshi=r;break;case"形容詞":t.keiyoushi=r;break;case"名詞":t.meishi=r;break;case"特殊助動詞":break;default:t.default=r;break}}return t},Ab=(e,t)=>{const n=t[0];return(n==="動詞"||n==="助動詞"?e.doushi:n==="助詞"?e.joshi:n==="形容詞"?e.keiyoushi:n==="名詞"?e.meishi:void 0)??e.default},lt=e=>{let t=0;for(const n of e.moras)n.spec.pseudo||t++;return t},zb=e=>e.moras.length===1&&e.moras[0].spec.pseudo==="touten",Et=(e,t)=>{const n=new Set(t);return e.map((a,r)=>({spec:a,voiced:!n.has(r)}))},Ob=e=>{const t=[];for(const n of e){if(n.isUnknown||n.pronRaw===void 0){t.push({surface:n.surface,pos:[...n.pos],moras:[],pronOrig:"",accent:0,chainRule:null,chainFlag:void 0,isUnknown:!0});continue}const a=n.pronRaw==="*"?[]:cn(n.pronRaw);if(a.length>1)throw new Error(`辞書発音列が単一rangeでない: ${n.surface} / ${n.pronRaw}`);const r=a[0];t.push({surface:n.surface,pos:[...n.pos],moras:r===void 0?[]:Et(r.moras,r.devoiced),pronOrig:r===void 0?"":r.moras.map(i=>i.kana).join(""),accent:n.accType??0,chainRule:n.chainRule!==void 0?$g(n.chainRule):null,chainFlag:n.chainFlag,isUnknown:!1})}return t},Qe=e=>e[0]==="名詞",Ft=e=>e[0]==="動詞",fa=e=>e[0]==="形容詞",On=e=>e[0]==="助詞",mt=e=>e[0]==="助動詞",Ai=e=>e[0]==="記号",xg=e=>e[0]==="フィラー",Rb=e=>e[0]==="接頭詞",Yc=e=>e[0]==="副詞",Zc=e=>e[0]==="接続詞",Jc=e=>e[0]==="連体詞",Qc=e=>(e[0]==="名詞"||e[0]==="動詞"||e[0]==="形容詞")&&e[1]==="接尾",ep=e=>e[0]==="名詞"&&e[1]==="形容動詞語幹",tp=e=>e[0]==="名詞"&&e[1]==="副詞可能",Nb=e=>e[0]==="動詞"&&e[1]==="非自立",ii=e=>e[0]==="形容詞"&&e[1]==="非自立",Bb=e=>e[0]==="助詞"&&e[1]==="接続助詞",Mb=e=>e[0]==="名詞"&&e[1]==="固有名詞"&&e[2]==="人名"&&e[3]==="姓",Db=e=>e[0]==="名詞"&&e[1]==="固有名詞"&&e[2]==="人名"&&e[3]==="名",De=e=>(e[0]==="名詞"||e[0]==="記号")&&e[1]==="数",si=e=>e[5].startsWith("連用"),Ub=e=>{if(e[0]!=="記号"){if(e[0]==="名詞"&&e[1]==="数"){e[0]="記号";return}if((e[0]==="副詞"||e[0]==="名詞")&&e[1]==="一般"){e[0]="記号",e[1]="一般";return}e[0]="記号",e[1]="*"}},Pb=e=>{let t=[];for(const n of e){if(lt(n)!==0){t.push(n);continue}const a=cn(n.surface);for(const r of a){const s={surface:n.surface.slice(r.start,r.end),pos:[...n.pos],moras:Et(r.moras,r.devoiced),pronOrig:r.moras.map(l=>l.kana).join(""),accent:0,chainRule:n.chainRule,chainFlag:n.chainFlag,isUnknown:n.isUnknown};lt(s)===0?s.moras.length===1&&s.moras[0].spec.pseudo==="touten"&&Ub(s.pos):s.pos=["フィラー","*","*","*",s.pos[4],s.pos[5]],s.moras.length>0&&t.push(s)}}t=t.filter(n=>n.moras.length>0);{let n;const a=[];for(const r of t){if(xg(r.pos)&&$b(r.surface)){if(n!==void 0){n.surface+=r.surface,n.moras.push(...r.moras);continue}n=r}else n=void 0;a.push(r)}t=a}for(let n=0;n+1<t.length;n++){const a=t[n],r=t[n+1];r.moras.length===1&&r.moras[0].spec.kana==="ウ"&&!r.moras[0].spec.pseudo&&mt(r.pos)&&(Ft(a.pos)||mt(a.pos))&&lt(a)>0&&(r.moras=Et([Lb],[]),r.accent=0),mt(a.pos)&&r.surface==="？"&&(a.surface==="です"?(a.moras=Et(np("デス"),[]),a.accent=1):a.surface==="ます"&&(a.moras=Et(np("マス"),[]),a.accent=1))}return t},Lb={kana:"ー",consonant:"-",vowel:"long"},np=e=>{const t=cn(e);if(t.length!==1||t[0].start!==0||t[0].end!==e.length)throw new Error(`内部エラー: ${e} がモーラ分割できない`);return t[0].moras},Vb={Chi:"チ",Fu:"フ",Go:"ゴ",Ha:"ハ",Hi:"ヒ",Hya:"ヒャ",I:"イ",Ju:"ジュ",Ku:"ク",Long:"ー",Ni:"ニ",Re:"レ",Ro:"ロ",Shi:"シ",Ta:"タ",To:"ト",Xtsu:"ッ",Yo:"ヨ"},ce=(e,t)=>{let n="";for(const a of e){const r=Vb[a];if(r===void 0)throw new Error(`未登録の MoraEnum: ${a}`);n+=r}return{kana:n,accent:t}},qb=new Set(["年","円","年間","年生","年代","年度","年版","年余","年来","えん"]),Wb=new Map([["四",ce(["Yo"],0)]]),Fb=new Set(["人","人月","人前","人組"]),Gb=new Map([["四",ce(["Yo"],0)],["七",ce(["Shi","Chi"],1)]]),Hb=new Set(["時","時間","時限","時半"]),jb=new Map([["四",ce(["Yo"],0)],["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),Kb=new Set(["日","日間"]),Xb=new Map([["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),Yb=new Set(["月"]),Zb=new Map([["四",ce(["Shi"],0)],["七",ce(["Shi","Chi"],1)],["九",ce(["Ku"],0)]]),Jb=new Set([]),Qb=new Map([["六",ce(["Ro","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),ev=new Set(["個","階","分","発","本","鉢","口","切れ","箱","か月","か国","か所","か条","か村","か年","カ月","カ国","カ寺","カ所","カ条","カ村","カ店","カ年","ケ月","ケ国","ケ所","ケ条","ケ村","ケ年","ヵ月","ヵ国","ヵ所","ヵ条","ヵ村","ヵ年","ヶ月","ヶ国","ヶ所","ヶ条","ヶ村","ヶ年","個月","個口","個国","個条","個年","箇月","箇国","箇所","箇条","箇年","かけ","くだり","けた","価","課","画","回","回忌","回生","回戦","回線","回分","海里","カイリ","浬","角","株","冠","巻","缶","貫","貫目","間","基","期","期生","機","気圧","季","騎","客","脚","球","級","橋","局","曲","極","重ね","斤","金","句","区","躯","計","桁","ケタ","校","港","項","組","件","軒","言","戸","湖","光年","石","ぴき","ぺん","波","派","敗","杯","拍","泊","版","犯","班","匹","疋","筆","俵","票","品","分間","分目","片","篇","編","辺","遍","歩","報","方","法","本立て","頭身"]),tv=new Map([["一",ce(["I","Xtsu"],1)],["六",ce(["Ro","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),nv=new Set(["．","・","才","頭","着","足","尺","坪","通り","センチ","シーシー","ＣＣ","ｃｃ","ｃｍ","サイクル","サンチーム","シーズン","シート","シリング","シンガポールドル","スイスフラン","スウェーデンクローネ","スクレ","セット","セント","ソル","ゾーン","糎","竿","差","差し","歳","歳児","作","冊","刷","皿","棹","艘","子","視","式","失","室","射","社","勺","種","首","周","周忌","周年","州","週","週間","集","宿","所","勝","升","床","章","色","食","親等","進","進数","品","すじ","そう","そろい","筋","数","寸","世","隻","席","石","節","戦","線","選","銭","層","相","揃","たび","つかみ","つがい","つぶ","つまみ","つ折","つ折り","とおり","とき","ところ","とせ","玉","月","手","束","続き","体","対","卓","樽","反","丁","丁目","鳥","通","掴み","艇","滴","店","転","点","斗","棟","盗","灯","等","等席","等地","等分","答","得","噸","粒","種類","歳馬","世紀","車種"]),av=new Map([["一",ce(["I","Xtsu"],1)],["八",ce(["Ha","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)]]),rv=new Set(["キロ","カロリー","ｃａｌ","ｋｂ","ｋｇ","ｋｌ","ｋｍ","ｋｔ","ｋｗ","ｋグラム","ｋバイト","ｋヘルツ","ｋメートル","ｋリットル","ｋワット","カナダドル","カラット","ガロン","キュリー","キロカロリー","キログラム","キロトン","キロバイト","キロヘルツ","キロメートル","キロリットル","キロワット","キロワット時","クラス","クローナ","クローネ","グァラニ","ケース","コース","粁"]),iv=new Map([["六",ce(["Ro","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)],["百",ce(["Hya","Xtsu"],1)]]),sv=new Set(["トン","ｔ","タル","テラ","トライ"]),ov=new Map([["一",ce(["I","Xtsu"],1)],["十",ce(["Ju","Xtsu"],1)]]),uv=new Set(["房","柱","％","ポンド","ｐａ","ｐｐｍ","パーセント","パーミル","パスカル","パック","パット","ピーピーエム","ピコ","ページ","頁","ペア","ペセタ","ペソ","ペニー","ペニヒ","ペンス","ポイント","振り","針","袋","張り","平米","平方キロ","平方キロメートル","平方センチメートル","平方メートル","品目"]),lv=new Map([["十",ce(["Ju","Xtsu"],1)]]),dv=[{keys:qb,table:Wb},{keys:Fb,table:Gb},{keys:Hb,table:jb},{keys:Kb,table:Xb},{keys:Yb,table:Zb},{keys:Jb,table:Qb},{keys:ev,table:tv},{keys:nv,table:av},{keys:rv,table:iv},{keys:sv,table:ov},{keys:uv,table:lv}],cv=new Set(["分","版","敗","発","拍","鉢","波","派","泊","犯","班","品","分間","分目","片","篇","編","辺","遍","歩","報","方"]),pv=new Map([["一","semivoiced"],["三","semivoiced"],["四","semivoiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","semivoiced"],["万","semivoiced"],["何","semivoiced"]]),fv=new Set(["本","匹","疋","票","俵","箱","本立て","杯","針","柱"]),hv=new Map([["一","semivoiced"],["三","voiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","voiced"],["万","voiced"],["何","voiced"]]),mv=new Set([]),gv=new Map([["三","voiced"],["六","semivoiced"],["八","semivoiced"],["十","semivoiced"],["百","semivoiced"],["千","voiced"],["万","voiced"],["何","voiced"]]),yv=new Set(["軒","石","足","尺","かけ","重ね","件","勺"]),wv=new Map([["三","voiced"],["千","voiced"],["万","voiced"]]),_v=new Set(["階"]),bv=new Map([["三","voiced"]]),vv=[{keys:cv,table:pv},{keys:fv,table:hv},{keys:mv,table:gv},{keys:yv,table:wv},{keys:_v,table:bv}],$v=[{surface:"棟",prons:new Set(["ムネ"])},{surface:"かけ",prons:new Set(["カケ"])},{surface:"くだり",prons:new Set(["クダリ"])},{surface:"けた",prons:new Set(["ケタ"])},{surface:"すじ",prons:new Set(["スジ"])},{surface:"そろい",prons:new Set(["ソロイ"])},{surface:"たび",prons:new Set(["タビ"])},{surface:"つかみ",prons:new Set(["ツカミ"])},{surface:"つがい",prons:new Set(["ツガイ"])},{surface:"つまみ",prons:new Set(["ツマミ"])},{surface:"とおり",prons:new Set(["トーリ"])},{surface:"ところ",prons:new Set(["トコロ"])},{surface:"とせ",prons:new Set(["トセ"])},{surface:"まわり",prons:new Set(["マワリ"])},{surface:"シーズン",prons:new Set(["シーズン"])},{surface:"セット",prons:new Set(["セット"])},{surface:"握り",prons:new Set(["ニギリ"])},{surface:"回り",prons:new Set(["マワリ"])},{surface:"株",prons:new Set(["カブ"])},{surface:"竿",prons:new Set(["サオ"])},{surface:"筋",prons:new Set(["スジ"])},{surface:"桁",prons:new Set(["ケタ"])},{surface:"ケタ",prons:new Set(["ケタ"])},{surface:"月",prons:new Set(["ツキ"])},{surface:"言",prons:new Set(["コト"])},{surface:"口",prons:new Set(["クチ"])},{surface:"差し",prons:new Set(["サシ"])},{surface:"皿",prons:new Set(["サラ"])},{surface:"山",prons:new Set(["ヤマ"])},{surface:"勺",prons:new Set(["シャク"])},{surface:"尺",prons:new Set(["シャク"])},{surface:"重ね",prons:new Set(["カサネ","ガサネ"])},{surface:"振り",prons:new Set(["フリ"])},{surface:"針",prons:new Set(["ハリ"])},{surface:"切れ",prons:new Set(["キレ"])},{surface:"束",prons:new Set(["タバ"])},{surface:"続き",prons:new Set(["ツヅキ"])},{surface:"揃",prons:new Set(["ソロイ"])},{surface:"袋",prons:new Set(["フクロ"])},{surface:"柱",prons:new Set(["ハシラ"])},{surface:"張り",prons:new Set(["ハリ"])},{surface:"通り",prons:new Set(["トーリ"])},{surface:"掴み",prons:new Set(["ツカミ"])},{surface:"坪",prons:new Set(["ツボ"])},{surface:"箱",prons:new Set(["ハコ"])},{surface:"鉢",prons:new Set(["ハチ"])},{surface:"晩",prons:new Set(["バン"])},{surface:"品",prons:new Set(["シナ"])},{surface:"瓶",prons:new Set(["ビン"])},{surface:"分け",prons:new Set(["ワケ"])},{surface:"幕",prons:new Set(["マク"])},{surface:"夜",prons:new Set(["ヤ","ヨ"])},{surface:"粒",prons:new Set(["ツブ"])},{surface:"枠",prons:new Set(["ワク"])},{surface:"棹",prons:new Set(["サオ"])},{surface:"つ折",prons:new Set(["ツオリ"])},{surface:"つ折り",prons:new Set(["ツオリ"])},{surface:"つぶ",prons:new Set(["ツブ"])},{surface:"とき",prons:new Set(["トキ"])}],xv=new Map([["一",ce(["Hi","To"],0)],["二",ce(["Fu","Ta"],0)]]),ap=new Set(["一","二","三","四","五","六","七","八","九","何","幾","数"]),rp=new Set(["十","百","千","万","億","兆","京","垓","𥝱","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数"]),kv=new Set(["百","千"]),Sv=new Map([["三","voiced"],["六","semivoiced"],["八","semivoiced"],["何","voiced"]]),Tv=new Set(["百"]),Ev=new Map([["六",ce(["Ro","Xtsu"],0)],["八",ce(["Ha","Xtsu"],0)]]),Iv=new Set(["千","兆"]),Cv=new Map([["一",ce(["I","Xtsu"],0)],["八",ce(["Ha","Xtsu"],0)],["十",ce(["Ju","Xtsu"],1)]]),Av=[{keys:Tv,table:Ev},{keys:Iv,table:Cv}],zv=[{keys:kv,table:Sv}],Ov=new Set(["人"]),Rv=new Map([["一","一人,名詞,副詞可能,*,*,*,*,一人,ヒトリ,ヒトリ,2/3,*"],["二","二人,名詞,副詞可能,*,*,*,*,二人,フタリ,フタリ,3/3,*"]]),Nv=new Set(["日"]),Bv=new Map([["一","一日,名詞,副詞可能,*,*,*,*,一日,イチニチ,イチニチ,4/4,*"],["二","二日,名詞,副詞可能,*,*,*,*,二日,フツカ,フツカ,0/3,*"],["三","三日,名詞,副詞可能,*,*,*,*,三日,ミッカ,ミッカ,0/3,*"],["四","四日,名詞,副詞可能,*,*,*,*,四日,ヨッカ,ヨッカ,0/3,*"],["五","五日,名詞,副詞可能,*,*,*,*,五日,イツカ,イツカ,0/3,*"],["六","六日,名詞,副詞可能,*,*,*,*,六日,ムイカ,ムイカ,0/3,*"],["七","七日,名詞,副詞可能,*,*,*,*,七日,ナノカ,ナノカ,0/3,*"],["八","八日,名詞,副詞可能,*,*,*,*,八日,ヨウカ,ヨーカ,0/3,*"],["九","九日,名詞,副詞可能,*,*,*,*,九日,ココノカ,ココノカ,0/4,*"],["十","十日,名詞,副詞可能,*,*,*,*,十日,トウカ,トーカ,0/3,*"]]),Mv=new Set(["日間"]),Dv=new Map([["一","一日間,名詞,副詞可能,*,*,*,*,一日間,イチニチカン,イチニチカン,4/6,*"],["二","二日間,名詞,副詞可能,*,*,*,*,二日,フツカカン,フツカカン,3/5,*"],["三","三日間,名詞,副詞可能,*,*,*,*,三日,ミッカカン,ミッカカン,3/5,*"],["四","四日間,名詞,副詞可能,*,*,*,*,四日,ヨッカカン,ヨッカカン,3/5,*"],["五","五日間,名詞,副詞可能,*,*,*,*,五日,イツカカン,イツカカン,3/5,*"],["六","六日間,名詞,副詞可能,*,*,*,*,六日,ムイカカン,ムイカカン,3/5,*"],["七","七日間,名詞,副詞可能,*,*,*,*,七日,ナノカカン,ナノカカン,3/5,*"],["八","八日間,名詞,副詞可能,*,*,*,*,八日,ヨウカカン,ヨーカカン,3/5,*"],["九","九日間,名詞,副詞可能,*,*,*,*,九日,ココノカカン,ココノカカン,4/6,*"],["十","十日間,名詞,副詞可能,*,*,*,*,十日,トウカカン,トーカカン,3/5,*"]]),Uv=[{keys:Ov,table:Rv},{keys:Nv,table:Bv},{keys:Mv,table:Dv}],Pv=new Map([["０","０,名詞,数,*,*,*,*,０,ゼロ,ゼロ,1/2,C3"],["１","１,名詞,数,*,*,*,*,１,イチ,イチ,2/2,C3"],["２","２,名詞,数,*,*,*,*,２,ニ,ニ,1/1,C3"],["３","３,名詞,数,*,*,*,*,３,サン,サン,0/2,C3"],["４","４,名詞,数,*,*,*,*,４,ヨン,ヨン,1/2,C1"],["５","５,名詞,数,*,*,*,*,５,ゴ,ゴ,1/1,C3"],["６","６,名詞,数,*,*,*,*,６,ロク,ロク,2/2,C3"],["７","７,名詞,数,*,*,*,*,７,ナナ,ナナ,1/2,C3"],["８","８,名詞,数,*,*,*,*,８,ハチ,ハチ,2/2,C3"],["９","９,名詞,数,*,*,*,*,９,キュウ,キュー,1/2,C3"]]),Lv=new Map([["○","〇"],["１","一"],["２","二"],["３","三"],["４","四"],["５","五"],["６","六"],["７","七"],["８","八"],["９","九"],["一","一"],["二","二"],["三","三"],["四","四"],["五","五"],["六","六"],["七","七"],["八","八"],["九","九"],["いち","一"],["に","二"],["さん","三"],["よん","四"],["ご","五"],["ろく","六"],["なな","七"],["はち","八"],["きゅう","九"],["〇","〇"],["０","０"],["壱","一"],["弐","二"],["貳","二"],["ニ","二"],["参","三"],["し","四"],["しち","七"],["く","九"]]),ip=["","十,名詞,数,*,*,*,*,十,ジュウ,ジュー,1/2,*","百,名詞,数,*,*,*,*,百,ヒャク,ヒャク,2/2,*","千,名詞,数,*,*,*,*,千,セン,セン,1/2,*"],sp=["","万,名詞,数,*,*,*,*,万,マン,マン,1/2,*","億,名詞,数,*,*,*,*,億,オク,オク,1/2,*","兆,名詞,数,*,*,*,*,兆,チョウ,チョー,1/2,C3","京,名詞,数,*,*,*,*,京,ケイ,ケー,1/2,*","垓,名詞,数,*,*,*,*,垓,ガイ,ガイ,1/2,*","𥝱,名詞,数,*,*,*,*,𥝱,ジョ,ジョ,1/1,*","穣,名詞,数,*,*,*,*,穣,ジョウ,ジョー,1/2,*","溝,名詞,数,*,*,*,*,溝,コウ,コウ,1/2,*","澗,名詞,数,*,*,*,*,澗,カン,カン,1/2,*","正,名詞,数,*,*,*,*,正,セイ,セー,1/2,*","載,名詞,数,*,*,*,*,載,サイ,サイ,1/2,*","極,名詞,数,*,*,*,*,極,ゴク,ゴク,1/2,*","恒河沙,名詞,数,*,*,*,*,恒河沙,ゴウガシャ,ゴウガシャ,1/4,*","阿僧祇,名詞,数,*,*,*,*,阿僧祇,アソウギ,アソーギ,2/4,*","那由他,名詞,数,*,*,*,*,那由他,ナユタ,ナユタ,1/3,*","不可思議,名詞,数,*,*,*,*,不可思議,フカシギ,フカシギ,2/4,*","無量大数,名詞,数,*,*,*,*,無量大数,ムリョウタイスウ,ムリョータイスー,6/7,*"],Vv=new Map([["カ","ガ"],["キ","ギ"],["ク","グ"],["ケ","ゲ"],["コ","ゴ"],["キャ","ギャ"],["キュ","ギュ"],["キョ","ギョ"],["キェ","ギェ"],["サ","ザ"],["シ","ジ"],["ス","ズ"],["セ","ゼ"],["ソ","ゾ"],["スィ","ズィ"],["シャ","ジャ"],["シュ","ジュ"],["ショ","ジョ"],["シェ","ジェ"],["タ","ダ"],["チ","ヂ"],["ツ","ヅ"],["テ","デ"],["ト","ド"],["テャ","デャ"],["ティ","ディ"],["テュ","デュ"],["トゥ","ドゥ"],["テョ","デョ"],["ハ","バ"],["ヒ","ビ"],["フ","ブ"],["ヘ","ベ"],["ホ","ボ"],["ヒャ","ビャ"],["ヒュ","ビュ"],["ヒェ","ビェ"],["ヒョ","ビョ"]]),qv=new Map([["ハ","パ"],["ヒ","ピ"],["フ","プ"],["ヘ","ペ"],["ホ","ポ"],["ヒャ","ピャ"],["ヒュ","ピュ"],["ヒェ","ピェ"],["ヒョ","ピョ"]]),Me=e=>{const t=e.split(",");if(t.length<12||t.length>13)throw new Error(`ルール行の列数が不正: ${e}`);const n=t[9],a=t[10].split("/")[0],r=a==="*"||a===""?0:Number(a);if(!Number.isInteger(r))throw new Error(`ルール行の核が不正: ${e}`);const i=n==="*"?[]:cn(n);if(i.length>1)throw new Error(`ルール行の発音が単一rangeでない: ${e}`);const s=t[12]==="1"?!0:t[12]==="0"?!1:void 0;return{surface:t[0],pos:[t[1],t[2],t[3],t[4],t[5],t[6]],moras:i.length===1?Et(i[0].moras,i[0].devoiced):[],pronOrig:i.length===1?i[0].moras.map(o=>o.kana).join(""):"",accent:r,chainRule:$g(t[11]??"*"),chainFlag:s,isUnknown:!1}},Ue=e=>{e.surface="",e.moras=[],e.pronOrig="",e.accent=0,e.chainRule=null,e.chainFlag=void 0,e.pos=["*","*","*","*","*","*"]},It=(e,t,n)=>{const a=cn(t);if(a.length!==1)throw new Error(`内部エラー: ${t} がモーラ分割できない`);e.moras=Et(a[0].moras,a[0].devoiced),e.accent=n},op=new Set(["―","−","‐","—","－"]),up=e=>e==="．"||e==="・",Wv=e=>e.pos[0]==="接頭詞"&&e.pos[1]==="数接続",lp=e=>e.pos[0]==="名詞"&&e.pos[1]==="副詞可能",dp=e=>e.pos[0]==="名詞"&&e.pos[1]==="接尾"&&e.pos[2]==="助数詞",Fv=(e,t,n)=>{let a=0;if(t>0){const r=e[t-1];Wv(r)?a+=2:(lp(r)||dp(r))&&(a+=1);const i=t>1?e[t-2]:void 0,s=i!==void 0&&De(i.pos);up(r.surface)?s&&(a-=5):(op.has(r.surface)||r.surface==="（"&&s||r.surface==="）"||r.surface==="番号")&&(a-=2),i!==void 0&&i.surface==="番号"&&(a-=2)}if(n+1<e.length){const r=e[n+1];if((lp(r)||dp(r))&&(a+=2),op.has(r.surface))a-=2;else if(r.surface==="（")a-=2;else if(r.surface==="）"){const i=e[n+2];i!==void 0&&De(i.pos)&&(a-=2)}else r.surface==="番号"?a-=2:up(r.surface)&&(a+=4)}return a},Gv=e=>{switch(e){case"一":return{kind:"digit",value:1};case"二":return{kind:"digit",value:2};case"三":return{kind:"digit",value:3};case"四":return{kind:"digit",value:4};case"五":return{kind:"digit",value:5};case"六":return{kind:"digit",value:6};case"七":return{kind:"digit",value:7};case"八":return{kind:"digit",value:8};case"九":return{kind:"digit",value:9};case"〇":case"０":return{kind:"digit",value:0};case"，":return{kind:"comma"};default:return}},Hv=e=>{const t=[];let n=0,a=[],r=!1;const i=()=>{for(;a.length>0&&a[a.length-1].kind!=="digit";)a.pop();a.length>0&&t.push(...Kv(n,a)),a=[]};e.forEach((s,o)=>{!r&&a.length>0&&i();const l=Gv(s.surface);if(l===void 0){r=!1;return}if(!r)if(l.kind==="digit")n=o,r=!0;else return;a.push(l)}),i();for(const s of t)s.isNumericalReading===void 0&&(s.isNumericalReading=Fv(e,s.start,s.end)>=0);return t},cp=e=>e.length>0&&e[0].kind==="digit"&&e[0].value===0,jv=e=>{let t=0;for(let n=0;n<e.length;n++){const a=e[e.length-1-n],r=n%4===3;if(a.kind==="digit"&&r)return!1;if(a.kind==="comma"){if(!r)return!1;t++}}return t>0},Kv=(e,t)=>{const n=(s,o,l)=>{if(!(o.length<=1))return{start:s,end:s+o.length-1,digits:o.flatMap(d=>d.kind==="digit"?[d.value]:[]),isNumericalReading:cp(o)?!1:l}};if(!cp(t)&&jv(t)){const s=n(e,t,!0);return s?[s]:[]}const a=[];let r=e,i=[];for(const s of t.concat([{kind:"comma"}]))if(s.kind==="comma"){const o=n(r,i,void 0);o&&a.push(o),r+=i.length+1,i=[]}else i.push(s);return a},Xv=(e,t)=>{for(let n=0;n<t.digits.length;n++){const a=e[t.start+n];switch(t.digits[n]){case 0:It(a,"ゼロ",1);break;case 2:It(a,"ニー",1);break;case 5:It(a,"ゴー",1);break}a.chainRule=null,n%2===0?(a.chainFlag=!1,n!==t.digits.length-1&&(a.accent=3)):a.chainFlag=!0}},Yv=(e,t)=>{let n=0;for(let i=t.end;i>=t.start;i--)e[i].surface==="，"&&(e.splice(i,1),n++);if(t.digits.length>sp.length*4)return-n;let a=!1,r=0;for(let i=0;i<t.digits.length;i++){const s=t.digits[i],o=t.start+i+r,l=t.digits.length-i-1;s===0?Ue(e[o]):a=!0,l%4===0?(a&&l>0&&(e.splice(o+1,0,Me(sp[l/4])),r++),a=!1):s===1?e[o]=Me(ip[l%4]):s!==0&&(e.splice(o+1,0,Me(ip[l%4])),r++)}return r-n},Zv=e=>{for(let a=0;a<e.length;a++){const r=e[a];if(!zb(r)||!De(r.pos))continue;const i=[];let s=!0;for(const o of r.surface){const l=Pv.get(o);if(l===void 0){s=!1;break}i.push(Me(l))}s&&i.length>0&&(e.splice(a,1,...i),a+=i.length-1)}for(const a of e)if(a.surface!=="*"&&De(a.pos)){const r=Lv.get(a.surface);r!==void 0&&(a.surface=r)}const t=Hv(e);let n=0;for(const a of t)a.start+=n,a.end+=n,a.isNumericalReading===!0?n+=Yv(e,a):Xv(e,a);return e.filter(a=>a.moras.length>0)},Jv=e=>e==="．"||e==="・",Qv=e=>e.pos[0]==="名詞"&&e.pos[1]==="副詞可能",e$=e=>e.pos[0]==="名詞"&&e.pos[1]==="接尾"&&e.pos[2]==="助数詞",pp=e=>Qv(e)||e$(e),En=(e,t,n)=>{for(const{keys:a,table:r}of e)if(a.has(t))return r.get(n)},oi=(e,t)=>It(e,t.kana,t.accent),fp=(e,t)=>{const n=e.moras[0];if(n===void 0||n.spec.pseudo)return;const r=(t==="voiced"?Vv:qv).get(n.spec.kana);if(r===void 0)return;const i=cn(r);if(i.length!==1||i[0].moras.length!==1)throw new Error(`内部エラー: 濁音化結果 ${r} が1モーラでない`);e.moras[0]=Et(i[0].moras,n.voiced?[]:[0])[0]},t$="．,名詞,接尾,助数詞,*,*,*,．,テン,テン,0/2,*,-1",n$="一日,名詞,副詞可能,*,*,*,*,一日,ツイタチ,ツイタチ,4/4,*",a$="十四日,名詞,副詞可能,*,*,*,*,十四日,ジュウヨッカ,ジューヨッカ,1/5,*",r$="十四日間,名詞,副詞可能,*,*,*,*,十四日間,ジュウヨッカカン,ジューヨッカカン,5/7,*",hp="二十,名詞,副詞可能,*,*,*,*,二十,ニジュウ,ニジュー,1/3,*",i$="四日,名詞,副詞可能,*,*,*,*,四日,ヨッカ,ヨッカ,0/3,*,0",s$="四日間,名詞,副詞可能,*,*,*,*,四日間,ヨッカカン,ヨッカカン,3/5,*,0",o$="二十日,名詞,副詞可能,*,*,*,*,二十日,ハツカ,ハツカ,0/3,*",u$="二十日間,名詞,副詞可能,*,*,*,*,二十日間,ハツカカン,ハツカカン,3/5,*",l$=e=>{{let t="disabled";for(let n=1;n+1<e.length;n++){const[a,r,i]=[e[n-1],e[n],e[n+1]];if(t==="ifMeishi"){t="skipping";continue}if(t==="skipping"){if(r.pos[0]==="名詞")continue;t="disabled";continue}if(r.surface!==""&&a.surface!==""&&Jv(r.surface)&&De(a.pos)&&De(i.pos)){switch(e[n]=Me(t$),e[n].chainFlag=!0,a.surface){case"〇":case"０":It(a,"レー",1);break;case"二":It(a,"ニー",1);break;case"五":It(a,"ゴー",1);break;case"六":It(a,"ロク",1);break}t="ifMeishi"}}}for(let t=1;t<e.length;t++){const[n,a]=[e[t-1],e[t]];if(!De(n.pos)||!pp(a))continue;const r=En(dv,a.surface,n.surface);r!==void 0&&oi(n,r);const i=En(vv,a.surface,n.surface);i!==void 0&&fp(a,i),n.chainFlag=!1,a.chainFlag=!0}for(let t=1;t<e.length;t++){const[n,a]=[e[t-1],e[t]];if(!De(n.pos))continue;De(a.pos)&&a.surface!==""&&(ap.has(n.surface)&&rp.has(a.surface)?(n.chainFlag=!1,a.chainFlag=!0):rp.has(n.surface)&&ap.has(a.surface)&&(a.chainFlag=!1));const r=En(Av,a.surface,n.surface);r!==void 0&&oi(n,r);const i=En(zv,a.surface,n.surface);i!==void 0&&fp(a,i)}for(let t=0;t+1<e.length;t++){const n=t>0?e[t-1]:void 0,[a,r]=[e[t],e[t+1]];if(r.surface===""||!De(a.pos)||n!==void 0&&!Ai(n.pos)&&De(n.pos)||!pp(r))continue;if($v.find(o=>o.surface===r.surface&&o.prons.has(r.pronOrig))!==void 0){const o=xv.get(a.surface);o!==void 0&&oi(a,o)}const s=En(Uv,r.surface,a.surface);s!==void 0&&(n!==void 0&&n.surface.includes("月")&&a.surface==="一"&&r.surface==="日"?e[t]=Me(n$):e[t]=Me(s),Ue(r))}if(e.length>2)for(let t=0;t+2<e.length;t++){const n=t>0?e[t-1]:void 0;if(n!==void 0&&De(n.pos))continue;const[a,r,i]=[e[t],e[t+1],e[t+2]],s=e[t+3],o=[a.surface,r.surface,i.surface,s?.surface];o[0]==="十"&&o[1]==="四"&&o[2]==="日"?(e[t]=Me(a$),Ue(r),Ue(i)):o[0]==="十"&&o[1]==="四"&&o[2]==="日間"?(e[t]=Me(r$),Ue(r),Ue(i)):o[0]==="二"&&o[1]==="十"&&o[2]==="四"&&o[3]==="日"?(e[t]=Me(hp),e[t+1]=Me(i$),Ue(i),Ue(s)):o[0]==="二"&&o[1]==="十"&&o[2]==="四"&&o[3]==="日間"?(e[t]=Me(hp),e[t+1]=Me(s$),Ue(i),Ue(s)):o[0]==="二"&&o[1]==="十"&&o[2]==="日"?(e[t]=Me(o$),Ue(r),Ue(i)):o[0]==="二"&&o[1]==="十"&&o[2]==="日間"&&(e[t]=Me(u$),Ue(r),Ue(i))}return e.filter(t=>t.moras.length>0)},d$=e=>{for(let t=1;t<e.length;t++)e[t].chainFlag===void 0&&(e[t].chainFlag=c$(e[t-1],e[t]))},c$=(e,t)=>{const n=e.pos,a=t.pos;return Qc(a)?!0:Qe(n)&&Db(a)||Mb(n)&&Qe(a)||Rb(a)||Ai(n)||Ai(a)||Qe(n)&&Ft(a)||Qe(n)&&fa(a)||Qe(n)&&ep(a)?!1:Ft(n)&&Nb(a)&&si(n)||Ft(n)&&ii(a)&&si(n)||fa(n)&&ii(a)&&si(n)||Bb(n)&&ii(a)&&(e.surface==="て"||e.surface==="で")?!0:Qc(n)&&Qe(a)?!1:(mt(n)||On(n))&&(mt(a)||On(a))?!0:mt(n)||On(n)?!1:mt(a)||On(a)?!0:tp(n)||tp(a)||Yc(n)||Zc(n)||Jc(n)||Yc(a)||Zc(a)||Jc(a)||Ft(n)&&(fa(a)||Qe(a))||ep(n)&&Qe(a)||fa(n)&&Qe(a)?!1:(Qe(n)&&Qe(a),!0)},p$=e=>{if(e.length===0)return;let t=0,n=0;for(let a=0;a<e.length;a++){const r=e[a],i=a>0?e[a-1]:void 0,s=a+1<e.length?e[a+1]:void 0;let o,l,d;a===0||r.chainFlag!==!0?(t=a,n=0,r.surface==="十"&&s!==void 0&&De(s.pos)&&(d=0)):i!==void 0&&(o=f$(r,i,e[t],n),De(i.pos)&&De(r.pos)&&(l=h$(i,r,s))),n+=lt(r),o!==void 0&&(e[t].accent=o),l!==void 0&&(e[a-1].accent=l),d!==void 0&&(r.accent=d)}},f$=(e,t,n,a)=>{const r=e.accent,i=n.accent,s=e.chainRule!==null?Ab(e.chainRule,t.pos):void 0;if(s===void 0)return i;const o=()=>Math.max(0,a+s.addType);switch(s.accentType){case"F1":return i;case"F2":return i===0?o():i;case"F3":return i!==0?o():i;case"F4":return o();case"F5":return 0;case"C1":return a+r;case"C2":return a+1;case"C3":return a;case"C4":return 0;case"C5":return i;case"P1":return i===0?0:a+r;case"P2":return i===0?0:a+r;case"P6":return 0;case"P14":return i!==0?a+r:i;default:return i}},h$=(e,t,n)=>{const a=e.surface,r=t.surface,i=n?.surface,s=["一","二","三","四","五","六","七","八","九"];if(r==="十")return["五","六","八"].includes(a)&&i!==void 0&&s.includes(i)?0:1;if(r==="百")return a==="七"?2:["三","四","九","何"].includes(a)?1:lt(e)+lt(t);if(r==="千"||r==="万")return lt(e)+1;if(r==="億")return["一","六","七","八","幾"].includes(a)?2:1;if(r==="兆")return["六","七"].includes(a)?2:1},mp=new Set(["k","ky","s","sh","t","ty","ch","ts","h","f","hy","p","py"]),m$=e=>{const t=[];let n=0,a=0;e.forEach((r,i)=>{r.chainFlag!==!0&&(n=0,a=r.accent);for(const s of r.moras)t.push({mora:s,nodeIndex:i,pos:r.pos,flag:s.voiced?void 0:!1,midx:n,atype:a}),n++});for(let r=0;r<t.length;r++){const i=t[r],s=t[r+1],o=t[r+2];if(s!==void 0&&o!==void 0){const l=i.nodeIndex===s.nodeIndex&&s.nodeIndex!==o.nodeIndex,d=Ft(s.pos)||mt(s.pos)||s.pos[0]==="感動詞",p=(i.mora.spec.kana==="マ"||i.mora.spec.kana==="デ")&&s.mora.spec.kana==="ス"&&!s.mora.spec.pseudo&&!i.mora.spec.pseudo;l&&d&&p&&(s.flag=o.mora.spec.pseudo==="question"||o.mora.spec.vowel==="long")}if(s!==void 0){const l=i.flag!==!1&&s.flag===void 0&&(o===void 0||o.flag!==!1),d=Ft(s.pos)||mt(s.pos)||On(s.pos),p=s.mora.spec.kana==="シ"&&!s.mora.spec.pseudo&&i.nodeIndex!==s.nodeIndex&&(o===void 0||o.nodeIndex!==s.nodeIndex);l&&d&&p&&(s.atype===s.midx+1?s.flag=!0:s.flag=gp(s.mora,o?.mora),s.flag===!1&&(i.flag??=!0,o!==void 0&&(o.flag??=!0)))}i.flag===void 0&&(xg(i.pos)||s?.flag===!1||i.atype===i.midx+1?i.flag=!0:i.flag=gp(i.mora,s?.mora)),i.flag===!1&&s!==void 0&&(s.flag??=!0),i.mora.voiced=i.flag??!0}},gp=(e,t)=>{if(t===void 0)return!0;const n=e.spec.consonant,a=e.spec.vowel,r=t.spec.consonant;if(!(a!=="i"&&a!=="u"))return n==="s"&&(r==="s"||r==="sh")||(n==="f"||n==="h")&&(r==="f"||r==="h"||r==="hy")?!0:!(n!==null&&r!==null&&mp.has(n)&&mp.has(r))},g$=(e,t,n)=>{const a=Eb(e,t,n);let r=Pb(Ob(a));return r=Zv(r),r=l$(r),d$(r),p$(r),m$(r),r},kg=e=>e.vowel==="cl"?["q"]:e.vowel==="N"?["N"]:e.consonant!==void 0?[e.consonant,e.vowel]:[e.vowel],y$=(e,t)=>{const n=[];let a=t;for(const r of e.moras){if(r.spec.pseudo)continue;const i=r.spec.vowel==="long"?a??"o":r.spec.vowel,s=r.spec.consonant==="-"||r.spec.vowel==="N"||r.spec.vowel==="cl";n.push({kana:r.spec.kana,consonant:s?void 0:r.spec.consonant??void 0,vowel:i,devoiced:r.voiced?void 0:!0}),a=i}return n},w$=new Map([["、",","],["，",","],["。","."],["．","."],["！","!"],["？","?"],["…","…"],["’","'"],["−","-"],["－","-"]]),Sg=e=>{const t=[];for(const n of e){const a=w$.get(n);a!==void 0&&t.push({surface:n,punct:a})}return t},Tg=e=>{const t=[];for(const n of e){if(lt(n)===0){if(t.length===0)continue;const i=t[t.length-1],s=b$(n);s!==void 0&&(i.pauseAfter=s),i.punctuations.push(...Sg(n.surface));continue}(n.chainFlag!==!0||t.length===0)&&t.push({words:[],accentNucleus:n.accent,pauseAfter:"none",punctuations:[]});const a=t[t.length-1],r=a.words.at(-1)?.moras.at(-1)?.vowel;a.words.push({node:n,moras:y$(n,r)})}return t.length>0&&(t[t.length-1].pauseAfter="long"),t},Eg=e=>{const t=[];for(const n of e){if(lt(n)>0)break;t.push(...Sg(n.surface))}return t},_$=(e,t)=>{const n=Tg(t).map(a=>({moras:a.words.flatMap(r=>r.moras),accentNucleus:a.accentNucleus,pauseAfter:a.pauseAfter,punctuations:a.punctuations.map(r=>r.punct)}));return{normalizedText:e,accentPhrases:n,leadingPunctuations:Eg(t).map(a=>a.punct)}},b$=e=>{if(e.pos[0]==="記号"){if(e.pos[1]==="読点")return"short";if(e.pos[1]==="句点")return"long"}},v$=e=>{const t=[],n=a=>t.push({surface:a.surface,phones:[a.punct]});for(const a of Eg(e))n(a);for(const a of Tg(e)){for(const r of a.words)t.push({surface:r.node.surface,phones:r.moras.flatMap(kg)});for(const r of a.punctuations)n(r)}return t},$$=(e,t,n)=>{const a=g$(e,t,n);return{result:_$(bg(t),a),words:v$(a)}},x$=(e,t)=>{if(e===0)return Array.from({length:t},(a,r)=>r===0?0:1);const n=Math.min(e,t);return n===1?Array.from({length:t},(a,r)=>r===0?1:0):Array.from({length:t},(a,r)=>r>=1&&r+1<=n?1:0)},k$=e=>{const t=["_"],n=[0];for(const a of e.leadingPunctuations)t.push(a),n.push(0);for(const a of e.accentPhrases){const r=x$(a.accentNucleus,a.moras.length);for(let i=0;i<a.moras.length;i++){const s=r[i];for(const o of kg(a.moras[i]))t.push(o),n.push(s)}for(const i of a.punctuations)t.push(i),n.push(0)}if(t.push("_"),n.push(0),t.length!==n.length)throw new Error(`phone_tone invariant broken: phones.length(${t.length}) !== tones.length(${n.length})`);return{phones:t,tones:n}},S$=new Set(["!","?","…",",",".","'","-"]),T$=e=>e.phones.length===1&&S$.has(e.phones[0]),E$=e=>e.map(t=>T$(t)?t.phones[0]:t.surface).join(""),nt=(e,t)=>{if(e===null||typeof e!="object"||Array.isArray(e))throw new Error(`${t} がオブジェクトでない`);return e},Ve=(e,t)=>{if(typeof e!="string")throw new Error(`${t} が文字列でない`);return e},un=(e,t)=>e==null?void 0:Ve(e,t),At=(e,t)=>{if(typeof e!="number"||!Number.isFinite(e))throw new Error(`${t} が有限数でない`);return e},Ia=(e,t)=>e==null?void 0:At(e,t),ln=(e,t)=>{if(!Array.isArray(e))throw new Error(`${t} が配列でない`);return e},Ig=(e,t)=>e==null?void 0:ln(e,t).map((n,a)=>Ve(n,`${t}[${a}]`)),yp=(e,t)=>{if(e==null)return;const n=nt(e,t),a={};for(const[r,i]of Object.entries(n))a[r]=At(i,`${t}.${r}`);return a},wp="hdae/deberta-v2-large-japanese-char-wwm-onnx-int4-rtn-b256",_p="3c6921bf67ee5f64a285f49df8636c1036b81881",I$="sbv2-web-deberta",C$={model:{path:"model.onnx",expectedBytes:240576205,sha256:"79002e00ea11bb41be2cd0d77e2a2608930cd8b502937101da31739fc6dabf96"},vocab:{path:"vocab.txt",expectedBytes:88151,sha256:"902cbd7e218aaf23a72955533293ceac12fcc4e010ad98c0c14757b94ce7abb6"},cleanRanges:{path:"clean_ranges.json",expectedBytes:585,sha256:"81655f8443715f05e198d1b915f3b0a884e6795008f9a8331c900477159faae2"},meta:{path:"meta.json",expectedBytes:662,sha256:"05d4082e7b47589384587a2585d951b5f56c1c25e478e27f8fd66861e8524c6c"}},A$={model:"model.onnx",vocab:"vocab.txt",cleanRanges:"clean_ranges.json",meta:"meta.json"},Cg=(e,t)=>{try{return JSON.parse(e)}catch(n){throw new Error(`getDeberta: ${t} が JSON として読めない`,{cause:n})}},z$=e=>{const t=nt(Cg(e,"clean_ranges.json"),"clean_ranges"),n=(a,r)=>ln(a,r).map((i,s)=>{const o=ln(i,`${r}[${s}]`);if(o.length!==2)throw new Error(`${r}[${s}] が [start, end] でない`);return[At(o[0],`${r}[${s}][0]`),At(o[1],`${r}[${s}][1]`)]});return{removed:n(t.removed,"clean_ranges.removed"),spaced:n(t.spaced,"clean_ranges.spaced")}},O$=e=>{const t=nt(Cg(e,"meta.json"),"meta"),n=nt(t.special_tokens,"meta.special_tokens"),a=r=>At(nt(n[r],`meta.special_tokens.${r}`).id,`meta.special_tokens.${r}.id`);return{clsId:a("cls"),sepId:a("sep"),unkId:a("unk")}},R$=(e,t,n)=>ls.fromVocabText(e,z$(t),O$(n)),N$=async(e={})=>{const t=await os({repo:wp,revision:e.revision??_p}),a=await N_({repo:wp,revision:t},t===_p?C$:A$,{cacheName:e.cacheName??I$,onProgress:e.onProgress}),r=new TextDecoder;return{tokenizer:R$(r.decode(a.vocab),r.decode(a.cleanRanges),r.decode(a.meta)),bertOnnxBytes:a.model,revision:t}},bp=[147,78,85,77,80,89],B$=e=>{for(let T=0;T<bp.length;T++)if(e[T]!==bp[T])throw new Error("npy: マジック '\\x93NUMPY' が一致しない（.npy でない）");const t=e[6],n=new DataView(e.buffer,e.byteOffset,e.byteLength);let a,r;if(t===1)a=n.getUint16(8,!0),r=10;else if(t===2||t===3)a=n.getUint32(8,!0),r=12;else throw new Error(`npy: 未対応バージョン major=${t}`);const i=e.subarray(r,r+a),s=new TextDecoder("latin1").decode(i),o=s.match(/'descr'\s*:\s*'([^']+)'/),l=s.match(/'fortran_order'\s*:\s*(True|False)/),d=s.match(/'shape'\s*:\s*\(([^)]*)\)/);if(!o||!l||!d)throw new Error(`npy: ヘッダを解釈できない: ${JSON.stringify(s)}`);const p=o[1];if(p!=="<f4")throw new Error(`npy: dtype '${p}' は未対応（'<f4' little-endian float32 のみ）`);if(l[1]==="True")throw new Error("npy: fortran_order=True は未対応（C-contiguous のみ）");const f=d[1].split(",").map(T=>T.trim()).filter(T=>T.length>0).map(T=>Number.parseInt(T,10));if(f.length!==2||f.some(T=>!Number.isInteger(T)||T<0))throw new Error(`npy: shape ${JSON.stringify(f)} は 2 次元でない（[rows, cols] を期待）`);const[m,y]=f,w=r+a,_=m*y*4,k=e.byteLength-w;if(k<_)throw new Error(`npy: データ長不足 available=${k} < expected=${_}（shape=${m}x${y}）`);const $=new Float32Array(m*y),b=new DataView(e.buffer,e.byteOffset+w,_);for(let T=0;T<$.length;T++)$[T]=b.getFloat32(T*4,!0);return{rows:m,cols:y,data:$}},Mn=(e,t)=>{let n=0,a=0,r=t;for(;;){if(r>=e.length)throw new Error("aivmx_meta: varint がバッファ末尾で途切れた");const i=e[r];if(r+=1,a+=(i&127)*2**n,(i&128)===0)break;if(n+=7,n>63)throw new Error("aivmx_meta: varint が長すぎる（壊れた protobuf）")}return[a,r]},Ag=(e,t)=>{const[n,a]=Mn(e,t);return[n,a,a+n]},M$=e=>{const t=Oa(e,"aivm_style_vectors");if(t===void 0)throw new Error("aivmx_meta: metadata_props に 'aivm_style_vectors' が無い（aivmx でない/破損を疑う）");return L$(t)},D$=e=>{const t=nt(e,"hyper_parameters"),n=nt(t.data,"hyper_parameters.data");return{modelName:un(t.model_name,"hyper_parameters.model_name"),version:un(t.version,"hyper_parameters.version"),samplingRate:At(n.sampling_rate,"hyper_parameters.data.sampling_rate"),nSpeakers:Ia(n.n_speakers,"hyper_parameters.data.n_speakers"),spk2id:yp(n.spk2id,"hyper_parameters.data.spk2id"),numStyles:Ia(n.num_styles,"hyper_parameters.data.num_styles"),style2id:yp(n.style2id,"hyper_parameters.data.style2id"),raw:e}},U$=e=>{const t=Oa(e,"aivm_hyper_parameters");return{hyperParameters:t===void 0?void 0:D$(zg(t,"aivm_hyper_parameters")),styleVectorsNpy:M$(e)}},zg=(e,t)=>{try{return JSON.parse(e)}catch(n){throw new Error(`aivmx_meta: metadata_props の '${t}' が JSON として読めない`,{cause:n})}},Oa=(e,t)=>{const n=new TextDecoder("utf-8");let a=0;for(;a<e.length;){const[r,i]=Mn(e,a),s=r>>3,o=r&7;if(a=i,o===0)[,a]=Mn(e,a);else if(o===2){const[,l,d]=Ag(e,a);if(s===14){const p=e.subarray(l,d),f=P$(p,n);if(f.key===t)return f.value}a=d}else if(o===5)a+=4;else if(o===1)a+=8;else throw new Error(`aivmx_meta: 未対応 wire type ${o}（field ${s}）`)}},P$=(e,t)=>{let n="",a="",r=0;for(;r<e.length;){const[i,s]=Mn(e,r),o=i>>3,l=i&7;if(r=s,l===2){const[,d,p]=Ag(e,r),f=t.decode(e.subarray(d,p));o===1?n=f:o===2&&(a=f),r=p}else if(l===0)[,r]=Mn(e,r);else throw new Error(`aivmx_meta: StringStringEntry の未対応 wire ${l}`)}return{key:n,value:a}},L$=e=>{const t=atob(e.replace(/\s/g,"")),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n},V$=(e,t)=>{const n=nt(e,t);return{audio:Ve(n.audio,`${t}.audio`),transcript:Ve(n.transcript,`${t}.transcript`)}},q$=(e,t,n)=>{const a=nt(e,t);return{name:Ve(a.name,`${t}.name`),...n?{}:{icon:un(a.icon,`${t}.icon`)},localId:At(a.local_id,`${t}.local_id`),voiceSamples:n?[]:ln(a.voice_samples??[],`${t}.voice_samples`).map((r,i)=>V$(r,`${t}.voice_samples[${i}]`))}},W$=(e,t,n)=>{const a=nt(e,t),r=ln(a.styles,`${t}.styles`);if(r.length===0)throw new Error(`${t}.styles が空（AIVM 1.0 は 1 スタイル以上必須）`);return{name:Ve(a.name,`${t}.name`),...n?{}:{icon:un(a.icon,`${t}.icon`)},supportedLanguages:Ig(a.supported_languages,`${t}.supported_languages`)??[],uuid:Ve(a.uuid,`${t}.uuid`),localId:At(a.local_id,`${t}.local_id`),styles:r.map((i,s)=>q$(i,`${t}.styles[${s}]`,n))}},F$=(e,t={})=>{const n=t.stripAssets??!0,a=nt(e,"manifest"),r=ln(a.speakers,"manifest.speakers");if(r.length===0)throw new Error("manifest.speakers が空（AIVM 1.0 は 1 話者以上必須）");return{manifestVersion:Ve(a.manifest_version,"manifest.manifest_version"),name:Ve(a.name,"manifest.name"),description:un(a.description,"manifest.description"),creators:Ig(a.creators,"manifest.creators"),license:un(a.license,"manifest.license"),modelArchitecture:Ve(a.model_architecture,"manifest.model_architecture"),modelFormat:Ve(a.model_format,"manifest.model_format"),trainingEpochs:Ia(a.training_epochs,"manifest.training_epochs"),trainingSteps:Ia(a.training_steps,"manifest.training_steps"),uuid:Ve(a.uuid,"manifest.uuid"),version:Ve(a.version,"manifest.version"),speakers:r.map((i,s)=>W$(i,`manifest.speakers[${s}]`,n))}},G$=(e,t={})=>{const n=Oa(e,"aivm_manifest");if(n===void 0)throw new Error("aivm_manifest: metadata_props に 'aivm_manifest' が無い（aivmx でない/破損を疑う）");return F$(zg(n,"aivm_manifest"),t)},Og=1024,ui=(e,t)=>{const n=new Array(e.length*2+1).fill(t);for(let a=0;a<e.length;a++)n[a*2+1]=e[a];return n},H$=(e,t)=>{if(e.length!==t.length)throw new Error(`phonesTonesToModelIds: phones(${e.length}) と tones(${t.length}) の長さが不一致`);const n=hb(e),a=t.map(i=>i+cb),r=n.map(()=>pb);return{phoneIds:ui(n,0),toneIds:ui(a,0),languageIds:ui(r,0)}},j$=e=>{if(e.length===0)throw new Error("addBlankWord2ph: base word2ph が空（両端 [1] 番兵が欠落）");const t=e.map(n=>n*2);return t[0]+=1,t},K$=(e,t,n)=>{if(t<=0||e.length%t!==0)throw new Error(`tileBertToPhoneLevel: hidden 長 ${e.length} が seqLen ${t} で割り切れない（矩形でない）`);const a=e.length/t;if(n.length!==t)throw new Error(`tileBertToPhoneLevel: DeBERTa トークン数 ${t} != word2ph 長 ${n.length}（文字トークナイズと word2ph の齟齬を疑う）`);let r=0;for(const o of n)r+=o;const i=new Float32Array(a*r);let s=0;for(let o=0;o<t;o++){const l=n[o],d=o*a;for(let p=0;p<l;p++){const f=s+p;for(let m=0;m<a;m++)i[m*r+f]=e[d+m]}s+=l}return{data:i,length:r}},X$=(e,t,n)=>{const{rows:a,cols:r,data:i}=e;if(r!==256)throw new Error(`styleVector: style 行列の列数が 256 でない: ${r}`);if(!(Number.isInteger(t)&&t>=0&&t<a))throw new Error(`styleVector: styleId ${t} が範囲外（0..${a-1} の整数を期待）`);if(!Number.isFinite(n))throw new Error(`styleVector: weight が有限数でない: ${n}`);const s=new Float32Array(r);for(let d=0;d<a;d++){const p=d*r;for(let f=0;f<r;f++)s[f]+=i[p+f]}for(let d=0;d<r;d++)s[d]/=a;const o=t*r,l=new Float32Array(r);for(let d=0;d<r;d++)l[d]=s[d]+(i[o+d]-s[d])*n;return l},Y$=e=>{const t=B$(e);if(t.cols!==256)throw new Error(`style_vectors の shape が想定外: [${t.rows}, ${t.cols}]（[N, 256] を期待）`);return t},Z$={lengthScale:1,sdpRatio:.2,noiseScale:.6,noiseScaleW:.8},vp=(e,t)=>{const n={...e,...t};for(const[a,r]of Object.entries(n))if(!Number.isFinite(r))throw new Error(`mergeScalars: ${a} が有限数でない: ${r}`);return n},Ca="output",$p=(e,t,n)=>{if(!Number.isFinite(e)||e<=0)throw new Error(`silence: sampleRate が不正: ${e}`);if(!Number.isFinite(t)||t<0)throw new Error(`silence: ${n} が不正（0 以上の有限秒数を期待): ${t}`);return Math.round(e*t)},J$=(e,t,n)=>{const a=$p(t,n.preSec??0,"preSec"),r=$p(t,n.postSec??0,"postSec");if(a===0&&r===0)return e;const i=new Float32Array(a+e.length+r);return i.set(e,a),i};class Ra{#e;#t;#n;#a=null;#r=new Set;constructor(t){this.#e=t.backend,this.#t=t.session,this.#n=t.session.inputNames,this.tokenizer=t.tokenizer}static async create(t,n){const a=await t.createSession(n.bertOnnxBytes,n.sessionOptions);return new Ra({backend:t,session:a,tokenizer:n.tokenizer})}get isReleased(){return this.#a!==null}extract(t,n,a){if(this.#a!==null)throw new Error("DebertaExtractor: release() 後に extract が呼ばれた");return this.#u(this.#s(t,n,a))}async#s(t,n,a){const r=j$(n),i=this.tokenizer.encode(t),s=i.length,o=this.#e.int64(BigInt64Array.from(i,BigInt),[1,s]),l=this.#e.int64(BigInt64Array.from(new Array(s).fill(1),BigInt),[1,s]),d={};for(const k of this.#n)if(k==="input_ids")d[k]=o;else if(k==="attention_mask")d[k]=l;else throw new Error(`DebertaExtractor: DeBERTa の想定外入力 '${k}'（input_ids/attention_mask のみ対応）`);const f=(await this.#t.run(d,[Ca]))[Ca],m=f.dims;if(m.length!==2||m[1]!==Og)throw new Error(`DebertaExtractor: DeBERTa 出力 shape が想定外 [${m.join(",")}]（[seq_len, 1024] を期待）`);if(f.type!=="float32")throw new Error(`DebertaExtractor: DeBERTa 出力 dtype が想定外 '${f.type}'（float32 を期待）`);const y=f.data;if(m[0]!==r.length)throw new Error(`DebertaExtractor: DeBERTa トークン数 ${m[0]} != word2ph 長 ${r.length}（bertText=${JSON.stringify(t)}）。文字トークナイズと word2ph の齟齬を疑う。`);const{data:w,length:_}=K$(y,m[0],r);if(_!==a)throw new Error(`DebertaExtractor: bert 展開長 ${_} != 音素列長 ${a}（word2ph 調整と add_blank の齟齬）`);return w}async#u(t){this.#r.add(t);try{return await t}finally{this.#r.delete(t)}}release(){return this.#a??=this.#i(),this.#a}async#i(){for(;this.#r.size>0;)await Promise.allSettled([...this.#r]);await this.#t.release()}}const Q$=e=>{if(e.deberta!==void 0){if(e.bertOnnxBytes!==void 0||e.tokenizer!==void 0)throw new Error("Sbv2Adapter: deberta と bertOnnxBytes/tokenizer は同時指定できない（BERT セッションの所有者が曖昧になる）");if(e.deberta.isReleased)throw new Error("Sbv2Adapter: release() 済みの DebertaExtractor は使えない");return{kind:"shared",deberta:e.deberta}}if(e.bertOnnxBytes===void 0||e.tokenizer===void 0)throw new Error("Sbv2Adapter: BERT の供給が必要（bertOnnxBytes + tokenizer、または生成済みの deberta）");return{kind:"own",bertOnnxBytes:e.bertOnnxBytes,tokenizer:e.tokenizer}};class Dn{constructor(t){this.needsBert=!0,this.#l=null,this.#o=new Set,this.#e=t.backend,this.#t=t.acoustic,this.#n=t.acoustic.inputNames,this.#a=t.deberta,this.#r=t.ownsDeberta,this.#s=t.styleMatrix,this.sampleRate=t.sampleRate,this.#u=t.scalars,this.#i=t.hyperParameters}get numStyles(){return this.#s.rows}get hyperParameters(){return this.#i}get numSpeakers(){return this.#i?.nSpeakers}get spk2id(){return this.#i?.spk2id}#e;#t;#n;#a;#r;#s;#u;#i;#l;#o;static async fromOnnx(t,n){const a=Q$(n),r=Y$(n.styleVectorsNpy),i=await t.createSession(n.acousticOnnxBytes,n.sessionOptions);let s;if(a.kind==="own")try{s=await Ra.create(t,{bertOnnxBytes:a.bertOnnxBytes,tokenizer:a.tokenizer,sessionOptions:n.sessionOptions})}catch(o){throw await i.release().catch(()=>{}),o}else s=a.deberta;return new Dn({backend:t,acoustic:i,deberta:s,ownsDeberta:a.kind==="own",styleMatrix:r,sampleRate:n.sampleRate,scalars:vp(Z$,n.scalars),hyperParameters:n.hyperParameters})}static async fromAivmx(t,n){const{aivmxBytes:a,metadata:r,sampleRate:i,scalars:s,sessionOptions:o,...l}=n,d=r??U$(a),p=i??d.hyperParameters?.samplingRate;if(p===void 0)throw new Error("Sbv2Adapter: sampleRate を決められない（aivmx に aivm_hyper_parameters が無い。sampleRate を明示指定するか、hyper_parameters 入りの aivmx を使う）");return await Dn.fromOnnx(t,{...l,acousticOnnxBytes:a,styleVectorsNpy:d.styleVectorsNpy,sampleRate:p,scalars:s,hyperParameters:d.hyperParameters,sessionOptions:o})}#d(t){if(this.#l!==null)throw new Error(`Sbv2Adapter: release() 後に ${t} が呼ばれた`)}async#c(t){this.#o.add(t);try{return await t}finally{this.#o.delete(t)}}buildAcousticFeeds(t){return this.#d("buildAcousticFeeds"),this.#c(this.#p(t))}async#p(t){const{phoneIds:n,toneIds:a,languageIds:r}=H$(t.phones,t.tones),i=n.length,s=await this.#a.extract(t.bertText,t.baseWord2ph,i),o=X$(this.#s,t.styleId,t.styleWeight);return{xTst:BigInt64Array.from(n,BigInt),xTstLengths:BigInt64Array.from([i],BigInt),sid:BigInt64Array.from([t.speakerId],BigInt),tones:BigInt64Array.from(a,BigInt),language:BigInt64Array.from(r,BigInt),bert:s,styleVec:o,seqLen:i,scalars:vp(this.#u,t.scalars)}}synthesize(t){return this.#d("synthesize"),this.#c(this.#f(t))}async#f(t){const n=await this.#p(t),a=n.seqLen,r={x_tst:this.#e.int64(n.xTst,[1,a]),x_tst_lengths:this.#e.int64(n.xTstLengths,[1]),sid:this.#e.int64(n.sid,[1]),tones:this.#e.int64(n.tones,[1,a]),language:this.#e.int64(n.language,[1,a]),bert:this.#e.float32(n.bert,[1,Og,a]),style_vec:this.#e.float32(n.styleVec,[1,256]),length_scale:this.#e.float32(Float32Array.from([n.scalars.lengthScale]),[]),sdp_ratio:this.#e.float32(Float32Array.from([n.scalars.sdpRatio]),[]),noise_scale:this.#e.float32(Float32Array.from([n.scalars.noiseScale]),[]),noise_scale_w:this.#e.float32(Float32Array.from([n.scalars.noiseScaleW]),[])},i={},s=[];for(const d of this.#n){const p=r[d];p===void 0?s.push(d):i[d]=p}if(s.length>0)throw new Error(`Sbv2Adapter: aivmx 入力名 ${JSON.stringify(s)} に対応テンソルが無い（グラフ入力=${JSON.stringify(this.#n)}）`);const l=(await this.#t.run(i,[Ca]))[Ca];if(l.type!=="float32")throw new Error(`Sbv2Adapter: 音響出力 dtype が想定外 '${l.type}'（float32 を期待）`);return l.data}release(){return this.#l??=this.#h(),this.#l}async#h(){for(;this.#o.size>0;)await Promise.allSettled([...this.#o]);const t=[this.#t.release()];this.#r&&t.push(this.#a.release());const a=(await Promise.allSettled(t)).find(r=>r.status==="rejected");if(a!==void 0)throw a.reason}}const e1=async(e,t,n,a,r={})=>{const{result:i,words:s}=$$(t,e,r.overlay),{phones:o,tones:l}=k$(i),d=E$(s),p=lb(s,n,o.length),f=await a.synthesize({phones:o,tones:l,bertText:d,baseWord2ph:p,styleId:r.styleId??0,styleWeight:r.styleWeight??1,speakerId:r.speakerId??0,scalars:r.scalars});return J$(f,a.sampleRate,{preSec:r.preSilenceSec,postSec:r.postSilenceSec})},t1=(e,t)=>{const n=e.length,a=2,r=n*a,i=new ArrayBuffer(44+r),s=new DataView(i),o=(l,d)=>{for(let p=0;p<d.length;p++)s.setUint8(l+p,d.charCodeAt(p))};o(0,"RIFF"),s.setUint32(4,36+r,!0),o(8,"WAVE"),o(12,"fmt "),s.setUint32(16,16,!0),s.setUint16(20,1,!0),s.setUint16(22,1,!0),s.setUint32(24,t,!0),s.setUint32(28,t*a,!0),s.setUint16(32,a,!0),s.setUint16(34,16,!0),o(36,"data"),s.setUint32(40,r,!0);for(let l=0;l<n;l++){const d=Math.max(-1,Math.min(1,e[l]));s.setInt16(44+l*a,Math.round(d*32767),!0)}return new Uint8Array(i)},li={int64:(e,t)=>new Ge("int64",e,t),float32:(e,t)=>new Ge("float32",e,t),createSession:(e,t)=>Ni.create(e,t)};class n1{static createFromAivmx(t){return Dn.fromAivmx(li,t)}static createFromOnnx(t){return Dn.fromOnnx(li,t)}static createDeberta(t){return Ra.create(li,t)}}let gt=null,Un=null,Aa=null;const Rg=async()=>{await gt?.release(),gt=null,Un=null,Aa=null},a1=async(e,t)=>{const n=await fetch(e);if(!n.ok)throw new Error(`音響モデルの取得に失敗しました (HTTP ${n.status}): ${e}`);const a=Number(n.headers.get("content-length"))||void 0;if(!n.body){const d=await n.arrayBuffer();return t?.({stage:"acoustic-download",loaded:d.byteLength,total:a}),new Uint8Array(d)}const r=n.body.getReader(),i=[];let s=0;for(;;){const{done:d,value:p}=await r.read();if(d)break;i.push(p),s+=p.byteLength,t?.({stage:"acoustic-download",loaded:s,total:a})}const o=new Uint8Array(s);let l=0;for(const d of i)o.set(d,l),l+=d.byteLength;return o},r1=async(e,t)=>{const n=performance.now();await Rg(),be.wasm.wasmPaths=e.ortWasmBaseUrl,e.provider==="webgpu"&&await import("./ort.webgpu.bundle.min-DN3xwqwH.js");const a=await a1(e.aivmxUrl,t);t?.({stage:"deberta",loaded:0,total:void 0});const r=await N$({onProgress:o=>{o.path==="model.onnx"&&t?.({stage:"deberta",loaded:o.loaded,total:o.total})}});Un=r.tokenizer;const i=r.bertOnnxBytes;t?.({stage:"dictionary"}),Aa=await ob(),t?.({stage:"acoustic"});const s=Oa(a,"aivm_manifest")===void 0?void 0:G$(a,{stripAssets:!1});return gt=await n1.createFromAivmx({aivmxBytes:a,bertOnnxBytes:i,tokenizer:Un,sessionOptions:{executionProviders:[e.provider]}}),{provider:e.provider,elapsedMs:Math.round(performance.now()-n),sampleRate:gt.sampleRate,numStyles:gt.numStyles,manifest:s}},i1=async e=>{if(!gt||!Un||!Aa)throw new Error("モデルが読み込まれていません。");const t=performance.now(),n=await e1(e.text,Aa,Un,gt,{styleId:e.styleId,styleWeight:e.styleWeight,speakerId:e.speakerId});return{wavBytes:t1(n,gt.sampleRate),elapsedMs:Math.round(performance.now()-t),samples:n.length,sampleRate:gt.sampleRate}};var s1=Object.freeze({__proto__:null,load:r1,release:Rg,synthesize:i1});zi(s1);
