import{a as i}from"./chunk-IKOAZ4YC.js";import{C as l,F as n,mb as o}from"./chunk-IYLSK3UX.js";var m=(r=>(r.PENDING="PENDING",r.APPROVED="APPROVED",r.REJECTED="REJECTED",r))(m||{}),p=class s{constructor(t){this.http=t}apiUrl="http://localhost:8080/api/claims";uploadUrl="http://localhost:8080/api/uploads/";getAllClaims(){let t=i();return this.http.get(this.apiUrl,{headers:t})}getClaimById(t){let e=i(),r=`${this.apiUrl}/${t}`;return this.http.get(r,{headers:e})}updateClaimStatus(t,e){let r=i(),a=`${this.apiUrl}/${t}/status?status=${e}`;return this.http.put(a,{},{headers:r,responseType:"text"})}submitClaim(t){let e=i();return this.http.post(this.apiUrl,t,{headers:e})}getImageUrl(t){return t?this.uploadUrl+t:""}getAllClaimsByUser(){let t=i(),e=`${this.apiUrl}/my-claims`;return this.http.get(e,{headers:t})}submitClaimWithImage(t){let r=i().delete("Content-Type"),a=`${this.apiUrl}/submit`;return this.http.post(a,t,{headers:r})}static \u0275fac=function(e){return new(e||s)(n(o))};static \u0275prov=l({token:s,factory:s.\u0275fac,providedIn:"root"})};export{m as a,p as b};
