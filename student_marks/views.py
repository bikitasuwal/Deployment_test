from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from student_marks.models import StudentMark
from student_marks.serializers import StudentMarkSerializer


# Create your views here.
def home(request):
    return render(request, 'home.html' )

@api_view(['GET'])
def get_marks(request):
    students =  StudentMark.objects.all()
    serializer = StudentMarkSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_marks(request):
    serializer = StudentMarkSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

