import React, {useState} from 'react';
import 'Frontend/themes/hilla-social-media-app/styles.css';
import {Dialog, EmailField, FormLayout, PasswordField, VerticalLayout} from "@vaadin/react-components";
import {Button} from "@vaadin/react-components/Button.js";
import {TextField} from "@vaadin/react-components/TextField.js";
import {useNavigate} from "react-router-dom";
import {UserService} from "Frontend/generated/endpoints";
import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {useAuth} from "Frontend/util/auth";
import {Notification} from '@hilla/react-components/Notification.js';

/**
 * View will be excluded from layout
 */
export const config: ViewConfig = {
    menu: {exclude: true},
};

export default function SignUpView() {

    /**
     * Initialize states for dialog -> set initially true for dialog is opened
     */
    const [dialogOpened, setDialogOpened] = useState(true);

    const {login} = useAuth();
    const navigate = useNavigate();

    /**
     * Set columns in one text field
     */
    const responsiveSteps = [
        {minWidth: '0', columns: 1},
        {minWidth: '100px', columns: 2},
    ];


    /**
     * Set state for user object
     */
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    /**
     * Checks if all fields are filled and returns true or else false
     */
    const isFormValid = () => {
        return !!(user.firstName &&
            user.lastName &&
            user.username &&
            user.email &&
            user.password);
    };

    const onHandleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (await UserService.checkIfUserAlreadyExists(user)) {
            Notification.show('User already exists', {
                position: 'bottom-center',
                duration: 3000,
                theme: 'error',
            });
        } else {
            Notification.show('User created successfully!', {
                position: 'bottom-center',
                duration: 0,
                theme: 'success',
            });
            await UserService.addUser(user);
            setDialogOpened(false);
            await login(user.username, user.password); // automatically user will be logged in
            navigate("/");
        }
    };
    return (
        <Dialog
            headerTitle="Create an account"
            opened={dialogOpened}
            onOpenedChanged={({detail}) => {
                setDialogOpened(detail.value);
            }}
            footerRenderer={() => (
                <>
                    <Button
                        onClick={() => {
                            setDialogOpened(false);
                            navigate("/login");
                        }}
                    >Cancel</Button>
                    <Button
                        theme="primary"
                        disabled={!isFormValid()}
                        onClick={(e) => onHandleSignUp(e)}
                    >Submit</Button>
                </>
            )}>
            <VerticalLayout style={{alignItems: 'stretch', width: '30rem', maxWidth: '100%'}}>
                <FormLayout responsiveSteps={responsiveSteps}>
                    <TextField required={true} label="First name" errorMessage="First name is required" onChange={e => {
                        setUser({...user, firstName: e.target.value})
                    }}
                    />
                    <TextField required={true} label="Last name" errorMessage="Last name is required" onChange={e => {
                        setUser({...user, lastName: e.target.value})
                    }} />
                    <TextField required={true} {...{colspan: 2}} label="Username" errorMessage="Username is required"
                               helperText={"Username must have at least 8 characters"} onChange={e => {
                        setUser({...user, username: e.target.value})
                    }} />
                    <EmailField required={true} {...{colspan: 2}} label="Email address"
                                errorMessage="Enter a valid email address"
                                clearButtonVisible onChange={e => {
                        setUser({...user, email: e.target.value})
                    }}></EmailField>
                    <PasswordField {...{colspan: 2}} required={true} label="Password"
                                   helperText={"Password must have at least 8 characters"}
                                   errorMessage="Password is required"
                                   onChange={e => {
                                       setUser({...user, password: e.target.value})
                                   }}/>
                </FormLayout>
            </VerticalLayout>
        </Dialog>
    );
}
