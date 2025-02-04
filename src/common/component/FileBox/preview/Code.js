import { useState, useEffect } from "react";
import styled from "styled-components";
const Styled = styled.div`
  background-color: #fff;
  height: 218px;
  padding: 15px 15px 0 15px;
  line-height: 1.4;
  overflow: scroll;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: #000;
  color: #eee;
`;
export default function Code({ url = "" }) {
  const [content, setContent] = useState("");
  useEffect(() => {
    const getContent = async (url) => {
      if (!url) return;
      const resp = await fetch(url);
      const txt = await resp.text();
      setContent(txt);
    };
    getContent(url);
  }, [url]);
  if (!content) return null;

  return <Styled>{content}</Styled>;
}
