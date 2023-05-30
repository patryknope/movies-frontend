import React, { useState } from "react";
import { CustomButton } from "../Utils/CustomButton";
import { LoginBox } from "../Utils/UserBox";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { Modal, Button } from "react-bootstrap";
import { populateMovies, deleteAllMovies } from "../service/Api.js";
import SearchBar from "./SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "./../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch, onLoginClick, closing }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handlePopulateMovies = async () => {
    await populateMovies();
    handleClose();
  };

  const handleDeleteAllMovies = async () => {
    await deleteAllMovies();
    handleClose();
  };

  const [user, loading, error] = useAuthState(auth);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  const toastRegisteringId = React.useRef(null);

  const notifyRegistering = () =>
    (toastRegisteringId.current = toast.info("Registering...", {
      position: "bottom-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }));
  const dismissRegistering = () => toast.dismiss(toastRegisteringId.current);

  const toastLoggingInId = React.useRef(null);

  const notifyLoggingIn = () =>
    (toastLoggingInId.current = toast.info("Logging in...", {
      position: "bottom-center",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }));

  const dismissLoggingIn = () => toast.dismiss(toastLoggingInId.current);

  const successNotify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const failNotify = (msg) =>
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const register = async (e) => {

    notifyRegistering();

    await createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {

        successNotify("Registration success");
        handleClose2();
        state.email = "";
        state.password = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        failNotify("Error registering new account");
      })
      .finally(() => dismissRegistering());
  };

  const login = async (e) => {

    notifyLoggingIn();

   await signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        successNotify("Login success");
        handleClose2();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        failNotify("Error logging in");
      })
      .finally(() => dismissLoggingIn());;
  };


  const handleGoToAddMovie = () => {
	if(user) {
		navigate("/addmovie")
	} else {
		handleShow2();
	}
  }

  return (
    <div className="header">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Movie Rating App</h1>

      <LoginBox
        loginModalHandle={handleShow2}
        closing={closing}
      />

      <div className="header-buttons">
          <CustomButton text="Add movie" onClick={handleGoToAddMovie} />
        <Link to="/movies">
          <CustomButton text="All movies" />
        </Link>
        <Link to="/mymovies">
          <CustomButton text="My movies" />
        </Link>
        <CustomButton text="Populate movies" onClick={handleShow} />
        <CustomButton
          text="Delete all movies"
          onClick={handleDeleteAllMovies}
        />

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <input
                  className="form-control"
                  placeholder="email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <input
                  className="form-control"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="button" onClick={() => login()}>
              Login
            </Button>
            <Button variant="primary" type="button" onClick={() => register()}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Populate/Delete Movies</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to populate the list of movies? It will
            generate 20 movies defined in the back-edn
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAllMovies}>
              Delete All Movies
            </Button>
            <Button variant="primary" onClick={handlePopulateMovies}>
              Populate Movies
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="header-search">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Header;
