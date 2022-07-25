import { withSlash } from '../utils/url';

// Main Page
export const ROUTE_MAIN = 'library-react-hooks';

// Hook Pages
export const ROUTE_TOAST = 'toast';
export const ROUTE_FULL_TOAST = withSlash([ROUTE_MAIN, ROUTE_TOAST]);

export const ROUTE_LOADER = 'loader';
export const ROUTE_FULL_LOADER = withSlash([ROUTE_MAIN, ROUTE_LOADER]);

export const ROUTE_HTTP = 'http';
export const ROUTE_FULL_HTTP = withSlash([ROUTE_MAIN, ROUTE_HTTP]);
