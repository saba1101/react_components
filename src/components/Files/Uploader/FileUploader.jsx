// import React, { useState } from 'react';

// const FileUploader = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files) => {
//     const fileList = Array.from(files);
//     setSelectedFiles(fileList);
//   };

//   const handleFileRemove = (file) => {
//     const updatedFiles = selectedFiles.filter((f) => f !== file);
//     setSelectedFiles(updatedFiles);
//   };

//   const handleFileInputChange = (event) => {
//     const files = event.target.files;
//     handleFiles(files);
//   };

//   const renderSelectedFiles = () => {
//     return selectedFiles.map((file, index) => (
//       <div key={index}>
//         <span>{file.name}</span>
//         <button onClick={() => handleFileRemove(file)}>Remove</button>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <div
//         onDragOver={(event) => event.preventDefault()}
//         onDrop={handleDrop}
//         style={{ border: '1px dashed black', padding: '10px', marginBottom: '10px' }}
//       >
//         <p>Drag and drop files here</p>
//       </div>
//       {selectedFiles.length > 0 && (
//         <div>
//           <h4>Selected Files:</h4>
//           {renderSelectedFiles()}
//         </div>
//       )}
//       <label htmlFor="file-input">
//         Upload
//         <input
//           id="file-input"
//           type="file"
//           accept=".jpg,.jpeg,.png,.gif"
//           multiple
//           onChange={handleFileInputChange}
//           style={{ display: 'none' }}
//         />
//       </label>
//     </div>
//   );
// };

// export default FileUploader;
