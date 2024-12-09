<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CategoryController;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Mail\StoreCategoryMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::with('products')->get(),
        ]);
    }

    public function index_all()
    {
        return Category::paginate();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $request['slug'] = $this->generateUniqueSlug($request['name']);
        $category = Category::create($request->all());
        Mail::to($request->user())->send(new StoreCategoryMail($category));
        return redirect(route('categories.index'))->with('success', 'Categoria creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return redirect(route('categories.index'))->with('success', 'Categoria actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect(route('categories.index'))->with('success', 'Categoria eliminada exitosamente.');
    }


    public function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (Category::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }
}
