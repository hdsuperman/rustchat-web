import { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useOutsideClick, useKey } from "rooks";
import { Ring } from "@uiball/loaders";
import Modal from "./Modal";
const AniFadeIn = keyframes`
from{
background: transparent;
}
to{
  background: rgba(1, 1, 1, 0.9);
}
`;
const StyledWrapper = styled.div`
  /* todo */
  transition: all 0.5s ease;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(1, 1, 1, 0.9); */
  animation: ${AniFadeIn} 0.3s ease-in-out forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    position: relative;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    > .loading {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
    }
    > .image {
      overflow: auto;
      img {
        max-width: 70vw;
        max-height: 80vh;
        /* width: 100%;
        height: 100%;
        object-fit: contain; */
      }
    }
    &.loading .image img {
      filter: blur(2px);
    }
    .origin {
      font-weight: bold;
      font-size: 14px;
      color: #aaa;
      &:hover {
        text-decoration: underline;
        color: #fff;
      }
    }
  }
`;
export default function ImagePreviewModal({ download = true, data, closeModal }) {
  const [url, setUrl] = useState(data?.thumbnail);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef();
  useOutsideClick(wrapperRef, closeModal);
  useKey(
    "Escape",
    () => {
      console.log("close preview modal");
      closeModal();
    },
    { eventTypes: ["keyup"] }
  );
  useEffect(() => {
    if (data) {
      const { originUrl } = data;
      if (!originUrl) setLoading(false);
      const img = new Image();
      img.src = originUrl;
      img.onload = () => {
        setUrl(originUrl);
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
    }
  }, [data]);

  if (!data) return null;
  const { originUrl, downloadLink, name, type } = data;
  return (
    <Modal>
      <StyledWrapper>
        <div className={`box ${loading ? "loading" : ""}`} ref={wrapperRef}>
          <div className="image">
            <img
              // onLoadedMetadata={handleMetaDataLoaded}
              src={url}
              alt="preview"
              className={`animate__animated animate__fadeIn animate__faster`}
            />
          </div>
          {download && (
            <a
              // onClick={handleDownload}
              className="origin"
              download={name}
              type={type}
              href={downloadLink || originUrl}
              // target="_blank"
              rel="noreferrer"
            >
              Download original
            </a>
          )}
          {loading && (
            <div className="loading">
              <Ring />
            </div>
          )}
        </div>
      </StyledWrapper>
    </Modal>
  );
}
