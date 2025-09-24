import * as React from 'react';
import styles from './CaseManagement.module.scss';
import type { ICaseManagementProps } from './ICaseManagementProps';
import Banner from '../SPFXService/WelcomBanner/Banner';

export default class CaseManagement extends React.Component<ICaseManagementProps> {
  public render(): React.ReactElement<ICaseManagementProps> {
   const {context} = this.props;
     
    return (
      <>
     
      <Banner  context={context}/>
      </>
    );
  }
}
