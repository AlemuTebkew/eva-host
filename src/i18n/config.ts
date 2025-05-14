export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'am'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// Export locales for use in other files
export const locales = i18n.locales;
export const defaultLocale = i18n.defaultLocale;

// This is the type for the dictionary
// export type Dictionary = {
//   common: {
//     comparePrice: string;
//     minOrder: string;
//     units: string;
//     noImage: string;
//     suppliers: string;
//   };
//   product: {
//     details: string;
//     price: string;
//     contactSupplier: string;
//     share: string;
//     addToWishlist: string;
//     removeFromWishlist: string;
//   };
//   auth: {
//     login: string;
//     register: string;
//     logout: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     forgotPassword: string;
//     noAccount: string;
//     hasAccount: string;
//   };
//   navigation: {
//     home: string;
//     products: string;
//     about: string;
//     contact: string;
//     profile: string;
//     settings: string;
//   };
// }; 