<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Carga la categoria relacionada con el producto
        return Product::with('category')->paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
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
        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');
        return response()->json(['product' => $product], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {

        $path = $product->image;
        $imagePath = null;
        if ($request->hasFile('image') && $product->image) {
            Storage::delete($product->image);
            $imagePath = $request->file('image')->store('images', 'public');
            $path = Storage::url($imagePath);
        }


        $request['slug'] = $product->slug ? $product->slug : $this->generateUniqueSlug($product->name);
        $request['image'] = $path;
        $request['enabled'] = $request->enabled ?? true;
        $product->update($request->all());
        $product->image = $path;
        $product->save();
        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ], Response::HTTP_OK);
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
        return response()->json([
            'message' => 'Product deleted successfully'
        ], Response::HTTP_OK);
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
}
