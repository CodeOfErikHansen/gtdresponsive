import React from "react";
import {sortActions} from "./helper";

class HotSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            statusList: [],
            contexts: [],
        }
    }
    async componentDidMount(){
        fetch('http://localhost:8080/hotseat', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(data => this.setState({projects: data}));

        fetch('http://localhost:8080/status',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({
                statusList: data.filter((item) => item.name !== 'Inbox' && item.name !== 'Archive'),
            })
        });

        fetch('http://localhost:8080/contexts',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({contexts: data})
        })
    }
    finishAction = (ai,pi,e) => {
        e.preventDefault();
        let project = this.state.projects[pi];
        const status = e.target.value === 'O' ? this.state.statusList.filter((status) => status.name === 'Complete')[0] : this.state.statusList.filter((status) => status.name === 'Trashed')[0];
        project.projectActions[ai].status = status;
        for(let action of project.projectActions){
            action.sortOrder -= 1;
        }
        fetch('http://localhost:8080/hotseat/'+e.target.value, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
        }).then(res => {
                return res.json()
        }).then(data => {
            let projects = [...this.state.projects];
            project = data;
            project.projectActions.shift();
            projects[pi] = project;
            debugger
            this.setState({
                projects: projects,
            })
        })
    };
    render() {
        const projectList = this.state.projects.map((project, projectIndex) => {
            return(
                <div className="project" key={project.projectId}>
                    <h4>Project: {project.projectName}</h4>
                    {sortActions(project.projectActions.filter(action => action.status.name == 'On Deck'), 3).map((action, actionIndex) => {
                        return(
                            <div className="action" key={action.sortOrder}>
                                <h5>Task: {action.actionTitle}</h5>
                                {action.sortOrder ===1 && <button  value="O" onClick={this.finishAction.bind(this,actionIndex, projectIndex)}>Complete</button>}
                                {action.sortOrder ===1 && <button value="X" onClick={this.finishAction.bind(this,actionIndex, projectIndex)}>Trash</button>}
                                <h6> Context: {action.context.contextName}</h6>
                                <p>Action needed: {action.actionDescription}</p>
                            </div>
                        )
                    })}
                </div>
            )});
        return (<div>{projectList}</div>)
    }
}
export default HotSeat;
