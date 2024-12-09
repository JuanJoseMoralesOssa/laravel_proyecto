import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Create = ({ category }) => {

    const { data, setData, put, processing, reset, errors } = useForm({
        id: category.id ?? "",
        name: category.name ?? "",
        description: category.description ?? "",
        priority: category.priority ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("categories.update", category), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Category
                </h2>
            }
        >
            <Head title="Edit Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="w-full shadow-sm sm:rounded-lg bg-white mx-auto p-5  text-gray-900 lg:w-7/12 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">
                                Edit a Category
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
                                        placeholder="Category name"
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
                                        placeholder="Category description"
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="mb-3">

                                    <InputLabel htmlFor="priority" value="Priority" />
                                    <TextInput
                                        id="priority"
                                        name="priority"
                                        type="number"
                                        value={data.priority}
                                        className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        autoComplete="priority"
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.priority} />
                                </div>

                                <div className="mb-3 mx-6 mt-4 flex text-center items-center">
                                    <PrimaryButton type="submit"
                                        className="mt-4 w-full flex justify-center px-4 py-2 font-bold text-white bg-blue-500 bg-gradient-to-br to-indigo-600 from-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 text-sm text-center hover:from-blue-700 hover:to-indigo-700"
                                        disabled={processing}
                                    >
                                        Edit Category
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
