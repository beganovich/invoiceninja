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

use App\Libraries\MultiDB;
use App\Livewire\BillingPortal\Cart\Cart;
use App\Models\Subscription;
use Livewire\Attributes\Computed;
use Livewire\Attributes\On;
use Livewire\Component;

class Purchase extends Component
{
    public Subscription $subscription;

    public string $db;

    public array $request_data;

    public string $hash;

    public ?string $campaign;

    // 

    public int $step = 0;

    public array $steps = [
        Setup::class,
        Cart::class,
        Authentication::class,
        Example::class,
    ];

    public array $context = [];

    #[On('purchase.context')]
    public function handleContext(string $property, $value): self
    {
        $this->context[$property] = $value;

        // The following may not be needed, as we can pass arround $context.
        // cache()->set($this->hash, $this->context);

        return $this;
    }

    #[On('purchase.next')]
    public function handleNext(): void
    {
        if ($this->step < count($this->steps) - 1) {
            $this->step++;
        }
    }

    #[On('purchase.forward')]
    public function handleForward(string $component): void
    {
        $this->step = array_search($component, $this->steps);
    }

    #[Computed()]
    public function component(): string
    {
        return $this->steps[$this->step];
    }

    public function mount()
    {
        MultiDB::setDb($this->db);

        $this
            ->handleContext('hash', $this->hash)
            ->handleContext('quantity', 1)
            ->handleContext('request_data', $this->request_data)
            ->handleContext('campaign', $this->campaign);
    }

    public function render()
    {
        return view('billing-portal.v3.purchase');
    }
}