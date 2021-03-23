import React, { FC } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface IMyButton {
  children?: any;
  onClick?: () => void;
  tip: string;
  btnClassName?: string;
  tipClassName?: string;
}

const MyButton: FC<IMyButton> = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
}) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default MyButton;
