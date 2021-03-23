import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto',
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    width: '100%',
    marginBottom: 10,
  },
  paper: {
    padding: 20,
  },
  profile: {
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  imageWrapper: {
    textAlign: 'center',
    position: 'relative',
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '70%',
    },
  },
});

export default styles;
