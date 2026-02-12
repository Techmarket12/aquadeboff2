"use client";

import { useEffect } from "react";

const GA_ID = "AW-17024011541";
const SEND_TO = "AW-17024011541/Kh3NCKi1yMYaEJWa17U_";
const SCRIPT_ID = "ga-ads-gtag";

export const trackPhoneConversion = () => {
  if (typeof window === "undefined") return;
  if (window.gtag_report_conversion) {
    window.gtag_report_conversion();
  }
};

export default function GoogleAdsTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    }

    if (!window.dataLayer) window.dataLayer = [];
    if (!window.gtag) {
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }

    if (!window.gtag_report_conversion) {
      window.gtag_report_conversion = function (url) {
        const callback = function () {
          if (typeof url !== "undefined") {
            window.location = url;
          }
        };
        window.gtag("event", "conversion", {
          send_to: SEND_TO,
          event_callback: callback,
        });
        return false;
      };
    }
  }, []);

  return null;
}





