import React from 'react';
import Action from './Action'

class OrgRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modalType: '',
            name: this.props.stuff.note,
            description: '',
            status: '',
            recordStatus: '',
            statusList: [],
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
            this.setState({
                statusList: data.filter((item) => item.name == 'On Deck' || item.name == 'Someday'),
                recordStatus: data.filter(status => status.name == 'Archive')
            })
        })

        fetch('http://localhost:8080/contexts',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({contexts: data})
        })
    }

    showProjectModal = (e) => {
        this.setState({
            show: true,
            modalType: 'project',
        });
    };

    showRecordModal = (e) => {
        this.setState({
            show: true,
            modalType: 'record',
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
        if(this.state.modalType == 'project') {
            fetch('http://localhost:8080/projects', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        "projectName": this.state.name,
                        "projectSummary": this.state.description,
                        "status": this.state.status,
                        "projectActions": this.state.actions,
                    }
                )
            }).then((res) => {
                    if (res.ok) {
                        this.props.modalClick(this.props.stuff.inboxId)
                    }
                }
            )
        }

        if(this.state.modalType == 'record') {
            fetch('http://localhost:8080/records', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        "recordName": this.state.name,
                        "recordBody": this.state.description,
                        "status": this.state.recordStatus[0],
                    }
                )
            }).then((res) => {
                    if (res.ok) {
                        this.props.modalClick(this.props.stuff.inboxId)
                    }
                }
            )
        }
    };
    handleChange = (e) => {
      this.setState({
          name: e.target.value,
      })
    };
    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value,
        })
    };
    handleStatusSelect = (e) => {
        this.setState({
            status: this.state.statusList[e.target.value],
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
        const statusList = this.state.statusList.map((type, index) => <option key={type.statusId} value={index}>{type.name}</option>)
        const actionsList = this.state.actions.map((action, index) => <Action key={index}
                                                                    context={this.state.contexts}
                                                                     action={action}
                                                                     onSelect={this.handleContextSelect.bind(this, index)}
                                                                     onAction={this.handleActionNameChange.bind(this, index)}
                                                                     onDescription={this.handleActionDescriptionChange.bind(this, index)}
                                                                     onRemove={this.removeAction.bind(this, index)}/>
                                                                     );
        return(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>

                        <form onSubmit={this.handleSubmit}>
                            <input name="name" type="text" value={this.state.name}
                                   onChange={this.handleChange}/>

                            <textarea name="description" rows="4" value={this.state.description} onChange={this.handleDescriptionChange}/>
                            {this.state.modalType == 'project' ?
                                <div>
                                <select name="status" onChange={this.handleStatusSelect}>
                                    {statusList}
                                </select>

                                    <button type="button" onClick={this.addAction}>Add Action</button>
                                    <div id="action-holder">
                                        {actionsList}
                                    </div>
                                </div>
                                : <></>
                            }
                            <input type="submit" value="Create"/>
                        </form>

                    }
                </Modal>
                <div>{lineItem.note}</div>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="two-minute">O</button>
                <button value={lineItem.inboxId} onClick={this.showProjectModal} className="button" id="project-candidate">T</button>
                <button value={lineItem.inboxId} onClick={this.showRecordModal} className="button" id="archive">R</button>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="discard">X</button>
            </div>
        )
    }
}

/*
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
