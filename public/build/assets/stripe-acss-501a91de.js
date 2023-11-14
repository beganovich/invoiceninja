var d=Object.defineProperty;var c=(n,t,e)=>t in n?d(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(c(n,typeof t!="symbol"?t+"":t,e),e);/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license 
 */class i{constructor(t,e){r(this,"setupStripe",()=>(this.stripeConnect?this.stripe=Stripe(this.key,{stripeAccount:this.stripeConnect}):this.stripe=Stripe(this.key),this));r(this,"handle",()=>{document.getElementById("pay-now").addEventListener("click",t=>{let e=document.getElementById("errors");if(document.getElementById("acss-name").value===""){document.getElementById("acss-name").focus(),e.textContent=document.querySelector("meta[name=translation-name-required]").content,e.hidden=!1;return}if(document.getElementById("acss-email-address").value===""){document.getElementById("acss-email-address").focus(),e.textContent=document.querySelector("meta[name=translation-email-required]").content,e.hidden=!1;return}document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmAcssDebitPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:{billing_details:{name:document.getElementById("acss-name").value,email:document.getElementById("acss-email-address").value}}}).then(s=>s.error?this.handleFailure(s.error.message):this.handleSuccess(s))})});this.key=t,this.errors=document.getElementById("errors"),this.stripeConnect=e}handleSuccess(t){document.querySelector('input[name="gateway_response"]').value=JSON.stringify(t.paymentIntent),document.getElementById("server-response").submit()}handleFailure(t){let e=document.getElementById("errors");e.textContent="",e.textContent=t,e.hidden=!1,document.getElementById("pay-now").disabled=!1,document.querySelector("#pay-now > svg").classList.add("hidden"),document.querySelector("#pay-now > span").classList.remove("hidden")}}var a;const m=((a=document.querySelector('meta[name="stripe-publishable-key"]'))==null?void 0:a.content)??"";var o;const l=((o=document.querySelector('meta[name="stripe-account-id"]'))==null?void 0:o.content)??"";new i(m,l).setupStripe().handle();