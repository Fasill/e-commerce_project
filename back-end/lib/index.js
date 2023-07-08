import axios from "axios";
import { signES256 } from "./utils/cryptography.js";
import { PRODUCTION_BASE_URL, TEST_BASE_URL } from "./utils/constants.js";



export class SantimpaySdk {
  constructor(merchantId, privateKey, testBed = false) {
    this.privateKey = privateKey;
    this.merchantId = merchantId;
    this.baseUrl = PRODUCTION_BASE_URL;
    if (testBed) {
      this.baseUrl = TEST_BASE_URL;
    }
  }
 
  generateSignedTokenForInitiatePayment(amount, paymentReason) {
    const time = Math.floor(Date.now() / 1000);
    const payload = {
      amount,
      paymentReason,
      merchantId: this.merchantId,
      generated: time
    };
    return signES256(payload, this.privateKey);
  }
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-==-

    // ...
  
    async checkTransactionStatus(id) {
      try {
        const response = await axios.get(`${this.baseUrl}/transactions/${id}`, {
          // headers: {
          //   Authorization: `Bearer ${this.token}`
          // }
        });
  
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to check transaction status");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          throw error.response.data;
        }
        throw error;
      }
    }

  




  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-==-
 
  async generatePaymentUrl(id, amount, paymentReason, successRedirectUrl, failureRedirectUrl, notifyUrl, phoneNumber = "") {
    try {
      const token = this.generateSignedTokenForInitiatePayment(amount, paymentReason);
      const payload = {
        id,
        amount,
        reason: paymentReason,
        merchantId: this.merchantId,
        signedToken: token,
        successRedirectUrl,
        failureRedirectUrl,
        notifyUrl
      };
      if (phoneNumber && phoneNumber.length > 0) {
        payload.phoneNumber = phoneNumber;
      }
      const response = await axios.post(`${this.baseUrl}/initiate-payment`, payload

      // {
      // headers: {
      //   Authorization: `Bearer ${this.token}`
      // }
      // }
      );

      if (response.status === 200) {
        return response.data.url;
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  }
}
export default SantimpaySdk;