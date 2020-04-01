const nodemailer = require('nodemailer');



// correo de donde se enviara
let email = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ovayandah.tours2020@gmail.com',
        pass: 'ThomasCarlosGustavoDavidJorge'
    }
});

//Correo que se enviara: destinario y archivos adjuntados
let mailOptions = {
    from: 'ovayandah.tours2020@gmail.com',
    to: 'davidcolindres030@gmail.com',
    subject: 'Boleta de Reservacion',
    text: 'Aqui su boleta que tenga un buen dia Sr. Cara de Nabo :)',
    attachments:[{
        filename: 'ovayandah tours.pdf',
        path: './ovayandah tours.pdf'
    }]
};

email.sendMail(mailOptions,function(err,info)
{
    if (err) throw err;

    console.log('Email sent:' + info.response);
})
