import React from "react";
import "./index.css";
import { Button, Input, QRCode } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const App: React.FC = () => {
  const [text, setText] = React.useState("https://google.com/");
  const [color, setColor] = React.useState("#ae1c3f");
  const [imageSrc, setImageSrc] = React.useState(
    "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-Agribank.png"
  );
  const [size, setSize] = React.useState<number>(500);
  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize > 1000) {
        return 1000;
      }
      return newSize;
    });
  };
  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize < 48) {
        return 48;
      }
      return newSize;
    });
  };

  return (
    <div id="myqrcode">
      <Input
        placeholder="QR Text"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Input
        placeholder="Image"
        maxLength={60}
        value={imageSrc}
        onChange={(e) => setImageSrc(e.target.value)}
      />
      <Input
        placeholder="Color"
        maxLength={60}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Button.Group style={{ marginBottom: 16 }}>
        <Button
          onClick={decline}
          disabled={size <= 48}
          icon={<MinusOutlined />}
        >
          Smaller
        </Button>
        <Button
          onClick={increase}
          disabled={size >= 1000}
          icon={<PlusOutlined />}
        >
          Larger
        </Button>
      </Button.Group>
      <QRCode
        color={color}
        size={size}
        iconSize={size / 4}
        value={text}
        style={{ marginBottom: 16 }}
        icon={imageSrc}
      />
      <Button type="primary" onClick={downloadQRCode}>
        Download
      </Button>
    </div>
  );
};

export default App;
