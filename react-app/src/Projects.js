import React from 'react';
import Action from "./Action";
import { sortActions } from "./helper";


class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            show: false,
            statusList: [],
            contexts: [],
            actions: [],
            name: '',
            description: '',
            id: '',
            status: ''
        }
    }
    async componentDidMount(){
        fetch('http://localhost:8080/projects', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(data => this.setState({projects: data}))

        fetch('http://localhost:8080/status',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({
                statusList: data.filter((item) => item.name !== 'Inbox' && item.name !== 'Archive'),
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
    showModal = (e) => {
        const project = this.state.projects.filter(project => project.projectId == e.target.value);
        this.setState({
            show:true,
            actions: sortActions(project[0].projectActions),
            name: project[0].projectName,
            description: project[0].projectSummary,
            id: project[0].projectId,
            status: project[0].status,
        })
    };
    hideModal = (e) => {
        this.setState({
            show:false,
            actions: [],
            name: '',
            description: '',
            id: '',
            status: ''
        })
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
    handleActionSortChange = (i, e) => {
        e.preventDefault();
        let actions = [...this.state.actions];
        if(e.target.value === '1'){
            actions[i].sortOrder -= 1;
            actions[i-1].sortOrder += 1;
        }
        if(e.target.value === '-1'){
            actions[i].sortOrder += 1;
            actions[i+1].sortOrder -= 1;
        }

        this.setState({
            actions: sortActions(actions),
        })
    };


    addAction = () => {
        const newAction = {
            actionTitle: '',
            actionDescription: '',
            context: '',
            sortOrder: this.state.actions.length+1
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

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/projects', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "projectId":this.state.id,
                    "projectName":this.state.name,
                    "projectSummary":this.state.description,
                    "status":this.state.status,
                    "projectActions":this.state.actions,
                }
            )
        }).then((res) => {
                if(res.ok){
                    const project = {
                        projectId: this.state.id,
                        projectName: this.state.name,
                        projectSummary: this.state.description,
                        status: this.state.status,
                        projectActions: this.state.actions,
                    };
                    let projects = [...this.state.projects];
                    let index =-1;
                    for(let i =0; i < projects.length; i++){
                        if(projects[i].projectId === project.projectId){
                            index = i;
                        }
                    }
                    projects[index] = project;
                    this.setState({
                        show: false,
                        actions: [],
                        name: '',
                        description: '',
                        projects: projects,
                        id: '',
                        status: '',
                    })
                }
            }
        )
    };


    render() {
        const projectList = this.state.projects.map(project => {
           return(
               <div className="project" key={project.projectId}>
                <h4>Project: {project.projectName}</h4>
                   <button  value={project.projectId} onClick={this.showModal}>Edit</button>
                <p>About: {project.projectSummary}</p>
                   {sortActions(project.projectActions).map(action => {
                       return(
                           <div className="action" key={action.sortOrder}>
                               <h5>Task: {action.actionTitle}</h5>

                               <h6> Context: {action.context.contextName}</h6>
                               <p>Action needed: {action.actionDescription}</p>
                           </div>
                       )
                   })}
               </div>
           )});
        const statusList = this.state.statusList.map((type, index) => <option key={type.statusId} value={index}>{type.name}</option>)
        const actionsList = this.state.actions.map((action, index) => <Action key={index}
                                                                              context={this.state.contexts}
                                                                              action={action}
                                                                              onSelect={this.handleContextSelect.bind(this, index)}
                                                                              onAction={this.handleActionNameChange.bind(this, index)}
                                                                              onDescription={this.handleActionDescriptionChange.bind(this, index)}
                                                                              onRemove={this.removeAction.bind(this, index)}
                                                                              onSortChange={this.handleActionSortChange.bind(this, index)}
                                                                              length={this.state.actions.length}
            />
        );

        return (
            <>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <form onSubmit={this.handleSubmit}>
                        <input name="name" type="text" value={this.state.name}
                               onChange={this.handleChange}/>

                        <textarea name="description" rows="4" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        <div>
                            <select name="status" onChange={this.handleStatusSelect}>
                                {statusList}
                            </select>

                            <button type="button" onClick={this.addAction}>Add Action</button>
                            <div id="action-holder">
                                {actionsList}
                            </div>
                        </div>
                        <input type="submit"   value="Edit"/>
                    </form>
                </Modal>

                {projectList}

            </>
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
export default Projects
