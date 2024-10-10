import {createMenuItems, useViewConfig} from '@vaadin/hilla-file-router/runtime.js';
import {effect, signal} from '@vaadin/hilla-react-signals';
import {AppLayout, DrawerToggle, Icon, SideNav, SideNavItem} from '@vaadin/react-components';
import {useAuth} from 'Frontend/util/auth.js';
import React, {Suspense, useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Avatar, Divider, Typography} from "@mui/material";
import {Button} from "@vaadin/react-components/Button.js";
import {allowedTitles, APP_NAME} from "Frontend/util/constants";
import {stringAvatar, StyledBadge} from 'Frontend/util/styling';
import {UserService} from "Frontend/generated/endpoints";

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
    const currentTitle = useViewConfig()?.title ?? defaultTitle;
    const {state, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        documentTitleSignal.value = currentTitle;
    }, [currentTitle]);

    return (
        <AppLayout primarySection="drawer">
            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h1 slot="navbar" style={{fontSize: "var(--lumo-font-size-l)", margin: 0}}>
                {APP_NAME}
            </h1>
            {state.user ? (
                <>
                    <div slot="drawer" className="flex flex-col justify-between h-full p-m" style={{backgroundColor : "#f9f9f9"}}>
                        <header className="flex flex-col gap-m">
                            {/*___: for extra space*/}
                            <span></span>
                            <span></span>
                            {/*___: Add side navigation*/}
                            <SideNav onNavigate={({path}) => navigate(path!)} location={location}>
                                {createMenuItems()
                                    .filter(({to, title, icon}) => allowedTitles.includes(title ?? ''))
                                    .map(({to, title, icon}) => (

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

                                    <div className="flex items-center gap-s">

                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar {...stringAvatar(`${state.user?.firstname} ${state.user?.lastname}`)}/>
                                        </StyledBadge>

                                        <Typography align="center">
                                            <span style={{fontWeight: 'bold'}}>
                                                {state.user.firstname} {state.user.lastname}
                                            </span>
                                            <br/>
                                            @{state.user.username}
                                        </Typography>
                                    </div>

                                    {/*___: add button to sign out */}
                                    <Button
                                        onClick={async () => {
                                            await UserService.setOnlineStatusOfflineWhenLogginOut(state.user?.id as string);
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
