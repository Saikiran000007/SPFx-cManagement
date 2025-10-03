import * as React from "react";
import * as ReactDom from "react-dom";

import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "GraasLeaderShipWebPartStrings";
import GraasLeaderShip from "./components/GraasLeaderShip";
import { IGraasLeaderShipProps } from "./components/IGraasLeaderShipProps";

export interface IGraasLeaderShipWebPartProps {
  description: string;
}

export default class GraasLeaderShipWebPart extends BaseClientSideWebPart<IGraasLeaderShipWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IGraasLeaderShipProps> =
      React.createElement(GraasLeaderShip, {
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
