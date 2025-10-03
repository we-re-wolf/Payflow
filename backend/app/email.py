import smtplib
from threading import Thread
from flask import current_app, render_template
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_async_email(app, msg):
    """
    The actual email sending logic, run in a separate thread.
    """
    with app.app_context():
        try:
            # Choose between SMTP_SSL (for ports like 465) or standard SMTP
            if app.config['MAIL_PORT'] == 465:
                server = smtplib.SMTP_SSL(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
            else:
                server = smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
                if app.config['MAIL_USE_TLS']:
                    server.starttls()
            
            server.login(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            server.send_message(msg)
            server.quit()
            print(f"Email sent successfully to {msg['To']}")
        except Exception as e:
            print(f"Failed to send email to {msg['To']}: {e}")

def send_email(to, subject, template, **kwargs):
    """
    Constructs an email message and starts a new thread to send it.
    """
    app = current_app._get_current_object()
    
    # Create the root email message container
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = app.config['MAIL_DEFAULT_SENDER']
    msg['To'] = to
    
    # Render the HTML body from a template and attach it
    html_body = render_template(template + '.html', **kwargs)
    msg.attach(MIMEText(html_body, 'html'))
    
    # Create and start the sending thread
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return thr

def send_temporary_password_email(user, temp_password):
    """
    A specific helper function for sending the welcome email.
    """
    send_email(
        to=user.email,
        subject='Welcome to PayFlow Pro!',
        template='email/welcome',
        user=user,
        password=temp_password
    )

def send_password_reset_email(user):
    """
    Generates a reset token and sends it to the user's email.
    """
    token = user.get_reset_token()
    send_email(
        to=user.email,
        subject='Password Reset Request for PayFlow Pro',
        template='email/reset_password',
        user=user,
        token=token
    )