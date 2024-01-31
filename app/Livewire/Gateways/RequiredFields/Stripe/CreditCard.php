<?php

namespace App\Livewire\Gateways\RequiredFields\Stripe;

use Livewire\Component;

class CreditCard extends Component
{
    public string $name = '';

    public function handleSubmit()
    {
        // This is where you can update user info.
        // .. and don't forget to dispatch event to indicate that checkout flow can go thru.

        $this->dispatch('handleBeforePaymentEvents');
    }

    public function render(): \Illuminate\View\View
    {
        return view('portal.ninja2020.gateways.stripe.credit_card.rff');
    }
}
