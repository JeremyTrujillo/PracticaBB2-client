import { Component } from "react";
import "./item-viewer.component.scss";
export default class ItemViewer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            suppliers: this.parseSuppliers(this.props.item.suppliers),
            priceReduction: this.parsePriceReductions(this.props.item.priceReductions)
        }
    }

    parseSuppliers = (suppliers) => {
        let suppliersList = '';
        for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i];
            suppliersList = suppliersList.concat(supplier.name + ', ');
        }
        return suppliersList.substring(0, suppliersList.length - 2);
    }

    parsePriceReductions = (priceReductions) => {
        if (priceReductions.length < 1) {
            return null;
        }
        let date = new Date();
        console.log(date)
        for (let i = 0; i < priceReductions.length; i++) {
            const priceReduction = priceReductions[i];
            console.log(priceReduction)
            let start = new Date(priceReduction.startDate);
            let end = new Date(priceReduction.endDate);
            if (date >= start && date <= end) {
                return priceReduction.reducedPrice;
            }
        }
        return 0;
    }

    changeURL = (url) => {
        window.location.href = url + "/" + this.state.item.id;
      }

    render() {
        return(
            <div className="item-viewer">
                <div className="button-wrapper">
                    <button className="action-button" onClick={this.changeURL.bind(this, "/items/edit/")}>Edit</button>
                </div>
                <div className="item-header">
                    <div className="header-first-line">
                        <h2>{this.state.item.itemCode}</h2>
                        <h4>
                            { this.state.priceReduction != null ?
                            <span><span className="original-price">{this.state.item.price}</span> {this.state.item.price - this.state.priceReduction}€</span> :
                            this.state.item.price}
                        </h4>
                    </div>
                    <span className="creator">{this.state.item.creator.username}</span>
                </div>
                <div className="description-wrapper">
                    <span>{this.state.item.description}</span>
                    <span>Suppliers: {this.state.suppliers}</span>
                </div>
                <span>{this.state.item.state}</span>
                
            </div>
        )
   }
}