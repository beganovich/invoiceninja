@extends('portal.ninja2020.layout.payments', ['gateway_title' => 'Credit card', 'card_title' => 'Credit card'])

@section('gateway_head')
    <meta name="instant-payment" content="yes" />
@endsection

@section('gateway_content')

    <form action="{{ route('client.payment_methods.store', ['method' => App\Models\GatewayType::CREDIT_CARD]) }}" method="post" id="server-response">
        @csrf
        <input type="hidden" name="gateway_response">
        <input type="hidden" name="company_gateway_id" value="{{ $gateway->getCompanyGatewayId() }}">
        <input type="hidden" name="payment_method_id" value="{{ $payment_method_id }}">
        <input type="hidden" name="browser_details">
        <input type="hidden" name="charge">
        <button type="submit" class="hidden" id="stub">Submit</button>
    </form>

    <div class="alert alert-failure mb-4" hidden id="errors"></div>

    <div id="powerboard-payment-container" class="w-full p-4" style="background-color: rgb(249, 249, 249);">
        <div id="widget" style="block"></div>
        <div id="widget-3dsecure"></div>
    </div>  
    
    @component('portal.ninja2020.gateways.includes.pay_now', ['id' => 'authorize-card'])
        {{ ctrans('texts.add_payment_method') }}
    @endcomponent

@endsection

@section('gateway_footer')

    <style>
        iframe {
            border: 0;
            width: 100%;
            height: 400px;
        }
    </style>

    <script src="{{ $widget_endpoint }}"></script>
    
    <script>
        var widget = new cba.HtmlWidget('#widget', '{{ $public_key }}', '{{ $gateway_id }}');
        widget.setEnv("{{ $environment }}");
        widget.useAutoResize();
        // widget.interceptSubmitForm('#server-response');
        widget.onFinishInsert('input[name="gateway_response"]', "payment_source");
        widget.load();
    
        widget.trigger('tab', function (data){

            console.log("tab Response", data);

            console.log(widget.isValidForm());

            let payNow = document.getElementById('pay-now');

            payNow.disabled = widget.isInvalidForm();

        });

        widget.trigger('submit_form',function (data){

            console.log("submit_form Response", data);

            console.log(widget.isValidForm());

            let payNow = document.getElementById('pay-now');

            payNow.disabled = widget.isInvalidForm();

        });

        widget.trigger('tab',function (data){

            console.log("tab Response", data);

            console.log(widget.isValidForm());

            let payNow = document.getElementById('pay-now');

            payNow.disabled = widget.isInvalidForm();

        });

        widget.on("systemError", function(data) {
            console.log("systemError Response", data);
        });

        widget.on("validationError", function(data) {
            console.log("validationError", data);
        });
        
        widget.on("finish", async function(data) {
            document.getElementById('errors').hidden = true;

            console.log("finish", data);
        
            try {
                const resource = await get3dsToken();
                console.log("3DS Token:", resource);

                console.log("pre canvas");
                console.log(resource._3ds.token);
                
                var canvas = new cba.Canvas3ds('#widget-3dsecure', resource._3ds.token);        
                canvas.load();
            
                let widget = document.getElementById('widget');
                widget.classList.add('hidden');


            } catch (error) {
                console.error("Error fetching 3DS Token:", error);
            }

            canvas.on("chargeAuthSuccess", function(data) {
                console.log(data);

                document.querySelector(
                    'input[name="browser_details"]'
                ).value = null;
                
                document.querySelector(
                    'input[name="charge"]'
                ).value = JSON.stringify(data);
                
                document.getElementById('server-response').submit();

            });

            canvas.on("chargeAuthReject", function(data) {
                console.log(data);

                document.getElementById('errors').textContent = `Sorry, your transaction could not be processed...`;
                document.getElementById('errors').hidden = false;

            });

            canvas.load();

        });

        widget.on("submit", async function (data){
            console.log("submit");
            console.log(data);        
            document.getElementById('errors').hidden = true;
        })

        widget.on('form_submit', function (data) {
            console.log("form_submit", data);
            console.log(data);
        });

        widget.on('submit', function (data) {
            console.log("submit", data);
            console.log(data);
        });

        widget.on('tab', function (data) {
            console.log("tab", data);
            console.log(data);
        });

        let payNow = document.getElementById('authorize-card');

        payNow.addEventListener('click', () => {
        
            payNow.disabled = true;
            payNow.querySelector('svg').classList.remove('hidden');
            payNow.querySelector('span').classList.add('hidden');
        
            document.getElementById('server-response').submit();

        });


        async function get3dsToken() {

            const browserDetails = {
                name: navigator.userAgent.substring(0, 100), // The full user agent string, which contains the browser name and version
                java_enabled: navigator.javaEnabled() ? "true" : "false", // Indicates if Java is enabled in the browser
                language: navigator.language || navigator.userLanguage, // The browser language
                screen_height: window.screen.height.toString(), // Screen height in pixels
                screen_width: window.screen.width.toString(), // Screen width in pixels
                time_zone: (new Date().getTimezoneOffset() * -1).toString(), // Timezone offset in minutes (negative for behind UTC)
                color_depth: window.screen.colorDepth.toString() // Color depth in bits per pixel
            };
            
            document.querySelector(
                'input[name="browser_details"]'
            ).value = JSON.stringify(browserDetails);

            const formData = JSON.stringify(Object.fromEntries(new FormData(document.getElementById("server-response"))));

            try {
                // Return the fetch promise to handle it externally
                const response = await fetch('{{ route('client.payment_methods.store', ['method' => App\Models\GatewayType::CREDIT_CARD]) }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "X-Requested-With": "XMLHttpRequest",
                        "Accept": 'application/json',
                        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: formData
                })

                    if (!response.ok) {

                        return await response.json().then(errorData => {      
                            throw new Error(errorData.message ?? 'Unknown error.');
                        });

                    }

                    return await response.json()

            }
            catch(error) {
                
                document.getElementById('errors').textContent = `Sorry, your card could not be authorized...\n\n${error.message}`;
                document.getElementById('errors').hidden = false;

                console.error('Fetch error:', error); // Log error for debugging
                throw error; //
           
            }
        }
        
        const first = document.querySelector('input[name="payment-type"]');

        if (first) {
            first.click();
        }

    </script> 

@endsection



