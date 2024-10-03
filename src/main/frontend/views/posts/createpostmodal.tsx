import Modal from "@mui/material/Modal";
import {Avatar, Backdrop, Box, CircularProgress, IconButton} from "@mui/material";
import {useAuth} from "Frontend/util/auth";
import ImageIcon from '@mui/icons-material/Image';
import {useState} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Button from "@mui/material/Button";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none"

};
// Typen für die Props des Profilemodal
interface ProfileModalProps {
    open: boolean;
    handleClose: () => void;
}



export default function CreatePostModal({handleClose, open}: ProfileModalProps){
    const {state} = useAuth();

    const [createPost, setCreatePost] = useState({
        id: '',
        creationDateTime: '',
        content: '',
        imageUrl: '',
        userId: state.user?.id
    })

    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () =>{

    }

    const handleSelectImage = () => {

    }

    const handleSelectVideo = () => {

    }


    return(
        <div>
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
               <form onSubmit={handleSubmit}>
                   <div>
                       <div className="flex space-x-4 items-center">
                           <Avatar/>
                           <div>
                               <p style={{fontSize: "1.125rem", lineHeight: "1.75rem"}} className="font-bold text-lg">{state.user?.firstname} {state.user?.lastname}</p>
                               <p style={{fontSize: "0.875rem", lineHeight: "1.25rem"}} className="text-sm">@{state.user?.username}</p>
                           </div>
                       </div>
                       <textarea className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounde-sm" placeholder="Write caption..." name="caption" id=""  rows={10} onChange={(e) => setCreatePost({...createPost, content: e.target.value})}/>
                   <div className="flex space-x-5 items-center mt-5">
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
                       {selectedImage && <div>
                           <img className="h-[10rem]" src={selectedImage} alt=""/>
                       </div>}

                       <div className="flex w-full justify-end">
                           <Button variant="contained" type="submit" sx={{borderRadius: "1.5rem"}}>Post</Button>
                       </div>
                   </div>
               </form>
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
        </div>
    );
}