/** @module ComponentsApp */
import React from "react";
import { connect } from "react-redux";
import IsAuth from "./isAuth";
import { Utils } from "../utils";
import { Redirect } from "react-router-dom";

import { LOGOUT, GET_PROFILE } from "../constants/actionTypes";

/**
 * @class
 * Draw Login. A form to login
 */

const logout = () => {
  Utils.deleteCookie("jwt");
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT, payload: logout() }),
  onLoad: id =>
    dispatch({
      type: GET_PROFILE,
      payload: Utils.get(`/cliente/${id}`, null, true)
    })
});
const mapStateToProps = state => ({
  ...state.isAuth
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(this.props.user.id_consumer);
  }
  render() {
    const { isAuth, user, logout, profile } = this.props;
    console.log(profile);
    if (!isAuth) return <Redirect to="/" />;
    return (
      <div className="loginForm">
        <IsAuth />
        <div display={user ? "none" : "block"}>
          <div>
            <span>
              <h1>Nombre : </h1>
              <h3>{profile.nombre}</h3>
            </span>
            <span>
              <h1>Apellido : </h1>
              <h3>{profile.apellido}</h3>
            </span>
            <span>
              <h1>Email : </h1>
              <h3>{profile.email}</h3>
            </span>
            <span>
              <h1>Telefono : </h1>
              <h3>{profile.telefono}</h3>
            </span>
            <span>
              <h1>Genero : </h1>
              <h3>{profile.genero}</h3>
            </span>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
