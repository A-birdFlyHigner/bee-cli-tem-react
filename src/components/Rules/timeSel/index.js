import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

const DEFAULT_OPTIONS = {
  label: '选择时间',
  name: ['startTime', 'endTime'],
  placeholder: ['开始时间', '结束时间'],
};

export default (options = {}) => {
  return function() {
    const self = this;
    const label = options.label || DEFAULT_OPTIONS.label;
    const name = options.name || DEFAULT_OPTIONS.name;
    const value = options.value || [];

    return [
      {
        label: label,
        name: name[0],
        component: 'DatePicker',
        value: value[0] && moment(value[0]),
        props: {
          placeholder: DEFAULT_OPTIONS.placeholder[0],
          showTime: {
            format: 'HH:mm:ss',
          },
          format: 'YYYY-MM-DD HH:mm:ss',
          dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
          disabledDate: s => {
            const e = self.core.value[name[1]];
            if (!s || !e) return false;
            return s.valueOf() > e.valueOf();
          },
        },
      },
      {
        label: '',
        name: name[1],
        component: 'DatePicker',
        value: value[1] && moment(value[1]),
        props: {
          placeholder: DEFAULT_OPTIONS.placeholder[1],
          showTime: {
            format: 'HH:mm:ss',
          },
          format: 'YYYY-MM-DD HH:mm:ss',
          disabledDate: e => {
            const s = self.core.value[name[0]];
            if (!e || !s) return false;
            return e.valueOf() < s.valueOf();
          },
        },
      },
    ];
  };
};
