import React, { useCallback, useState } from "react";
import { Field } from "react-final-form";
import { useDropzone } from "react-dropzone";

import { List, Box, Experimental_CssVarsProvider } from "@mui/material";
/*
FileField for react-final-form
*/
const FileField = ({ name, render = null, ...props }) => {
  /*
  To render insiade FileField some jsx with accces to field props we pass main render arg
  and later we pass render as _render to FileFieldInput which is a component to render.

  FileFieldInput renders just zone to drop files.
  We can pass to FileField:
    - children => no access to field props
    - render => (func) access to field props
  */
  return (
    <>
      <Field
        name={name}
        {...props}
        _render={render}
        component={FileFieldInput}
      />
    </>
  );
};

function FileFieldInput({ required, input, dropZoneProps, _render, ...props }) {
  const onDrop = useCallback(
    (files) => {
      input.onChange(files);
    },
    [input]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    noDrag: true,
    ...dropZoneProps,
  });

  const files = acceptedFiles.map((file) => (
    <Box key={file.path} display="flex">
      <Box>
        <img width={100} height={"auto"} src={URL.createObjectURL(file)} />
      </Box>
      {file.path}
    </Box>
  ));

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {_render
          ? _render({ input, meta: props.meta, id: props.id })
          : props.children}
      </div>
      <List>{files}</List>
    </>
  );
}

export default FileField;
