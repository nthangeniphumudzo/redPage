import { CameraOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Modal, UploadFile } from "antd";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import Webcam from "react-webcam";

interface IcaptureModalProps {
  readonly isReady?: boolean;
  setIsReady: Dispatch<SetStateAction<boolean>>;
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
}
export const CaptureModal: FC<IcaptureModalProps> = ({
  isReady,
  setIsReady,
  setFileList,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImageSrc, setCapturedImage] = useState<string | null>(null);

  const captureImage = () => {
    if (!!capturedImageSrc) {
      setCapturedImage(null);
      return;
    }
    const imageSrc = webcamRef.current?.getScreenshot() ?? "";
    setCapturedImage(imageSrc);
  };
  const handleSave = () => {
    setFileList((prev) => [
      ...prev,
      {
        uid: (prev?.length + 1).toString(),
        name: "image.png",
        status: "done",
        url: capturedImageSrc || "",
      },
    ]);
    setCapturedImage("");
    setIsReady(false);
  };

  return (
    <Modal
      open={isReady}
      title={"Taking Live Picture"}
      style={{ width: 500 }}
      footer={[
        <Button key="back" onClick={() => setIsReady(false)}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={captureImage}>
          {capturedImageSrc ? (
            <>
              <UndoOutlined /> Retake
            </>
          ) : (
            <>
              <CameraOutlined /> Capture
            </>
          )}
        </Button>,
        <Button
          key="link"
          type="primary"
          disabled={!capturedImageSrc}
          onClick={handleSave}
        >
          Save Picture
        </Button>,
      ]}
    >
      <div style={{ width: "100%", height: "100%" }}>
        {capturedImageSrc ? (
          <img src={capturedImageSrc} alt="Captured" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "inherit", height: "100%" }}
          />
        )}
      </div>
    </Modal>
  );
};
