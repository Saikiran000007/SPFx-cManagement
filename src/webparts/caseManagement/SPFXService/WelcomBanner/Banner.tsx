  import * as React from "react";
import styles from "./Banner.module.scss";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useEffect, useState} from "react";
import Common from "../../Utils/common";
import ListService from "../SPFXCalls";
 interface IMyListProps {
   context: WebPartContext;
 }
const Banner: React.FC <IMyListProps> = ({ context })=> {

    const [items, setItems] = useState<any[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
    
      const fetchItems = async () => {
        try {
          const service = new ListService(context);
          const data = await service.getListItems(
            Common.Managers,
            Common.params,
            Common.ExpandManager,
            50
            
          );
    
          console.log(data, "data");
    
          setItems(data);
          setLoading(false)
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        void fetchItems();
      }, []);

      if(loading){
        return <div>Loading...</div>;
      }

  return (
    <div style={{backgroundColor: "white"}}>
    <div className={styles.bannerContainer}>
      {/* Background with overlay */}
      <div className={styles.headerSection}>
        <h1>Welcome to International Safety</h1>
        <div className={styles.navButtons}>
          <button>Where we are/Contact us</button>
          <button>Org Chart</button>
          <button>Local Safety Value Proposition</button>
        </div>
      </div>
 
      {/* Content Section */}
      <div className={styles.grid}>
      <div className={styles.contentSection}>
        {/* Left Profile */}
        <div className={styles.profileCard}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div className={styles.profileInfo}>
            <p className={styles.role}>AVP Global Safety</p>
            { 
            items && items.length > 0 ? 
            <p className={styles.name}>{items[0].Manager.Title}</p>: 
            <p>no user</p>
            }
            
          </div>
        </div>
 
        {/* Vision + Mission */}
        <div className={styles.visionMission}>
          <div className={styles.card}>
            <span className={styles.icon}>💡</span>
            <h3>Our Vision</h3>
            <p>Patient Safety First for every patient, everywhere.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>🚀</span>
            <h3>Our Mission</h3>
            <p>
              Optimizing the safe use of Amgen’s medicines through regulatory compliance,
              process excellence and appropriate communication of risk/benefit at the local level.
            </p>
          </div>
        </div>
 
        {/* Staff Presence Map */}
        <div className={styles.mapCard}>
          <h3>Staff Presence</h3>
          <img
            src="https://via.placeholder.com/250x150"
            alt="World Map"
          />
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};
 
export default Banner;