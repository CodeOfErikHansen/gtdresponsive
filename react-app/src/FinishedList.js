import React from 'react'

class FinishedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolvedItems: [],
            trashedRecords: [],
            projects: [],
        }
    }

    async componentDidMount() {
        fetch('http://localhost:8080/complete/stuff', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
                return response.json();
            }
        ).then(data => {
            this.setState({resolvedItems: data});

        });

        fetch('http://localhost:8080/complete/record', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            return response.json();
        }
        ).then(data => {
            this.setState({trashedRecords: data});
        })

        fetch('http://localhost:8080/complete/projects', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(data => this.setState({projects: data}))
    }

    render() {
        const resolvedList = this.state.resolvedItems.map((note) => {
            return(
                <div>
                    {note.status.name === 'Complete' && <div key={note.inboxId} className='complete'>{note.note} </div>}
                    {note.status.name === 'Trashed' && <div key={note.inboxId} className='trashed'>{note.note} </div>}
                </div>
            )
        });
        const trashedRecords = this.state.trashedRecords.map(record => {
            return <div key={record.id} className="complete">{record.recordName} <br/> {record.recordBody}</div>
        });
        const projectList = this.state.projects.map(project => {
            return (
                    <div>
                        {
                            project.projectTracks.map(track => {
                                return(
                                    <div>
                                        {
                                            track.trackActions.map(action => {
                                                return(
                                                    <div>
                                                        { action.status.name === 'Complete' &&
                                                            <div className="complete">
                                                                {project.projectName} : {track.trackName} : {action.actionTitle}
                                                            </div>
                                                        }
                                                        {action.status.name === 'Trashed' &&
                                                            <div className="trashed">
                                                                {project.projectName} : {track.trackName} : {action.actionTitle}
                                                            </div>
                                                        }
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                )
        });
        return (
            <div>
                <div>
                    {resolvedList}
                </div>
                <div>
                    {trashedRecords}
                </div>
                <div>
                    {projectList}
                </div>
            </div>

        )
    }
}
export default FinishedList;
