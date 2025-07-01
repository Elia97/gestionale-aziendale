<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * Mostra tutti gli ordini.
     */
    public function index(): JsonResponse
    {
        // Grazie agli accessor, i campi extra vengono aggiunti in automatico
        $orders = Order::with(['customer', 'user', 'orderItems.product'])->get();

        return response()->json($orders);
    }

    /**
     * Mostra il dettaglio di un ordine specifico.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load(['customer', 'user', 'orderItems.product']);

        return response()->json($order);
    }

    /**
     * Crea un nuovo ordine.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'user_id'     => 'required|exists:users,id',
            'status'      => 'required|string',
            'products'    => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity'   => 'required|integer|min:1',
        ]);

        // Calcola il totale
        $total = 0;
        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total += $product->price * $item['quantity'];
        }

        // Crea l'ordine
        $order = Order::create([
            'customer_id' => $validated['customer_id'],
            'user_id'     => $validated['user_id'],
            'status'      => $validated['status'],
            'total'       => $total,
        ]);

        // Crea gli orderItems
        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['product_id']);

            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $product->id,
                'quantity'   => $item['quantity'],
                'price'      => $product->price, // prezzo storico al momento dell'ordine
            ]);
        }

        $order->load(['customer', 'user', 'orderItems.product']);

        return response()->json($order, 201);
    }

    /**
     * Aggiorna un ordine esistente.
     */
    public function update(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'customer_id' => 'sometimes|exists:customers,id',
            'status'      => 'sometimes|string',
            'products'    => 'sometimes|array|min:1',
            'products.*.product_id' => 'required_with:products|exists:products,id',
            'products.*.quantity'   => 'required_with:products|integer|min:1',
        ]);

        // Aggiorna eventuali campi "piatti"
        $order->update($validated);

        // Se products presente, aggiorna gli orderItems e il totale
        if (isset($validated['products'])) {
            $order->orderItems()->delete();

            $total = 0;
            foreach ($validated['products'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $total += $product->price * $item['quantity'];

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ]);
            }

            $order->update(['total' => $total]);
        }

        $order->load(['customer', 'user', 'orderItems.product']);

        return response()->json($order);
    }

    /**
     * Elimina un ordine.
     */
    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json(['message' => 'Ordine eliminato con successo']);
    }
}
