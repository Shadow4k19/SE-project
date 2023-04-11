import React, { useEffect, useState } from "react";
import axios from "axios";
import "../History.css";

export default function Order() {
    const [receipts, setReceipts] = useState([]);
    const path = "Order";
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [newReceipt, setnewReceipt] = useState([]);
    const totalPrice = receipts.reduce((total, receipt) => total + Number(receipt.receipt_totalprice), 0);


    const handleEditPopup = (receipt) => {
        setShowEditPopup(true);
        setnewReceipt({
            ...newReceipt,
            receipt_id: receipt.receipt_id,
            Status: receipt.Status_receipt,
        });
    };

    const handleEditClosePopup = () => {
        setShowEditPopup(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setnewReceipt((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleEditSubmit = (event) => {
        event.preventDefault();
        axios
            .put(
                `http://localhost/php-react/Login-and-Register/Purchase.php?Receipt_ID=${newReceipt.receipt_id}`,
                newReceipt
            )
            .then((response) => {
                console.log(response.data);
                if (response.data === "Record Updated Successfully") {
                    alert("Update Success");
                    setShowEditPopup(false);
                    window.location.reload();
                } else {
                    alert("Update Failed");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.post(`http://localhost/php-react/Login-and-Register/Purchase.php?path=${path}`)
            .then((response) => {
                if (response.data === "No order" || response.data === "ID is null") {

                } else {
                    setReceipts(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="contrainer-over-H">
            <div className="container-manage">
                <h1 style={{marginLeft:"60%"}}>Total_Summary {totalPrice} baht</h1>
                <table className="table-manage">
                    <thead>
                        <tr>
                            <th align="center">ID</th>
                            <th align="center">Date</th>
                            <th aligns="center">Time</th>
                            <th align="center">Total_Price</th>
                            <th align="center">Receipt number</th>
                            <th align="center">Status</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt) => (
                            <tr key={receipt.receipt_id}>
                                <td>{receipt.receipt_id}</td>
                                <td>{receipt.receipt_date}</td>
                                <td>{receipt.receipt_time}</td>
                                <td>{receipt.receipt_totalprice + " baht"}</td>
                                <td>{receipt.receipt_number}</td>
                                <td>{receipt.Status_receipt}</td>
                                <td>
                                    <button className="btnedit"><a href={`order/${receipt.receipt_number}/detail`}>Detail</a></button>
                                    <button className="btnedit" onClick={() => handleEditPopup(receipt)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {receipts.length === 0 && (
                    <p className="text-empty">Receipt is empty</p>
                )}
            </div>
            {showEditPopup && (
                <div className="popup-edit">
                    <div className="popup-content-edit">
                        <form onSubmit={handleEditSubmit}>
                            <div className="radio-buttons">
                                <h6>Status</h6>
                                <label>
                                    <input
                                        type="radio"
                                        name="Status"
                                        value="waiting"
                                        checked={newReceipt.Status === "waiting"}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    waiting
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="Status"
                                        value="sending"
                                        checked={newReceipt.Status === "sending"}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    sending
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="Status"
                                        value="success"
                                        checked={newReceipt.Status === "success"}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    success
                                </label>
                            </div>
                            <button type="submit">Update</button>
                            <button type="button" onClick={handleEditClosePopup}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div >
            )
            }
        </div >
    );
}
