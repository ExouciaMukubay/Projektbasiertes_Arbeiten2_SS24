import {Avatar, CardHeader} from "@mui/material";
import {stringAvatar, StyledBadge} from "Frontend/util/styling";
import Link from "@mui/material/Link";
import UserDto from "Frontend/generated/com/example/application/data/model/dto/UserDto";

/**
 * Displays users according to search
 */
export default function SearchUserCards({userToSearch}: { userToSearch: UserDto }) {
    return (
        <CardHeader
            avatar={
                <div>
                    {userToSearch.online &&
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                        >
                            <Avatar {...stringAvatar(`${userToSearch.firstName} ${userToSearch.lastName}`)}>
                            </Avatar>
                        </StyledBadge>}
                    {!userToSearch.online &&
                        <Avatar {...stringAvatar(`${userToSearch.firstName} ${userToSearch.lastName}`)}>
                        </Avatar>}
                </div>
            }
            title={<Link href={'/userprofile/' + userToSearch.id} underline="hover">{
                userToSearch.firstName} {userToSearch.lastName} </Link>}
            subheader={userToSearch.username}
        />

    );

}