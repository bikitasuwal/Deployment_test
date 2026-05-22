from django.urls import path

from .views import add_marks, get_marks

urlpatterns = [
    path('add/', add_marks),
    path('all/', get_marks),
]