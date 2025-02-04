import { useEffect } from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useUpdateContactMutation } from "../../app/services/contact";
import Contact from "./Contact";
import StyledMenu from "./styled/Menu";
import InviteLink from "./InviteLink";
import moreIcon from "../../assets/icons/more.svg?url";
import IconOwner from "../../assets/icons/owner.svg";
import IconArrowDown from "../../assets/icons/arrow.down.mini.svg";
import IconCheck from "../../assets/icons/check.sign.svg";
import useContactOperation from "../hook/useContactOperation";
const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  .intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .title {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 512px;
    margin-bottom: 176px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--br);
      &:hover {
        background: #f9fafb;
      }
      .left {
        display: flex;
        gap: 8px;
        .info {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .email {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #52525b;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 28px;
        .role {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: right;
          color: #616161;
          display: flex;
          align-items: center;
          gap: 4px;
          > .icon {
            cursor: pointer;
          }
          /* override */
          .menu {
            min-width: 120px;
            .item .icon {
              width: 16px;
              height: 12px;
            }
          }
        }
        .opts {
          position: relative;
          width: 24px;
          height: 24px;
          .dots {
            cursor: pointer;
          }
          .menu {
            position: absolute;
          }
        }
      }
    }
  }
`;
export default function ManageMembers({ cid = null }) {
  const { contacts, channels, loginUser } = useSelector((store) => {
    return {
      contacts: store.contacts,
      channels: store.channels,
      loginUser: store.contacts.byId[store.authData.uid]
    };
  });
  const { copyEmail, removeFromChannel, removeUser, canRemove, canRemoveFromChannel } =
    useContactOperation({ cid });
  const [updateContact, { isSuccess: updateSuccess }] = useUpdateContactMutation();

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Update Successfully");
    }
  }, [updateSuccess]);

  const handleToggleRole = ({ ignore = false, uid = null, isAdmin = true }) => {
    hideAll();
    if (ignore) return;
    updateContact({ id: uid, is_admin: isAdmin });
  };
  const channel = channels.byId[cid] ?? null;
  const uids = channel ? (channel.is_public ? contacts.ids : channel.members) : contacts.ids;

  return (
    <StyledWrapper>
      {loginUser?.is_admin && <InviteLink />}
      <div className="intro">
        <h4 className="title">Manage Members</h4>
        <p className="desc">
          Disabling your account means you can recover it at any time after taking this action.
        </p>
      </div>
      <ul className="members">
        {uids.map((uid) => {
          const { name, email, is_admin } = contacts.byId[uid];
          const owner = channel && channel.owner == uid;
          const switchRoleVisible = loginUser.is_admin && loginUser.uid !== uid;
          const dotsVisible = email || loginUser?.is_admin;
          return (
            <li key={uid} className="member">
              <div className="left">
                <Contact compact uid={uid} interactive={false} />
                <div className="info">
                  <span className="name">
                    {name} {owner && <IconOwner />}
                  </span>
                  <span className="email">{email}</span>
                </div>
              </div>
              <div className="right">
                <span className="role">
                  {is_admin ? "Admin" : "User"}
                  {switchRoleVisible && (
                    <Tippy
                      interactive
                      placement="bottom-end"
                      trigger="click"
                      content={
                        <StyledMenu className="menu">
                          <li
                            className="item sb"
                            onClick={handleToggleRole.bind(null, {
                              ignore: is_admin,
                              uid,
                              isAdmin: true
                            })}
                          >
                            Admin
                            {is_admin && <IconCheck className="icon" />}
                          </li>
                          <li
                            className="item sb"
                            onClick={handleToggleRole.bind(null, {
                              ignore: !is_admin,
                              uid,
                              isAdmin: false
                            })}
                          >
                            User
                            {!is_admin && <IconCheck className="icon" />}
                          </li>
                        </StyledMenu>
                      }
                    >
                      <IconArrowDown className="icon" />
                    </Tippy>
                  )}
                </span>
                {dotsVisible && (
                  <Tippy
                    interactive
                    placement="right-start"
                    trigger="click"
                    content={
                      <StyledMenu className="menu">
                        {email && (
                          <li className="item" onClick={copyEmail.bind(null, email)}>
                            Copy Email
                          </li>
                        )}
                        {/* <li className="item underline">Mute</li> */}
                        {/* <li className="item underline">Change Nickname</li> */}
                        {/* <li className="item danger">Ban</li> */}
                        {canRemoveFromChannel && (
                          <li className="item danger" onClick={removeFromChannel.bind(null, uid)}>
                            Remove From Channel
                          </li>
                        )}
                        {canRemove && !cid && (
                          <li className="item danger" onClick={removeUser.bind(null, uid)}>
                            Remove From Server
                          </li>
                        )}
                      </StyledMenu>
                    }
                  >
                    <div className="opts">
                      <img className="dots" src={moreIcon} alt="dots icon" />
                    </div>
                  </Tippy>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </StyledWrapper>
  );
}
