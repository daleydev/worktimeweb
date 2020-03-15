import React, { useContext, useEffect } from "react";
import { FirebaseApp } from "../firebase/firebase";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/auth";

// material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 400
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    width: 400,
    height: 400,
    margin: "auto"
  }
});

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const signOut = () => {
    FirebaseApp.auth().signOut();
  };


  if (currentUser) {
    return (
        
      // <Card className={classes.root}>
      //     <CardContent>
      //         <Typography className={classes.title} color="textSecondary" gutterBottom>
      //             Word of the Day
      //         </Typography>
      //         <Typography variant="h5" component="h2">
      //             be{bull}nev{bull}o{bull}lent
      //         </Typography>
      //         <Typography className={classes.pos} color="textSecondary">
      //             adjective
      //         </Typography>
      //         <Typography variant="body2" component="p">
      //             well meaning and kindly.
      //             <br />
      //             {'"a benevolent smile"'}
      //         </Typography>
      //     </CardContent>
      //     <CardActions>
      //         <Button size="small">Learn More</Button>
      //     </CardActions>
      // </Card>
      <div className="profile_page">
          
        <Paper className="profile_container">
          <div>{currentUser.email}</div>
          <Button onClick={signOut}>sign out</Button>
        </Paper>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default withRouter(Profile);
