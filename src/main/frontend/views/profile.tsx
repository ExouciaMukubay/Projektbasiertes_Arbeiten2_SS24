import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {useParams} from "react-router-dom";

export const config: ViewConfig = {
    menu: { order: 4, icon: 'line-awesome/svg/user.svg' },
    route: 'profile/:id',
    title: 'Profile',
    loginRequired: true,
};

export default function ProfileView() {
    const {id} = useParams();
    return (
        <>
            <h1>Profile {id}</h1>
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img style={{ width: '200px' }} src="images/Community.jpg" />
            <h2>This place intentionally left empty</h2>
            <p>It’s a place where you can grow your own UI 🤗</p>
        </div>
            </>
    );
}
