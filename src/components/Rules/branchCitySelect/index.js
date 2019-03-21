import debounce from 'lodash/debounce';

const DEFAULT_OPTIONS = {
  label: 'label名称',
  name: 'keyName',
  placeholder: '请输入label名称',
};

export default (options = {}) => {
  return (leForm) => {

    const { label, name, placeholder, requestService, value } = Object.assign({}, DEFAULT_OPTIONS, options);

    const onSearch = async (value) => {

      const params = {
        [name]: value,
        page: 1,
        pageSize: 50,
      }
      const selectOptions = await requestService(params).then(res => {

        return res && res.map(item => {return {value: item.id, label: item.companyName}})
      });

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
          placeholder,
          showSearch: true,
          filterOption: false,
          onSearch: handleSearch,

        },
      },
    ];
  };
};
