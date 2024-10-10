import {Menu, MenuItem} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {MenuProps} from "Frontend/util/postsprops";

/**
 * Opens comment menu to edit or delete the comment
 * @param anchorElementCommentMenu
 * @param openAnchorElementCommentMenu
 * @param setAnchorElementCommentMenu
 * @param setOpenEditCommentModal
 * @param onHandleDeleteSelectedComment
 * @constructor
 */
export default function CommentMenu({anchorElementItemMenu, openAnchorElementItemMenu, setAnchorElementItemMenu, setOpenEditItemModal, onSendDeleteRequestOnSelectedItem} : MenuProps) {
    return (
        <Menu
            id="comment-menu"
            anchorEl={anchorElementItemMenu}
            open={openAnchorElementItemMenu}
            onClose={() => setAnchorElementItemMenu(null)}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => setOpenEditItemModal(true)}>
                <EditIcon fontSize="small" style={{marginRight: "0.5rem"}}/>
                Edit
            </MenuItem>

            <MenuItem onClick={onSendDeleteRequestOnSelectedItem}>
                <DeleteIcon fontSize="small" style={{marginRight: "0.5rem"}}/>
                Delete
            </MenuItem>
        </Menu>
    );
}