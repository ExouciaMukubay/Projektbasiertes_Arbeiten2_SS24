import {Avatar} from "@mui/material";

export default function StoryCircleView() {
    return (
        <div>
            <div className="flex flex flex-col items-center mr-4 cursor-pointer" style={{marginTop: "20px"}}>
                <Avatar sx={{width: "3rem", height: "3rem"}} className="flex flex-col items-center mr-4 cursor-pointer">
                </Avatar>
                <p>user</p>
            </div>
        </div>
    );
}
