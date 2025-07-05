<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Creiamo 50 ordini
        for ($i = 0; $i < 50; $i++) {
            // Creiamo l'ordine con total inizialmente a 0
            $order = Order::create([
                'customer_id' => Customer::inRandomOrder()->value('id'),
                'user_id' => User::where('role', 'operator')->inRandomOrder()->value('id'),
                'status' => 'pending',
                'total' => 0,
            ]);

            $total = 0;

            // Numero casuale di articoli nell'ordine
            $itemsCount = rand(1, 5);

            for ($j = 0; $j < $itemsCount; $j++) {
                $product = Product::inRandomOrder()->first();

                // Usiamo il prezzo reale del prodotto
                $price = $product->price;

                // Quantità casuale
                $quantity = rand(1, 10);

                // Creiamo l'order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);

                // Aggiorniamo il totale
                $total += $price * $quantity;
            }

            // Aggiorniamo il campo total dell'ordine
            $order->update(['total' => $total]);
        }
    }
}
