// CKEditorComponent.jsx
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ name, value, onChange }) => {
    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      onChange({ target: { name, value: data } }); // Truyền object giống event của input
    };
  
    return (
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleEditorChange}
        config={{
          height: '300px',
        }}
      />
    );
  };
  
export default CKEditorComponent;
