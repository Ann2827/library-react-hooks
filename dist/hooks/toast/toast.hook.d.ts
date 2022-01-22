import type { RecursivePartial, ToastI, ToastSettingsI } from './toast.types';
export declare const toastSettings: (props: RecursivePartial<ToastSettingsI>) => void;
export declare const useToast: () => ToastI;
