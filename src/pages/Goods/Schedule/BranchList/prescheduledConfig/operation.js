import { allBackoff, allSetSchedule } from '../../../common/commonConfig'

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量回退',
        onClick: allBackoff
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量排期',
        onClick: allSetSchedule
      }
    }

  ],
}
