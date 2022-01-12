def clean_phone(phone_number):
    return phone_number.replace(' ','').replace('(','').replace(')','').replace('-','')