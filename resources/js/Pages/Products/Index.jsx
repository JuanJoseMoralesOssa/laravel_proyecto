import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductosTable from './ProductosTable';
import CategoriasList from '../Categories/CategoriasList';
import { useEffect, useState } from 'react';
import CategoriesService from '@/services/CategoriesService';

export default function Index({ products }) {

    const [categorias, setCategorias] = useState([]);

    const fetchCategories = async () => {
        CategoriesService.getCategories().then(categorias => {
            setCategorias(categorias.data);
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}>
            <Head title="Products" />

            <div className="container mx-auto my-2 px-4 py-12 sm:p-6 lg:p-8 bg-white shadow-sm sm:rounded-lg">

                <h1 className="text-3xl font-bold mb-8">Our collection</h1>

                <CategoriasList categorias={categorias} />

                <div className="mx-auto overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 overflow-x-auto">
                        <ProductosTable products={products}
                            isLogin={false} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
