import React, { FC } from 'react';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// Style
import styles from './style/PostSkeletonStyle';
// img
import noImg from '../images/no-img.png';

const PostSkeleton: FC<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;
  const content = Array.from(Array(5).keys()).map((item) => (
    <Card className={classes.card} key={item}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <>{content}</>;
};

export default withStyles(styles)(PostSkeleton);
