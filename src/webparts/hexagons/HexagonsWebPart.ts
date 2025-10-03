import * as React from "react";
import * as ReactDom from "react-dom";

import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "HexagonsWebPartStrings";
import Hexagons from "./components/Hexagons";
import { IHexagonsProps } from "./components/IHexagonsProps";

export interface IHexagonsWebPartProps {
  description: string;
}

export default class HexagonsWebPart extends BaseClientSideWebPart<IHexagonsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IHexagonsProps> = React.createElement(
      Hexagons,
      {
        context: this.context,
      }
    );

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
