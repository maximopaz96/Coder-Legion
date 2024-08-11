import React, { useState, useEffect } from "react";
import { fetchCrearArticulo } from "../../hooks/ArticlesCon";
import { fetchCategories } from "../../hooks/CategoryCon";


export const CrearArticulo = () => {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [content, setContent] = useState("");
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]); // Inicializa como un array vacío
    const [selectedCategories, setSelectedCategories] = useState([]); // Categorías seleccionadas
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (err) {
                setError("Error al cargar las categorías");
            }
        };
    
        loadCategories();
    }, []);
    

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("abstract", abstract);
        formData.append("content", content);
        formData.append("caption", caption);
        formData.append("categories", JSON.stringify(selectedCategories)); // Incluir categorías seleccionadas como JSON
        if (image) {
            formData.append("image", image);
        }

        try {
            await fetchCrearArticulo(formData);
            setSuccess(true);
            setTitle("");
            setAbstract("");
            setContent("");
            setCaption("");
            setImage(null);
            setSelectedCategories([]); // Reiniciar las categorías seleccionadas
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Crear Nuevo Artículo</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Artículo creado con éxito</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength="255"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="abstract" className="form-label">Copete</label>
                    <textarea
                        className="form-control"
                        id="abstract"
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        maxLength="255"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenido</label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="caption" className="form-label">Epígrafe de la Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength="255"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categories" className="form-label">Categorías</label>
                    <select
                        multiple
                        className="form-select"
                        id="categories"
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        required
                    >
                        {categories.length === 0 ? (
                            <option disabled>Cargando categorías...</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))
                        )}
                    </select>

                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Artículo</button>
            </form>
        </div>
    );
};
