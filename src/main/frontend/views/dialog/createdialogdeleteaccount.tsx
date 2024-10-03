import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

interface DialogProps {
    openConfirmDialog: boolean;
    onHandleCloseConfirmDeleteProfileDialog: () => void;
    onHandleDeleteAccount: () => void;
}

export default function CreateDialogDeleteAccount ({openConfirmDialog,onHandleCloseConfirmDeleteProfileDialog, onHandleDeleteAccount} : DialogProps){
    return(
        <Dialog
            open={openConfirmDialog}
            onClose={onHandleCloseConfirmDeleteProfileDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm delete account"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete your account? This process cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onHandleCloseConfirmDeleteProfileDialog}>Cancel</Button>
                <Button color="error" onClick={onHandleDeleteAccount} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>

    );
}