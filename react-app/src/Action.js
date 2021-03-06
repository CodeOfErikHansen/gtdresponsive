import React from 'react'

class Action extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const contextOptions = this.props.context.map((context) =>{
            return(
                    <option key={context.contextId} value={context.contextId}>{context.contextName}</option>
            )}
    );
        return <div>
            <label>
                Action:
                <input type="text" name="actionTitle" value={this.props.action.actionTitle} onChange={this.props.onAction}/>
            </label>
            <label>
                Clarification:
                <input type="text" name = "actionDescription" value={this.props.action.actionDescription} onChange={this.props.onDescription}/>
            </label>
            <select defaultValue={this.props.action.context.contextId} onChange={this.props.onSelect}>
                {contextOptions}
            </select>
            {this.props.action.sortOrder !== 1 && <button onClick={this.props.onSortChange} value="1">+</button>}
            {this.props.action.sortOrder !== this.props.length && <button onClick={this.props.onSortChange} value="-1">-</button>}
            <button onClick={this.props.onRemove}>X</button>
        </div>
    }
}
export default Action;
