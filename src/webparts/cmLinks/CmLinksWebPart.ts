import * as React from "react";
import * as ReactDom from "react-dom";

import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "CmLinksWebPartStrings";
import CmLinks from "./components/CmLinks";
import { ICmLinksProps } from "./components/ICmLinksProps";

export interface ICmLinksWebPartProps {
  description: string;
}

export default class CmLinksWebPart extends BaseClientSideWebPart<ICmLinksWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICmLinksProps> = React.createElement(
      CmLinks,
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
