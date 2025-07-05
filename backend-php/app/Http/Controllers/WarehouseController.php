<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;


class WarehouseController extends Controller
{
    // Lista tutti i magazzini con stock e prodotto
    public function index(): JsonResponse
    {
        $warehouses = Warehouse::with('stocks.product', 'stocks.warehouse')->get([
            'id',
            'name',
            'address',
            'created_at',
        ]);
        return response()->json(data: $warehouses);
    }

    // Mostra un singolo magazzino
    public function show(int $id): JsonResponse
    {
        $warehouse = Warehouse::with('stocks.product')->find(id: $id);

        if (! $warehouse) {
            return response()->json(data: ['message' => 'Warehouse not found'], status: 404);
        }

        return response()->json(data: $warehouse);
    }

    // Crea un nuovo magazzino
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(rules: [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
        ]);

        $warehouse = Warehouse::create(attributes: $data);

        // Carica le relazioni che ti servono, ad esempio stocks e prodotti
        $warehouse->load('stocks.product');

        return response()->json(data: $warehouse, status: 201);
    }

    // Aggiorna un magazzino esistente
    public function update(Request $request, int $id): JsonResponse
    {
        $warehouse = Warehouse::find(id: $id);

        if (! $warehouse) {
            return response()->json(data: ['message' => 'Warehouse not found'], status: 404);
        }

        $data = $request->validate(rules: [
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:500',
        ]);

        $warehouse->update($data);

        // Ricarica le relazioni aggiornate
        $warehouse->load('stocks.product');

        return response()->json(data: $warehouse);
    }

    // Elimina un magazzino
    public function destroy(int $id): JsonResponse
    {
        $warehouse = Warehouse::find(id: $id);

        if (! $warehouse) {
            return response()->json(data: ['message' => 'Warehouse not found'], status: 404);
        }

        $warehouse->delete();

        return response()->json(data: ['message' => 'Warehouse deleted']);
    }

    // Aggiorna le giacenze di un magazzino
    public function updateStocks(Request $request, Warehouse $warehouse): JsonResponse
    {
        $data = $request->validate([
            'stocks' => 'required|array',
            'stocks.*.product_id' => 'required|integer|exists:products,id',
            'stocks.*.quantity' => 'required|integer|min:0',
        ]);

        // carica stocks esistenti
        $warehouse->load('stocks');

        foreach ($data['stocks'] as $stockData) {
            $existingStock = $warehouse->stocks->firstWhere('product_id', $stockData['product_id']);

            if ($existingStock) {
                // aggiorna quantità
                $existingStock->update(['quantity' => $stockData['quantity']]);
            } else {
                // crea nuovo stock
                $warehouse->stocks()->create([
                    'product_id' => $stockData['product_id'],
                    'quantity' => $stockData['quantity'],
                ]);
            }
        }

        // ricarica con le relazioni aggiornate
        $warehouse->load('stocks.product');

        return response()->json($warehouse);
    }

    // Ottieni le giacenze di un magazzino
    public function getStocks(Warehouse $warehouse): JsonResponse
    {
        $warehouse->load('stocks.product');

        return response()->json([
            'warehouse' => $warehouse,
            'stocks' => $warehouse->stocks
        ]);
    }
}
