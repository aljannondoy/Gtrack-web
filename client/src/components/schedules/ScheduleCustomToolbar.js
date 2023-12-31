/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import DeleteScheduleModal from "./DeleteScheduleModal";
import EditScheduleModal from "./EditScheduleModal";
const ScheduleCustomToolbar = ({data,openEditModal,setOpenEditModal,openDeleteModal,setOpenDeleteModal}) => {
    return (
        <div>
            <button onClick={()=>setOpenEditModal(true)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
            <button onClick={()=>setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>

            <EditScheduleModal data={data} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
            <DeleteScheduleModal data={data} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ScheduleCustomToolbar
