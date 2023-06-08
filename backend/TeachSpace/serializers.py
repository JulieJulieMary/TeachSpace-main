from rest_framework import serializers
from TeachSpace.models import User, Classroom, Reservation



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('avatar', 'username', 'firstname', 'lastname', 'email', 'password', 'is_admin')



class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom 
        fields = ('number', 'floor', 'seats', 'reservations')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation 
        fields = ('start_date', 'end_date', 'author')