import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import CategoriasTable from './CategoriasTable';

export default function Index({ categories }) {


    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}>
            <Head title="Categories" />



            <div className="mx-auto sm:px-6 lg:px-8 m-4">
                <div className="flex justify-start mb-4 mx-2">
                    <Link href={route('categories.create')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Create Category
                    </Link>
                </div>
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 overflow-x-auto">
                        <CategoriasTable categories={categories} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
