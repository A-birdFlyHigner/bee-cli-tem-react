import React from 'react';
import { Icon, message } from 'antd';
import _ from 'lodash';
import { commomUploadPicture } from '@/services/common'

const DEFAULT_STATE_KEY = '__upload';
const DEFAULT_OPTIONS = {
  name: 'upload',
  props: {},
};
const DEFAULT_CONFIG = {
  limit: 1,
  size: 400,
  types: ['image/jpeg', 'image/png', 'image/jpg'],
  // width: '',
  // height: '',
  // minWidth: '',
  // maxWidth: '',
  // minHeight: '',
  // maxHeight: '',
};

function readFile(file) {
  const fr = new FileReader();
  fr.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    fr.onload = (fileItem) => {
      resolve(fileItem.target.result);
    };
    fr.onerror = () => {
      reject(new Error('读取图片失败，请刷新页面再次上传图片'));
    };
  });
}

function imgWH(imgSrc) {
  const img = new Image();
  return new Promise((resolve) => {
    img.onload = () => {
      resolve({ imgUrl: imgSrc, width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ imgUrl: imgSrc, width: 0, height: 0 });
    };
    img.src = imgSrc;
  });
}

export default (ruleConf = {}) => {
  return (leForm) => {
    const name = ruleConf.name || DEFAULT_OPTIONS.name;
    const stateKey = `${DEFAULT_STATE_KEY}_${name}`;

    const postFile = (file, whSize) => {
      leForm.setProps(name, {
        isLoading: true,
      });

      const data = new FormData()
      data.append('file', file)
      commomUploadPicture(data).then(res => {
        if (res) {
          let val = leForm.getValue(name) || [];
          val = [
            ...val,
            {
              uid: res,
              url: res,
              ...whSize
            },
          ];
          leForm.setValue(name, val);
          leForm.setProps(name, {
            isLoading: false,
          });
        } else {
          leForm.setProps(name, {
            isLoading: false,
          });
        }
      })
    };

    const regTypeSize = file => {
      const {options = {}} = ruleConf
      const isJPG = options.types ? 
      options.types.indexOf(file.type) > -1 : 
      DEFAULT_CONFIG.types.indexOf(file.type) > -1;
      const size = options.size || DEFAULT_CONFIG.size;
      if (!isJPG) {
        message.warning('上传图片格式不正确');
        return false;
      }
      if (file.size / 1000 > size) {
        message.warning(`上传图片大小不能超过 ${size}K`);
        return false;
      }
      return true;
    };

    const beforeUpload = file => {
      return new Promise((resolve, reject) => {
        const {options = {}} = ruleConf
        const {limit} = options
        let len = leForm.getValue(name);
        if (len === undefined) {
          len = ruleConf.value ? ruleConf.value.length : 0;
        } else {
          len = len ? len.length : 0;
        }
        if (len >= (limit || DEFAULT_CONFIG.limit)) {
          message.warning('上传已达上限');
          return reject();
        }
        if (!regTypeSize(file)) {
          return reject();
        }
        const { width, height, minWidth, maxWidth, minHeight, maxHeight } = options;
        if (!width && !height && !minWidth && !maxWidth && !minHeight && !maxHeight) {
          return readFile(file).then(res => {
            return imgWH(res).then(rs => {
              postFile(file, {
                width: rs.width,
                height: rs.height
              });
              return reject();
            })
          })
        }
        return readFile(file).then(res => {
          return imgWH(res).then(rs => {
            if (width && rs.width !== width) {
              message.warning(`请上传图片宽度为${width}px的图片`);
              return reject();
            }
            if (height && rs.height !== height) {
              message.warning(`请上传图片高度为${height}px的图片`);
              return reject();
            }
            if (minWidth && rs.width < minWidth) {
              message.warning(`请上传图片最小宽度为${minWidth}px的图片`);
              return reject();
            }
            if (maxWidth && rs.width > maxWidth) {
              message.warning(`请上传图片最大宽度为${maxWidth}px的图片`);
              return reject();
            }
            if (minHeight && rs.height < minHeight) {
              message.warning(`请上传图片最小高度为${minHeight}px的图片`);
              return reject();
            }
            if (maxHeight && rs.height > maxHeight) {
              message.warning(`请上传图片最大高度为${maxHeight}px的图片`);
              return reject();
            }
            postFile(file, {
              width: rs.width,
              height: rs.height
            });
            return reject();
          });
        });
      });
    };

    const handleChange = fileList => {
      let len = leForm.getValue(name);
      len = len ? len.length : 0;
      if (fileList.length < len) {
        leForm.setValue(name, fileList);
        // leForm.setState({
        //   [stateKey]: { loading: false },
        // });
      }
    };

    const children = isLoading => {
      let len = leForm.getValue(name);
      if (len === undefined) {
        len = ruleConf.value ? ruleConf.value.length : 0;
      } else {
        len = len ? len.length : 0;
      }
      const {options = {}} = ruleConf
      const {limit} = options
      return len >= (limit || DEFAULT_CONFIG.limit) ? null : (
        <div>
          <Icon type={isLoading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    };

    const settings = _.merge({}, DEFAULT_OPTIONS, ruleConf, {
      props: (props) => {
        const preProps = ruleConf.props || (() => {});
        const result = typeof preProps === 'function' ? preProps() : preProps;
        const curProps = {
          beforeUpload,
          // customRequest,
          // onRemove,
          onChange: handleChange,
          children: children(props.isLoading),
          ...result,
        };
        return curProps;
      },
    });

    return {
      ...settings,
      component: 'Upload',
    };
  };
};
