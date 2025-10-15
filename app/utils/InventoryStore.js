import { create } from "zustand";

// const obj = {
//     "id": "gid://shopify/Product/7857252597899",
//     "title": "Steering Wheel Wiring Harness",
//     "status": "DRAFT",
//     "totalInventory": 170,
//     "productType": "",
//     "variants": {
//         "edges": [
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627009163",
//                     "title": "X1",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627041931",
//                     "title": "X2",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627074699",
//                     "title": "X3A",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627107467",
//                     "title": "X3B",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627140235",
//                     "title": "X3C",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627173003",
//                     "title": "X4",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627205771",
//                     "title": "X5",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627238539",
//                     "title": "X6",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627271307",
//                     "title": "X7",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627304075",
//                     "title": "X8A",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627336843",
//                     "title": "X9",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627369611",
//                     "title": "X10",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627402379",
//                     "title": "X11",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627435147",
//                     "title": "X13",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627467915",
//                     "title": "X14",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627500683",
//                     "title": "X15",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627533451",
//                     "title": "X16",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627566219",
//                     "title": "X17",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627598987",
//                     "title": "X19",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627631755",
//                     "title": "X20",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627664523",
//                     "title": "X22",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627697291",
//                     "title": "X25",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627730059",
//                     "title": "X26",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627762827",
//                     "title": "X27",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627795595",
//                     "title": "X28",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627828363",
//                     "title": "X29",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627861131",
//                     "title": "X30",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627893899",
//                     "title": "X32",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627926667",
//                     "title": "X33",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627959435",
//                     "title": "X34",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657627992203",
//                     "title": "X35",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657628024971",
//                     "title": "X36",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657628057739",
//                     "title": "X37",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             },
//             {
//                 "node": {
//                     "id": "gid://shopify/ProductVariant/43657628090507",
//                     "title": "X38",
//                     "inventoryQuantity": 5,
//                     "sku": null,
//                     "__typename": "ProductVariant"
//                 },
//                 "__typename": "ProductVariantEdge"
//             }
//         ],
//         "__typename": "ProductVariantConnection"
//     },
//     "__typename": "Product"
// }

// const wiringHarness = {}

// obj.variants.edges.map(vari => wiringHarness[vari.node.title] = {... vari.node})

// console.log(wiringHarness)

export const useInventoryStore = create((set) => ({
    wiringHarnessData : null,

    setWiringHarnessData: (value) => set({
        wiringHarnesData: value
    })
}))