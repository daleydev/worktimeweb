import React, { useContext } from "react";
import { AuthContext } from "../auth";
// material ui imports
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import StoreIcon from "@material-ui/icons/Store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      {/* <AppBar position="static"> */}
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/'>Work Time</Link>
          </Typography>

          {currentUser ? (
            <div>
              <IconButton color='inherit'>
                <Link to='/console'>
                  <StoreIcon />
                </Link>
              </IconButton>
              <IconButton
                aria-controls='simple-menu'
                aria-haspopup='true'
                color='inherit'
              >
                <Link to='/profile'>
                  <PersonIcon />
                </Link>
              </IconButton>
            </div>
          ) : (
            <div>
              <Button color='inherit'>
                <Link to='/login'>Login</Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
