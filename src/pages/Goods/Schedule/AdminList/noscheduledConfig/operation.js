import { alladminRevoke } from '../../../common/commonConfig'

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量撤销推广',
        onClick: alladminRevoke
      }
    }
  ]
}
