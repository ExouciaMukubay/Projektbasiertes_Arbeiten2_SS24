import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React from 'react';

export const config: ViewConfig = {
    menu: { order: 4, icon: 'line-awesome/svg/globe-solid.svg' },
    route: 'friends',
    title: 'Friends',
    loginRequired: true,
};

/**
 * Displays friend view [in progress]
 * @constructor
 */
export default function FriendsView() {
    return (
        <div>
            <input placeholder={"Search friends..."}/>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                Ali Connors
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                to Scott, Alex, Jennifer
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                Sandra Adams
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
        </div>
    );
}
