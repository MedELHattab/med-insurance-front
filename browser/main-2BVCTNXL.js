import{f as S}from"./chunk-5CGHX74T.js";import{a as C}from"./chunk-SC5XULAK.js";import{C as s,F as a,ga as l,k as p,l as c,nb as h,pb as d,qb as f,rb as v,t as m,ub as A,va as u,wb as b}from"./chunk-IYLSK3UX.js";var n=class e{title="MedInsurance";static \u0275fac=function(t){return new(t||e)};static \u0275cmp=l({type:e,selectors:[["app-root"]],decls:1,vars:0,template:function(t,r){t&1&&u(0,"router-outlet")},dependencies:[f,S],encapsulation:2})};var o=class e{constructor(i,t,r){this.userService=i;this.authService=t;this.router=r}canActivate(i,t){return this.authService.isAuthenticated()?this.userService.getUserProfile().pipe(c(r=>r&&r.enabled===!0?!0:(this.authService.logout(),this.router.createUrlTree(["/login"]))),m(r=>(console.error("Error checking user status:",r),this.authService.logout(),p(this.router.createUrlTree(["/login"]))))):this.router.createUrlTree(["/login"])}static \u0275fac=function(t){return new(t||e)(a(C),a(b),a(v))};static \u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"})};var g=[{path:"auth",loadChildren:()=>import("./chunk-ZJGD3DIT.js").then(e=>e.AuthModule)},{path:"admin",loadChildren:()=>import("./chunk-2OU6ASX3.js").then(e=>e.AdminModule),canActivate:[o]},{path:"user",loadChildren:()=>import("./chunk-EAPQQVLT.js").then(e=>e.UserModule),canActivate:[o]},{path:"home",loadChildren:()=>import("./chunk-NGTWU3KH.js").then(e=>e.HomeModule)},{path:"employee",loadChildren:()=>import("./chunk-GR67ZLY2.js").then(e=>e.EmployeeModule),canActivate:[o]},{path:"",redirectTo:"/auth/login",pathMatch:"full"},{path:"**",redirectTo:"/auth/login"}];d(n,{providers:[A(g),h()]}).catch(e=>console.error(e));
