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
            tracks: [{
                trackName: '',
                trackActions: [
                    {
                        actionTitle: '',
                        actionDescription: '',
                        context: '',
                        sortOrder: 1,
                        status: '',
                    }
                ]
            }],
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
        });

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
            tracks: project[0].projectTracks,
            name: project[0].projectName,
            description: project[0].projectSummary,
            id: project[0].projectId,
            status: project[0].status,
        })
    };
    hideModal = (e) => {
        this.setState({
            show:false,
            tracks: [],
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
    handleContextSelect = (i,ti, e) => {
        let tracks = [...this.state.tracks];
        tracks[ti].trackActions[i].context = this.state.contexts[e.target.value-1];
        this.setState({
            tracks: tracks,
        })
    };

    handleActionNameChange = (i,ti, e) => {
        let tracks = [...this.state.tracks];
        tracks[ti].trackActions[i].actionTitle = e.target.value;
        this.setState({
            tracks: tracks,
        })
    };

    handleActionDescriptionChange = (i,ti, e) => {
        let tracks = [...this.state.tracks];
        tracks[ti].trackActions[i].actionDescription = e.target.value;
        this.setState({
            tracks: tracks,
        })
    };
    handleActionSortChange = (i,ti, e) => {
        e.preventDefault();
        let tracks = [...this.state.tracks];
        if(e.target.value === '1'){
            tracks[ti].trackActions[i].sortOrder -= 1;
            tracks[ti].trackActions[i-1].sortOrder += 1;
        }
        if(e.target.value === '-1'){
            tracks[ti].trackActions[i].sortOrder += 1;
            tracks[ti].trackActions[i+1].sortOrder -= 1;
        }
        const actions = sortActions(tracks[ti].trackActions);
        tracks[ti].trackActions = actions;
        this.setState({
            tracks: tracks,
        })
    };


    addAction = (ti) => {
        const newAction = {
            actionTitle: '',
            actionDescription: '',
            context: '',
            sortOrder: this.state.tracks[ti].trackActions.length+1,
            status: ''
        };
        const tracks = [...this.state.tracks];
        tracks[ti].trackActions.push(newAction)
        this.setState({
            tracks: tracks,
        })
    };
    removeAction = (ai, ti) => {
        const tracks = [...this.state.tracks];
        tracks[ti].trackActions.splice(ai,1);
        this.setState({tracks: tracks});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let tracks = [...this.state.tracks];
        let actions;
        for(let i=0; i<tracks.length;i++){
            actions = [...this.state.tracks[i].trackActions];
            for(let j =0; j < actions.length; j++){
                actions[j].status = this.state.status;
            }
        }
        this.setState({
            tracks: tracks,
        });
        fetch('http://localhost:8080/projects', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "projectId":this.state.id,
                    "projectName":this.state.name,
                    "projectSummary":this.state.description,
                    "status":this.state.status,
                    "projectTracks":this.state.tracks,
                }
            )
        }).then((res) => {
                if(res.ok){
                    const project = {
                        projectId: this.state.id,
                        projectName: this.state.name,
                        projectSummary: this.state.description,
                        status: this.state.status,
                        projectTracks: this.state.tracks,
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
    handleTrackNameChange = (ti, e) => {
        let tracks = [...this.state.tracks];
        tracks[ti].trackName = e.target.value;
        this.setState({
            tracks: tracks,
        })
    };
    addTrack = () => {
        const newTrack = {
            trackName: '',
            trackActions: [
                {
                    actionTitle: '',
                    actionDescription: '',
                    context: '',
                    sortOrder: 1,
                    status: ''
                }
            ]
        };
        this.setState({tracks: [...this.state.tracks, newTrack]});
    };
    trackRemove = (ti) => {
        const tracks = [...this.state.tracks];
        tracks.splice(ti, 1);
        this.setState({tracks: tracks});
    };
    createContext = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/context', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"contextName": this.state.contextName})
            }
        ).then((res) => {
            if(res.ok){
                return res.json();
            }
        }).then((data)=> {
            this.setState({
                contexts: [...this.state.contexts, data],
                contextName: '',
            })
        });
    };
    handleContextChange = (e) => {
        this.setState({contextName: e.target.value})
    };


    render() {
        const projectList = this.state.projects.map(project => {
           return(
               <div className="project" key={project.projectId}>
                <h2>Project: {project.projectName}</h2>
                   <button  value={project.projectId} onClick={this.showModal}>Edit</button>
                   <p>About: {project.projectSummary}</p>
                   { project.projectTracks.map(track => {
                       return(
                           <div>
                               <h3>Track Name {track.trackName}</h3>
                               {sortActions(track.trackActions).map(action => {
                                   return(
                                       <div className="action" key={action.sortOrder}>
                                           <h4>Task: {action.actionTitle}</h4>

                                           <h5> Context: {action.context.contextName}</h5>
                                           <p>Action needed: {action.actionDescription}</p>
                                       </div>
                                   )
                               })}
                           </div>
                       )
                   })
                   }
               </div>
           )});
        const statusList = this.state.statusList.map((type, index) => <option key={type.statusId} value={index}>{type.name}</option>)
        const trackList = this.state.tracks.map((track, trackIndex) => {
            return (
                <>
                    <label>
                        Name:
                        <input type="text" name="trackName" value={track.trackName} onChange={this.handleTrackNameChange.bind(this, trackIndex)}/>
                    </label>
                    <button onClick={this.trackRemove.bind(this, trackIndex)}>Remove Track</button>
                    <button type="button" onClick={this.addAction.bind(this, trackIndex)}>Add Action</button>
                    {sortActions(track.trackActions).map((action, index) => <Action key={index}
                                                                                    context={this.state.contexts}
                                                                                    action={action}
                                                                                    onSelect={this.handleContextSelect.bind(this, index, trackIndex)}
                                                                                    onAction={this.handleActionNameChange.bind(this, index, trackIndex)}
                                                                                    onDescription={this.handleActionDescriptionChange.bind(this, index, trackIndex)}
                                                                                    onRemove={this.removeAction.bind(this, index, trackIndex)}
                                                                                    onSortChange={this.handleActionSortChange.bind(this, index, trackIndex)}
                                                                                    length={track.trackActions.length}

                        />
                    )};}
                </>
            )
        });

        return (
            <>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <form onSubmit={this.createContext}>
                        <input name="context-creator" type="text" value={this.state.contextName} onChange={this.handleContextChange}/>
                        <input type="submit" value="Add Context"/>
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <input name="name" type="text" value={this.state.name}
                               onChange={this.handleChange}/>

                        <textarea name="description" rows="4" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        <div>
                            <select name="status" onChange={this.handleStatusSelect}>
                                {statusList}
                            </select>

                            <button type="button" onClick={this.addTrack}>Add Track</button>
                            <div id="action-holder">
                                {trackList}
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
