import {Avatar, CardHeader, IconButton, Tooltip} from "@mui/material";
import Button from '@mui/material/Button';
import {stringAvatar, StyledBadge} from "Frontend/util/styling";
import {useEffect, useRef, useState} from "react";
import {FriendshipService} from "Frontend/generated/endpoints";
import {useAuth} from "Frontend/util/auth";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {green, red} from "@mui/material/colors";
import {UserSuggestionProps} from "Frontend/util/postsprops";
import {Notification} from "@hilla/react-components/Notification";

/**
 * Displays user to suggest send friend request
 * @param userSuggestion
 * @param fetchUnfriendedUsers
 * @constructor
 */
//TODO: Bug Get Friends does not work
export default function UserSuggestionsCard({userSuggestion, fetchUnfriendedUsers}: UserSuggestionProps) {
    const {state} = useAuth();
    const abortControllerRef = useRef<AbortController | null>(null);
    const [friendshipIsPending, setFriendshipIsPending] = useState(false);
    const [friendRequestedWasInitiatedByCurrentUser, setFriendRequestedWasInitiatedByCurrentUser] = useState(false);

    useEffect(() => {
        checkFriendshipStatus();
    }, []);

    const onHandleSendFriendRequest = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await FriendshipService.sendFriendRequest(state.user?.id as string, userSuggestion?.id as string);
            await checkFriendshipStatus();
        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const checkFriendshipStatus = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            const isFriendshipPending = await FriendshipService.checkIfFriendshipIsPending(state.user?.id as string, userSuggestion?.id as string);
            console.log("Check if Friendship is pending: ." + isFriendshipPending);
            setFriendshipIsPending(isFriendshipPending);

            if (isFriendshipPending) {
                console.log("Friendship is pending");
                const initiatedByUser = await FriendshipService.checkIfCurrentUserInitiatedFriendRequest(state?.user?.id as string, userSuggestion?.id as string);
                console.log("Check if current user id {} initiated friend request: {}.", state?.user?.id, initiatedByUser);
                setFriendRequestedWasInitiatedByCurrentUser(initiatedByUser);
            }
        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const onHandleSendRequestAcceptFriendship = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await FriendshipService.acceptFriendRequest(state?.user?.id as string, userSuggestion.id as string);
            await fetchUnfriendedUsers();

            Notification.show('Accept friendship request succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });
        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const onHandleSendRequestDeclineFriendship = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await FriendshipService.declineFriendshipRequest(state?.user?.id as string, userSuggestion.id as string);
            await fetchUnfriendedUsers();

            Notification.show('Accept friendship request succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    }

    return (
        <div>
            <CardHeader
                avatar={
                    <div>
                        {userSuggestion.online &&
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                variant="dot"
                            >
                                <Avatar {...stringAvatar(`${userSuggestion.firstName} ${userSuggestion.lastName}`)}>
                                </Avatar>
                            </StyledBadge>
                        }

                        {!userSuggestion.online &&
                            <Avatar {...stringAvatar(`${userSuggestion.firstName} ${userSuggestion.lastName}`)}>
                            </Avatar>
                        }
                    </div>
                }
                action={
                    <div>
                        {friendshipIsPending && friendRequestedWasInitiatedByCurrentUser &&
                            <Button disabled size="small">Pending</Button>
                        }

                        {friendshipIsPending && !friendRequestedWasInitiatedByCurrentUser &&
                            <div className="flex">
                                <Tooltip title="Accept Friend Request">
                                    <IconButton onClick={onHandleSendRequestAcceptFriendship}>
                                        <CheckCircleOutlineIcon sx={{color: green[500]}}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Decline Friend Request">
                                    <IconButton onClick={onHandleSendRequestDeclineFriendship}>
                                        <HighlightOffIcon sx={{color: red[500]}}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        }

                        {!friendshipIsPending &&
                            <Button size="small" onClick={onHandleSendFriendRequest}>
                                Add User
                            </Button>
                        }
                    </div>
                }
                title={userSuggestion?.firstName + ' ' + userSuggestion?.lastName}
                subheader={"@" + userSuggestion?.username}
            />
        </div>
    );
}
