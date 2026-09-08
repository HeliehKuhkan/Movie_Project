import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdminMovie } from "../../api/admin";
import MovieForm from "../../components/admin/MovieForm";

function getImagePath(url) {
    if (!url) return "";

    return url.replace("http://127.0.0.1:8000/static", "");
}

function EditMovie() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {

        const loadMovie = async () => {

            try {

                const data = await getAdminMovie(id);

                setMovie({
                    ...data,
                    cast: data.cast.join(", "),
                    poster: getImagePath(data.poster),
                    backdrop: getImagePath(data.backdrop)
                });

            } catch (error) {

                console.log(error.message);

            }

        };

        loadMovie();

    }, [id]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    console.log(movie);

    return (
        <div className="edit-movie">

            <h1>Edit Movie</h1>

            <MovieForm initialData={movie} movieId={id} />

        </div>
    );
}

export default EditMovie;