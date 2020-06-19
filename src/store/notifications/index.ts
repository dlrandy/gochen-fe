import { StoreState } from '@Store/createStore';
import reducerRegistry from '@Store/reducerRegistry';
// types
type InitialState = StoreState;
export type NotificationState = Array<{ id?: number; content?: string }>;
export type ADD_NOTIFICATION = `abbyprog/notifications/ADD_NOTIFICATION`;
export type REMOVE_NOTIFICATION = `abbyprog/notifications/REMOVE_NOTIFICATION`;
type ActionPayload = { content: string };
type ActionLoad = {
  payload?: ActionPayload;
  type?: ADD_NOTIFICATION | REMOVE_NOTIFICATION;
};

const initialState: NotificationState = [];
const notificationId = 0;
const reducerName = 'notifications';
const createActionName = (name: string) => `abbyprog/${reducerName}/${name}`;

// selectors
export const selectAllNotifications = ({ notifications }: InitialState) =>
  notifications;
export const selectNextNotification = ({ notifications = [] }: InitialState) =>
  notifications[notificationId];
// actions
export const ADD_NOTIFICATION = createActionName('ADD_NOTIFICATION');
export const REMOVE_NOTIFICATION = createActionName('REMOVE_NOTIFICATION');

// action creators
export const addNotification = (payload: ActionPayload) => ({
  payload,
  type: ADD_NOTIFICATION,
});
export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });

// reducer
export default function reducer(
  state: NotificationState = initialState,
  action: ActionLoad = {}
): NotificationState {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, { ...action.payload, id: notificationId + 1 }];
    case REMOVE_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);
