import axios from "axios";
import { IAsset, AssetType } from "../../models/applicationState";
import { IAssetProvider } from "./assetProviderFactory";
import { AssetService } from "../../services/assetService";
import Guard from "../../common/guard";
import { createQueryString } from "../../common/utils";

/**
 * Options for Inarix Image Search
 * @member endpoint - The endpoint to use for the Inarix API
 * @member apiKey - Inarix API Key (Third Party Token)
 */
export interface IInarixImageSearchOptions {
    endpoint?: string;
    apiKey: string;
}

/**
 * Asset Provider for Bing Image Search
 */
export class InarixImageSearch implements IAssetProvider {
    public static DefaultApiUrl = "https://analytics.api.inarix.com/";

    constructor(private options: IInarixImageSearchOptions) {
        Guard.null(options);
    }

    /**
     * Retrieves assets from Bing Image Search based on options provided
     */
    public async getAssets(): Promise<IAsset[]> {
        const query = {}; // TODO: add query

        const baseUrl = this.options.endpoint || InarixImageSearch.DefaultApiUrl;
        const apiUrl = `${baseUrl}`; // TODO: add service enpoint

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${this.options.apiKey}`,
                Accept: "application/json",
            },
        });

        const items = []; // TODO: Get items

        return items // TODO: build assets
            .map((filePath) => AssetService.createAssetFromFilePath(filePath))
            .filter((asset) => asset.type !== AssetType.Unknown);
    }
}
