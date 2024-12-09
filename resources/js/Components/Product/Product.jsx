import React from 'react';

export default function Product({ product }) {
    // product = {
    //     id: 1,
    //     name: 'Product 1',
    //     description: 'This is a description of product 1.',
    //     price: 100.00,
    //     stock: 10,
    //     image: 'https://via.placeholder.com/150',
    //     enabled: true,
    //     slug: 'product-1',
    //     category_id: 1,
    //     category: {
    //         id: 1,
    //         name: 'Category 1'
    //     }
    // }

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        enabled: "",
        category_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('products.update', product.id), { onSuccess: () => setEditing(false) });
    };
    return (
        <div className="p-6 flex space-x-4 bg-white shadow rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>

            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800 font-semibold">{product.category.name}</span>
                        <small className="ml-2 text-sm text-gray-600">Category ID: {product.category_id}</small>
                        {product.created_at !== product.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-gray-800 font-bold">${product.price}</span>
                        <small className="ml-2 text-sm text-gray-600">In Stock: {product.stock}</small>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                </div>

                {/* chirp.user.id === */}
                {auth.user.id &&
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                }
            </div>

            {editing ? (
                <form
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={data.name}
                            placeholder="Product name"
                            autoFocus
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs italic">
                                {errors.name}
                            </p>
                        )}
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="description"
                            value={data.description}
                            placeholder="Product description"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        >

                        </textarea>
                        <InputError className="mt-2" message={errors.description} />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="price"
                        >
                            Price
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            step={0.01}
                            value={data.price}
                            onChange={(e) =>
                                setData("price", e.target.value)
                            }
                        />
                        <InputError className="mt-2" message={errors.price} />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="stock"
                        >
                            Stock
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) =>
                                setData("stock", e.target.value)
                            }
                        />
                        <InputError className="mt-2" message={errors.stock} />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="image"
                        >
                            Image
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="image"
                            type="file"
                            value={data.image}
                            onChange={(e) =>
                                setData("image", e.target.value)
                            }
                        />
                        <InputError className="mt-2" message={errors.image} />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="enabled"
                        >
                            Enabled
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="enabled"
                            type="checkbox"
                            value={data.enabled}
                            onChange={(e) =>
                                setData("enabled", e.target.value)
                            }
                        />
                        <InputError className="mt-2" message={errors.enabled} />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="category_id"
                        >
                            Category
                        </label>
                        <select
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                        </select>
                        <InputError className="mt-2" message={errors.category_id} />
                    </div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content className="mb-6 text-center">
                            <PrimaryButton type="submit"
                                className="mt-4 w-full px-4 py-2 font-bold text-white bg-blue-500 bg-gradient-to-br to-indigo-600 from-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 text-sm text-center"
                                disabled={processing}
                            >
                                Edit Product
                            </PrimaryButton>

                            <Dropdown.Link as="button" href={route('products.destroy', product.id)} method="delete">
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </form>
            ) : (
                <div className="flex items-center">

                    <div>
                        <span className="text-sm text-gray-600">Created {product.created_at}</span>
                        <span className="text-sm text-gray-600 ml-2">Updated {product.updated_at}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                    <p className="mt-1 text-lg text-gray-600">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <span className="text-gray-800 font-bold">${product.price}</span>
                            <small className="ml-2 text-sm text-gray-600">In Stock: {product.stock}</small>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
}
