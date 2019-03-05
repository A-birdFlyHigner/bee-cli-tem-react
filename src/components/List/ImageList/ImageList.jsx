import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from './ImageList.less';

export function ImageList({
  idKey = 'id',
  height = '180px',
  pathKey = 'url',
  nameKey = 'name',
  dataSource = [],
}) {
  return (
    <div>
      {dataSource &&
        dataSource instanceof Array > 0 &&
        dataSource.map((item, index) => {
          let src, name;
          if (typeof item !== 'string') {
            src = item[pathKey];
            name = item[nameKey];
          } else {
            src = item;
          }
          return (
            <div style={{ height }} className={classNames.item} key={item[idKey] || index} span="6">
              {name && <span className={classNames.title}>{name}：</span>}
              <img className={classNames.image} src={src} alt={name} />
            </div>
          );
        })}
    </div>
  );
}

ImageList.propTypes = {
  dataSource: PropTypes.array,
  pathKey: PropTypes.string,
  nameKey: PropTypes.string,
  height: PropTypes.string,
  idKey: PropTypes.string,
};
