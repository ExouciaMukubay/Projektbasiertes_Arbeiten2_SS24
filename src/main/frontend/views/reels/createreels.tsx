import {ViewConfig} from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
    menu: { order: 3, icon: 'line-awesome/svg/plus-circle-solid.svg' },
    route: 'createreels',
    title: 'Create Reels',
    loginRequired: true,
};

export default function CreateReels(){
    return(
        <>Hi Reels</>
    )
        ;
}