import React from 'react';
import "./App.css"
import { faTabletScreenButton, faDesktop, faMobile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Correct React FontAwesome package

const App = () => {
  const [defaultHeight, setDefaultHeight] = React.useState(null);
  const [defaultWidth, setDefaultWidth] = React.useState(null);
  const [inputUrl, setInputUrl] = React.useState('');
  const [storedUrl, setStoredUrl] = React.useState('');

  const [clicked, setClicked] = React.useState({
    mobile: false,
    desktop: false,
    tablet: false,
  });

  let mobile = [
    { "Apple iPhone 3/4/4s": { width: 320, height: 480 } },
    { "Apple iPhone 5/5s": { width: 320, height: 568 } },
    { "Apple iPhone 6/6s/7": { width: 375, height: 667 } },
    { "Apple iPhone 6s Plus / 7 Plus": { width: 414, height: 736 } },
    { "Samsung Galaxy S5/S6/S7": { width: 360, height: 640 } },
    { "Sony Xperia Z2/Z3": { width: 360, height: 640 } },
    { "Google Pixel": { width: 411, height: 731 } },
    { "Nexus 4": { width: 384, height: 640 } },
    { "Samsung Galaxy S8": { width: 360, height: 740 } },
    { "OnePlus 8": { width: 412, height: 869 } },
  ];

  let desktop = [
    { "24_desktop": { width: 1920, height: 1200 } },
    { "23_desktop": { width: 1920, height: 1080 } },
    { "22_desktop": { width: 1680, height: 1050 } },
    { "20_desktop": { width: 1600, height: 900 } },
    { "19_desktop": { width: 1440, height: 900 } },
    { "15_notebook": { width: 1366, height: 768 } },
    { "13_notebook": { width: 1024, height: 800 } },
    { "10_notebook": { width: 1024, height: 600 } },
    { "Apple Thunderbolt Display": { width: 2560, height: 1440 } },
    { "Dell UltraSharp Monitor": { width: 1440, height: 900 } },
  ];

  let tablet = [
    { "Apple iPad Mini": { width: 768, height: 1024 } },
    { "Apple iPad Retina": { width: 768, height: 1024 } },
    { "Apple iPad Pro": { width: 1366, height: 1024 } },
    { "Amazon Kindle Fire": { width: 768, height: 1024 } },
    { "Amazon Kindle Fire HD": { width: 768, height: 1024 } },
    { "Asus Eee 1000": { width: 768, height: 1024 } },
    { "Nexus 7": { width: 600, height: 960 } },
    { "Nexus 9": { width: 1024, height: 768 } },
    { "Samsung Galaxy Tab S7": { width: 2560, height: 1600 } },
    { "Microsoft Surface Pro": { width: 2736, height: 1824 } },
  ];

  function toggleSidebar(deviceType) {
    setClicked(prevState => ({
      mobile: deviceType === "mobile" ? !prevState.mobile : false,
      desktop: deviceType === "desktop" ? !prevState.desktop : false,
      tablet: deviceType === "tablet" ? !prevState.tablet : false
    }));
  }

  function dropDownPage(inputUrl) {
    setDefaultHeight(1920);
    setDefaultWidth(1080);
    setStoredUrl(inputUrl);
  }

  function selectDevice(width, height) {
    setDefaultWidth(width);
    setDefaultHeight(height);
    setClicked({ mobile: false, desktop: false, tablet: false });
  }

  const renderDeviceList = (deviceType) => {
    const devices = { mobile, desktop, tablet };
    return devices[deviceType].map((device, index) =>
      Object.entries(device).map(([key, value]) => (
        <button
          key={index}
          className="block w-full mb-4 text-left font-bold"
          onClick={() => selectDevice(value.width, value.height)}
        >
          {key}
          <p className="text-sm text-gray-500">
            {value.width}x{value.height}
          </p>
        </button>
      ))
    );
  };

  return (
    <>
      <div className="container">
        <div className="side bg-gray-400 pt-32 fixed w-40 min-h-screen">
          <button
            className="flex flex-col justify-between items-center"
            onClick={() => toggleSidebar("mobile")}
          >
            <FontAwesomeIcon className="w-14 h-14 py-6 px-14" icon={faMobile} />
          </button>

          <button
            className="flex flex-col justify-between items-center"
            onClick={() => toggleSidebar("desktop")}
          >
            <FontAwesomeIcon className="w-14 h-14 py-6 px-14" icon={faDesktop} />
          </button>

          <button
            className="flex flex-col justify-between items-center"
            onClick={() => toggleSidebar("tablet")}
          >
            <FontAwesomeIcon className="w-14 h-14 py-6 px-14" icon={faTabletScreenButton} />
          </button>
        </div>

        <main className="flex-1 mt-62 p-20 w-screen">
          <div className="content-area">
            <div className="input-area fixed ml-44 flex flex-row items-center top-10 left-20">
              <input
                type="text"
                value={inputUrl}
                placeholder="Enter URL"
                className="input-url bg-sky-200 text-gray-700 p-2 border-none outline-none rounded-lg w-full max-w-3xl"
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button
                onClick={() => dropDownPage(inputUrl)}
                className="bg-black hover:bg-gray-900 text-white ml-4 w-10 h-10 rounded"
              >Go</button>
            </div>
            <div className="content ml-36 max-h-full">
              <iframe
                src={storedUrl}
                width={defaultWidth || 1920}
                height={defaultHeight || 1080}
                title="drop-down-page"
                style={{border: "none"}}
              />
            </div>

          </div>
          <div className="mini-sidebar fixed">
            {clicked.mobile && <div className="submenu "><ul>{renderDeviceList("mobile")}</ul></div>}
            {clicked.desktop && <div className="submenu "><ul>{renderDeviceList("desktop")}</ul></div>}
            {clicked.tablet && <div className="submenu "><ul>{renderDeviceList("tablet")}</ul></div>}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
