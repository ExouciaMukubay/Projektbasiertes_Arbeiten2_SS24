import {Avatar} from "@mui/material";
import {stringAvatar} from "Frontend/util/styling";
import {MAX_COMMENT_TEXT_LENGTH} from "Frontend/util/constants";
import * as React from "react";
import {useAuth} from "Frontend/util/auth";
import {WriteCommentProps} from "Frontend/util/postsprops";

/**
 * Handles to write comments
 * @param setCreateComment
 * @param onHandleCreateComment
 * @constructor
 */
export default function WriteCommentsSection({setCreateComment, onHandleCreateComment}: WriteCommentProps){
    const {state} = useAuth();

    return(
        <div className="flex items-center space-x-5 mx-3 my-5" style={{height: "50px"}}>
            <Avatar {...stringAvatar(`${state?.user?.firstname} ${state?.user?.lastname}`)}/>
            <input onChange={(e) => setCreateComment(prev => ({
                ...prev,
                text: e.target.value
            }))}

                   onKeyPress={(e) => {
                       if (e.key == "Enter") {
                           onHandleCreateComment()
                       }
                   }}
                   className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
                   type="text"
                   placeholder="Write comment..."
                   maxLength={MAX_COMMENT_TEXT_LENGTH}/>
        </div>
    );

}