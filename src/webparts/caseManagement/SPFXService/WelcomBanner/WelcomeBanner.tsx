import * as React from "react";
import { useEffect, useState } from "react";
import ListService from "../SPFXCalls";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import Common from "../../Utils/common";
interface IMyListProps {
  context: WebPartContext;
}

const WelcomBanner: React.FC<IMyListProps> = ({ context }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchItems = async () => {
    try {
      const service = new ListService(context);
      const data = await service.getListItems(
        Common.ServiceDesk,
        Common.params,
        [],
        50
      );

      console.log(data, "data");

      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchItems();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.Id}>{item.ID}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WelcomBanner;
