from django.urls import path
from TeachSpace import views

urlpatterns = [
    path('users/<username>', views.userApi),
    path('classrooms', views.classroomApi),
    path('login', views.loginApi),
    path('register', views.registerApi),
    path('auth', views.authApi)
]