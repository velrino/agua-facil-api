const Mail = use('Mail')
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

class MailService {

    async sendMail(email, subject = null, params = {}, layout = 'emails.welcome') {
        return await Mail.send(layout, params, (message) => {
            message
                .to(email)
                .from(Env.get('MAIL_FROM'))
                .subject(subject)
        })
    }
}

module.exports = MailService