import { useState } from "react";
// import { useSelector } from "react-redux";
import styled from "styled-components";
import { hideAll } from "tippy.js";
import IconInvite from "../../assets/icons/add.person.svg";
import IconMention from "../../assets/icons/mention.svg";
import ChannelIcon from "./ChannelIcon";
import ChannelModal from "./ChannelModal";
import ContactsModal from "./ContactsModal";
import InviteModal from "./InviteModal";

const Styled = styled.ul`
  z-index: 999;
  user-select: none;
  box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 12px;
  color: #616161;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 4px;
  .item {
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    padding: 10px 8px;
    &:hover {
      background: rgba(116, 127, 141, 0.2);
    }
    .icon {
      width: 20px;
      height: 20px;
      path {
        fill: #475467;
      }
    }
  }
`;
export default function AddEntriesMenu() {
  // const currentUser = useSelector((store) => store.contacts.byId[store.authData.uid]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const toggleInviteModalVisible = () => {
    setInviteModalVisible((prev) => {
      if (!prev) {
        hideAll();
      }
      return !prev;
    });
  };
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prevVisible) => {
      if (!prevVisible) {
        hideAll();
      }
      return !prevVisible;
    });
  };
  const handleOpenChannelModal = (isPrivate) => {
    setIsPrivate(isPrivate);
    setChannelModalVisible(true);
    hideAll();
  };
  const handleCloseModal = () => {
    setChannelModalVisible(false);
  };
  return (
    <>
      <Styled>
        {/* temp remove public channel */}
        {/* {currentUser?.is_admin && (
          <li className="item" onClick={handleOpenChannelModal.bind(null, false)}>
            <ChannelIcon className="icon" />
            New Channel
          </li>
        )} */}
        <li className="item" onClick={handleOpenChannelModal.bind(null, true)}>
          <ChannelIcon personal={true} className="icon" />
          New Private Channel
        </li>
        <li className="item" onClick={toggleContactsModalVisible}>
          <IconMention className="icon" />
          New Message
        </li>
        <li className="item" onClick={toggleInviteModalVisible}>
          <IconInvite className="icon" />
          Invite People
        </li>
      </Styled>
      {channelModalVisible && <ChannelModal personal={isPrivate} closeModal={handleCloseModal} />}
      {contactsModalVisible && <ContactsModal closeModal={toggleContactsModalVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
    </>
  );
}
