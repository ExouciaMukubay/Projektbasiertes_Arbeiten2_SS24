import {Avatar, CardHeader} from "@mui/material";
import Button from '@mui/material/Button';
import {stringAvatar, StyledBadge} from "Frontend/util/styling";
import {useState} from "react";
import UserDto from "Frontend/generated/com/example/application/data/model/dto/UserDto";

export default function UserSuggestionsCard({userSuggestion} : {userSuggestion : UserDto }) {
    const [buttonText, setButtonText] = useState("Add user");
   const [disableButton, setDisableButton] = useState(false);

    {/* TODO: Handle Add User --> Friendrequests*/}

    const onHandleAddUser = async () => {
        setButtonText("Pending");
        setDisableButton(true);
        // send user request!
        //notififaction
    }

    return (
        <div>
            {/* TODO: PROFILE PICTURE OF USER*/}
            <CardHeader
                avatar={
                <div>
                    {userSuggestion.online &&
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                    <Avatar {...stringAvatar(`${userSuggestion.firstName} ${userSuggestion.lastName}`)}>
                        </Avatar>
                    </StyledBadge>}
                    {!userSuggestion.online &&  <Avatar {...stringAvatar(`${userSuggestion.firstName} ${userSuggestion.lastName}`)}>
                    </Avatar>}
                </div>

                }
                action={
                    <Button disabled={disableButton} size="small" onClick={onHandleAddUser}> {buttonText}</Button>
                }
                title={userSuggestion?.firstName + ' ' + userSuggestion?.lastName}
                subheader={"@"+ userSuggestion?.username}
            />
        </div>
    );
}