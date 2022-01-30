export interface NotificationI {
  title: string;
  text: string;
  onClose(): void;
  color: string;
  actions?: { text: string; action(): void }[];
}

export interface NotificationsI {
  items: NotificationI[];
}
