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

use App\Models\Subscription;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Purchase extends Component
{
    public Subscription $subscription;

    #[Layout('portal.ninja2020.layout.clean')]
    public function render(): \Illuminate\View\View
    {
        return view('billing-portal.v3.purchase');
    }
}
