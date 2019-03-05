// import _ from 'lodash'
import { queryProvinceList, queryCityList, queryDistrictList } from '@/services/common';

const DEFAULT_OPTIONS = {
  deep: 3,
  name: ['provinceCode', 'cityCode', 'districtCode'],
  placeholder: ['省份', '城市', '区'],
};

export default (options = {}) => {
  return function(self) {
    const deep = options.deep || DEFAULT_OPTIONS.deep;
    const value = options.value || [];

    const provinceChange = (value, opt) => {
      self.core.setValue(DEFAULT_OPTIONS.name[0], value);
      self.core.setValue(DEFAULT_OPTIONS.name[1], null);
      self.core.setValue(DEFAULT_OPTIONS.name[2], null);
      queryCityList({ provinceCode: value }).then(res => setValueFun(1, res));
      if (deep !== 3) return;
      setValueFun(2);
    };

    const cityChange = (value, opt) => {
      self.core.setValue(DEFAULT_OPTIONS.name[1], value);
      if (deep !== 3) return;
      self.core.setValue(DEFAULT_OPTIONS.name[2], null);
      queryDistrictList({ cityCode: value }).then(res => setValueFun(2, res));
    };

    const districtChange = (value, opt) => {
      self.core.setValue(DEFAULT_OPTIONS.name[2], value);
    };

    const makeItem = ind => {
      let item = {
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
          onChange: ind === 0 ? provinceChange : ind === 1 ? cityChange : districtChange,
          options: [],
        },
        when: (values, core) => {
          if (!options.hideItem) return true;
          if (ind === 1) {
            return !!values[DEFAULT_OPTIONS.name[0]];
          }
          if (ind === 2) {
            return !!values[DEFAULT_OPTIONS.name[1]];
          }
        },
      };
      return item;
    };

    const settings = [];

    for (let i = 0; i < deep; i++) {
      settings.push(makeItem(i));
    }

    setTimeout(() => {
      queryProvinceList().then(res => setValueFun(0, res));
      if (self.core.value[DEFAULT_OPTIONS.name[0]]) {
        queryCityList({
          provinceCode: self.core.value[DEFAULT_OPTIONS.name[0]],
        }).then(res => setValueFun(1, res));
      }
      if (deep === 3 && self.core.value[DEFAULT_OPTIONS.name[1]]) {
        queryDistrictList({
          cityCode: self.core.value[DEFAULT_OPTIONS.name[1]],
        }).then(res => setValueFun(2, res));
      }
    });

    const setValueFun = (ind, val = []) => {
      if (!val) return;
      self.core.setProps(DEFAULT_OPTIONS.name[ind], {
        options: val.map(p => {
          return {
            label: p.name,
            value: p.code,
          };
        }),
      });
    };
    return settings;
  };
};
