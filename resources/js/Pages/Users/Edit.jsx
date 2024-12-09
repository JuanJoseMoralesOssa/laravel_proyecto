import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Create = ({ user }) => {

    const { data, setData, put, processing, reset, errors } = useForm({
        id: user.id ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        password: user.password ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const home = {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
        }
        put(route("home.update", home), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="w-full shadow-sm sm:rounded-lg bg-white mx-auto p-5  text-gray-900 lg:w-7/12 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">
                                Edit a User
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
                                        placeholder="User name"
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
                                    <InputLabel htmlFor="email" value="email" />
                                    <TextInput
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        placeholder="User email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="mb-3">

                                    <InputLabel htmlFor="password" value="password" />
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        autoComplete="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="mb-3 mx-6 mt-4 flex text-center items-center">
                                    <PrimaryButton type="submit"
                                        className="mt-4 w-full flex justify-center px-4 py-2 font-bold text-white bg-blue-500 bg-gradient-to-br to-indigo-600 from-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 text-sm text-center hover:from-blue-700 hover:to-indigo-700"
                                        disabled={processing}
                                    >
                                        Edit User
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
