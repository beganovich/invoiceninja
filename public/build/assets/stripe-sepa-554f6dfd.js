var r=Object.defineProperty;var c=(a,e,t)=>e in a?r(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var o=(a,e,t)=>(c(a,typeof e!="symbol"?e+"":e,t),t);import{w as s}from"./wait-8f4ae121.js";/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */class i{constructor(e,t){o(this,"setupStripe",()=>{this.stripeConnect?this.stripe=Stripe(this.key,{stripeAccount:this.stripeConnect}):this.stripe=Stripe(this.key);const e=this.stripe.elements();var t={base:{color:"#32325d",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#aab7c4"},":-webkit-autofill":{color:"#32325d"}},invalid:{color:"#fa755a",iconColor:"#fa755a",":-webkit-autofill":{color:"#fa755a"}}},n={style:t,supportedCountries:["SEPA"],placeholderCountry:document.querySelector('meta[name="country"]').content};return this.iban=e.create("iban",n),this.iban.mount("#sepa-iban"),document.getElementById("sepa-name").value=document.querySelector("meta[name=client_name]").content,document.getElementById("sepa-email-address").value=document.querySelector("meta[name=client_email]").content,this});o(this,"handle",()=>{let e=document.getElementById("errors");Array.from(document.getElementsByClassName("toggle-payment-with-token")).forEach(t=>t.addEventListener("click",n=>{document.getElementById("stripe--payment-container").classList.add("hidden"),document.getElementById("save-card--container").style.display="none",document.querySelector("input[name=token]").value=n.target.dataset.token})),document.getElementById("toggle-payment-with-new-bank-account").addEventListener("click",t=>{document.getElementById("stripe--payment-container").classList.remove("hidden"),document.getElementById("save-card--container").style.display="grid",document.querySelector("input[name=token]").value=""}),document.getElementById("pay-now").addEventListener("click",t=>{if(document.querySelector("input[name=token]").value.length!==0)document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmSepaDebitPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:document.querySelector("input[name=token]").value}).then(n=>n.error?this.handleFailure(n.error.message):this.handleSuccess(n));else{if(document.getElementById("sepa-name").value===""){document.getElementById("sepa-name").focus(),e.textContent=document.querySelector("meta[name=translation-name-required]").content,e.hidden=!1;return}if(document.getElementById("sepa-email-address").value===""){document.getElementById("sepa-email-address").focus(),e.textContent=document.querySelector("meta[name=translation-email-required]").content,e.hidden=!1;return}if(!document.getElementById("sepa-mandate-acceptance").checked){e.textContent=document.querySelector("meta[name=translation-terms-required]").content,e.hidden=!1;return}document.getElementById("pay-now").disabled=!0,document.querySelector("#pay-now > svg").classList.remove("hidden"),document.querySelector("#pay-now > span").classList.add("hidden"),this.stripe.confirmSepaDebitPayment(document.querySelector("meta[name=pi-client-secret").content,{payment_method:{sepa_debit:this.iban,billing_details:{name:document.getElementById("sepa-name").value,email:document.getElementById("sepa-email-address").value}}}).then(n=>n.error?this.handleFailure(n.error.message):this.handleSuccess(n))}})});this.key=e,this.errors=document.getElementById("errors"),this.stripeConnect=t}handleSuccess(e){document.querySelector('input[name="gateway_response"]').value=JSON.stringify(e.paymentIntent);let t=document.querySelector('input[name="token-billing-checkbox"]:checked');t&&(document.querySelector('input[name="store_card"]').value=t.value),document.querySelector("input[name=token]").value.length>2&&(document.querySelector('input[name="store_card"]').value=!1),document.getElementById("server-response").submit()}handleFailure(e){let t=document.getElementById("errors");t.textContent="",t.textContent=e,t.hidden=!1,document.getElementById("pay-now").disabled=!1,document.querySelector("#pay-now > svg").classList.add("hidden"),document.querySelector("#pay-now > span").classList.remove("hidden")}handleSuccess(e){document.querySelector('input[name="gateway_response"]').value=JSON.stringify(e.paymentIntent);let t=document.querySelector('input[name="token-billing-checkbox"]:checked');t&&(document.querySelector('input[name="store_card"]').value=t.value),document.getElementById("server-response").submit()}}s("#stripe-sepa-payment").then(()=>{var t,n;const a=((t=document.querySelector('meta[name="stripe-publishable-key"]'))==null?void 0:t.content)??"",e=((n=document.querySelector('meta[name="stripe-account-id"]'))==null?void 0:n.content)??"";new i(a,e).setupStripe().handle()});