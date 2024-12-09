<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            line-height: 1.6;
        }

        p {
            margin-bottom: 1rem;
            font-size: larger;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 2rem auto;
            padding: 1rem;
        }

        .card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .card-header {
            background-color: #f8f9fa;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }

        .card-header h1 {
            color: #333;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .card-body {
            padding: 1.5rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        .grid-item {
            display: flex;
            flex-direction: column;
        }

        .grid-item-label {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }

        .grid-item-value {
            color: #1f2937;
            font-size: 1.125rem;
            font-weight: 600;
        }

        .description {
            grid-column: span 2;
            color: #4b5563;
        }

        .card-footer {
            background-color: #f8f9fa;
            padding: 1rem 1.5rem;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .btn-primary {
            background-color: #3b82f6;
            color: white;
        }

        .btn-primary:hover {
            background-color: #2563eb;
        }

        .btn-secondary {
            background-color: #e5e7eb;
            color: #1f2937;
        }

        .btn-secondary:hover {
            background-color: #d1d5db;
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }

            .description {
                grid-column: span 1;
            }
        }
    </style>
    <title>Creacion del proyecto</title>
</head>

<body>
    <div class="container">
        <p>New category</p>

        <div class="card">
            <div class="card-header">
                <h1>{{ $category->name }}</h1>
            </div>

            <div class="card-body">
                <div class="grid">
                    <div class="grid-item">
                        <p class="grid-item-label">ID</p>
                        <p class="grid-item-value">{{ $category->id }}</p>
                    </div>

                    <div class="grid-item">
                        <p class="grid-item-label">Slug</p>
                        <p class="grid-item-value">{{ $category->slug }}</p>
                    </div>

                    <div class="grid-item">
                        <p class="grid-item-label">Priority</p>
                        <p class="grid-item-value">{{ $category->priority }}</p>
                    </div>

                    <div class="grid-item description">
                        <p class="grid-item-label">Description</p>
                        <p class="grid-item-value">{{ $category->description ?? 'No description provided' }}</p>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <div>
                    <a href="{{ route('categories.edit', $category) }}" class="btn btn-primary">Edit Category</a>
                    <a href="{{ route('categories.index') }}" class="btn btn-secondary">Back to Categories</a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
