
import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { Lexica } from '@lexical/react/LexicalComposer';
import ToolbarPlugin from '@/components/ui/Toolbar_plagin'; 

const theme = {
  text: {
    bold: 'font-bold',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'overline',
    italic: 'italic',
    code: 'bg-gray-300 text-black font-bold text-xl',
  },
};

const initialConfig = {
  namespace: 'MyEditor',
  theme: theme, // Pass the theme directly
  nodes: [], // Pass the references to the nodes here
  onError: (error) => {
    console.error(error); // Properly handle errors
  },
};

function Tiptap() {
  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="editor-content-editable h-[200px] w-[1000px] text-2xl overflow-auto border border-gray-200" />
          }
          placeholder={<div className="editor-placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
}

export default Tiptap;