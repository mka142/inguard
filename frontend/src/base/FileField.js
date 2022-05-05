import React, { useCallback, useState } from "react";
import { Field } from "react-final-form";
import { useDropzone } from "react-dropzone";

import { List, Box } from "@mui/material";

const FileField = ({ name, ...props }) => {
  return (
    <>
      <Field name={name} {...props} component={FileFieldInput} />
    </>
  );
};

function FileFieldInput({ required, input, dropZoneProps, ...props }) {
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
        {props.children}
      </div>
      <List>{files}</List>
    </>
  );
}

export default FileField;
