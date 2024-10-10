import {ShowCommentsProps} from "Frontend/util/postsprops";
import {Avatar} from "@mui/material";
import {stringAvatar} from "Frontend/util/styling";
import Link from "@mui/material/Link";
import {formatDate} from "Frontend/util/datehandler";
import * as React from "react";
import {useAuth} from "Frontend/util/auth";

/**
 * Shows comments
 * @param commentItem
 * @param setCommentToBeDeleted
 * @param setCommentToBeEdited
 * @param setAnchorElementCommentMenu
 * @param openAnchorElementCommentMenu
 * @constructor
 */
export default function ShowComments({commentItem, setCommentToBeDeleted, setCommentToBeEdited, setAnchorElementCommentMenu, openAnchorElementCommentMenu  }: ShowCommentsProps){
    const {state} = useAuth();

    return(
        <div key={commentItem?.id} className="flex items-center space-x-5 border outline-1">
            <Avatar {...stringAvatar(`${commentItem?.user?.firstname} ${commentItem?.user?.lastname}`)}
                    style={{height: "2rem", width: "2rem", fontSize: "0.8rem"}}/>
            {/*___:Show comment menu */}
            <div
                style={{paddingLeft: "0.5rem"}}
                onClick={(event) => {
                    if (commentItem?.user?.id === state.user?.id) {
                        setCommentToBeDeleted(commentItem);
                        setCommentToBeEdited(commentItem);
                        setAnchorElementCommentMenu(event.currentTarget);
                    }
                }}
                aria-haspopup="true"
                aria-expanded={openAnchorElementCommentMenu ? 'true' : undefined}
                aria-controls={openAnchorElementCommentMenu ? 'comment-menu' : undefined}
            >
                <Link href="#" underline="hover">{commentItem?.text}
                </Link></div>
            <div style={{marginTop: "0.5rem"}}>
                <div
                    style={{fontSize: "10px", marginTop: "2px", color: "#999", textAlign: "right"}}>
                    {formatDate(commentItem?.creationDateTime)}
                </div>
            </div>
        </div>
    );
}