// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck noImplicitAny
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Template() {
  const classes = useStyles();

  return <div className={classes.root}>Dropdown</div>;
}
