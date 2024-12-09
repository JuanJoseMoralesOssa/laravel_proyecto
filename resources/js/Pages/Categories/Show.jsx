import { Head, Link } from '@inertiajs/react';

const Show = ({ category }) => {

    return (
        <div className="container mx-auto px-4 py-8">
            <Head title={`Category: ${category.name}`} />

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">{category.name}</h1>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">ID</p>
                            <p className="text-lg font-semibold text-gray-900">{category.id}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Slug</p>
                            <p className="text-lg font-semibold text-gray-900">{category.slug}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Priority</p>
                            <p className="text-lg font-semibold text-gray-900">{category.priority}</p>
                        </div>

                        <div className="col-span-2">
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="text-gray-700">{category.description || 'No description provided'}</p>
                        </div>

                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <div className="space-x-2">
                        <Link
                            href={route('categories.edit', category)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Edit Category
                        </Link>

                        <Link
                            href={route('categories.index')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Back to Categories
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
