import React from 'react';
import Action from './Action'

class OrgRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            endpoint: '',
            projectName: this.props.stuff.note,
            projectStatus: '',
            status: [],
            contexts: [],
            action: {
               actionTitle: '',
               actionDescription: '',
               context: ''
            }

        }
    }

    async componentDidMount(){
        fetch('http://localhost:8080/status',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({status: data})
        })

        fetch('http://localhost:8080/contexts',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({contexts: data})
        })
    }

    showModal = (e) => {
        this.setState({
            show: true,
            endpoint: e.target.innerText,
        });
    };

    hideModal = () => {
        this.setState({
            show: false,
            endpoint: '',
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "projectName": this.state.projectName,
                    "projectSummary": "This is a test",
                    "status": this.state.projectStatus,
                    "projectActions": [this.state.action],
                }
            )
        }).then((res)=> {
            if(res.ok) {
                this.props.modalClick(this.props.stuff.inboxId)
            }
        }
            )
    };
    handleChange = (e) => {
      this.setState({
          projectName: e.target.value,
      })
    };
    handleStatusSelect = (e) => {
        this.setState({
            projectStatus: this.state.status[e.target.value -1],
        })
    };
    handleContextSelect = (e) => {
        let actionMod = this.state.action;
        actionMod.context = this.state.contexts[e.target.value -1];
        this.setState({
             action: actionMod,
        })
    };
    handleActionNameClick = (e) => {
        let actionMod = this.state.action;
        actionMod.actionTitle = e.target.value;
        this.setState({
            action: actionMod
        })
    };
    handleActionDescriptionClick = (e) => {
        let actionMod = JSON.parse(JSON.stringify(this.state.action));
        actionMod.actionDescription = e.target.value;
        this.setState({
            action: actionMod,
        })
    };


    addAction = () => {

    };

    render(){
        const lineItem = this.props.stuff;
        const statusList = this.state.status.map(type => <option key={type.statusId} value={type.statusId}>{type.name}</option>)
        return(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                   <form onSubmit={this.handleSubmit}>
                       <input name="projectName" type="text" value={this.state.projectName} onChange={this.handleChange}/>
                       <select name="projectStatus" value={this.state.projectStatus.statusId} onChange={this.handleStatusSelect}>
                           {statusList}
                       </select>
                       <button type="button" onClick={this.addAction}>Add Action</button>
                       <div id="action-holder">
                           <Action context={this.state.contexts}
                                   action={this.state.action}
                                   onChange={this.handleChange}
                                   onSelect={this.handleContextSelect}
                                   onAction={this.handleActionNameClick}
                                   onDescription={this.handleActionDescriptionClick}
                           />
                       </div>
                       <input type="submit" value="Create"/>
                   </form>
                </Modal>
                <div>{lineItem.note}</div>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="two-minute">O</button>
                <button value={lineItem.inboxId} onClick={this.showModal} className="button" id="project-candidate">T</button>
                <button value={lineItem.inboxId} onClick={this.showModal} className="button" id="wish-list">S</button>
                <button value={lineItem.inboxId} className="button" id="archive">R</button>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="discard">X</button>
            </div>
        )
    }
}

/*
 TODO: In this modal I want to autofill the note property on stuff as the description/title.
 TODO: The button I click to open the modal can set the status either on the front end or back end.
 TODO: It creates a project template where I can click to add next actions as dynamically created list
 TODO: ??Dropdown to assign to a current project. Which loads that project and fills the text as a new task in that project.
 */

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
