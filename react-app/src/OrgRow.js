import React from 'react';

class OrgRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <div>{this.props.stuff.note}</div>
                <div>C</div>
                <div>T</div>
                <div>A</div>
                <div>D</div>
                <div>V</div>

            </div>
        )
    }
}
export default OrgRow
