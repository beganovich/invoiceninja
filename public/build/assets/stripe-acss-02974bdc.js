var c=Object.defineProperty;var d=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(d(o,typeof e!="symbol"?e+"":e,t),t);import{i,w as m}from"./wait-8f4ae121.js";/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license 
 */class l{constructor(e,t){a(this,"setupStripe",()=>(this.stripeConnect?this.stripe=Stripe(this.key,{stripeAccount:this.stripeConnect}):this.stripe=Stripe(this.key),this));a(this,"handle",()=>{Array.from(document.getElementsByClassName("toggle-payment-with-token")).forEach(e=>e.addEventListener("click",t=>{document.querySelector("input[name=token]").value=t.target.dataset.token,console.log(t.target.dataset.token)})),document.getElementById("toggle-payment-with-new-account")&&document.getElementById("toggle-payment-with-new-account").addEventListener("click",e=>{document.getElementById("save-card--container").style.display="grid",document.querySelector("input[name=token]").value=""}),document.getElementById("pay-now-with-token")?document.getElementById("pay-now-with-token").addEventListener("click",e=>{document.querySelector("input[name=token]").value,document.getElementById("pay-now-with-token").disabled=!0,document.querySelector("#pay-now-with-token > svg").classList.remove("hidden"),document.querySelector("#pay-now-with-token > span").classList.add("hidden"),document.getElementById("server-response").submit()}):document.getElementById("pay-now").addEventListener("click",e=>{let t=document.querySelector('input[name="token-billing-checkbox"]:checked');t&&(document.querySelector('input[name="store_card"]').value=t.value);let n=document.getElementById("errors");if(n.textContent="",n.hidden=!0,document.getElementById("acss-name").value===""){document.getElementById("acss-name").focus(),n.textContent=document.querySelector("meta[name=translation-name-required]").content,n.hidden=!1;return}if(document.getElementById("acss-email-address").value===""){document.getElementById("acss-email-address").focus(),n.textContent=document.querySelector("meta[name=translation-email-required]").content,n.hidden=!1;return}document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmAcssDebitPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:{billing_details:{name:document.getElementById("acss-name").value,email:document.getElementById("acss-email-address").value}}}).then(s=>s.error?this.handleFailure(s.error.message):this.handleSuccess(s))})});this.key=e,this.errors=document.getElementById("errors"),this.stripeConnect=t}handleSuccess(e){document.querySelector('input[name="gateway_response"]').value=JSON.stringify(e.paymentIntent),document.getElementById("server-response").submit()}handleFailure(e){let t=document.getElementById("errors");t.textContent="",t.textContent=e,t.hidden=!1,document.getElementById("pay-now").disabled=!1,document.querySelector("#pay-now > svg").classList.add("hidden"),document.querySelector("#pay-now > span").classList.remove("hidden")}}function r(){var n,s;const o=((n=document.querySelector('meta[name="stripe-publishable-key"]'))==null?void 0:n.content)??"",e=((s=document.querySelector('meta[name="stripe-account-id"]'))==null?void 0:s.content)??"";new l(o,e).setupStripe().handle();const t=document.querySelector('input[name="payment-type"]');t&&t.click()}i()?r():m("#stripe-acss-payment").then(()=>r());