import { queryProvinceList, queryCityList, queryDistrictList } from '@/services/common';

const DEFAULT_OPTIONS = {
  label: '类目',
  name: 'category',
  placeholder: '请选择类目',
  value: [],
  categoryDeep: 2,
}

const makeItem = (ind, list) => {
  return list.map(p => {
    return {
      label: p.name,
      value: p.code,
      deep: ind,
      isLeaf: ind === 2,
    };
  })
}

const getOptions = (options, value ,newChildren) => {
  return options.map(option => {
    if (option.children) {
      return {
        ...option,
        children: getOptions(option.children, value, newChildren)
      }
    }

    if (option.value === value) {
      return {
        ...option,
        loading: false,
        children: newChildren,
      }
    }
    return option
  })
}

export default (option = {}) => {
  return (leFrom) => {
    const { label, name, placeholder, value } = Object.assign({}, DEFAULT_OPTIONS, option)

    const loadData = async (selectedOptions, initIds) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      const { deep } = targetOption
      targetOption.loading = true;
      let newChildren = []
      if (deep === 0) {
        newChildren = await queryCityList({provinceCode: targetOption.value}).then(res => {
          return makeItem(deep + 1, res)
        })
      } else if (deep === 1) {
        newChildren = await queryDistrictList({cityCode: targetOption.value}).then(res => {
          return makeItem(deep + 1, res)
        })
      }

      const { options } = leFrom.getProps(name)
      const newOptions = getOptions(options, targetOption.value, newChildren)
      leFrom.setProps(name, { options: newOptions })
      if (initIds && deep !== DEFAULT_OPTIONS.categoryDeep) {
        loadData([{ deep: deep + 1, value: initIds[deep + 1]}], initIds)
      }
    }

    setTimeout(() => {
      queryProvinceList().then(res => {
        if (!res) return
        const options = makeItem(0, res)
        leFrom.setProps(name, {options});
        const initIds = leFrom.getValue(name)
        if (initIds.length > 1) {
          loadData([{ deep: 0, value: initIds[0] }], initIds)
        }
      });
    });

    return {
      label,
      name,
      component: 'Cascader',
      value,
      props: {
        placeholder,
        options: [],
        loadData
      }
    }
  }
}
