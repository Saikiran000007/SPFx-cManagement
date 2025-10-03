import * as React from "react";

import type { ICaseManagementProps } from "./ICaseManagementProps";
import Banner from "../SPFXService/SPFX/Banner";

export default class CaseManagement extends React.Component<ICaseManagementProps> {
  public render(): React.ReactElement<ICaseManagementProps> {
    const { context } = this.props;

    return (
      <>
        <Banner context={context} />
      </>
    );
  }
}
