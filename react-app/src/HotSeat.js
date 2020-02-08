import React from "react";
import {sortActions} from "./helper";

class HotSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            statusList:[],
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
    }
    finishAction = (ai,ti,pi,e) => {
        e.preventDefault();
        let project = this.state.projects[pi];
        const status = e.target.value === 'O' ? this.state.statusList.filter((status) => status.name === 'Complete')[0] : this.state.statusList.filter((status) => status.name === 'Trashed')[0];
        project.projectTracks[ti].trackActions[ai].status = status;
        for(let action of project.projectTracks[ti].trackActions){
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
            project.projectTracks[ti].trackActions.shift();
            projects[pi] = project;
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
                    { project.projectTracks.map((track, trackIndex) => {
                        return(
                            <div>
                                {sortActions(track.trackActions.filter(action => action.status.name == 'On Deck'), 3).map((action, actionIndex) => {
                                    return(
                                        <div className="action" key={action.sortOrder}>
                                            <h5>Task: {action.actionTitle}</h5>
                                            {action.sortOrder ===1 && <button  value="O" onClick={this.finishAction.bind(this,actionIndex, trackIndex, projectIndex)}>Complete</button>}
                                            {action.sortOrder ===1 && <button value="X" onClick={this.finishAction.bind(this,actionIndex, trackIndex, projectIndex)}>Trash</button>}
                                            <h6> Context: {action.context.contextName}</h6>
                                            <p>Action needed: {action.actionDescription}</p>
                                        </div>
                                    )
                                }
                                )
                                }
                            </div>
                )
                })}

                </div>
            )});
        return (<div>{projectList}</div>)
    }
}
export default HotSeat;
