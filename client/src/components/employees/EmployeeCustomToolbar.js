/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import ViewEmployeeModal from "./modals/ViewEmployeeModal";
import ReactivateModal from "./modals/ReactivateModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
import { useState } from "react";
import { useEffect } from "react";
const EmployeeCustomToolbar = ({data,selectedRows,displayData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    useEffect(() => {
      return () => {
        setDeleteModal(false);
      }
    }, [])
    
    return (
        <div>
            <button onClick={()=>setOpenModal(true)} className="btn btn-primary "><i className="fa fa-info-circle" aria-hidden="true"></i></button>
            <button onClick={()=>setDeleteModal(true)} className={(displayData[selectedRows.data[0].dataIndex].data[8] === "Active")?"btn btn-danger mx-2":"btn btn-success mx-2"}><i className={(displayData[selectedRows.data[0].dataIndex].data[8] === "Active")?"fa fa-minus-circle":"fa fa-check"} aria-hidden="true"></i></button>
            <ViewEmployeeModal data={data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={()=>setOpenModal(false)}/>
            {displayData[selectedRows.data[0].dataIndex].data[8] === "Active"?(
                <DeleteEmployeeModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal}/>
            ):(
                <ReactivateModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal}/>
            )}
        </div>
    )
}

export default EmployeeCustomToolbar
