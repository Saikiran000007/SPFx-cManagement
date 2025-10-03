import * as React from "react";

import type { IGraasLeaderShipProps } from "./IGraasLeaderShipProps";

import Leadership from "./SPFX/Leadership";
export default class GraasLeaderShip extends React.Component<IGraasLeaderShipProps> {
  public render(): React.ReactElement<IGraasLeaderShipProps> {
    const { context } = this.props;

    return (
      <>
        <Leadership context={context} />
      </>
    );
  }
}
