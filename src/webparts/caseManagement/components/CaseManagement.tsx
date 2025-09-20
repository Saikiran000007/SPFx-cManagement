import * as React from 'react';
import styles from './CaseManagement.module.scss';
import type { ICaseManagementProps } from './ICaseManagementProps';
import Banner from '../SPFXService/WelcomBanner/Banner';
import WelcomBanner from '../SPFXService/WelcomBanner/WelcomeBanner';
export default class CaseManagement extends React.Component<ICaseManagementProps> {
  public render(): React.ReactElement<ICaseManagementProps> {
   

    return (
      <>
     
      <Banner  context={this.props.context}/>
      </>
    );
  }
}
