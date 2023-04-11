import React, { useEffect, useState } from "react";
import axios from "axios";
import userInstance from "./User";
import "../History.css";

export default function History() {
    const [receipts, setReceipts] = useState([]);
    const path = "History";

    useEffect(() => {
        axios.post(`http://localhost/php-react/Login-and-Register/Purchase.php?path=${path}`, {
            User_ID: userInstance.getUserid(),
        })
            .then((response) => {
                if (response.data === "No receipt" || response.data === "ID is null") {

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
                <table className="table-manage">
                    <thead>
                        <tr>
                            <th align="center">ID</th>
                            <th align="center">Date</th>
                            <th align="center">Time</th>
                            <th align="center">Total_Price</th>
                            <th align="center">Receipt number</th>
                            <th align="center">Status</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receiptArr, index) => (
                            <tr key={index}>
                                {receiptArr.map((receipt) => (
                                    <React.Fragment key={receipt.receipt_id}>
                                        <td>{receipt.receipt_id}</td>
                                        <td>{receipt.receipt_date}</td>
                                        <td>{receipt.receipt_time}</td>
                                        <td>{receipt.receipt_totalprice + " baht"}</td>
                                        <td>{receipt.receipt_number}</td>
                                        <td>{receipt.Status_receipt}</td>
                                        <td>
                                            <button className="btnedit"><a href={`history/${receipt.receipt_number}/detail`}>Detail</a></button>
                                        </td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {receipts.length === 0 && (
                    <p className="text-empty">Receipt is empty</p>
                )}
            </div>
        </div>
    );
}
