import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const navigate = useNavigate();

    const handleAddMovie = () => {
        // Add your movie logic here
        navigate("/movies");
    };

    return (
        <div>
            <h2>Add a new movie</h2>
            <form onSubmit={handleAddMovie}>
                {/* Add your form fields here */}
                <button type="submit">Add movie</button>
            </form>
        </div>
    );
};