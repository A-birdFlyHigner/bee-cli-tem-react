// import _ from 'lodash'
import { queryBranchCityList } from '@/services/common';

const DEFAULT_OPTIONS = {
  deep: 1,
  name: ['cityCode'],
  placeholder: ['城市'],
};

export default (options = {}) => {
  return (leForm) => {
    const deep = options.deep || DEFAULT_OPTIONS.deep;
    const value = options.value || [];

    const setValueFun = (ind, val = []) => {
      if (!val) return;
      leForm.setProps(DEFAULT_OPTIONS.name[ind], {
        options: val.map(p => {
          return {
            label: p.name,
            value: p.code,
          };
        }),
      });
    };

    const cityChange = (val) => {
      leForm.setValue(DEFAULT_OPTIONS.name[0], val);
    };

    const makeItem = ind => {
      const item = {
        label: ind === 0 ? options.label : '',
        name: DEFAULT_OPTIONS.name[ind],
        component: 'Select',
        value: value[ind],
        follow: ind !== 0,
        class: 'aaa',
        className: 'aaa',
        props: {
          class: 'aaa',
          className: 'aaa',
          placeholder: DEFAULT_OPTIONS.placeholder[ind],
          onChange: [cityChange][ind],
          options: [],
        },
        when: (values) => {
          if (!options.hideItem) return true;
          if (ind === 1) {
            return !!values[DEFAULT_OPTIONS.name[0]];
          }
          return !!values[DEFAULT_OPTIONS.name[1]];
        },
      };
      return item;
    };

    const settings = [];

    for (let i = 0; i < deep; i += 1) {
      settings.push(makeItem(i));
    }

    setTimeout(() => {
      queryBranchCityList().then(res => setValueFun(0, res));
    });

    return settings;
  };
};
