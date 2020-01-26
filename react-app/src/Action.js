import React from 'react'

class Action extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const contextOptions = this.props.context.map((context) =>
            <option key={context.contextId} value={context.contextId}>{context.contextName}</option>)
        return <div>
            <label>
                Name:
                <input type="text" name="actionTitle" value={this.props.action.actionTitle} onChange={this.props.onChange}/>
            </label>
            <label>
                Desciption:
                <input type="text" name = "actionDescription" value={this.props.action.actionDescription} onChange={this.props.onChange}/>
            </label>
            <select value={this.props.context.contextId} onChange={this.props.onSelect}>
                {contextOptions}
            </select>
        </div>
    }
}
export default Action;
