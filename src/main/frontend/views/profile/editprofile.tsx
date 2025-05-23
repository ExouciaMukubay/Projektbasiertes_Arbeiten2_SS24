import * as React from "react";
import {useRef, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Avatar, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAuth} from "Frontend/util/auth";
import {UserService} from "Frontend/generated/endpoints";
import {Notification} from "@hilla/react-components/Notification";
import {PasswordField} from "@vaadin/react-components";
import CreateDialogDeleteAccount from "Frontend/views/dialog/createdialogdeleteaccount";
import User from "Frontend/generated/com/example/application/data/model/User";
import "Frontend/themes/hilla-social-media-app/styles.css";
import {editProfileBoxStyle} from "Frontend/util/styling";

/**
 * Displays view to edit profile
 * @constructor
 */
export default function EditProfileView() {
    const {state, logout} = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [updatedUser, setUpdatedUser] = useState({
        id: state.user?.id,
        firstName: state.user?.firstname,
        lastName: state.user?.lastname,
        username: state.user?.username,
        email: state.user?.email,
        biography: state.user?.biography,
        password: state.user?.password,
        online: true
    });

    const onHandleOpenEditForm = () => setOpenModal(true);
    const onHandleClickCloseButton = () => setOpenModal(false);
    const onHandleOpenConfirmDeleteProfileDialog = () => {
        setOpenConfirmDialog(true);
    };
    const onHandleCloseConfirmDeleteProfileDialog = () => {
        setOpenConfirmDialog(false);
    };

    const onHandleSaveUpdates = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await UserService.updateUser(updatedUser);
            Notification.show('User was updated successfully!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });

        } catch (e: any) {
            Notification.show('Updating user failed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });

            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const onHandleDeleteAccount = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await UserService.deleteUser(state.user as User);
            await logout();
        } catch (e: any) {
            Notification.show('Deleting user failed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });

            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };


    return (
        <div className={"editProfileForm"}>
            <Button sx={{borderRadius: "20px"}} variant="outlined" onClick={onHandleOpenEditForm}>Edit Profile</Button>
            <Modal
                open={openModal}
                onClose={onHandleClickCloseButton}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={editProfileBoxStyle}>
                    <form onSubmit={onHandleSaveUpdates}>
                        <div>
                            <div style={{height: "15rem"}}>
                                <img className="w-full h-full rounded-t-md"
                                     style={{borderTopLeftRadius: "0.375rem", borderTopRightRadius: "0.375rem"}}
                                     src="https://cdn.pixabay.com/photo/2014/04/02/10/17/glacier-gray-303360_1280.jpg"
                                     alt=""
                                />
                            </div>
                            <div className={"Avatar"} style={{paddingLeft: "20px"}}>
                                <Avatar style={{transform: "translateY(-100px)"}}
                                        sx={{width: "10rem", height: "10rem"}}/>
                            </div>
                        </div>
                        <div className="space-y-3" style={{transform: "translateY(-50px)"}}>
                            {/* Form Fields */}
                            <TextField
                                label="First Name"
                                name="firstname"
                                variant="outlined"
                                fullWidth
                                defaultValue={state.user?.firstname}
                                margin="normal"
                                onChange={(e) => setUpdatedUser({...updatedUser, firstName: e.target.value})} // Update state on change
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={state.user?.lastname}
                                margin="normal"
                                onChange={(e) => setUpdatedUser({...updatedUser, lastName: e.target.value})} // Update state on change
                            />
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                defaultValue={state.user?.username}
                                margin="normal"
                                onChange={(e) => setUpdatedUser({...updatedUser, username: e.target.value})} // Update state on change
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={state.user?.email}
                                onChange={(e) => setUpdatedUser({...updatedUser, email: e.target.value})} // Update state on change
                            />
                            <TextField
                                label="Biography"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={state.user?.biography}
                                onChange={(e) => setUpdatedUser({...updatedUser, biography: e.target.value})} // Update state on change
                            />
                            <PasswordField
                                label=" Set new password"
                                defaultValue={state.user?.password}
                                onChange={(e) => setUpdatedUser({...updatedUser, password: e.target.value})}
                            />
                            <div style={{marginTop: "1.5rem", marginBottom: "-1.75rem"}}>
                                <Button color="error" onClick={onHandleOpenConfirmDeleteProfileDialog}>
                                    Delete account
                                </Button>
                                <CreateDialogDeleteAccount openConfirmDialog={openConfirmDialog}
                                                           onHandleCloseConfirmDeleteProfileDialog={onHandleCloseConfirmDeleteProfileDialog}
                                                           onHandleDeleteAccount={onHandleDeleteAccount}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <IconButton onClick={onHandleClickCloseButton}>
                                    <CloseIcon/>
                                </IconButton>
                                <p style={{marginTop: "0.75rem", marginBottom: "0.75rem"}}>Close</p>
                            </div>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
