import {Avatar, Card, IconButton} from "@mui/material";
import {Icon} from "@vaadin/react-components";
import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import CreatePostModal from "Frontend/views/posts/createpostmodal";
import React, {useEffect, useRef, useState} from "react";
import {PostService} from "Frontend/generated/endpoints";
import {useAuth} from "Frontend/util/auth";
import PostCardView from "./posts/postcard";
import {stringAvatar, StyledBadge} from "Frontend/util/styling";
import PostDto from "Frontend/generated/com/example/application/data/model/dto/PostDto";

export const config: ViewConfig = {
    menu:
        {exclude: true},
}

/**
 * Displays postcards and comments
 * @constructor
 */
export default function MiddlePartView() {
    const {state} = useAuth();
    const [posts, setPosts] = useState<PostDto[]>([]);
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
            fetchPosts();
    }, [openCreatePostModal])

    const fetchPosts = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try{
            const res = await PostService.findAllPostsFromGivenUserAndFriends(state.user?.id as string);
            setPosts(res);

        }catch (e: any){
            if(e.name === "AbortError"){
                console.log("Aborted");
                return;
            }
        }finally{
            setIsLoading(false);
        }
    };

    const handleCloseCreatePostModal= () => setOpenCreatePostModal(false);

    const handleOpenCreatePostModal = () =>
        setOpenCreatePostModal(true);


    return (
        <>
        <div className="px-20 mt-5">
            {/* ######: Card for posting  */}
            <Card className="p-5 mt-5">
                {/*___: Add avatar and input field into card */}
                <div className="flex ">
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar style={{marginLeft : "15px"}} {...stringAvatar(`${state.user?.firstname} ${state.user?.lastname}`)}/>
                    </StyledBadge>
                    {/*___: when input field is clicked, open postmodal */}
                    <input readOnly
                           onClick={handleOpenCreatePostModal}
                           style={{width : "90%"}}
                           className="outline-none rounded-full px-5 bg-transparent border-[#3b4054] border"
                           type="text" placeholder="Crete new post..."/>
                </div>
                {/*___: Add image into card */}
                <div className="flex justify-center space-x-9 mt-5">
                    <div className="items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <Icon style={{padding: '0.5em'}} icon="vaadin:picture" slot="prefix"></Icon>
                        </IconButton>
                        <span>image</span>
                    </div>
                    {/*___: Add video into card */}
                    <div className="items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <Icon style={{padding: '0.5em'}} slot="prefix" icon="vaadin:file-start"></Icon>
                        </IconButton>
                        <span>video</span>
                    </div>
                    {/*___: Add write article into card */}
                    <div className="items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <Icon style={{padding: '0.5em'}} slot="prefix" icon="vaadin:edit"></Icon>
                        </IconButton>
                        <span>Write article</span>
                    </div>
                </div>
            </Card>

            {/* ######: Add multiple PostCardViews*/}
            <div className="mt-5 space-y-5">
                {isLoading && <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Posts are loading...</h1>}
                {!isLoading &&
                posts.map((item) => <PostCardView key={item.id} postItem={item} onFetchUpdatePosts={fetchPosts}/>)}
            </div>

            {/* when input field is clicked, open post modal*/}
            <div>
                <CreatePostModal openEditCommentModal={openCreatePostModal} onHandleClosEditCommentModal={handleCloseCreatePostModal}/>
            </div>
        </div>
            </>
    );
}