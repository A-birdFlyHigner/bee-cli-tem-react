import React from 'react';
import PropTypes from 'prop-types';
import { ImageList } from '@/components/list';
import { Card } from 'antd';

export function RateCard({
  rateTime = '',
  creationTime = '',
  context = '',
  content = '',
  imageVOList = [],
  subTitle = '',
}) {
  return (
    <Card extra={`${subTitle}${rateTime || creationTime}`}>
      <p style={{ padding: '20px 0px' }}>{`${context || content}`}</p>
      {imageVOList && imageVOList.length > 0 && imageVOList instanceof Array && (
        <ImageList dataSource={imageVOList} />
      )}
    </Card>
  );
}

RateCard.propTypes = {
  rateTime: PropTypes.any,
  creationTime: PropTypes.any,
  context: PropTypes.any,
  content: PropTypes.any,
  imageVOList: PropTypes.any,
  subTitle: PropTypes.any,
};
