import {Avatar, CardHeader} from "@mui/material";
import {red} from "@mui/material/colors";
import Button from '@mui/material/Button';
import {useAuth} from "Frontend/util/auth";

// Popular User Card
export default function UserSuggestionsCard(){
    const{state} = useAuth();
return(
    <div>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
            }
            action={
                <Button size="small"> Add user
                </Button>
            }
            title={`${state.user?.firstname} ${state.user?.lastname}`}
            subheader={"@"+ `${state.user?.username}`}
        />
    </div>
);
}