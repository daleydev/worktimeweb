import React, { useContext, useEffect, useState } from "react";
import WorkplaceDetail from "./WorkplaceDetail";
import WorkplaceCard from "./WorkplaceCard";
import WorkplaceCreateView from "./WorkplaceCreate";
import { AuthContext } from "../../../auth";
import firebase from "../../../firebase";

//material ui
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  ButtonBase
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80vw",
    margin: "auto"
  },
  header: {
    display: "flexbox"
  },
  buttonBase: {
    width: "100%"
  },
  headerButton: {
    float: "right"
  },
  title: {
    float: "left"
  }
}));

const WorkplaceView = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [workplaces, setWorkplaces] = useState([]);
  const [creating, setCreating] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  // console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      getWorkplaces(currentUser.uid);
    }
  }, [creating]);

  const getWorkplaces = async userUid => {
    setWorkplaces([]);
    getManagedWorkplaceIds(userUid).then(ids => {
      ids.map(id => {
        getWorkplace(id).then(workplace => {
          setWorkplaces(workplaces => [...workplaces, workplace]);
        });
      });
    });
  };

  const getManagedWorkplaceIds = async userUid => {
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userUid);

    const result = await userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          return doc.data().managedWorkplaces;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    return result;
  };

  const getWorkplace = async workplaceUid => {
    const db = firebase.firestore();
    const workplaceRef = db.collection("workplaces").doc(workplaceUid);

    const workplace = await workplaceRef
      .get()
      .then(doc => {
        if (doc.exists) {
          //   console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    return workplace;
  };

  const hideCreating = () => {
    setCreating(false);
  };

  const hideDetail = () => {
    setViewDetail(false);
    setCurrentWorkplace({});
  };

  const showDetail = workplace => {
    setViewDetail(true);
    setCurrentWorkplace(workplace);
  };

  return (
    <div className={classes.root}>
      {creating || viewDetail ? (
        <></>
      ) : (
        <div>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.title}>
              My workplaces
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreating(true)}
              className={classes.headerButton}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreating(true)}
              className={classes.headerButton}
            >
              Create
            </Button>
          </div>

          <Grid container spacing={3}>
            {workplaces.map(workplace => (
              <Grid item lg={4} md={6} xs={12}>
                <ButtonBase
                  className={classes.buttonBase}
                  onClick={() => showDetail(workplace)}
                >
                  <WorkplaceCard workplace={workplace} />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {viewDetail ? (
        <WorkplaceDetail close={hideDetail} workplace={currentWorkplace} />
      ) : (
        <></>
      )}
      {creating ? <WorkplaceCreateView close={hideCreating} /> : <></>}
    </div>
  );
};

export default WorkplaceView;
