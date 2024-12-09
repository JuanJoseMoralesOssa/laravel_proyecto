<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');             // Nombre del producto
            $table->text('description')->nullable();// Descripción del producto
            $table->decimal('price', 8, 2);     // Precio con decimales
            $table->integer('stock');           // Stock como entero
            $table->string('image')->nullable(); // Imagen del producto
            // $table->string('size')->nullable(); // Talla del producto
            // $table->string('color')->nullable(); // Color del producto
            // $table->string('material')->nullable(); // Material del producto
            // $table->string('brand')->nullable(); // Marca del producto
            // $table->string('model')->nullable(); // Modelo del producto
            // $table->boolean('featured')->default(false); // Destacado
            // $table->boolean('new')->default(false); // Nuevo
            // $table->boolean('sale')->default(false); // En oferta
            // $table->integer('priority')->default(0);  // Prioridad de visualización
            $table->boolean('enabled')->default(true); // Habilitado o deshabilitado
            $table->string('slug')->unique();   // Slug para URLs amigables
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Relación con categorías
            // $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Relación con usuarios
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
