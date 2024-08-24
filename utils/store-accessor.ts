import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Auth from '~/store/auth';

let authStore: Auth;

function initialiseStores(store: Store<any>): void {
  authStore = getModule(Auth, store);
}

export { initialiseStores, authStore };
