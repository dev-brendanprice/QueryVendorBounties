var log = console.log.bind(console);

const myFunc = async () => {
    let bountiesOnVendor = [],
        VENDORHASH = 672118013,
        platformLanguage = window.navigator.language.split('-')[0];

    let manifest = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/`),
        itemDefinitionSuffix = manifest.data.Response.jsonWorldComponentContentPaths[platformLanguage].DestinyInventoryItemDefinition,
        vendorDefinitionSuffix = manifest.data.Response.jsonWorldComponentContentPaths[platformLanguage].DestinyVendorDefinition;

    let definitionsForItems = await axios.get(`https://www.bungie.net/${itemDefinitionSuffix}`, {header: 'Access-Control-Allow-Origin: *'}),
        inventoryItemDefinitions = definitionsForItems.data;

    let definitionsForVendors = await axios.get(`https://www.bungie.net/${vendorDefinitionSuffix}`, {header: 'Access-Control-Allow-Origin: *'}),
        vendor = definitionsForVendors.data[VENDORHASH];

    for (let item of vendor.itemList) {
        
        let itemDefinition = inventoryItemDefinitions[item.itemHash];
        if (itemDefinition.itemType===26) {
            log(`Item Hash: ${item.itemHash}`, itemDefinition.displayProperties);
        };
    };
};

myFunc();