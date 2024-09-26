import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {useSignal} from '@vaadin/hilla-react-signals';
import {LoginOverlay} from '@vaadin/react-components/LoginOverlay.js';
import {useAuth} from 'Frontend/util/auth';
import {useNavigate} from "react-router-dom";

/**
* Login will be excluded from menu
*/
export const config: ViewConfig = {
    menu: {exclude: true},
};

const i18n = {
    header: {
        title: 'Social Media App',
    },
    form: {
        title: 'Sign in',
        username: 'Username',
        password: 'Password',
        submit: 'Sign in',
        forgotPassword: 'Don\'t\ have an account? Sign up'
    },
    errorMessage: {
        title: 'Incorrect username or password',
        message: 'Check that you have entered the correct username and password and try again.',
        username: 'Username is required',
        password: 'Password is required'
    }
};

export default function LoginView() {
    const {login} = useAuth();
    const loginError = useSignal(false);
    const navigate = useNavigate();

    const onSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
            <LoginOverlay
                opened autofocus
                onForgotPassword={onSignUp}
                error={loginError.value}
                i18n={i18n}
                onLogin={async ({detail: {username, password}}) => {
                    const {defaultUrl, error, redirectUrl} = await login(username, password);

                    if (error) {
                        loginError.value = true;
                    } else {
                        const url = redirectUrl ?? defaultUrl ?? '/';
                        const path = new URL(url, document.baseURI).pathname;
                        console.log(document.baseURI);
                        console.log(path.toString());
                        document.location = path;
                    }
                }}
            />
        </div>
    );
}
