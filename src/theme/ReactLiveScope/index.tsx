import React from 'react';

const ButtonExample = (props) => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      color: 'black',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);


// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample, // 给代码编辑器（react-live 是可以插入文档的实时代码编辑器组件）添加自定义导入模块
};

export default ReactLiveScope;
