import React from "react";
import "../Styles/LoginBox.css";
import {
  auth,
  logout
} from "./../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

export const LoginBox = ({username,loginModalHandle, closing }) => {



	const [user, loading, error] = useAuthState(auth);
    

    if(user) {
    return <div className="login-box" onClick={ () => {closing(false); logout() }}>
            <h4>{user?.email} (Sign out) </h4>
        </div>
    } else {
        return <div className="login-box" onClick={loginModalHandle}>
                <h4>Unlogged (Sign in)</h4>
            </div>
    }
};
