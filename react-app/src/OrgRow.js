import React from 'react';

class OrgRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    render(){
        const lineItem = this.props.stuff;
        return(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>What is up</p>
                </Modal>
                <div>{lineItem.note}</div>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="two-minute">O</button>
                <button value={lineItem.inboxId} onClick={this.showModal} className="button" id="project-candidate">T</button>
                <button value={lineItem.inboxId} className="button" id="wish-list">S</button>
                <button value={lineItem.inboxId} className="button" id="archive">R</button>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="discard">X</button>
            </div>
        )
    }
}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
};
export default OrgRow
