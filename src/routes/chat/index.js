// import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import Server from "../../common/component/Server";
import CurrentUser from "../../common/component/CurrentUser";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import ContactsModal from "../../common/component/ContactsModal";
import ChannelModal from "../../common/component/ChannelModal";
import SessionList from "./SessionList";
export default function ChatPage() {
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const { sessionUids } = useSelector((store) => {
    return {
      sessionUids: store.userMessage.ids
    };
  });
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const tmpSession =
    sessionUids.findIndex((i) => i == user_id) > -1
      ? null
      : { key: `user_${user_id}`, mid: null, unreads: 0, id: user_id, type: "user" };
  // console.log("temp uid", tmpUid);
  const placeholderVisible = !channel_id && !user_id;
  return (
    <>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {contactsModalVisible && <ContactsModal closeModal={toggleContactsModalVisible} />}
      <StyledWrapper>
        <div className="left">
          <Server />
          <SessionList tempSession={tmpSession} />
          <CurrentUser />
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && <BlankPlaceholder />}
          {channel_id && <ChannelChat cid={channel_id} />}
          {user_id && <DMChat uid={user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
