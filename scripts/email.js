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
    to: 'thomas.allen13ta@gmail.com',
    subject: 'Sup nigga',
    text: 'WASSUUPPPPPPPPPPPP :P',
    attachments:[{
        filename: 'prueba1.pdf',
        path: './prueba1.pdf'
    }]
};

email.sendMail(mailOptions,function(err,info)
{
    if (err) throw err;

    console.log('Email sent:' + info.response);
})
