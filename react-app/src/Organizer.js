import React from 'react'
import OrgRow from './OrgRow'
class Organizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stuffList: [],
        };
        this.handleOrganizerClick = this.handleOrganizerClick.bind(this);
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
    handleOrganizerClick(e){
            fetch('http://localhost:8080/'+e.target.innerText+'/'+e.target.value, {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
            }).then(() => {
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
            })
        }

    render(){
            const stuffList = this.state.stuffList.map((note) => <OrgRow key={note.inboxId} stuff={note} organizerClick={this.handleOrganizerClick}/>)

        return(
            <div id="organizer">
                {stuffList}
            </div>
        )
    }
}
export default Organizer

