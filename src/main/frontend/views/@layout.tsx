import {createMenuItems, useViewConfig} from '@vaadin/hilla-file-router/runtime.js';
import {effect, signal} from '@vaadin/hilla-react-signals';
import {AppLayout, Avatar, DrawerToggle, Icon, SideNav, SideNavItem} from '@vaadin/react-components';
import {useAuth} from 'Frontend/util/auth.js';
import React, {Suspense, useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Divider} from "@mui/material";
import {Button} from "@vaadin/react-components/Button.js";

const defaultTitle = document.title;
const documentTitleSignal = signal('');
effect(() => {
    document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

/**
 * Defines layout and navigation of the application
 */
export default function MainLayout() {
    /**
     * Create state for document title
     */
    const currentTitle = useViewConfig()?.title ?? defaultTitle;
    /**
     * Create state for logout
     */
    const {state, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        documentTitleSignal.value = currentTitle;

        {/*___: TODO to be deleted*/
        }
        console.log("CurrentTitle: " + currentTitle);
    }, [currentTitle]);


    /**
     * Create style for header
     */
    const h1Style = {
        fontSize: 'var(--lumo-font-size-l)',
        margin: 0,
    };

    return (
        <AppLayout primarySection="drawer">
            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h1 slot="navbar" style={h1Style}>
                Social Media App
            </h1>
            {state.user ? (
                <>
                    <div slot="drawer" className="flex flex-col justify-between h-full p-m">
                        <header className="flex flex-col gap-m">
                            {/*___: for extra space*/}
                            <span></span>
                            <span></span>
                            {/*___: Add side navigation*/}
                            <SideNav onNavigate={({path}) => navigate(path!)} location={location}>
                                {createMenuItems().map(({to, title, icon}) => (
                                    <SideNavItem path={to} key={to}>
                                        {icon ? <Icon src={icon} slot="prefix"></Icon> : <></>}
                                        {title}
                                    </SideNavItem>
                                ))}
                            </SideNav>
                        </header>

                        {/*___: Add footer*/}
                        <footer className="flex flex-col gap-s">
                            {state.user ? (
                                <>
                                    <Divider/>
                                    {/*___: Add avater at the foot with user first, last and username*/}
                                    <div className="flex items-center gap-s font-bold">
                                        <Avatar theme="xsmall" name={`${state.user.firstname} ${state.user.lastname}`}/>
                                        {state.user.firstname} {state.user.lastname}
                                    </div>
                                    <div className="flex items-center gap-s opacity-70">
                                        <p className="italic">@{state.user.username}</p>
                                    </div>

                                    {/*___: add button to sign out */}
                                    <Button
                                        onClick={async () => {
                                            await logout();
                                            document.location.reload();
                                        }}
                                    >
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <Link to="/login">Sign in</Link>
                            )}
                        </footer>
                    </div>
                </>
            ) : null}
            <Suspense>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
