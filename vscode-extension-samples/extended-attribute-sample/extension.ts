import { ZoweVsCodeExtension, DataSetAttributesProvider, IAttributesProvider, dsInfo, attributeInfo} from "@zowe/zowe-explorer-api";

class extenderAttr implements IAttributesProvider {
    public fetchAttributes(_context: dsInfo): attributeInfo {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const keys = new Map<string, { displayName?: string; description?: string; value: any }>([
            [
                "DescriptionAndDisplayName",
                {
                    displayName: "DisplayName",
                    description: "Description",
                    value: "Value1",
                },
            ],
            [
                "NoDescNoDisplayName",
                {
                    value: "Value2",
                },
            ],
            [
                "descNoDN",
                {
                    description: "Description - No Display Name",
                    value: "Value3",
                },
            ],
            [
                "DNnoDesc",
                {
                    displayName: "DisplayName - No Description",
                    value: "Value4",
                },
            ],
        ]);

        return [
            {
                title: "Dummy Extender",
                reference: "https://github.com/zowe/zowe-explorer-vscode",
                keys,
            },
        ];
    }
}

export function activate() {
    const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi();
    const dsProv: DataSetAttributesProvider | undefined = zoweExplorerApi.getDatasetAttrProvider?.();
    if(dsProv){
        dsProv.register(new extenderAttr());
    }
}

export function deactivate() {}