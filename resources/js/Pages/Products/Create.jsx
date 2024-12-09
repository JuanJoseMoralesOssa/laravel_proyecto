import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoriesService from "@/services/CategoriesService";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Create = () => {

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        enabled: "",
        category_id: "",
    });

    const [categorias, setCategorias] = useState([]);

    const [previewImage, setPreviewImage] = useState(null);

    const fetchCategories = async () => {
        CategoriesService.getCategories().then(categorias => {
            setCategorias(categorias.data);
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        // Create image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            setData("image", previewImage);
        }
        post(route("products.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create new product
                </h2>
            }
        >
            <Head title="Create New Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="w-full shadow-sm sm:rounded-lg bg-white mx-auto p-5  text-gray-900 lg:w-7/12 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">
                                Create a new product
                            </h3>
                            <form
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        placeholder="Product name"
                                        className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        placeholder="Product description"
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="md:flex md:justify-between md:items-center">
                                    <div className="mb-3">

                                        <InputLabel htmlFor="price" value="Price" />
                                        <TextInput
                                            id="price"
                                            name="price"
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            value={data.price}
                                            className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            autoComplete="price"
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.price} />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel htmlFor="stock" value="Stock" />
                                        <TextInput
                                            id="stock"
                                            name="stock"
                                            type="number"
                                            min={0}
                                            value={data.stock}
                                            className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            autoComplete="stock"
                                            onChange={(e) =>
                                                setData("stock", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.stock} />
                                    </div>
                                    <div className="md:mr-8 mb-3">
                                        <InputLabel htmlFor="enabled" value="Enabled" />
                                        <TextInput
                                            id="enabled"
                                            name="enabled"
                                            type="checkbox"
                                            value={data.enabled}
                                            className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            onChange={(e) =>
                                                setData("enabled", e.target.checked)
                                            }
                                        />
                                        <InputError className="mt-2" message={errors.enabled} />
                                    </div>
                                </div>

                                <div className="mb-3 md:flex md:items-center md:justify-between mx-auto">
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="mx-auto rounded-lg shadow-md object-cover max-w-52 max-h-52 my-3"
                                        />
                                    )}
                                    <div>
                                        <InputLabel htmlFor="image" value="Image" />
                                        <TextInput
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            onChange={
                                                handleImageChange
                                            }
                                        />
                                        <InputError message={errors.image} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="category_id" value="Category" />
                                    <select
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData("category_id", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categorias.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.category_id} />
                                </div>
                                {/* {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )} */}
                                <div className="mb-3 mx-6 mt-4 flex text-center items-center">
                                    <PrimaryButton type="submit"
                                        className="mt-4 w-full flex justify-center px-4 py-2 font-bold text-white bg-blue-500 bg-gradient-to-br to-indigo-600 from-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 text-sm text-center hover:from-blue-700 hover:to-indigo-700"
                                        disabled={processing}
                                    >
                                        Create Product
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create
