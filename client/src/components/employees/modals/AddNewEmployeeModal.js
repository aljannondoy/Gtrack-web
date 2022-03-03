import * as React from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as yup from 'yup'
import Firebase from '../../helpers/Firebase';

const auth = Firebase.auth();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
export default function AddNewEmployeeModal(props) {
  const employeeRegisterValidationSchema = yup.object().shape({
    fname: yup
      .string()
      .required('First Name is required'),
    lname: yup
      .string()
      .required('Last Name is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    purok: yup
      .string()
      .required('Purok is required'),
    street: yup
      .string()
      .required('Street is required'),
    barangay: yup
      .string()
      .required('Barangay is required'),
    gender: yup
      .string()
      .required('Gender is required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    user_type: yup
      .string()
      .required('Employee type is required'),
  })
  const [error,setError]=useState(null);
  
  const handleFirebase =async (values,resetForm) =>{
    await auth.createUserWithEmailAndPassword(values.email, values.password)
    .then(function() {
        auth.currentUser.sendEmailVerification();
    })
    .catch(function(error) {
        setError(error.message);
    });
  }
  const handleFormSubmit = async(values,{resetForm}) =>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/register`,{email:values.email,password:values.password,fname:values.fname,lname:values.lname,purok:values.purok,street:values.street,barangay:values.barangay,gender:values.gender,user_type:values.user_type})
    .then(res=>{
      if(res.data.success){
        handleFirebase(values,resetForm);
        props.setAccounts(res.data.data);
        props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"});
      }else{
        setError(res.data.message);
      }
    })
  }
  const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
    initialValues:{ fname:'',lname:'',email:'',password:'',purok:'',street:'',barangay:'',gender:'',user_type:''},
    enableReinitialize:true,
    validationSchema:employeeRegisterValidationSchema,
    onSubmit: handleFormSubmit
  });
  return (
    <BootstrapDialog
    onClose={()=>props.setOpenModal(false)}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>props.setOpenModal(false)}>
      Add Employee Record
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
    {error && <p className="text-danger small text-center">{error}</p>}
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6}>
      <TextField
        value={values.fname}
        onChange={handleChange('fname')}
        onBlur={handleBlur('fname')}
        margin="dense"
        label="First Name"
        type="text"
        fullWidth
        variant="standard"
      />
      {(errors.fname && touched.fname) &&
        <p className="text-danger small ">{errors.fname}</p>
      }
    </Grid>
    <Grid item xs={6}>
      <TextField
        value={values.lname}
        onChange={handleChange('lname')}
        onBlur={handleBlur('lname')}
        margin="dense"
        label="Last Name"
        type="text"
        fullWidth
        variant="standard"
      />
      {(errors.lname && touched.lname) &&
        <p className="text-danger small ">{errors.lname}</p>
      }
    </Grid>
  </Grid>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <TextField
          value={values.purok}
          onChange={handleChange('purok')}
          onBlur={handleBlur('purok')}
          margin="dense"
          label="Purok"
          type="text"
          fullWidth
          variant="standard"
        />
        {(errors.purok && touched.purok) &&
          <p className="text-danger small ">{errors.purok}</p>
        }
      </Grid>
      <Grid item xs={4}>
        <TextField
          value={values.street}
          onChange={handleChange('street')}
          onBlur={handleBlur('street')}
          margin="dense"
          label="Street"
          type="text"
          fullWidth
          variant="standard"
        />
        {(errors.street && touched.street) &&
          <p className="text-danger small ">{errors.street}</p>
        }
      </Grid>
      <Grid item xs={4}>
        <TextField
          value={values.barangay}
          onChange={handleChange('barangay')}
          onBlur={handleBlur('barangay')}
          margin="dense"
          label="Barangay"
          type="text"
          fullWidth
          variant="standard"
        />
        {(errors.barangay && touched.barangay) &&
          <p className="text-danger small ">{errors.barangay}</p>
        }
      </Grid>
    </Grid>
      <TextField
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        margin="dense"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
      {(errors.email && touched.email) &&
        <p className="text-danger small ">{errors.email}</p>
      }
      <TextField
        value={values.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        margin="dense"
        label="Default Password"
        type="password"
        fullWidth
        variant="standard"
      />
      {(errors.password && touched.password) &&
        <p className="text-danger small ">{errors.password}</p>
      }
      <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <FormControl sx={{ width:'100%' }}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              value={values.gender}
              onChange={handleChange('gender')}
              onBlur={handleBlur('gender')}
              label="Gender"
              inputProps={{
                name: 'gender',
                id: 'gender',
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          {(errors.gender && touched.gender) &&
            <p className="text-danger small">{errors.gender}</p>
          }
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width:'100%' }}>
            <InputLabel htmlFor="employee">Type</InputLabel>
              <Select
                value={values.user_type}
                onChange={handleChange('user_type')}
                onBlur={handleBlur('user_type')}
                label="Employee"
                inputProps={{
                  name: 'user_type',
                  id: 'user_type',
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
              </Select>
          </FormControl>
          {(errors.user_type && touched.user_type) &&
            <p className="text-danger small">{errors.user_type}</p>
          }
        </Grid>
      </Grid>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button type="submit"  className='text-dark' disabled={!isValid} onClick={handleSubmit}>
        Add Employee
      </Button>
    </DialogActions>
  </BootstrapDialog>
  );
}