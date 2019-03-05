import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from './ImageTextCard.less';
import { ImgForTable } from './ImgForTable';

function ImageTextCard({ image = '', infoList = [], labelKey = 'label', valueKey = 'value' }) {
  return (
    <div className={classNames.container}>
      {image && (
        <div className={classNames.imageContainer}>
          <ImgForTable width="80px" height="80px" src={image} />
        </div>
      )}
      <ul className={classNames.infoList}>
        {infoList &&
          infoList.map((item, index) => (
            <li className={classNames.item} key={index}>
              <span>{item[labelKey]}</span>：
              {item.url ? (
                <a className="linkButton" href={item.url} target="__blank">
                  {item[valueKey]}
                </a>
              ) : (
                <span>{item[valueKey]}</span>
              )}
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
}

ImageTextCard.propTypes = {
  height: PropTypes.string,
  image: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  infoList: PropTypes.array,
};

export { ImageTextCard };
