from flask_mail import Message
from app import mail

def send_email(to, subject, body):
    default_sender = ('Bytebites', 'nagaraju@chodavarapu.in')
    msg = Message(subject, sender=default_sender, recipients=[to])
    msg.body = body
    mail.send(msg)

def send_email(to, subject, body, html_body):
    default_sender = ('Bytebites', 'nagaraju@chodavarapu.in')
    msg = Message(subject, sender=default_sender, recipients=[to])
    msg.html = html_body
    mail.send(msg)
