import { useState,useEffect,useRef  } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminMovie, updateAdminMovie } from "../../api/admin";
import Select from "react-select";

import "./MovieForm.css";

function capitalizeWords(text) {
    return text
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

const genreOptions = [
    { value: "Action", label: "Action" },
    { value: "Drama", label: "Drama" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Adventure", label: "Adventure" },
    { value: "Crime", label: "Crime" },
    { value: "Comedy", label: "Comedy" },
    { value: "Thriller", label: "Thriller" },
    { value: "Mystery", label: "Mystery" },
    { value: "Animation", label: "Animation" },
    { value: "Horror", label: "Horror" }
];

function MovieForm({initialData,movieId }) {

    const [formData, setFormData] = useState(initialData || {
        title: "",
        type: "movie",
        year: "",
        rating: "",
        genre: [],
        duration: "",
        country: "",
        language: "",
        poster: "",
        backdrop: "",
        overview: "",
        cast: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const movieData = {
        ...formData,

        title: capitalizeWords(formData.title),

        country: capitalizeWords(formData.country),

        language: capitalizeWords(formData.language),

        year: Number(formData.year),

        rating: Number(formData.rating),

        genre: formData.genre.map(item => capitalizeWords(item)),

        cast: formData.cast
        .split(",")
        .map(item => capitalizeWords(item))

        };

        try {

            if (movieId) {

            await updateAdminMovie(movieId, movieData);

            alert("Movie updated successfully!");

            } else {

            await createAdminMovie(movieData);

            alert("Movie added successfully!");

            }

            navigate("/admin/movies");

        } catch (error) {

        console.log(error.message);

        alert(error.message);

        }

    };

    const handleCancel = () => {
    navigate("/admin/movies");
    };

    useEffect(() => {

    if (initialData) {
        setFormData(initialData);
    }

    }, [initialData]);

    return (

        <form className="movie-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
            </div>

            <div className="form-group">
                <label>Year</label>
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Rating</label>
                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Genre</label>
                <Select
                isMulti
                unstyled
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null} /* */
                options={genreOptions}
                value={genreOptions.filter(option =>
                    formData.genre && formData.genre.includes(option.value)
                )}
                onChange={(selectedOptions) =>
                    setFormData({
                        ...formData,
                        genre: selectedOptions ? selectedOptions.map(option => option.value) : []
                    })
                }
                styles={{
                control: (base, state) => ({
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '42px',
                    backgroundColor: state.isFocused ? '#ffffff' : '#fafafa',
                    border: `1px solid ${state.isFocused ? '#d97706' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    padding: '2px 8px',
                    boxShadow: state.isFocused ? '0 0 16px rgba(217, 119, 6, 0.1)' : 'none',
                    cursor: 'pointer',
                }),
                valueContainer: () => ({
                    overflowX:"scroll",
                    scrollbarWidth: 'none',
                    display: 'flex',
                    gap: '4px',
                    flex: 1,
                    padding: '2px',
                }),
                placeholder: () => ({
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                }),
                multiValue: () => ({
                    minWidth:'70px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '6px',
                    padding: '2px 6px',
                    margin: '2px',
                }),
                multiValueLabel: () => ({
                    fontSize: '0.85rem',
                    color: '#374151',
                }),
                multiValueRemove: () => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    paddingLeft: '4px',
                    cursor: 'pointer',
                    color: '#6b7280',
                    ':hover': {
                        color: '#ef4444',
                    },
                }),
                menu: () => ({
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    marginTop: '4px',
                    overflow: 'hidden',
                    zIndex: 99999,
                }),
                option: (_, state) => ({
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    cursor: 'pointer',
                    backgroundColor: state.isSelected
                        ? '#d97706'
                        : state.isFocused
                        ? '#f3f4f6'
                        : 'transparent',
                    color: state.isSelected ? '#ffffff' : '#1f2937',
                    display: 'block',
                }),
                }}
                />
            </div>

            <div className="form-group">
                <label>Duration</label>
                <input
                    type="text"
                    name="duration"
                    placeholder="2h 30m"
                    value={formData.duration}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Language</label>
                <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Poster</label>
                <input
                    type="text"
                    name="poster"
                    placeholder="/posters/example.jpg"
                    value={formData.poster}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Backdrop</label>
                <input
                    type="text"
                    name="backdrop"
                    placeholder="/backdrop/example.jpg"
                    value={formData.backdrop}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group full-width">
                <label>Overview</label>
                <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group full-width">
                <label>Cast</label>
                <input
                    type="text"
                    name="cast"
                    placeholder="Actor 1, Actor 2, Actor 3"
                    value={formData.cast}
                    onChange={handleChange}
                />
            </div>
            <div className="form-actions">
                <button className="btn-cancel" type="button" onClick={handleCancel}>
                    Cancel
                </button>

                <button className="btn-submit" type="submit">
                    {movieId ? "Update Movie" : "Add Movie"}
                </button>
            </div>
        </form>
    );
}

export default MovieForm;