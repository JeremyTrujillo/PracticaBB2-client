import { Component } from "react";

export default class ItemViewer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }

    render() {
        return(
            <div className="item-viewer">
                <li key = {this.state.item.id}>
                <ul>
                    <li>{this.state.item.id}</li>
                    <li>{this.state.item.itemCode}</li>
                    <li>{this.state.item.description}</li>
                    <li>{this.state.item.price}</li>
                </ul>
                </li>
            </div>
        )
    }
}