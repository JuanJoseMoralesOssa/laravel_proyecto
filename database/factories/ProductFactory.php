<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'stock' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(640, 480, 'products', true),
            'enabled' => $this->faker->boolean,
            'slug' => Str::slug($this->faker->unique()->word),
            'category_id' => Category::factory(),
        ];
    }
}