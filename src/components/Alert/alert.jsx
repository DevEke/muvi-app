import { IoAlertCircleOutline, IoClose } from 'react-icons/io5';

function Alert(props) {
    return (
        <div className="modal-backsplash">
            <div className="alert-modal">
                <IoAlertCircleOutline className="icon"/>
                <p>{props.message}</p>
                <button onClick={props.closemodal} className="close">
                <IoClose className="icon"/>
                </button>
            </div>
        </div>
    )
}

export default Alert;