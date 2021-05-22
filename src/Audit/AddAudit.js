import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import {Link} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AddAudit() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [open, setOpen] = React.useState(false);
    const [slackBarMsg, setSlackBarMsg] = React.useState("");

      const handleClick = (info) => {
        setSlackBarMsg(info)
        setOpen(true);
      };
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
        setSlackBarMsg("");
    };


    async function saveData(name, address,description, latitude, longitude){
        const response = await axios.post('http://localhost:4000/api/v1/audit', {
            name: name,
            address: address,
            description: description,
            latitude: latitude,
            longitude: longitude,
            createdBy: localStorage.getItem("username"),
            updatedBy: localStorage.getItem("username") 

          });
          if(response.data.success){
            history.push("/");
          }
    };
    

      const updateName = (e) => {
        setName(e.target.value);
      };
      const updateAddress = (e) => {
        setAddress(e.target.value);
      };
      const updateDescription = (e) => {
        setDescription(e.target.value);
      };
      const updateLatitude = (e) => {
        setLatitude(e.target.value);
      };
      const updateLongitude = (e) => {
        setLongitude(e.target.value);
      }; 
      const submitData = (e) => {
        e.preventDefault();
        if(name.trim()===""){
            handleClick('Name can not be empty.');
        }else if(address.trim()===""){
            handleClick('Address can not be empty.');
        }else if(description.trim()===""){
            handleClick('Description can not be empty.');
        }else if(latitude.trim()==="" || isNaN(latitude.trim())){
            handleClick('Latitude is required as a number.');
        }else if(longitude.trim()==="" || isNaN(longitude.trim())){
            handleClick('Longitude is required as a number');
        }else{
            saveData(name, address,description, latitude, longitude);
        }

      };
      
    


    return (
        <div Style="width:205vh; text-align:center; height:10%;margin-top:10vh;color:grey;  overflow-x: hidden;">
            <h1>Let's create an entry!</h1>
            <TextField id="name" value={name} onChange={updateName} label="Name" variant="outlined" Style="width:60%;margin-top:5vh;"/>
            <TextField id="address" value={address} onChange={updateAddress} label="Jurisdiction/City/Region" variant="outlined" Style="width:60%;margin-top:2vh;"/>
            <TextField id="description" value={description} onChange={updateDescription} label="Site Description" variant="outlined" Style="width:60%;margin-top:2vh;"/>
            <br></br>
           
            <div Style="float:left;  width:82%;">
            <TextField id="latitude" value={latitude} onChange={updateLatitude}  label="latitude" variant="outlined" Style="width:25%;margin-top:2vh;"/>
            <TextField id="longitude" value={longitude} onChange={updateLongitude}  label="longitude" variant="outlined" Style="width:25%;margin-top:2vh;margin-left:2vh"/>
            </div>
           
            <div Style="text-align:left; margin-top:12vh;width:205vh;margin-left:41vh;">
            <Button onClick={submitData} variant="outlined" color="primary" startIcon={<SaveIcon/>}>
            save
            </Button>
            <Link  to="/" Style="color:gray;text-decoration:none;">
            <Button variant="outlined" startIcon={<ClearIcon/>} Style="margin-left:2vh;">
            cancel
            </Button>
            </Link>
            </div>      
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                {slackBarMsg}
                </Alert>
            </Snackbar>
        </div>
    )
}
