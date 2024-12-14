import { Component, JSXElement } from 'solid-js';

const Tag: Component<{
  color: 'blue' | 'teal' | 'lightGray';
  children: JSXElement;
}> = (props) => {
  const styles = {
    blue: 'bg-blue-500/20 text-blue-400',
    teal: 'bg-teal-500/20 text-teal-400',
    lightGray: 'bg-gray-400/20 text-gray-300',
  };

  return (
    <span
      class={`${
        styles[props.color]
      } bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium truncate`}
    >
      {props.children}
    </span>
  );
};

export default Tag;
