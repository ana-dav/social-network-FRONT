import { createStyles } from '@material-ui/core';

const styles = createStyles({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  visibleSeparator: {
    border: '1px',
  },
});

export default styles;
