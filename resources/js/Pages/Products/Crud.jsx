import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductosTable from './ProductosTable';
import CategoriasList from '../Categories/CategoriasList';
import { useEffect, useState } from 'react';
import CategoriesService from '@/services/CategoriesService';

export default function Crud({ products }) {

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


                <div className='md:flex md:justify-between mb-3'>
                    <h1 className="text-3xl font-bold mb-8">Our collection</h1>
                    <a
                        href={route('products.create')}
                        className="p-2 rounded-lg block md:flex justify-center w-full h-fit md:w-48 py-3 text-center text-white bg-blue-500 hover:bg-blue-600">
                        Create Product
                    </a>
                </div>

                <CategoriasList categorias={categorias} />

                <div className="mx-auto overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 overflow-x-auto">
                        <ProductosTable products={products}
                            isLogin={true} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
