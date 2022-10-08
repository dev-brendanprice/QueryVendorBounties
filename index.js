import { vendorLabels } from './labels.js';

document.addEventListener('DOMContentLoaded', () => {

    queryVendorBounties(3347378076);

});


async function queryVendorBounties(vendorHash) {

    const log = console.log.bind(console);

    let bountiesOnVendor = 0,
        commonSubstringLabel = vendorLabels[vendorHash];

    // Fetch manifest
    const manifest = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/`);

    // Get suffix for the item and vendor definitions
    const suffixForItemDefinitions = manifest.data.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition,
          suffixForVendorDefinitions = manifest.data.Response.jsonWorldComponentContentPaths.en.DestinyVendorDefinition;

    const definitionsForItems = await axios.get(`https://www.bungie.net/${suffixForItemDefinitions}`, { header: 'Access-Control-Allow-Origin: *' }), 
          inventoryItemDefinitions = definitionsForItems.data;

    const definitionsForVendors = await axios.get(`https://www.bungie.net/${suffixForVendorDefinitions}`, { header: 'Access-Control-Allow-Origin: *' }), 
          vendorData = definitionsForVendors.data[vendorHash];

    // Display all bounties
    for (let v of Object.keys(inventoryItemDefinitions)) {

        if (inventoryItemDefinitions[v].itemType === 26) {

            if (inventoryItemDefinitions[v].inventory.stackUniqueLabel.includes(`${commonSubstringLabel}`)) {
                log(`.`);
                log(`Item Hash: ${v},`, inventoryItemDefinitions[v].inventory.stackUniqueLabel);
                log(inventoryItemDefinitions[v]);
                log(`https://data.destinysets.com/i/InventoryItem/InventoryItem:${v}#`);
                log(`.`);
                bountiesOnVendor++;
            };
        };
    };

    // Only display non-repeatable bounties
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

    log(`Total Bounties: ${bountiesOnVendor}`);
};