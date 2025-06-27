<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * Mostra tutti gli ordini.
     */
    public function index(): JsonResponse
    {
        $orders = Order::with(relations: ['customer', 'user', 'orderItems.product'])->get();

        return response()->json(data: $orders);
    }

    /**
     * Crea un nuovo ordine.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate(rules: [
            'customer_id' => 'required|exists:customers,id',
            'user_id'     => 'required|exists:users,id',
            'status'      => 'required|string',
            'total'       => 'required|numeric|min:0',
        ]);

        $order = Order::create(attributes: $validated);

        return response()->json(data: $order, status: 201);
    }

    /**
     * Mostra il dettaglio di un ordine specifico.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load(relations: ['customer', 'user', 'orderItems.product']);

        return response()->json(data: $order);
    }

    /**
     * Aggiorna un ordine esistente.
     */
    public function update(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate(rules: [
            'customer_id' => 'sometimes|exists:customers,id',
            'user_id'     => 'sometimes|exists:users,id',
            'status'      => 'sometimes|string',
            'total'       => 'sometimes|numeric|min:0',
        ]);

        $order->update(attributes: $validated);

        return response()->json(data: $order);
    }

    /**
     * Elimina un ordine.
     */
    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json(data: ['message' => 'Ordine eliminato con successo']);
    }
}
