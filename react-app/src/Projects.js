import React from 'react';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }
    async componentDidMount(){
        fetch('http://localhost:8080/projects', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(data => this.setState({projects: data}))
    }
    render() {
        return (
            <>
            {
                this.state.projects.length > 0 &&
                    <div>{this.state.projects[0].projectName}</div>
            }
            </>
        )
    }
}
export default Projects
