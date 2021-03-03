import { useEffect } from "react";

const Uppy = require("@uppy/core");
const Dashboard = require("@uppy/dashboard");

export function UppyComponent(props) {
  var config = props.config;
  var imageLinks = [];
  useEffect(() => {
    var uppy = new Uppy({
      autoProceed: false,
    });

    uppy.use(Dashboard, {
      target: "#drag-drop-area",
      inline: true,
      width: config.uploaderLook.width,
      height: config.uploaderLook.height,
      note: config.uploaderLook.note,
    });

    const XHRUpload = require("@uppy/xhr-upload");
    uppy.use(XHRUpload, {
      metaFields: ["file", "name", "upload_preset"],
      formData: true,
      endpoint: config.uploadApi.endpoint,
    });

    uppy.on("file-added", (file) => {
      console.log(config);

      uppy.setFileMeta(file.id, {
        file: file.data,
        upload_preset: "ml_default",
      });
    });

    uppy.on("upload", (data) => {
      console.log("upload");
      console.log(data);
    });
    uppy.on("complete", (result) => {
      props.onFileUploadCompleted(
        result.successful.map((data) => {
          return data.uploadURL;
        })
      );
    });
  }, []);

  return <div id="drag-drop-area"></div>;
}
