import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { FC } from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

export const DialogCreateReportSuccess: FC<IProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You've successfully reported an empty parking lot. Thanks.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Return
        </Button>
      </DialogActions>
    </Dialog>
  );
};
