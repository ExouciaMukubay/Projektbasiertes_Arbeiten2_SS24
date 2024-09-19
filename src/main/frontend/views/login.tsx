import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import {useSignal} from '@vaadin/hilla-react-signals';
import {LoginI18n, LoginOverlay, LoginOverlayElement} from '@vaadin/react-components/LoginOverlay.js';
import {useAuth} from 'Frontend/util/auth.js';
import {Button} from "@vaadin/react-components/Button.js";
import {useNavigate} from "react-router-dom";

export const config: ViewConfig = {
  menu: { exclude: true },
};

const loginI18n: LoginI18n = {
  ...new LoginOverlayElement().i18n,
  header: { title: 'Social Media App' },
};

export default function LoginView() {
  const { login } = useAuth();
  const loginError = useSignal(false);
  const navigate = useNavigate(); // useHistory für Navigation

    const handleRegisterClick = () => {
        navigate('/register'); // Weiterleitung zur Registrierungsseite
    };
  return (
      <div>
    <LoginOverlay
        error={loginError.value}
      noForgotPassword
      i18n={loginI18n}
      onLogin={async ({ detail: { username, password } }) => {
        const { defaultUrl, error, redirectUrl } = await login(username, password);

        if (error) {
          loginError.value = true;
        } else {
          const url = redirectUrl ?? defaultUrl ?? '/';
          const path = new URL(url, document.baseURI).pathname;
          document.location = path;
        }
      }}

    />

          <Button onClick={handleRegisterClick}> Register </Button>
      </div>
  );
}
