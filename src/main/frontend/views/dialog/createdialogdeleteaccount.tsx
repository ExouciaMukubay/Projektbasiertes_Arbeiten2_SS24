import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {DialogToDeleteUserAccountProps} from "Frontend/util/postsprops";

/**
 * Creates dialog when user wants to delete his account
 * @param openConfirmDialog
 * @param onHandleCloseConfirmDeleteProfileDialog
 * @param onHandleDeleteAccount
 * @constructor
 */
export default function CreateDialogDeleteAccount ({openConfirmDialog,onHandleCloseConfirmDeleteProfileDialog, onHandleDeleteAccount} : DialogToDeleteUserAccountProps){
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