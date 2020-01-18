import React from 'react'
import OrgRow from './OrgRow'
class Organizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stuffList: [],
        };

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
            this.setState({stuffList: data});
        })
    }
    //todo The line item should be a component that I repeat each time for the list
    render(){
        const stuffList = this.state.stuffList.map((note) => <OrgRow key={note.inboxId} stuff={note}/>)
        return(
            <div id="organizer">
                {stuffList}
            </div>
        )
    }
}
export default Organizer

