import React, { useState } from 'react';
import { mapToBE } from "@/globalFunction/mapToBE";
import axios from "axios";
import styles from './csvDownloadBtn.module.css';

interface CSVDownloadProps {
  chartDate: string;
  storeId: number;
  startDate: string;
  endDate: string;
}

const CSVDownloadButton: React.FC<CSVDownloadProps> = (props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async () => {
    setIsDownloading(true);

    try {
      const fileName = `${props.chartDate}_sale_report`;
      const url = `http://localhost:8080/api/v1/hq/sale-management/list-csv/date=${props.chartDate}/storeId=0/startDate=0/endDate=0`;
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("파일 다운로드 중 오류 발생", error);
    }

    setIsDownloading(false);
  }

  return (
    <div>
      <div onClick={downloadFile} className={isDownloading ? styles.csvDownloadingBtn : styles.csvDownloadBtn}>
        {isDownloading ? '다운로드 중...' : 'CSV'}
      </div>
    </div>
  );
}

export default CSVDownloadButton;
