import { useEffect } from "react";
import styled from "styled-components";
import { hideAll } from "tippy.js";
const StyledConfirm = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid orange;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  .tip {
    /* word-break: break-all; */
    color: orange;
    font-size: 12px;
    line-height: 1.5;
  }
  .btns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 14px;
  }
`;
const Styled = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    label {
      white-space: nowrap;
      font-size: 14px;
      color: #555;
    }
  }
  > .tip {
    font-size: 12px;
    color: #999;
    line-height: 1.5;
  }
`;
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import {
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation
} from "../../app/services/server";
import Tippy from "@tippyjs/react";
import toast from "react-hot-toast";
export default function APIConfig() {
  const { data } = useGetThirdPartySecretQuery();
  const [updateSecret, { data: updatedSecret, isSuccess, isLoading }] =
    useUpdateThirdPartySecretMutation();
  console.log("secret", data);
  useEffect(() => {
    if (isSuccess) {
      hideAll();
      toast.success("Update API Secret Successfully!");
    }
  }, [isSuccess]);

  return (
    <Styled>
      <div className="input">
        <label htmlFor="secret">API Secure Key:</label>
        <Input type="password" id="secret" value={updatedSecret || data} />
      </div>
      <Tippy
        interactive
        placement="right-start"
        trigger="click"
        content={
          <StyledConfirm>
            <div className="tip">
              Are you sure to update API secret? Previous secret will be invalided
            </div>
            <div className="btns">
              <Button onClick={hideAll} className="cancel small">
                Cancel
              </Button>
              <Button disabled={isLoading} className="small danger" onClick={updateSecret}>
                Yes
              </Button>
            </div>
          </StyledConfirm>
        }
      >
        <Button>Update Secret</Button>
      </Tippy>
      <div className="tip">
        Tip: The security key agreed between the rustchat server and the third-party app is used to
        encrypt the communication data.{" "}
      </div>
    </Styled>
  );
}
