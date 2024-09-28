import {ViewConfig} from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
    menu: { order: 3, icon: 'line-awesome/svg/globe-solid.svg' },
    route: 'friends',
    title: 'Friends',
    loginRequired: true,
};

export default function FriendsView() {
    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img style={{ width: '200px' }} src="images/Community.jpg" />
            <h2>This place intentionally left empty</h2>
            <p>It’s a place where you can grow your own UI 🤗</p>
        </div>
    );
}
