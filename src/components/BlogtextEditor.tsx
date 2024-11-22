
'use client';

import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const BlogtextEditor = () => {
	const editor = useRef(null);
	const [content, setContent] = useState(' what is react');



	return (

        <>

		<JoditEditor
			ref={editor}
			value={content}
			
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
		/>

        text 

        {content}

        </>
	);
};

export default BlogtextEditor;

