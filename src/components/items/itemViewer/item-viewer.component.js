import React, { Component } from "react";
import "./item-viewer.component.scss";
import DialogModal from "../../../modals/dialogModal/dialog-modal";
import TextareaModal from "../../../modals/textareaModal/textarea-modal";
import { ItemsApi } from "../../../api/items.api";

const itemsApi = new ItemsApi();
export default class ItemViewerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            suppliers: this.parseSuppliers(this.props.item.suppliers),
            priceReduction: this.parsePriceReductions(this.props.item.priceReductions),
            dialogModalOpen: false,
            textAreamodalOpen: false,
            modalType: ''
        }
    }
    role = localStorage.getItem("role");
    id = localStorage.getItem("id");

    parseSuppliers = (suppliers) => {
        if (suppliers.length < 1) {
            return null;
        }
        let suppliersList = '';
        for (const supplier of suppliers) {
          suppliersList = suppliersList.concat(supplier.name + ', ');
        }
        return suppliersList.substring(0, suppliersList.length - 2);
    }

    parsePriceReductions = (priceReductions) => {
        if (priceReductions.length < 1) {
            return null;
        }
        let date = new Date();
        for (const priceReduction of priceReductions) {
            let start = new Date(priceReduction.startDate);
            let end = new Date(priceReduction.endDate);
            if (date >= start && date <= end) {
                return priceReduction.reducedPrice;
            }
        }
        return null;
    }

    modalAction = (text) => {
        switch (this.state.modalType) {
            case 'deactivateItem':
                this.deactivateItem(text);
                break;
            case 'deleteItem':
                this.deleteItem();
                break;
            default:
        }
    }

    deactivateItem = (text) => {
        const itemDeactivator = {
            itemId: this.state.item.id,
            userId: this.id,
            reason: text
        }
        itemsApi.deactivateItem(itemDeactivator).then(() => {
            window.location.href = "/items";
        }).catch((error) => {
            console.log(error)
            if (error.response?.status === 400) {
                console.log('Bad request')
            }
            if (error.response?.status === 401) {
                window.location.href = "/login";
            }
            if (error.response?.status === 404) {
                console.log('Item or user not found')
            }
        })
    }

    deleteItem = () => {
        itemsApi.deleteItemByItemCode(this.state.item.itemCode).then(() => {
            window.location.href = "/items";
        }).catch((error) => {
            console.log(error)
            if (error.response?.status === 401) {
                window.location.href = "/login";
            }
            if (error.response?.status === 403) {
                console.log('No eres administrador');
            }
            if (error.response?.status === 404) {
                this.setState({existingItemCodeError: true})
            }
        })
    }

    editItem = () => {
        this.props.editItem(this.state.item);
    }

    setModal = (boolean) => {
        this.setState({dialogModalOpen: boolean, textAreamodalOpen: false, modalType: ''});
    }

    render() {
        return(
            <div className="item-viewer">
                <div className="button-wrapper">
                    <button className="action-button" onClick={this.editItem.bind(this)}>Edit</button>
                    {this.state.item.state === "ACTIVE" ?
                      <button className="action-button" onClick={() => this.setState({
                          textAreamodalOpen: true,
                          modalType: 'deactivateItem'
                      })}>Deactivate</button>
                    : null }
                    {this.role === "ADMIN" ?
                        <button className="action-button" 
                            onClick={() => this.setState({dialogModalOpen: true, modalType: 'deleteItem'})}>Delete
                        </button> : null}
                </div>
                <div className="item-header">
                    <div className="header-first-line">
                        <h2>{this.state.item.itemCode}</h2>
                        <h4>
                            { this.state.priceReduction != null ?
                            <span>
                                <span className="original-price">{this.state.item.price}</span>
                                {this.state.item.price - this.state.priceReduction}€
                            </span> :
                            this.state.item.price }
                        </h4>
                    </div>
                    <span className="creator">{this.state.item.creator.username}</span>
                </div>
                <div className="description-wrapper">
                    <span>{this.state.item.description}</span>
                    { this.state.suppliers != null ? <span>Suppliers: {this.state.suppliers}</span> : null }
                </div>
                <span>{this.state.item.state}</span>
                {this.state.dialogModalOpen && 
                    <DialogModal modalType={this.state.modalType} setOpenModal={this.setModal} confirm={this.modalAction} />}
                {this.state.textAreamodalOpen && 
                    <TextareaModal modalType={this.state.modalType} setOpenModal={this.setModal} confirm={this.modalAction} />}
            </div>
        )
   }
}
