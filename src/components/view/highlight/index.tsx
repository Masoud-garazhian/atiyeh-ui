import React, { MouseEventHandler } from 'react';
import prettier from "prettier/standalone";
import htmlPlugin from 'prettier/parser-html';
import { CopyBlock, dracula } from 'react-code-blocks';

import './styles.css';

const Highlight = (props: IHighlightProps) => {
  let formattedCode = props.children;

  if (props.skipFormat != true) {
    try {
      formattedCode = prettier.format(props.children?.toString() ?? '', {
        parser: "html",
        plugins: [htmlPlugin]
      });
    } catch (e) {

    }
  }

  return (
    <div className="code-block">
      <CopyBlock
        text={formattedCode}
        theme={dracula}
        showLineNumbers={true}
        startingLineNumber={0}
        language={'jsx'}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
}

interface IHighlightProps {
  children?: string,
  skipFormat?: boolean,
}

export default Highlight;