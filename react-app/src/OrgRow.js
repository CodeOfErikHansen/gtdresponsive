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
            actions: [
                 {
                    actionTitle: '',
                    actionDescription: '',
                    context: ''
                },
            ]

        }
    }

    async componentDidMount(){
        fetch('http://localhost:8080/status',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({status: data.filter((item) => item.name == 'On Deck' || item.name == 'Someday')})
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
                    "projectActions": this.state.actions,
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
            projectStatus: this.state.status[e.target.value],
        })
    };
    handleContextSelect = (i, e) => {
        let actions = [...this.state.actions];
        actions[i].context = this.state.contexts[e.target.value-1];
        this.setState({
             action: actions
        })
    };
    handleActionNameChange = (i, e) => {
        let actions = [...this.state.actions];
        actions[i].actionTitle = e.target.value;
        this.setState({
            actions: actions
        })
    };
    handleActionDescriptionChange = (i, e) => {
        let actions = [...this.state.actions];
        actions[i].actionDescription = e.target.value;
        this.setState({
            actions: actions,
        })
    };


    addAction = () => {
        const newAction = {
            actionTitle: '',
            actionDescription: '',
            context: ''
        };
        this.setState({
             actions: [...this.state.actions, newAction ]
        })
    };
    removeAction = (i) => {
      let actions = [...this.state.actions];
      actions.splice(i,1);
      this.setState({actions});
    };

    render(){
        const lineItem = this.props.stuff;
        const statusList = this.state.status.map((type, index) => <option key={type.statusId} value={index}>{type.name}</option>)
        const actionsList = this.state.actions.map((action, index) => <Action key={index}
                                                                    context={this.state.contexts}
                                                                     action={action}
                                                                     onSelect={this.handleContextSelect.bind(this, index)}
                                                                     onAction={this.handleActionNameChange.bind(this, index)}
                                                                     onDescription={this.handleActionDescriptionChange.bind(this, index)}
                                                                     onRemove={this.removeAction}/>
                                                                     );
        return(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                   <form onSubmit={this.handleSubmit}>
                       <input name="projectName" type="text" value={this.state.projectName} onChange={this.handleChange}/>
                       <select name="projectStatus" onChange={this.handleStatusSelect}>
                           {statusList}
                       </select>
                       <button type="button" onClick={this.addAction}>Add Action</button>
                       <div id="action-holder">
                           {actionsList}
                       </div>
                       <input type="submit" value="Create"/>
                   </form>
                </Modal>
                <div>{lineItem.note}</div>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="two-minute">O</button>
                <button value={lineItem.inboxId} onClick={this.showModal} className="button" id="project-candidate">T</button>
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
