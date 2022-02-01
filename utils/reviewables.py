def clean_phone(phone_number):
    phone_number = phone_number.replace(' ','').replace('(','').replace(')','').replace('-','').replace('+','')
    if phone_number.startswith('8'):
        phone_number = "7" + phone_number[1:]
    return phone_number