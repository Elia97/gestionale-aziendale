<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    // Lista tutti i prodotti
    public function index(): JsonResponse
    {
        $products = Product::all();
        return response()->json(data: $products);
    }

    // Mostra un singolo prodotto
    public function show(int $id): JsonResponse
    {
        $product = Product::find(id: $id);

        if (! $product) {
            return response()->json(data: ['message' => 'Product not found'], status: 404);
        }

        return response()->json(data: $product);
    }

    // Crea un nuovo prodotto
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(rules: [
            'code'        => 'required|string|max:50|unique:products,code',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
        ]);

        $product = Product::create(attributes: $data);

        return response()->json(data: $product, status: 201);
    }

    // Aggiorna un prodotto esistente
    public function update(Request $request, int $id): JsonResponse
    {
        $product = Product::find(id: $id);

        if (! $product) {
            return response()->json(data: ['message' => 'Product not found'], status: 404);
        }

        $data = $request->validate(rules: [
            'code'        => 'sometimes|required|string|max:50|unique:products,code,' . $id,
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|required|numeric|min:0',
        ]);

        $product->update($data);

        return response()->json(data: $product);
    }

    // Elimina un prodotto
    public function destroy(int $id): JsonResponse
    {
        $product = Product::find(id: $id);

        if (! $product) {
            return response()->json(data: ['message' => 'Product not found'], status: 404);
        }

        $product->delete();

        return response()->json(data: ['message' => 'Product deleted']);
    }
}
