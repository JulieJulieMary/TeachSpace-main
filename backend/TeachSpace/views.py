from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from TeachSpace.models import User, Classroom, Reservation
from TeachSpace.serializers import UserSerializer, ClassroomSerializer, ReservationSerializer
from bcrypt import checkpw
import jwt
import os


NOT_AUTHENTICATED_ERROR = JsonResponse({ 'error': 'Not Authenticated!' }, status = 401)
NOT_FOUND_ERROR = JsonResponse({ 'error': 'Not Found!' }, status = 404)


def auth(request):
    try:
        token = request.COOKIES["teachspace_session"]
        decoded = jwt.decode(token, os.environ.get('JWT_SECRET'), algorithms = 'HS256')
        user = User.objects.get()

        if not user:
            return False
        
        print(decoded)

    except:
        return False

    return True



def generate_auth_token(username, email):
    token = jwt.encode({ 'username': username, 'email': email }, os.environ.get('JWT_SECRET'), algorithm = 'HS256')

    return token










def find_by_credentials(email, password):
    user = User.objects.get(email = email)

    if user is None:
        return None

    passwords_equal = checkpw(password.encode("utf-8"), user.password.encode("utf-8"))

    if not passwords_equal:
        return None
    
    return user


    


@csrf_exempt
def userApi(request, username = None):
    if request.method == 'GET':
        user = User.objects.get(username = username)
        user_serializer = UserSerializer(user)

        return JsonResponse(user_serializer.data, safe = False)

    
    if request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(username = username)
        user_serializer = UserSerializer(user, data = user_data)

        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully", safe = False)
        
        return JsonResponse("Failed to Update")
    

    if request.method == 'DELETE':
        is_authenticated = auth(request)

        if is_authenticated:
            user = User.objects.get(username = username)
            user.delete()
            return JsonResponse("Deleted Successfully", safe = False)
        else:
            return NOT_AUTHENTICATED_ERROR



@csrf_exempt
def classroomApi(request, id = None):
    if request.method == 'GET':
        classrooms = Classroom.objects.all()
        classrooms_serializer = ClassroomSerializer(classrooms, many = True)

        return JsonResponse(classrooms_serializer.data, safe = False)
    
    if request.method == 'POST':
        classroom_data = JSONParser().parse(request)
        classroom_serializer = ClassroomSerializer(data = classroom_data)

        if classroom_serializer.is_valid():
            classroom_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        
        return JsonResponse("Failed to Add", safe = False)
    
    if request.method == 'PUT':
        classroom_data = JSONParser().parse(request)
        classroom = Classroom.objects.get(id = classroom_data['_id'])
        classroom_serializer = ClassroomSerializer(classroom, data = classroom_data)

        if classroom_serializer.is_valid():
            classroom_serializer.save()
            return JsonResponse("Updated Successfully", safe = False)
        
        return JsonResponse("Failed to Update")
    
    if request.method == 'DELETE':
        classroom_data = JSONParser().parse(request)
        classroom = Classroom.objects.get(floor = classroom_data['floor'], number = classroom_data['number'])
        classroom.delete()

        return JsonResponse("Deleted Successfully", safe = False)




@csrf_exempt
def loginApi(request):
    if request.method == 'POST':
        user_credentials = JSONParser().parse(request)


        if 'email' not in user_credentials or 'password' not in user_credentials:
            return JsonResponse({ 'error': 'Invalid Credentials!' }, status = 404)


        email    = user_credentials['email']
        password = user_credentials['password']


        user = User.objects.get(email = email)
        user_serializer = UserSerializer(user)

        passwords_equal = checkpw(password.encode("utf-8"), user_serializer.data['password'].encode("utf-8"))

        if not passwords_equal:
            return NOT_FOUND_ERROR

        token = generate_auth_token(user_serializer.data['username'], email)

        response = JsonResponse(user_serializer.data, safe = False)
        response.set_cookie(key = "teachspace_session", value = token, max_age = 30 * 24 * 60 * 60 * 1000)

        return response


    return NOT_FOUND_ERROR




@csrf_exempt
def registerApi(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        token = generate_auth_token(user_data['username'], user_data['email'])

        user_serializer = UserSerializer(data = user_data)



        if user_serializer.is_valid():
            user_serializer.save()


            response = JsonResponse(user_serializer.data, safe = False)
            response.set_cookie(key = "teachspace_session", value = token, max_age = 30 * 24 * 60 * 60 * 1000)

            return response


        return JsonResponse("Failed to Add", safe = False)


    return NOT_FOUND_ERROR



@csrf_exempt
def authApi(request):
    if request.method == 'GET':
        token = request.COOKIES["teachspace_session"]
        decoded = jwt.decode(token, os.environ.get('JWT_SECRET'), algorithms = 'HS256')

        print(decoded)


    return NOT_FOUND_ERROR