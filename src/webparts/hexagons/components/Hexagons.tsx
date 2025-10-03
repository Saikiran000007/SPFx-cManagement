import * as React from "react";

import type { IHexagonsProps } from "./IHexagonsProps";

import HexagonIcons from "./SPFX/HexagonsIcons";
export default class Hexagons extends React.Component<IHexagonsProps> {
  public render(): React.ReactElement<IHexagonsProps> {
    const { context } = this.props;

    return (
      <>
        <HexagonIcons context={context} />
      </>
    );
  }
}
