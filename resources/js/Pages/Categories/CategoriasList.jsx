
const CategoriasList = ({ categorias }) => {
    return (
        categorias && categorias.length > 0 ? (
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-4 h-15 overflow-y-auto">
                    {categorias.map((categoria) => (
                        <span key={categoria} className="px-4 py-2 bg-green-200 text-green-950 rounded-full text-sm">
                            {categoria.name ?? 'Without name'}
                        </span>
                    ))}
                </div>
            </div>
        ) : (
            <p className="my-6">No categories available</p>
        )
    )
}

export default CategoriasList
