
import { Head, Link, usePage } from '@inertiajs/react';

const Show = ({ product }) => {

    console.log('====================================');
    console.log(usePage().props.auth);
    console.log('====================================');

    return (
        <div className="container mx-auto px-4 py-8">
            <Head title={`Product: ${product.name}`} />

            <div className="grid md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="text-gray-500 text-xl">No Image Available</div>
                    )}
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

                    <div className="space-y-4">
                        <div className="border-b pb-2">
                            <span className="font-semibold text-gray-600">Description:</span>
                            <p className="text-gray-800">{product.description || 'No description available'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold text-gray-600">Price:</span>
                                <p className="text-green-600 font-bold">${product.price}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Stock:</span>
                                <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock} units
                                </p>
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <span className="font-semibold text-gray-600">Category:</span>
                            <p>{product.category?.name || 'Uncategorized'}</p>
                        </div>

                        <div>
                            <span className="font-semibold text-gray-600">Status:</span>
                            <span
                                className={`ml-2 px-2 py-1 rounded-full text-xs ${product.enabled
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {product.enabled ? 'Available' : 'Disabled'}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        {usePage().props.auth.user && (
                            <a
                                href={route('products.edit', product)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Edit Product
                            </a>
                        )}
                        <Link
                            onClick={() => route(window.history.back())}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show
