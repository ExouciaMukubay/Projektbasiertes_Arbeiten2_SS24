import React from 'react';
import {FormLayout, PasswordField} from "@vaadin/react-components";
import {TextField} from "@vaadin/react-components/TextField.js";
import {Button} from "@vaadin/react-components/Button.js";

export default function RegisterView() {
    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 2 },
    ];

    return (
        <div>
        <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="First name" />
            <TextField label="Last name" />
            <TextField label="Email" />
            <TextField label="Phone number" />
            <TextField {...{ colspan: 2 }} label="Username" />
            <PasswordField label="Password" />
            <PasswordField label="Confirm password" />
        </FormLayout>
     
    <Button>Submit</Button>
        </div>

);
}
