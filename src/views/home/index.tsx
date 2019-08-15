import Loadable from 'react-loadable'
import LoadingBar from '@components/PageLoading'

export default Loadable({
  loader: () => import('./view'),
  loading: LoadingBar
})
