from djongo import models
from django.core.exceptions import ValidationError
from bcrypt import hashpw, gensalt


def all_letters(value):
    if value.isalpha():
        return value
    
    return ValidationError("The string must contain only letters!")


def all_letters_numbers(value):
    if value.isalnum():
        return value
    
    raise ValidationError("The string must contain only letters and numbers!")


def validate_length(value):
    if len(value) > 2:
        return value
    
    raise ValidationError("The field has to contain at least 3 characters!")


def validate_length_username(value):
    if len(value) > 5:
        return value
    
    raise ValidationError("The field has to contain at least 6 characters!")


def validate_password(value):
    if value == "password123":
        raise ValidationError("Invalid Password!")

    if len(value) < 8:
        raise ValidationError("The password has to contain at least 8 characters!")
        
    if not any(str.isdigit(char) for char in value):
        raise ValidationError("The password must contain at least one number!")
    
    if not any(char.isupper() for char in value):
        raise ValidationError("The password must contain at least one uppercase letter!")

    if not any(symbol == char for char in value for symbol in "!@#$%^&*()<>?/|\\"):
        raise ValidationError("The password must contain at least one symbol!")


    return value


def validate_integer(value):
    if value >= 0:
        return value
    
    raise ValueError("The value has to be greater or equal than 0!")



class User(models.Model):
    avatar    = models.ImageField(default = "default.jpg")
    username  = models.CharField(max_length = 20, unique = True, validators = [validate_length_username, all_letters_numbers])
    firstname = models.CharField(max_length = 15, validators = [validate_length, all_letters])
    lastname  = models.CharField(max_length = 15, validators = [validate_length, all_letters])
    email     = models.EmailField(max_length = 50, unique = True, validators = [validate_length_username])
    password  = models.CharField(max_length = 50, validators = [validate_password])
    is_admin  = models.BooleanField(default = False)
    token     = models.CharField(max_length = 255, default="")


    def save(self, *args, **kwargs):

        bytes = self.password.encode('utf-8')
        self.password = hashpw(bytes, gensalt()).decode('utf-8')

        super().save(*args, **kwargs)


class Reservation(models.Model):
    start_date = models.DateTimeField()
    end_date   = models.DateTimeField()
    author     = models.OneToOneField(User, on_delete = models.CASCADE)


class Classroom(models.Model):
    number = models.IntegerField(validators = [validate_integer])
    floor  = models.IntegerField(validators = [validate_integer])
    seats  = models.IntegerField(validators = [validate_integer])
    reservations = models.ForeignKey(Reservation, on_delete = models.CASCADE, blank = True, null = True)