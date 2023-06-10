"use client";
import { Button, Input, Modal } from "antd";
import { FC, useState } from "react";
import style from "./styles.module.scss";
import { AimOutlined } from "@ant-design/icons";
import ImageSlider from "./imageSlider";

export interface IProfileProps {
  setOpen: (bol: boolean) => void;
  open: boolean;
}
const ProfileQuickView: FC<IProfileProps> = ({ setOpen, open }) => {
  const [showDetails, setShowdetails] = useState(false);
  return (
    <>
      <Modal
        title="User Profile"
        open={open}
        onCancel={() => setOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelText="Close"
        cancelButtonProps={{ style: { background: "red" } }}
      >
        <div className={style.profileModal}>
          {!showDetails ? (
            <ImageSlider
              images={[
                "/assets/images/cleaner.png",
                "/assets/images/painter.png",
                "/assets/images/plumber.png",
              ]}
            />
          ) : (
            <div className={style.profileDetails}>
              <h5>UserName</h5>
              <h2 className={style.userName}>Nthangeniph</h2>
              <h5 className={style.userName}>Bio</h5>
              <p className={style.userName}></p>
              <ReadonlyTextArea
                value=" You can further customize the component, such as adding additional
              form validation or styling, based on your specific requirements."
              />
              <h5 className={style.userName}>Price range</h5>
              <h5 className={style.userName} style={{ marginBottom: "10px" }}>
                {" "}
                <ReadonlyRangeInput min={150} max={500} />
              </h5>

              <Button style={{ marginBottom: "10px" }}>
                <AimOutlined />{" "}
                <GoogleMapsDirectionLink destination="Oval gardens centurion" />
              </Button>

              <CallLink cellNumber="0727618833" />
            </div>
          )}
        </div>
        <div className={style.profileNav}>
          <Button
            style={{ width: "100%", marginTop: "0.8rem" }}
            onClick={() => setShowdetails((prev) => !prev)}
          >
            {!showDetails ? "Show Details" : "Show Pictures"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

const CallLink = ({ cellNumber }: { cellNumber: string }) => {
  const handleLinkClick = () => {
    window.location.href = `tel:${cellNumber}`;
  };

  return (
    <a href={`tel:${cellNumber}`} onClick={handleLinkClick}>
      Call {cellNumber}
    </a>
  );
};
const GoogleMapsDirectionLink = ({ destination }: { destination: string }) => {
  const handleLinkClick = (event: any) => {
    event.preventDefault();
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`
    );
  };

  return (
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`}
      onClick={handleLinkClick}
    >
      Get Directions
    </a>
  );
};
const ReadonlyRangeInput = ({ min, max }: { min: number; max: number }) => {
  return (
    <div>
      <label>{`R${min}`}</label>
      <input type="range" min={min} max={max} readOnly disabled />
      <label>{`R${max}`}</label>
    </div>
  );
};
const ReadonlyTextArea = ({ value }: { value: string }) => {
  return (
    <div style={{ height: "9rem", width: "100%" }}>
      <Input.TextArea
        value={value}
        readOnly
        style={{
          height: "8rem",
          width: "100%",
          marginLeft: "2px",
          border: "1px solid ",
        }}
      />
    </div>
  );
};

export default ProfileQuickView;
