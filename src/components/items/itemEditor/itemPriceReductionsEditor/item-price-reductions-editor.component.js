import { useState } from "react";
import DialogModal from "../../../../modals/dialogModal/dialog-modal";

export default function ItemPriceReductionsEditor(props) {
    const [newPriceReductionForm, setNewPriceReductionForm] = useState(false);
    const [newPriceReductionReducedPrice, setNewPriceReductionReducedPrice] = useState(0);
    const [newPriceReductionStartDate, setNewPriceReductionStartDate] = useState(null);
    const [newPriceReductionEndDate, setNewPriceReductionEndDate] = useState(null);
    const [newPriceReductionReducedPriceEmpty, setNewPriceReductionReducedPriceEmpty] = useState(false);
    const [newPriceReductionStartDateEmpty, setNewPriceReductionStartDateEmpty] = useState(false);
    const [newPriceReductionEndDateEmpty, setNewPriceReductionEndDateEmpty] = useState(false);
    const [newPriceReductionDateConflict, setNewPriceReductionDateConflict] = useState(false);
    const [dialogModalOpen, setDialogModalOpen] = useState(false);
    const [priceReductionToDelete, setPriceReductionToDelete] = useState(null);
 
    let priceReductions = props.priceReductions;

    function addPriceReduction () {
        if (!newPriceReductionReducedPrice) {
            setNewPriceReductionReducedPriceEmpty(true);
        }
        if (!newPriceReductionStartDate) {
            setNewPriceReductionStartDateEmpty(true);
        }
        if (!newPriceReductionEndDate) {
            setNewPriceReductionEndDateEmpty(true);
        }

        if (newPriceReductionStartDate >= newPriceReductionEndDate) {
            setNewPriceReductionDateConflict(true);
            return;
        }
        if (!newPriceReductionReducedPrice || !newPriceReductionStartDate || !newPriceReductionEndDate) {
            return;
        }
        const newPriceReduction = {
            'reducedPrice': newPriceReductionReducedPrice,
            'startDate': newPriceReductionStartDate,
            'endDate': newPriceReductionEndDate
        }
        priceReductions.push(newPriceReduction);
        setNewPriceReductionForm(false);
    }

    
    function deletePriceReduction() {
        const newPriceReductions = priceReductions.filter((priceReduction) => priceReduction !== priceReductionToDelete);
        priceReductions = newPriceReductions;
        setDialogModalOpen(false);
    }

    function toggleNewPriceReductionForm() {
        setNewPriceReductionForm(!newPriceReductionForm);
        setNewPriceReductionReducedPriceEmpty(false);
        setNewPriceReductionStartDateEmpty(false);
        setNewPriceReductionEndDateEmpty(false);
        setNewPriceReductionDateConflict(false);
    }

    function setPriceReductionReducedPrice(value) {
        setNewPriceReductionReducedPrice(value);
        setNewPriceReductionReducedPriceEmpty(false);
    }

    function setPriceReductionStartDate(value) {
        setNewPriceReductionStartDate(value);
        setNewPriceReductionStartDateEmpty(false);
        setNewPriceReductionDateConflict(false);
    }

    function setPriceReductionEndDate(value) {
        setNewPriceReductionEndDate(value);
        setNewPriceReductionEndDateEmpty(false);
        setNewPriceReductionDateConflict(false);
    }
    
    function formatDate(date) {
        return new Date(date).toLocaleString().split(',')[0];
    }

    function setModal(boolean) {
        setDialogModalOpen(boolean);
    }

    function openModal(priceReduction) {
        setDialogModalOpen(true);
        setPriceReductionToDelete(priceReduction);
    }

    return(
        <div className="price-reductions">
            <h4>PriceReductions</h4>
            <ul className="price-reductions-list">
              {
                priceReductions?.map(priceReduction => <li key={priceReduction.id}>
                  <span>{'- ' + priceReduction.reducedPrice + ' FROM ' + formatDate(priceReduction.startDate) + ' TO ' +  formatDate(priceReduction.endDate)}</span>
                  <button onClick={() => openModal(priceReduction)}>Delete</button>
                </li>)
              }
              </ul>
            <button onClick={toggleNewPriceReductionForm}>New price reduction</button>
            { newPriceReductionForm ? 
                <div className="new-price-reduction">
                    <input type="number" step="0.01" min="0.00" defaultValue={0.0} placeholder="Reduced price..." 
                        onChange={event => setPriceReductionReducedPrice(event.target.value)}/>
                    { newPriceReductionReducedPriceEmpty ? <span className="error">Reduced price is empty</span> : null }
                    <input type="date" onChange={event => setPriceReductionStartDate(event.target.value)}/>
                    <input type="date" onChange={event => setPriceReductionEndDate(event.target.value)}/>
                    { newPriceReductionDateConflict ? <span className="error">Conflict in dates</span> : null }
                    <button className="action-button form-button" onClick={addPriceReduction}>Create</button>
                </div> : null
            }
            { dialogModalOpen && 
                    <DialogModal modalType={'deletePriceReduction'} setOpenModal={setModal} confirm={deletePriceReduction} />}
        </div>
    )
}