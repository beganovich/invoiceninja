var c=Object.defineProperty;var s=(n,t,e)=>t in n?c(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(s(n,typeof t!="symbol"?t+"":t,e),e);import{w as a}from"./wait-d71d9fed.js";/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license 
 */class i{constructor(t,e){r(this,"setupStripe",()=>(this.stripeConnect?this.stripe=Stripe(this.key,{stripeAccount:this.stripeConnect}):this.stripe=Stripe(this.key),this));r(this,"handle",()=>{document.getElementById("pay-now").addEventListener("click",t=>{let e=document.getElementById("errors");if(!document.getElementById("bancontact-name").value){e.textContent=document.querySelector("meta[name=translation-name-required]").content,e.hidden=!1,console.log("name");return}document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmBancontactPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:{billing_details:{name:document.getElementById("bancontact-name").value}},return_url:document.querySelector('meta[name="return-url"]').content})})});this.key=t,this.errors=document.getElementById("errors"),this.stripeConnect=e}}a("#stripe-bancontact-payment").then(()=>{var e,o;const n=((e=document.querySelector('meta[name="stripe-publishable-key"]'))==null?void 0:e.content)??"",t=((o=document.querySelector('meta[name="stripe-account-id"]'))==null?void 0:o.content)??"";new i(n,t).setupStripe().handle()});
