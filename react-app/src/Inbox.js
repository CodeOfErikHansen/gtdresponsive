import React from "react";

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            stuffList: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        fetch('http://localhost:8080/inbox', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            return response.json();
            }
        ).then(data => {
            const rendered = data.reverse();
            this.setState({stuffList: rendered});

        })
    }

    handleChange(e) {
        this.setState({note: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8080/inbox', {
            method: 'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"note":this.state.note})
        }).then(() => {fetch('http://localhost:8080/inbox', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
                return response.json();
            }
        ).then(data => {
            const rendered = data.reverse();
            this.setState({stuffList: data,
            note: ''});

        })})

    }


    render() {
        const stuffList = this.state.stuffList.map((note) => <div key={note.id}>{note.note}</div>)
        return (
            <div id="inbox">
                <div id="stuff-list">{stuffList}</div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input autoFocus id="stuff-entry" type="text" value={this.state.note} onChange={this.handleChange} />
                </label>
                <input hidden type="submit" value="submit"/>
            </form>
            </div>
        )
    }
}
export default Inbox;
