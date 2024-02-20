<?php

/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

namespace App\Livewire\BillingPortal;

use Livewire\Component;
use Livewire\Attributes\Lazy;
use App\Services\ClientPortal\InstantPayment;

#[Lazy]
class Submit extends Component
{
    public array $context;

    public function mount()
    {

        // $request = new \Illuminate\Http\Request([
        //     'sidebar' => 'hidden',
        //     'hash' => $this->context['hash'],
        //     'action' => 'payment',
        //     'invoices' => [
        //         $this->context['form']['invoice_hashed_id'],
        //     ],
        //     'payable_invoices' => [
        //         [
        //         'amount' => $this->context['form']['payable_amount'],
        //         'invoice_id' => $this->context['form']['invoice_hashed_id'],
        //         ],
        //     ],
        //     'company_gateway_id' => $this->context['form']['company_gateway_id'],
        //     'payment_method_id' => $this->context['form']['payment_method_id'],
        //     'contact_first_name' => $this->context['contact']['first_name'],
        //     'contact_last_name' => $this->context['contact']['last_name'],
        //     'contact_email' => $this->context['contact']['email'],
        // ]);
        
        // return redirect((new InstantPayment($request))->run());

        $this->dispatch('purchase.submit');
    }

    public function render()
    {
        
        return <<<'HTML'
            <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>    
        HTML;
    }
}