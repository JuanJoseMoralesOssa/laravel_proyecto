import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const CategoriasTable = ({ categories }) => {

    const [loadedCategories, setLoadedCategories] = useState(categories);

    const handleDelete = async (category) => {
        if (window.confirm(`'Are you sure you want to delete this category ${category.name} ?'`)) {
            router.delete(route('categories.destroy', category));
            setLoadedCategories(loadedCategories.filter(c => c.id !== category.id));
        }
    }

    return (
        loadedCategories.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loadedCategories.map((category) => (
                        <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-gray-900 font-bold inline-block text-center w-full">{category.id}</span>
                                <div className="flex flex-col items-center mt-1 space-y-1">
                                    <Link href={route('categories.show', category)} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-900 rounded-2xl flex items-center p-2 gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M8 1a7 7 0 0 1 5.996 10.8 6.5 6.5 0 1 1-9.993 0A7 7 0 0 1 8 1zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-.5 3a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-1 0V6.5a.5.5 0 0 1 .5-.5z" />
                                        </svg>
                                        <Link
                                            href={route('categories.show', category)}
                                            className="text-yellow-500 hover:underline"
                                        >
                                            Show
                                        </Link>
                                    </Link>
                                    <button className="bg-blue-50 hover:bg-blue-200 text-blue-500 hover:text-indigo-900 rounded-2xl flex items-center p-2"
                                        onClick={() => window.location.href = route('categories.edit', category)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        <a href={route('categories.edit', category)} className="text-indigo-600 hover:text-indigo-900 px-2">
                                            Edit
                                        </a>
                                    </button>
                                    <button className="bg-red-50 hover:bg-red-200 rounded-2xl flex items-center p-2"
                                        onClick={() => handleDelete(category)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-red-600 hover:text-red-900" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                        <span className="text-red-600 hover:text-red-900 px-2">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{category.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{category.priority}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{category.slug}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)
            :
            (
                <div className="text-center text-gray-500">No categories found</div>
            )
    )
}

export default CategoriasTable
