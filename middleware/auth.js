import { auth } from '~/plugins/firebase'

export default function({ redirect, route }) {
  if (!auth.currentUser) {
    return redirect('/')
  }
}
