import CommentDto from "Frontend/generated/com/example/application/data/model/dto/CommentDto";
import PostDto from "Frontend/generated/com/example/application/data/model/dto/PostDto";
import * as React from "react";
import User from "Frontend/generated/com/example/application/data/model/User";
import UserDto from "Frontend/generated/com/example/application/data/model/dto/UserDto";

export interface ProfileModalProps {
    openEditCommentModal: boolean;
    onHandleClosEditCommentModal: () => void;
}

export interface EditCommentModalProps extends ProfileModalProps {
    commentItem: CommentDto | undefined;
    onHandleCloseAnchorElementCommentMenu: () => void;

    onFetchUpdatedComments(): Promise<void>;
}

export interface PostModalProps {
    postItem: PostDto | undefined;

    onFetchUpdatePosts(): Promise<void>;
}

export interface ShowCommentsProps {
    commentItem: CommentDto;
    setCommentToBeDeleted: React.Dispatch<React.SetStateAction<CommentDto | undefined>>;
    setCommentToBeEdited: React.Dispatch<React.SetStateAction<CommentDto | undefined>>;
    setAnchorElementCommentMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    openAnchorElementCommentMenu: boolean;
}

export interface WriteCommentProps {
    setCreateComment: React.Dispatch<React.SetStateAction<{ creationDateTime: string, text: string, postId: string | undefined, user: User | undefined }>>;
    onHandleCreateComment(): Promise<void>;
}

export interface EditPostModalProps {
    openEditPostModal: boolean;
    setOpenEditPostModal: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    postItem: PostDto | undefined;
    setPostToBeUpdated: React.Dispatch<React.SetStateAction<PostDto>>;
    setDisableUpdatePostButton: React.Dispatch<React.SetStateAction<boolean>>;
    postToBeUpdated: PostDto;

    onSendRequestToUpdatePost(): Promise<void>;

    disableUpdatePostButton: boolean;
}

export interface MenuProps {
    anchorElementItemMenu: HTMLElement | null
    openAnchorElementItemMenu: boolean;
    setAnchorElementItemMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    setOpenEditItemModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSendDeleteRequestOnSelectedItem(): Promise<void>;
}

export interface UserSuggestionProps {
    userSuggestion : UserDto;
    fetchUnfriendedUsers(): Promise<void>;
}

