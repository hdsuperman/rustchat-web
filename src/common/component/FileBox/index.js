// import React from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import Styled from "./styled";
import {
  VideoPreview,
  AudioPreview,
  ImagePreview,
  PdfPreview,
  CodePreview,
  DocPreview
} from "./preview";
import { getFileIcon, formatBytes } from "../../utils";
import IconDownload from "../../../assets/icons/download.svg";
dayjs.extend(relativeTime);
const renderPreview = (data) => {
  const { file_type, name, content } = data;
  let preview = null;

  const checks = {
    image: /^image/gi,
    audio: /^audio/gi,
    video: /^video/gi,
    code: /(json|javascript|java|rb|c|php|xml|css|html)$/gi,
    doc: /^text/gi,
    pdf: /\/pdf$/gi
  };
  const _arr = name.split(".");
  const _type = file_type || _arr[_arr.length - 1];
  switch (true) {
    case checks.image.test(_type):
      {
        console.log("image");
        preview = <ImagePreview url={content} />;
      }
      break;
    case checks.pdf.test(_type):
      preview = <PdfPreview url={content} />;
      break;
    case checks.code.test(_type):
      preview = <CodePreview url={content} />;
      break;
    case checks.doc.test(_type):
      preview = <DocPreview url={content} />;
      break;
    case checks.audio.test(_type):
      preview = <AudioPreview url={content} />;
      break;
    case checks.video.test(_type):
      preview = <VideoPreview url={content} />;
      break;

    // default:
    //   icon = <IconUnkown className="icon" />;
    // break;
  }
  return preview;
};
export default function FileBox({
  preview = false,
  flex,
  file_type = "",
  name,
  size,
  created_at,
  from_uid,
  content
}) {
  const fromUser = useSelector((store) => store.contacts.byId[from_uid]);
  const icon = getFileIcon(file_type, name);
  if (!content || !fromUser || !name) return null;
  console.log("file content", content, name, flex);
  const previewContent = renderPreview({ file_type, content, name });
  const withPreview = preview && previewContent;
  return (
    <Styled
      className={`file_box ${flex ? "flex" : ""} ${withPreview ? "preview" : ""} ${
        file_type.startsWith("audio") ? "audio" : ""
      }`}
    >
      <div className="basic">
        {icon}
        <div className="info">
          <span className="name">{name}</span>
          <span className="details">
            <i className="size">{formatBytes(size)}</i>
            <i className="time">{dayjs(created_at).fromNow()}</i>
            <i className="from">
              by <strong>{fromUser.name}</strong>
            </i>
          </span>
        </div>
        <a className="download" download={name} href={`${content}&download=true`}>
          <IconDownload />
        </a>
      </div>
      {withPreview && <div className="preview">{previewContent}</div>}
    </Styled>
  );
}
