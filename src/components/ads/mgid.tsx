'use client';

import React, { useEffect } from "react";
import Script from "next/script";

const MGIDWidget = ({ widgetId = "1725109" }) => {
  useEffect(() => {
    // Initialize MGID queue
    window._mgq = window._mgq || [];
    window._mgq.push(["_mgc.load"]);
  }, []);

  return (
    <>
      <Script 
        src="https://jsc.mgid.com/site/1008293.js"
        strategy="worker"
        onError={(e) => {
          console.error('Error loading MGID script:', e);
        }}
      />
      <div data-type="_mgwidget" data-widget-id={widgetId} />
    </>
  );
};

export default MGIDWidget;