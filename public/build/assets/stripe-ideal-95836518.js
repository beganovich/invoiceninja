var s=Object.defineProperty;var a=(n,t,e)=>t in n?s(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(a(n,typeof t!="symbol"?t+"":t,e),e);import{i as l,w as c}from"./wait-8f4ae121.js";/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license 
 */class d{constructor(t,e){r(this,"setupStripe",()=>{this.stripeConnect?this.stripe=Stripe(this.key,{stripeAccount:this.stripeConnect}):this.stripe=Stripe(this.key);let t=this.stripe.elements();var e={style:{base:{padding:"10px 12px",color:"#32325d",fontSize:"16px","::placeholder":{color:"#aab7c4"}}}};return this.ideal=t.create("idealBank",e),this.ideal.mount("#ideal-bank-element"),this});r(this,"handle",()=>{document.getElementById("pay-now").addEventListener("click",t=>{let e=document.getElementById("errors");if(!document.getElementById("ideal-name").value){e.textContent=document.querySelector("meta[name=translation-name-required]").content,e.hidden=!1,console.log("name");return}document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmIdealPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:{ideal:this.ideal,billing_details:{name:document.getElementById("ideal-name").value}},return_url:document.querySelector('meta[name="return-url"]').content})})});this.key=t,this.errors=document.getElementById("errors"),this.stripeConnect=e}}function o(){var e,i;const n=((e=document.querySelector('meta[name="stripe-publishable-key"]'))==null?void 0:e.content)??"",t=((i=document.querySelector('meta[name="stripe-account-id"]'))==null?void 0:i.content)??"";new d(n,t).setupStripe().handle()}l()?o():c("#stripe-ideal-payment").then(()=>o());