import React, { useContext, useEffect, useState } from "react";
import FirebaseApp from "../firebase";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../auth";

// material ui imports
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  Snackbar
} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 400,
    margin: "auto"
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
  const [userData, setUserData] = useState({
    userName: "",
    email: ""
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const db = FirebaseApp.firestore();
    const userRef = db.collection("users").doc(currentUser.uid);

    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setUserData({
            ...userData,
            ["userName"]: doc.data().name,
            ["email"]: doc.data().email
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  const signOut = () => {
    FirebaseApp.auth().signOut();
  };

  const states = [
    {
      value: "alabama",
      label: "Alabama"
    },
    {
      value: "new-york",
      label: "New York"
    },
    {
      value: "san-francisco",
      label: "San Francisco"
    }
  ];

  const handleChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  const updateUser = () => {
    const db = FirebaseApp.firestore();
    const userRef = db.collection("users").doc(currentUser.uid);

    userRef
      .update({
        name: userData.userName,
        email: userData.email
      })
      .then(function() {
        console.log("Document successfully updated!");
        setMessage('save successfully')
        setTimeout(() => {
          setMessage('')
        }, 5000);
      });
  };

  if (currentUser) {
    return (
      <div className="profile_page">
        <Card className={classes.root}>
          <form autoComplete="off" noValidate>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="Username"
                    margin="dense"
                    name="userName"
                    onChange={handleChange}
                    required
                    value={userData.userName}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last name"
                    margin="dense"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={userData.lastName}
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="dense"
                    name="email"
                    onChange={handleChange}
                    required
                    value={userData.email}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    margin="dense"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={userData.phone}
                    variant="outlined"
                  />
                </Grid> */}
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select State"
                    margin="dense"
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={userData.state}
                    variant="outlined"
                  >
                    {states.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid> */}
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    margin="dense"
                    name="country"
                    onChange={handleChange}
                    required
                    value={userData.country}
                    variant="outlined"
                  />
                </Grid> */}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" onClick={updateUser}>
                Save
              </Button>
              <Button color="secondary" variant="contained" onClick={signOut}>
                sign out
              </Button>
              {message}
            </CardActions>
          </form>
        </Card>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default withRouter(Profile);
