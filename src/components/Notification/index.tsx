import React from 'react';
import connect, { NotificationProps } from '@Components/Notification/connect';

export const NotificationView: React.FC<NotificationProps> = () => {
  return <div>notifications</div>;
};

export default connect(NotificationView);
