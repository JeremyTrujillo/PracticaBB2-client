import { useState } from "react";
import DialogModal from "../../../../modals/dialogModal/dialog-modal";

export default function ItemSuppliersEditor(props) {
    const [newSupplierForm, setNewSupplierForm] = useState(false);
    const [newSupplierName, setNewSupplierName] = useState('');
    const [newSupplierCountry, setNewSupplierCountry] = useState('');
    const [newSupplierNameEmpty, setNewSupplierNameEmpty] = useState(false);
    const [newSupplierCountryEmpty, setNewSupplierCountryEmpty] = useState(false);
    const [dialogModalOpen, setDialogModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);

    let suppliers = props.suppliers;
    function addSupplier() {
        if (!newSupplierName) {
            setNewSupplierNameEmpty(true);
        }
        if (!newSupplierCountry) {
            setNewSupplierCountryEmpty(true);
        }
        if (!newSupplierName || !newSupplierCountry) {
            return;
        }
        const newSupplier = {
            'name': newSupplierName,
            'country': newSupplierCountry
        }
        suppliers.push(newSupplier);
        setNewSupplierForm(false);
    }

    function deleteSupplier() {
        const newSuppliers = suppliers.filter((supplier) => supplier !== supplierToDelete);
        suppliers = newSuppliers;
        setDialogModalOpen(false);
    }

    function toggleSupplierForm() {
        setNewSupplierForm(!newSupplierForm);
        setNewSupplierNameEmpty(false);
        setNewSupplierCountryEmpty(false);
    }

    function setSupplierName(value) {
        setNewSupplierName(value);
        setNewSupplierNameEmpty(false);
    }
 
    function setSupplierCountry(value) {
        setNewSupplierCountry(value);
        setNewSupplierCountryEmpty(false);
    }

    function setModal(boolean) {
        setDialogModalOpen(boolean);
    }

    function openModal(supplier) {
        setDialogModalOpen(true);
        setSupplierToDelete(supplier);
    }
 
    return(
        <div className="suppliers">
            <h4>Suppliers</h4>
            <ul className="suppliers-list">
              {
                suppliers?.map(supplier => <li key={supplier.id}>
                  <span>{supplier.name + ' (' +  supplier.country + ')'}</span>
                  <button onClick={() => openModal(supplier)}>Delete</button>
                </li>)
              }
              </ul>
            <button onClick={toggleSupplierForm}>New supplier</button>
            { newSupplierForm ? 
                <div className="new-supplier">
                    <input type="text" placeholder="Name..." onChange={event => setSupplierName(event.target.value)}/>
                    { newSupplierNameEmpty ? <span className="error">Name is empty</span> : null }
                    <input type="text" placeholder="Country..."  onChange={event => setSupplierCountry(event.target.value)}/>
                    { newSupplierCountryEmpty ? <span className="error">Country is empty</span> : null }
                    <button className="action-button form-button" onClick={addSupplier}>Create</button>
                </div> : null
            }
            { dialogModalOpen && 
                    <DialogModal modalType={'deleteSupplier'} setOpenModal={setModal} confirm={deleteSupplier} />}
        </div>
    )
}