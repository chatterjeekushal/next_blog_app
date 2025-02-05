
import React from 'react';
import { Button } from './button'; // Assuming you have a Button component

import {
  ArrowClockwise,
  ArrowCounterclockwise,
  Code,
  Highlighter,
  Justify,
  JustifyLeft,
  JustifyRight,
  Subscript,
  Superscript,
  TextCenter,
  TypeBold,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
} from 'react-bootstrap-icons';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { any } from 'zod';

export enum RichTextAction {
  Bold = 'bold',
  Italics = 'italics',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Superscript = 'superscript',
  Subscript = 'subscript',
  Highlight = 'highlight',
  Code = 'code',
  LeftAlign = 'leftAlign',
  CenterAlign = 'centerAlign',
  RightAlign = 'rightAlign',
  JustifyAlign = 'justifyAlign',
  Divider = 'divider',
  Undo = 'undo',
  Redo = 'redo',
}

export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <TypeBold />,  },
  { id: RichTextAction.Italics, icon: <TypeItalic />,  },
  { id: RichTextAction.Underline, icon: <TypeUnderline />,  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter />,
   
    fontSize: 10,
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <TypeStrikethrough />,
   
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript />,
    
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript />,
   
  },
  {
    id: RichTextAction.Code,
    icon: <Code />,
    
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.LeftAlign,
    icon: <JustifyLeft />,
    
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <TextCenter />,
   
  },
  {
    id: RichTextAction.RightAlign,
    icon: <JustifyRight />,
    
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <Justify />,
    
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Undo,
    icon: <ArrowCounterclockwise />,
    
  },
  {
    id: RichTextAction.Redo,
    icon: <ArrowClockwise />,
   
  },
];

interface ButtonProps {
  id: RichTextAction;
  icon: React.ReactElement;
  label?: string;
}

function Toolbar_plagin() {
  const [editor] = useLexicalComposerContext();

  const onaction = (id: RichTextAction) => {
    switch (id) {
      case RichTextAction.Bold:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        break;
  
      case RichTextAction.Italics:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        break;
  
      case RichTextAction.Underline:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        break;
  
      case RichTextAction.Strikethrough:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        break;
  
      case RichTextAction.Superscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        break;
  
      case RichTextAction.Subscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
        break;
  
      case RichTextAction.Highlight:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
        break;
  
      case RichTextAction.Code:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        break;
  
      case RichTextAction.LeftAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"left");
        break;
  
      case RichTextAction.CenterAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"center");
        break;
  
      case RichTextAction.RightAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"right");
        break;
  
      case RichTextAction.JustifyAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND,"justify");
        break;
  
    //   case RichTextAction.Undo:
    //     editor.dispatchCommand(UNDO_COMMAND);
    //     console.log('Undo action triggered');
    //     break;
  
    //   case RichTextAction.Redo:
    //     editor.dispatchCommand(REDO_COMMAND);
    //     console.log('Redo action triggered');
    //     break;
  
      default:
        break;
    }
  };
  
  return (
    <div className="toolbar">
      {RICH_TEXT_OPTIONS.map((option, index) => {
        if (option.id === RichTextAction.Divider) {
          return <React.Fragment key={index}><div className="divider" /></React.Fragment>;
        }

        return (
          <span
            key={option.id}
            id={option.id}
            onClick={() => onaction(option.id)} // Attach onClick event
            className="toolbar-button" // Optional class name for styling
          >
            {option.icon}
        
          </span>
        );
      })}
    </div>
  );
}

export default Toolbar_plagin;
