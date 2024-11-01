


import React from 'react';
import blogs from '@/content/blog.json';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'







export default async function Page({ params }: any) {
  const blog = blogs.filter((blog: any) => blog.slug === params.slug);

  const prosser = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: '👋🌍' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: "\n" }];
        }
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className.push("highlighted");
      }
    })
    .use(rehypePrettyCode, {
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    });

   

  const htmlContent = (await prosser.process(blog[0].blogcontent)).toString();

  return (
    <section className="bg-white w-full mt-20 min-h-screen  dark:bg-gray-900">
    <div className="gap-8 sm:gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {blog[0].blogtitle}
        </h2>
        <p className="mb-4 text-base sm:text-lg">{blog[0].blogdescription}</p>
        <div
          className="prose lg:prose-xl dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  </section>

  );
}
