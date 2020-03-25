import React, { useContext, useEffect, useState } from "react";
import WorkplaceView from './workplace/WorkplaceView'

//material ui
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}));

const Console = () => {

  return (
    <>
      <WorkplaceView />
    </>
  );
};

export default Console;
