import {ViewConfig} from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
    route: '*',
    menu: {
        exclude: true,
    },
};

/**
 * Displays error view
 * @constructor
 */
export default function ErrorView() {
    return <div className='p-l'>Page not found</div>;
}
