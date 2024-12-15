import clsx from 'clsx';
import { Component, JSXElement } from 'solid-js';

const Container: Component<{ children: JSXElement }> = (props) => {
  return (
    <div
      class={clsx(
        'supports-[width: 100dvw]:w-[100dvw] supports-[height:100dvh]:h-[100dvh]',
        'w-screen h-screen',
        'flex flex-col',
        'bg-gray-900 py-4',
        'px-8 md:px-24 2xl:px-72'
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
