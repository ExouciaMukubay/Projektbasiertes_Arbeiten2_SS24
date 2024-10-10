import Modal from "@mui/material/Modal";
import {Avatar, Box, TextareaAutosize} from "@mui/material";
import {boxStyleForCreatePost, stringAvatar} from "Frontend/util/styling";
import {MAX_POST_CONTENT_TEXT_LENGTH} from "Frontend/util/constants";
import Button from "@mui/material/Button";
import * as React from "react";
import {EditPostModalProps} from "Frontend/util/postsprops";

/**
 * Opens modal to edit/update post
 * @param openEditPostModal
 * @param setOpenEditPostModal
 * @param postItem
 * @param setPostToBeUpdated
 * @param setDisableUpdatePostButton
 * @param postToBeUpdated
 * @param onSendRequestToUpdatePost
 * @param disableUpdatePostButton
 * @constructor
 */
export default function EditPostModal({openEditPostModal, setOpenEditPostModal, postItem, setPostToBeUpdated, setDisableUpdatePostButton, postToBeUpdated, onSendRequestToUpdatePost, disableUpdatePostButton}: EditPostModalProps) {
    return(
        <Modal
            open={openEditPostModal}
            onClose={() => setOpenEditPostModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyleForCreatePost}>
                <form>
                    <div>
                        <div style={{marginLeft: "1rem"}} className="flex items-center">
                            <Avatar {...stringAvatar(`${postItem?.user?.firstName} ${postItem?.user?.lastName}`)}/>
                            <div>
                                <p style={{fontSize: "1 rem", lineHeight: "1.75rem", marginLeft: "0.75rem"}}
                                   className="font-bold text-lg">{postItem?.user?.firstName} {postItem?.user?.lastName}</p>
                                <p style={{
                                    fontSize: "0.875rem",
                                    lineHeight: "1.25rem",
                                    marginTop: "-0.5rem",
                                    marginLeft: "0.75rem"
                                }} className="text-sm">@{postItem?.user?.username}</p>
                            </div>
                        </div>
                        <TextareaAutosize style={{marginTop: "0.5rem"}}
                                          defaultValue={postItem?.content}
                                          className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounde-sm"
                                          placeholder="Write caption..." name="caption" maxRows={10} maxLength={MAX_POST_CONTENT_TEXT_LENGTH}
                                          onChange={(e) => {
                                              setPostToBeUpdated({...postItem, content: e.target.value});

                                              if (postItem?.content != '') {
                                                  setDisableUpdatePostButton(false);
                                              }
                                          }

                                          }/>
                        <p style={{color: "gray", fontSize:"10px"}}>{`${postToBeUpdated?.content?.length}/${MAX_POST_CONTENT_TEXT_LENGTH}`} </p>
                        <div className="flex w-full justify-end">
                            <Button variant="contained" sx={{borderRadius: "1.5rem"}}
                                    onClick={onSendRequestToUpdatePost} disabled={disableUpdatePostButton}>Update Post</Button>
                        </div>
                    </div>
                </form>

            </Box>
        </Modal>
    );
}