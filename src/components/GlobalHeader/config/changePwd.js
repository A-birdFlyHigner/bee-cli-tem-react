const {userName = ''} = JSON.parse(sessionStorage.getItem('HQBSFORSHOP') || '{}')

export default {
  form: {
    layout: { // 表单布局 左侧和右侧比例
      label: 6,
      control: 18
    }
  },
  items: [{
    label: '账号',
    name: 'username',
    value: userName,
    status: 'preview',
  }, {
    label: '新密码',
    name: 'password',
    props: {
      type: 'password'
    },
    reules: {
      type: "string", 
      required: true
    }
  }, {
    label: '确认密码',
    name: 'confirmPassword',
    props: {
      type: 'password'
    },
    reules: {
      type: "string", 
      required: true
    }
  }]
}