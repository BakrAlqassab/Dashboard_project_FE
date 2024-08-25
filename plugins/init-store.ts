import { Plugin } from '@nuxt/types';

const myPlugin: Plugin = (context) => {
  console.log('Store initialized:', context.store);
};

export default myPlugin;
