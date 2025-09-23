import * as React from 'react';
import styles from './Leadership.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
 import { useState, useEffect } from 'react';
 import ListService from '../../../caseManagement/SPFXService/SPFXCalls/SPFXCalls';
 import Common from '../../../caseManagement/Utils/common';
interface ILeader {
  name: string;
  role: string;
}
 

 
interface IGraasLeadersProps {
    context: WebPartContext
}

const Leadership: React.FC <IGraasLeadersProps>= ({context}) => {
 const [loading, SetLoading] = useState<boolean>(true);
const [items, SetItems] = useState<any[]>([]);

   const fetchLeaderShip= async()=>{
    try {
        const service = new ListService(context);
          const data = await service.getListItems(
                     Common.Managers,
                     Common.params,
                     Common.ExpandManager,
                     50
                    );
             
                   console.log(data, "data");
                     SetItems(data);
                     SetLoading(false)
    } catch (error) {
         console.error(error);
    }
   }

   useEffect(() => {
   void fetchLeaderShip();   
},[])

if(loading){
    return <div>Loading...</div>;
}

  return (
    <div className={styles.leadershipContainer}>
      <h2 className={styles.title}>-------GRAAS Leadership------</h2>
      <div className={styles.cardsRow}>
        {items.map((leader, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.avatar}>
              {     leader.ProfilePictures.Url ? 
              <img src={leader.ProfilePictures.Url} className={styles.avatar}  alt={leader.ProfilePictures.Description}></img> :
              leader.Manager.Title.split(" ").map(n => n[0]).join("")
              }
            </div>
            <h3 className={styles.name}>{leader.Manager.Title}</h3>
           <p className={styles.role}>{leader.Manager.JobTitle}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Leadership;