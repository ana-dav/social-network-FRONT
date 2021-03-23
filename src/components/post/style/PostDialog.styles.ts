import createStyles from '@material-ui/core/styles/createStyles';

const styles = createStyles({
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, .1)',
    marginButtom: '20px',
  },
});

export default styles;
