<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Gli ordini sono distribuiti negli ultimi 3 mesi
        $startDate = Carbon::now()->subMonths(3);
        $endDate = Carbon::now();

        // Creiamo 80 ordini con date realistiche
        for ($i = 0; $i < 80; $i++) {
            // Data di creazione dell'ordine
            $orderCreatedAt = fake()->dateTimeBetween($startDate, $endDate);

            // Creiamo l'ordine con la factory ma impostiamo date personalizzate
            $order = Order::factory()->make()->toArray();
            $order['created_at'] = $orderCreatedAt;
            $order['updated_at'] = fake()->dateTimeBetween($orderCreatedAt, 'now');

            $order = Order::create($order);

            $total = 0;

            // Numero casuale di articoli nell'ordine (da 1 a 5)
            $itemsCount = rand(1, 5);

            for ($j = 0; $j < $itemsCount; $j++) {
                $product = Product::inRandomOrder()->first();

                // Usiamo il prezzo reale del prodotto
                $price = $product->price;

                // Quantità casuale da 1 a 10
                $quantity = rand(1, 10);

                // Data di creazione dell'order item (stesso giorno dell'ordine o poco dopo)
                $itemCreatedAt = fake()->dateTimeBetween(
                    $orderCreatedAt,
                    Carbon::parse($orderCreatedAt)->addDays(1)
                );

                // Creiamo l'order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                    'created_at' => $itemCreatedAt,
                    'updated_at' => fake()->dateTimeBetween($itemCreatedAt, 'now'),
                ]);

                // Aggiorniamo il totale
                $total += $price * $quantity;
            }

            // Aggiorniamo il campo total dell'ordine con il calcolo reale
            $order->update(['total' => $total]);
        }
    }
}
