import React from 'react'

class FinishedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolvedItems: [],
            trashedRecords: [],
        }
    }

    async componentDidMount() {
        fetch('http://localhost:8080/' + this.props.version, {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
                return response.json();
            }
        ).then(data => {
            this.setState({resolvedItems: data});

        })
        if (this.props.version == 'X') {

            fetch('http://localhost:8080/record/' + this.props.version, {
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
            }).then((response) => {
                    return response.json();
                }
            ).then(data => {
                this.setState({trashedRecords: data});

            })
        }

    }

    render() {
        const resolvedList = this.state.resolvedItems.map((note) => <div key={note.inboxId}>{note.note}</div>)
        const trashedRecords = this.state.trashedRecords.map(record => <div key={record.id}>{record.recordName} <br/> {record.recordBody}</div>)

        return (
            <div>
                <div>
                    {resolvedList}
                </div>
                <div>
                    {trashedRecords}
                </div>
            </div>

        )
    }
}
export default FinishedList;
