/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Carousel from "react-material-ui-carousel";
import moment from "moment";
const Map = ReactMapboxGl({
  accessToken:process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
});
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
            position: "absolute",
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

const ViewReportModal = (props) => {
    const controlButtonDiv = document.createElement('button');
    controlButtonDiv.style.cursor = 'pointer';
    controlButtonDiv.setAttribute('class','btn btn-light rounded mx-2 mt-2')
    controlButtonDiv.innerHTML='<i class="fa fa-location-arrow" aria-hidden="true"></i>'
    const handleOnLoad = map => {
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlButtonDiv);
    };
  return (
    <Dialog
     fullWidth={true}
      onClose={()=>props.setOpenViewModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openViewModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={()=>props.setOpenViewModal(false)}

      >
        Report Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
      <Box sx={{ width: "100%" }} paddingTop={2} paddingBottom={2}>
        <Carousel sx={{height: 200,width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center',margin:'auto'}}>
            {props.data&&props.data.reportAttachmentLine.lineAttachment.length!==0?(props.data.reportAttachmentLine.lineAttachment.map((image,i)=>{
                return (
                  <div key = {i} className="text-center mx-auto ml-auto mr-auto">
                    <img 
                      src={image.filename}
                      style={{height: 200, margin:"auto",alignSelf:"center",alignContent:"center",justifyContent:"center"}}
                      alt={image.filename}
                    />
                  </div>
                )
              })
            ):(
              <div className="text-white mx-auto bg-secondary" style={{width:"100%",height:200,justifyContent:"center",display:"flex"}}>
                <p className="text-center mt-auto mb-auto">No photos uploaded</p>
              </div>
            )}
          </Carousel>
      </Box>
          <Typography variant="body2" mt={2} color="text.dark">
            <b>Subject:</b> {props.data&&props.data.subject}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Message:</b> {props.data&&props.data.message}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Degree:</b> {props.data&&props.data.degree}
          </Typography>
          <Typography variant="body2" color="text.dark">
            <b>Date Sent:</b> {props.data&&moment(props.data.createdAt).format("MMMM DD, YYYY")}
          </Typography>
          <hr/>
          <Typography variant="body2" color="text.dark">
            <b style={{fontSize: 15}}>Sender Details: </b> 
          </Typography>
          <Typography variant="body2" mt={2} color="text.dark">
            <b>Name:</b> {`${props.data&&props.data.reportDriver.fname} ${props.data&&props.data.reportDriver.lname}`}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Address:</b> {`${props.data&&props.data.reportDriver.purok?props.data.reportDriver.purok:''} ${props.data&&props.data.reportDriver.street?props.data.reportDriver.street:''} ${props.data&&props.data.reportDriver.barangay?props.data.reportDriver.barangay:''}`}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Contact Number:</b> {props.data&&props.data.reportDriver.contact_no?props.data.reportDriver.contact_no:''}
          </Typography>
          <Typography variant="body2" color="text.dark">
            <b>Email:</b> {props.data&&props.data.reportDriver.email}
          </Typography>
        <Box sx={{ width: "100%" }} paddingTop={1} paddingBottom={1}>
          <Typography variant="body2" color="text.dark">
            <b style={{fontSize: 15}}>Driver Location: </b> 
          </Typography>
        </Box>
        <div style={{ height: '40vh', width: '100%' }}>
          <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "36vh",
                width: "100%",
              }}
              center={
                props.data&&props.data.longitude != 0 && props.data&&props.data.latitude != 0
                  ? [props.data.longitude, props.data.latitude]
                  : [123.94964154058066, 10.482913243053028]
              }
              zoom={
                props.data&&props.data.longitude != 0 && props.data&&props.data.latitude != 0
                  ? [15]
                  : [11]
              }
            >
              {props.data&&props.data.longitude != 0 && props.data&&props.data.latitude != 0 ? (
                <Marker
                  coordinates={
                    props.data&&props.data.longitude != 0 && props.data&&props.data.latitude != 0
                      ? [props.data.longitude, props.data.latitude]
                      : [123.94964154058066, 10.482913243053028]
                  }
                  anchor="bottom"
                >
                  <img style={mystyle} src="/images/collector_marker_icon.png" />
                </Marker>
              ) : (
                <></>
              )}
            </Map>
          </div>
      </DialogContent>
    </Dialog>
  );
}
const mystyle = {
  height: "25px",
  width: "25px",
};
export default ViewReportModal;