<div class="mt-4">
    <form wire:submit="handleSubmit">
        <div>
            <label for="name">
                Your name (example)
                <input type="text" wire:model="name" class="block w-full rounded-none rounded-l-md border-gray-300 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700" placeholder="">
            </label>
        </div>

        <button>Next</button>
    </form>
</div>
