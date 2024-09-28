import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    IconButtonProps,
    styled,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {red} from "@mui/material/colors";
import {useAuth} from "Frontend/util/auth";
import * as React from 'react';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function PostCardView() {
    const {state} = useAuth();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={state.user?.firstname + ' ' + state.user?.lastname}
                subheader={'@'+state.user?.username}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cdn.pixabay.com/photo/2020/09/27/03/38/woman-5605529_640.jpg"
                alt="Running"
            />
            {/*___: Card Content */}
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    She is running.
                </Typography>
            </CardContent>

            {/* Add icons under post*/}
            <CardActions className="flex justify-between" disableSpacing>
               <div>
                   <IconButton>
                       {true? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                       </IconButton>

                       <IconButton>
                           {<ShareIcon/>}
                       </IconButton>

                       <IconButton>
                           {<ChatBubbleIcon/>}
                       </IconButton>
               </div>
                <div>
                    <IconButton>
                        {true? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}