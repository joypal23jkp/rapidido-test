"use strict";

import nodemailer from 'nodemailer';


export default async function handler(req, res) {

    
    const payload = req.body;

    if(req.method !== 'POST') {
        return res.status(404).send('404 Route Not Found!');
    }

    try {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.rapedido.es",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ola@rapedido.es", 
                pass: "@Hel3vlig1",
            },
            // tls: {
            //     rejectUnauthorized: false
            // }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${payload.email} <${payload.email}>`, // sender address
            to: "ola@rapedido.es", // list of receivers
            subject: "Rapedido User Email ", // Subject line
            text: payload.text, // plain text body
            html: `<p>${payload.text}</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.status(200).json({ success: true });

        
    } catch (error) {
        console.error(error.message)
        return res.status(200).json({ success: false, message: error.message });

    }

    
}