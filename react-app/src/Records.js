import React from 'react';

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            show: false,
            id: '',
            name: '',
            body: '',
            status: '',
        }
    }

    async componentDidMount(){
        fetch('http://localhost:8080/records', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(data => this.setState({records: data}))
    }

    showModal = (e) => {
        this.setState({
            show: true,
            id: this.state.records[e.target.value].id,
            name: this.state.records[e.target.value].recordName,
            body: this.state.records[e.target.value].recordBody,
            status: this.state.records[e.target.value].status
        })
    };
    hideModal = () => {
        this.setState({
            show:false,
            id: '',
            name: '',
            body: '',
            status: '',
            }
        )
    };

    handleChange = (e) => {
        this.setState({
            name: e.target.value,
        })
    };

    handleDescriptionChange = (e) => {
        this.setState({
            body: e.target.value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/records', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                        "id": this.state.id,
                        "recordName": this.state.name,
                        "recordBody": this.state.body,
                        "status": this.state.status,
                    }
            )
        }).then((res => {
            if (res.ok) {
                this.hideModal();
                fetch('http://localhost:8080/records', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }).then(response => response.json()).then(data => this.setState({records: data}))

            }
        }))
    };

    handleDelete = async (e) => {
        e.preventDefault();
       await this.setState({
            id: this.state.records[e.target.value].id,
            name: this.state.records[e.target.value].recordName,
            body: this.state.records[e.target.value].recordBody,
            status: this.state.records[e.target.value].status
        });
        fetch('http://localhost:8080/deleterecord', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "id": this.state.id,
                    "recordName": this.state.name,
                    "recordBody": this.state.body,
                    "status": this.state.status,
                }
            )
        }).then((res => {
            if (res.ok) {
                this.hideModal();
                fetch('http://localhost:8080/records', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }).then(response => response.json()).then(data => this.setState({records: data}))

            }
        }))
    };

    render() {
        const recordList = this.state.records.map((rec, index) => {
           return (
               <div>
                   <h4>{rec.recordName}</h4>
                   <p>{rec.recordBody}</p>
                   <button  value={index} onClick={this.showModal}>Edit</button>
                   <button  value={index} onClick={this.handleDelete}>Delete</button>
               </div>
           )
        });
        return (
            <div>
                {(this.state.records.length >= 1) &&
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <form onSubmit={this.handleSubmit}>
                        <input name="name" type="text" value={this.state.name}
                               onChange={this.handleChange}/>

                        <textarea name="description" rows="4" value={this.state.body} onChange={this.handleDescriptionChange}/>

                        <input type="submit" value="Edit"/>
                    </form>
                </Modal>
                    }
                {recordList}
            </div>
        );
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
export default Records
