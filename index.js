var log = console.log.bind();

const myFunc = async () => {
    var bountiesOnVendor = [],
        VENDORHASH = 672118013;

    var definitionsForItems = await axios.get('https://www.bungie.net/common/destiny2_content/json/en/DestinyInventoryItemDefinition-cb4bec6f-e2b6-4f44-8593-cfd0255b89f2.json', {header: 'Access-Control-Allow-Origin: *'}),
        inventoryItemDefinitions = definitionsForItems.data;

    var definitionsForVendors = await axios.get('https://www.bungie.net/common/destiny2_content/json/en/DestinyVendorDefinition-cb4bec6f-e2b6-4f44-8593-cfd0255b89f2.json', {header: 'Access-Control-Allow-Origin: *'}),
        vendor = definitionsForVendors.data[VENDORHASH];

    for (var item of vendor.itemList) {
        inventoryItemDefinitions[item.itemHash].itemType===26 ? bountiesOnVendor.push(item) : null;
    };
    return bountiesOnVendor;
};

myFunc()
.then(v => {
    log(v); // arr output
});




