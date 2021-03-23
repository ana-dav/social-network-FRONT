import createStyles from '@material-ui/core/styles/createStyles';

const styles = createStyles({
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
  textField: { margin: '10px auto 10px auto' },
});

export default styles;
