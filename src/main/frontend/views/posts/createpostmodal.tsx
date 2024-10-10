import Modal from "@mui/material/Modal";
import {Avatar, Box, TextareaAutosize} from "@mui/material";
import {useAuth} from "Frontend/util/auth";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {boxStyleForCreatePost, stringAvatar} from "Frontend/util/styling";
import {Notification} from "@hilla/react-components/Notification";
import {ProfileModalProps} from "Frontend/util/postsprops";
import {MAX_POST_CONTENT_TEXT_LENGTH} from "Frontend/util/constants";
import {PostService} from "Frontend/generated/endpoints";


//TODO:
export default function CreatePostModal({onHandleClosEditCommentModal, openEditCommentModal}: ProfileModalProps) {
    const {state} = useAuth();
    const [createPost, setCreatePost] = useState({
        creationDateTime: '',
        content: '',
        imageUrl: '',
        userId: state.user?.id
    });
    
    const [disablePostButton, setDisablePostButton] = useState(true);



    // const [selectedImage, setSelectedImage] = useState();
    //   const [selectedVideo, setSelectedVideo] = useState();
    //  const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {


    }

    const handleSelectImage = () => {

    }

    const handleSelectVideo = () => {

    }


    const onHandleCreateNewPost = async () => {
        if (createPost.content != '') {
            await PostService.createPost(state.user?.id as string, createPost);
            Notification.show('Create new post succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });
            // reset for text value length
            createPost.content = '';
            // close modal
            onHandleClosEditCommentModal();
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
                                <Avatar {...stringAvatar(`${state.user?.firstname} ${state.user?.lastname}`)}/>
                                <div>
                                    <p style={{fontSize: "1 rem", lineHeight: "1.75rem", marginLeft: "0.75rem"}}
                                       className="font-bold text-lg">{state.user?.firstname} {state.user?.lastname}</p>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        marginTop: "-0.5rem",
                                        marginLeft: "0.75rem"
                                    }} className="text-sm">@{state.user?.username}</p>
                                </div>
                            </div>
                            <TextareaAutosize style={{marginTop: "0.5rem"}}
                                      className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounde-sm"
                                      placeholder="Write caption..." name="caption" maxRows={10} maxLength={MAX_POST_CONTENT_TEXT_LENGTH}
                                      onChange={(e) => {
                                          setCreatePost({...createPost, content: e.target.value});

                                          if (createPost.content != '') {
                                              setDisablePostButton(false);
                                          }
                                      }

                                      }/>
                            <p style={{color: "gray", fontSize:"10px"}}>{`${createPost.content.length}/${MAX_POST_CONTENT_TEXT_LENGTH}`} </p>
                            {/* <div className="flex space-x-5 items-center mt-5">
                       <div>
                           <input type="file" accept="image/*" onChange={handleSelectImage} style={{display : "none"}} id ="image-input"/>
                           <label htmlFor="image-input">
                               <IconButton color ="primary">
                                   <ImageIcon/>
                               </IconButton>
                           </label>
                           <span>Image</span>
                       </div>
                       <div>
                           <input type="file" accept="video/*" onChange={handleSelectVideo} style={{display : "none"}} id ="video-input"/>
                           <label htmlFor="video-input">
                               <IconButton color ="primary">
                                   <VideoCallIcon/>
                               </IconButton>
                           </label>
                           <span>Video</span>
                       </div>
                   </div>
                       {/* if image is selected show it down below for preview*/}
                            {/*   {selectedImage && <div>
                           <img className="h-[10rem]" src={selectedImage} alt=""/>
                       </div>}
*/}
                            <div className="flex w-full justify-end">
                                <Button variant="contained" sx={{borderRadius: "1.5rem"}}
                                        onClick={onHandleCreateNewPost} disabled={disablePostButton}>Post</Button>
                            </div>
                        </div>
                    </form>
                    {/* <Backdrop
                        sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>*/}
                </Box>
            </Modal>
        </div>
    );
}