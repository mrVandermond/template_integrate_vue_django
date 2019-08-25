from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def index(request):
  data = [
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок2",
      "pub_date": "2019-04-15",
      "text": "same text"
    },
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    }
  ]
  context = {
    'data': data,
  }
  return render(request, 'vue/index.html', context)