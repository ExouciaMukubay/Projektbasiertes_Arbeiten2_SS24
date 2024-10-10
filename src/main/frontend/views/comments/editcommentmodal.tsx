import React, {useRef, useState} from "react";
import {Notification} from "@hilla/react-components/Notification";
import Modal from "@mui/material/Modal";
import {Avatar, Box, TextareaAutosize} from "@mui/material";
import {boxStyleForCreatePost, stringAvatar} from "Frontend/util/styling";
import {MAX_COMMENT_TEXT_LENGTH} from "Frontend/util/constants";
import Button from "@mui/material/Button";
import {EditCommentModalProps} from "Frontend/util/postsprops";
import CommentDto from "Frontend/generated/com/example/application/data/model/dto/CommentDto";
import {CommentService} from "Frontend/generated/endpoints";

/**
 * Manages when user edits his comment
 * @param onHandleClosEditCommentModal
 * @param openEditCommentModal
 * @param commentItem
 * @param onHandleCloseAnchorElementCommentMenu
 * @param onFetchUpdatedComments
 * @constructor
 */
export default function EditCommentModal({onHandleClosEditCommentModal, openEditCommentModal, commentItem, onHandleCloseAnchorElementCommentMenu, onFetchUpdatedComments}: EditCommentModalProps) {
    const [commentToBeUpdated, setCommentToBeUpdated] = useState<CommentDto>(commentItem as CommentDto);
    const [disableUpdateCommentButton, setDisableUpdateCommentButton] = useState(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    const onSendRequestToUpdateComment = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            if (commentToBeUpdated.text != '') {
                await CommentService.updateComment(commentToBeUpdated);
                await onFetchUpdatedComments();
                Notification.show('Update comment succeed!', {
                    position: 'bottom-center',
                    duration: 1000,
                    theme: 'success',
                });
            }
            //close edit comment modal
            onHandleClosEditCommentModal();
            //clos edit comment menu
            onHandleCloseAnchorElementCommentMenu();
        } catch (e: any) {
            Notification.show('Update comment failed! Try again!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
            onHandleClosEditCommentModal();

            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }

        }
    }

    return (
        <div>
            <Modal
                open={openEditCommentModal}
                onClose={onHandleClosEditCommentModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyleForCreatePost}>
                    <form>
                        <div>
                            <div style={{marginLeft: "1rem"}} className="flex items-center">
                                <Avatar {...stringAvatar(`${commentItem?.user?.firstname} ${commentItem?.user?.lastname}`)}/>
                                <div>
                                    <p style={{fontSize: "1 rem", lineHeight: "1.75rem", marginLeft: "0.75rem"}}
                                       className="font-bold text-lg">{commentItem?.user?.firstname} {commentItem?.user?.lastname}</p>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        marginTop: "-0.5rem",
                                        marginLeft: "0.75rem"
                                    }} className="text-sm">@{commentItem?.user?.username}</p>
                                </div>
                            </div>
                            <TextareaAutosize style={{marginTop: "0.5rem"}}
                                              defaultValue={commentItem?.text}
                                              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounde-sm"
                                              name="caption" maxRows={10} maxLength={MAX_COMMENT_TEXT_LENGTH}
                                              onChange={(e) => {
                                                  setCommentToBeUpdated({...commentItem, text: e.target.value});

                                                  if (commentItem?.text != '') {
                                                      setDisableUpdateCommentButton(false);
                                                  }
                                              }

                                              }/>
                            <p style={{color: "gray", fontSize: "10px"}}>{`${commentToBeUpdated?.text?.length}/${MAX_COMMENT_TEXT_LENGTH}`} </p>
                            <div className="flex w-full justify-end">
                                <Button variant="contained" sx={{borderRadius: "1.5rem"}}
                                        onClick={onSendRequestToUpdateComment} disabled={disableUpdateCommentButton}>Update
                                    Comment</Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}