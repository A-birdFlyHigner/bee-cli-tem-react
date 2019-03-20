import {Select} from 'antd'
import debounce from 'lodash/debounce';

// const Option = Select.Option;
const {Option} = Select

const DEFAULT_OPTIONS = {
  label: 'label名称',
  name: 'keyName',
  placeholder: '请输入label名称',
};

export default (options = {}) => {
  return (leForm) => {

    const { label, name, paramName, placeholder, requestService, value } = Object.assign({}, DEFAULT_OPTIONS, options);

    const onSearch = async (value) => {

      const paramKey = paramName || name
      const params = {
        [paramKey]: value,
        page: 1,
        pageSize: 50,
      }
      const selectOptions = await requestService(params).then(res => {

        return res && res.map(item => {return {value: item.key, label: item.value}})
      });

      console.log('selectOptions', selectOptions)

      leForm.setProps(name, { options: selectOptions });
    };

    const handleSearch = debounce(onSearch, 600);
    return [
      {
        label,
        name,
        component: 'Select',
        value,
        props: {
          placeholder: placeholder,
          showSearch: true,
          filterOption: false,
          onSearch: handleSearch,
        },
      },
    ];
  };
};
