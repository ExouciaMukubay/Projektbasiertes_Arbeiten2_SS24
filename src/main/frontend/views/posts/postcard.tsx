import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import {pink, yellow} from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {formatDate} from "Frontend/util/datehandler";
import {CommentService, LikeService, PostService, SaveService} from "Frontend/generated/endpoints";
import {Notification} from "@hilla/react-components/Notification";
import {useAuth} from "Frontend/util/auth";
import SaveDto from "Frontend/generated/com/example/application/data/model/dto/SaveDto";
import CommentDto from "Frontend/generated/com/example/application/data/model/dto/CommentDto";
import LikeDto from "Frontend/generated/com/example/application/data/model/dto/LikeDto";
import {stringAvatar} from "Frontend/util/styling";
import EditCommentModal from "Frontend/views/comments/editcommentmodal";
import {PostModalProps} from "Frontend/util/postsprops";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostDto from "Frontend/generated/com/example/application/data/model/dto/PostDto";
import CommentMenu from "Frontend/views/comments/commentmenu";
import ShowComments from "Frontend/views/comments/showcomments";
import WriteCommentsSection from "Frontend/views/comments/writecommentssection";
import EditPostModal from "Frontend/views/posts/editpostmodal";
import PostMenu from "Frontend/views/posts/postmenu";


/**
 * Displays and structures a post with content and comments section
 * Enables to create/update/delete/like/save post and create/update/delete comment
 * @param postItem
 * @param onFetchUpdatePosts
 * @constructor
 */
export default function PostCardView({postItem, onFetchUpdatePosts}: PostModalProps) {
    const {state} = useAuth();
    const [showCommentsSection, setShowCommentsSection] = useState(false);
    const [comments, setComments] = useState<CommentDto[]>([postItem?.comments as CommentDto]);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [createComment, setCreateComment] = useState({
        creationDateTime: '',
        text: '',
        postId: postItem?.id,
        user: state.user
    });
    const [likes, setLikes] = useState<LikeDto[]>([]);
    const [saves, setSaves] = useState<SaveDto[]>([]);


    // states to open comment and post menu
    const [anchorElementCommentMenu, setAnchorElementCommentMenu] = React.useState<null | HTMLElement>(null);
    const [anchorElementPostMenu, setAnchorElementPostMenu] = React.useState<null | HTMLElement>(null);
    const openAnchorElementCommentMenu = Boolean(anchorElementCommentMenu);
    const openAnchorElementPostMenu = Boolean(anchorElementPostMenu);


    const [commentToBeDeleted, setCommentToBeDeleted] = useState<CommentDto>();
    const [commentToBeEdited, setCommentToBeEdited] = useState<CommentDto>();
    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);

    const [postToBeEdited, setPostToBeEdited] = useState<PostDto>(postItem as PostDto);
    const [openEditPostModal, setOpenEditPostModal] = useState(false);
    const [disableUpdatePostButton, setDisableUpdatePostButton] = useState(true);


    useEffect(() => {
        fetchComments();
        fetchAllLikesFromPost();
        fetchAllSavesFromPost();
    }, []);

    const onHandleCreateComment = async () => {
        if (createComment.text != '') {
            try {
                await CommentService.createComment(state.user?.id as string, postItem?.id as string, createComment);
                Notification.show('Create new comment succeed!', {
                    position: 'bottom-center',
                    duration: 1000,
                    theme: 'success',
                });

                fetchComments();

            } catch (error) {
                console.error("Error creating comment! Try again!", error);
                Notification.show('Failed to create comment.', {
                    position: 'bottom-center',
                    duration: 1000,
                    theme: 'error',
                });
            }
        }
    }

    const fetchComments = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            const res = await CommentService.findAllCommentsByGivenPost(postItem?.id as string);
            setComments(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const fetchAllLikesFromPost = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            const res = await LikeService.getAllLikesFromPost(postItem?.id as string);
            setLikes(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const onHandleLikePost = async () => {
        try {
            await LikeService.likePost(state.user?.id as string, postItem?.id as string);
            await fetchAllLikesFromPost();
        } catch (error) {
            console.error("Error liking post! Try again!", error);
            Notification.show('Failed to like post.', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
        }
    }

    const fetchAllSavesFromPost = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            const res = await SaveService.getAllSavesFromPost(postItem?.id as string);
            setSaves(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    };

    const onHandleSavePost = async () => {
        try {
            await SaveService.savePost(state.user?.id as string, postItem?.id as string);
            await fetchAllSavesFromPost();
        } catch (error) {
            console.error("Error saving post:", error);
            Notification.show('Failed to save post! Try again!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
        }
    }

    const onHandleDeleteSelectedComment = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await CommentService.deleteComment(state.user?.id as string, commentToBeDeleted as CommentDto);
            Notification.show('Delete comment succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });
            setAnchorElementCommentMenu(null);
            fetchComments();
        } catch (e: any) {
            console.error("Error deleting comment:");
            Notification.show('Failed to delete comment.', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    }

    const checkIfPostIsCreatedByUser = () => {
        return postItem?.user?.id === state?.user?.id;
    }

    const onSendDeleteRequestToDeletePost = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await PostService.deletePostById(postItem?.id as string);
            await onFetchUpdatePosts();

            Notification.show('Delete post succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });
            //clos edit post menu
            setAnchorElementPostMenu(null);
        } catch (e: any) {
            console.error("Error deleting post! Try again!");
            Notification.show('Failed to delete post.', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    }

    const onSendRequestToUpdatePost = async () => {
        // needed to cancel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
            await PostService.updatePost(postToBeEdited);
            await onFetchUpdatePosts();

            Notification.show('Update post succeed!', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'success',
            });
            //clos edit post menu
            setAnchorElementPostMenu(null);
        } catch (e: any) {
            console.error("Error updating post! Try again!");
            Notification.show('Failed to update post.', {
                position: 'bottom-center',
                duration: 1000,
                theme: 'error',
            });
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        }
    }


    return (
        <Card sx={{maxWidth: 345, marginTop: "1rem", marginLeft : "50px"}}>
            {/*TODO: user profile picture!*/}
            <CardHeader
                avatar={
                    <Avatar {...stringAvatar(`${state.user?.firstname} ${state.user?.lastname}`)}/>
                }
                action={
                    <div>
                        <IconButton aria-label="more"
                                    aria-haspopup="true"
                                    aria-expanded={openAnchorElementPostMenu ? 'true' : undefined}
                                    aria-controls={openAnchorElementPostMenu ? 'post-menu' : undefined}
                                    onClick={(event) => setAnchorElementPostMenu(event.currentTarget)}
                        >
                            {checkIfPostIsCreatedByUser() && <MoreVertIcon fontSize="small"/>}
                        </IconButton>

                        <PostMenu anchorElementItemMenu={anchorElementPostMenu}
                                  openAnchorElementItemMenu={openAnchorElementPostMenu}
                                  setAnchorElementItemMenu={setAnchorElementPostMenu}
                                  setOpenEditItemModal={setOpenEditPostModal}
                                  onSendDeleteRequestOnSelectedItem={onSendDeleteRequestToDeletePost}/>
                        <div>
                            {/*___: Update post modal*/}
                            <EditPostModal openEditPostModal={openEditPostModal}
                                           setOpenEditPostModal={setOpenEditPostModal}
                                           postItem={postItem}
                                           setPostToBeUpdated={setPostToBeEdited}
                                           setDisableUpdatePostButton={setDisableUpdatePostButton}
                                           postToBeUpdated={postToBeEdited}
                                           onSendRequestToUpdatePost={onSendRequestToUpdatePost}
                                           disableUpdatePostButton={disableUpdatePostButton}
                            />
                        </div>
                    </div>
                }
                title={postItem?.user?.firstName + ' ' + postItem?.user?.lastName}
                subheader={formatDate(postItem?.creationDateTime)}
            />

            {postItem?.imageUrl !== '' && (
                <CardMedia
                    component="img"
                    height="194"
                    image={postItem?.imageUrl}
                    alt="Post Image"
                />
            )}

            {/*___: Card Content */}
            <CardContent>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {postItem?.content}
                </Typography>
            </CardContent>

            {/* Add icons under post*/}
            <CardActions className="flex justify-between" disableSpacing>
                <div>
                    {/*___: Favorite icon*/}
                    <IconButton onClick={onHandleLikePost}>
                        {likes && likes.some((like) => like.key?.userId === state.user?.id)
                            ? <FavoriteIcon sx={{color: pink[500]}}/> : <FavoriteBorderIcon/>}
                    </IconButton>

                    {/*___: Comment icon*/}
                    <IconButton onClick={() => setShowCommentsSection(prevState => !prevState)}>
                        <ChatBubbleIcon/>
                    </IconButton>

                </div>
                <div>
                    {/*___: Save Post icon*/}
                    <IconButton onClick={onHandleSavePost}>
                        {saves && saves.some((save) => save.key?.userId === state.user?.id) ?
                            <BookmarkIcon sx={{color: yellow[500]}}/> : <BookmarkBorderIcon/>}
                    </IconButton>
                </div>

            </CardActions>


            {/*___: Add comments section*/}
            {showCommentsSection &&
                <section>
                    {/*___: Add write comment*/}
                    <WriteCommentsSection setCreateComment={setCreateComment}
                                          onHandleCreateComment={onHandleCreateComment}
                    />
                    <Divider/>
                    {/*___:Add comments*/}
                    <div className="mx-3 space-y-2 my-5 text-xs">
                        {comments &&
                            comments.map((commentItem) =>
                                <ShowComments key={commentItem.id}
                                              commentItem={commentItem}
                                              setCommentToBeDeleted={setCommentToBeDeleted}
                                              setCommentToBeEdited={setCommentToBeEdited}
                                              setAnchorElementCommentMenu={setAnchorElementCommentMenu}
                                              openAnchorElementCommentMenu={openAnchorElementCommentMenu}
                                />
                            )}
                    </div>
                    {/*___:Comment menu*/}
                    <div>
                        <CommentMenu anchorElementItemMenu={anchorElementCommentMenu}
                                     openAnchorElementItemMenu={openAnchorElementCommentMenu}
                                     setAnchorElementItemMenu={setAnchorElementCommentMenu}
                                     setOpenEditItemModal={setOpenEditCommentModal}
                                     onSendDeleteRequestOnSelectedItem={onHandleDeleteSelectedComment}
                        />
                    </div>
                    {/*___: Open EditCommentModal*/}
                    <div>
                        <EditCommentModal openEditCommentModal={openEditCommentModal}
                                          onHandleClosEditCommentModal={() => setOpenEditCommentModal(false)}
                                          commentItem={commentToBeEdited}
                                          onHandleCloseAnchorElementCommentMenu={() => setAnchorElementCommentMenu(null)}
                                          onFetchUpdatedComments={fetchComments}
                        />
                    </div>
                </section>
            }

        </Card>
    );
}