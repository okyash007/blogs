export function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Options for formatting the date
  const dateOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Options for formatting the time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format using Internationalization API
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard.");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  } else {
    console.warn("Clipboard API not available.");
  }
}
