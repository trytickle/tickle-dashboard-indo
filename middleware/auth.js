import { auth } from '~/plugins/firebase'

export default function({ redirect }) {
  if (!auth.currentUser) {
    return redirect('/')
  }
}
