import { GMAIL, TWILLO_NUMBER } from "../config"
import { getOtpTemplate } from "@paybox/common"
import { } from "../index"
import { transporter, twillo } from "../index";
import * as speakeasy from 'speakeasy';


/**
 * 
 * @param name 
 * @param email 
 * @param otp 
 */
export const sendOTP = async (
    name: string,
    email: string,
    otp: number,
    mobile?: number,
) => {
    const template = getOtpTemplate(name, otp, GMAIL);
    const mailOptions = {
        from: GMAIL,
        to: email,
        subject: 'PayBox Email Verification',
        html: template
    };

    try {
        if (mobile !== undefined) {

            await transporter.sendMail(mailOptions);
            await twillo.messages.create({
                body: `PayBox Verifcation OTP: ${otp}`,
                from: TWILLO_NUMBER,
                to: `+91${mobile}` as string,
            });
        }
        console.log('OTP sent successfully to', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
}

/**
* 
* @returns Opt
*/
export const genOtp = (digits: number, time: number): number => {
    const otp = speakeasy.totp({
        secret: speakeasy.generateSecret().base32,
        digits: digits,
        encoding: 'base32',
        step: time
    });
    return Number(otp);
}