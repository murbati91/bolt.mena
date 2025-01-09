import React from "react";

export default function DownloadSourceButton() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download");
      if (!response.ok) {
        alert("Failed to download the source code.");
        return;
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "source-code.zip";
      link.click();
    } catch (error) {
      console.error("Error during download:", error);
      alert("An error occurred while downloading the source code.");
    }
  };

  return (
    <button onClick={handleDownload} style={{ padding: "10px", margin: "10px" }}>
      Download Source Code
    </button>
  );
}
