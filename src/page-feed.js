import React from "react";
import Nav from "./component-nav";
import ReactDOM from "react-dom";
import Modal from "./component-modal";
import FeedContent from "./component-feed";
import firebase from "firebase/app";
import "firebase/database";

class Feed extends React.Component {
    state = {
        user: { photoURL: "", displayName: "" },
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Nav
                    nombre={this.state.user.displayName}
                    avatar={this.state.user.photoURL}
                />
                <div className="container">
                    <div className="row">
                        <div className="col l6 offset-l3">
                            <FeedContent />

                            {ReactDOM.createPortal(
                                <Modal />,
                                document.getElementById("teleport")
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Feed;
