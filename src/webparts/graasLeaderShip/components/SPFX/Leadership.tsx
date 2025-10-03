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
                     Common.leadership,
                     Common.leadershipParams,
                     Common.Expandname,
                     50
                    );
             
                   console.log(data, "data from leadership");
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
              {     leader && leader.profile.Url &&
              <img src={leader.profile.Url} className={styles.avatar}  alt={leader.profile.Description}></img> 
              
              }
            </div>
            <h3 className={styles.name}>{leader.name.Title}</h3>
           <p className={styles.role}>{leader.name.JobTitle}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Leadership;