import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  removeNotification,
  selectNextNotification,
  NotificationState,
} from '@Store/notifications/index';

import { StoreState } from '@Store/createStore';

const mapStateToProps = createStructuredSelector<
  StoreState,
  {
    nextNotification: NotificationState;
  }
>({
  nextNotification: selectNextNotification,
});
const mapDispatchToProps = {
  removeNotification,
};

export type NotificationProps = {
  nextNotification: NotificationState;
  removeNotification: () => {
    type: string;
  };
};
export default connect(mapStateToProps, mapDispatchToProps);
