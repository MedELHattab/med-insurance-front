import{a as X,b as Z}from"./chunk-RH2RXJ72.js";import{b as K}from"./chunk-IL6RBSH4.js";import{b as ee}from"./chunk-U3SUU6ME.js";import"./chunk-IKOAZ4YC.js";import{a as B,c as W,d as Y,e as G,f as z,g as $,p as Q,s as J,u as le}from"./chunk-N37MMRHP.js";import{$ as E,Aa as b,Ca as m,D as _,Fa as V,Ga as A,Ha as N,Ia as T,J as f,Ja as n,K as x,Ka as p,L as y,La as M,M as C,Sa as S,Ta as j,Y as F,_ as l,e as re,eb as U,fb as D,ga as H,gb as R,ha as k,jb as P,la as g,pa as c,ra as q,ta as t,ua as e,va as s,vb as w,wb as L,ya as h}from"./chunk-IYLSK3UX.js";var u=re(le());var ae=["policiesSlider"],se=r=>({"opacity-60 cursor-not-allowed":r}),te=r=>({"opacity-50 cursor-not-allowed":r}),de=(r,o)=>({"bg-green-600 hover:bg-green-700":r,"bg-indigo-600 hover:bg-indigo-700":o}),ce=r=>({"transform rotate-180":r});function me(r,o){if(r&1&&(t(0,"div",66)(1,"div",67),s(2,"i"),e(),t(3,"h3",68),n(4),e(),t(5,"p",69),n(6),e()()),r&2){let i=o.$implicit;l(2),q(i.icon),l(2),p(i.title),l(2),p(i.description)}}function pe(r,o){r&1&&(t(0,"div",70),s(1,"div",71),e())}function ue(r,o){if(r&1){let i=h();t(0,"span",82),b("click",function(){let d=f(i).index,v=m(2);return x(v.setSlide(d))}),e()}if(r&2){let i=o.index,a=m(2);c("ngClass",i===a.activeSlideIndex?"bg-indigo-600":"bg-gray-300")}}function ge(r,o){if(r&1){let i=h();t(0,"div",83)(1,"div",84)(2,"div",85)(3,"h3",86),n(4),e()(),t(5,"div",87)(6,"div",88)(7,"div")(8,"p",89),n(9,"Coverage Percentage"),e(),t(10,"p",90),n(11),e()(),t(12,"div",91),n(13),e()(),t(14,"div",92)(15,"p",18),n(16),e()(),t(17,"button",93),b("click",function(){let d=f(i).$implicit,v=m(2);return x(v.subscribeToPolicy(d.id))}),n(18),e()()()()}if(r&2){let i=o.$implicit,a=m(2);l(4),p(i.name),l(7),M("",i.percentage,"%"),l(2),M(" ",i.status," "),l(3),p(i.description),l(),c("disabled",a.isPolicyActive(i.id))("ngClass",j(7,de,a.isPolicyActive(i.id),!a.isPolicyActive(i.id))),l(),M(" ",a.isPolicyActive(i.id)?"Active Policy":"Subscribe Now"," ")}}function fe(r,o){if(r&1){let i=h();t(0,"div",72)(1,"div",73)(2,"button",74),b("click",function(){f(i);let d=m();return x(d.prevSlide())}),y(),t(3,"svg",75),s(4,"path",76),e()(),C(),t(5,"div",77),g(6,ue,1,1,"span",78),e(),t(7,"button",74),b("click",function(){f(i);let d=m();return x(d.nextSlide())}),y(),t(8,"svg",75),s(9,"path",79),e()()(),C(),t(10,"div",80,1),g(12,ge,19,10,"div",81),e()()}if(r&2){let i=m();l(2),c("disabled",i.activeSlideIndex===0)("ngClass",S(6,te,i.activeSlideIndex===0)),l(4),c("ngForOf",i.policies),l(),c("disabled",i.activeSlideIndex===i.policies.length-1)("ngClass",S(8,te,i.activeSlideIndex===i.policies.length-1)),l(5),c("ngForOf",i.policies)}}function xe(r,o){r&1&&(t(0,"div",94),y(),t(1,"svg",95),s(2,"path",96),e(),C(),t(3,"h3",97),n(4,"No Policies Available"),e(),t(5,"p",98),n(6,"Please check back later for available insurance policies."),e()())}function be(r,o){if(r&1&&(t(0,"div",99)(1,"div",67),s(2,"i",100),e(),t(3,"p",101),n(4),e(),t(5,"div")(6,"p",102),n(7),e(),t(8,"p",69),n(9),e()()()),r&2){let i=o.$implicit;l(4),p(i.quote),l(3),p(i.author),l(2),p(i.role)}}function ve(r,o){if(r&1&&(t(0,"div",108)(1,"p",18),n(2),e()()),r&2){let i=m().$implicit;l(2),p(i.answer)}}function he(r,o){if(r&1){let i=h();t(0,"div",103)(1,"button",104),b("click",function(){let d=f(i).index,v=m();return x(v.toggleFaq(d))}),t(2,"span",62),n(3),e(),y(),t(4,"svg",105),s(5,"path",106),e()(),g(6,ve,3,1,"div",107),e()}if(r&2){let i=o.$implicit;l(3),p(i.question),l(),c("ngClass",S(3,ce,i.open)),l(2),c("ngIf",i.open)}}var I=class r{constructor(o,i,a){this.policyService=o;this.subscriptionService=i;this.authService=a}policiesSlider;policies=[];isLoading=!1;activeSlideIndex=0;totalSlides=0;isAuthenticated=!1;currentUserSubscription=null;features=[{icon:"fa-solid fa-shield-heart",title:"Comprehensive Coverage",description:"Get full coverage for hospital visits, medications, and specialist consultations."},{icon:"fa-solid fa-money-bill-wave",title:"Affordable Policies",description:"Flexible pricing options to fit every budget without compromising on quality."},{icon:"fa-solid fa-clock",title:"Fast Claims Processing",description:"Our streamlined system ensures quick approval and payment of valid claims."},{icon:"fa-solid fa-user-doctor",title:"Network of Specialists",description:"Access to a wide network of qualified healthcare professionals."}];testimonials=[{quote:"MedInsurance helped me get the treatment I needed without worrying about the costs. Their customer service was exceptional throughout my recovery.",author:"Sarah Johnson",role:"Customer since 2021"},{quote:"I've never had such a smooth experience with insurance claims. The online portal makes everything so easy to manage.",author:"Michael Chen",role:"Customer since 2020"},{quote:"As a family of five, healthcare costs were always a concern. MedInsurance provided us with affordable coverage that meets all our needs.",author:"Emma Rodriguez",role:"Customer since 2022"}];faqs=[{question:"How quickly can I get coverage?",answer:"Most policies can be activated within 24-48 hours after application approval. Emergency coverage options are also available for immediate needs.",open:!1},{question:"What does the basic policy cover?",answer:"Our basic policy includes hospital stays, emergency services, preventive care, and prescription medications. Detailed coverage information is available in your policy documents.",open:!1},{question:"How do I submit a claim?",answer:"Claims can be submitted through our online portal, mobile app, or by contacting our customer service team. We typically process claims within 5-7 business days.",open:!1},{question:"Can I add family members to my policy?",answer:"Yes, you can add dependents to your policy including spouse and children. Family policies offer comprehensive coverage at discounted rates.",open:!1}];ngOnInit(){this.isAuthenticated=this.authService.isAuthenticated(),this.loadPolicies(),this.isAuthenticated&&this.loadUserSubscription()}loadPolicies(){this.isLoading=!0,this.policyService.getActivePolicies().subscribe({next:o=>{this.policies=o.filter(i=>i.status==="ACTIVE"),this.totalSlides=this.policies.length,this.isLoading=!1},error:o=>{console.error("Error loading policies:",o),this.isLoading=!1}})}loadUserSubscription(){this.subscriptionService.getMySubscription().subscribe({next:o=>{this.currentUserSubscription=o},error:o=>{console.error("Error loading user subscription:",o)}})}nextSlide(){this.activeSlideIndex<this.totalSlides-1&&(this.activeSlideIndex++,this.scrollSlider())}prevSlide(){this.activeSlideIndex>0&&(this.activeSlideIndex--,this.scrollSlider())}setSlide(o){o>=0&&o<this.totalSlides&&(this.activeSlideIndex=o,this.scrollSlider())}scrollSlider(){if(this.policiesSlider&&this.policiesSlider.nativeElement){let o=this.policiesSlider.nativeElement.offsetWidth,i=this.activeSlideIndex*o;this.policiesSlider.nativeElement.scrollTo({left:i,behavior:"smooth"})}}subscribeToPolicy(o){if(!this.isAuthenticated){u.default.fire({title:"Sign In Required",text:"You need to sign in to subscribe to a policy",icon:"info",showCancelButton:!0,confirmButtonText:"Sign In",cancelButtonText:"Cancel"}).then(i=>{i.isConfirmed&&(window.location.href="/login")});return}if(this.currentUserSubscription){if(this.currentUserSubscription.policyId==o){u.default.fire({title:"Already Subscribed",text:"You are already subscribed to this policy",icon:"info"});return}u.default.fire({title:"Upgrade Subscription",text:"Would you like to upgrade your current subscription to this policy?",icon:"question",showCancelButton:!0,confirmButtonText:"Yes, Upgrade",cancelButtonText:"Cancel"}).then(i=>{i.isConfirmed&&this.upgradeSubscription(o)})}else this.createNewSubscription(o)}createNewSubscription(o){this.subscriptionService.subscribeToPolicy(o).subscribe({next:i=>{u.default.fire({title:"Success!",text:"You have successfully subscribed to the policy",icon:"success"}),this.currentUserSubscription=i},error:i=>{u.default.fire({title:"Error",text:"There was a problem subscribing to the policy. Please try again later.",icon:"error"}),console.error("Error subscribing to policy:",i)}})}upgradeSubscription(o){this.subscriptionService.upgradeSubscription(o).subscribe({next:i=>{u.default.fire({title:"Success!",text:"Your subscription has been upgraded successfully",icon:"success"}),this.currentUserSubscription=i},error:i=>{u.default.fire({title:"Error",text:"There was a problem upgrading your subscription. Please try again later.",icon:"error"}),console.error("Error upgrading subscription:",i)}})}toggleFaq(o){this.faqs[o].open=!this.faqs[o].open}onSubmit(o){o.valid&&(console.log("Form submitted:",o.value),o.reset(),u.default.fire({title:"Message Sent!",text:"Thank you for your message! We will get back to you soon.",icon:"success"}))}isPolicyActive(o){return this.currentUserSubscription!==null&&this.currentUserSubscription.policyId===o&&this.currentUserSubscription.status==="ACTIVE"}static \u0275fac=function(i){return new(i||r)(E(K),E(ee),E(L))};static \u0275cmp=H({type:r,selectors:[["app-home"]],viewQuery:function(i,a){if(i&1&&V(ae,5),i&2){let d;A(d=N())&&(a.policiesSlider=d.first)}},decls:157,vars:11,consts:[["contactForm","ngForm"],["policiesSlider",""],[1,"bg-gradient-to-r","from-indigo-500","to-blue-600","text-white"],[1,"container","mx-auto","px-4","py-16","md:py-24"],[1,"flex","flex-col","md:flex-row","items-center"],[1,"md:w-1/2","mb-10","md:mb-0"],[1,"text-4xl","md:text-5xl","font-bold","mb-4"],[1,"text-xl","mb-8","text-blue-100"],[1,"flex","flex-col","sm:flex-row","gap-4"],["href","#policies",1,"bg-white","text-indigo-600","hover:bg-blue-50","font-semibold","py-3","px-6","rounded-lg","text-center","transform","transition","hover:scale-105"],["href","#contact",1,"bg-transparent","hover:bg-indigo-700","border-2","border-white","text-white","font-semibold","py-3","px-6","rounded-lg","text-center","transform","transition","hover:scale-105"],[1,"md:w-1/2"],["alt","Healthcare illustration",1,"w-full","max-w-lg","mx-auto",3,"src"],[1,"bg-white","py-12"],[1,"container","mx-auto","px-4"],[1,"grid","grid-cols-1","md:grid-cols-3","gap-8","text-center"],[1,"p-6","bg-blue-50","rounded-lg"],[1,"text-4xl","font-bold","text-indigo-600","mb-2"],[1,"text-gray-700"],[1,"bg-gray-50","py-16"],[1,"text-center","mb-16"],[1,"text-3xl","font-bold","text-gray-900","mb-4"],[1,"text-xl","text-gray-600","max-w-2xl","mx-auto"],[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-4","gap-8"],["class","bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow",4,"ngFor","ngForOf"],["id","policies",1,"bg-white","py-16"],[1,"text-center","mb-12"],["class","flex justify-center py-12",4,"ngIf"],["class","relative overflow-hidden",4,"ngIf"],["class","text-center py-12",4,"ngIf"],[1,"bg-indigo-50","py-16"],[1,"grid","grid-cols-1","md:grid-cols-3","gap-8"],["class","bg-white p-8 rounded-lg shadow-md",4,"ngFor","ngForOf"],[1,"bg-white","py-16"],[1,"max-w-3xl","mx-auto"],["class","mb-4 border border-gray-200 rounded-lg overflow-hidden",4,"ngFor","ngForOf"],[1,"bg-indigo-600","py-16","text-white"],[1,"container","mx-auto","px-4","text-center"],[1,"text-3xl","font-bold","mb-6"],[1,"text-xl","text-indigo-100","max-w-2xl","mx-auto","mb-8"],[1,"flex","flex-col","sm:flex-row","justify-center","gap-4"],["href","#policies",1,"bg-white","text-indigo-600","hover:bg-blue-50","font-semibold","py-3","px-8","rounded-lg","text-center","transform","transition","hover:scale-105"],["href","#contact","id","contact",1,"bg-transparent","hover:bg-indigo-700","border-2","border-white","font-semibold","py-3","px-8","rounded-lg","text-center","transform","transition","hover:scale-105"],[1,"max-w-4xl","mx-auto"],[1,"text-xl","text-gray-600"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-12"],[1,"space-y-6",3,"ngSubmit"],["for","name",1,"block","text-sm","font-medium","text-gray-700","mb-1"],["type","text","id","name","name","name","ngModel","","required","",1,"w-full","px-4","py-2","border","border-gray-300","rounded-lg","focus:ring-indigo-500","focus:border-indigo-500"],["for","email",1,"block","text-sm","font-medium","text-gray-700","mb-1"],["type","email","id","email","name","email","ngModel","","required","",1,"w-full","px-4","py-2","border","border-gray-300","rounded-lg","focus:ring-indigo-500","focus:border-indigo-500"],["for","phone",1,"block","text-sm","font-medium","text-gray-700","mb-1"],["type","tel","id","phone","name","phone","ngModel","",1,"w-full","px-4","py-2","border","border-gray-300","rounded-lg","focus:ring-indigo-500","focus:border-indigo-500"],["for","message",1,"block","text-sm","font-medium","text-gray-700","mb-1"],["id","message","name","message","rows","4","ngModel","","required","",1,"w-full","px-4","py-2","border","border-gray-300","rounded-lg","focus:ring-indigo-500","focus:border-indigo-500"],["type","submit",1,"w-full","bg-indigo-600","hover:bg-indigo-700","text-white","font-semibold","py-3","px-6","rounded-lg","transition",3,"disabled","ngClass"],[1,"bg-gray-50","p-8","rounded-lg"],[1,"text-xl","font-semibold","text-gray-900","mb-6"],[1,"space-y-6"],[1,"flex","items-start"],[1,"text-indigo-600","text-xl","mr-4"],[1,"fas","fa-map-marker-alt"],[1,"font-medium","text-gray-900"],[1,"fas","fa-phone-alt"],[1,"fas","fa-envelope"],[1,"fas","fa-clock"],[1,"bg-white","p-6","rounded-lg","shadow-md","hover:shadow-lg","transition-shadow"],[1,"text-indigo-600","text-4xl","mb-4"],[1,"text-xl","font-semibold","mb-2","text-gray-800"],[1,"text-gray-600"],[1,"flex","justify-center","py-12"],[1,"loader"],[1,"relative","overflow-hidden"],[1,"flex","items-center","justify-between","mb-6"],[1,"bg-indigo-600","text-white","rounded-full","p-2","focus:outline-none",3,"click","disabled","ngClass"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"h-6","w-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M15 19l-7-7 7-7"],[1,"flex","space-x-2"],["class","w-3 h-3 rounded-full cursor-pointer",3,"ngClass","click",4,"ngFor","ngForOf"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M9 5l7 7-7 7"],[1,"flex","overflow-hidden","snap-x","snap-mandatory"],["class","min-w-full snap-start",4,"ngFor","ngForOf"],[1,"w-3","h-3","rounded-full","cursor-pointer",3,"click","ngClass"],[1,"min-w-full","snap-start"],[1,"bg-white","border","border-gray-200","rounded-xl","shadow-lg","overflow-hidden","max-w-2xl","mx-auto","transition-all","duration-300","transform","hover:scale-102"],[1,"bg-indigo-600","px-6","py-4","text-white"],[1,"text-2xl","font-bold"],[1,"p-6"],[1,"flex","justify-between","items-center","mb-6","pb-6","border-b","border-gray-100"],[1,"text-gray-600","mb-1"],[1,"text-3xl","font-bold","text-indigo-600"],[1,"bg-indigo-100","text-indigo-800","px-4","py-2","rounded-full","text-sm","font-semibold"],[1,"mb-8"],[1,"w-full","py-3","px-4","bg-indigo-600","hover:bg-indigo-700","text-white","font-semibold","rounded-lg","transition-colors",3,"click","disabled","ngClass"],[1,"text-center","py-12"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"h-16","w-16","mx-auto","text-gray-400","mb-4"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"],[1,"text-xl","font-semibold","text-gray-700","mb-2"],[1,"text-gray-500"],[1,"bg-white","p-8","rounded-lg","shadow-md"],[1,"fas","fa-quote-left"],[1,"text-gray-700","mb-6"],[1,"font-semibold","text-gray-900"],[1,"mb-4","border","border-gray-200","rounded-lg","overflow-hidden"],[1,"flex","justify-between","items-center","w-full","p-5","text-left","bg-white","hover:bg-gray-50","focus:outline-none",3,"click"],["fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"h-5","w-5","text-indigo-600","transition-transform","duration-200",3,"ngClass"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M19 9l-7 7-7-7"],["class","p-5 bg-gray-50 border-t border-gray-200",4,"ngIf"],[1,"p-5","bg-gray-50","border-t","border-gray-200"]],template:function(i,a){if(i&1){let d=h();s(0,"app-header"),t(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"h1",6),n(6,"Health Insurance "),s(7,"br"),n(8,"That Puts You First"),e(),t(9,"p",7),n(10,"Comprehensive medical coverage tailored to your health needs and budget."),e(),t(11,"div",8)(12,"a",9),n(13," View Our Policies "),e(),t(14,"a",10),n(15," Contact Us "),e()()(),t(16,"div",11),s(17,"img",12),e()()()(),t(18,"div",13)(19,"div",14)(20,"div",15)(21,"div",16)(22,"p",17),n(23,"99%"),e(),t(24,"p",18),n(25,"Customer Satisfaction"),e()(),t(26,"div",16)(27,"p",17),n(28,"15,000+"),e(),t(29,"p",18),n(30,"Healthcare Providers"),e()(),t(31,"div",16)(32,"p",17),n(33,"24/7"),e(),t(34,"p",18),n(35,"Customer Support"),e()()()()(),t(36,"div",19)(37,"div",14)(38,"div",20)(39,"h2",21),n(40,"Why Choose MedInsurance?"),e(),t(41,"p",22),n(42,"We provide reliable health coverage with exceptional service that puts your wellbeing first."),e()(),t(43,"div",23),g(44,me,7,4,"div",24),e()()(),t(45,"div",25)(46,"div",14)(47,"div",26)(48,"h2",21),n(49,"Our Insurance Policies"),e(),t(50,"p",22),n(51,"Choose the perfect policy that matches your healthcare needs and budget."),e()(),g(52,pe,2,0,"div",27)(53,fe,13,10,"div",28)(54,xe,7,0,"div",29),e()(),t(55,"div",30)(56,"div",14)(57,"div",20)(58,"h2",21),n(59,"What Our Customers Say"),e(),t(60,"p",22),n(61,"Don't just take our word for it - hear from our satisfied members."),e()(),t(62,"div",31),g(63,be,10,3,"div",32),e()()(),t(64,"div",33)(65,"div",14)(66,"div",20)(67,"h2",21),n(68,"Frequently Asked Questions"),e(),t(69,"p",22),n(70,"Find answers to common questions about our insurance policies."),e()(),t(71,"div",34),g(72,he,7,5,"div",35),e()()(),t(73,"div",36)(74,"div",37)(75,"h2",38),n(76,"Ready to get covered?"),e(),t(77,"p",39),n(78,"Join thousands of satisfied customers who trust MedInsurance for their healthcare needs."),e(),t(79,"div",40)(80,"a",41),n(81," View Policies "),e(),t(82,"a",42),n(83," Contact Us "),e()()()(),t(84,"div",33)(85,"div",14)(86,"div",43)(87,"div",26)(88,"h2",21),n(89,"Get in Touch"),e(),t(90,"p",44),n(91,"Have questions? Our team is here to help you find the perfect insurance solution."),e()(),t(92,"div",45)(93,"div")(94,"form",46,0),b("ngSubmit",function(){f(d);let oe=T(95);return x(a.onSubmit(oe))}),t(96,"div")(97,"label",47),n(98,"Full Name"),e(),s(99,"input",48),e(),t(100,"div")(101,"label",49),n(102,"Email Address"),e(),s(103,"input",50),e(),t(104,"div")(105,"label",51),n(106,"Phone Number"),e(),s(107,"input",52),e(),t(108,"div")(109,"label",53),n(110,"Message"),e(),s(111,"textarea",54),e(),t(112,"button",55),n(113," Send Message "),e()()(),t(114,"div",56)(115,"h3",57),n(116,"Contact Information"),e(),t(117,"div",58)(118,"div",59)(119,"div",60),s(120,"i",61),e(),t(121,"div")(122,"p",62),n(123,"Main Office"),e(),t(124,"p",18),n(125,"123 Insurance Avenue, Suite 500"),s(126,"br"),n(127,"New York, NY 10001"),e()()(),t(128,"div",59)(129,"div",60),s(130,"i",63),e(),t(131,"div")(132,"p",62),n(133,"Phone"),e(),t(134,"p",18),n(135,"(800) 123-4567"),e()()(),t(136,"div",59)(137,"div",60),s(138,"i",64),e(),t(139,"div")(140,"p",62),n(141,"Email"),e(),t(142,"p",18),n(143,"support@medinsurance.com"),e()()(),t(144,"div",59)(145,"div",60),s(146,"i",65),e(),t(147,"div")(148,"p",62),n(149,"Hours"),e(),t(150,"p",18),n(151,"Monday - Friday: 8am - 8pm"),s(152,"br"),n(153,"Saturday: 9am - 5pm"),s(154,"br"),n(155,"Sunday: Closed"),e()()()()()()()()(),s(156,"app-footer")}if(i&2){let d=T(95);l(17),c("src","assets/image.png",F),l(27),c("ngForOf",a.features),l(8),c("ngIf",a.isLoading),l(),c("ngIf",!a.isLoading&&a.policies.length>0),l(),c("ngIf",!a.isLoading&&a.policies.length===0),l(9),c("ngForOf",a.testimonials),l(9),c("ngForOf",a.faqs),l(40),c("disabled",!d.valid)("ngClass",S(9,se,!d.valid))}},dependencies:[P,U,D,R,w,J,$,B,W,Y,Q,z,G,X,Z],styles:['@import"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";.hero-image-fallback[_ngcontent-%COMP%]{background-color:#4f46e5;height:300px;display:flex;align-items:center;justify-content:center;border-radius:8px;color:#fff;font-size:24px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.animate-fade-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeIn .5s ease-in}.slider-dot[_ngcontent-%COMP%]{transition:all .3s ease}.slider-dot[_ngcontent-%COMP%]:hover{transform:scale(1.3);background-color:#4f46e5}.loader[_ngcontent-%COMP%]{border:3px solid #f3f3f3;border-radius:50%;border-top:3px solid #4f46e5;width:40px;height:40px;animation:_ngcontent-%COMP%_spin 1s linear infinite;margin:0 auto}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.hover\\:scale-102[_ngcontent-%COMP%]:hover{transform:scale(1.02);box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a}.snap-x[_ngcontent-%COMP%]{scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}.snap-start[_ngcontent-%COMP%]{scroll-snap-align:start}.snap-mandatory[_ngcontent-%COMP%]{--snap-mandatory: mandatory}[_ngcontent-%COMP%]::-webkit-scrollbar{width:8px;height:8px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#4f46e5;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#4338ca}input.ng-invalid.ng-touched[_ngcontent-%COMP%], textarea.ng-invalid.ng-touched[_ngcontent-%COMP%]{border-color:#ef4444;box-shadow:0 0 0 1px #ef4444}input[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus{border-color:#4f46e5;box-shadow:0 0 0 3px #4f46e54d;outline:none}html[_ngcontent-%COMP%]{scroll-behavior:smooth}button[_ngcontent-%COMP%]{transition:all .3s ease}button[_ngcontent-%COMP%]:focus{outline:none}@media (max-width: 768px){.container[_ngcontent-%COMP%]{padding-left:1rem;padding-right:1rem}h1[_ngcontent-%COMP%]{font-size:2.25rem!important}h2[_ngcontent-%COMP%]{font-size:1.75rem!important}.policies-slider[_ngcontent-%COMP%]{padding:0 1rem}.policy-card[_ngcontent-%COMP%]{max-width:90%}}.overflow-x-auto[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch}.no-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.no-scrollbar[_ngcontent-%COMP%]{-ms-overflow-style:none;scrollbar-width:none}']})};var ye=[{path:"",component:I}],O=class r{static \u0275fac=function(i){return new(i||r)};static \u0275mod=k({type:r});static \u0275inj=_({imports:[w.forChild(ye),w]})};var ne=class r{static \u0275fac=function(i){return new(i||r)};static \u0275mod=k({type:r});static \u0275inj=_({imports:[P,O]})};export{ne as HomeModule};
