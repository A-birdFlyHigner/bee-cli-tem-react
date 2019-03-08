import React from 'react';
import { Tag, Tree } from 'antd';
import * as Sty from './index.less';
import treeData from './mokeData';
const { TreeNode } = Tree;

export default tags => {
  return {
    settings: {
      values: { checkedKeys: [], spreadTree: treeData, halfCheckedKeys: [] },
    },
    form: {
      layout: {
        label: 4,
        control: 20,
      },
    },
    items: [
      {
        value:
          '可选推广渠道根据您店铺入驻时签约地区展示，若没有您需要的推广地区，请联系运营签约开通推广渠道。',
        status: 'preview',
        className: Sty.headerTip,
      },
      {
        label: '常用标签',
        name: 'tags',
        value: tags,
        follow: true,
        render: (values, core) => {
          const { tags = [], selTag } = values;
          return tags.map(p => {
            return (
              <Tag
                key={p}
                closable={true}
                className={`${Sty.tag111} ${selTag === p ? Sty.selTag : ''}`}
                onClick={e => {
                  core.setValues({
                    selTag: p,
                    checkedKeys: ['255', '220300', '440300', '440400'],
                  });
                }}
              >
                {p}
              </Tag>
            );
          });
        },
      },
      {
        label: '推广渠道',
        name: 'spreadTree',
        render: (values, core) => {
          const { spreadTree, checkedKeys } = values;
          const onCheck = (keys, e) => {
            core.setValues({
              checkedKeys: keys,
              halfCheckedKeys: e.halfCheckedKeys,
            });
          };
          return (
            <Tree
              className="spread-tree"
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={onCheck}
            >
              <TreeNode title="全部渠道" key="all" dataRef="all" selectable={false}>
                {renderTreeNodes(spreadTree)}
              </TreeNode>
            </Tree>
          );
        },
      },
    ],
  };
};

const renderTreeNodes = data =>
  data.map(item => {
    if (item.children) {
      return (
        <TreeNode
          key={item.key}
          dataRef={item}
          title={item.title}
          selectable={false}
          className={Sty.treeNedeUl}
          disabled={!!item.disabled}
        >
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} key={item.key} selectable={false} className={Sty.treeNode} />;
  });
