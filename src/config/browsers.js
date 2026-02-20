
import dotenv from "dotenv";

dotenv.config();

export const browserStackServer =
  `https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;

export const bstackOptions = {
  buildName: "ElPais Assignment Build",
  sessionName: "Opinion Section Test",
};
export const capabilities = [
  {
    browserName: "Chrome",
    browserVersion: "latest",
    os: "Windows",
    osVersion: "11",
  },
  {
    browserName: "Firefox",
    browserVersion: "latest",
    os: "Windows",
    osVersion: "11",
  },
  {
    browserName: "Safari",
    browserVersion: "latest",
    os: "OS X",
    osVersion: "Sonoma",
  },
  {
    deviceName: "iPhone 15 Pro Max",
    osVersion: "17",
    browserName: "Safari",
  },
  {
    deviceName: "Google Pixel 8 Pro",
    osVersion: "14.0",
    browserName: "Chrome",
  },
];
