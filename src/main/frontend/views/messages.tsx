import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import * as React from "react";


export const config: ViewConfig = {
    menu: { order: 2, icon: 'line-awesome/svg/comments.svg' },
    title: 'Messages',
    loginRequired: true,
};

/**
 * Displays message view
 * @constructor
 */
export default function MessagesView() {
    return (
        <>
        </>
    );
}
