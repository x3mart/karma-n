def clean_phone(phone_number):
    phone_number = phone_number.replace(' ','').replace('(','').replace(')','').replace('-','').replace('+','')
    if not phone_number.startwith('7'):
        pass
    return phone_number