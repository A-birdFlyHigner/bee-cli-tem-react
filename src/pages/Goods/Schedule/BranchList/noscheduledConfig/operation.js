import { allSetSchedule, allRevoke } from '../../../common/commonConfig'

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量排期',
        onClick: allSetSchedule
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量撤销',
        onClick: allRevoke
      }
    }
  ]
}
