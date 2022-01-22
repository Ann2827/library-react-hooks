export interface NotificationI {
  title: string;
  text: string;
  onClose(): void;
}

export interface NotificationsI {
  items: NotificationI[];
}
