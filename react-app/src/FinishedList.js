import React from 'react'

class FinishedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolvedItems: [],
        }
    }

    async componentDidMount() {
        fetch('http://localhost:8080/'+this.props.version, {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
                return response.json();
            }
        ).then(data => {
            this.setState({resolvedItems: data});

        })
    }

    render() {
        const resolvedList = this.state.resolvedItems.map((note) => <div key={note.inboxId}>{note.note}</div>)

        return (
            <div>{resolvedList}</div>
        )
    }
}
export default FinishedList;
