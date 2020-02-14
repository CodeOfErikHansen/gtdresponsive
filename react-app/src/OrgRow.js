import React from 'react';
import Action from './Action'
import { sortActions} from "./helper";

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
            tracks: [
                {trackActions: [
                    {
                        actionTitle: '',
                        actionDescription: '',
                        context: '',
                        sortOrder: 1,
                        status: ''
                    },
                ],
                trackName: '',}],


        }
    }

    async componentDidMount(){
        fetch('http://localhost:8080/status',{
            method: 'GET',
        }).then((response => {
            return response.json();
        })).then(data => {
            this.setState({
                statusList: data.filter((item) => item.name === 'On Deck' || item.name === 'Someday'),
                recordStatus: data.filter(status => status.name === 'Archive'),
                status: data.filter(item => item.name === 'On Deck')[0],
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
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        "projectName": this.state.name,
                        "projectSummary": this.state.description,
                        "status": this.state.status,
                        "projectTracks": this.state.tracks,
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
    handleTrackNameChange = (ti, e) => {
        let tracks = [...this.state.tracks];
        tracks[ti].trackName = e.target.value;
        this.setState({
            tracks: tracks,
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
        debugger
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
            status: '',
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

    addTrack = () => {
       const newTrack = {
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
       };
       this.setState({tracks: [...this.state.tracks, newTrack]});
    };
    trackRemove = (ti) => {
        const tracks = [...this.state.tracks];
        tracks.splice(ti, 1);
        this.setState({tracks: tracks});
    };

    render(){
        const lineItem = this.props.stuff;
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
        return(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>

                        <form onSubmit={this.handleSubmit}>
                            <input name="name" type="text" value={this.state.name}
                                   onChange={this.handleChange}/>

                            <textarea name="description" rows="4" value={this.state.description} onChange={this.handleDescriptionChange}/>
                            {this.state.modalType == 'project' ?
                                <div>
                                <select name="status" value={this.state.status} onChange={this.handleStatusSelect}>
                                    {statusList}
                                </select>
                                    <button type="button" onClick={this.addTrack}>Add Track</button>
                                    <div id="action-holder">
                                        {trackList}
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
