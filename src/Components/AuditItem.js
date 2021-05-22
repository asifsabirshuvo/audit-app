import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import "./AuditItem.css";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const useStyles = makeStyles({
    root: {
      marginTop:20,
      maxWidth: 1345,
      textAlign: 'left'
    },
    media: {
      height: 140,
    },
  });

function AuditItem({code,name,address,description, latitude,
     longitude,  createdAt, updatedAt, createdBy, updatedBy, edit, del}) {
    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
            <LocationOnOutlinedIcon fontSize="small"/>{address} ({latitude}, {longitude})
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => edit(code)}>
            EDIT
          </Button>
          <Button size="small" color="secondary" onClick={() => del(code)}>
            DELETE
          </Button>
        </CardActions>
        <div className="logParent">
            Audit Log:
            <hr className="br-bar"/>
            Created by {createdBy} on {createdAt} <br/>
            Updated by {updatedBy} on {updatedAt}
        </div>
        <div></div>
      </Card>
    );
  }
  
  export default AuditItem;