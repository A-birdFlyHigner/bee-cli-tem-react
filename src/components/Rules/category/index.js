import { queryProvinceList, queryCityList, queryDistrictList } from '@/services/common';

const DEFAULT_OPTIONS = {
  label: '类目',
  name: 'category',
  placeholder: '请选择类目',
}

export default (option = {}) => {
  return function (self) {
    const { label, name, placeholder } = Object.assign({}, DEFAULT_OPTIONS, option)
    setTimeout(() => {
      queryProvinceList().then(res => setValueFun(0, res));
    });

    const setValueFun = (ind, val = []) => {
      if (!val) return;
      self.core.setProps(name, {
        options: val.map(p => {
          return {
            label: p.name,
            value: p.code,
            deep: ind,
            isLeaf: ind === 2,
          };
        }),
      });
    };

    const loadData = (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [{
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        }, {
          label: `${targetOption.label} <Dyna></Dyna>mic 2`,
          value: 'dynamic2',
        }];
      }, 1000)
    }

    return {
      label: label,
      name: name,
      component: 'Cascader',
      props: {
        placeholder: placeholder,
        options: [],
        loadData: loadData
      }
    }
  }
}