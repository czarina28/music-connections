import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

const PRODUCT_ID = "com.mariaworld.musicconnections.fullgame";

async function getProduct() {
    return NativePurchases.getProduct({
        productIdentifier: PRODUCT_ID,
        productType: PURCHASE_TYPE.INAPP
    });
}

async function getPurchases() {
    return NativePurchases.getPurchases({
        productType: PURCHASE_TYPE.INAPP
    });
}

async function purchaseFullGame() {
    return NativePurchases.purchaseProduct({
        productIdentifier: PRODUCT_ID,
        productType: PURCHASE_TYPE.INAPP,
        quantity: 1
    });
}

async function restorePurchases() {
    await NativePurchases.restorePurchases();
    return getPurchases();
}

window.MusicConnectionsStore = {
    PRODUCT_ID,
    getProduct,
    getPurchases,
    purchaseFullGame,
    restorePurchases
};
