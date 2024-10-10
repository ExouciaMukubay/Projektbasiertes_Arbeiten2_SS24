import {Menu, MenuItem} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {MenuProps} from "Frontend/util/postsprops";

/**
 * Displays post menu to either edit or delete post
 * @param anchorElementItemMenu
 * @param openAnchorElementItemMenu
 * @param setAnchorElementItemMenu
 * @param setOpenEditItemModal
 * @param onSendDeleteRequestOnSelectedItem
 * @constructor
 */
export default function PostMenu({anchorElementItemMenu, openAnchorElementItemMenu, setAnchorElementItemMenu, setOpenEditItemModal, onSendDeleteRequestOnSelectedItem}: MenuProps) {
    return (
        <Menu
            id="post-menu"
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