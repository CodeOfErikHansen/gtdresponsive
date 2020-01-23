import React from 'react';

class OrgRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const lineItem = this.props.stuff;
        return(
            <div>
                <div>{lineItem.note}</div>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="two-minute">O</button>
                <button value={lineItem.inboxId} className="button" id="project-candidate">T</button>
                <button value={lineItem.inboxId} className="button" id="wish-list">S</button>
                <button value={lineItem.inboxId} className="button" id="archive">R</button>
                <button value={lineItem.inboxId} onClick={this.props.organizerClick} className="button" id="discard">X</button>
            </div>
        )
    }
}
export default OrgRow
