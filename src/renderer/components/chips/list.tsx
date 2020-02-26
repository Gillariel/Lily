import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chip, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);


export default function ChipsList(props: { labels: string[], onSelected?: (selected: string) => void }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {props.labels.map(label => {
        return (
          <Chip
            key={label}
            color="primary"
            label={label}
            clickable={true}
            onClick={(e) => props.onSelected ? props.onSelected(e.currentTarget.textContent): null}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
