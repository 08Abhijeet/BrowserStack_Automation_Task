import { Builder } from "selenium-webdriver";
import { browserStackServer, bstackOptions } from "../config/browsers.js";

export async function createBrowserStackDriver(cap) {

    const builder = new Builder().usingServer(browserStackServer);

    if (cap.browserName) {
        builder.forBrowser(cap.browserName.toLowerCase());
    }

    const driver = await builder
        .withCapabilities({
            browserName: cap.browserName,
            "bstack:options": {
                ...bstackOptions,
                os: cap.os,
                osVersion: cap.osVersion,
                deviceName: cap.deviceName,
                realMobile: cap.realMobile,
            },
        })
        .build();

    return driver;
}
