import { allBackoff, allSetSchedule, joinGroup } from '../../../common/commonConfig'

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
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '加入分组',
        onClick: joinGroup
      }
    }

  ],
}
