import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./HexagonsIcons.module.scss";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import ListService from "../../../caseManagement/SPFXService/SPFXCalls/SPFXCalls";
import Common from "../../../caseManagement/Utils/common";

interface ICircleItem {
  Title: string;
  Icons: string;
  URL: {
    Description: string;
    Url: string;
  }; 
}

interface IHexagonIcons {
  context: WebPartContext;
}

const HexagonIcons: React.FC<IHexagonIcons> = ({ context }) => {
  const [loading, Setloading] = useState<boolean>(true);
  const [hexagonItems, SetHexagonItems] = useState<any[]>([]);

  const fetchIcons = async () => {
    try {
      const service = new ListService(context);
      const data = await service.getListItems(
        Common.Hexagons,
        Common.HexagonsParams,
        []
      );
      SetHexagonItems(data);
      Setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    void fetchIcons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      {hexagonItems && hexagonItems.length > 0 ? (
        hexagonItems.map((item: ICircleItem, index) => (
          <div key={index} className={styles.circleCard}>
            <a href={item.URL ? item.URL.Url : "#"} target="_blank" rel="noopener noreferrer" className={styles.linkWrapper}> 
            <img
              src={item.Icons}
              alt={item.Title}
              className={styles.icon}
              
            ></img>

            <p className={styles.title}>{item.Title}</p>
            </a>
          </div>
        ))
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default HexagonIcons;
