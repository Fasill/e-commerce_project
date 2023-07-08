import SantimpaySdk from "../lib/index";

const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEII0qPPByHBzW3znAladzC0uQDi6vhgctF/r6NYlN4ftmoAoGCCqGSM49\nAwEHoUQDQgAE4zghgXLQRJWd56Fe282IVNChD+oa8cNdSAZ6DaELdExs2lKmjXeS\nxU/A8YCNg1GqgfrrLcx3eHnI+Qm6+ppgng==\n-----END EC PRIVATE KEY-----\n`

const GATEWAY_MERCHANT_ID = "9e2dab64-e2bb-4837-9b85-d855dd878d2b"
const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM);

const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "http://localhost:3000/cart";

const notifyUrl = "http://localhost:8080/products/webhook";

const id = Math.floor(Math.random() * 1000000000).toString();


export const pay = async (req,res) =>{
    const {amount,token,phoneNumber} = req.body; 

client.generatePaymentUrl(id,amount, "Payment for a coffee", successRedirectUrl, failureRedirectUrl, notifyUrl, `+251${phoneNumber}`).then(url => {
    console.log("Payment URL: ", url);
    res.status(200).json({PaymentURL:url})

    
    setTimeout(() => {

        console.log("\n\n*********************************")
        console.log("checking for transaction...")
        
        client.checkTransactionStatus(id).then(transaction => {
            console.log("Transaction: ", transaction);
        }).catch(error => {
            console.error(error)
        })
    }, 20_000)
}).catch(error => {
    console.error(error)
})}