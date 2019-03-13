import { goallExamine } from '../../../common/commonConfig'

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量审核',
        onClick: goallExamine
      }
    }
  ]
}
