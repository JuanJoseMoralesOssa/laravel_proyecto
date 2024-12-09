<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Ramsey\Uuid\Guid\Guid;

class ProductVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            // productos con la categoria
            // 'products' => Product::with('category')->get(),
            'products' => Product::with('category')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $path = null;
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $path = Storage::url($imagePath);
        }

        $request['slug'] = $this->generateUniqueSlug($request['name']);
        $request['enabled'] = $request->enabled ?? true;
        // $request->user()->products()->create($validated);
        $product = new Product($request->all());
        $product['image'] = $path;
        $product->save();
        return redirect(route('products.crud'))->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        $product->load('category');
        // $product->category;

        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'enabled' => $product->enabled,
                'image' => $product->image ? $product->image : null,
                'slug' => $product->slug ? $product->slug : $this->generateUniqueSlug($product->name),
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name
                ] : null
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // $request = new Request($request->all());

        $path = $product->image;
        $imagePath = null;
        if ($request->hasFile('image') && $product->image) {
            Storage::delete($product->image);
            $imagePath = $request->file('image')->store('images', 'public');
            $path = Storage::url($imagePath);
        }
        // $request['slug'] = $this->generateUniqueSlug($request['name']);
        $request['slug'] = $product->slug;
        $request['image'] = $path;
        $request['enabled'] = $request->enabled ?? true;
        $product->update($request->all());
        $product->image = $path;
        $product->save();
        return redirect(route('products.crud'))->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $image_path = public_path() . $product->image;
        if (Storage::exists($image_path)) {
            Storage::delete($image_path);
        }
        $product->delete();
        return redirect(route('products.crud'))->with('success', 'Producto eliminado exitosamente.');
    }

    public function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }


    /**
     * Display a listing of the resource with its crud.
     */
    public function crud(): Response
    {
        return Inertia::render('Products/Crud', [
            // productos con la categoria
            // 'products' => Product::with('category')->get(),
            'products' => Product::with('category')->latest()->get()
        ]);
    }
}
