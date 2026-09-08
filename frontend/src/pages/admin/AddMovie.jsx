import MovieForm from "../../components/admin/MovieForm";



function AddMovie() {
    return (
        <div className="add-movie">
            <style>{`
                .add-movie h1 {
                    font-family: var(--font-serif);
                    color: var(--text);
                    font-size: var(--fs-2xl);
                    margin: 1% 0;
                }
            `}</style>
            <h1>Add Movie</h1>

            <MovieForm />
        </div>
    );
}

export default AddMovie;