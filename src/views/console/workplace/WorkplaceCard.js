import React from "react";
import chatime from "../../../img/chatime.jpeg";

//material ui
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  logoContainer: {
    height: 64,
    width: 64,
    margin: "0 auto"
  },
  logo: {
    width: "100%"
  },
  name: {
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    wordBreak: "break-all",
    marginTop: 20
  }
}));

const WorkplaceCard = (props) => {
  const classes = useStyles();
  const { name, description } = props.workplace
  return (
    <Card className={classes.root}>
      <CardContent >
        <div className={classes.logoContainer}>
          <img alt="Product" className={classes.logo} src={chatime} />
        </div>
        <Typography align="center" variant="h5" className={classes.name}>
          { name }
        </Typography>
        <Divider />
        <Typography
          align="center"
          variant="body1"
          className={classes.description}
        >
          {description == '' ? 'No description' : description }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkplaceCard;
