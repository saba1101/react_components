import React, { useState } from 'react';
import '@/views/Guide/Guide.scss';

const Guide = () => {
  const [code, setCode] = useState(`plugins: [
    react(),
    {
      include: "**/*.jsx",
    },
    federation({
      name: "app",
      filename: "remoteEntry.js",
      remotes: {
        masterComponents: "http://url/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ];`);

  const styles = {
    container: {
      backgroundColor: '#282c34',
      color: '#abb2bf',
      fontSize: '1rem',
      padding: '0.625rem',
      letterSpacing: '0.0625rem',
      borderRadius: '0.3125rem',
      overflowX: 'auto',
      lineHeight: '1.5625rem',
    },
    keyword: {
      color: '#10B77F',
    },
    url: {
      color: '#FFD700',
    },
  };

  const applySyntaxHighlighting = (code) => {
    const keywords = ['plugins', 'react', 'include', 'federation', 'name', 'filename', 'remotes', 'dom', 'shared'];
    const highlightedCode = code.replace(
      new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'),
      (match) => `<span style="color: ${styles.keyword.color}">${match}</span>`
    );

    const urlRegex = /"(http[s]?:\/\/[^\s]+|masterComponents)"/g;
    const highlightedUrlCode = highlightedCode.replace(
      urlRegex,
      (match) => `<span style="color: ${styles.url.color}">${match}</span>`
    );

    return highlightedUrlCode;
  };

  const highlightedCode = applySyntaxHighlighting(code);

  return (
    <div className="__guide_dependencies__">
      <h1>Installation and Dependencies Guide</h1>

      <p>
        Welcome to the Installation and Dependencies Guide for our Micro Frontends using Vite and Module Federation.
        This guide will walk you through the necessary steps to set up and configure your micro frontend project.
      </p>

      <h2 id="configuring-module-federation">Configuring Module Federation</h2>

      <p>To enable code sharing and integration between micro frontends, follow these steps:</p>

      <ol>
        <li>Install the necessary dependencies <code>npm i @originjs/vite-plugin-federation</code>.</li>
        <li>Configure the module federation plugin in the Vite configuration file (<code>vite.config.js</code>).</li>
        <li>Specify the shared module Key <code>masterComponents</code> in remotes and pass <code>http://url/assets/remoteEntry.js</code> in the configuration file.</li>
      </ol>

      <h2>
        inside <code>vite.config.js</code>
      </h2>

      <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} style={styles.container} />

      <h2>When Importing Components</h2>

      <ol>
        <li>Root directory for all shared modules is <code>masterComponents</code>.</li>
        <li>for Example : import Input Component  (<code style={{color: '#159E72',fontWeight: '900'}}> import FormInput from "masterComponents/FormInput" </code>).</li>
      </ol>

    </div>
  );
};

export default Guide;
