// import _ from 'lodash'
import { queryProvinceList, queryCityList, queryDistrictList } from '@/services/common';

const DEFAULT_OPTIONS = {
  deep: 3,
  name: ['provinceCode', 'cityCode', 'districtCode'],
  placeholder: ['省份', '城市', '区'],
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

    const provinceChange = (val) => {
      leForm.setValue(DEFAULT_OPTIONS.name[0], val);
      leForm.setValue(DEFAULT_OPTIONS.name[1], null);
      leForm.setValue(DEFAULT_OPTIONS.name[2], null);
      queryCityList({ provinceCode: val }).then(res => setValueFun(1, res));
      if (deep !== 3) return;
      setValueFun(2);
    };

    const cityChange = (val) => {
      leForm.setValue(DEFAULT_OPTIONS.name[1], val);
      if (deep !== 3) return;
      leForm.setValue(DEFAULT_OPTIONS.name[2], null);
      queryDistrictList({ cityCode: val }).then(res => setValueFun(2, res));
    };

    const districtChange = (val) => {
      leForm.setValue(DEFAULT_OPTIONS.name[2], val);
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
          onChange: [provinceChange, cityChange, districtChange][ind],
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
      queryProvinceList().then(res => setValueFun(0, res));
      if (leForm.getValue([DEFAULT_OPTIONS.name[0]])) {
        queryCityList({
          provinceCode: leForm.getValue([DEFAULT_OPTIONS.name[0]]),
        }).then(res => setValueFun(1, res));
      }
      if (deep === 3 && leForm.getValue([DEFAULT_OPTIONS.name[1]])) {
        queryDistrictList({
          cityCode: leForm.getValue([DEFAULT_OPTIONS.name[1]]),
        }).then(res => setValueFun(2, res));
      }
    });

    return settings;
  };
};
