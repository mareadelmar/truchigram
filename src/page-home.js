import React from "react";
import insta from "./instashot.png";
import firebase from "firebase/app";
import "firebase/auth";

class Home extends React.Component {
    state = {
        user: null,
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
            // si está logueadx, que vaya derecho al feed:
            if (this.state.user) {
                this.props.history.push("/feed");
            }
        });
    }

    handleAuth() {
        console.log("click en loguearse");
        //logueo a través del proveedor google
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => console.log(result.user.email))
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="container vh100">
                    <div className="row ">
                        <div className="col m4 l5 offset-l1 off">
                            <img alt="" src={insta} />
                        </div>
                        <div className="col m3 l3 top120">
                            <div className="card">
                                <div className="card-image">
                                    <span className="card-title">
                                        Card Title
                                    </span>
                                </div>
                                <div className="card-content center">
                                    <img
                                        alt="Jonatan Ariste"
                                        className="circle homePic"
                                        src="https://scontent-sea1-1.cdninstagram.com/vp/d48e1e31249f9224400253b4cf32599e/5D53373F/t51.2885-19/s150x150/54512168_825848254460977_4462647328951500800_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com"
                                    />
                                    <p>
                                        Bienvenidos a{" "}
                                        <strong>Truchigram</strong>, esta app#
                                        esta creada para el curso de Firebase de
                                        escuela devRock para mostrar un primer
                                        ejemplo del poder de esta base de datos
                                        y lo fácil que resulta para arrancar a
                                        crear.
                                    </p>
                                </div>
                                <div className="card-action right-align">
                                    <button
                                        className="waves-effect waves-light btn"
                                        onClick={this.handleAuth}
                                    >
                                        Logear con Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
