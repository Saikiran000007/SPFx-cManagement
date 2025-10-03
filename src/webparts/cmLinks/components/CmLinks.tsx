import * as React from "react";

import type { ICmLinksProps } from "./ICmLinksProps";

import DashboardLinks from "./SPFX/CaseMLinks";
export default class CmLinks extends React.Component<ICmLinksProps> {
  public render(): React.ReactElement<ICmLinksProps> {
    const { context } = this.props;

    return (
      <>
        <DashboardLinks context={context} />
      </>
    );
  }
}
