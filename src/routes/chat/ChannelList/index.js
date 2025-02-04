import { useState } from "react";
import { useSelector } from "react-redux";

import DeleteConfirmModal from "../../settingChannel/DeleteConfirmModal";
import NavItem from "./NavItem";

export default function ChannelList({ setDropFiles }) {
  const [currId, setCurrId] = useState(null);
  const { channelIds } = useSelector((store) => {
    return { channelIds: store.channels.ids };
  });

  const setRemoveChannel = (cid = undefined) => {
    setCurrId(cid);
  };

  return (
    <>
      {channelIds.map((cid) => {
        return (
          <NavItem
            key={cid}
            toggleRemoveConfirm={setRemoveChannel}
            id={cid}
            setFiles={setDropFiles}
          />
        );
      })}
      {typeof currId !== "undefined" && (
        <DeleteConfirmModal id={currId} closeModal={setRemoveChannel} />
      )}
    </>
  );
}
