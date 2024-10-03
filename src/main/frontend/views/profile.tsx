import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {useParams} from "react-router-dom";
import {Avatar, Box, Card, Tab, Tabs} from "@mui/material";
import {useAuth} from "Frontend/util/auth";
import {SyntheticEvent, useState} from "react";
import PostCardView from "Frontend/views/posts/postcard";
import UserReelCard from "Frontend/views/reels/userreelcard";
import Editprofile from "Frontend/views/profile/editprofile";

export const config: ViewConfig = {
    menu: {order: 5, icon: 'line-awesome/svg/user.svg'},
    route: 'profile',
    title: 'Profile',
    loginRequired: true,
};
//TODO: route/:id

export default function ProfileView() {
    const [value, setValue] = useState('post');

    const [open, setOpen] = useState(false);
    const handleOpenProfileModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const posts = [1, 1, 1, 1];
    const reels = [1, 1, 1, 1];
    const savedPosts = [1, 1, 1, 1];
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const {id} = useParams();
    const {state} = useAuth();
    return (
        <Card className='my-10 w-[70%]'>
            {/* Add background image*/}
            <div className='rounded-md'>
                <div className='h-[15rem]'>
                    <img style={{width: "100rem", height: "20rem"}} className='rounded-t-md'
                         src='https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg'
                         alt=''/>
                </div>
                <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
                    <Avatar style={{transform: "translateY(-100px)"}}
                            className='transition-transform -translate-y-100'
                            sx={{width: "10rem", height: "10rem"}}/>

                   <Editprofile/>
                    {/* {true ? <Button sx={{borderRadius: "20px"}} variant="outlined">Edit Profile</Button> :
                        <Button sx={{borderRadius: "20px"}} variant="outlined">Follow</Button>} */}
                </div>

                <div className='p-5'>
                    <div>
                        <h1 className='py-1 font-bold text-xl'>
                            {state.user?.firstname} {state.user?.lastname}
                        </h1>
                        <p>@{state.user?.username?.toLowerCase()}</p>
                        <p>{state.user?.biography}</p>
                    </div>


                    <div className="flex gap-5 items-center py-2">
                        <span style={{display: "block"}}>41 Posts</span>
                        <span style={{display: "block", padding: "10px"}}>35 Friends</span>
                    </div>
                    <div>
                        <p>Biography of user </p>
                    </div>

                    {/*___:Add tabs*/}
                    <section>
                        <Box sx={{width: '100%', borderBottom: 1, borderColor: "divider"}}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="wrapped label tabs example"
                            >
                                <Tab
                                    value="post"
                                    label="Post"
                                    wrapped
                                />
                                <Tab value="reels" label="Reels"/>
                                <Tab value="saved" label="Saved"/>
                            </Tabs>
                        </Box>

                        {/*___: Add content to tabs value*/}
                        {/*___: Add posts*/}
                        <div className='flex justify-center'>
                            {value === "post" ? (
                                    <div className="space-y-5 w-[70%] my-10">
                                        {posts.map((item) => (
                                            <div className='border border-slate-100
                                     rounded-md'>
                                                <PostCardView/>
                                            </div>
                                        ))}
                                        {/*___: Add reels*/}
                                    </div>
                                )
                                : value === "reels" ? <div style={{marginTop: "10px"}}
                                                           className='flex justify-center flex-wrap gap-2 my-10'>
                                        {reels.map((item) => <UserReelCard/>)}
                                    </div>
                                    : value === "saved" ? <div className="space-y-5 w-[70%] my-10">
                                        {savedPosts.map((item) => (
                                            <div className='border border-slate-100
                                     rounded-md'>
                                                <PostCardView/>
                                            </div>))}
                                    </div> : (
                                        ""
                                    )}
                        </div>
                    </section>
                </div>
            </div>
            <section>
                <Editprofile
                />
            </section>
        </Card>
    );
}
