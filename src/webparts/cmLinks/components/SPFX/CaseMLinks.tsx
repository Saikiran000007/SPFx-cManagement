import * as React from "react";
import { useState, useEffect } from "react";
import styles  from "./DashboardLinks.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import Common from "../../../caseManagement/Utils/common";
import ListService from "../../../caseManagement/SPFXService/SPFXCalls/SPFXCalls";
import { WebPartContext } from "@microsoft/sp-webpart-base";
 
interface CMLinks {
  context: WebPartContext;
}
 
const DashboardLinks: React.FC<CMLinks> = ({ context }) => {
  const [cmLinks, SetCMLinks] = useState<any[]>([]);
  console.log(cmLinks, "cm links");
 
  const fetchCMLinkItems = async () => {
    try {
      const service = new ListService(context);
      const data = await service.getListItems(Common.CMLinks, Common.CMLinksparams, []);
      console.log(data, "data cm links");
      SetCMLinks(data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    void fetchCMLinkItems();
  }, []);
 
  const renderLinks = (links: any[]) => (
   

    links && links.length > 0 ?
    

    <ul className={styles.linkList}>
      { links.map((link, i) => (
        
        link.IconName &&<li key={i} className={styles.assalLinks}>
         <a href={link.Url} target="_blank"  key={i} className={styles.linkWrapper}>
          {
            
            <>
             <Icon
            iconName={link.IconName || "Link"}
            className={ styles.icon}
          />
          <span>{link.Description}</span>
            </>
          }
          
          
           </a>
        </li>
       
      ))}
    </ul>: null
  );
 
  return (
    <div className={styles.dashboard}>
      <div className={styles.section}>
        <h3>Quick Access</h3>
        {renderLinks(
          cmLinks
            
            .map((link) => ({
              Description: link?.QuickAccess?.Description,
              IconName: link?.QuickAccessIcon || link.IconName,
               Url: link?.QuickAccess?.Url
            }))
        )}
      </div>
      <div className={styles.section}>
        <h3>Other Useful Links</h3>
        {renderLinks(
          cmLinks
            
            .map((link) => ({
              Description: link?.OtherLinks?.Description,
              IconName: link?.OtherLinksIcon || link.IconName, 
              Url: link?.OtherLinks?.Url
            }))
        )}
      </div>
      <div className={styles.section}>
        <h3>Department Links</h3>
        {renderLinks(
          cmLinks
            
            .map((link) => ({
              Description: link?.DepartmentLinks?.Description,
              IconName: link?.DepartmentLinksIcon , 
              Url: link?.DepartmentLinks?.Url
            }))
        )}
      </div>
      <div className={styles.systemSection}>
        <h3>Systems Links</h3>
        <div className={styles.grid}>
          {
          cmLinks && cmLinks.length > 0 &&
         
          cmLinks.map((link, i) => (

             link.SystemLinksIcon && <div key={i} className={styles.systemCard}>
                <a href={link.SystemLinks?.Url} target="_blank"  key={i} className={styles.linkWrapper}>
                <Icon
                  iconName={link?.SystemLinksIcon || "OpenInNewWindow" }
                  className={styles.sysIcon}
                />
                <span>{link.SystemLinks?.Description}</span>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
 
export default DashboardLinks;
 