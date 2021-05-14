import React from "react";
import M from "materialize-css";
import FileUpload from "./component-fileUpload";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

class Modal extends React.Component {
    state = {
        uploadValue: 0,
        user: { photoURL: "", displayName: "" },
    };

// volvemos a buscar la info delx usuarix
    componentDidMount() {
        M.AutoInit();

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }
// en ambas usamos arrow function a propósito: nos amplía el scope, nos permite llegar con el this al state.
// capturamos el mensaje
    handleChange = (e) => {
        this.setState({
            txt: e.target.value,
        });
    };

// guardamos el mensaje en la base de datos y la foto en el storage
    handleUpload = (e) => {
        const file = e.target.files[0]; // esto es html: guardamos en una variable el file cargado en el input file
        const storageData = firebase.storage();
        const storageRef = storageData.ref(`fotos/${file.name}`);

        const task = storageRef.put(file); 
//pusheamos la imagen y guardamos esa info (el result, xque es una promesa) en una constante. cuando su estado cambie, nos 
//devuelve esa info en el snapshot, para hacer el cálculo del progreso de la subida y setearlo en upload.
        task.on(
            "state_changed",
            (snapshot) => {
                let percent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    uploadValue: percent,
                });
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                const record = {
                    avatar: this.state.user.photoURL,
                    nombre: this.state.user.displayName,
                    txt: this.state.txt,
                    pic: task.snapshot.metadata.fullPath,
                };
                const db = firebase.database();
                const dbRef = db.ref("pictures");
                const newPicture = dbRef.push();
                newPicture.set(record);
            }
        );
    };

    render() {
        return (
            <React.Fragment>
                <a
                    href="#modal1"
                    className="btn-floating btn-large waves-effect waves-light modal-trigger red FAB"
                    id="fab"
                >
                    <i className="material-icons">add</i>
                </a>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Posteá en Truchigram</h4>
                        <div className="chip">
                            <img src={this.state.user.photoURL} />
                            {this.state.user.displayName}
                        </div>

                        <div className="row">
                            <form className="col l12">
                                <div className="row">
                                    <div className="input-field col s9 l4">
                                        <i className="material-icons prefix">
                                            mode_edit
                                        </i>
                                        <textarea
                                            id="icon_prefix2"
                                            className="materialize-textarea"
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="icon_prefix2">
                                            Mensaje
                                        </label>

                                        <FileUpload
                                            onUpload={this.handleUpload}
                                            uploadValue={this.state.uploadValue}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer" />
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;
