import {configureAuth} from '@vaadin/hilla-react-auth';
import {AuthenticatedUserService} from 'Frontend/generated/endpoints';

const auth = configureAuth(AuthenticatedUserService.getAuthenticatedUser);

export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
