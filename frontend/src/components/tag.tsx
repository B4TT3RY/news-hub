import { Component, JSXElement } from 'solid-js';

const Tag: Component<{
  color: 'blue' | 'lightGray' | 'red';
  children: JSXElement;
}> = (props) => {
  const styles = {
    blue: 'bg-blue-500/30 text-blue-200',
    lightGray: 'bg-gray-400/30 text-gray-300',
    red: 'bg-red-500/30 text-red-200',
  };

  return (
    <span
      class={`${
        styles[props.color]
      } px-3 py-1 rounded-full text-sm font-medium truncate`}
    >
      {props.children}
    </span>
  );
};

export default Tag;
