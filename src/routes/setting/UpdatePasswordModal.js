// import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../common/component/styled/Input";
import { useUpdatePasswordMutation, useGetCredentialsQuery } from "../../app/services/auth";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
const StyledEdit = styled(StyledModal)`
  .input {
    margin: 16px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #6b7280;
    }
  }
`;
import Modal from "../../common/component/Modal";
import toast from "react-hot-toast";
export default function ProfileBasicEditModal({ closeModal }) {
  const { data } = useGetCredentialsQuery();
  const [input, setInput] = useState({
    current: "",
    newPassword: "",
    confirmPassword: ""
  });
  // const dispatch = useDispatch();
  const [updatePassword, { isLoading, isSuccess }] = useUpdatePasswordMutation();
  const handleChange = (evt) => {
    const { type } = evt.target.dataset;
    setInput((prev) => {
      return { ...prev, [type]: evt.target.value };
    });
  };
  const handleUpdate = () => {
    console.log("pwd", input);
    const { current, newPassword } = input;
    updatePassword({ old_password: current, new_password: newPassword });
    // update({ [valueKey]: input });
  };
  const handleCompare = () => {
    const { newPassword, confirmPassword } = input;
    if (newPassword !== confirmPassword) {
      toast.error("Not same with new password");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      // todo
      toast.success("update password successfully");
      closeModal();
    }
  }, [isSuccess]);
  const { current, newPassword, confirmPassword } = input;
  const disableBtn =
    (data?.password && !current) ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword ||
    isLoading;
  return (
    <Modal id="modal-modal">
      <StyledEdit
        title={"Change your password"}
        description={"Enter current password and new password."}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button disabled={disableBtn} onClick={handleUpdate}>
              {isLoading ? "Updating" : `Update`}
            </Button>
          </>
        }
      >
        {data?.password && (
          <div className="input">
            <label htmlFor={"current"}>Current Password</label>
            <Input
              type="password"
              id="current"
              name="current"
              value={current}
              data-type="current"
              onChange={handleChange}
            ></Input>
          </div>
        )}
        <div className="input">
          <label htmlFor={"newPassword"}>New Password</label>
          <Input
            type="password"
            name={"newPassword"}
            value={newPassword}
            data-type="newPassword"
            onChange={handleChange}
          ></Input>
        </div>
        <div className="input">
          <label htmlFor={"confirmPassword"}>Confirm New Password</label>
          <Input
            onBlur={handleCompare}
            type="password"
            name={"confirmPassword"}
            value={confirmPassword}
            data-type="confirmPassword"
            onChange={handleChange}
          ></Input>
        </div>
      </StyledEdit>
    </Modal>
  );
}
