var log = console.log.bind(console);

async function queryVendorBounties(vendorHash, stackUniqueLabel) {
    
    let bountiesOnVendor = 0,
        VENDORHASH = vendorHash; // Set to your chosen vendor hash

    // Fetch manifest
    const manifest = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/`);

    // Get suffix for the item and vendor definitions
    const suffixForItemDefinitions = manifest.data.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition,
          suffixForVendorDefinitions = manifest.data.Response.jsonWorldComponentContentPaths.en.DestinyVendorDefinition;

    const definitionsForItems = await axios.get(`https://www.bungie.net/${suffixForItemDefinitions}`, { header: 'Access-Control-Allow-Origin: *' }), 
          inventoryItemDefinitions = definitionsForItems.data;

    const definitionsForVendors = await axios.get(`https://www.bungie.net/${suffixForVendorDefinitions}`, { header: 'Access-Control-Allow-Origin: *' }), 
          vendorData = definitionsForVendors.data[VENDORHASH];

    // Dev
    // vendorData.itemList.forEach(v => {
    //     if (inventoryItemDefinitions[v.itemHash].itemType === 26) {
    //             log(`.`);
    //             log(`Item Hash: ${v.itemHash},`);
    //             log(inventoryItemDefinitions[v.itemHash]);
    //             log(`https://data.destinysets.com/i/InventoryItem/InventoryItem:${v.itemHash}#`);
    //             log(`.`);
    //             bountiesOnVendor++;
    //     };
    // });

    // Iterate over items in the itemList of the specified vendor
    for (let v of Object.keys(inventoryItemDefinitions)) {

        if (inventoryItemDefinitions[v].itemType === 26) {

            if (inventoryItemDefinitions[v].inventory.stackUniqueLabel.includes(`${stackUniqueLabel}`)) {
                log(`.`);
                log(`Item Hash: ${v},`, inventoryItemDefinitions[v].inventory.stackUniqueLabel);
                log(inventoryItemDefinitions[v]);
                log(`https://data.destinysets.com/i/InventoryItem/InventoryItem:${v}#`);
                log(`.`);
                bountiesOnVendor++;
            };
        };
    };

    log(`Amount of Bounties: ${bountiesOnVendor}`);
};

// param1 = vendor hash, param2 = substring in common from stackUniqueLabel
queryVendorBounties(3347378076, 'gambit');