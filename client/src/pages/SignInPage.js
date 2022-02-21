import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminLoginValidation from '../validations/AdminLoginValidation';
import Axios from "axios";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.dark" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        GTrack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();
const SignInPage = () => {
    
    const { register,watch, handleSubmit } = useForm();
    const [user, setUser] = useState({
      email:"",
      password:""
    });
    const handleChange = (event) =>{
      setUser({...user, [event.target.name]: event.target.value});
    }
    const [errors, setErrors] = useState({})

   

    const onSubmit = data => {
      console.log(data);
    }
    const [loading,setLoading] = useState(false);
  

    const [alert,setAlert]=useState({
      visibility:false,
      message:null,
      severity:null,
    });
    const navigate = useNavigate();
    React.useEffect(() => {
      if(Cookies.get('user_id')){
        navigate("/dashboard");
      }
    }, [navigate])
    const handleFormSubmit = (event) => {
      // var mins = new Date(new Date().getTime() + 15 * 60 * 1000);
      event.preventDefault();
      setErrors(AdminLoginValidation(user));
      if(Object.keys(AdminLoginValidation(user)).length === 0){
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`,{
          email: user.email,
          password: user.password
        }).then((res)=>{
          if(res.data.success){
            setLoading(true);
            Cookies.set('user_id', res.data.accessToken, {expires: 1});
            navigate("/dashboard");
    
          }else{
            setAlert({visibility:true, message:res.data.message,severity:"error"});
          }
        })
      }
       

  };

    
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <div>
              {alert.visibility  ? <Alert  sx={{mt:1}} severity={alert.severity} >{alert.message}</Alert> : <></> }
            </div>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
           
              <Link color="inherit" href="/">
                <img alt="GTrack Logo" width={150} className='mb-4' src='/images/gtrack-logo-1.png'></img>
              </Link>
              <Typography component="h1" variant="h5">
                Sign in to GTrack
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                   {...register("email")}
                  disabled={loading}
                  color='success'
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                  error = {!!errors.email}
                  helperText = {errors.email}
                  autoFocus
                />
                
                <TextField
                  {...register("password")}
                  disabled={loading}
                  color='success'
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  id="password"
                  error={!!errors.password}
                  helperText= {errors.password}
                  autoComplete="current-password"
                />
                  
                <Button
                  disabled={loading || (!user.email && !user.password)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color='success'
                  // onClick={()=>navigate('/dashboard')}
                  onClick={handleFormSubmit}
                >
                  Sign In
                </Button>
                {loading ? <CircularProgress color="success"/> : <></> }
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
}

export default SignInPage
