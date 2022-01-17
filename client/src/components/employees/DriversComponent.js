import React from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import AddNewEmployeeModal from './modals/AddNewEmployeeModal';
const DriversComponent = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [gender, setGender] = React.useState("Male");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleGender = (event) => {
    setGender(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
    const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status","Image"];

    const data = [
    ["Stark", "Tony", "ironman@gmail.com", "09123456789","America","52","Male","01/02/22","Active","/images/gtrack-logo-1.png"],
    ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <EmployeeCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i class="fa fa-plus" aria-hidden="true"></i> Add New Driver</button>            </div>
                <AddNewEmployeeModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            gender={gender}
            handleGender={handleGender}
          />
            <MUIDataTable
                title={"Drivers List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default DriversComponent
