import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {Avatar, Box, Card, Tab, Tabs} from "@mui/material";
import {useAuth} from "Frontend/util/auth";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import EditProfileView from "Frontend/views/profile/editprofile";
import {PostService} from "Frontend/generated/endpoints";
import PostCardView from "Frontend/views/posts/postcard";
import {stringAvatar} from "Frontend/util/styling";
import {useParams} from "react-router-dom";
import PostDto from "Frontend/generated/com/example/application/data/model/dto/PostDto";


export const config: ViewConfig = {
    menu: {order: 5, icon: 'line-awesome/svg/user.svg'},
    route: 'userprofile/:userId',
    title: 'Profile',
    loginRequired: true,
};

export default function UserProfileView() {
    const {state} = useAuth();
    const {userId} = useParams();
    const [tabValue, setTabValue] = useState('post');
    const [createdPosts, setCreatedPosts] = useState<PostDto[]>([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [likedPosts, setLikedPosts] = useState<PostDto[]>([]);
    const [savedPosts, setSavedPosts] = useState<PostDto[]>([]);


    useEffect(() => {
        fetchPosts();
        fetchAllLikedPosts();
        fetchAllSavedPosts();
    }, [])

    const fetchPosts = async () => {
        // needed to canacel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const res = await PostService.findAllPostsByGivenUserId(state.user?.id as string);
            setCreatedPosts(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllLikedPosts = async () => {
        // needed to canacel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const res = await PostService.getLikedPostsFromUser(state.user?.id as string);
            setLikedPosts(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllSavedPosts = async () => {
        // needed to canacel API calls when they are not needed anymore
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const res = await PostService.getSavedPostsFromUser(state.user?.id as string);
            setSavedPosts(res);

        } catch (e: any) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenProfileModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onHandleTab = () => {
        fetchPosts();
        fetchAllLikedPosts();
        fetchAllSavedPosts();
    }

    const onHandleTabChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <Card className='my-10 w-[70%]'>
            {/*___:Add background image*/}
            <div className='rounded-md'>
                <div className='h-[15rem]'>
                    <img
                        style={{width: "100rem", height: "20rem", borderTopLeftRadius: "0.375rem", borderTopRightRadius: "0.375rem"}}
                        className='rounded-t-md'
                        src='https://cdn.pixabay.com/photo/2014/04/02/10/17/glacier-gray-303360_1280.jpg'
                        alt=''/>
                </div>
                <div style={{height: "80px"}} className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
                    <Avatar {...stringAvatar(`${state?.user?.firstname} ${state?.user?.lastname}`)}
                            style={{transform: "translateY(-100px)"}}
                            className='transition-transform -translate-y-100'
                            sx={{width: "10rem", height: "10rem"}}/>

                    {/*___: Add edit profile component*/}
                    <EditProfileView/>
                </div>

                {/*___: User profile */}
                <div className='p-5'>
                    <div>
                        <h1 className='py-1 font-bold text-xl'>
                            {state.user?.firstname} {state.user?.lastname}
                        </h1>
                        <p>@{state.user?.username?.toLowerCase()}</p>
                        <p>{state.user?.biography}</p>
                    </div>
                    <div className="flex gap-5 items-center py-2">
                        <span style={{display: "block"}}>{createdPosts.length} Posts</span>
                        <span style={{display: "block", padding: "10px"}}>35 Friends</span>
                    </div>

                    {/*___:Add tabs*/}
                    <section>
                        <Box sx={{width: '100%', borderBottom: 1, borderColor: "divider"}}>
                            <Tabs
                                value={tabValue}
                                onChange={onHandleTabChange}
                                aria-label="wrapped label tabs example"
                            >
                                <Tab
                                    onClick={onHandleTab}
                                    value="post"
                                    label="Post"
                                    wrapped
                                />
                                <Tab onClick={onHandleTab} value="liked" label="Liked"/>
                                <Tab onClick={onHandleTab} value="saved" label="Saved"/>
                            </Tabs>
                        </Box>

                        {/*___: Add content to tabs value*/}
                        {/*___: Add posts*/}
                        <div className='flex justify-center'>
                            {tabValue === "post" ? (
                                    <div className="space-y-5 w-[70%] my-10">
                                        {isLoading &&
                                            <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Posts are loading...</h1>}
                                        {!isLoading &&
                                            createdPosts.map((item) => (
                                                <PostCardView key={item.id} postItem={item}
                                                              onFetchUpdatePosts={fetchPosts}/>))}
                                    </div>)
                                : tabValue === "liked" ? (
                                        <div className="space-y-5 w-[70%] my-10">
                                            {isLoading && <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Posts are
                                                loading...</h1>}
                                            {!isLoading && likedPosts &&
                                                likedPosts.map((item) => (
                                                    <PostCardView key={item.id} postItem={item}
                                                                  onFetchUpdatePosts={fetchPosts}/>))}
                                        </div>)
                                    : tabValue === "saved" ? (
                                            <div className="space-y-5 w-[70%] my-10">
                                                {isLoading &&
                                                    <h1 style={{fontSize: "16px", marginTop: "1.75rem"}}> Posts are
                                                        loading...</h1>}
                                                {!isLoading && savedPosts &&
                                                    savedPosts.map((item) => (
                                                        <PostCardView key={item.id} postItem={item}
                                                                      onFetchUpdatePosts={fetchPosts}/>))}
                                            </div>)
                                        : ("")
                            }
                        </div>
                    </section>
                </div>
            </div>
        </Card>
    );
}
