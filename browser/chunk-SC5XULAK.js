import{C as i,F as n,lb as o,mb as h}from"./chunk-IYLSK3UX.js";var p=class r{constructor(e){this.http=e}baseUrl="http://localhost:8080/api";getAuthHeaders(){let e=localStorage.getItem("token");return new o({Authorization:`Bearer ${e}`})}getUsers(){let e=this.getAuthHeaders();return this.http.get(`${this.baseUrl}/users`,{headers:e})}getUserById(e){let t=this.getAuthHeaders();return this.http.get(`${this.baseUrl}/users/${e}`,{headers:t})}createUser(e){let t=this.getAuthHeaders();return this.http.post(`${this.baseUrl}/users`,e,{headers:t})}updateUser(e,t){let s=this.getAuthHeaders();return this.http.put(`${this.baseUrl}/users/${e}`,t,{headers:s})}deleteUser(e){let t=this.getAuthHeaders();return this.http.delete(`${this.baseUrl}/users/${e}`,{headers:t})}toggleUserEnabled(e){let t=this.getAuthHeaders();return this.http.patch(`${this.baseUrl}/users/${e}/toggle-enabled`,{},{headers:t})}getUserProfile(){let e=this.getAuthHeaders();return this.http.get(`${this.baseUrl}/users/profile`,{headers:e})}updateProfile(e,t){let s=this.getAuthHeaders(),a=new FormData;return a.append("profileData",JSON.stringify(e)),t&&a.append("image",t),this.http.put(`${this.baseUrl}/users/profile`,a,{headers:s.delete("Content-Type")})}changePassword(e){let t={password:e};return this.updateProfile(t)}static \u0275fac=function(t){return new(t||r)(n(h))};static \u0275prov=i({token:r,factory:r.\u0275fac,providedIn:"root"})};export{p as a};
