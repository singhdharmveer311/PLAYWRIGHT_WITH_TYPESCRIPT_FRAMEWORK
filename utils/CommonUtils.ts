import cryptoJS from 'crypto-js';
import { error } from 'node:console';

export class CommonUtils {

    private secretKey : string;

    /**
     * 
     */
    constructor(){
        // this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

        if(process.env.SECRET_KEY){
            this.secretKey = process.env.SECRET_KEY
        }else{
            // console.log(" Failing because no secret key is provided ")
            throw new Error(" Failing because no secret key is provided")
        }

    }

    /**
     * 
     * @param data 
     * @returns 
     */
    public encryptData(data: string){
        const encryptedData = cryptoJS.AES.encrypt(data, this.secretKey).toString();
        console.log(encryptedData);
        return encryptedData;
    }
    

    public decryptData(encdata: string){
        const decryptedData = cryptoJS.AES.decrypt(encdata, this.secretKey).toString(cryptoJS.enc.Utf8);
        console.log(decryptedData);
        return decryptedData;
    }

}
