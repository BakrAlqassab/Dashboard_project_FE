import { Context } from '@nuxt/types';

export default function ({ store, redirect }: Context) {
  if (!store.state.auth.token) {
    return redirect('/auth/login');
  }
}
