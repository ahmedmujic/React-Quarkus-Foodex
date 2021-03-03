import { coudinaryConfig } from "./cloudinaryConfig";

export function Config(note, maxNumberOfFiles, width, height) {
  var UppyConfig = {
    uploadApi: {
      endpoint: `https://api.cloudinary.com/v1_1/dcedcuwsu/upload`,
    },
    plugins: {
      ScreenCapture: true,
    },
    options: {
      meta: {
        upload_preset: "znb5fpxh",
      },
    },
    uploaderLook: {
      theme: "light",
      note: note,
      width: width,
      height: height,
    },
    restrictions: {
      maxNumberOfFiles: maxNumberOfFiles,
    },
    statusBarOptions: {},
  };
  return UppyConfig;
}

// export var UppyConfig = {

//     uploadAPI: {
//         endpoint,
//         headers
//       },
//       plugins: {
//         Webcam, // null | boolean
//         ScreenCapture, // null | boolean
//       },
//       restrictions: {
//         maxFileSize, //null | number
//         maxNumberOfFiles, //null | number
//         minNumberOfFiles,//null | number
//         allowedFileTypes, // null | array eg ['image/*', '.jpg', '.jpeg', '.png', '.gif']
//       },
//       statusBarOptions: {
//         hideAfterFinish,
//         showProgressDetails, // By default, progress in Status Bar is shown as a simple percentage. If you would like to also display remaining upload size and time, set this to true.
//         hideUploadButton, // Hide the upload button. Use this if you are providing a custom upload button somewhere, and using the uppy.upload() API
//         hideRetryButton, // Hide the retry button in StatusBar
//         hidePauseResumeButton, // Hide the pause/resume button in StatusBar and on each individual file.
//         hideCancelButton, // Hide the cancel button in StatusBar and on each individual file.
//         hideProgressAfterFinish, // Hide Status Bar after the upload has finished
//       },
//       uploaderLook: {
//         theme, // light | dark | auto
//         note, // Optionally, specify a string of text that explains something about the upload for the user. This is a place to explain any restrictions that are put in place.
//         proudlyDisplayPoweredByUppy, //Uppy is provided to the world for free by the team behind Transloadit. In return, we ask that you consider keeping a tiny Uppy logo at the bottom of the Dashboard, so that more people can discover and use Uppy. This is, of course, entirely optional. Just set this option to false if you do not wish to display the Uppy logo
//         width, //null | number
//         height, //null | number
//         thumbnailWidth, //null | number — Width of the Thumbnail in pixels.
//       },
//       options: {
//         id, //A site-wide unique ID for the instance.
//         debug,
//         browserBackButtonClose,
//         autoProceed, //Setting this to true will start uploading automatically after the first file is selected without waiting for upload button trigger.
//         allowMultipleUploads, //Setting this to true,  users can upload some files, and then add more files and upload those as well
//         meta: {} //Metadata object, used for passing things like public keys, usernames, tags and so on
//       }
// }
