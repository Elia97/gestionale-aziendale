<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    // Mostra la lista di tutti i clienti
    public function index(): JsonResponse
    {
        $customers = Customer::withCount(relations: 'orders')
            ->withSum(relation: 'orders as total_spent', column: 'total')
            ->get(columns: ['id', 'name', 'email', 'phone', 'address', 'created_at']);

        return response()->json(data: $customers);
    }

    // Mostra un singolo cliente
    public function show(int $id): JsonResponse
    {
        $customer = Customer::find(id: $id);

        if (! $customer) {
            return response()->json(data: ['message' => 'Customer not found'], status: 404);
        }

        return response()->json(data: $customer);
    }

    // Crea un nuovo cliente
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(rules: [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:customers,email',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $customer = Customer::create(attributes: $data);

        return response()->json(data: $customer, status: 201);
    }

    // Aggiorna un cliente esistente
    public function update(Request $request, int $id): JsonResponse
    {
        $customer = Customer::find(id: $id);

        if (! $customer) {
            return response()->json(data: ['message' => 'Customer not found'], status: 404);
        }

        $data = $request->validate(rules: [
            'name'    => 'sometimes|required|string|max:255',
            'email'   => 'sometimes|required|email|unique:customers,email,' . $id,
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $customer->update($data);

        return response()->json(data: $customer);
    }

    // Elimina un cliente
    public function destroy(int $id): JsonResponse
    {
        $customer = Customer::find(id: $id);

        if (! $customer) {
            return response()->json(data: ['message' => 'Customer not found'], status: 404);
        }

        $customer->delete();

        return response()->json(data: ['message' => 'Customer deleted']);
    }
}
