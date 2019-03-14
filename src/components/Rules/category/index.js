import { queryCategoryList } from '@/services/common';

const DEFAULT_OPTIONS = {
  label: '类目',
  name: 'categoryId',
  placeholder: '请选择类目',
  value: [],
}

const makeItem = (ind, list) => {
  return list.map(p => {
    return {
      label: p.name,
      value: p.id,
      deep: ind,
      isLeaf: p.isLeaf,
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
      const { deep, isLeaf } = targetOption
      targetOption.loading = true;
      let newChildren = []
      if (!isLeaf) {
        newChildren = await queryCategoryList({parentId: targetOption.value}).then(res => {
          return makeItem(deep, res)
        })
      }
      const { options } = leFrom.getProps(name)
      const newOptions = getOptions(options, targetOption.value, newChildren)
      leFrom.setProps(name, { options: newOptions })
      if (initIds && deep < initIds.length - 1) {
        loadData([{ 
          deep: deep + 1, 
          value: initIds[deep]
        }], initIds)
      }
    }

    setTimeout(() => {
      queryCategoryList({parentId: 0}).then(res => {
        if (!res) return
        const options = makeItem(0, res)
        leFrom.setProps(name, {options});
        const initIds = leFrom.getValue(name) || []
        if (initIds.length) {
          loadData([{ deep: 1, value: initIds[0] }], initIds)
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
