"use client";
import { FC, useEffect, useState } from "react";
import style from "./styles.module.scss";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Upload,
  UploadFile,
} from "antd";
import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/es/upload";
import { IMAGES_MAX_COUNT } from "@appConstant";
import LocationSearchInput from "@components/autocompletePlace";
import LocationTracker from "@components/locationTracker";
import  { CaptureModal } from "@components/CameraCapture";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const NextStep: FC<any> = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position ::", position);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={style.signUpForm}>
      <div className={style.signupHeader}>
        <h1>Final Step</h1>
      </div>
      <div className={style.formContainer}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "27",
          }}
          className={style.form}
          scrollToFirstError
        >
          <Form.Item
            name="bio"
            label="Short Bio"
            rules={[
              {
                required: true,
                message: "Please input your short bio!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: "Please input your Location!",
              },
            ]}
            hasFeedback
          >
            <LocationSearchInput
              formattedAddress={formattedAddress}
              setFormattedAddress={setFormattedAddress}
            />
            <LocationTracker
              formattedAddress={formattedAddress}
              setFormattedAddress={setFormattedAddress}
            />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price Range"
            rules={[
              { required: true, message: "Please input your Price Range!" },
            ]}
          >
            <Slider
              range
              step={50}
              defaultValue={[150, 300]}
              min={100}
              max={500}
            />
          </Form.Item>
          <Form.Item label="pictures" required>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={4}
            >
              {fileList.length >= IMAGES_MAX_COUNT ? null : uploadButton}
            </Upload>
            <Button
              type="dashed"
              onClick={() => setIsReady(true)}
              icon={<CameraOutlined/>}
            >
              Take Live Picture
            </Button>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            <CaptureModal setIsReady={setIsReady} isReady={isReady} setFileList={setFileList} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NextStep;
