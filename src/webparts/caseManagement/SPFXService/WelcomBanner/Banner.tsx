  import * as React from "react";
import styles from "./Banner.module.scss";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useEffect, useState} from "react";
import Common from "../../Utils/common";
import ListService from "../SPFXCalls/SPFXCalls";
 interface IMyListProps {
   context: WebPartContext;
 }
const Banner: React.FC <IMyListProps> = ({ context })=> {

    const [items, setItems] = useState<any[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [visionMission, SetVisionMission ] = useState<any[]>([]);
    
      const fetchManagerItems = async () => {
        try {
          const service = new ListService(context);
          const data = await service.getListItems(
            Common.Managers,
            Common.params,
            Common.ExpandManager,
            
            
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

      const fetchVisionMissionItems = async () => {
        try {
          const service = new ListService(context);
          const data = await service.getListItems(
            Common.visionMission,
            Common.VisionMissionparams,
            [], )

          console.log(data, "data vision mission");
          SetVisionMission(data);
          setLoading(false);
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(() => {
        void fetchManagerItems();
        void fetchVisionMissionItems();
      }, []);

      if(loading){
        return <div>Loading...</div>;
      }

  return (
    <div style={{backgroundColor: "white"}}>
    <div className={styles.bannerContainer}>
      {/* Background with overlay */}
      <div className={styles.headerSection}>
        
        <div className={styles.navButtons}>
          <a href="https://www.google.com" ><button>Where we are/Contact us</button></a>
           <a href="https://www.google.com"><button>Org Chart</button></a>
         <a href="https://www.google.com"><button>Local Safety Value Proposition</button></a> 
        </div>
      </div>
 
      {/* Content Section */}
      <div className={styles.grid}>
      <div className={styles.contentSection}>
        {/* Left Profile */}
        <div className={styles.profileCard}>
          
          <div className={styles.profileInfo}>
            <p className={styles.role}>{items && items.length>0 ?  items[0].Title: null}</p>
            { 
            items && items.length > 0 ?
            <div > 
            <img src={items[0].ManagerProfile.Url} ></img>
            <p className={styles.name}>{items[0].Manager.Title}</p>
            </div>: 
            <p>no user</p>
            }
            
          </div>
        </div>
 
        {/* Vision + Mission */}
        <div className={styles.visionMission}>
          <div className={styles.card}>
            <span className={styles.icon}>💡</span>
            <h3>Our Vision</h3>
            <p>{visionMission && visionMission.length >0 ? visionMission[0].Vision : null}</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>🚀</span>
            <h3>Our Mission</h3>
            <p>{visionMission && visionMission.length >0 ? visionMission[0].Mission: null}</p>
          </div>
        </div>
 
        {/* Staff Presence Map */}
        <div className={styles.mapCard}>
          <h3>Staff Presence</h3>
         { items &&  items.length> 0 ?  <img src={items[0].StaffPresence.Url} ></img>: null} 
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};
 
export default Banner;