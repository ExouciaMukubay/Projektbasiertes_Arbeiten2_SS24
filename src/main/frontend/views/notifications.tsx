import {ViewConfig} from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/bell.svg' },
  title: 'Notifications',
  loginRequired: true,
};

/**
 * Displays notification view
 * @constructor
 */
export default function NotificationsView() {
  return (
  <></>
  );
}
