import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import * as React from "react";
import {Notification} from '@hilla/react-components/Notification.js';
import {Upload} from '@hilla/react-components/Upload.js';


export const config: ViewConfig = {
    menu: { order: 2, icon: 'line-awesome/svg/comments.svg' },
    title: 'Messages',
    loginRequired: true,
};

export default function MessagesView() {
    const maxFileSizeInMB = 10;
    const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

    return (
        <>
       <>
            <h4>Upload file</h4>
            <p>Maximum file size: {maxFileSizeInMB} MB</p>
            <Upload
                maxFiles={1}
                maxFileSize={maxFileSizeInBytes}
                onFileReject={(event) => {
                    Notification.show(event.detail.error);
                }}
            />
        </>
        </>
    );
}
